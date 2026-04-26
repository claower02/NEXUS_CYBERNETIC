"use client"
import React, { useState, useEffect } from "react"
import { useSession, signOut, signIn } from "next-auth/react"
import { User, GitBranch, Star, Code2, Settings, Bell, Shield, LogOut, Edit3, Check, Zap } from "lucide-react"

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
)

const ACTIVITY = [
  { type: "post", text: "Опубликовал пост о Rust-парсере", time: "2ч назад", color: "var(--neon-blue)" },
  { type: "star", text: "Поставил звезду neon-glass-ui", time: "5ч назад", color: "var(--neon-green)" },
  { type: "connect", text: "Установил связь с @ai_mesh_lin", time: "1д назад", color: "var(--neon-purple)" },
  { type: "comment", text: "Прокомментировал пост @cipher_root", time: "1д назад", color: "var(--neon-blue)" },
  { type: "post", text: "Опубликовал сниппет: async Rust", time: "3д назад", color: "var(--neon-blue)" },
]

const SKILLS = ["Rust", "TypeScript", "Next.js", "PostgreSQL", "Docker", "Linux", "System Design", "API Design"]
const getLanguageColor = (lang: string) => {
  const colors: Record<string, string> = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Rust: "#dea584",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    Go: "#00ADD8",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
  };
  return colors[lang] || "#888888";
}

const TABS = ["Профиль", "Активность", "Репозитории", "Настройки"]

