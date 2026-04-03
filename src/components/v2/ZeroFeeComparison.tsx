'use client'
import { useRef, useEffect, useState } from 'react'
import ScrollReveal from '../ScrollReveal'

const competitors = [
  { name: 'Venmo', fee: '3%', width: 60 },
  { name: 'Cash App', fee: '3%', width: 60 },
  { name: 'PayPal', fee: '2.99%', width: 58 },
  { name: 'Square', fee: '2.6%', width: 52 },
]

export default function ZeroFeeComparison() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.unobserve(el) }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="py-24 md:py-40 px-4 md:px-8 lg:px-10 xl:px-12 bg-[#A5F41F]">
      <ScrollReveal>
        <div className="text-center mb-16 md:mb-24">
          <p className="mono text-[12px] text-black/40 uppercase tracking-widest mb-4">Zero percent. Zero catches.</p>
          <h2 className="font-medium text-black tracking-[-0.04em] leading-[0.9]" style={{ fontSize: 'clamp(40px, 8vw, 80px)' }}>
            They charge.<br />We don&apos;t.
          </h2>
        </div>
      </ScrollReveal>

      <div ref={ref} className="max-w-[800px] mx-auto flex flex-col gap-5">
        {competitors.map((c, i) => (
          <div key={c.name} className="flex items-center gap-4">
            <span className="mono text-[14px] text-black/60 w-[80px] md:w-[100px] shrink-0 text-right">{c.name}</span>
            <div className="flex-1 h-[48px] md:h-[56px] bg-black/10 rounded-lg overflow-hidden relative">
              <div
                className="h-full bg-black/30 rounded-lg origin-left"
                style={{
                  width: `${c.width}%`,
                  transform: visible ? 'scaleX(1)' : 'scaleX(0)',
                  transition: `transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 150}ms`,
                }}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 mono text-[16px] md:text-[18px] font-semibold text-black/60">{c.fee}</span>
            </div>
          </div>
        ))}

        {/* Tapp'd row */}
        <div className="flex items-center gap-4 mt-4">
          <span className="mono text-[14px] font-bold text-black w-[80px] md:w-[100px] shrink-0 text-right">Tapp&apos;d</span>
          <div className="flex-1 h-[64px] md:h-[72px] bg-black rounded-lg flex items-center px-6 relative overflow-hidden">
            <span
              className="font-medium text-[#A5F41F] tracking-[-0.04em]"
              style={{
                fontSize: 'clamp(36px, 5vw, 56px)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease-out 0.8s, transform 0.8s ease-out 0.8s',
              }}
            >
              0%
            </span>
            <span
              className="mono text-[14px] text-white/50 ml-4"
              style={{
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.6s ease-out 1.2s',
              }}
            >
              Not now, not ever.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
