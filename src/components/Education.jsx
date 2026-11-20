import React from 'react'
import { motion } from 'framer-motion'
import { reveal } from '../motion'
import { GraduationCap } from 'lucide-react'
import './Education.css'

function Education() {
  const educationData = [
    {
      degree: "Bachelor's Degree in Information Technology Engineering",
      university: 'Faculty of Information Technology Engineering, Damascus University',
      period: '2020 – 2025',
      specialization: 'Software Engineering specialization',
    },
  ]

  return (
    <section id="education" className="education">
      <div className="section-header">
        <h2 className="section-title">Education</h2>
      </div>
      <div className="education-container">
        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            className="education-card"
            {...reveal()}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="education-icon">
              <GraduationCap size={32} strokeWidth={1.5} />
            </div>
            <div className="education-content">
              <div className="education-period">{edu.period}</div>
              <h3 className="education-degree">{edu.degree}</h3>
              <h4 className="education-university">{edu.university}</h4>
              <div className="education-specialization">
                <span className="specialization-badge">{edu.specialization}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Education
