import React from 'react'
import './PhoneFrame.css'

// One CSS-only phone frame shared by the project cards and the gallery.
// The frame is capped at the screenshot's natural width so small images
// (e.g. the Dahab screens) are never upscaled.
function PhoneFrame({ screen, alt, className = '', lazy = true, imgStyle }) {
  return (
    <div className={`phone-frame ${className}`} style={{ '--natural-w': `${screen.width}px` }}>
      <img
        src={screen.src}
        alt={alt}
        width={screen.width}
        height={screen.height}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        style={imgStyle}
      />
    </div>
  )
}

export default PhoneFrame
