import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, KanbanSquare, Bot, Smartphone } from 'lucide-react'
import './Experience.css'

function Experience() {
  const [activeIndex, setActiveIndex] = useState(null)

  const experiences = [
    {
      period: 'Nov 2025 – Present',
      title: 'QA Engineer',
      company: 'Learning Go',
      location: 'Damascus, Syria',
      description:
        'Quality assurance for an educational platform, validating features across the full SDLC within an Agile team.',
      highlights: [
        'Design and execute structured test cases covering functional, regression, and business-critical scenarios.',
        'Collaborate with Product Owners to review requirements, refine user stories, and validate business rules.',
        'Identify, document, prioritize, and track defects using Jira and GitLab through the full defect lifecycle.',
        'Perform API testing to validate backend functionality and system integration.',
        'Develop automated test scenarios for selected application features.',
        'Document test cases, scenarios, and QA processes for traceability and team collaboration.',
        'Participate in Agile ceremonies including backlog refinement, sprint planning, and release verification.',
      ],
      technologies: ['Jira', 'GitLab', 'Postman', 'Swagger', 'Agile', 'Test Automation'],
      Icon: ShieldCheck,
    },
    {
      period: 'July 2025 – Oct 2025',
      title: 'Scrum Master & QA Tester',
      company: 'TechSauce',
      location: 'Damascus, Syria',
      description:
        'Dual role leading Agile delivery and quality assurance across two concurrent software projects.',
      highlights: [
        'Led Agile ceremonies for two concurrent projects, ensuring task alignment and removing blockers.',
        'Validated implemented features against acceptance criteria and business requirements before release.',
        'Performed comprehensive manual testing to ensure applications matched technical specifications.',
        'Monitored project progress and task distribution to ensure timely, high-quality delivery.',
      ],
      technologies: ['Jira', 'Scrum', 'Manual Testing', 'Agile', 'Acceptance Criteria'],
      Icon: KanbanSquare,
    },
    {
      period: 'Jun 2025 – Present',
      title: 'Robotics & Programming Coach',
      company: 'Genius Planet Academy',
      location: '',
      description:
        'Teaching robotics, Scratch, PictoBlox, and software-related topics to children and teenagers through hands-on STEM activities and interactive learning experiences.',
      highlights: [
        'Teaching Scratch',
        'Teaching PictoBlox',
        'Teaching robotics concepts',
        'Teaching software-related learning tracks',
        'Designing educational activities for different age groups',
        'Encouraging creativity, logical thinking, and problem-solving',
      ],
      technologies: ['Robotics', 'Scratch', 'PictoBlox', 'STEM Education'],
      Icon: Bot,
    },
    {
      period: '2024 – 2025',
      title: 'Assistant Flutter Coach',
      company: 'Sanad Development Team',
      location: '',
      description:
        'Supported and mentored junior developers in learning Flutter, simplifying technical concepts and guiding hands-on mobile development practice.',
      highlights: [],
      technologies: ['Flutter', 'Mobile Development', 'Mentoring'],
      Icon: Smartphone,
    },
  ]

  return (
    <motion.section
      id="experience"
      className="experience"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="section-header">
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">
          Professional experience across QA, Agile delivery, coaching, and mentorship
        </p>
      </div>
      <div className="experience-container">
        <div className="experience-line"></div>
        {experiences.map((role, index) => (
          <motion.div
            key={role.title}
            className={`experience-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 10 }}
          >
            <div className="experience-marker">
              <span className="experience-icon">
                <role.Icon size={22} strokeWidth={1.5} />
              </span>
            </div>
            <div className="experience-content">
              <div className="experience-period">{role.period}</div>
              <h3 className="experience-title">{role.title}</h3>
              <p className="experience-company">
                {role.company}{role.location ? ` · ${role.location}` : ''}
              </p>
              <p className="experience-description">{role.description}</p>
              {role.highlights.length > 0 && (
                <ul className="experience-highlights">
                  {role.highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
              <div className="experience-technologies">
                {role.technologies.map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default Experience
