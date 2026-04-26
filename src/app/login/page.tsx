"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signIn } from "next-auth/react";
import { Shield, Lock, Cpu, Globe, User, Zap, Terminal as TerminalIcon, AlertCircle } from 'lucide-react';

// Github SVG Component
const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export default function LoginPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const sequence = [
      "Инициализация протоколов аутентификации...",
      "Установка защищенного соединения с NEXUS_GRID...",
      "Проверка целостности биометрических данных...",
      "ОЖИДАНИЕ ВАЛИДАЦИИ ПОЛЬЗОВАТЕЛЯ..."
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < sequence.length) {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${sequence[i]}`]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#050505', 
      color: '#fff', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
      padding: '20px'
    }}>
      {/* Background Ambience */}
      <div className="matrix-bg" />
      <div style={{ position: 'absolute', top: 0, left: '10%', width: '1px', height: '100%', background: 'var(--neon-purple)', opacity: 0.1 }} />
      <div style={{ position: 'absolute', top: 0, right: '10%', width: '1px', height: '100%', background: 'var(--neon-blue)', opacity: 0.1 }} />

      <div className="auth-grid">
        
        {/* Left Side: System Diagnostics */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel system-logs-panel" 
          style={{ padding: '40px', position: 'relative', overflow: 'hidden' }}
        >
           <div style={{ position: 'absolute', top: 0, left: 0, width: '2px', height: '100%', background: 'var(--neon-purple)' }} />
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <TerminalIcon className="text-neon-purple flicker" size={24} />
              <h3 className="mono text-neon-purple" style={{ letterSpacing: '2px' }}>SYSTEM_LOGS</h3>
           </div>

           <div style={{ height: '300px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {logs.map((log, idx) => (
                <motion.p 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mono" 
                  style={{ fontSize: '0.85rem', color: idx === logs.length - 1 ? 'var(--neon-green)' : 'var(--text-muted)' }}
                >
                  <span style={{ color: 'var(--neon-blue)' }}>&gt;</span> {log}
                </motion.p>
              ))}
              {logs.length === 4 && (
                <motion.div 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  style={{ width: '10px', height: '20px', background: 'var(--neon-green)', marginTop: '4px' }}
                />
              )}
           </div>

           <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ border: '1px solid rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px' }}>
                 <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '8px' }} className="mono">CORE_LOAD</div>
                 <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                    <motion.div animate={{ width: '65%' }} style={{ height: '100%', background: 'var(--neon-blue)' }} />
                 </div>
              </div>
              <div style={{ border: '1px solid rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px' }}>
                 <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '8px' }} className="mono">NETWORK_LATENCY</div>
                 <div className="text-neon-green mono" style={{ fontSize: '1rem' }}>14ms</div>
              </div>
           </div>
        </motion.div>

        {/* Right Side: Identity Validation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel" 
          style={{ 
            padding: '40px', 
            textAlign: 'center', 
            background: 'radial-gradient(circle at top right, rgba(0, 210, 255, 0.05), transparent)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center'
          }}
        >
           <div style={{ marginBottom: '40px', position: 'relative', display: 'inline-block', alignSelf: 'center' }}>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                style={{ 
                  width: '120px', height: '120px', borderRadius: '50%',
                  border: '2px dashed var(--neon-blue)', opacity: 0.3,
                  position: 'absolute', top: '-10px', left: '-10px'
                }}
              />
              <div style={{ 
                width: '100px', height: '100px', borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--neon-blue)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 20px rgba(0, 210, 255, 0.2)'
              }}>
                 <Shield size={50} className="text-neon-blue" />
              </div>
           </div>

           <h1 style={{ fontSize: '2rem', marginBottom: '12px' }} className="text-shadow">IDENTITY_VALIDATION</h1>
           <p style={{ color: 'var(--text-muted)', marginBottom: '48px', maxWidth: '300px', margin: '0 auto 48px' }}>
             Пожалуйста, подтвердите свою личность через один из доступных протоколов доступа.
           </p>

           <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <button 
                onClick={() => signIn('github', { callbackUrl: '/' })}
                className="neon-button success" 
                style={{ height: '60px', padding: '0 32px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}
              >
                <GithubIcon size={24} /> 
                <span className="mono" style={{ fontWeight: 600 }}>CONNECT_GITHUB</span>
              </button>

              <button 
                onClick={() => signIn('credentials', { callbackUrl: '/' })}
                className="neon-button" 
                style={{ 
                  height: '50px', borderColor: 'var(--neon-purple)', color: 'var(--neon-purple)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' 
                }}
              >
                <User size={18} /> 
                <span className="mono">BYPASS_GUEST</span>
              </button>
           </div>

           <div style={{ marginTop: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--text-muted)' }}>
              <Lock size={14} />
              <span style={{ fontSize: '0.75rem' }} className="mono">END-TO-END ENCRYPTED SESSION</span>
           </div>
        </motion.div>

      </div>

      {/* Extreme Visuals */}
      <div style={{ 
        position: 'absolute', bottom: '20px', left: '20px', 
        fontSize: '0.7rem', color: 'var(--text-muted)', maxWidth: '200px'
      }} className="mono flicker">
        WARNING: UNSTABLE NETWORK DETECTED. PROCEEDING WITH MULTI-LAYER AUTHENTICATION.
      </div>
      <div style={{ 
        position: 'absolute', top: '20px', right: '20px', 
        display: 'flex', gap: '10px'
      }}>
         {[1,2,3].map(i => (
           <div key={i} style={{ width: '40px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
              <motion.div 
                animate={{ width: ['0%', '100%', '0%'] }}
                transition={{ duration: 2 + i, repeat: Infinity }}
                style={{ height: '100%', background: 'var(--neon-green)' }}
              />
           </div>
         ))}
      </div>
    </div>
  );
}
