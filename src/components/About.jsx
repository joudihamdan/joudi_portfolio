import React from 'react'
import { motion } from 'framer-motion'
import './About.css'

function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const qualitySteps = [
    {
      title: 'Understand',
      description: 'Analyze requirements, user flows, and expected behavior.',
    },
    {
      title: 'Test',
      description:
        'Explore edge cases, failures, and unexpected behavior beyond the happy path.',
    },
    {
      title: 'Improve',
      description:
        'Communicate findings clearly and collaborate with the team to improve product quality.',
    },
  ]

  const stats = [
    { value: '2+', label: 'QA & Agile Roles' },
    { value: '4+', label: 'Engineering Projects' },
    { value: '1', label: 'Published App' },
  ]

  return (
    <motion.section
      id="about"
      className="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="section-header">
        <h2 className="section-title">About Me</h2>
      </div>

      <div className="about-content">
        <motion.div className="about-intro" variants={itemVariants}>
          <h3 className="about-headline">
            QA Engineer with a Software Engineering Foundation
          </h3>
          <p className="about-lead">
            With a software engineering background, I approach QA beyond surface-level UI
            checks. I understand the logic behind features, APIs, and application flows, which
            helps me design meaningful tests and communicate effectively with development and
            product teams.
          </p>
        </motion.div>

        <motion.div className="quality" variants={itemVariants}>
          <h3 className="quality-title">How I Think About Quality</h3>
          <ol className="quality-steps">
            {qualitySteps.map((step, index) => (
              <li key={step.title} className="quality-step">
                <div className="quality-step-head">
                  <span className="quality-step-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="quality-step-rule" aria-hidden="true" />
                </div>
                <h4 className="quality-step-title">{step.title}</h4>
                <p className="quality-step-description">{step.description}</p>
              </li>
            ))}
          </ol>
        </motion.div>

        <motion.div className="about-stats" variants={itemVariants}>
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <div className="stat-number">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

export default About
