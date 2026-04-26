"use client"
import React, { useState } from 'react';
import { MessageSquare, Send, Shield, Search, MoreVertical, Paperclip, Languages, RefreshCw } from 'lucide-react';

export default function CommsPage() {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [message, setMessage] = useState("");
  const [translatingId, setTranslatingId] = useState<number | null>(null);
  const [translatedMessages, setTranslatedMessages] = useState<Record<number, string>>({});

  const chats = [
    { id: 1, name: "ZeroDay", last: "Слушай, а как ты решил проблему с переполнением?", time: "2м назад", unread: 2 },
    { id: 2, name: "AlgoRhythm", last: "Check out the new kernel update!", time: "1ч назад", unread: 0 },
    { id: 3, name: "CodeWitch", last: "El diseño está listo, ¿quieres verlo?", time: "3ч назад", unread: 0 }
  ];

  const messages = [
    { id: 1, from: "ZeroDay", text: "Привет! Видел твой пост про Rust парсер.", time: "14:20", lang: "ru" },
    { id: 2, from: "me", text: "Привет. Да, долго с ним возился.", time: "14:22", lang: "ru" },
    { id: 3, from: "ZeroDay", text: "Слушай, а как ты решил проблему с переполнением стека при глубокой рекурсии?", time: "14:25", lang: "ru" },
    { id: 4, from: "AlgoRhythm", text: "I found a way to bypass the firewall!", time: "15:00", lang: "en" },
    { id: 5, from: "CodeWitch", text: "El diseño de la interfaz de usuario está listo para revisarlo.", time: "16:00", lang: "es" }
  ];

  const handleTranslate = (id: number, text: string) => {
    setTranslatingId(id);
    // Mock translation delay
    setTimeout(() => {
      const translations: Record<number, string> = {
        4: "Я нашел способ обойти брандмауэр!",
        5: "Дизайн пользовательского интерфейса готов к проверке."
      };
      setTranslatedMessages(prev => ({ ...prev, [id]: translations[id] || "Синхронный перевод недоступен" }));
      setTranslatingId(null);
    }, 1500);
  };

  // ... (render logic below)

  return (
    <div className="animate-fade-in" style={{ display: 'flex', gap: '2px', height: 'calc(100vh - 160px)', background: 'var(--border-glass)', borderRadius: '16px', overflow: 'hidden' }}>
      
      {/* Sidebar: Chat List */}
      <div style={{ width: '350px', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column' }}>
         <div style={{ padding: '24px', borderBottom: '1px solid var(--border-glass)' }}>
            <h2 className="mono text-neon-purple" style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <MessageSquare size={18} /> COMMS_LINK
            </h2>
            <div style={{ position: 'relative' }}>
               <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
               <input type="text" className="neon-input" placeholder="Поиск шифрованных каналов..." style={{ paddingLeft: '40px', fontSize: '0.85rem' }} />
            </div>
         </div>

         <div style={{ flex: 1, overflowY: 'auto' }}>
            {chats.map(chat => (
               <div 
                 key={chat.id} 
                 onClick={() => setSelectedChat(chat.id)}
                 style={{ 
                   padding: '20px 24px', cursor: 'pointer', borderBottom: '1px solid var(--border-glass)',
                   background: selectedChat === chat.id ? 'rgba(181, 56, 255, 0.05)' : 'transparent',
                   transition: 'all 0.2s ease',
                   position: 'relative'
                 }}
                 className="hover-glow"
               >
                  {selectedChat === chat.id && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: 'var(--neon-purple)' }} />}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                     <h4 className={selectedChat === chat.id ? "text-neon-purple" : ""}>{chat.name}</h4>
                     <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{chat.time}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                     {chat.last}
                  </p>
                  {chat.unread > 0 && (
                    <div style={{ 
                      position: 'absolute', right: '24px', bottom: '20px', background: 'var(--neon-purple)', 
                      color: 'white', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '10px' 
                    }}>
                      {chat.unread}
                    </div>
                  )}
               </div>
            ))}
         </div>
      </div>

      {/* Main: Chat Window */}
      <div style={{ flex: 1, background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
         {selectedChat ? (
           <>
             {/* Chat Header */}
             <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                   <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--neon-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="text-neon-purple mono">0D</span>
                   </div>
                   <div>
                      <h3 style={{ fontSize: '1rem' }}>ZeroDay</h3>
                      <span style={{ fontSize: '0.75rem', color: 'var(--neon-green)' }}>● Online | Encrypted Link</span>
                   </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)' }}>
                   <Shield size={20} className="text-neon-blue" />
                   <MoreVertical size={20} style={{ cursor: 'pointer' }} />
                </div>
             </div>

             {/* Messages */}
             <div style={{ flex: 1, overflowY: 'auto', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {messages.map(msg => (
                  <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.from === 'me' ? 'flex-end' : 'flex-start' }}>
                     <div style={{ 
                       maxWidth: '70%', 
                       padding: '16px', 
                       borderRadius: '12px', 
                       background: msg.from === 'me' ? 'rgba(181, 56, 255, 0.1)' : 'rgba(255,255,255,0.03)',
                       border: `1px solid ${msg.from === 'me' ? 'rgba(181, 56, 255, 0.2)' : 'var(--border-glass)'}`,
                       position: 'relative'
                     }}>
                        <p style={{ lineHeight: '1.5', fontSize: '0.95rem' }}>{msg.text}</p>
                        
                        {translatedMessages[msg.id] && (
                          <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed rgba(0, 210, 255, 0.3)', color: 'var(--neon-blue)', fontSize: '0.9rem' }}>
                            <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.7 }} className="mono">Translated:</div>
                            {translatedMessages[msg.id]}
                          </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                           {msg.from !== 'me' && (
                             <button 
                               onClick={() => handleTranslate(msg.id, msg.text)}
                               disabled={translatingId === msg.id}
                               style={{ background: 'none', border: 'none', color: 'var(--neon-blue)', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                               className="mono hover-glow"
                             >
                               {translatingId === msg.id ? <RefreshCw size={10} className="animate-pulse-glow" /> : <Languages size={10} />}
                               {translatingId === msg.id ? "INTERPRETING..." : "TRANSLATE"}
                             </button>
                           )}
                           <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'right', flex: 1 }}>{msg.time}</span>
                        </div>
                     </div>
                  </div>
                ))}
             </div>

             {/* Message Input */}
             <div style={{ padding: '24px', borderTop: '1px solid var(--border-glass)' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                   <Paperclip size={20} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} />
                   <input 
                     type="text" 
                     className="neon-input" 
                     placeholder="Сигнал для ZeroDay..." 
                     value={message}
                     onChange={(e) => setMessage(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && setMessage("")}
                   />
                   <button className="neon-button primary" onClick={() => setMessage("")}>
                      <Send size={18} />
                   </button>
                </div>
             </div>
           </>
         ) : (
           <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              Выберите канал для начала передачи данных
           </div>
         )}
      </div>

    </div>
  );
}
