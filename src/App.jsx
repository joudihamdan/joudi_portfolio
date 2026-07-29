import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Community from './components/Community'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AnimatedBackground from './components/AnimatedBackground'
import MouseTrail from './components/MouseTrail'
import DarkModeToggle from './components/DarkModeToggle'
import './App.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('theme', 'light')
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="App">
      <AnimatedBackground isDarkMode={isDarkMode} />
      <MouseTrail isDarkMode={isDarkMode} />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Community />
        <Education />
        <Contact />
        <Footer />
      </motion.div>
    </div>
  )
}

export default App
