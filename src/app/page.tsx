"use client"
import React, { useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Heart, MessageSquare, Share2, Code, GitBranch, Star, FolderGit2, Zap, TrendingUp, Clock, Bookmark } from "lucide-react"

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
)

const posts = [
  {
    id: 1,
    author: "cipher_root",
    name: "Alex K.",
    role: "Systems Engineer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cipher",
    content: "Переписал наш лог-парсер с Node.js на Rust. Результат — ×14 по скорости, ×3 по памяти. Теперь 500k строк/сек на одном ядре. Если кто работает с высоконагруженными системами — рекомендую смотреть в сторону nom + tokio.",
    code: `fn parse_log(input: &str) -> IResult<&str, LogEntry> {
  let (i, ts) = parse_timestamp(input)?;
  let (i, level) = parse_level(i)?;
  Ok((i, LogEntry { timestamp: ts, level }))
}`,
    tags: ["#rust", "#performance", "#parsing"],
    likes: 248, comments: 41, time: "2ч назад", liked: false, saved: false,
  },
  {
    id: 2,
    author: "neon_architect",
    name: "Maya S.",
    role: "Frontend Lead",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=neon",
    content: "Выкладываю в паблик свой UI-кит на glassmorphism. Используется в трёх продакшн-проектах. PR welcome — хочу добавить поддержку темизации и более гибкую систему spacing.",
    repo: {
      name: "neon-glass-ui",
      desc: "Premium glassmorphism React component library with cyberpunk aesthetics",
      stars: 1240, forks: 187, lang: "TypeScript", topics: ["react", "ui", "glassmorphism"],
    },
    tags: ["#ui", "#react", "#opensource"],
    likes: 512, comments: 94, time: "4ч назад", liked: true, saved: false,
  },
  {
    id: 3,
    author: "zero_day_dev",
    name: "Dmitri V.",
    role: "Security Researcher",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zero",
    content: "Обнаружил интересный паттерн в современных LLM: при определённых prompt-конструкциях модель начинает 'галлюцинировать' с предсказуемым bias. Пишу статью. Пока — вот визуализация распределения по 10k запросов.",
    tags: ["#llm", "#security", "#ai", "#research"],
    likes: 387, comments: 63, time: "7ч назад", liked: false, saved: true,
  },
]

const trendingTopics = [
  { tag: "#rust", posts: "2.4k" },
  { tag: "#ai-agents", posts: "1.8k" },
  { tag: "#kubernetes", posts: "1.2k" },
  { tag: "#nextjs15", posts: "980" },
  { tag: "#wasm", posts: "740" },
]

const intelItems = [
  { cat: "AI", text: "DeepSeek R2 превзошёл GPT-4o в математике", time: "15м" },
  { cat: "SEC", text: "0-day в OpenSSH: патч уже доступен", time: "1ч" },
  { cat: "SYS", text: "Rust добавлен в ядро Linux 6.12", time: "3ч" },
]

