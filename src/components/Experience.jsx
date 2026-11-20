import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { reveal } from '../motion'
import { ShieldCheck, KanbanSquare, Bot, Smartphone } from 'lucide-react'
import './Experience.css'

function Experience() {
  const [activeIndex, setActiveIndex] = useState(null)

  const experiences = [
    {
      period: 'Nov 2025 – Present',
      title: 'Quality Assurance Engineer',
      company: 'Learning-Go',
      meta: 'Damascus, Syria · Full-time',
      // The platform redesign is the headline responsibility
      leadHighlight: true,
      description:
        'Sole QA Engineer for a web and mobile educational platform serving around 3,000 users, in production for over five years, working within an Agile team.',
      highlights: [
        'Own QA activities throughout a major platform redesign, validating new features while maintaining regression coverage for existing functionality ahead of release.',
        'Review requirements and user stories with Product Owners to validate business rules and identify gaps before implementation.',
        'Design and execute test cases covering functional, regression, exploratory, and critical business flows across web and mobile.',
        'Perform API testing using Postman and Swagger, validating status codes, response data, input validation, and error handling.',
        'Document and track defects in Jira and GitLab with clear reproduction steps, expected and actual results, severity, and priority.',
        'Maintain test documentation and QA processes, and participate in sprint planning, backlog refinement, and release verification.',
      ],
      technologies: ['Jira', 'GitLab', 'Postman', 'Swagger', 'Web & Mobile Testing', 'Agile'],
      Icon: ShieldCheck,
    },
    {
      // One company, two roles — each role carries its own title and dates.
      title: 'Tech Sauce',
      meta: 'Damascus, Syria · Contract',
      roles: [
        {
          title: 'Scrum Master',
          period: 'Aug 2025 – Nov 2025',
          highlights: [
            'Facilitated Agile ceremonies and coordinated sprint activities across two concurrent projects.',
            'Tracked progress, identified blockers, and supported alignment on sprint priorities.',
            'Reviewed delivered features against acceptance criteria before sprint reviews.',
          ],
        },
        {
          title: 'Mobile Application Developer',
          period: 'Jan 2025 – Jul 2025',
          highlights: [
            'Developed mobile application features using Flutter, integrated REST APIs, and implemented state management solutions.',
          ],
        },
      ],
      technologies: ['Scrum', 'Sprint Planning', 'Jira', 'Flutter', 'REST APIs'],
      Icon: KanbanSquare,
    },
    {
      period: 'Jun 2025 – Present',
      title: 'Robotics Instructor',
      company: 'Genius Planet Academy',
      meta: 'Part-time',
      description:
        'Teach programming and robotics to children and teenagers through hands-on STEM activities.',
      highlights: [
        'Teach programming concepts using Scratch and PictoBlox.',
        'Design interactive activities that build logical thinking and problem-solving.',
      ],
      technologies: ['Robotics', 'Scratch', 'PictoBlox', 'STEM Education'],
      Icon: Bot,
    },
    {
      period: 'Sep 2024 – Feb 2025',
      title: 'Flutter Training Assistant',
      company: 'Sanad Youth',
      description:
        'Supported a Flutter training program delivered by FreelancerHub in collaboration with Sanad Development Team, helping students with hands-on practice and technical questions.',
      technologies: ['Flutter', 'Training'],
      Icon: Smartphone,
    },
  ]

  return (
    <motion.section
      id="experience"
      className="experience"
    >
      <div className="section-header">
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">
          Professional experience across QA, Agile delivery, development, and teaching
        </p>
      </div>
      <div className="experience-container">
        <div className="experience-line"></div>
        {experiences.map((role, index) => (
          <motion.div
            key={role.title}
            className={`experience-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            {...reveal({ x: -16, y: 0 })}
            whileHover={{ scale: 1.02, x: 10 }}
          >
            <div className="experience-marker">
              <span className="experience-icon">
                <role.Icon size={22} strokeWidth={1.5} />
              </span>
            </div>
            <div className="experience-content">
              {role.period && <div className="experience-period">{role.period}</div>}
              <h3 className="experience-title">{role.title}</h3>
              <p className="experience-company">
                {[role.company, role.meta].filter(Boolean).join(' · ')}
              </p>
              {role.description && <p className="experience-description">{role.description}</p>}
              {role.highlights?.length > 0 && (
                <ul className="experience-highlights">
                  {role.highlights.map((item, i) => (
                    <li key={i} className={role.leadHighlight && i === 0 ? 'is-lead' : undefined}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {role.roles?.map((sub) => (
                <div key={sub.title} className="experience-role">
                  <div className="experience-role-head">
                    <h4 className="experience-role-title">{sub.title}</h4>
                    <span className="experience-role-period">{sub.period}</span>
                  </div>
                  <ul className="experience-highlights">
                    {sub.highlights.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="experience-technologies">
                {role.technologies.map((tech) => (
                  <span key={tech} className="chip">
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
