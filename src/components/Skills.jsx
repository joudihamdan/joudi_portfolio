import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { reveal } from '../motion'
import Modal from './Modal'
import './Skills.css'

// Cards show their first `preview` skills as chips; the popup shows the
// group's description and every skill in it.
const qa = {
  title: 'Quality Assurance',
  description:
    'Planning, designing, and executing tests across web and mobile: from reviewing requirements and acceptance criteria to tracking defects and verifying releases.',
  preview: 12,
  skills: [
    'Manual Testing',
    'API Testing',
    'Functional Testing',
    'Regression Testing',
    'Exploratory Testing',
    'Test Case Design',
    'Bug Reporting',
    'Mobile & Web Testing',
    'Requirement Analysis',
    'Test Planning',
    'Release Verification',
    'Defect Lifecycle',
    'Acceptance Criteria',
    'STLC',
    'SDLC',
  ],
}

const supporting = [
  {
    title: 'Testing & Collaboration Tools',
    description:
      'The tools I use day to day for API testing, defect tracking, and working closely with development teams.',
    preview: 5,
    skills: ['Postman', 'Swagger', 'Jira', 'GitLab', 'Git'],
  },
  {
    title: 'Software Engineering',
    description:
      'A Flutter development background: building cross-platform mobile apps with maintainable architecture, state management, and REST API integration.',
    preview: 8,
    skills: [
      'Flutter',
      'Dart',
      'BLoC',
      'GetX',
      'Clean Architecture',
      'Design Patterns',
      'REST APIs',
      'OOP',
      'JSON',
      'Firebase',
    ],
  },
]

const learning = {
  title: 'Professional Development',
  description:
    'Currently learning test automation with Playwright, building on hands-on manual and API testing experience.',
  skill: 'Learning Test Automation with Playwright',
}

function SkillCard({ group, number, primary, onOpen }) {
  const shown = group.skills.slice(0, group.preview)
  const hidden = group.skills.length - shown.length
  const open = (e) => onOpen(e.currentTarget.querySelector?.('.skills-card-more') || e.currentTarget)

  return (
    <motion.article
      className={`skills-card ${primary ? 'is-primary' : ''}`}
      onClick={open}
      {...reveal()}
    >
      <span className="skills-index">{number}</span>
      <h3 className="skills-card-title">{group.title}</h3>
      {primary && <p className="skills-card-description">{group.description}</p>}
      <ul className="skills-chips">
        {shown.map((name) => (
          <li key={name} className="chip">{name}</li>
        ))}
      </ul>
      <button
        type="button"
        className="skills-card-more"
        aria-haspopup="dialog"
        onClick={(e) => {
          e.stopPropagation()
          onOpen(e.currentTarget)
        }}
      >
        {hidden > 0 ? (
          <>
            <span className="skills-card-count">+{hidden}</span> more
          </>
        ) : (
          'Details'
        )}
        <ArrowUpRight size={15} strokeWidth={2} />
      </button>
    </motion.article>
  )
}

function Skills() {
  const [open, setOpen] = useState(null) // { group, number, opener }

  return (
    <section id="skills" className="skills">
      <div className="section-header">
        <h2 className="section-title">Skills &amp; Expertise</h2>
        <p className="section-subtitle">
          Testing expertise backed by hands-on development experience
        </p>
      </div>

      <div className="skills-layout">
        <SkillCard
          group={qa}
          number="01"
          primary
          onOpen={(opener) => setOpen({ group: qa, number: '01', opener })}
        />
        {supporting.map((group, i) => {
          const number = String(i + 2).padStart(2, '0')
          return (
            <SkillCard
              key={group.title}
              group={group}
              number={number}
              onOpen={(opener) => setOpen({ group, number, opener })}
            />
          )
        })}

        {/* 04 — a single in-progress item, so a compact strip, not a card */}
        <motion.div className="skills-strip" {...reveal()}>
          <span className="skills-index">04</span>
          <h3 className="skills-strip-title">{learning.title}</h3>
          <span className="chip is-live">{learning.skill}</span>
          <p className="skills-strip-description">{learning.description}</p>
        </motion.div>
      </div>

      {open && (
        <Modal
          label={open.group.title}
          returnFocusTo={open.opener}
          onClose={() => setOpen(null)}
          className="skills-modal"
        >
          <header className="skills-modal-head">
            <span className="skills-index">{open.number}</span>
            <h3 className="skills-modal-title">{open.group.title}</h3>
          </header>
          <p className="skills-modal-description">{open.group.description}</p>
          <ul className="skills-chips is-modal">
            {open.group.skills.map((name) => (
              <li key={name} className="chip">{name}</li>
            ))}
          </ul>
        </Modal>
      )}
    </section>
  )
}

export default Skills
