import React from 'react'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-text">
          <p>&copy; {currentYear} Your Name. All rights reserved.</p>
        </div>
        <div className="footer-social">
          <a href="#" aria-label="GitHub">GitHub</a>
          <a href="#" aria-label="LinkedIn">LinkedIn</a>
          <a href="#" aria-label="Twitter">Twitter</a>
          <a href="#" aria-label="Email">Email</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

