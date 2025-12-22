import React from 'react'
import './Projects.css'

function Projects() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce website with shopping cart, payment integration, and admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      image: '🛒'
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team collaboration features.',
      technologies: ['React', 'Firebase', 'TypeScript'],
      image: '📋'
    },
    {
      title: 'Weather Dashboard',
      description: 'A beautiful weather dashboard showing current conditions and forecasts for multiple cities.',
      technologies: ['React', 'API Integration', 'CSS3'],
      image: '🌤️'
    },
    {
      title: 'Social Media App',
      description: 'A social networking platform with posts, comments, likes, and user profiles.',
      technologies: ['React', 'Express', 'PostgreSQL'],
      image: '📱'
    }
  ]

  return (
    <section id="projects" className="projects">
      <div className="section-header">
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">Some of my recent work</p>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-image">
              <div className="project-emoji">{project.image}</div>
            </div>
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href="#" className="project-link">View Project →</a>
                <a href="#" className="project-link">GitHub →</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects

