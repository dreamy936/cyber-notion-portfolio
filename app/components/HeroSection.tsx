"use client"
import { useState, useEffect } from "react"
import { Skull, BookOpen, Code } from "lucide-react"

export function HeroSection() {
  const [displayText, setDisplayText] = useState("")
  const fullText = "Digital nomad wandering in Codes. QA by sunrise, trekking by twilight."

  useEffect(() => {
    let index = 0
    let isDeleting = false
    const timer = setInterval(() => {
      setDisplayText(fullText.substring(0, index))
      if (!isDeleting && index < fullText.length) {
        index++
      } else if (isDeleting && index > 0) {
        index--
      } else {
        // 停顿一下再开始删除/重写
        isDeleting = !isDeleting
      }
    }, 100) // 打字速度
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 z-10 text-center">
      {/* 3D 悬浮 Logo */}
      <div className="mb-12 relative holographic-float group">
        <div className="w-32 h-32 border-2 border-primary flex items-center justify-center corrupted-card bg-black/50 backdrop-blur-sm chromatic-aberration cursor-pointer">
          <Skull className="w-16 h-16 text-primary group-hover:text-secondary transition-colors duration-500" />
        </div>
        {/* Logo 背后的红光脉冲 */}
        <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full eldritch-pulse -z-10" />
      </div>

      {/* 主标题 */}
      <h1 className="text-6xl md:text-8xl font-bold text-primary glow-text-dried-blood tracking-widest mb-6 glitch-hover cursor-default">
        Amber&apos;s Blog
      </h1>

      {/* 打字机副标题 */}
      <div className="h-8 mb-12">
        <p className="text-lg md:text-xl text-gray-400 font-mono typing-cursor">
          {displayText}
        </p>
      </div>

      {/* 装饰分割线 */}
      <div className="flex items-center gap-4 mb-12 opacity-50">
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary" />
        <Code className="w-5 h-5 text-secondary animate-pulse" />
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary" />
      </div>

      {/* 按钮组 */}
      <div className="flex flex-col sm:flex-row gap-6">
        <button className="px-8 py-3 bg-primary/10 border border-primary text-white font-bold uppercase tracking-widest hover:bg-primary hover:text-black hover:scale-105 transition-all duration-300 neon-border corrupted-card">
          <span className="flex items-center gap-2">
            <Code className="w-4 h-4" /> View Projects
          </span>
        </button>
        <button className="px-8 py-3 bg-transparent border border-secondary text-secondary font-bold uppercase tracking-widest hover:bg-secondary/10 hover:shadow-[0_0_15px_rgba(0,255,157,0.3)] transition-all duration-300 corrupted-card">
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Read Blog
          </span>
        </button>
      </div>
    </section>
  )
}