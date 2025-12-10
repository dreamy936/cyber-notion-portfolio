"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MatrixRain } from "@/app/components/MatrixRain";
import { Calendar, Tag, ChevronRight, AlertTriangle, Skull, Terminal, Cpu, Github, Mail, Linkedin, Globe, BookOpen } from "lucide-react";

// 接收父组件传来的真实数据
export function CyberHome({ posts }: { posts: any[] }) {
  return (
    <main className="min-h-screen relative bg-[#050505] text-white overflow-hidden font-mono selection:bg-[#8a0303] selection:text-white">
      {/* 0. 背景特效 */}
      <div className="fixed inset-0 z-0 opacity-40">
        <MatrixRain />
      </div>
      
      {/* 🟢 1. Hero 区域 */}
      <section className="relative z-10 flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center min-h-[85vh]">
        
        {/* 3D 悬浮 Logo */}
        <div className="mb-12 relative holographic-float group">
          <div className="w-32 h-32 border-2 border-[#8a0303] flex items-center justify-center corrupted-card bg-black/80 backdrop-blur-md chromatic-aberration cursor-pointer relative overflow-hidden z-20">
            <Skull className="w-16 h-16 text-[#8a0303] group-hover:text-[#00ff9d] transition-colors duration-500 relative z-30" />
          </div>
          <div className="absolute inset-0 bg-[#8a0303]/40 blur-3xl rounded-full eldritch-pulse -z-10" />
        </div>

        {/* 主标题 */}
        <h1 className="text-6xl md:text-8xl font-bold text-[#8a0303] glow-text-dried-blood tracking-widest mb-6 glitch-always cursor-default z-20">
          Amber&apos;s Blog
        </h1>

        {/* 打字机动画 */}
        <TypewriterText text="Initializing QA Protocols..." />

        {/* 按钮组 */}
        <div className="flex flex-col sm:flex-row gap-6 mt-12 z-20">
          <button className="px-8 py-3 border-2 border-[#8a0303] text-[#8a0303] font-bold uppercase tracking-widest hover:bg-[#8a0303] hover:text-black transition-all duration-300 neon-border corrupted-card group">
            <span className="flex items-center gap-2">
              <Terminal className="w-5 h-5" /> VIEW PROJECTS
            </span>
          </button>
          <button className="px-8 py-3 bg-transparent border-2 border-[#00ff9d] text-[#00ff9d] font-bold uppercase tracking-widest hover:bg-[#00ff9d]/10 hover:shadow-[0_0_20px_rgba(0,255,157,0.4)] transition-all duration-300 corrupted-card">
            <span className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> READ BLOG
            </span>
          </button>
        </div>
      </section>

      {/* 🔴 2. 博客列表区域 (真实数据渲染) */}
      <section className="py-20 px-4 relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16 space-y-4">
           <p className="text-[#00ff9d] text-sm glow-text-matrix">{"// CORRUPTED_DATA_ARCHIVE"}</p>
           <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
             BLOG <span className="text-[#8a0303] glow-text">ENTRIES</span>
           </h2>
           <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#8a0303] to-transparent" />
        </div>

        {/* 这里的 posts 是从 Notion 传进来的真数据 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {posts.map((post: any, index: number) => {
            // 安全提取 Notion 数据
            const title = post.properties.Name.title[0]?.plain_text || "Untitled";
            const summary = post.properties.Summary.rich_text[0]?.plain_text || "No summary.";
            const date = post.properties.Date.date?.start || "Unknown";
            const slug = post.properties.Slug.rich_text[0]?.plain_text || "";
            const tag = post.properties.Tags?.multi_select[0]?.name || "LOG";

            return (
              <Link href={`/blog/${slug}`} key={post.id} className="block h-full group">
                <article className="h-full bg-black/60 backdrop-blur-md p-6 flex flex-col justify-between relative overflow-hidden corrupted-card rounded-sm border border-[#333] hover:border-[#8a0303] transition-colors duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff9d]/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                  
                  <div>
                    <div className="flex items-center justify-between mb-5 text-xs border-b border-[#333] pb-3 group-hover:border-[#8a0303]/30 transition-colors">
                      <span className="flex items-center gap-2 text-gray-500 group-hover:text-[#8a0303] transition-colors">
                        <Calendar className="w-3 h-3" /> {date}
                      </span>
                      <span className="flex items-center gap-1.5 text-[#00ff9d] px-2 py-0.5 bg-[#111] rounded border border-[#333] group-hover:border-[#8a0303] group-hover:text-[#8a0303] transition-colors">
                        <Tag className="w-3 h-3" /> {tag}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#ededed] mb-3 leading-tight group-hover:text-[#8a0303] transition-colors duration-300">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-500 font-sans leading-relaxed line-clamp-3 mb-6">
                      {summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#333] group-hover:border-[#8a0303]/30 transition-colors">
                     <div className="flex items-center gap-2 text-[10px] text-gray-600">
                       <Cpu className="w-3 h-3" /> <span>MEM: OK</span>
                     </div>
                     <span className="flex items-center gap-1 text-xs text-[#00ff9d] group-hover:text-[#8a0303] group-hover:tracking-wider transition-all duration-300">
                       ACCESS <ChevronRight className="w-3 h-3" />
                     </span>
                  </div>
                  
                  <div className="absolute -bottom-4 -right-4 text-6xl font-black text-[#1a1a1a] -z-10 group-hover:text-[#8a0303]/10 transition-colors pointer-events-none">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* Retrieve 按钮 */}
        <div className="text-center">
          <Link href="/archive" className="inline-block group">
             <div className="px-8 py-4 border border-[#00ff9d]/30 text-[#00ff9d] font-mono text-sm tracking-widest hover:bg-[#00ff9d]/10 hover:border-[#00ff9d] hover:shadow-[0_0_15px_rgba(0,255,157,0.2)] transition-all duration-300 corrupted-card">
                RETRIEVE MORE DATA SHARDS...
             </div>
          </Link>
        </div>
      </section>

      {/* 3. Footer */}
      <footer className="relative z-10 py-12 border-t border-[#333] bg-[#050505] text-center mt-20">
        <div className="flex justify-center gap-8 mb-8">
          <Github className="w-6 h-6 text-gray-500 hover:text-[#00ff9d] cursor-pointer" />
          <Linkedin className="w-6 h-6 text-gray-500 hover:text-[#00ff9d] cursor-pointer" />
          <Globe className="w-6 h-6 text-gray-500 hover:text-[#8a0303] cursor-pointer" />
          <Mail className="w-6 h-6 text-gray-500 hover:text-[#00ff9d] cursor-pointer" />
        </div>
        <p className="text-gray-600 text-xs tracking-widest">
          © 2025 AMBER. ALL RIGHTS RESERVED. <span className="text-[#8a0303] animate-pulse">●</span>
        </p>
      </footer>
    </main>
  );
}

// 打字机组件
function TypewriterText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("");
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        setTimeout(() => { index = 0; }, 2000);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <div className="h-8 mb-12 flex items-center justify-center gap-3 z-20 relative">
      <span className="text-[#00ff9d]">&gt;</span>
      <p className="text-lg md:text-xl text-gray-400 font-mono">{displayText}</p>
      <span className="animate-pulse text-[#8a0303] font-bold">_</span>
    </div>
  );
}