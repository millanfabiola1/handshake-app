'use client'
import { useEffect, useRef } from 'react'

export default function MeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let t = 0

    const blobs = [
      { x: 0.25, y: 0.3, r: 0.45, color: [165, 244, 31] },   // #A5F41F - brand green
      { x: 0.7, y: 0.2, r: 0.4, color: [186, 255, 80] },      // lighter green
      { x: 0.5, y: 0.7, r: 0.5, color: [120, 220, 10] },      // deeper green
      { x: 0.15, y: 0.8, r: 0.35, color: [200, 255, 120] },   // pale lime
      { x: 0.85, y: 0.6, r: 0.38, color: [140, 230, 25] },    // mid green
    ]

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      t += 0.003

      // Base white fill
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, w, h)

      // Draw each animated blob
      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i]
        const phase = t + i * 1.8
        const cx = (b.x + Math.sin(phase * 0.7) * 0.08 + Math.cos(phase * 0.4 + i) * 0.05) * w
        const cy = (b.y + Math.cos(phase * 0.6) * 0.08 + Math.sin(phase * 0.5 + i) * 0.04) * h
        const radius = b.r * Math.max(w, h) * (0.9 + Math.sin(phase * 0.3) * 0.1)

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
        grad.addColorStop(0, `rgba(${b.color[0]}, ${b.color[1]}, ${b.color[2]}, 0.35)`)
        grad.addColorStop(0.5, `rgba(${b.color[0]}, ${b.color[1]}, ${b.color[2]}, 0.15)`)
        grad.addColorStop(1, `rgba(${b.color[0]}, ${b.color[1]}, ${b.color[2]}, 0)`)

        ctx.fillStyle = grad
        ctx.fillRect(0, 0, w, h)
      }

      // Subtle noise/grain overlay for texture
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'
      for (let i = 0; i < 80; i++) {
        const nx = Math.random() * w
        const ny = Math.random() * h
        ctx.fillRect(nx, ny, 2, 2)
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ filter: 'blur(80px) saturate(1.3)' }}
    />
  )
}
