"use client"
import React, { useState } from "react"
import { useSession, signIn } from "next-auth/react"
import { Bot, Zap, AlertTriangle, ExternalLink, CreditCard, CheckCircle } from "lucide-react"

interface AIModel {
  id: string
  name: string
  provider: string
  description: string
  tokensLeft: number
  totalTokens: number
  color: string
  freeUrl: string
  upgradeUrl: string
  features: string[]
  badge?: string
}

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
)

const GoogleIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

const MODELS: AIModel[] = [
  {
    id: "gemini",
    name: "Gemini 2.0 Flash",
    provider: "Google",
    description: "Самая быстрая модель Google. Отлично справляется с кодингом, анализом данных и многошаговыми задачами. Требует Google-аккаунт.",
    tokensLeft: 847500,
    totalTokens: 1000000,
    color: "#4285F4",
    freeUrl: "https://aistudio.google.com",
    upgradeUrl: "https://ai.google.dev/gemini-api/docs/billing",
    features: ["1M context", "Code generation", "Multimodal", "Function calling"],
    badge: "Бесплатно",
  },
  {
    id: "deepseek",
    name: "DeepSeek R1",
    provider: "DeepSeek",
    description: "Open-source reasoning модель, конкурент o1. Особенно сильна в математике и логических задачах. Бесплатный API с лимитами.",
    tokensLeft: 0,
    totalTokens: 500000,
    color: "#00d2ff",
    freeUrl: "https://platform.deepseek.com",
    upgradeUrl: "https://platform.deepseek.com/usage",
    features: ["Reasoning", "Math SOTA", "64K context", "Chain-of-thought"],
    badge: "Лимит исчерпан",
  },
  {
    id: "claude",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    description: "Лучшая модель для написания кода и анализа документов. Понимает нюансы, идеален для код-ревью и рефакторинга.",
    tokensLeft: 215000,
    totalTokens: 1000000,
    color: "#b538ff",
    freeUrl: "https://claude.ai",
    upgradeUrl: "https://claude.ai/upgrade",
    features: ["Code analysis", "200K context", "Artifacts", "Vision"],
    badge: "Pro",
  },
  {
    id: "gpt4o",
    name: "GPT-4o",
    provider: "OpenAI",
    description: "Флагманская мультимодальная модель OpenAI. Поддерживает текст, изображения, аудио. Через Google-аккаунт доступен бесплатный тир.",
    tokensLeft: 0,
    totalTokens: 80000,
    color: "#00ff88",
    freeUrl: "https://chatgpt.com",
    upgradeUrl: "https://openai.com/chatgpt/pricing",
    features: ["Vision", "Audio", "128K context", "Function calling"],
    badge: "Лимит исчерпан",
  },
  {
    id: "mistral",
    name: "Mistral Large 2",
    provider: "Mistral AI",
    description: "Мощная европейская открытая модель. Хорошо оптимизирована для многоязычных задач. Бесплатный Mistral AI тир через Google SSO.",
    tokensLeft: 680000,
    totalTokens: 700000,
    color: "#ff8c00",
    freeUrl: "https://mistral.ai",
    upgradeUrl: "https://mistral.ai/plans",
    features: ["Multilingual", "128K context", "Function calling", "JSON mode"],
    badge: "Бесплатно",
  },
]

