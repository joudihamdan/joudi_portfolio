import React from 'react'
import { motion } from 'framer-motion'
import './About.css'

function About({ isDarkMode }) {
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
      id="about" 
      className="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="section-header">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">Mobile Application Developer & Agile Practitioner</p>
      </div>
      <div className="about-content">
        <div className="about-text">
          <p>
            I'm a Mobile Application Developer with 2+ years of experience building cross-platform 
            applications using Flutter. I'm skilled in state management with Bloc and GetX, map 
            integrations, and Firebase. I'm a strong advocate of Clean Architecture and Agile practices, 
            with proven ability to lead technical projects and mentor team members.
          </p>
          <p>
            Beyond development, I've worked as a Scrum Master and QA Tester, bringing a holistic 
            approach to software development. I believe in creating exceptional user experiences 
            while maintaining code quality and following best practices.
          </p>
          <motion.div 
            className="about-roles"
            variants={containerVariants}
          >
            <motion.div 
              className="role-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="role-icon">📱</div>
              <h3>Flutter Developer</h3>
              <p>Building beautiful cross-platform mobile applications</p>
            </motion.div>
            <motion.div 
              className="role-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="role-icon">📋</div>
              <h3>Scrum Master</h3>
              <p>Facilitating agile development processes</p>
            </motion.div>
            <motion.div 
              className="role-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="role-icon">✅</div>
              <h3>QA Tester</h3>
              <p>Ensuring quality and reliability</p>
            </motion.div>
          </motion.div>
          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-number">2+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5+</div>
              <div className="stat-label">Projects Completed</div>
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

