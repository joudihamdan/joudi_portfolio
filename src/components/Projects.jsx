import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { reveal } from '../motion'
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Bike,
  CalendarCheck,
  CircleCheck,
  Clock,
  Coffee,
  Flower2,
  Gem,
  Hourglass,
  MapPin,
  Pizza,
  Sparkles,
  Store,
  UtensilsCrossed,
} from 'lucide-react'
import projectMedia from 'virtual:project-media'
import PhoneFrame from './PhoneFrame'
import Modal from './Modal'
import './Projects.css'

// Logos and screenshots come from public/projects/<slug>/ (see vite.config.js).
// Projects with screenshots get a cover of three phones; the others get a
// drawn cover that describes what the app does. Adding a screenshot folder
// later switches a project to the phone cover automatically.
const projects = [
  {
    slug: 'click-cash',
    title: 'CLICK CASH',
    subtitle: 'Digital Money Transfer App',
    type: 'Graduation Project · Damascus University · 2025',
    year: '2025',
    note:
      'Selected by Damascus University as one of three projects from the Faculty of Information Technology Engineering showcased at TexpoLand (Nov 2025).',
    description:
      'A fintech mobile app with secure authentication (OTP, password, fingerprint), bank account management, and money transfers by QR code or phone number. Also supports scheduled transactions, real-time notifications, and business accounts for sales, invoices, and payment requests.',
    role: 'Mobile developer on the project team, responsible for building the Flutter app.',
    technologies: ['Flutter', 'Firebase', 'BLoC', 'Authentication', 'Payments'],
    // Popup shows every screen, one at a time, in file order
    gallery: true,
    captions: {
      '01-login': 'Secure sign-in with password or fingerprint',
      '02-home': 'Dashboard with balance and quick actions',
      '03-send-money': 'Send money from a linked bank account',
      '04-transfer-success': 'Transfer confirmation with transaction details',
      '05-receive-qr': 'Receive money by sharing a QR code',
      '06-statistics': 'Monthly income and transaction statistics',
    },
  },
  {
    slug: 'dahab-clinic',
    title: 'DAHAB CLINIC',
    subtitle: 'Beauty Clinic Booking App',
    type: 'Flutter Development',
    description:
      'A booking app for a beauty clinic: browse services by category, book appointments based on doctor availability, and manage sessions (pending, in progress, completed). Includes offers, reviews, guest mode, multi-language support, and light/dark themes.',
    technologies: ['Flutter', 'GetX', 'Firebase'],
    // Text-only like MERSOOL and RIDESHARE: a drawn cover, no screenshots
    Icon: CalendarCheck,
    drawn: {
      left: { label: 'Services', rows: [Sparkles, Flower2, Gem] },
      right: { label: 'Sessions', rows: [Clock, Hourglass, CircleCheck] },
    },
  },
  {
    slug: 'mersool',
    title: 'MERSOOL',
    subtitle: 'Food Delivery App',
    type: 'Flutter Development',
    description:
      'A cross-platform food delivery app with restaurant browsing, meal ordering, and real-time order tracking with map integration.',
    technologies: ['Flutter', 'BLoC', 'Clean Architecture', 'Maps API'],
    Icon: UtensilsCrossed,
    drawn: {
      left: { label: 'Restaurants', rows: [Store, Pizza, Coffee] },
      right: { label: 'Order tracking' },
    },
  },
  {
    slug: 'rideshare',
    title: 'RIDESHARE',
    subtitle: 'Bicycle Rental App',
    type: 'Flutter Development',
    description:
      'A bike rental app for booking bicycles from city hubs, with real-time geolocation and booking management.',
    technologies: ['Flutter', 'BLoC', 'Clean Architecture', 'Maps'],
    Icon: Bike,
    drawn: {
      left: { label: 'Bookings', rows: [CalendarCheck, Bike, Clock] },
      right: { label: 'City hubs' },
    },
  },
]

const mediaFor = (slug) => projectMedia[slug] || { logo: null, screens: [] }

