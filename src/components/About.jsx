import React from 'react'
import { motion } from 'framer-motion'
import { reveal } from '../motion'
import './About.css'

function About() {
  const qualitySteps = [
    {
      title: 'Understand the Context',
      description:
        'Requirements, business rules, user expectations, and the risks behind each feature.',
    },
    {
      title: 'Challenge the Behavior',
      description:
        'Happy paths, edge cases, failure scenarios, and unexpected system behavior.',
    },
    {
      title: 'Improve the Outcome',
      description:
        'Clear, actionable findings and close collaboration with the team to fix what matters.',
    },
  ]

  const stats = [
    { value: '1+', unit: 'Year', label: 'QA Experience' },
    { value: '~3K', unit: 'Users', label: 'Learners on Platform' },
    { value: '4', unit: 'Apps', label: 'Flutter Projects' },
  ]

  return (
    <section id="about" className="about">
      <div className="section-header">
        <h2 className="section-title">About Me</h2>
      </div>

      <div className="about-content">
        <motion.div className="about-intro" {...reveal()}>
          <h3 className="about-headline">
            A Technical Approach to Software Quality
          </h3>
          <p className="about-lead">
            Before moving into QA, I built mobile applications with Flutter. That experience
            shapes how I test: I don't stop at whether a feature works on screen. I look at the
            logic behind it, how data moves through the APIs, and what happens when things don't
            go as expected.
          </p>
          <p className="about-lead">
            In my current role, I manage QA activities end to end, from reviewing requirements
            with Product Owners to verifying releases. I'm responsible for QA throughout a major
            redesign of a platform that has been in production for over five years. My development
            background helps me investigate issues across the UI, APIs, and business logic, and
            communicate findings in a way developers can act on quickly.
          </p>
        </motion.div>

        <motion.div className="quality" {...reveal()}>
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

        <motion.div className="about-stats" {...reveal()}>
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <div className="stat-number">{stat.value}</div>
              <div className="stat-unit">{stat.unit}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About
