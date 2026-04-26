"use client"
import React, { useEffect, useState } from 'react'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setHidden(false)
    }
    const onMouseDown = () => setClicked(true)
    const onMouseUp = () => setClicked(false)
    const onMouseLeave = () => setHidden(true)

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  if (typeof window === 'undefined' || hidden) return null

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          width: '10px',
          height: '10px',
          backgroundColor: 'var(--neon-green)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: `translate(-50%, -50%) scale(${clicked ? 0.8 : 1})`,
          transition: 'transform 0.1s ease',
          boxShadow: '0 0 10px var(--neon-green)'
        }}
      />
      <div 
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          width: '40px',
          height: '40px',
          border: '1px solid var(--neon-blue)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: `translate(-50%, -50%) scale(${clicked ? 1.5 : 1})`,
          transition: 'transform 0.2s ease, width 0.2s, height 0.2s',
          opacity: 0.5
        }}
      />
    </>
  )
}
