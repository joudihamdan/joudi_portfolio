import React from 'react'
import { motion } from 'framer-motion'
import { Wallet, UtensilsCrossed, CalendarCheck, Bike, Code2 } from 'lucide-react'
import './Projects.css'

function Projects() {
  const primaryProjects = [
    {
      title: 'CLICK CASH',
      subtitle: 'Digital Money Transfer App',
      badge: 'Flagship · Development',
      description:
        'A full-featured fintech mobile app built in Flutter — secure onboarding with OTP, password, and fingerprint authentication; bank-account management; a money-transfer system via QR code or phone number with real-time notifications; transaction history and scheduling; and dedicated business accounts for sales, invoices, and payment requests.',
      devHighlight:
        'End-to-end development — authentication and security, transaction logic, business accounts, and real-time notifications.',
      technologies: ['Flutter', 'Firebase', 'Bloc', 'Authentication', 'QR / Payments'],
      Icon: Wallet,
      size: 'wide',
      type: 'dev',
    },
    {
      title: 'MERSOOL',
      subtitle: 'Food Delivery App — Published on Google Play',
      description:
        'Cross-platform food delivery app built with Flutter and Bloc, featuring restaurant browsing, meal ordering, and real-time order tracking with Map API integration.',
      qaContribution:
        'Validated ordering, tracking, and location services; identified edge cases to improve stability and user experience.',
      technologies: ['Flutter', 'Bloc', 'Clean Architecture', 'Maps API'],
      Icon: UtensilsCrossed,
      size: 'third',
      type: 'qa',
    },
    {
      title: 'DAHAB CLINIC',
      subtitle: 'Clinic Management App',
      description:
        'Clinic management app built with Flutter and GetX for appointment scheduling, patient profiles, customizable themes, and push notifications.',
      qaContribution:
        'Tested appointment scheduling, patient management, multi-language support, and UI theme validation.',
      technologies: ['Flutter', 'GetX', 'Firebase', 'MVC'],
      Icon: CalendarCheck,
      size: 'third',
      type: 'qa',
    },
    {
      title: 'RIDESHARE APP',
      subtitle: 'Bicycle Rental System',
      description:
        'Mobile app for renting bicycles from city hubs, built with Bloc and Clean Architecture with real-time geolocation and booking management.',
      qaContribution:
        'Tested booking flows, ride tracking, and real-time location feature validation.',
      technologies: ['Flutter', 'Bloc', 'Clean Architecture', 'Maps'],
      Icon: Bike,
      size: 'third',
      type: 'qa',
    },
  ]

  const secondaryProjects = [
    {
      title: 'Compiler for React',
      subtitle: 'Custom JSX Parser',
      description:
        'Designed and built a React-based compiler using Antlr to parse and understand custom JSX syntax — demonstrating strong software engineering fundamentals.',
      technologies: ['React', 'Antlr', 'Compiler Design'],
      Icon: Code2,
    },
  ]

  return (
    <motion.section
      id="projects"
      className="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.01 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section-header">
        <h2 className="section-title">Engineering Projects</h2>
        <p className="section-subtitle">
          Flagship builds and mobile apps from my software-engineering work — with QA contributions where I led testing
        </p>
      </div>
      <div className="bento-grid">
        {primaryProjects.map((project, index) => (
          <motion.div
            key={project.title}
            className={`bento-item ${project.size} featured ${project.type === 'dev' ? 'is-dev' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            {project.badge && <span className="bento-badge">{project.badge}</span>}
            {project.Icon && (
              <div className="bento-icon">
                <project.Icon size={40} strokeWidth={1.5} />
              </div>
            )}
            <h3 className="bento-title">{project.title}</h3>
            <p className="bento-subtitle">{project.subtitle}</p>
            <p className="bento-description">{project.description}</p>
            {project.qaContribution && (
              <p className="bento-qa">
                <span className="bento-qa-label">QA contribution:</span> {project.qaContribution}
              </p>
            )}
            {project.devHighlight && (
              <p className="bento-qa bento-dev">
                <span className="bento-qa-label">Development:</span> {project.devHighlight}
              </p>
            )}
            <div className="bento-technologies">
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="bento-tech">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="projects-secondary">
        <h3 className="projects-secondary-title">Additional Development Work</h3>
        <div className="projects-secondary-grid">
          {secondaryProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className="bento-item projects-secondary-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {project.Icon && (
                <div className="bento-icon">
                  <project.Icon size={32} strokeWidth={1.5} />
                </div>
              )}
              <h3 className="bento-title">{project.title}</h3>
              <p className="bento-subtitle">{project.subtitle}</p>
              <p className="bento-description">{project.description}</p>
              <div className="bento-technologies">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="bento-tech">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Projects
