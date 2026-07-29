import React from 'react'
import { motion } from 'framer-motion'
import './Skills.css'

function Skills() {
  const skillCategories = [
    {
      title: 'Quality Assurance',
      skills: [
        'Manual Testing',
        'API Testing',
        'Functional Testing',
        'Regression Testing',
        'Exploratory Testing',
        'Test Case Design',
        'Bug Reporting',
        'Defect Lifecycle',
        'SDLC / STLC',
        'Basic Test Automation',
      ],
    },
    {
      title: 'Agile & Process',
      skills: [
        'Agile / Scrum',
        'Sprint Planning',
        'Backlog Refinement',
        'Acceptance Criteria Validation',
        'Requirement Analysis',
        'Test Planning',
        'Release Verification',
      ],
    },
    {
      title: 'Tools',
      skills: ['Jira', 'GitLab', 'Postman', 'Swagger', 'Firebase', 'Git', 'GitHub'],
    },
    {
      title: 'Software Engineering',
      skills: [
        'Flutter',
        'Dart',
        'REST APIs',
        'JSON',
        'Clean Architecture',
        'Bloc / GetX',
        'React',
      ],
    },
    {
      title: 'Professional Skills',
      skills: [
        'Analytical Thinking',
        'Attention to Detail',
        'Problem-Solving',
        'Communication',
        'Team Collaboration',
        'Adaptability',
        'Time Management',
      ],
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
        <h2 className="section-title">Skills</h2>
        <p className="section-subtitle">
          Testing expertise backed by hands-on development experience
        </p>
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