export default function WorkspacePage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState(0)
  const [editMode, setEditMode] = useState(false)
  const [bio, setBio] = useState("Systems developer. Rust & TypeScript. Open-source contributor. Building performant software.")
  const [savedBio, setSavedBio] = useState(bio)
  const [notifications, setNotifications] = useState({ posts: true, mentions: true, messages: true })
  const [repos, setRepos] = useState<any[]>([])
  const [loadingRepos, setLoadingRepos] = useState(false)

  const handle = session?.user?.name?.toLowerCase().replace(/\s+/g, '_') || "guest_node"
  const isGuest = session?.user?.email === "guest@nexus.cyber"

  useEffect(() => {
    const login = (session?.user as any)?.login;
    if (!isGuest && login) {
      setLoadingRepos(true)
      fetch(`https://api.github.com/users/${login}/repos?sort=updated&per_page=6`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setRepos(data)
          setLoadingRepos(false)
        })
        .catch(() => setLoadingRepos(false))
    }
  }, [isGuest, session])

  return (
    <div className="animate-fade-in page-layout">

      {/* Sidebar Profile Card */}
      <div className="page-sidebar">

        <div className="glass-panel" style={{ padding: '28px', textAlign: 'center' }}>
          {/* Avatar */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
            {session?.user?.image ? (
              <img src={session.user.image} alt="avatar" style={{
                width: '88px', height: '88px', borderRadius: '20px',
                border: '3px solid rgba(0,210,255,0.3)',
                boxShadow: '0 0 20px rgba(0,210,255,0.2)',
              }} />
            ) : (
              <div style={{
                width: '88px', height: '88px', borderRadius: '20px',
                background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-blue))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem', fontWeight: 700,
                boxShadow: '0 0 20px rgba(181,56,255,0.3)',
              }}>
                {(session?.user?.name || 'G')[0]}
              </div>
            )}
            {!isGuest && (
              <div style={{
                position: 'absolute', bottom: -4, right: -4,
                width: '20px', height: '20px', borderRadius: '50%',
                background: 'var(--neon-green)', border: '3px solid rgba(8,8,18,0.9)',
                boxShadow: '0 0 8px var(--neon-green)',
              }} />
            )}
          </div>

          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>
            {session?.user?.name || "Guest Node"}
          </h2>
          <div className="mono" style={{ fontSize: '0.82rem', color: 'var(--neon-blue)', marginBottom: '12px' }}>
            @{handle}
          </div>

          {isGuest && (
            <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,140,0,0.1)', boxShadow: 'inset 0 0 0 1px rgba(255,140,0,0.3)', marginBottom: '16px' }}>
              <p className="mono" style={{ fontSize: '0.75rem', color: '#ff8c00', lineHeight: 1.5 }}>
                Гостевой режим ограничен. Войдите через GitHub для полного доступа.
              </p>
            </div>
          )}

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '20px' }}>
            {savedBio}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
            {[
              { label: "Постов", value: isGuest ? "—" : "12" },
              { label: "Связей", value: isGuest ? "—" : "47" },
              { label: "Репо", value: isGuest ? "—" : repos.length.toString() },
              { label: "Звёзд", value: isGuest ? "—" : "187" },
            ].map(stat => (
              <div key={stat.label} style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)' }}>
                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{stat.value}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: "'Fira Code', monospace" }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {!isGuest && (
            <a href={`https://github.com/${handle}`} target="_blank" rel="noreferrer" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)',
              color: '#fff', fontSize: '0.85rem', fontFamily: "'Fira Code', monospace",
              textDecoration: 'none', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
              transition: 'all 0.2s',
            }}>
              <GithubIcon size={15} /> GitHub Profile
            </a>
          )}
        </div>

        {/* Skills */}
        {!isGuest && (
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h4 className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>TECH STACK</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {SKILLS.map(s => (
                <span key={s} className="mono" style={{
                  fontSize: '0.72rem', padding: '4px 10px', borderRadius: '8px',
                  background: 'rgba(0,210,255,0.08)', color: 'var(--neon-blue)',
                  boxShadow: 'inset 0 0 0 1px rgba(0,210,255,0.15)',
                }}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {!isGuest && (
          <button 
            onClick={() => signIn('google', { callbackUrl: '/workspace' })} 
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '12px', borderRadius: '12px', border: 'none', cursor: 'pointer',
              background: 'rgba(255,255,255,0.05)',
              color: 'var(--text-primary)', fontSize: '0.85rem',
              fontFamily: "'Fira Code', monospace",
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)',
              transition: 'all 0.2s',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
             Привязать Google
          </button>
        )}

        <button onClick={() => signOut({ callbackUrl: '/login' })} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          padding: '12px', borderRadius: '12px', border: 'none', cursor: 'pointer',
          background: 'rgba(255,56,96,0.08)',
          color: 'var(--neon-red)', fontSize: '0.85rem',
          fontFamily: "'Fira Code', monospace", fontWeight: 600,
          boxShadow: 'inset 0 0 0 1px rgba(255,56,96,0.2)',
          transition: 'all 0.2s',
        }}>
          <LogOut size={15} /> Выйти из системы
        </button>
      </div>

      {/* Main area */}
      <div className="page-main">

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
          {TABS.map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(i)} style={{
              padding: '9px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer',
              fontSize: '0.85rem', fontFamily: "'Fira Code', monospace",
              background: activeTab === i ? 'rgba(0,210,255,0.12)' : 'rgba(255,255,255,0.04)',
              color: activeTab === i ? 'var(--neon-blue)' : 'var(--text-muted)',
              boxShadow: activeTab === i ? 'inset 0 0 0 1px rgba(0,210,255,0.3)' : 'none',
              transition: 'all 0.2s',
            }}>{tab}</button>
          ))}
        </div>

        {/* Tab: Profile */}
        {activeTab === 0 && (
          <div className="glass-panel" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Информация профиля</h3>
              <button onClick={() => { if (editMode) setSavedBio(bio); setEditMode(!editMode) }} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                background: editMode ? 'rgba(0,255,136,0.1)' : 'rgba(255,255,255,0.05)',
                color: editMode ? 'var(--neon-green)' : 'var(--text-secondary)',
                fontFamily: "'Fira Code', monospace", fontSize: '0.8rem',
                boxShadow: editMode ? 'inset 0 0 0 1px rgba(0,255,136,0.2)' : 'none',
              }}>
                {editMode ? <><Check size={13} /> Сохранить</> : <><Edit3 size={13} /> Редактировать</>}
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { label: "Имя", value: session?.user?.name || "Guest Node", editable: false },
                { label: "Email", value: session?.user?.email || "—", editable: false },
                { label: "Хэндл", value: `@${handle}`, editable: false },
              ].map(f => (
                <div key={f.label}>
                  <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>{f.label}</label>
                  <div style={{ padding: '11px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}>
                    {f.value}
                  </div>
                </div>
              ))}
              <div>
                <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>О себе</label>
                {editMode ? (
                  <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} style={{
                    width: '100%', background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(0,210,255,0.3)', borderRadius: '10px',
                    padding: '11px 14px', color: '#fff', resize: 'vertical',
                    fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none',
                  }} />
                ) : (
                  <div style={{ padding: '11px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}>
                    {savedBio}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Activity */}
        {activeTab === 1 && (
          <div className="glass-panel" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={16} className="text-neon-blue" /> Последняя активность
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {!isGuest && Array.isArray(ACTIVITY) && ACTIVITY.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', paddingBottom: '16px', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0, background: `${a.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 1px ${a.color}30` }}>
                    <Zap size={14} style={{ color: a.color }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.88rem' }}>{a.text}</p>
                    <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{a.time}</span>
                  </div>
                </div>
              ))}
              {isGuest && (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  <User size={32} style={{ marginBottom: '12px', opacity: 0.3 }} />
                  <p className="mono" style={{ fontSize: '0.85rem' }}>Войдите через GitHub для просмотра активности</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab: Repos */}
        {activeTab === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {isGuest ? (
              <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
                <Code2 size={32} style={{ marginBottom: '12px', opacity: 0.3 }} />
                <p className="mono" style={{ color: 'var(--text-muted)' }}>Войдите через GitHub для просмотра репозиториев</p>
              </div>
            ) : loadingRepos ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div className="spinner" style={{ borderTopColor: 'var(--neon-blue)', width: '30px', height: '30px', margin: '0 auto 16px', borderRadius: '50%', border: '2px solid rgba(0,210,255,0.2)', borderTop: '2px solid var(--neon-blue)', animation: 'spin 1s linear infinite' }} />
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                <p className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Синхронизация с GitHub GRID...</p>
              </div>
            ) : (!repos || repos.length === 0) ? (
              <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
                <p className="mono" style={{ color: 'var(--text-muted)' }}>Публичные репозитории не найдены.</p>
              </div>
            ) : Array.isArray(repos) && repos.map((repo: any) => {
              const langColor = getLanguageColor(repo.language || "Unknown");
              return (
              <div key={repo.name} className="hologram-card" style={{ padding: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <GithubIcon size={16} />
                      <span style={{ fontWeight: 600, color: 'var(--neon-blue)', fontFamily: "'Fira Code', monospace" }}>{repo.name}</span>
                      <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '6px', background: `${langColor}15`, color: langColor, fontFamily: "'Fira Code', monospace" }}>
                        {repo.language || "Unknown"}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px' }}>{repo.description || "No description provided."}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', color: 'var(--text-muted)', fontSize: '0.82rem', fontFamily: "'Fira Code', monospace" }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={12} style={{ color: 'var(--neon-green)' }} /> {repo.stargazers_count}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><GitBranch size={12} /> {repo.forks_count}</span>
                  </div>
                </div>
              </div>
            ); }) }
          </div>
        )}

        {/* Tab: Settings */}
        {activeTab === 3 && (
          <div className="glass-panel" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Settings size={16} /> Настройки аккаунта
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Bell size={13} /> Уведомления
              </h4>
              {[
                { key: 'posts' as const, label: 'Новые посты в ленте' },
                { key: 'mentions' as const, label: 'Упоминания @меня' },
                { key: 'messages' as const, label: 'Личные сообщения' },
              ].map(item => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)' }}>
                  <span style={{ fontSize: '0.88rem' }}>{item.label}</span>
                  <button onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))} style={{
                    width: '44px', height: '24px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                    background: notifications[item.key] ? 'var(--neon-blue)' : 'rgba(255,255,255,0.1)',
                    position: 'relative', transition: 'all 0.3s',
                  }}>
                    <div style={{
                      position: 'absolute', top: '3px',
                      left: notifications[item.key] ? '22px' : '3px',
                      width: '18px', height: '18px', borderRadius: '50%',
                      background: '#fff', transition: 'left 0.3s',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
                    }} />
                  </button>
                </div>
              ))}

              <div style={{ marginTop: '8px', padding: '16px', borderRadius: '12px', background: 'rgba(255,56,96,0.06)', boxShadow: 'inset 0 0 0 1px rgba(255,56,96,0.15)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Shield size={14} style={{ color: 'var(--neon-red)' }} />
                  <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--neon-red)' }}>Удалить аккаунт</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  Все ваши данные будут безвозвратно удалены.
                </p>
                <button style={{
                  padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  background: 'rgba(255,56,96,0.15)', color: 'var(--neon-red)',
                  fontFamily: "'Fira Code', monospace", fontSize: '0.8rem',
                }}>
                  Удалить аккаунт
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
