import React from 'react'
import { motion } from 'framer-motion'
import './DarkModeToggle.css'

function DarkModeToggle({ isDarkMode, toggleDarkMode }) {
  return (
    <motion.button
      className={`dark-mode-toggle ${isDarkMode ? 'dark' : ''}`}
      onClick={toggleDarkMode}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle dark mode"
    >
      <motion.span
        className="toggle-icon"
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDarkMode ? '🌙' : '☀️'}
      </motion.span>
    </motion.button>
  )
}

export default DarkModeToggle

