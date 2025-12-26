import React from 'react'
import { motion } from 'framer-motion'
import './Projects.css'

function Projects({ isDarkMode }) {
  const projects = [
    {
      title: 'CLICK CASH',
      subtitle: 'Digital Money Transfer App',
      description: 'Developed a mobile app enabling secure account creation with phone number verification (OTP), password, or fingerprint authentication. Implemented bank account management, money transfer system, transaction history, and Business accounts.',
      technologies: ['Flutter', 'Firebase', 'Authentication', 'QR Code'],
      icon: '💳',
      size: 'large',
      featured: true
    },
    {
      title: 'MERSOOL',
      subtitle: 'Food Delivery App - Published on Google Play',
      description: 'A cross-platform mobile application for browsing restaurants, selecting meals, and placing delivery orders. Built with Bloc and Clean Architecture, featuring Map API integration and real-time order tracking.',
      technologies: ['Flutter', 'Bloc', 'Clean Architecture', 'Maps API'],
      icon: '🍔',
      size: 'medium',
      featured: true
    },
    {
      title: 'DAHAB CLINIC MANAGEMENT',
      subtitle: 'Beauty Clinic App',
      description: 'A mobile application for managing appointments and patient sessions. Built with GetX (MVC architecture), featuring appointment scheduling, patient profiles, customizable themes, and push notifications.',
      technologies: ['Flutter', 'GetX', 'Firebase', 'MVC'],
      icon: '💅',
      size: 'medium',
      featured: true
    },
    {
      title: 'RIDESHARE APP',
      subtitle: 'Bicycle Rental System',
      description: 'A mobile application for renting bicycles from city hubs. Developed with Bloc and Clean Architecture, featuring real-time geolocation and booking management.',
      technologies: ['Flutter', 'Bloc', 'Clean Architecture', 'Maps'],
      icon: '🚴',
      size: 'small',
      featured: false
    },
    {
      title: 'Compiler for React',
      subtitle: 'Custom JSX Parser',
      description: 'Designed and built a React-based compiler using Antlr to parse and understand custom JSX syntax.',
      technologies: ['React', 'Antlr', 'Compiler Design'],
      icon: '⚙️',
      size: 'small',
      featured: false
    }
  ]

  return (
    <motion.section 
      id="projects" 
      className="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section-header">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">A showcase of my work</p>
      </div>
      <div className="bento-grid">
        {projects.map((project, index) => (
          <motion.div 
            key={index} 
            className={`bento-item ${project.size} ${project.featured ? 'featured' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="bento-icon">{project.icon}</div>
            <h3 className="bento-title">{project.title}</h3>
            <p className="bento-subtitle">{project.subtitle}</p>
            <p className="bento-description">{project.description}</p>
            <div className="bento-technologies">
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="bento-tech">{tech}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default Projects

