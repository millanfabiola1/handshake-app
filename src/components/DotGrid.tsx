'use client'
import { useEffect, useRef, useCallback } from 'react'

export default function DotGrid({
  sectionRef,
  color = '0, 0, 0',
}: {
  sectionRef: React.RefObject<HTMLElement | null>
  color?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animRef = useRef<number>(0)
  const colorRef = useRef(color)
  colorRef.current = color

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const w = canvas.clientWidth
    const h = canvas.clientHeight

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
    }

    ctx.clearRect(0, 0, w, h)

    const spacing = 32
    const cols = Math.ceil(w / spacing) + 1
    const rows = Math.ceil(h / spacing) + 1
    const time = Date.now() * 0.001
    const mouse = mouseRef.current
    const hoverRadius = 150
    const c = colorRef.current

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * spacing
        const y = row * spacing

        const dx = x - mouse.x
        const dy = y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Ambient wave
        const wave = Math.sin(time * 0.8 + col * 0.3 + row * 0.2) * 0.5 + 0.5
        const baseAlpha = 0.15 + wave * 0.1

        let dotRadius = 1
        let alpha = baseAlpha

        if (dist < hoverRadius) {
          const proximity = 1 - dist / hoverRadius
          const ease = proximity * proximity
          alpha = baseAlpha + ease * 0.45
          dotRadius = 1 + ease * 2.5

          const pushStrength = ease * 4
          const angle = Math.atan2(dy, dx)
          const px = x + Math.cos(angle) * pushStrength
          const py = y + Math.sin(angle) * pushStrength

          ctx.beginPath()
          ctx.arc(px, py, dotRadius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${c}, ${alpha})`
          ctx.fill()

          // Connection lines near cursor
          if (proximity > 0.3) {
            for (const [nc, nr] of [[col + 1, row], [col, row + 1], [col + 1, row + 1]] as const) {
              const nx = nc * spacing
              const ny = nr * spacing
              const nd = Math.sqrt((nx - mouse.x) ** 2 + (ny - mouse.y) ** 2)
              if (nd < hoverRadius) {
                const np = 1 - nd / hoverRadius
                ctx.beginPath()
                ctx.moveTo(px, py)
                ctx.lineTo(nx, ny)
                ctx.strokeStyle = `rgba(${c}, ${proximity * np * 0.12})`
                ctx.lineWidth = 0.5
                ctx.stroke()
              }
            }
          }
          continue
        }

        ctx.beginPath()
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${c}, ${alpha})`
        ctx.fill()
      }
    }

    animRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [draw])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const handleLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    section.addEventListener('mousemove', handleMove)
    section.addEventListener('mouseleave', handleLeave)
    return () => {
      section.removeEventListener('mousemove', handleMove)
      section.removeEventListener('mouseleave', handleLeave)
    }
  }, [sectionRef])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-[1] pointer-events-none"
    />
  )
}
