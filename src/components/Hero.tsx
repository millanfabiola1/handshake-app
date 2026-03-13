'use client'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import ScrollReveal from './ScrollReveal'
import DotGrid from './DotGrid'
import { useWaitlist } from './WaitlistContext'

const pixelFonts = [
  'var(--font-geist-pixel-square)',
]

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const [settled, setSettled] = useState(false)
  const [charFonts, setCharFonts] = useState<(string | null)[]>([])
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.unobserve(el) } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Typewriter + per-character random pixel font
  useEffect(() => {
    if (!started) return
    const timeout = setTimeout(() => {
      let i = 0
      const fonts: (string | null)[] = []
      const interval = setInterval(() => {
        fonts[i] = pixelFonts[Math.floor(Math.random() * pixelFonts.length)]
        i++
        setDisplayed(text.slice(0, i))
        setCharFonts([...fonts])
        if (i >= text.length) clearInterval(interval)
      }, 35)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [started, text, delay])

  // After typing completes, cycle each letter through random pixel fonts then settle to Geist Sans
  useEffect(() => {
    if (!started || displayed.length < text.length) return
    let tick = 0
    const totalCycles = 6
    const interval = setInterval(() => {
      tick++
      if (tick >= totalCycles) {
        setSettled(true)
        clearInterval(interval)
      } else {
        setCharFonts(
          Array.from({ length: text.length }, () =>
            pixelFonts[Math.floor(Math.random() * pixelFonts.length)]
          )
        )
      }
    }, 100)
    return () => clearInterval(interval)
  }, [started, displayed, text])

  return (
    <span ref={ref}>
      {displayed.split('').map((char, i) => (
        <span
          key={i}
          style={!settled && charFonts[i] ? { fontFamily: charFonts[i]! } : undefined}
          className={!settled && charFonts[i] ? 'transition-none' : 'transition-[font-family] duration-300'}
        >
          {char}
        </span>
      ))}
      {displayed.length < text.length && started && (
        <span className="inline-block w-[2px] h-[0.85em] bg-black ml-[2px] animate-pulse align-baseline" />
      )}
    </span>
  )
}

function MorphText({ initial, final, delay = 0 }: { initial: string; final: string; delay?: number }) {
  const [phase, setPhase] = useState<'waiting' | 'initial' | 'morphing' | 'final'>('waiting')
  const [displayed, setDisplayed] = useState('')
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setPhase('initial'); obs.unobserve(el) }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Type out the initial text (e.g. "$$$")
  useEffect(() => {
    if (phase !== 'initial') return
    const timeout = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        i++
        setDisplayed(initial.slice(0, i))
        if (i >= initial.length) {
          clearInterval(interval)
          setTimeout(() => setPhase('morphing'), 600)
        }
      }, 35)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [phase, initial, delay])

  // Morph to final text
  useEffect(() => {
    if (phase !== 'morphing') return
    let tick = 0
    const maxTicks = 8
    const interval = setInterval(() => {
      tick++
      if (tick >= maxTicks) {
        setDisplayed(final)
        setPhase('final')
        clearInterval(interval)
      } else {
        // Scramble between initial and final characters
        const progress = tick / maxTicks
        setDisplayed(
          Array.from({ length: Math.max(initial.length, final.length) }, (_, i) => {
            if (progress > (i + 1) / final.length) return final[i] || ''
            return initial[i] || final[i] || ''
          }).join('')
        )
      }
    }, 80)
    return () => clearInterval(interval)
  }, [phase, initial, final])

  return (
    <span ref={ref} style={phase !== 'final' ? { fontFamily: 'var(--font-geist-pixel-square)' } : undefined}>
      {displayed}
      {phase === 'initial' && displayed.length < initial.length && (
        <span className="inline-block w-[2px] h-[0.85em] bg-black ml-[2px] animate-pulse align-baseline" />
      )}
    </span>
  )
}

function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2000, key: counterKey }: { end: number; suffix?: string; prefix?: string; duration?: number; key?: string }) {
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
    setCount(0)
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

  return <span ref={ref} className="mono">{prefix}{count.toLocaleString()}{suffix}</span>
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const showWaitlist = useWaitlist()
  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-start pt-[160px] bg-white relative overflow-hidden z-[2]"
      style={{ backgroundImage: 'url(/hologram-light.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <DotGrid sectionRef={sectionRef} />

      {/* Image positioned on the right, behind the text */}
      <div className="absolute right-0 bottom-0 z-[2] pointer-events-none">
        <img src="/image.png" alt="Handshake app" className="w-[70vw] lg:w-[45vw] max-w-[700px] rounded-tl-lg opacity-90" />
      </div>

      <div className="px-4 md:px-8 lg:px-10 xl:px-12 w-full relative z-10">
        <ScrollReveal>
          <p className="mono text-[13px] text-black/50 mb-8 uppercase">The platform that pays</p>
        </ScrollReveal>

        <h1 className="font-light text-black leading-[0.95] tracking-[-0.05em]" style={{ fontSize: 'clamp(40px, 8vw, 110px)' }}>
          <TypewriterText text="Where every conversation" /><br />
          <TypewriterText text="has real " delay={600} /><MorphText initial="$$$" final="value" delay={1100} />
        </h1>

        <ScrollReveal delay={200}>
          <p className="text-[17px] font-light text-black/60 leading-[1.6] max-w-[480px] mt-12">
            Handshake embeds payments directly into messaging. Tips, paid content, and scheduled calls — all inside the thread.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="flex items-center gap-4 mt-8">
            <button onClick={showWaitlist} className="text-[14px] font-medium text-black px-7 py-3.5 rounded-lg bg-[#39FF78] hover:bg-black hover:text-white transition-colors inline-flex items-center gap-2 cursor-pointer">Join the waitlist <span className="text-[16px]">&#x2197;</span></button>
            <a href="#product" className="text-[14px] font-normal text-black px-7 py-3.5 rounded-lg border border-black hover:bg-black hover:text-white transition-colors">See the product</a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
