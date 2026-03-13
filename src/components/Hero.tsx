'use client'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import ScrollReveal from './ScrollReveal'
import DotGrid from './DotGrid'
import { useWaitlist } from './WaitlistContext'

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
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) clearInterval(interval)
      }, 35)
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
    <span ref={ref}>
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
      className="min-h-screen flex flex-col justify-center bg-white relative overflow-hidden sticky top-0 z-[1]"
      style={{ backgroundImage: 'url(/hologram-light.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <DotGrid sectionRef={sectionRef} />


      <div className="px-4 md:px-8 lg:px-10 xl:px-12 w-full relative z-10">
        <h1 className="font-normal text-black leading-[0.95] tracking-[-0.05em]" style={{ fontSize: 'clamp(48px, 10vw, 110px)' }}>
          <TypewriterText text="Where every conversation" /><br />
          <TypewriterText text="has real value" delay={600} />
        </h1>

        <ScrollReveal delay={200}>
          <p className="text-[20px] font-light text-black/60 leading-[1.6] max-w-[520px] mt-12">
            Handshake embeds payments directly into messaging. Tips, paid content, and scheduled calls — all inside the thread.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="flex items-center gap-4 mt-8">
            <button onClick={showWaitlist} className="text-[15px] font-medium text-black px-8 py-4 rounded-lg bg-[#39FF78] hover:bg-black hover:text-white transition-colors inline-flex items-center gap-2 cursor-pointer">Join the waitlist <span className="text-[16px]">&#x2197;</span></button>
            <a href="#product" className="text-[15px] font-medium text-white px-8 py-4 rounded-lg bg-black hover:bg-transparent hover:text-black hover:border hover:border-black transition-all">See the product</a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
