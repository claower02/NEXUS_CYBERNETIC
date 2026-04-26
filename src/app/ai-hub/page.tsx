"use client"
import React, { useState, useEffect, useRef } from "react"
import { useSession, signIn } from "next-auth/react"
import { Bot, Send, User as UserIcon, Loader2, Zap } from "lucide-react"

export default function AIHubPage() {
  const { data: session, status } = useSession()
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const isGuest = session?.user?.email === "guest@nexus.cyber"
  const canUseAI = status === "authenticated"

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, { role: 'user', content: userMessage }] })
      })
      
      const data = await res.json()
      
      if (data.error) {
        setMessages(prev => [...prev, { role: 'assistant', content: `[SYSTEM_ERROR]: ${data.error}` }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "[NETWORK_ERROR]: Не удалось связаться с интерфейсом Gemini." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="animate-fade-in page-layout" style={{ height: 'calc(100vh - 120px)' }}>

      {/* Main Chat Area */}
      <div className="page-main" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div className="glass-panel" style={{ padding: '24px', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 className="mono" style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                <Bot className="text-neon-blue" size={22} /> NEXUS_AI_CORE
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: "'Fira Code', monospace" }}>
                Powered by Gemini-2.0-Flash
              </p>
            </div>
            
            {!canUseAI && (
              <button 
                onClick={() => signIn('google', { callbackUrl: '/ai-hub' })}
                 className="neon-button primary"
              >
                CONNECT_GOOGLE
              </button>
            )}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="glass-panel" style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
          {messages.length === 0 ? (
            <div style={{ margin: 'auto', textAlign: 'center', opacity: 0.6 }}>
              <Bot size={48} className="text-neon-blue flicker" style={{ margin: '0 auto 16px' }} />
              <p className="mono" style={{ color: 'var(--neon-blue)', fontSize: '0.9rem' }}>AWAITING_INPUT...</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '8px' }}>Задайте вопрос нейросети NEXUS</p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} style={{ 
                display: 'flex', gap: '16px', 
                alignItems: 'flex-start',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
              }}>
                <div style={{ 
                  width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                  background: msg.role === 'user' ? 'rgba(0,210,255,0.1)' : 'rgba(181,56,255,0.1)',
                  border: `1px solid ${msg.role === 'user' ? 'rgba(0,210,255,0.3)' : 'rgba(181,56,255,0.3)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: msg.role === 'user' ? 'var(--neon-blue)' : 'var(--neon-purple)'
                }}>
                  {msg.role === 'user' ? <UserIcon size={18} /> : <Bot size={18} />}
                </div>
                <div style={{ 
                  background: msg.role === 'user' ? 'rgba(0,210,255,0.05)' : 'rgba(255,255,255,0.03)',
                  padding: '16px 20px', borderRadius: '16px',
                  borderTopRightRadius: msg.role === 'user' ? '4px' : '16px',
                  borderTopLeftRadius: msg.role === 'assistant' ? '4px' : '16px',
                  maxWidth: '80%', lineHeight: 1.6, fontSize: '0.9rem',
                  border: `1px solid ${msg.role === 'user' ? 'rgba(0,210,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
                  color: msg.content.startsWith('[SYSTEM_ERROR]') ? 'var(--neon-red)' : 'var(--text-primary)',
                  whiteSpace: 'pre-wrap'
                }}>
                  {msg.content}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
               <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(181,56,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={18} className="text-neon-purple" />
              </div>
              <div style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Loader2 size={16} className="text-neon-purple" style={{ animation: 'spin 1s linear infinite' }} />
                <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PROCESSING</span>
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '12px', marginTop: '20px', flexShrink: 0 }}>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || !canUseAI}
            placeholder={!canUseAI ? "Требуется авторизация..." : "Отправить команду в NEXUS_CORE..."}
            className="neon-input"
            style={{ flex: 1, padding: '16px 24px', fontSize: '1rem' }}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading || !canUseAI}
            className="neon-button primary"
            style={{ width: '60px', padding: 0, opacity: (!input.trim() || isLoading || !canUseAI) ? 0.5 : 1 }}
          >
            <Send size={20} />
          </button>
        </form>

      </div>

      {/* Sidebar */}
      <div className="page-sidebar" style={{ height: '100%' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h4 className="mono" style={{ marginBottom: '16px', gap: '8px', display: 'flex', alignItems: 'center', color: 'var(--neon-blue)', fontSize: '0.85rem' }}>
             <Zap size={16} /> AI_PROTOCOL
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            NEXUS_CORE запрограммирован на последней версии Gemini 2.0 Flash. Вы можете задавать вопросы по архитектуре, просить сгенерировать код или проанализировать данные.
          </p>
          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
             <h5 className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '12px' }}>STATUS</h5>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--neon-green)', boxShadow: '0 0 8px var(--neon-green)' }} />
                <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>ROUTING_ONLINE</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
