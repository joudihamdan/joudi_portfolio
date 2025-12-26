  import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './MouseTrail.css'

function MouseTrail({ isDarkMode }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      }
      
      setParticles((prev) => [...prev.slice(-20), newParticle])
      
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id))
      }, 1000)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="mouse-trail">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`trail-particle ${isDarkMode ? 'dark' : ''}`}
          initial={{
            x: particle.x,
            y: particle.y,
            scale: 1,
            opacity: 0.8,
          }}
          animate={{
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 1,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  )
}

export default MouseTrail

