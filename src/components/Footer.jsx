import React from 'react'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-text">
          <p>&copy; {currentYear} Joudi Hamdan. All rights reserved.</p>
        </div>
        <div className="footer-social">
          <a href="https://github.com/joudihamdan" target="_blank" rel="noopener noreferrer" aria-label="GitHub">GitHub</a>
          <a href="https://www.linkedin.com/in/joudi-hamdan" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
          <a href="https://t.me/joudihamdan" target="_blank" rel="noopener noreferrer" aria-label="Telegram">Telegram</a>
          <a href="mailto:joudihamdan216@gmail.com" aria-label="Email">Email</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

