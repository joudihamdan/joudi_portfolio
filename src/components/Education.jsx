import React from 'react'
import { motion } from 'framer-motion'
import './Education.css'

function Education({ isDarkMode }) {
  const educationData = [
    {
      degree: "Bachelor's Degree in Information Technology Engineering",
      university: "Damascus University",
      period: "Sep 2020 – Sep 2025",
      specialization: "Software Engineering",
      description: "Focused on software development, system design, and engineering principles. Specialized in Software Engineering with emphasis on modern development practices and clean architecture.",
      icon: "🎓"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <motion.section 
      id="education" 
      className="education"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="section-header">
        <h2 className="section-title">Education</h2>
        <p className="section-subtitle">Academic journey and achievements</p>
      </div>
      <div className="education-container">
        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            className="education-card"
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="education-icon">{edu.icon}</div>
            <div className="education-content">
              <div className="education-period">{edu.period}</div>
              <h3 className="education-degree">{edu.degree}</h3>
              <h4 className="education-university">{edu.university}</h4>
              <div className="education-specialization">
                <span className="specialization-badge">{edu.specialization}</span>
              </div>
              <p className="education-description">{edu.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default Education