export default function AIHubPage() {
  const { data: session, status } = useSession()
  const [selected, setSelected] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [showTokenAlert, setShowTokenAlert] = useState<string | null>(null)

  const model = MODELS.find(m => m.id === selected)

  const handleOpen = (m: AIModel) => {
    if (m.tokensLeft === 0) {
      setShowTokenAlert(m.id)
      return
    }
    window.open(m.freeUrl, "_blank")
  }

  const getBarPct = (m: AIModel) => Math.round(m.tokensLeft / m.totalTokens * 100)
  const getBarColor = (pct: number) => pct > 50 ? 'var(--neon-green)' : pct > 20 ? '#f7931a' : 'var(--neon-red)'

  return (
    <div className="animate-fade-in" style={{ display: 'flex', gap: '28px', alignItems: 'flex-start' }}>

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0 }}>

        {/* Header */}
        <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
            <div>
              <h1 className="mono" style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <Bot className="text-neon-purple" size={22} /> AI_WORKSPACE
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, fontFamily: "'Fira Code', monospace" }}>
                Все ведущие AI-модели в одном месте · Бесплатный доступ через ваш аккаунт
              </p>
            </div>

            {/* Auth status */}
            {status === "authenticated" ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', borderRadius: '12px', background: 'rgba(0,255,136,0.08)', boxShadow: 'inset 0 0 0 1px rgba(0,255,136,0.2)', flexShrink: 0 }}>
                {session.user?.image && <img src={session.user.image} alt="avatar" style={{ width: '28px', height: '28px', borderRadius: '50%' }} />}
                <div>
                  <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--neon-green)' }}>● {session.user?.name || 'Авторизован'}</div>
                  <div className="mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{session.user?.email}</div>
                </div>
              </div>
            ) : (
              <button onClick={() => signIn('github', { callbackUrl: '/ai-hub' })} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 18px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                background: 'rgba(0,255,136,0.1)', color: 'var(--neon-green)',
                fontFamily: "'Fira Code', monospace", fontSize: '0.85rem',
                boxShadow: 'inset 0 0 0 1px rgba(0,255,136,0.3)',
                flexShrink: 0,
              }}>
                <GithubIcon size={16} /> Войти через GitHub
              </button>
            )}
          </div>
        </div>

        {/* Token Alert Modal */}
        {showTokenAlert && (
          <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 500,
            backdropFilter: 'blur(8px)',
          }} onClick={() => setShowTokenAlert(null)}>
            <div className="glass-panel" style={{ padding: '32px', maxWidth: '440px', width: '90%', borderRadius: '20px' }}
              onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', alignItems: 'flex-start' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,56,96,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <AlertTriangle size={22} style={{ color: 'var(--neon-red)' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Токены исчерпаны</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                    Бесплатный лимит токенов для <strong>{MODELS.find(m => m.id === showTokenAlert)?.name}</strong> исчерпан. Перейдите на официальный сайт для пополнения.
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setShowTokenAlert(null)} style={{
                  flex: 1, padding: '11px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                  background: 'rgba(255,255,255,0.05)', color: '#fff', fontFamily: "'Fira Code', monospace", fontSize: '0.85rem',
                }}>
                  Закрыть
                </button>
                <button onClick={() => { window.open(MODELS.find(m => m.id === showTokenAlert)?.upgradeUrl, '_blank'); setShowTokenAlert(null) }} style={{
                  flex: 1, padding: '11px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(135deg, rgba(181,56,255,0.3), rgba(0,210,255,0.2))',
                  color: '#fff', fontFamily: "'Fira Code', monospace", fontSize: '0.85rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                }}>
                  <CreditCard size={14} /> Приобрести токены
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Model Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {MODELS.map(m => {
            const pct = getBarPct(m)
            const barColor = getBarColor(pct)
            const isEmpty = m.tokensLeft === 0
            return (
              <div key={m.id} className="hologram-card" style={{
                padding: '24px',
                opacity: isEmpty ? 0.65 : 1,
              }}>
                <div className="scan-ray" />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: m.color, boxShadow: `0 0 8px ${m.color}` }} />
                      <span style={{ fontWeight: 700, fontSize: '1rem' }}>{m.name}</span>
                    </div>
                    <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>by {m.provider}</span>
                  </div>
                  <span className="mono" style={{
                    fontSize: '0.68rem', padding: '3px 8px', borderRadius: '6px',
                    background: isEmpty ? 'rgba(255,56,96,0.12)' : 'rgba(0,255,136,0.1)',
                    color: isEmpty ? 'var(--neon-red)' : 'var(--neon-green)',
                  }}>
                    {m.badge}
                  </span>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px', minHeight: '50px' }}>{m.description}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {m.features.map(f => (
                    <span key={f} className="mono" style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
                      {f}
                    </span>
                  ))}
                </div>

                {/* Token bar */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Токены</span>
                    <span className="mono" style={{ fontSize: '0.72rem', color: barColor }}>
                      {isEmpty ? '0' : m.tokensLeft.toLocaleString()} / {m.totalTokens.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.06)' }}>
                    <div style={{ height: '100%', borderRadius: '2px', background: barColor, width: `${pct}%`, transition: 'width 0.5s', boxShadow: `0 0 6px ${barColor}` }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleOpen(m)} style={{
                    flex: 1, padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                    background: isEmpty ? 'rgba(255,56,96,0.1)' : `${m.color}20`,
                    color: isEmpty ? 'var(--neon-red)' : m.color,
                    fontFamily: "'Fira Code', monospace", fontSize: '0.8rem', fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    boxShadow: `inset 0 0 0 1px ${isEmpty ? 'rgba(255,56,96,0.2)' : m.color + '30'}`,
                    transition: 'all 0.2s',
                  }}>
                    {isEmpty ? <><AlertTriangle size={13}/> Лимит</> : <><ExternalLink size={13}/> Открыть</>}
                  </button>
                  {isEmpty && (
                    <button onClick={() => window.open(m.upgradeUrl, '_blank')} style={{
                      padding: '10px 14px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                      background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)',
                      fontFamily: "'Fira Code', monospace", fontSize: '0.78rem',
                      display: 'flex', alignItems: 'center', gap: '5px',
                      transition: 'all 0.2s',
                    }}>
                      <CreditCard size={12} /> Купить
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Sidebar */}
      <div style={{ width: '260px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h4 className="mono" style={{ marginBottom: '16px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>СВОДКА ТОКЕНОВ</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {MODELS.map(m => (
              <div key={m.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span className="mono" style={{ fontSize: '0.75rem', color: '#fff' }}>{m.name.split(' ')[0]}</span>
                  <span className="mono" style={{ fontSize: '0.72rem', color: getBarColor(getBarPct(m)) }}>
                    {getBarPct(m)}%
                  </span>
                </div>
                <div style={{ height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,0.05)' }}>
                  <div style={{ height: '100%', borderRadius: '2px', background: getBarColor(getBarPct(m)), width: `${getBarPct(m)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <h4 className="mono" style={{ marginBottom: '14px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>КАК ЭТО РАБОТАЕТ</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              "Все модели имеют бесплатный тир",
              "Токены привязаны к вашему аккаунту",
              "При исчерпании — покупка только на официальном сайте",
              "NEXUS не хранит ваши ключи API",
            ].map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <CheckCircle size={14} style={{ color: 'var(--neon-green)', flexShrink: 0, marginTop: '2px' }} />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
