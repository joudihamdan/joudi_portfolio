import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import './MouseTrail.css'

// A particle is only spawned once the cursor has actually travelled far enough,
// and no more often than MIN_INTERVAL. Browsers fire mousemove while the page
// scrolls under a stationary cursor, so the distance check keeps scrolling free
// of trail work entirely.
const MIN_DISTANCE = 8
const MIN_INTERVAL = 40

function MouseTrail({ isDarkMode }) {
  const [particles, setParticles] = useState([])
  const lastRef = useRef({ x: -Infinity, y: -Infinity, t: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = e.timeStamp
      const last = lastRef.current

      if (now - last.t < MIN_INTERVAL) return

      const dx = e.clientX - last.x
      const dy = e.clientY - last.y
      if (dx * dx + dy * dy < MIN_DISTANCE * MIN_DISTANCE) return

      lastRef.current = { x: e.clientX, y: e.clientY, t: now }

      setParticles((prev) => [
        ...prev.slice(-20),
        { id: `${now}-${Math.random()}`, x: e.clientX, y: e.clientY },
      ])
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const removeParticle = (id) =>
    setParticles((prev) => prev.filter((p) => p.id !== id))

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
            ease: 'easeOut',
          }}
          onAnimationComplete={() => removeParticle(particle.id)}
        />
      ))}
    </div>
  )
}

export default MouseTrail