function ProjectLogo({ project }) {
  const { logo } = mediaFor(project.slug)
  if (logo) {
    return (
      <img
        className="project-logo"
        src={logo.src}
        alt={`${project.title} logo`}
        width={logo.width}
        height={logo.height}
        loading="lazy"
        decoding="async"
      />
    )
  }
  const Icon = project.Icon || UtensilsCrossed
  return (
    <span className="project-logo is-icon" aria-hidden="true">
      <Icon strokeWidth={1.6} />
    </span>
  )
}

/* ---------- Covers ---------- */

const captionOf = (project, screen, i) =>
  project.captions?.[screen.name] || `${project.title} screen ${i + 1}`

// Every screen in full, one at a time: buttons, arrow keys, and swipe.
function ScreenGallery({ project, screens }) {
  const [index, setIndex] = useState(0)
  const touch = useRef(null)
  const count = screens.length
  const go = (step) => setIndex((i) => (i + step + count) % count)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  // Warm the next screen so stepping through feels instant
  useEffect(() => {
    const next = screens[(index + 1) % count]
    if (next) new Image().src = next.src
  }, [index, count, screens])

  const screen = screens[index]
  const caption = captionOf(project, screen, index)

  return (
    <div
      className="project-media is-gallery"
      onTouchStart={(e) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY } }}
      onTouchEnd={(e) => {
        if (!touch.current) return
        const dx = e.changedTouches[0].clientX - touch.current.x
        const dy = e.changedTouches[0].clientY - touch.current.y
        touch.current = null
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
      }}
    >
      <div className="gallery-stage">
        <button type="button" className="gallery-btn" onClick={() => go(-1)} aria-label="Previous screen">
          <ChevronLeft size={22} strokeWidth={2} />
        </button>
        <PhoneFrame
          key={screen.src}
          screen={screen}
          alt={caption}
          lazy={false}
          className="gallery-phone"
          imgStyle={{ maxHeight: `${screen.height}px` }}
        />
        <button type="button" className="gallery-btn" onClick={() => go(1)} aria-label="Next screen">
          <ChevronRight size={22} strokeWidth={2} />
        </button>
      </div>
      <p className="gallery-caption">{caption}</p>
      <p className="gallery-count" aria-live="polite">
        {index + 1} / {count}
      </p>
    </div>
  )
}

// A few screens side by side, each shown in full.
function ScreenRow({ project, screens }) {
  const picks = (project.coverScreens || [])
    .map((name) => screens.find((s) => s.name === name))
    .filter(Boolean)
  const shown = picks.length ? picks : screens.slice(0, 3)
  return (
    <div className="project-media is-row">
      {shown.map((screen, i) => (
        <PhoneFrame key={screen.src} screen={screen} alt={captionOf(project, screen, i)} />
      ))}
    </div>
  )
}

