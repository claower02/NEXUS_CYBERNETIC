"use client"
import React, { useState } from "react";
import Link from "next/link";
import { MessageSquare, Heart, Share2, Code, GitBranch, Star, Layers, FolderGit2, User, Zap } from "lucide-react";

// Github SVG Component (reusable)
const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export default function Home() {
  const [showRepoSelector, setShowRepoSelector] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<any>(null);

  const mockRepos = [
    { name: "nexus-core", desc: "The heart of our cybernetic system", stars: 128, lang: "Rust" },
    { name: "neon-ui-kit", desc: "Premium glassmorphism components", stars: 85, lang: "TypeScript" },
    { name: "ai-mesh-orchestrator", desc: "Decentralized AI node management", stars: 210, lang: "Go" }
  ];

  const mockPosts = [
    {
      id: 1,
      author: "@cyber_ninja",
      role: "System Engineer",
      content: "Только что закончил писать новый Rust-парсер для логов. Работает в 10 раз быстрее старого решения на Node.js! 🚀",
      codeSnippet: "fn parse_log(line: &str) -> Option<LogEntry> {\n  // Blazing fast parsing here\n}",
      likes: 128,
      comments: 32,
      time: "2 часа назад"
    },
    {
      id: 3,
      author: "@admin_nexus",
      role: "Core Developer",
      content: "Ребята, зацените мой новый репозиторий! Это ядро нашей будущей децентрализованной сети. Жду код-ревью и предложений по архитектуре. 🔥",
      sharedRepo: {
        name: "nexus-cyber-kernel",
        description: "The next generation decentralized kernel for cybernetic ecosystems.",
        stars: 1450,
        forks: 320,
        language: "C++ / Rust",
        tags: ["kernel", "low-level", "security"]
      },
      likes: 450,
      comments: 89,
      time: "1 час назад"
    },
    {
      id: 2,
      author: "@neon_wizard",
      role: "Frontend Architect",
      content: "Анимации на Framer Motion — это просто магия. Добавил микро-взаимодействия на кнопки, конверсия выросла на 15%. Главное не переборщить с блюром.",
      likes: 85,
      comments: 14,
      time: "5 часов назад"
    }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', gap: '32px', position: 'relative' }}>
      
      {/* Main Feed */}
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Create Post Banner */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ 
              width: '48px', height: '48px', borderRadius: '50%', 
              background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-blue))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 'bold', fontSize: '1.2rem'
            }}>!</div>
            <input 
              type="text" 
              className="neon-input" 
              placeholder="Поделитесь своими идеями или кодом..." 
            />
          </div>
          
          {selectedRepo && (
            <div className="glass-panel" style={{ marginTop: '16px', padding: '12px', borderColor: 'var(--neon-blue)', background: 'rgba(0, 210, 255, 0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FolderGit2 size={16} className="text-neon-blue" />
                  <span className="mono">Прикреплено: {selectedRepo.name}</span>
                </div>
                <button onClick={() => setSelectedRepo(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>×</button>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px', gap: '12px' }}>
             <button className="neon-button" onClick={() => setShowRepoSelector(!showRepoSelector)}>
               <GithubIcon size={16}/> Репозиторий
             </button>
            <button className="neon-button"><Code size={16}/> Сниппет</button>
            <button className="neon-button primary" onClick={() => {
              if(selectedRepo) alert("Пост с репозиторием опубликован! (Mock)");
              else alert("Пост опубликован! (Mock)");
              setSelectedRepo(null);
            }}>Опубликовать</button>
          </div>

          {showRepoSelector && (
            <div className="glass-panel" style={{ marginTop: '16px', padding: '16px', animation: 'fadeIn 0.3s ease' }}>
              <h4 className="mono text-neon-blue" style={{ marginBottom: '12px', fontSize: '0.9rem' }}>Ваши репозитории</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {mockRepos.map(repo => (
                  <div 
                    key={repo.name} 
                    className="hover-glow" 
                    style={{ 
                      padding: '8px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.03)', 
                      cursor: 'pointer', border: '1px solid var(--border-glass)' 
                    }}
                    onClick={() => {
                      setSelectedRepo(repo);
                      setShowRepoSelector(false);
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span className="mono text-neon-green">{repo.name}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{repo.lang}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Posts */}
        {mockPosts.map(post => (
          <div key={post.id} className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
               <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ 
                    width: '48px', height: '48px', borderRadius: '8px', 
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-glass)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <User size={24} className="text-neon-purple" />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.1rem' }} className="text-neon-blue">{post.author}</h3>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }} className="mono">{post.role}</span>
                  </div>
               </div>
               <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{post.time}</span>
            </div>
            
            <p style={{ marginTop: '16px', lineHeight: '1.6' }}>{post.content}</p>
            
            {post.codeSnippet && (
              <pre className="mono" style={{ 
                marginTop: '16px', padding: '16px', 
                background: 'rgba(0,0,0,0.5)', borderRadius: '8px',
                border: '1px solid rgba(0, 255, 136, 0.2)',
                color: 'var(--neon-green)',
                overflowX: 'auto',
                fontSize: '0.9rem'
              }}>
                <code>{post.codeSnippet}</code>
              </pre>
            )}

            {/* Repository Card in Feed */}
            {post.sharedRepo && (
              <div className="glass-panel" style={{ 
                marginTop: '20px', padding: '20px', 
                borderLeft: '4px solid var(--neon-purple)',
                background: 'linear-gradient(90deg, rgba(181, 56, 255, 0.05), transparent)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <GithubIcon size={20} className="text-neon-purple" />
                      <h4 className="mono text-neon-purple" style={{ fontSize: '1.2rem' }}>{post.sharedRepo.name}</h4>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '16px' }}>
                      {post.sharedRepo.description}
                    </p>
                  </div>
                  <button className="neon-button primary" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
                    View Code
                  </button>
                </div>
                
                <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Layers size={14} className="text-neon-blue" />
                    {post.sharedRepo.language}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={14} className="text-neon-green" />
                    {post.sharedRepo.stars} stars
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <GitBranch size={14} className="text-neon-blue" />
                    {post.sharedRepo.forks} forks
                  </span>
                </div>
              </div>
            )}

            <div style={{ 
              display: 'flex', gap: '24px', marginTop: '24px', 
              borderTop: '1px solid var(--border-glass)', paddingTop: '16px' 
            }}>
              <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <Heart size={18} /> {post.likes}
              </button>
              <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <MessageSquare size={18} /> {post.comments}
              </button>
              <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <Share2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Right Sidebar (Trends/Stats) */}
      <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
         <div className="glass-panel" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
            <div className="circuit-overlay" />
            <h4 className="mono text-neon-green" style={{ marginBottom: '16px', position: 'relative' }}>&gt; Популярные теги</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', position: 'relative' }}>
              {['#rust', '#nextjs', '#ai_agents', '#kubernetes', '#websockets'].map(tag => (
                <span key={tag} style={{ 
                  padding: '4px 8px', borderRadius: '4px', 
                  background: 'rgba(0, 255, 136, 0.1)', color: 'var(--neon-green)',
                  fontSize: '0.85rem', cursor: 'pointer'
                }} className="mono hover-glow">
                  {tag}
                </span>
              ))}
            </div>
         </div>

         {/* Intel Feed Widget */}
         <div className="glass-panel" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
            <div className="circuit-overlay" />
            <h4 className="mono text-neon-blue" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
              <Zap size={16} /> LATEST_INTEL
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
               <div style={{ fontSize: '0.85rem', borderLeft: '2px solid var(--neon-green)', paddingLeft: '12px' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }} className="mono">AI_MODELS | 12m ago</div>
                  <div style={{ marginTop: '4px' }}>DeepSeek-V3 побил рекорды эффективности.</div>
               </div>
               <div style={{ fontSize: '0.85rem', borderLeft: '2px solid var(--neon-purple)', paddingLeft: '12px' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }} className="mono">SYS_UPDATE | 45m ago</div>
                  <div style={{ marginTop: '4px' }}>Rust 1.84: Async traits теперь в стабильной ветке!</div>
               </div>
               <Link href="/intel" style={{ fontSize: '0.8rem', color: 'var(--neon-blue)', textAlign: 'center', marginTop: '8px' }} className="mono">
                  Смотреть весь поток &gt;
               </Link>
            </div>
         </div>
      </div>

    </div>
  );
}

