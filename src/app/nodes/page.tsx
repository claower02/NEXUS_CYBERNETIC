"use client"
import React from 'react';
import { Users, UserPlus, Globe, ShieldCheck, Activity } from 'lucide-react';

export default function NodesPage() {
  const mockNodes = [
    { id: 1, name: "ZeroDay", active: true, interests: ["Rust", "Kernel", "Security"], sync: "98%" },
    { id: 2, name: "ByteMaster", active: false, interests: ["Go", "Distributed Systems"], sync: "82%" },
    { id: 3, name: "AlgoRhythm", active: true, interests: ["Python", "AI", "ML"], sync: "91%" },
    { id: 4, name: "CodeWitch", active: true, interests: ["TypeScript", "UI/UX", "WebGL"], sync: "75%" },
    { id: 5, name: "DataGhost", active: false, interests: ["PostgreSQL", "Data Engineering"], sync: "64%" }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header */}
      <div className="glass-panel" style={{ padding: '32px', borderLeft: '4px solid var(--neon-blue)' }}>
         <h1 style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
           <Users className="text-neon-blue" size={36} />
           ACTIVE_NODES
         </h1>
         <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }} className="mono">
           &gt; Обнаружение и синхронизация с другими разработчиками в системе.
         </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
         {mockNodes.map(node => (
           <div key={node.id} className="glass-panel" style={{ padding: '24px', transition: 'all 0.3s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ 
                      width: '50px', height: '50px', borderRadius: '50%', 
                      background: 'rgba(255, 255, 255, 0.05)', border: `1px solid ${node.active ? 'var(--neon-green)' : 'var(--text-muted)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      position: 'relative'
                    }}>
                       <Users size={24} className={node.active ? "text-neon-green" : "text-muted"} />
                       {node.active && (
                         <div style={{ 
                           position: 'absolute', bottom: '2px', right: '2px', width: '10px', height: '10px', 
                           background: 'var(--neon-green)', borderRadius: '50%', boxShadow: '0 0 10px var(--neon-green)' 
                         }} />
                       )}
                    </div>
                    <div>
                       <h3 className="text-shadow">{node.name}</h3>
                       <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }} className="mono">SYNC: {node.sync}</span>
                    </div>
                 </div>
                 <button className={`neon-button ${node.active ? 'success' : ''}`} style={{ padding: '8px 12px' }}>
                    <UserPlus size={16} />
                 </button>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                 {node.interests.map(interest => (
                   <span key={interest} style={{ 
                     fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', 
                     background: 'rgba(0, 210, 255, 0.05)', color: 'var(--neon-blue)', border: '1px solid var(--border-glass)'
                   }} className="mono">
                     #{interest}
                   </span>
                 ))}
              </div>

              <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-glass)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                 <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Globe size={14} /> Global Grid</span>
                 <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ShieldCheck size={14} /> Verified</span>
              </div>
           </div>
         ))}
      </div>

      {/* Suggested Section */}
      <div className="glass-panel" style={{ padding: '24px', background: 'rgba(181, 56, 255, 0.02)' }}>
         <h4 className="mono text-neon-purple" style={{ marginBottom: '16px' }}>&gt; Рекомендуемые связи (базируется на общих интересах)</h4>
         <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1, padding: '16px', borderRadius: '8px', border: '1px dashed var(--border-glass)', textAlign: 'center', color: 'var(--text-muted)' }}>
               Анализ ваших последних постов о Rust... Поиск подходящих нод...
            </div>
         </div>
      </div>

    </div>
  );
}
