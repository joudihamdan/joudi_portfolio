// server.js — Express server for deploying this Vite + React portfolio as a
// Render Web Service. It serves BOTH the built frontend (dist/) and the
// /api/contact endpoint, so the UI and the Telegram relay run in one service.
//
// Secrets (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID) are read from server-side
// environment variables and are never exposed to the browser.

import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json({ limit: '100kb' }))

// --- Contact form -> Telegram ---
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, company } = req.body || {}

    // Honeypot: real users leave the hidden "company" field empty.
    // If it's filled, it's almost certainly a bot — accept, but send nothing.
    if (company) return res.status(200).json({ ok: true })

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

    // Escape HTML so user input can't break Telegram's HTML parser.
    const esc = (s) =>
      String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

    // Readable timestamp pinned to your local timezone.
    const sentAt = new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Damascus',
    }).format(new Date())

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
})

// --- Serve the built frontend (dist/) ---
const distPath = path.join(__dirname, 'dist')
app.use(express.static(distPath))

// SPA fallback: send index.html for any non-API route so client-side routing works.
// (Using a final middleware keeps this compatible with both Express 4 and 5.)
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not found' })
  }
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
