'use client'
import { useEffect, useRef, useState } from 'react'
import ScrollReveal from './ScrollReveal'

function AnimatedZero() {
  const [count, setCount] = useState(100)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.unobserve(el) } }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / 1500, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.round(100 - eased * 100))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [started])

  return <span ref={ref}>{count}%</span>
}

export default function Pricing() {
  return (
    <section className="py-[180px] px-6 md:px-12 lg:px-20 xl:px-28 bg-white text-[#18181B]" id="pricing">
      <div className="text-center">
        <ScrollReveal><p className="mono text-[11px] text-[#39FF78] uppercase mb-10">Pricing</p></ScrollReveal>
        <div className="mono leading-[0.85] tracking-[-0.06em] text-[#18181B]" style={{ fontSize: 'clamp(100px, 20vw, 280px)' }}>
          <AnimatedZero />
        </div>
        <ScrollReveal delay={100}><p className="mono text-[12px] text-[#A1A1AA] uppercase mt-8 mb-10">Platform fee</p></ScrollReveal>
        <ScrollReveal delay={150}>
          <p className="text-[18px] md:text-[20px] font-light text-[#71717A] leading-[1.55] max-w-[460px] mx-auto">
            Zero commission. Every dollar your clients send goes directly to you. No revenue splits, no surprises.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <div className="flex items-center justify-center gap-8 mt-14 flex-wrap">
            {['Credit cards', 'Bank transfers', 'Debit cards', 'P2P payments'].map((m) => (
              <span key={m} className="mono text-[12px] text-[#D4D4D8] uppercase">{m}</span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
