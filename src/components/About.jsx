import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Smartphone, KanbanSquare } from 'lucide-react'
import './About.css'

function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const qaHighlights = [
    {
      label: 'Testing',
      items: ['Manual', 'API', 'Functional', 'Regression', 'Exploratory'],
    },
    {
      label: 'QA Tools',
      items: ['Jira', 'GitLab', 'Postman', 'Swagger'],
    },
    {
      label: 'Practices',
      items: ['Test Case Design', 'Defect Lifecycle', 'SDLC / STLC', 'Agile / Scrum'],
    },
  ]

  const roles = [
    {
      Icon: ShieldCheck,
      title: 'Quality Assurance Engineer',
      description:
        'Manual and API testing, test case design, defect tracking, and release validation in Agile teams.',
    },
    {
      Icon: Smartphone,
      title: 'Mobile Software Engineer',
      description:
        'Flutter development with Bloc and GetX — understanding code, APIs, and architecture from the inside.',
    },
    {
      Icon: KanbanSquare,
      title: 'Agile Practitioner',
      description:
        'Scrum ceremonies, backlog refinement, acceptance criteria validation, and cross-functional collaboration.',
    },
  ]

  return (
    <motion.section
      id="about"
      className="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="section-header">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">
          QA Engineer with a software engineering foundation
        </p>
      </div>
      <div className="about-content">
        <div className="about-text">
          <p>
            I am a Quality Assurance Engineer with experience in manual testing, API testing,
            and test automation within Agile environments. I design structured test cases,
            validate business requirements, identify defects, and work closely with Product
            Owners and developers to ensure software meets quality standards before release.
          </p>
          <p>
            What sets me apart is my software engineering background. As a Flutter developer,
            I understand mobile architecture, REST APIs, JSON payloads, and engineering
            workflows — which helps me test more effectively, communicate clearly with
            development teams, and catch issues that go beyond surface-level UI checks.
          </p>
          <motion.div className="qa-highlights" variants={containerVariants}>
            {qaHighlights.map((group) => (
              <motion.div key={group.label} className="qa-highlight-group" variants={itemVariants}>
                <span className="qa-highlight-label">{group.label}</span>
                <div className="qa-highlight-tags">
                  {group.items.map((item) => (
                    <span key={item} className="qa-highlight-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="about-roles" variants={containerVariants}>
            {roles.map((role) => (
              <motion.div
                key={role.title}
                className="role-card"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="role-icon">
                  <role.Icon size={32} strokeWidth={1.5} />
                </div>
                <h3>{role.title}</h3>
                <p>{role.description}</p>
              </motion.div>
            ))}
          </motion.div>
          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-number">2+</div>
              <div className="stat-label">QA & Agile Roles</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4+</div>
              <div className="stat-label">Engineering Projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1</div>
              <div className="stat-label">Published App</div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default About
