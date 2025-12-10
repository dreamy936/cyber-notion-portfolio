"use client"

import { useEffect, useRef } from "react"

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Matrix characters - mix of katakana, latin, and eldritch symbols
    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*(){}[]|;:,.<>?/~`ΨΩΦΘΔξζηθικλμνπρστυφχψω"
    const charArray = chars.split("")

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    // Array to track y position of each column
    const drops: number[] = Array(columns).fill(1)

    // Random speeds for each column
    const speeds: number[] = Array(columns)
      .fill(0)
      .map(() => Math.random() * 0.5 + 0.5)

    const draw = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)]

        // Randomize color between blood red and crimson with occasional neon green
        const colorRandom = Math.random()
        if (colorRandom > 0.92) {
          // Bright neon green for code feel
          ctx.fillStyle = "#00ff9d"
        } else if (colorRandom > 0.7) {
          // Bright blood red
          ctx.fillStyle = "#ff2020"
        } else if (colorRandom > 0.4) {
          // Deep blood red
          ctx.fillStyle = "#8a0303"
        } else {
          // Dark crimson
          ctx.fillStyle = "#5a0202"
        }

        const x = i * fontSize
        const y = drops[i] * fontSize

        ctx.fillText(char, x, y)

        // Reset drop when it goes off screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i] += speeds[i]
      }
    }

    const interval = setInterval(draw, 50)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  // 修改这里：增加 z-0，并把 opacity 调高一点测试
    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[0] opacity-40 mix-blend-screen" />;
}
