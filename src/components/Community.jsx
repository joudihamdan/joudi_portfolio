import React from 'react'
import { motion } from 'framer-motion'
import { Users, Terminal, Target, Mic2, BookOpen } from 'lucide-react'
import './Community.css'

function Community() {
  const activities = [
    {
      period: '2020 – 2025',
      title: 'Educational Content Creator',
      organization: 'RBCS Team',
      description:
        'Created and scripted educational content for university-level students across YouTube and live sessions, designing structured lecture materials that improved engagement and clarity.',
      Icon: BookOpen,
    },
    {
      period: '2024',
      title: 'Mobile Dev Meetup Organizer',
      organization: 'Sanad Team for Development',
      description:
        'Organized community meetups for mobile developers covering security in mobile development, DevOps patterns, and cross-discipline knowledge sharing.',
      Icon: Mic2,
    },
    {
      period: '2024',
      title: 'Competitive Programming Organizer',
      organization: 'Syrian CPC (ICPC)',
      description:
        'Led coordination and logistics for the competitive programming contest, supporting the local programming community.',
      Icon: Target,
    },
    {
      period: '2022',
      title: 'Hackathon Coach',
      organization: 'Teens in AI — Damascus Hackathon',
      description:
        'Coached and mentored young developers through their hackathon journey, supporting problem-solving and technical guidance.',
      Icon: Users,
    },
    {
      period: '2022',
      title: 'Competitive Programming Participant',
      organization: 'Damascus CPC',
      description:
        'Competed in competitive programming contests, strengthening algorithmic thinking and problem-solving skills.',
      Icon: Terminal,
    },
  ]

  return (
    <motion.section
      id="community"
      className="community"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section-header">
        <h2 className="section-title">Training &amp; Mentorship</h2>
        <p className="section-subtitle">
          Coaching, teaching, and mentoring across mobile development and the tech community
        </p>
      </div>
      <div className="community-grid">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.title}
            className="community-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="community-card-top">
              <div className="community-icon">
                <activity.Icon size={28} strokeWidth={1.5} />
              </div>
            </div>
            {activity.period && <span className="community-period">{activity.period}</span>}
            <h3 className="community-title">{activity.title}</h3>
            <p className="community-org">{activity.organization}</p>
            <p className="community-description">{activity.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default Community