export default function Home() {
  const { data: session } = useSession()
  const [postText, setPostText] = useState("")
  const [showCode, setShowCode] = useState(false)
  const [codeText, setCodeText] = useState("")
  const [showRepo, setShowRepo] = useState(false)
  const [localPosts, setLocalPosts] = useState(posts)
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set([2]))
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set([3]))
  const [activeFilter, setActiveFilter] = useState("new")

  const handleLike = (id: number) => {
    setLikedPosts(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
    setLocalPosts(prev => prev.map(p => p.id === id ? { ...p, likes: likedPosts.has(id) ? p.likes - 1 : p.likes + 1 } : p))
  }

  const handleSave = (id: number) => {
    setSavedPosts(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  const handlePublish = () => {
    if (!postText.trim()) return
    const newPost = {
      id: Date.now(),
      author: session?.user?.name?.toLowerCase().replace(/\s/g, '_') || "guest_node",
      name: session?.user?.name || "Guest Node",
      role: "NEXUS Member",
      avatar: session?.user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
      content: postText,
      code: showCode ? codeText : undefined,
      repo: undefined,
      tags: [],
      likes: 0, comments: 0,
      time: "только что",
      liked: false, saved: false,
    }
    setLocalPosts([newPost, ...localPosts])
    setPostText(""); setCodeText(""); setShowCode(false); setShowRepo(false)
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', gap: '28px', alignItems: 'flex-start' }}>

      {/* ── Main Feed ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0 }}>

        {/* Create Post */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            {session?.user?.image
              ? <img src={session.user.image} alt="avatar" style={{ width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0, border: '2px solid rgba(0,210,255,0.3)' }} />
              : <div style={{ width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0, background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-blue))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.1rem' }}>
                  {(session?.user?.name || 'G')[0]}
                </div>
            }
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <textarea
                value={postText}
                onChange={e => setPostText(e.target.value)}
                placeholder="Поделитесь идеей, кодом или репозиторием..."
                rows={3}
                style={{
                  width: '100%', background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px',
                  padding: '14px', color: '#fff', resize: 'none',
                  fontFamily: 'inherit', fontSize: '0.95rem', lineHeight: 1.6,
                  outline: 'none', transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(0,210,255,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />

              {showCode && (
                <textarea
                  value={codeText}
                  onChange={e => setCodeText(e.target.value)}
                  placeholder="// Вставьте код сюда..."
                  rows={4}
                  style={{
                    width: '100%', background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(0,255,136,0.2)', borderRadius: '10px',
                    padding: '14px', color: 'var(--neon-green)',
                    fontFamily: "'Fira Code', monospace", fontSize: '0.85rem', resize: 'vertical',
                    outline: 'none',
                  }}
                />
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="neon-button" onClick={() => setShowCode(!showCode)}
                    style={{ padding: '7px 14px', fontSize: '0.8rem', background: showCode ? 'rgba(0,255,136,0.1)' : undefined }}>
                    <Code size={14} /> Код
                  </button>
                  <button className="neon-button" onClick={() => setShowRepo(!showRepo)}
                    style={{ padding: '7px 14px', fontSize: '0.8rem' }}>
                    <GithubIcon size={14} /> Репо
                  </button>
                </div>
                <button
                  className="neon-button primary"
                  onClick={handlePublish}
                  disabled={!postText.trim()}
                  style={{ padding: '8px 20px', opacity: postText.trim() ? 1 : 0.4 }}>
                  Опубликовать
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {[{ id: 'new', label: 'Новое', icon: <Clock size={14} /> }, { id: 'top', label: 'Популярное', icon: <TrendingUp size={14} /> }].map(f => (
            <button key={f.id} onClick={() => setActiveFilter(f.id)} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 18px', borderRadius: '10px', border: 'none', cursor: 'pointer',
              fontSize: '0.85rem', fontFamily: "'Fira Code', monospace", fontWeight: 500,
              background: activeFilter === f.id ? 'rgba(0,210,255,0.15)' : 'rgba(255,255,255,0.04)',
              color: activeFilter === f.id ? 'var(--neon-blue)' : 'var(--text-secondary)',
              boxShadow: activeFilter === f.id ? 'inset 0 0 0 1px rgba(0,210,255,0.3)' : 'none',
              transition: 'all 0.2s',
            }}>{f.icon} {f.label}</button>
          ))}
        </div>

        {/* Posts */}
        {localPosts.map((post, i) => (
          <article key={post.id} className="hologram-card" style={{ padding: '28px', animationDelay: `${i * 0.1}s` }}>
            <div className="scan-ray" style={{ animationDelay: `${i * 2}s` }} />

            {/* Author */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '18px' }}>
              <img src={post.avatar} alt={post.name} style={{ width: '46px', height: '46px', borderRadius: '12px', border: '2px solid rgba(0,210,255,0.2)', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{post.name}</span>
                    <span className="mono" style={{ color: 'var(--neon-blue)', fontSize: '0.8rem', marginLeft: '8px' }}>@{post.author}</span>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '2px', fontFamily: "'Fira Code', monospace" }}>{post.role}</div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: "'Fira Code', monospace", whiteSpace: 'nowrap' }}>{post.time}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <p style={{ lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', marginBottom: '16px', fontSize: '0.95rem' }}>
              {post.content}
            </p>

            {/* Code block */}
            {post.code && (
              <pre className="mono" style={{
                background: 'rgba(0,0,0,0.5)', borderRadius: '10px',
                padding: '16px', color: 'var(--neon-green)', fontSize: '0.82rem',
                overflowX: 'auto', marginBottom: '16px', lineHeight: 1.6,
                boxShadow: 'inset 0 0 0 1px rgba(0,255,136,0.15)',
              }}><code>{post.code}</code></pre>
            )}

            {/* Repo card */}
            {post.repo && (
              <div style={{
                marginBottom: '16px', padding: '18px', borderRadius: '12px',
                background: 'rgba(0,0,0,0.3)',
                boxShadow: 'inset 0 0 0 1px rgba(181,56,255,0.2)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <GithubIcon size={18} />
                    <span style={{ fontWeight: 600, fontFamily: "'Fira Code', monospace", color: 'var(--neon-blue)' }}>{post.repo.name}</span>
                    <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '20px', background: 'rgba(0,255,136,0.1)', color: 'var(--neon-green)', fontFamily: "'Fira Code', monospace" }}>
                      {post.repo.lang}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={12} style={{ color: 'var(--neon-green)' }} /> {post.repo.stars.toLocaleString()}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><GitBranch size={12} style={{ color: 'var(--neon-blue)' }} /> {post.repo.forks}</span>
                  </div>
                </div>
                <p style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{post.repo.desc}</p>
                <div style={{ marginTop: '10px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {post.repo.topics.map(t => (
                    <span key={t} className="mono" style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '6px', background: 'rgba(0,210,255,0.08)', color: 'var(--neon-blue)' }}>
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {post.tags.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
                {post.tags.map(tag => (
                  <span key={tag} className="mono" style={{ fontSize: '0.8rem', color: 'var(--neon-blue)', opacity: 0.7 }}>{tag}</span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '4px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <button onClick={() => handleLike(post.id)} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 14px', borderRadius: '8px', border: 'none',
                background: likedPosts.has(post.id) ? 'rgba(255,56,96,0.12)' : 'rgba(255,255,255,0.04)',
                color: likedPosts.has(post.id) ? 'var(--neon-red)' : 'var(--text-secondary)',
                cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.2s',
              }}>
                <Heart size={15} fill={likedPosts.has(post.id) ? 'currentColor' : 'none'} />
                {post.likes + (likedPosts.has(post.id) && !post.liked ? 1 : 0)}
              </button>

              <button style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 14px', borderRadius: '8px', border: 'none',
                background: 'rgba(255,255,255,0.04)', color: 'var(--text-secondary)',
                cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.2s',
              }}>
                <MessageSquare size={15} /> {post.comments}
              </button>

              <button onClick={() => handleSave(post.id)} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 14px', borderRadius: '8px', border: 'none',
                background: savedPosts.has(post.id) ? 'rgba(0,210,255,0.1)' : 'rgba(255,255,255,0.04)',
                color: savedPosts.has(post.id) ? 'var(--neon-blue)' : 'var(--text-secondary)',
                cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.2s', marginLeft: 'auto',
              }}>
                <Bookmark size={15} fill={savedPosts.has(post.id) ? 'currentColor' : 'none'} />
              </button>

              <button style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 14px', borderRadius: '8px', border: 'none',
                background: 'rgba(255,255,255,0.04)', color: 'var(--text-secondary)',
                cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.2s',
              }}>
                <Share2 size={15} />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* ── Right Sidebar ── */}
      <div style={{ width: '290px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* INTEL widget */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h4 className="mono" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '0.85rem', color: 'var(--neon-blue)' }}>
            <Zap size={14} /> LATEST_INTEL
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {intelItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span className="mono" style={{
                  fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', flexShrink: 0,
                  background: i === 0 ? 'rgba(181,56,255,0.15)' : i === 1 ? 'rgba(255,56,96,0.12)' : 'rgba(0,210,255,0.1)',
                  color: i === 0 ? 'var(--neon-purple)' : i === 1 ? 'var(--neon-red)' : 'var(--neon-blue)',
                }}>
                  {item.cat}
                </span>
                <div>
                  <p style={{ fontSize: '0.82rem', lineHeight: 1.4, color: 'rgba(255,255,255,0.8)' }}>{item.text}</p>
                  <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.time} назад</span>
                </div>
              </div>
            ))}
            <Link href="/intel" className="mono" style={{
              fontSize: '0.75rem', color: 'var(--neon-blue)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px',
            }}>
              Весь поток →
            </Link>
          </div>
        </div>

        {/* Trending tags */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h4 className="mono" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '0.85rem', color: 'var(--neon-green)' }}>
            <TrendingUp size={14} /> TRENDING
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {trendingTopics.map((t, i) => (
              <div key={t.tag} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="mono" style={{ fontSize: '0.85rem', color: i < 2 ? 'var(--neon-green)' : 'rgba(255,255,255,0.6)' }}>{t.tag}</span>
                <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.posts}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h4 className="mono" style={{ marginBottom: '14px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>НАВИГАЦИЯ</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { href: '/intel', label: 'Intel Stream', color: 'var(--neon-green)' },
              { href: '/nodes', label: 'Find Nodes', color: 'var(--neon-blue)' },
              { href: '/comms', label: 'Comms Link', color: 'var(--neon-purple)' },
              { href: '/ai-hub', label: 'AI Workspace', color: 'var(--neon-purple)' },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{
                padding: '9px 14px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.03)',
                color: l.color, fontSize: '0.82rem',
                fontFamily: "'Fira Code', monospace",
                display: 'block', transition: 'all 0.2s',
              }}>→ {l.label}</Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
