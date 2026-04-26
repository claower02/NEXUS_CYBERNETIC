"use client"
import React, { useState, useRef, useEffect } from "react"
import { useSession } from "next-auth/react"
import { MessageSquare, Send, Search, Languages, Check, Plus, Lock } from "lucide-react"

interface Message {
  id: number
  from: string
  fromHandle: string
  text: string
  translated?: string
  time: string
  isMe: boolean
  lang: "ru" | "en" | "es" | "zh" | "de"
}

interface Chat {
  id: number
  name: string
  handle: string
  avatar: string
  lastMsg: string
  time: string
  unread: number
  online: boolean
  lang: string
}

const CHATS: Chat[] = [
  { id: 1, name: "Alex K.", handle: "cipher_root", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cipher", lastMsg: "Слушай, а как ты решил проблему с переполнением?", time: "2м", unread: 2, online: true, lang: "ru" },
  { id: 2, name: "Lin W.", handle: "ai_mesh_lin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lin", lastMsg: "Check out the CUDA kernel optimization I just pushed", time: "1ч", unread: 0, online: true, lang: "en" },
  { id: 3, name: "Zara M.", handle: "web3_oracle", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zara", lastMsg: "El diseño del protocolo está listo ¿revisamos?", time: "3ч", unread: 1, online: false, lang: "es" },
]

const MESSAGES_MAP: Record<number, Message[]> = {
  1: [
    { id: 1, from: "Alex K.", fromHandle: "cipher_root", text: "Привет! Видел твой пост про Rust парсер — очень крутое решение.", time: "14:20", isMe: false, lang: "ru" },
    { id: 2, from: "me", fromHandle: "me", text: "Спасибо! Долго боролся с lifetime'ами, но оно того стоило.", time: "14:22", isMe: true, lang: "ru" },
    { id: 3, from: "Alex K.", fromHandle: "cipher_root", text: "Как ты решил проблему с переполнением стека при глубокой рекурсии? Trampoline?", time: "14:25", isMe: false, lang: "ru" },
  ],
  2: [
    { id: 1, from: "Lin W.", fromHandle: "ai_mesh_lin", text: "Hey! I saw your post about the log parser. Did you consider using SIMD for the hot path?", time: "15:00", isMe: false, lang: "en" },
    { id: 2, from: "me", fromHandle: "me", text: "Not yet, but that's a great idea. What's your benchmarking setup?", time: "15:05", isMe: true, lang: "en" },
    { id: 3, from: "Lin W.", fromHandle: "ai_mesh_lin", text: "I use criterion.rs for micro-benchmarks and flamegraph for profiling. Check out the CUDA kernel optimization I just pushed — similar ideas apply.", time: "15:10", isMe: false, lang: "en" },
  ],
  3: [
    { id: 1, from: "Zara M.", fromHandle: "web3_oracle", text: "¡Hola! He terminado el diseño del protocolo ZK. ¿Puedes revisar la arquitectura conmigo?", time: "16:00", isMe: false, lang: "es" },
    { id: 2, from: "me", fromHandle: "me", text: "Claro, con gusto. ¿Cuándo podemos hablar?", time: "16:05", isMe: true, lang: "es" },
  ],
}

const TRANSLATIONS: Record<string, string> = {
  "Hey! I saw your post about the log parser. Did you consider using SIMD for the hot path?": "Эй! Видел твой пост про лог-парсер. Ты рассматривал использование SIMD для горячего пути?",
  "I use criterion.rs for micro-benchmarks and flamegraph for profiling. Check out the CUDA kernel optimization I just pushed — similar ideas apply.": "Я использую criterion.rs для микробенчмарков и flamegraph для профилирования. Посмотри на оптимизацию CUDA-ядра, которую я только что запушил — аналогичные идеи применимы.",
  "Check out the CUDA kernel optimization I just pushed": "Посмотри на оптимизацию CUDA-ядра, которую я только что запушил",
  "¡Hola! He terminado el diseño del protocolo ZK. ¿Puedes revisar la arquitectura conmigo?": "Привет! Я закончила дизайн протокола ZK. Можешь пересмотреть архитектуру вместе со мной?",
  "¿revisamos?": "Проверим?",
  "El diseño del protocolo está listo ¿revisamos?": "Дизайн протокола готов, проверим?",
}

export default function CommsPage() {
  const { data: session } = useSession()
  const [selectedChat, setSelectedChat] = useState<number>(1)
  const [input, setInput] = useState("")
  const [chats, setChats] = useState(CHATS)
  const [allMessages, setAllMessages] = useState(MESSAGES_MAP)
  const [translating, setTranslating] = useState<Set<number>>(new Set())
  const [translated, setTranslated] = useState<Record<number, string>>({})
  const [search, setSearch] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  const messages = allMessages[selectedChat] || []
  const currentChat = chats.find(c => c.id === selectedChat)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [selectedChat, messages.length])

  const handleSend = () => {
    if (!input.trim()) return
    const newMsg: Message = {
      id: Date.now(),
      from: session?.user?.name || "Guest",
      fromHandle: "me",
      text: input.trim(),
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      lang: "ru",
    }
    setAllMessages(prev => ({ ...prev, [selectedChat]: [...(prev[selectedChat] || []), newMsg] }))
    setChats(prev => prev.map(c => c.id === selectedChat ? { ...c, lastMsg: input.trim(), time: "сейчас" } : c))
    setInput("")
  }

  const handleTranslate = (msg: Message) => {
    if (translated[msg.id]) {
      setTranslated(prev => { const next = { ...prev }; delete next[msg.id]; return next })
      return
    }
    setTranslating(prev => new Set(prev).add(msg.id))
    setTimeout(() => {
      const result = TRANSLATIONS[msg.text] || `[Авто-перевод]: ${msg.text}`
      setTranslated(prev => ({ ...prev, [msg.id]: result }))
      setTranslating(prev => { const next = new Set(prev); next.delete(msg.id); return next })
    }, 800)
  }

  const filteredChats = chats.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.handle.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{
      display: 'flex', gap: '2px',
      height: 'calc(100vh - 160px)',
      background: 'rgba(0,0,0,0.3)',
      borderRadius: '20px', overflow: 'hidden',
      boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
    }}>

      {/* ── Sidebar ── */}
      <div style={{
        width: '320px', flexShrink: 0,
        background: 'rgba(8,8,18,0.9)',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <h2 className="mono" style={{ fontSize: '1rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--neon-purple)' }}>
            <MessageSquare size={16} /> COMMS_LINK
            <div style={{ marginLeft: 'auto', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--neon-green)', boxShadow: '0 0 6px var(--neon-green)', flexShrink: 0 }} />
          </h2>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск чатов..."
              style={{
                width: '100%', background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px',
                padding: '9px 12px 9px 36px', color: '#fff',
                fontFamily: 'inherit', fontSize: '0.85rem', outline: 'none',
              }}
            />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filteredChats.map(chat => (
            <div
              key={chat.id}
              onClick={() => {
                setSelectedChat(chat.id)
                setChats(prev => prev.map(c => c.id === chat.id ? { ...c, unread: 0 } : c))
              }}
              style={{
                padding: '14px 20px', cursor: 'pointer',
                background: selectedChat === chat.id ? 'rgba(181,56,255,0.1)' : 'transparent',
                borderLeft: selectedChat === chat.id ? '3px solid var(--neon-purple)' : '3px solid transparent',
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'flex-start', gap: '12px',
              }}
            >
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img src={chat.avatar} alt={chat.name} style={{ width: '42px', height: '42px', borderRadius: '12px' }} />
                <div style={{
                  position: 'absolute', bottom: 0, right: 0,
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: chat.online ? 'var(--neon-green)' : 'rgba(255,255,255,0.2)',
                  border: '2px solid rgba(8,8,18,0.9)',
                }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{chat.name}</span>
                  <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{chat.time}</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {chat.lastMsg}
                </p>
              </div>
              {chat.unread > 0 && (
                <div style={{
                  width: '18px', height: '18px', borderRadius: '50%',
                  background: 'var(--neon-purple)', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', fontWeight: 700,
                }}>
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Chat Area ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'rgba(5,5,12,0.9)' }}>

        {/* Header */}
        {currentChat && (
          <div style={{
            padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)',
            display: 'flex', alignItems: 'center', gap: '12px',
            background: 'rgba(8,8,18,0.6)',
          }}>
            <img src={currentChat.avatar} alt={currentChat.name} style={{ width: '38px', height: '38px', borderRadius: '10px' }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{currentChat.name}</div>
              <div className="mono" style={{ fontSize: '0.75rem', color: currentChat.online ? 'var(--neon-green)' : 'var(--text-muted)' }}>
                {currentChat.online ? '● Online' : '○ Offline'}
              </div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: "'Fira Code', monospace" }}>
              <Lock size={12} /> E2E Encrypted
            </div>
          </div>
        )}

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.isMe ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '70%',
                background: msg.isMe
                  ? 'linear-gradient(135deg, rgba(181,56,255,0.25), rgba(0,210,255,0.15))'
                  : 'rgba(255,255,255,0.06)',
                borderRadius: msg.isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                padding: '12px 16px',
                boxShadow: msg.isMe ? 'inset 0 0 0 1px rgba(181,56,255,0.2)' : 'inset 0 0 0 1px rgba(255,255,255,0.06)',
              }}>
                {!msg.isMe && (
                  <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--neon-blue)', marginBottom: '6px' }}>@{msg.fromHandle}</div>
                )}
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{msg.text}</p>

                {/* Translated version */}
                {translated[msg.id] && (
                  <div style={{
                    marginTop: '10px', paddingTop: '10px',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5,
                    fontStyle: 'italic',
                  }}>
                    <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--neon-blue)', display: 'block', marginBottom: '4px' }}>🌐 AUTO_TRANSLATE</span>
                    {translated[msg.id]}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', gap: '12px' }}>
                  <span className="mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{msg.time}</span>
                  {!msg.isMe && msg.lang !== 'ru' && (
                    <button
                      onClick={() => handleTranslate(msg)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '4px',
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontSize: '0.7rem', color: translating.has(msg.id) ? 'var(--text-muted)' : 'var(--neon-blue)',
                        fontFamily: "'Fira Code', monospace", padding: 0,
                        transition: 'color 0.2s',
                      }}
                    >
                      <Languages size={11} />
                      {translating.has(msg.id) ? 'Перевод...' : translated[msg.id] ? 'Скрыть' : 'Перевести'}
                    </button>
                  )}
                  {msg.isMe && <Check size={12} style={{ color: 'var(--neon-blue)', opacity: 0.7 }} />}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
              placeholder="Введите сообщение... (Enter — отправить, Shift+Enter — перенос)"
              rows={1}
              style={{
                width: '100%', background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px',
                padding: '12px 14px', color: '#fff', resize: 'none',
                fontFamily: 'inherit', fontSize: '0.9rem', lineHeight: 1.5,
                outline: 'none', transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(181,56,255,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
          </div>
          <button onClick={handleSend} disabled={!input.trim()} style={{
            width: '46px', height: '46px', borderRadius: '12px', border: 'none', cursor: 'pointer',
            background: input.trim() ? 'linear-gradient(135deg, var(--neon-purple), var(--neon-blue))' : 'rgba(255,255,255,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s', flexShrink: 0,
            boxShadow: input.trim() ? '0 0 20px rgba(181,56,255,0.4)' : 'none',
          }}>
            <Send size={18} color={input.trim() ? '#fff' : 'rgba(255,255,255,0.3)'} />
          </button>
        </div>
      </div>
    </div>
  )
}
