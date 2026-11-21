import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { reveal } from '../motion'
import { Mail, MapPin } from 'lucide-react'
import './Contact.css'

// Inline LinkedIn glyph — lucide-react dropped the brand icon in v1.x,
// so we render it directly to avoid a version-dependent import.
const LinkedinIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

// Same Telegram glyph as the hero and footer icons.
const TelegramIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
)

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: '', // honeypot — real users leave this empty
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      setStatus('success')
      setFormData({ name: '', email: '', message: '', company: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Could not send your message. Please email me directly.')
    }
  }

  const contactItems = [
    {
      Icon: Mail,
      label: 'Email',
      value: 'joudihamdan216@gmail.com',
      href: 'mailto:joudihamdan216@gmail.com',
    },
    {
      Icon: LinkedinIcon,
      label: 'LinkedIn',
      value: 'linkedin.com/in/joudi-hamdan',
      href: 'https://www.linkedin.com/in/joudi-hamdan',
    },
    {
      Icon: TelegramIcon,
      label: 'Telegram',
      value: '@joudihamdan',
      href: 'https://t.me/joudihamdan',
    },
    // Last: a place, not a contact channel
    {
      Icon: MapPin,
      label: 'Location',
      value: 'Damascus, Syria',
    },
  ]

  return (
    <motion.section
      id="contact"
      className="contact"
      {...reveal({ y: 0 })}
    >
      <div className="section-header">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Open to QA Engineer opportunities. Let's connect.
        </p>
      </div>
      <div className="contact-content">
        {/* Contact details: a card matching the form card */}
        <div className="contact-info contact-card">
          <h3 className="contact-card-title">Contact details</h3>
          <ul className="contact-list">
            {contactItems.map((item) => {
              const external = item.href?.startsWith('http')
              const body = (
                <>
                  <span className="info-icon">
                    <item.Icon size={22} strokeWidth={1.5} />
                  </span>
                  <span className="info-text">
                    <span className="info-label">{item.label}</span>
                    {item.value && <span className="info-value">{item.value}</span>}
                  </span>
                </>
              )
              return (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      className="info-item is-link"
                      href={item.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="info-item">{body}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
        <form className="contact-form contact-card" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Honeypot: hidden from real users; bots that fill it are silently dropped */}
          <input
            type="text"
            name="company"
            className="hp-field"
            value={formData.company}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="form-status success" role="status">
              Thanks! Your message was sent — I'll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p className="form-status error" role="alert">
              {errorMsg}
            </p>
          )}
        </form>
      </div>
    </motion.section>
  )
}

export default Contact
