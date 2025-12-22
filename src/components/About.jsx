import React from 'react'
import './About.css'

function About() {
  return (
    <section id="about" className="about">
      <div className="section-header">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">Get to know me better</p>
      </div>
      <div className="about-content">
        <div className="about-text">
          <p>
            Hello! I'm a passionate web developer with a love for creating beautiful,
            functional, and user-friendly websites. I enjoy turning complex problems
            into simple, elegant solutions.
          </p>
          <p>
            When I'm not coding, you can find me exploring new technologies, contributing
            to open-source projects, or sharing my knowledge with the developer community.
          </p>
          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">3+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

