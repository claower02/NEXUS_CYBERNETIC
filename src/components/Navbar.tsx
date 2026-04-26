"use client"
import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Terminal, Cpu, Bot, User, Zap, MessageSquare, Users, LogOut, ChevronDown } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  if (pathname === "/login") return null

  const navLinks = [
    { href: "/", label: "Лента", icon: <Cpu size={16} />, color: "" },
    { href: "/intel", label: "Intel", icon: <Zap size={16} />, color: "text-neon-green" },
    { href: "/nodes", label: "Nodes", icon: <Users size={16} />, color: "text-neon-blue" },
    { href: "/comms", label: "Comms", icon: <MessageSquare size={16} />, color: "text-neon-purple" },
    { href: "/ai-hub", label: "AI Hub", icon: <Bot size={16} />, color: "text-neon-purple" },
    { href: "/workspace", label: "Workspace", icon: <User size={16} />, color: "text-neon-blue" },
  ]

  return (
    <nav style={{
      position: 'fixed',
      top: '12px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 32px)',
      maxWidth: '1200px',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 200,
      background: 'rgba(8, 8, 18, 0.85)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderRadius: '16px',
      boxShadow: '0 4px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(0,210,255,0.15)',
    }}>
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <div style={{
          width: '32px', height: '32px',
          background: 'linear-gradient(135deg, var(--neon-green), var(--neon-blue))',
          borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 12px rgba(0,255,136,0.4)'
        }}>
          <Terminal size={18} color="#000" />
        </div>
        <span style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '2px', fontFamily: "'Fira Code', monospace" }}
          className="text-neon-green">
          NEXUS
        </span>
      </Link>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {navLinks.map(link => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 14px', borderRadius: '10px',
                fontSize: '0.85rem', fontFamily: "'Fira Code', monospace",
                fontWeight: isActive ? 600 : 400,
                background: isActive ? 'rgba(0,210,255,0.12)' : 'transparent',
                color: isActive ? 'var(--neon-blue)' : 'rgba(255,255,255,0.6)',
                transition: 'all 0.2s ease',
                textDecoration: 'none',
                boxShadow: isActive ? 'inset 0 0 0 1px rgba(0,210,255,0.3)' : 'none',
              }}
            >
              {link.icon}
              {link.label}
            </Link>
          )
        })}
      </div>

      {/* User Section */}
      <div style={{ position: 'relative' }}>
        {session?.user ? (
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'rgba(255,255,255,0.05)',
              border: 'none', borderRadius: '10px',
              padding: '7px 14px', cursor: 'pointer',
              color: '#fff', transition: 'all 0.2s',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
            }}
          >
            {session.user.image ? (
              <img src={session.user.image} alt="avatar"
                style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid var(--neon-blue)' }} />
            ) : (
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-blue))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: 700
              }}>
                {(session.user.name || 'G')[0].toUpperCase()}
              </div>
            )}
            <span style={{ fontSize: '0.85rem', fontFamily: "'Fira Code', monospace", maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {session.user.name || 'Guest'}
            </span>
            <ChevronDown size={14} style={{ opacity: 0.5, transform: userMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>
        ) : (
          <Link href="/login" style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'linear-gradient(135deg, rgba(181,56,255,0.3), rgba(0,210,255,0.2))',
            padding: '8px 18px', borderRadius: '10px',
            color: '#fff', fontSize: '0.85rem',
            fontFamily: "'Fira Code', monospace",
            textDecoration: 'none',
            boxShadow: 'inset 0 0 0 1px rgba(181,56,255,0.3)',
          }}>
            <User size={16} /> Войти
          </Link>
        )}

        {/* Dropdown */}
        {userMenuOpen && session?.user && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 8px)', right: 0,
            background: 'rgba(8,8,18,0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px', padding: '8px',
            minWidth: '200px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
            zIndex: 300,
          }}>
            <div style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '8px' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{session.user.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{session.user.email}</div>
            </div>
            <Link href="/workspace" onClick={() => setUserMenuOpen(false)} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', borderRadius: '8px',
              color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem',
              textDecoration: 'none', transition: 'all 0.2s',
            }}>
              <User size={15} /> Мой профиль
            </Link>
            <button onClick={() => signOut({ callbackUrl: '/login' })} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              width: '100%', padding: '10px 12px', borderRadius: '8px',
              background: 'none', border: 'none',
              color: 'var(--neon-red)', fontSize: '0.85rem',
              cursor: 'pointer', transition: 'all 0.2s',
              fontFamily: "'Fira Code', monospace",
            }}>
              <LogOut size={15} /> Выйти из системы
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
