"use client"
import React, { useState, useEffect } from "react"
import { Zap, Filter, RefreshCw, Cpu, Shield, Brain, Code2, Globe, TrendingUp } from "lucide-react"

type Category = "all" | "ai" | "security" | "systems" | "dev" | "web3"

interface IntelItem {
  id: number
  category: Category
  title: string
  summary: string
  source: string
  time: string
  hot: boolean
  url?: string
}

const INTEL_DATA: IntelItem[] = [
  { id: 1, category: "ai", title: "DeepSeek R2 превзошёл GPT-4o на математических бенчмарках", summary: "Новая модель показала SOTA на Math500 и AIME. Open-source веса опубликованы на Hugging Face.", source: "ARXIV", time: "12 мин", hot: true },
  { id: 2, category: "security", title: "Критический 0-day в OpenSSH: уязвимость pre-auth RCE", summary: "CVE-2024-9999: затронуты версии до 9.8. Патч уже в стабильной ветке. Обновитесь немедленно.", source: "CVE DB", time: "34 мин", hot: true },
  { id: 3, category: "systems", title: "Rust официально включён в ядро Linux 6.12", summary: "Первый Rust-драйвер в мейнлайн. Торвальдс подтвердил: 'C и Rust будут сосуществовать'.", source: "LWN", time: "1 ч", hot: false },
  { id: 4, category: "ai", title: "Google анонсировал Gemini Ultra 2.5 с нативным кодингом", summary: "Нативная интеграция с IDE, 2M context window, поддержка выполнения кода в sandbox.", source: "GOOGLE", time: "2 ч", hot: true },
  { id: 5, category: "dev", title: "Next.js 17 beta: React Server Components получают стейт", summary: "Революционное изменение: RSC теперь могут иметь локальный стейт без превращения в клиентские.", source: "VERCEL", time: "3 ч", hot: false },
  { id: 6, category: "web3", title: "Ethereum L2 достиг 1M TPS в тестнете", summary: "ZK-rollup архитектура нового поколения. Finality за 2 секунды при стоимости $0.001.", source: "ETHDEV", time: "4 ч", hot: false },
  { id: 7, category: "security", title: "ИИ-система обнаружила 12 новых уязвимостей в популярных OSS-библиотеках", summary: "LLM-powered SAST инструмент от Snyk нашёл баги, которые пропустили 10 лет ручного ревью.", source: "SNYK", time: "5 ч", hot: false },
  { id: 8, category: "systems", title: "RISC-V процессор обогнал Apple M3 в HPC-задачах", summary: "Open-hardware архитектура показала +40% перформанс в scientific computing workloads.", source: "ANANDTECH", time: "6 ч", hot: false },
  { id: 9, category: "ai", title: "Anthropic Claude 4 Opus доступен через API", summary: "200K контекст, улучшенный reasoning, нативная поддержка мультимодальных агентов.", source: "ANTHROPIC", time: "8 ч", hot: true },
  { id: 10, category: "dev", title: "Bun 2.0: Node.js совместимость 99.7%", summary: "Новый модуль bundler в 3x быстрее esbuild. Встроенный SQLite. TypeScript без transpilation.", source: "BUN.SH", time: "10 ч", hot: false },
]

const CATEGORIES = [
  { id: "all" as Category, label: "Все", icon: <Globe size={14} />, color: "#fff" },
  { id: "ai" as Category, label: "AI / ML", icon: <Brain size={14} />, color: "var(--neon-purple)" },
  { id: "security" as Category, label: "Security", icon: <Shield size={14} />, color: "var(--neon-red)" },
  { id: "systems" as Category, label: "Systems", icon: <Cpu size={14} />, color: "var(--neon-blue)" },
  { id: "dev" as Category, label: "Dev Tools", icon: <Code2 size={14} />, color: "var(--neon-green)" },
  { id: "web3" as Category, label: "Web3", icon: <TrendingUp size={14} />, color: "#f7931a" },
]

const CAT_COLORS: Record<Category, string> = {
  all: "#fff", ai: "var(--neon-purple)", security: "var(--neon-red)",
  systems: "var(--neon-blue)", dev: "var(--neon-green)", web3: "#f7931a",
}

