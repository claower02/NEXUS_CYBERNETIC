"use client"
import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Terminal, Cpu, Bot, User, Zap, MessageSquare, Users } from "lucide-react"

// Github SVG Component
const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
)

export function Navbar() {
  const pathname = usePathname()

  // Hide Navbar on Login page (Mandatory Registration Barrier)
  if (pathname === "/login") return null

  return (
    <nav className="glass-panel" style={{ 
      position: 'fixed', 
      top: '16px', 
      left: '50%', 
      transform: 'translateX(-50%)',
      width: 'calc(100% - 32px)',
      maxWidth: '1200px',
      padding: '12px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Terminal className="text-neon-green" size={28} />
          <span style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '2px' }} className="mono text-neon-green">
            NEXUS_CYBERNETIC
          </span>
        </Link>
        <div style={{ display: 'flex', gap: '24px', opacity: 0.8 }} className="mono">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="glitch-hover">
            <Cpu size={18} /> Лента
          </Link>
          <Link href="/intel" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="text-neon-green glitch-hover">
            <Zap size={18} /> Intel
          </Link>
          <Link href="/nodes" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="text-neon-blue glitch-hover">
            <Users size={18} /> Nodes
          </Link>
          <Link href="/comms" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="text-neon-purple glitch-hover">
            <MessageSquare size={18} /> Comms
          </Link>
          <Link href="/ai-hub" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="text-neon-purple glitch-hover">
            <Bot size={18} /> Нейронки
          </Link>
          <Link href="/workspace" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="text-neon-blue glitch-hover">
            <User size={18} /> Workspace
          </Link>
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link href="/login" className="neon-button primary">
          <GithubIcon size={18} />
          Войти
        </Link>
      </div>
    </nav>
  )
}
