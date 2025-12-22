import React from 'react'
import './Skills.css'

function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'TypeScript']
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'Python', 'Express', 'MongoDB', 'SQL']
    },
    {
      title: 'Tools',
      skills: ['Git', 'VS Code', 'Figma', 'Webpack', 'Vite']
    }
  ]

  return (
    <section id="skills" className="skills">
      <div className="section-header">
        <h2 className="section-title">Skills</h2>
        <p className="section-subtitle">Technologies I work with</p>
      </div>
      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-category">
            <h3 className="category-title">{category.title}</h3>
            <div className="skill-tags">
              {category.skills.map((skill, skillIndex) => (
                <span key={skillIndex} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills

