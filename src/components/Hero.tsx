'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import ScrollReveal from './ScrollReveal'

function DotGrid({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animRef = useRef<number>(0)

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
          ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`
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
                ctx.strokeStyle = `rgba(0, 0, 0, ${proximity * np * 0.12})`
                ctx.lineWidth = 0.5
                ctx.stroke()
              }
            }
          }
          continue
        }

        ctx.beginPath()
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`
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

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.unobserve(el) } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const timeout = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => { setDisplayed(text.slice(0, i + 1)); i++; if (i >= text.length) clearInterval(interval) }, 35)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [started, text, delay])

  return (
    <span ref={ref}>
      {displayed}
      {displayed.length < text.length && started && (
        <span className="inline-block w-[2px] h-[0.85em] bg-black ml-[2px] animate-pulse align-baseline" />
      )}
    </span>
  )
}

function AnimatedCounter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.unobserve(el) } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [started, end, duration])

  return <span ref={ref} className="mono">{count.toLocaleString()}{suffix}</span>
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center pt-[104px] bg-white relative overflow-hidden"
      style={{ backgroundImage: 'url(/hologram-light.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <DotGrid sectionRef={sectionRef} />
      <div className="px-6 md:px-12 lg:px-20 xl:px-28 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <ScrollReveal>
            <p className="mono text-[13px] text-black/50 mb-8 uppercase">The platform that pays</p>
          </ScrollReveal>

          <div>
            <h1 className="font-light text-black leading-[0.95] tracking-[-0.045em]" style={{ fontSize: 'clamp(42px, 6vw, 76px)' }}>
              <TypewriterText text="Where every" /><br />
              <TypewriterText text="conversation has" delay={400} /><br />
              <span className="text-black"><TypewriterText text="real value" delay={800} /></span>
            </h1>
          </div>

          <ScrollReveal delay={200}>
            <p className="text-[17px] font-light text-black/60 leading-[1.6] max-w-[480px] mt-10">
              Handshake embeds payments directly into messaging. Tips, paid content, and scheduled calls — all inside the thread.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="flex items-center gap-4 mt-10">
              <a href="#" className="text-[14px] font-medium text-black px-7 py-3.5 rounded-lg bg-[#39FF78] hover:bg-[#2DE86A] transition-colors">Join the waitlist</a>
              <a href="#product" className="text-[14px] font-light text-black px-7 py-3.5 rounded-lg border border-black/20 hover:border-black/40 transition-colors">See the product</a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="flex gap-16 mt-20 pb-20">
              {[
                { value: 0, label: 'Platform fee', suffix: '%' },
                { value: 50000, label: 'Waitlist signups', suffix: '+' },
                { value: 100, label: 'Payment methods', suffix: '+' },
              ].map((m) => (
                <div key={m.label}>
                  <div className="text-[36px] font-light text-black tracking-[-0.03em]"><AnimatedCounter end={m.value} suffix={m.suffix} /></div>
                  <div className="mono text-[12px] text-black/40 mt-1 uppercase">{m.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={200}>
          <div className="hidden lg:flex items-center justify-center">
            <img src="/image.png" alt="Handshake app" className="w-full max-w-[520px] rounded-2xl" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
