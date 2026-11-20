import React from 'react'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { prefersReducedMotion, REVEAL_DURATION } from '../motion'
import './Hero.css'

// A light line drawing on the hero background: the testing flow from
// requirements to release, with a small test-case sheet. Decorative only.
const flow = [
  { x: 60, y: 70, label: 'Requirements', above: true },
  { x: 300, y: 130, label: 'Test design' },
  { x: 110, y: 250, label: 'Execution' },
  { x: 340, y: 330, label: 'Defects' },
  { x: 190, y: 440, label: 'Release', done: true },
]

// Small screens: the same flow as one compact horizontal strip, with labels
// alternating above and below the line so every word stays full size.
function HeroFlowStrip() {
  return (
    <ol className="hero-flow-strip" aria-hidden="true">
      {flow.map((n) => (
        <li key={n.label} className={n.done ? 'is-done' : undefined}>
          <span className="hfs-dot">
            {n.done && (
              <svg viewBox="0 0 12 12">
                <path d="M2.5 6.2 l2.3 2.3 l4.7 -5" />
              </svg>
            )}
          </span>
          <span className="hfs-label">{n.label}</span>
        </li>
      ))}
    </ol>
  )
}

function HeroDrawing() {
  return (
    <svg className="hero-drawing" viewBox="0 0 520 520" aria-hidden="true" focusable="false">
      <path
        className="hd-path"
        pathLength="1"
        d="M60,70 C180,70 300,60 300,130 C300,200 110,180 110,250 C110,320 340,260 340,330 C340,400 190,380 190,440"
      />
      {flow.map((n, i) => (
        <g key={n.label} className="hd-node" style={{ '--i': i }}>
          <circle cx={n.x} cy={n.y} r={n.done ? 12 : 7} className={n.done ? 'is-done' : ''} />
          {n.done && <path className="hd-check" d={`M${n.x - 5},${n.y} l3.5,3.5 l6.5,-7`} />}
          <text x={n.above ? n.x - 7 : n.x + (n.done ? 22 : 18)} y={n.above ? n.y - 18 : n.y + 4.5}>{n.label}</text>
        </g>
      ))}
      <g className="hd-sheet">
        <rect x="350" y="390" width="140" height="100" rx="12" />
        <line x1="368" y1="410" x2="420" y2="410" className="hd-bar" />
        {[432, 454, 476].map((y, i) => (
          <g key={y}>
            <rect x="368" y={y - 6} width="12" height="12" rx="3" />
            {i < 2 && <path className="hd-tick" d={`M370.5,${y} l2.5,2.5 l5,-5`} />}
            <line x1="390" y1={y} x2={i === 1 ? 448 : 470} y2={y} className="hd-bar is-light" />
          </g>
        ))}
      </g>
    </svg>
  )
}

function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Quick, unstaggered entrance; skipped entirely with reduced motion.
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: REVEAL_DURATION } },
  }

  const item = {
    hidden: { y: 12 },
    visible: { y: 0, transition: { duration: REVEAL_DURATION, ease: 'easeOut' } },
  }

  return (
    <section id="hero" className="hero">
      <div className="hero-grid">
        <motion.div
          className="hero-left"
          initial={prefersReducedMotion ? false : 'hidden'}
          animate="visible"
          variants={container}
        >
          <HeroFlowStrip />
          <motion.h1 className="hero-title-large" variants={item}>
            <span className="hero-name">Joudi Hamdan</span>
          </motion.h1>
          <motion.h2 className="hero-subtitle-large" variants={item}>
            QA Engineer · Software Engineering Background
          </motion.h2>
          <motion.p className="hero-description-large" variants={item}>
            Sole QA Engineer responsible for testing a live web &amp; mobile educational platform
            used by around 3,000 learners. My Flutter development background helps me look beyond
            the UI, understanding the logic, APIs, and edge cases behind every feature.
          </motion.p>
          <motion.div className="hero-buttons" variants={item}>
            <motion.button
              className="btn btn-primary"
              onClick={() => scrollToSection('experience')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Experience
            </motion.button>
            <motion.button
              className="btn btn-secondary"
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
            <motion.a
              className="btn btn-secondary btn-download"
              href="/Joudi_Hamdan_QA_Engineer_CV.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={18} strokeWidth={2} />
              Download CV
            </motion.a>
          </motion.div>
          <motion.div className="hero-social-icons" variants={item}>
            <motion.a
              href="https://github.com/joudihamdan"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/joudi-hamdan"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </motion.a>
            <motion.a
              href="https://t.me/joudihamdan"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Telegram"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </motion.a>
            <motion.a
              href="mailto:joudihamdan216@gmail.com"
              className="social-icon"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Email"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-right"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: REVEAL_DURATION }}
        >
          <HeroDrawing />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
