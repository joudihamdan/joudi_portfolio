// api/contact.js
// Vercel Serverless Function (Node.js runtime).
// Receives the "Get In Touch" form POST and relays it to your Telegram chat.
// The bot token and chat id are read from server-side env vars and are NEVER
// exposed to the browser.

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Vercel parses JSON bodies automatically when Content-Type is application/json.
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
    const { name, email, message, company } = body

    // Honeypot: real users never fill the hidden "company" field.
    // If it's filled, it's almost certainly a bot — pretend success, send nothing.
    if (company) return res.status(200).json({ ok: true })

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required.' })
    }
    if (String(message).length > 4000) {
      return res.status(400).json({ error: 'Message is too long.' })
    }

    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID
    if (!token || !chatId) {
      console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env vars.')
      return res.status(500).json({ error: 'Server is not configured.' })
    }

    // Escape HTML special chars so user content can't break Telegram's HTML parser.
    const esc = (s) =>
      String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

    // Readable timestamp in your local timezone (e.g. "5 Aug 2026, 14:30").
    const sentAt = new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Damascus',
    }).format(new Date())

    // Clean, organized message using Telegram HTML formatting.
    const text =
      '🔔 <b>New Portfolio Message</b>\n' +
      '➖➖➖➖➖➖➖➖➖➖\n' +
      `👤 <b>Name:</b> ${esc(name)}\n` +
      `✉️ <b>Email:</b> ${esc(email)}\n` +
      `🕒 <b>Sent:</b> ${esc(sentAt)} (Damascus)\n` +
      '➖➖➖➖➖➖➖➖➖➖\n' +
      '💬 <b>Message</b>\n' +
      `${esc(message)}`

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })

    if (!tgRes.ok) {
      const detail = await tgRes.text()
      console.error('Telegram API error:', detail)
      return res.status(502).json({ error: 'Failed to deliver message.' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('contact handler error:', err)
    return res.status(500).json({ error: 'Unexpected server error.' })
  }
}
