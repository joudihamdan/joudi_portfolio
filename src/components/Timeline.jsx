import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './Timeline.css'

function Timeline({ isDarkMode }) {
  const [activeIndex, setActiveIndex] = useState(null)

  const timelineEvents = [
    {
      year: '2020',
      title: 'Damascus University',
      subtitle: 'Bachelor\'s Degree in Information Technology Engineering',
      description: 'Started my journey in Software Engineering specialization',
      type: 'education',
      icon: '🎓'
    },
    {
      year: '2022',
      title: 'Teens in Al Damascus Hackathon',
      subtitle: 'Coach',
      description: 'Coached and mentored young developers in their hackathon journey',
      type: 'volunteer',
      icon: '👨‍🏫'
    },
    {
      year: '2022',
      title: 'Damascus CPC',
      subtitle: 'Participant',
      description: 'Competed in competitive programming contest',
      type: 'participation',
      icon: '💻'
    },
    {
      year: '2024',
      title: 'RIDESHARE APP',
      subtitle: 'Mobile Application Developer',
      description: 'Developed a mobile application for renting bicycles from city hubs. Built with Bloc and Clean Architecture, featuring real-time geolocation and booking management.',
      type: 'project',
      icon: '🚴',
      technologies: ['Flutter', 'Bloc', 'Clean Architecture', 'Maps API']
    },
    {
      year: '2024',
      title: 'DAHAB CLINIC MANAGEMENT',
      subtitle: 'Mobile Application Developer',
      description: 'A mobile application for managing appointments and patient sessions in a beauty clinic. Built with GetX (MVC architecture), featuring appointment scheduling, patient profiles, customizable themes, and push notifications.',
      type: 'project',
      icon: '💅',
      technologies: ['Flutter', 'GetX', 'Firebase', 'MVC']
    },
    {
      year: '2024',
      title: 'Compiler for React',
      subtitle: 'Project',
      description: 'Designed and built a React-based compiler using Antlr to parse and understand custom JSX syntax.',
      type: 'project',
      icon: '⚙️',
      technologies: ['React', 'Antlr', 'Compiler Design']
    },
    {
      year: '2024',
      title: 'Agile Project Management',
      subtitle: 'Scrum Master Experience',
      description: 'Gained practical experience in managing projects using Jira, including creating product backlogs, defining user stories, and organizing sprint boards.',
      type: 'experience',
      icon: '📋',
      technologies: ['Jira', 'Agile', 'Scrum']
    },
    {
      year: '2024',
      title: 'Syrian CPC',
      subtitle: 'Organizer',
      description: 'Led coordination and logistics for the competitive programming contest',
      type: 'volunteer',
      icon: '🎯'
    },
    {
      year: '2024-2025',
      title: 'Assistant Flutter Coach',
      subtitle: 'Sanad',
      description: 'Supported and mentored junior developers in learning Flutter',
      type: 'volunteer',
      icon: '👨‍💼'
    },
    {
      year: '2025',
      title: 'MERSOOL',
      subtitle: 'Food Delivery App - Published on Google Play',
      description: 'A cross-platform mobile application for browsing restaurants, selecting meals, and placing delivery orders. Built with Bloc and Clean Architecture, featuring Map API integration and real-time order tracking.',
      type: 'project',
      icon: '🍔',
      technologies: ['Flutter', 'Bloc', 'Clean Architecture', 'Maps API']
    },
    {
      year: '2025',
      title: 'CLICK CASH',
      subtitle: 'Digital Money Transfer App',
      description: 'Developed a mobile app enabling secure account creation with phone number verification (OTP), password, or fingerprint authentication. Implemented bank account management, money transfer system, transaction history, and Business accounts.',
      type: 'project',
      icon: '💳',
      technologies: ['Flutter', 'Firebase', 'Authentication', 'QR Code']
    },
    {
      year: '2025',
      title: 'Current Role',
      subtitle: 'QA Tester & Scrum Master',
      description: 'Currently working as QA Tester and Scrum Master, ensuring quality assurance and facilitating agile development processes.',
      type: 'experience',
      icon: '✅',
      technologies: ['QA Testing', 'Scrum', 'Agile']
    }
  ]

  return (
    <motion.section 
      id="timeline" 
      className="timeline"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
      style={{ position: 'relative', zIndex: 1 }}
    >
      <div className="section-header">
        <h2 className="section-title">My Journey</h2>
        <p className="section-subtitle">From university to professional developer</p>
      </div>
      <div className="timeline-container">
        <div className="timeline-line"></div>
        {timelineEvents.map((event, index) => (
          <motion.div 
            key={index} 
            className={`timeline-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 10 }}
          >
            <div className="timeline-marker">
              <span className="timeline-icon">{event.icon}</span>
            </div>
            <div className="timeline-content">
              <div className="timeline-year">{event.year}</div>
              <h3 className="timeline-title">{event.title}</h3>
              <p className="timeline-subtitle">{event.subtitle}</p>
              <p className="timeline-description">{event.description}</p>
              {event.technologies && (
                <div className="timeline-technologies">
                  {event.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-badge">{tech}</span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default Timeline

