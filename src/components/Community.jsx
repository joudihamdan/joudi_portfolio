import React from 'react'
import { motion } from 'framer-motion'
import { reveal } from '../motion'
import { Users, Target, Megaphone, BookOpen, Terminal } from 'lucide-react'
import './Community.css'

function Community() {
  const activities = [
    {
      period: 'Oct 2025',
      title: 'Public Relations Coordinator',
      organization: 'Flutter Bridge, Syria Tech Meetup',
      description:
        "Part of the organizing team for Flutter Bridge, one of Syria's first community events dedicated to Flutter, aimed at beginners and developers looking to start working with it. Coordinated public relations and outreach with the organizing team.",
      Icon: Megaphone,
    },
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
      title: 'Competitive Programming Organizer',
      organization: 'Syrian CPC (ICPC)',
      description:
        'Led coordination and logistics for the competitive programming contest, supporting the local programming community.',
      Icon: Target,
    },
    {
      period: '2022',
      title: 'Hackathon Coach',
      organization: 'Teens in AI, Damascus Hackathon',
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
    <section id="community-involvement" className="community">
      <div className="section-header">
        <h2 className="section-title">Community Involvement</h2>
        <p className="section-subtitle">
          Organizing, mentoring, and contributing to the tech community
        </p>
      </div>
      <div className="community-grid">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.title}
            className="community-card"
            {...reveal()}
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
    </section>
  )
}

export default Community
