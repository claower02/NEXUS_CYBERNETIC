"use client"
import React from 'react';
import { User, MapPin, Link as LinkIcon, GitCommit, Star, Code2, Users } from 'lucide-react';

export default function WorkspacePage() {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Profile Header Card */}
      <div className="glass-panel" style={{ padding: '40px', position: 'relative', overflow: 'hidden' }}>
        {/* Background glow effects */}
        <div style={{
          position: 'absolute', top: '-50%', left: '-10%', width: '300px', height: '300px',
          background: 'var(--neon-blue)', filter: 'blur(150px)', opacity: 0.15, zIndex: 0
        }} />
        <div style={{
          position: 'absolute', bottom: '-50%', right: '-10%', width: '300px', height: '300px',
          background: 'var(--neon-purple)', filter: 'blur(150px)', opacity: 0.15, zIndex: 0
        }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '40px', alignItems: 'center' }}>
          {/* Avatar Area */}
          <div style={{ position: 'relative' }}>
            <div style={{ 
              width: '150px', height: '150px', borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.2), rgba(181, 56, 255, 0.2))',
              border: '2px solid var(--neon-blue)',
              boxShadow: '0 0 20px rgba(0, 210, 255, 0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <User size={64} className="text-neon-blue" />
            </div>
            <div style={{
              position: 'absolute', bottom: '5px', right: '5px',
              width: '24px', height: '24px', borderRadius: '50%',
              background: 'var(--bg-primary)', border: '2px solid var(--neon-green)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
               <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--neon-green)', boxShadow: '0 0 8px var(--neon-green)' }} />
            </div>
          </div>

          {/* User Info Area */}
          <div style={{ flex: '1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
               <div>
                  <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }} className="text-shadow text-neon-blue">
                    CyberNinja
                  </h1>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }} className="mono">
                    System Architecture & Rust Ecosystem
                  </h3>
               </div>
               <button className="neon-button primary">
                  Edit Workspace
               </button>
            </div>

            <p style={{ marginTop: '24px', maxWidth: '600px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
               Оптимизирую высоконагруженные системы. Пишу на Rust и Go. В свободное время изучаю архитектуры AI агентов.
            </p>

            <div style={{ display: 'flex', gap: '24px', marginTop: '24px' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                 <MapPin size={16} className="text-neon-green" /> CyberSpace, Node 0x42
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                 <LinkIcon size={16} className="text-neon-purple" /> github.com/cyberninja
               </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '32px' }}>
        
        {/* Left Column (Stats & Stack) */}
        <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 className="mono text-neon-green" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <GitCommit size={18} /> Network Stats
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Followers</span>
                <span className="mono text-neon-blue" style={{ fontSize: '1.2rem' }}>1,024</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Contributions</span>
                <span className="mono text-neon-purple" style={{ fontSize: '1.2rem' }}>4,096</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Snippets</span>
                <span className="mono text-neon-green" style={{ fontSize: '1.2rem' }}>42</span>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 className="mono text-neon-purple" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code2 size={18} /> Stack Modules
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {["Rust", "Go", "TypeScript", "Next.js", "Docker", "Kubernetes", "gRPC"].map(tech => (
                <span key={tech} className="mono" style={{
                  padding: '6px 12px', background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-glass)', borderRadius: '6px',
                  fontSize: '0.85rem'
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (Pinned Projects) */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '32px' }}>
           
           <h3 className="mono text-neon-blue" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <Star size={20} /> Pinned Workspaces
           </h3>

           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
             
             {/* Repo Card 1 */}
             <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                   <h4 className="mono text-neon-green" style={{ fontSize: '1.2rem' }}>nexus/core-engine</h4>
                   <span style={{ 
                     padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', 
                     border: '1px solid var(--neon-purple)', color: 'var(--neon-purple)' 
                   }}>Public</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px', flex: '1' }}>
                  A blazing fast rendering engine built with Rust and WebAssembly. Used for processing deep neural structures.
                </p>
                <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                   <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#dea584' }}/> Rust</span>
                   <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={14}/> 512</span>
                   <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={14}/> 42</span>
                </div>
             </div>

             {/* Repo Card 2 */}
             <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                   <h4 className="mono text-neon-blue" style={{ fontSize: '1.2rem' }}>nexus/ai-gateway</h4>
                   <span style={{ 
                     padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', 
                     border: '1px solid var(--neon-purple)', color: 'var(--neon-purple)' 
                   }}>Public</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px', flex: '1' }}>
                  Intelligent API Gateway for load balancing LLM requests across multiple fallback nodes.
                </p>
                <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                   <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00ADD8' }}/> Go</span>
                   <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={14}/> 256</span>
                   <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={14}/> 18</span>
                </div>
             </div>

           </div>

        </div>

      </div>

    </div>
  );
}
