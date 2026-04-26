"use client"
import React, { useState } from "react"
import { useSession } from "next-auth/react"
import { Users, Search, UserPlus, Check, Code2, Shield, Cpu, Brain, Globe } from "lucide-react"

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
)

const nodes = [
  { id: 1, name: "Alex K.", handle: "cipher_root", role: "Systems Engineer", bio: "Rust, C++, kernel dev. Open to collaboration on low-level projects.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cipher", tags: ["rust", "systems", "kernel"], repos: 84, followers: 1240, online: true },
  { id: 2, name: "Maya S.", handle: "neon_architect", role: "Frontend Lead", bio: "Building premium UI systems. TypeScript fanatic. Design systems @ scale.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=neon", tags: ["react", "typescript", "ux"], repos: 47, followers: 892, online: true },
  { id: 3, name: "Dmitri V.", handle: "zero_day_dev", role: "Security Researcher", bio: "CVE hunter. LLM security research. Penetration testing & red teaming.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zero", tags: ["security", "llm", "red-team"], repos: 31, followers: 2100, online: false },
  { id: 4, name: "Lin W.", handle: "ai_mesh_lin", role: "ML Engineer", bio: "Distributed training, custom CUDA kernels, quantization research.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lin", tags: ["ai", "cuda", "pytorch"], repos: 56, followers: 3400, online: true },
  { id: 5, name: "Zara M.", handle: "web3_oracle", role: "Protocol Engineer", bio: "ZK-rollups, DeFi protocols, smart contract auditing. Building trustless infra.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zara", tags: ["web3", "zk", "solidity"], repos: 23, followers: 670, online: false },
  { id: 6, name: "Igor S.", handle: "devops_ghost", role: "Platform Engineer", bio: "Kubernetes at scale. 99.99% uptime. Chaos engineering advocate.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=igor", tags: ["k8s", "devops", "sre"], repos: 41, followers: 540, online: true },
]

const TAG_FILTERS = ["all", "rust", "systems", "security", "ai", "react", "web3", "k8s", "devops"]

export default function NodesPage() {
  const { data: session } = useSession()
  const [query, setQuery] = useState("")
  const [tag, setTag] = useState("all")
  const [connected, setConnected] = useState<Set<number>>(new Set())

  const filtered = nodes.filter(n => {
    const matchQuery = n.name.toLowerCase().includes(query.toLowerCase()) ||
      n.handle.toLowerCase().includes(query.toLowerCase()) ||
      n.bio.toLowerCase().includes(query.toLowerCase())
    const matchTag = tag === "all" || n.tags.includes(tag)
    return matchQuery && matchTag
  })

  const handleConnect = (id: number) => {
    setConnected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', gap: '28px', alignItems: 'flex-start' }}>

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Header */}
        <div className="glass-panel" style={{ padding: '24px', marginBottom: '20px' }}>
          <h1 className="mono" style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <Users className="text-neon-blue" size={22} /> CONNECTED_NODES
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: "'Fira Code', monospace" }}>
            Найдите разработчиков со схожими интересами
          </p>

          <div style={{ position: 'relative', marginTop: '20px' }}>
            <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Поиск по имени, хэндлу или технологии..."
              style={{
                width: '100%', background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px',
                padding: '12px 14px 12px 42px', color: '#fff',
                fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(0,210,255,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
          </div>
        </div>

        {/* Tag filters */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {TAG_FILTERS.map(t => (
            <button key={t} onClick={() => setTag(t)} style={{
              padding: '6px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              fontSize: '0.8rem', fontFamily: "'Fira Code', monospace",
              background: tag === t ? 'rgba(0,210,255,0.12)' : 'rgba(255,255,255,0.04)',
              color: tag === t ? 'var(--neon-blue)' : 'var(--text-muted)',
              boxShadow: tag === t ? 'inset 0 0 0 1px rgba(0,210,255,0.3)' : 'none',
              transition: 'all 0.2s',
            }}>
              #{t}
            </button>
          ))}
        </div>

        {/* Node cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {filtered.map(node => (
            <div key={node.id} className="hologram-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '14px', marginBottom: '16px' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img src={node.avatar} alt={node.name} style={{ width: '52px', height: '52px', borderRadius: '14px', border: '2px solid rgba(0,210,255,0.2)' }} />
                  <div style={{
                    position: 'absolute', bottom: 0, right: 0,
                    width: '12px', height: '12px', borderRadius: '50%',
                    background: node.online ? 'var(--neon-green)' : 'rgba(255,255,255,0.2)',
                    boxShadow: node.online ? '0 0 6px var(--neon-green)' : 'none',
                    border: '2px solid rgba(8,8,18,0.9)',
                  }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{node.name}</div>
                  <div className="mono" style={{ color: 'var(--neon-blue)', fontSize: '0.78rem' }}>@{node.handle}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '2px' }}>{node.role}</div>
                </div>
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px', minHeight: '50px' }}>{node.bio}</p>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                {node.tags.map(tag => (
                  <span key={tag} className="mono" style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '6px', background: 'rgba(0,210,255,0.08)', color: 'var(--neon-blue)' }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span style={{ color: '#fff', fontWeight: 600 }}>{node.repos}</span> repos
                  </span>
                  <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span style={{ color: '#fff', fontWeight: 600 }}>{node.followers.toLocaleString()}</span> followers
                  </span>
                </div>
                <button onClick={() => handleConnect(node.id)} style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '7px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  fontSize: '0.8rem', fontFamily: "'Fira Code', monospace", fontWeight: 500,
                  background: connected.has(node.id) ? 'rgba(0,255,136,0.12)' : 'rgba(0,210,255,0.1)',
                  color: connected.has(node.id) ? 'var(--neon-green)' : 'var(--neon-blue)',
                  boxShadow: `inset 0 0 0 1px ${connected.has(node.id) ? 'rgba(0,255,136,0.3)' : 'rgba(0,210,255,0.3)'}`,
                  transition: 'all 0.25s',
                }}>
                  {connected.has(node.id) ? <><Check size={13} /> Connected</> : <><UserPlus size={13} /> Connect</>}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <Users size={40} style={{ marginBottom: '16px', opacity: 0.3 }} />
            <p className="mono">Нет результатов по запросу «{query}»</p>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div style={{ width: '260px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h4 className="mono" style={{ marginBottom: '14px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>NETWORK STATS</h4>
          {[
            { label: "Активных нод", value: nodes.filter(n => n.online).length, color: 'var(--neon-green)' },
            { label: "Всего в сети", value: nodes.length, color: 'var(--neon-blue)' },
            { label: "Ваших связей", value: connected.size, color: 'var(--neon-purple)' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{s.label}</span>
              <span className="mono" style={{ fontWeight: 700, color: s.color }}>{s.value}</span>
            </div>
          ))}
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <h4 className="mono" style={{ marginBottom: '14px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>МОИ СВЯЗИ</h4>
          {connected.size === 0 ? (
            <p className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>Нет активных связей</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {nodes.filter(n => connected.has(n.id)).map(n => (
                <div key={n.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={n.avatar} alt={n.name} style={{ width: '32px', height: '32px', borderRadius: '8px' }} />
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{n.name}</div>
                    <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>@{n.handle}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
