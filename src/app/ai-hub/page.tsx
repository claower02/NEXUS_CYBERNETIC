"use client"
import React, { useState } from 'react';
import { Bot, Send, Cpu, Zap, Activity, Link as LinkIcon, ExternalLink, AlertTriangle, CheckCircle2 } from 'lucide-react';

// Google SVG Component
const GoogleIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AI_MODELS = [
  { id: 'gemini', name: 'Google Gemini 1.5', provider: 'Google', url: 'https://aistudio.google.com/', tokens: 1500, free: true },
  { id: 'deepseek', name: 'DeepSeek-V3', provider: 'DeepSeek', url: 'https://www.deepseek.com/', tokens: 500, free: true },
  { id: 'chatgpt', name: 'GPT-4o (Limited)', provider: 'OpenAI', url: 'https://chat.openai.com/', tokens: 10, free: true },
  { id: 'claude', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', url: 'https://claude.ai/', tokens: 0, free: false }
];

export default function AIHubPage() {
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState('gemini');
  const [userTokens, setUserTokens] = useState<Record<string, number>>({
    gemini: 1500,
    deepseek: 500,
    chatgpt: 10,
    claude: 0
  });

  const [chat, setChat] = useState<{role: 'user' | 'ai' | 'system', content: string}[]>([
    { role: 'ai', content: 'Система готова к работе. Выберите модель и начните сессию.' }
  ]);

  const activeModel = AI_MODELS.find(m => m.id === selectedModelId)!;
  const hasTokens = userTokens[selectedModelId] > 0;

  const handleSend = () => {
    if(!prompt.trim()) return;
    
    if (!isGoogleConnected) {
      alert("Для использования бесплатных моделей необходимо привязать Google аккаунт.");
      return;
    }

    if (!hasTokens) {
      return; // Handled by UI message below
    }

    setChat(prev => [...prev, { role: 'user', content: prompt }]);
    setPrompt("");
    setIsProcessing(true);

    // Consume tokens
    setUserTokens(prev => ({
      ...prev,
      [selectedModelId]: Math.max(0, prev[selectedModelId] - 250)
    }));

    setTimeout(() => {
      setChat(prev => [...prev, { 
        role: 'ai', 
        content: `[${activeModel.name}] Анализ завершен. Запрос обработан через облачную инфраструктуру ${activeModel.provider}.` 
      }]);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', gap: '32px', height: 'calc(100vh - 160px)' }}>
      
      {/* Sidebar Controls */}
      <div style={{ width: '350px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Account Link Card */}
        <div className="glass-panel" style={{ padding: '24px', border: isGoogleConnected ? '1px solid var(--neon-green)' : '1px solid var(--border-glass)' }}>
           <h3 className="mono" style={{ fontSize: '0.9rem', marginBottom: '16px', color: 'var(--text-secondary)' }}>AUTH_STATUS</h3>
           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <GoogleIcon />
                 <span className="mono" style={{ fontSize: '0.85rem' }}>{isGoogleConnected ? "SystemX@gmail.com" : "Google Not Linked"}</span>
              </div>
              {isGoogleConnected ? <CheckCircle2 className="text-neon-green" size={18} /> : 
                <button onClick={() => setIsGoogleConnected(true)} className="neon-button primary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>LINK</button>
              }
           </div>
        </div>

        {/* Model Selector Card */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 className="text-neon-purple mono" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Cpu size={18} /> SELECT_CORE
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {AI_MODELS.map(model => (
              <div 
                key={model.id} 
                onClick={() => setSelectedModelId(model.id)}
                className="hover-glow"
                style={{ 
                  padding: '12px', borderRadius: '8px', cursor: 'pointer',
                  background: selectedModelId === model.id ? 'rgba(181, 56, 255, 0.1)' : 'rgba(0,0,0,0.2)',
                  border: `1px solid ${selectedModelId === model.id ? 'var(--neon-purple)' : 'var(--border-glass)'}`,
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <span className="mono" style={{ fontSize: '0.85rem' }}>{model.name}</span>
                   <span className="mono text-neon-blue" style={{ fontSize: '0.75rem' }}>{userTokens[model.id]} TKN</span>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                   Provider: {model.provider}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '24px' }}>
             <h4 style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '12px', textTransform: 'uppercase' }}>Системный статус</h4>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                <Activity size={16} className="text-neon-green" />
                <span className="text-neon-green">API Ready | Latency: 42ms</span>
             </div>
          </div>
        </div>
      </div>

      {/* Main Terminal View */}
      <div className="glass-panel" style={{ flex: '1', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Header */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Bot className="text-neon-purple" />
            <h2 style={{ fontSize: '1.2rem' }}>AI Workspace <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>⎯ {activeModel.name}</span></h2>
          </div>
          <a href={activeModel.url} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: 'var(--neon-blue)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Official Site <ExternalLink size={14} />
          </a>
        </div>

        {/* Chat Area */}
        <div style={{ flex: '1', overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {chat.map((msg, idx) => (
            <div key={idx} style={{ 
              display: 'flex', 
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
              gap: '16px'
            }}>
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '8px', flexShrink: 0,
                background: msg.role === 'user' ? 'rgba(0, 210, 255, 0.1)' : 'rgba(181, 56, 255, 0.1)',
                border: `1px solid ${msg.role === 'user' ? 'var(--neon-blue)' : 'var(--neon-purple)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: msg.role === 'user' ? 'var(--neon-blue)' : 'var(--neon-purple)'
              }}>
                {msg.role === 'user' ? 'U' : <Bot size={20}/>}
              </div>
              <div style={{ 
                background: 'rgba(0,0,0,0.4)', 
                padding: '16px', borderRadius: '12px', 
                border: '1px solid var(--border-glass)',
                maxWidth: '80%', lineHeight: '1.6'
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          {isProcessing && (
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Zap size={20} className="text-neon-purple animate-pulse-glow" />
              <span className="mono text-neon-purple">Генерация ответа...</span>
            </div>
          )}

          {!hasTokens && (
            <div className="glass-panel" style={{ padding: '24px', border: '1px solid #ff4d4d', background: 'rgba(255, 77, 77, 0.05)', textAlign: 'center' }}>
               <AlertTriangle className="text-shadow" style={{ color: '#ff4d4d', marginBottom: '12px' }} size={32} />
               <h3 style={{ color: '#ff4d4d', marginBottom: '8px' }}>Токены исчерпаны</h3>
               <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
                 Бесплатный лимит для модели **{activeModel.name}** закончен. Чтобы продолжить использование, приобретите расширенную версию на официальном сайте провайдера.
               </p>
               <a 
                 href={activeModel.url} 
                 target="_blank" 
                 rel="noreferrer" 
                 className="neon-button" 
                 style={{ borderColor: '#ff4d4d', color: '#ff4d4d' }}
               >
                 Go to {activeModel.provider} Official Site
               </a>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div style={{ padding: '24px', borderTop: '1px solid var(--border-glass)', background: !isGoogleConnected ? 'rgba(0,0,0,0.4)' : 'transparent' }}>
          {!isGoogleConnected ? (
             <div style={{ textAlign: 'center', padding: '10px', color: 'var(--text-muted)', fontSize: '0.9rem' }} className="mono">
               &gt; ПОДКЛЮЧИТЕ GOOGLE АККАУНТ ДЛЯ ДОСТУПА К ТЕРМИНАЛУ
             </div>
          ) : (
            <div style={{ display: 'flex', gap: '16px' }}>
              <input 
                type="text" 
                className="neon-input" 
                placeholder={hasTokens ? "Введите промпт..." : "Лимит достигнут..."}
                value={prompt}
                disabled={!hasTokens}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              />
              <button 
                className="neon-button primary" 
                onClick={handleSend} 
                disabled={isProcessing || !hasTokens}
              >
                <Send size={18} />
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

