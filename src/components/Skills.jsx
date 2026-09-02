import React from 'react'
import { motion } from 'framer-motion'
import './Skills.css'

function Skills() {
  const skillCategories = [
    {
      title: 'Quality Assurance',
      skills: [
        'Manual Testing',
        'Functional Testing',
        'Regression Testing',
        'Exploratory Testing',
        'Test Case Design',
        'Bug Reporting',
        'API Testing',
      ],
    },
    {
      title: 'QA Process',
      skills: [
        'STLC',
        'SDLC',
        'Requirement Analysis',
        'Test Planning',
        'Acceptance Criteria',
        'Defect Lifecycle',
        'Release Verification',
      ],
    },
    {
      title: 'Software Engineering',
      skills: [
        'OOP',
        'Design Patterns',
        'Flutter',
        'Dart',
        'Clean Architecture',
        'BLoC / GetX',
        'REST APIs',
        'JSON',
      ],
    },
    {
      title: 'Tools',
      skills: ['Jira', 'GitLab', 'Postman', 'Swagger', 'Git', 'Firebase'],
    },
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
        <h2 className="section-title">Skills &amp; Expertise</h2>
        <p className="section-subtitle">
          Testing expertise backed by hands-on development experience
        </p>
      </div>
      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            className="skill-category"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <h3 className="category-title">{category.title}</h3>
            <div className="skill-tags">
              {category.skills.map((skill) => (
                <span key={skill} className="skill-tag">
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
