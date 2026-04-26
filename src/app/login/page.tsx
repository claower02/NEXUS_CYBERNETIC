"use client"
import React from 'react';
import { Code2, Network, Shield } from 'lucide-react';

// Github SVG Component
const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="animate-fade-in" style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', 
      justifyContent: 'center', minHeight: 'calc(100vh - 200px)',
      position: 'relative'
    }}>
      <div className="matrix-bg" />
      
      <div className="glass-panel" style={{ 
        width: '100%', maxWidth: '900px', display: 'flex', 
        overflow: 'hidden', padding: 0 
      }}>
        
        {/* Left Side (Visual / Branding) */}
        <div style={{ 
          flex: '1', padding: '64px 48px', 
          background: 'linear-gradient(135deg, rgba(181, 56, 255, 0.05), rgba(0, 210, 255, 0.05))',
          borderRight: '1px solid var(--border-glass)'
        }}>
           <h1 style={{ fontSize: '3rem', lineHeight: '1.1', marginBottom: '24px' }}>
             Join the <span className="text-neon-purple text-shadow">Matrix</span><br/>of Developers
           </h1>
           <p style={{ color: 'var(--text-secondary)', marginBottom: '48px', fontSize: '1.1rem', lineHeight: '1.6' }}>
             NEXUS_CYBERNETIC — это социальная платформа нового поколения для IT-специалистов. Делитесь кодом, обсуждайте архитектуру и тестируйте AI модели в едином пространстве.
           </p>

           <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                 <Code2 className="text-neon-green" size={24}/>
                 <span>Обмен сниппетами и архитектурными идеями</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                 <Network className="text-neon-blue" size={24}/>
                 <span>Поиск команды и нетворкинг</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                 <Shield className="text-neon-purple" size={24}/>
                 <span>Безопасная авторизация</span>
              </div>
           </div>
        </div>

        {/* Right Side (Auth Form) */}
        <div style={{ flex: '1', padding: '64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          
           <div style={{ 
             width: '80px', height: '80px', borderRadius: '50%',
             background: 'rgba(255, 255, 255, 0.05)',
             display: 'flex', alignItems: 'center', justifyContent: 'center',
             marginBottom: '32px'
           }}>
              <GithubIcon size={40} className="text-neon-green" />
           </div>

           <h2 style={{ marginBottom: '12px' }}>Инициализация сессии</h2>
           <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>
             Используйте ваш GitHub аккаунт для мгновенного доступа к платформе.
           </p>

           <button 
              className="neon-button success animate-pulse-glow" 
              style={{ padding: '16px 32px', fontSize: '1.1rem', width: '100%' }}
              onClick={() => signIn('github', { callbackUrl: '/' })}
            >
              <GithubIcon size={20} />
              Connect with GitHub
           </button>
           
           <p style={{ marginTop: '24px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
             Продолжая, вы соглашаетесь с условиями использования Системы.
           </p>
        </div>

      </div>

    </div>
  );
}
