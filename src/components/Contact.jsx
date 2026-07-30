import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Download } from 'lucide-react'
import './Contact.css'

// Inline LinkedIn glyph — lucide-react dropped the brand icon in v1.x,
// so we render it directly to avoid a version-dependent import.
const LinkedinIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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
      Icon: Phone,
      label: 'Phone',
      value: '+963 936706169',
      href: 'tel:+963936706169',
    },
    {
      Icon: MapPin,
      label: 'Location',
      value: 'Damascus, Syria',
    },
    {
      Icon: LinkedinIcon,
      label: 'LinkedIn',
      value: 'linkedin.com/in/joudi-hamdan',
      href: 'https://www.linkedin.com/in/joudi-hamdan',
    },
  ]

  return (
    <motion.section
      id="contact"
      className="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section-header">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Open to QA Engineer opportunities — let's connect
        </p>
      </div>
      <div className="contact-content">
        <div className="contact-info">
          {contactItems.map((item) => (
            <div key={item.label} className="info-item">
              <div className="info-icon">
                <item.Icon size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h3>{item.label}</h3>
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                    {item.value}
                  </a>
                ) : (
                  <p>{item.value}</p>
                )}
              </div>
            </div>
          ))}
          <a
            className="contact-cv-btn"
            href="/Joudi_Hamdan_QA_Engineer_CV.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download size={18} strokeWidth={2} />
            Download CV
          </a>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
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
