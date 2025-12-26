import React from 'react'
import { motion } from 'framer-motion'
import './Skills.css'

function Skills({ isDarkMode }) {
  const skillCategories = [
    {
      title: 'Flutter',
      skills: ['Bloc & GetX', 'Clean Architecture', 'Animations', 'UI/UX', 'Local Storage', 'Maps', 'Geolocation']
    },
    {
      title: 'Tools & Technologies',
      skills: ['Firebase (Auth, Firestore, Storage)', 'Git', 'GitHub', 'GitLab', 'SDLC', 'Design Patterns', 'Agile', 'Jira', 'Odoo']
    },
    {
      title: 'Soft Skills',
      skills: ['Problem-Solving', 'Design Thinking', 'Communication', 'Teamwork', 'Adaptability', 'Willingness to Learn']
    }
  ]

  return (
    <motion.section 
      id="skills" 
      className="skills"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section-header">
        <h2 className="section-title">Skills</h2>
        <p className="section-subtitle">Technologies I work with</p>
      </div>
      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <motion.div 
            key={index} 
            className="skill-category"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <h3 className="category-title">{category.title}</h3>
            <div className="skill-tags">
              {category.skills.map((skill, skillIndex) => (
                <span key={skillIndex} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default Skills