// Tidy line drawing: a list panel, a phone, and a map panel.
function DrawnCover({ project }) {
  const { left, right } = project.drawn
  const Icon = project.Icon
  return (
    <div className="project-media is-drawn" aria-hidden="true">
      <div className="drawn-panel drawn-list">
        <span className="drawn-label">{left.label}</span>
        {left.rows.map((RowIcon, i) => (
          <div key={i} className="drawn-row">
            <span className="drawn-row-icon">
              <RowIcon strokeWidth={1.5} />
            </span>
            <span className="drawn-bars">
              <i />
              <i />
            </span>
          </div>
        ))}
      </div>

      <div className="drawn-panel drawn-phone">
        <span className="drawn-notch" />
        <span className="drawn-hero-icon">
          <Icon strokeWidth={1.25} />
        </span>
        <span className="drawn-bars is-centered">
          <i />
          <i />
        </span>
        <span className="drawn-cta" />
      </div>

      {right.rows ? (
        <div className="drawn-panel drawn-list drawn-right">
          <span className="drawn-label">{right.label}</span>
          {right.rows.map((RowIcon, i) => (
            <div key={i} className="drawn-row">
              <span className="drawn-row-icon">
                <RowIcon strokeWidth={1.5} />
              </span>
              <span className="drawn-bars">
                <i />
                <i />
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="drawn-panel drawn-map drawn-right">
          <span className="drawn-label">{right.label}</span>
          <svg viewBox="0 0 200 120" className="drawn-route">
            <path d="M28 92 C 60 92, 64 40, 104 52 S 150 86, 172 30" />
          </svg>
          <span className="drawn-pin is-start">
            <MapPin strokeWidth={1.5} />
          </span>
          <span className="drawn-pin is-end">
            <MapPin strokeWidth={1.5} />
          </span>
          <span className="drawn-bars">
            <i />
          </span>
        </div>
      )}
    </div>
  )
}

function ProjectMedia({ project }) {
  const { screens } = mediaFor(project.slug)
  if (screens.length && project.gallery) return <ScreenGallery project={project} screens={screens} />
  if (project.drawn) return <DrawnCover project={project} />
  if (screens.length) return <ScreenRow project={project} screens={screens} />
  return null
}

/* ---------- Section ---------- */

function Projects() {
  const [open, setOpen] = useState(null) // { project, opener }

  return (
    <section id="projects" className="projects">
      <div className="section-header">
        <h2 className="section-title">Selected Mobile Development Projects</h2>
        <p className="section-subtitle">
          Mobile applications I developed with Flutter, building the technical foundation that now
          shapes my approach to quality assurance.
        </p>
      </div>

      <div className="project-cards">
        {projects.map((project, i) => (
          <motion.article
            key={project.slug}
            className="project-card"
            {...reveal()}
          >
            <div className="project-card-top">
              <ProjectLogo project={project} />
              <span className="project-number">{String(i + 1).padStart(2, '0')}</span>
            </div>

            <h3 className="project-title">{project.title}</h3>
            <p className="project-subtitle">{project.subtitle}</p>
            <p className="project-type">{project.type}</p>
            {project.note && <p className="project-note">{project.note}</p>}
            <p className="project-description">{project.description}</p>

            <div className="project-card-foot">
              <ul className="project-tags" aria-label="Technologies">
                {project.technologies.slice(0, 3).map((tech) => (
                  <li key={tech} className="chip">{tech}</li>
                ))}
                {project.technologies.length > 3 && (
                  <li className="chip is-more">+{project.technologies.length - 3}</li>
                )}
              </ul>
              {/* Stretched over the whole card, so the card is one big target */}
              <button
                type="button"
                className="project-open"
                aria-haspopup="dialog"
                aria-label={`View project: ${project.title}`}
                onClick={(e) => setOpen({ project, opener: e.currentTarget })}
              >
                View project
                <ArrowUpRight size={16} strokeWidth={2} />
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      {open && (
        <Modal
          label={open.project.title}
          returnFocusTo={open.opener}
          onClose={() => setOpen(null)}
          className="project-modal"
        >
          <div className="project-modal-cover">
            {open.project.year && <span className="project-year">{open.project.year}</span>}
            <ProjectMedia project={open.project} />
          </div>
          <div className="project-modal-body">
            <header className="project-modal-head">
              <ProjectLogo project={open.project} />
              <div>
                <h3 className="project-modal-title">{open.project.title}</h3>
                <p className="project-subtitle">{open.project.subtitle}</p>
              </div>
            </header>
            <p className="project-type">{open.project.type}</p>
            {open.project.note && <p className="project-note">{open.project.note}</p>}
            <p className="project-modal-description">{open.project.description}</p>

            {open.project.role && (
              <div className="project-modal-block">
                <h4 className="project-modal-label">My role</h4>
                <p className="project-role">{open.project.role}</p>
              </div>
            )}

            <div className="project-modal-block">
              <h4 className="project-modal-label">Technologies used</h4>
              <ul className="project-tags is-large">
                {open.project.technologies.map((tech) => (
                  <li key={tech} className="chip">{tech}</li>
                ))}
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </section>
  )
}

export default Projects
