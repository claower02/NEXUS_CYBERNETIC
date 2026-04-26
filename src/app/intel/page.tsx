"use client"
import React, { useState, useEffect } from 'react';
import { Zap, Activity, Shield, Cpu, Globe, Rocket, ArrowRight } from 'lucide-react';

export default function IntelStreamPage() {
  const [news, setNews] = useState([
    {
      id: 1,
      category: "AI_LOG",
      title: "DeepSeek-V3: Новая эра открытых моделей",
      desc: "Китайский гигант выпустил модель, которая обходит GPT-4o в ряде тестов при в разы меньших затратах на обучение.",
      tag: "BREAKING",
      time: "12m ago"
    },
    {
      id: 2,
      category: "SYS_UPDATE",
      title: "Rust 1.84.0: Стабилизация async-trait",
      desc: "Долгожданное обновление языка Rust приносит расширенную поддержку асинхронности в трейтах.",
      tag: "STABLE",
      time: "45m ago"
    },
    {
      id: 3,
      category: "CYBER_SEC",
      title: "Обнаружена критическая уязвимость в CPU Intel",
      desc: "Новый класс атак по сторонним каналам позволяет извлекать ключи шифрования из анклавов SGX.",
      tag: "CRITICAL",
      time: "2h ago"
    },
    {
      id: 4,
      category: "AI_MODELS",
      title: "Google Gemini 2.0 Flash: Скорость и контекст",
      desc: "Google представил обновление своей самой быстрой модели с поддержкой контекстного окна в 1 миллион токенов.",
      tag: "NEW_GEN",
      time: "4h ago"
    }
  ]);

  // Mock auto-update simulation
  useEffect(() => {
    const timer = setInterval(() => {
    // Just a visual representation of "activity"
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ 
        padding: '32px', 
        background: 'linear-gradient(90deg, rgba(0, 255, 136, 0.05), transparent)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Zap className="text-neon-green" size={40} />
            INTEL_STREAM
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }} className="mono">
            &gt; Прямой поток данных из эпицентра IT-индустрии
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
           <div className="text-neon-green mono" style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
             <Activity size={16} className="animate-pulse-glow" /> LIVE_STATUS: CONNECTED
           </div>
           <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }} className="mono">
             NODES: 742 ONLINE
           </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px' }}>
        
        {/* Left: Stream Categories */}
        <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: '16px' }}>
           <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 className="mono text-neon-blue" style={{ marginBottom: '20px', fontSize: '1rem' }}>Фильтры потока</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {["Artificial Intelligence", "System Level", "Cyber Security", "Web Frameworks", "Hardware"].map(cat => (
                  <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', cursor: 'pointer' }} className="hover-glow">
                    <input type="checkbox" defaultChecked style={{ accentColor: 'var(--neon-green)' }} />
                    <span style={{ fontSize: '0.9rem' }}>{cat}</span>
                  </label>
                ))}
              </div>
           </div>

           <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 className="mono text-neon-purple" style={{ marginBottom: '20px', fontSize: '1rem' }}>Global Health</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                       <span>GitHub Upstream</span>
                       <span className="text-neon-green">99.9%</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                       <div style={{ width: '99.9%', height: '100%', background: 'var(--neon-green)', boxShadow: '0 0 10px var(--neon-green)' }} />
                    </div>
                 </div>
                 <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                       <span>NPM Registry</span>
                       <span className="text-neon-green">100%</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                       <div style={{ width: '100%', height: '100%', background: 'var(--neon-green)', boxShadow: '0 0 10px var(--neon-green)' }} />
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Center: Actual Intel Stream */}
        <div style={{ gridColumn: 'span 9', display: 'flex', flexDirection: 'column', gap: '20px' }}>
           {news.map(item => (
             <div key={item.id} className="glass-panel" style={{ padding: '24px', transition: 'all 0.3s ease', cursor: 'pointer' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ 
                      padding: '4px 10px', background: 'rgba(0, 210, 255, 0.1)', 
                      color: 'var(--neon-blue)', fontSize: '0.75rem', borderRadius: '4px' 
                    }} className="mono">
                      {item.category}
                    </span>
                    <span style={{ 
                      color: item.tag === 'CRITICAL' ? '#ff4d4d' : 'var(--neon-green)', 
                      fontSize: '0.75rem', fontWeight: 'bold' 
                    }} className="mono">
                      [{item.tag}]
                    </span>
                 </div>
                 <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }} className="mono">{item.time}</span>
               </div>
               
               <h2 style={{ fontSize: '1.4rem', marginBottom: '12px' }} className="text-shadow">{item.title}</h2>
               <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{item.desc}</p>
               
               <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                  <button style={{ 
                    background: 'none', border: 'none', color: 'var(--neon-blue)', 
                    display: 'flex', alignItems: 'center', gap: '8px', 
                    fontSize: '0.9rem', cursor: 'pointer' 
                  }} className="hover-glow">
                    Развернуть лог <ArrowRight size={16} />
                  </button>
               </div>
             </div>
           ))}

           {/* Load More Mock */}
           <div style={{ textAlign: 'center', padding: '20px' }}>
              <button className="neon-button" style={{ width: '100%' }}>
                <Rocket size={16} /> LOAD NEXT INTEL PACKET
              </button>
           </div>
        </div>

      </div>

    </div>
  );
}