export default function IntelPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all")
  const [items, setItems] = useState(INTEL_DATA)
  const [refreshing, setRefreshing] = useState(false)
  const [ticker, setTicker] = useState(0)

  // Live ticker
  useEffect(() => {
    const t = setInterval(() => setTicker(x => x + 1), 5000)
    return () => clearInterval(t)
  }, [])

  const filtered = activeCategory === "all" ? items : items.filter(i => i.category === activeCategory)
  const hotItems = items.filter(i => i.hot)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1200)
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', gap: '28px', alignItems: 'flex-start' }}>

      {/* Main Column */}
      <div style={{ flex: 1, minWidth: 0 }}>

        {/* Header */}
        <div className="glass-panel" style={{ padding: '24px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h1 className="mono" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Zap className="text-neon-blue" size={24} />
                INTEL_STREAM
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px', fontFamily: "'Fira Code', monospace" }}>
                Live-поток IT-событий · {items.length} записей · Обновлено {ticker * 5}с назад
              </p>
            </div>
            <button onClick={handleRefresh} className="neon-button" style={{ padding: '9px 18px' }}>
              <RefreshCw size={14} className={refreshing ? "animate-pulse-glow" : ""} style={{ transition: 'transform 0.5s', transform: refreshing ? 'rotate(360deg)' : 'none' }} />
              Refresh
            </button>
          </div>

          {/* Live indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '8px', background: 'rgba(0,255,136,0.05)', width: 'fit-content' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--neon-green)', boxShadow: '0 0 8px var(--neon-green)', animation: 'pulseGlow 2s infinite' }} />
            <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--neon-green)' }}>STREAM ACTIVE — данные обновляются в реальном времени</span>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer',
              fontSize: '0.82rem', fontFamily: "'Fira Code', monospace",
              background: activeCategory === cat.id ? `rgba(255,255,255,0.08)` : 'rgba(255,255,255,0.03)',
              color: activeCategory === cat.id ? cat.color : 'var(--text-muted)',
              boxShadow: activeCategory === cat.id ? `inset 0 0 0 1px ${cat.color}40` : 'none',
              transition: 'all 0.2s',
            }} style={{ color: activeCategory === cat.id ? cat.color : 'var(--text-muted)' } as React.CSSProperties}>
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map((item, i) => (
            <div key={item.id} className="hologram-card" style={{ padding: '22px', animationDelay: `${i * 0.05}s` }}>
              {i < 2 && <div className="scan-ray" style={{ animationDelay: `${i * 3}s` }} />}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                  background: `${CAT_COLORS[item.category]}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `inset 0 0 0 1px ${CAT_COLORS[item.category]}30`,
                }}>
                  {CATEGORIES.find(c => c.id === item.category)?.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.4, flex: 1 }}>
                      {item.hot && <span style={{ display: 'inline-block', marginRight: '8px', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,56,96,0.15)', color: 'var(--neon-red)', fontFamily: "'Fira Code', monospace", verticalAlign: 'middle' }}>HOT</span>}
                      {item.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0, alignItems: 'center' }}>
                      <span className="mono" style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', background: `${CAT_COLORS[item.category]}15`, color: CAT_COLORS[item.category] }}>{item.source}</span>
                      <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.time} назад</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.summary}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div style={{ width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Hot right now */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h4 className="mono" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--neon-red)', fontSize: '0.85rem' }}>
            🔥 HOT RIGHT NOW
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {hotItems.slice(0, 3).map(item => (
              <div key={item.id} style={{ paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="mono" style={{ fontSize: '0.68rem', color: CAT_COLORS[item.category] }}>
                  {item.source}
                </span>
                <p style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.8)', marginTop: '4px', lineHeight: 1.4 }}>{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h4 className="mono" style={{ marginBottom: '16px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>STREAM STATS</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {CATEGORIES.filter(c => c.id !== 'all').map(cat => {
              const count = items.filter(i => i.category === cat.id).length
              const pct = Math.round(count / items.length * 100)
              return (
                <div key={cat.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span className="mono" style={{ fontSize: '0.78rem', color: cat.color }}>{cat.label}</span>
                    <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{count}</span>
                  </div>
                  <div style={{ height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,0.05)' }}>
                    <div style={{ height: '100%', borderRadius: '2px', background: cat.color, width: `${pct}%`, opacity: 0.7, transition: 'width 0.5s ease' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
