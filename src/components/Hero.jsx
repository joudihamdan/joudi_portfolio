import React from 'react'
import './Hero.css'
// If you want to import the image from src/assets instead, uncomment the line below:
// import heroImage from '../assets/hero-image.png'

function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Joudi Hamdan</span>
          </h1>
          <h2 className="hero-subtitle">Software Engineer</h2>
          <p className="hero-description">
            I create beautiful and functional websites that provide great user experiences.
            Welcome to my portfolio!
          </p>
          <div className="hero-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => scrollToSection('projects')}
            >
              View My Work
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => scrollToSection('contact')}
            >
              Get In Touch
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-avatar">
            <div className="avatar-placeholder">
              <img 
                src="/hero-image.png"
                // If using import: src={heroImage}
                alt="Joudi Hamdan - Software Engineer"
                className="hero-image-img"
                onError={(e) => {
                  console.error('Image not found. Please add hero-image.png to the public folder.');
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="mouse"></div>
      </div>
    </section>
  )
}

export default Hero

