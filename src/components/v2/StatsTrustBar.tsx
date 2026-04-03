'use client'
import { useRef, useEffect, useState } from 'react'

function useCountUp(end: number, duration = 2000, decimals = 0) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStarted(true); obs.unobserve(el) }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(parseFloat((eased * end).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [started, end, duration, decimals])

  return { count, ref }
}

const stats = [
  { end: 47000, prefix: '', suffix: '+', label: 'businesses Tapp\'d', decimals: 0 },
  { end: 12, prefix: '$', suffix: 'M+', label: 'payments processed', decimals: 0 },
  { end: 0, prefix: '$', suffix: '', label: 'in platform fees. Ever.', decimals: 0 },
  { end: 4.8, prefix: '', suffix: '', label: 'stars on the App Store', decimals: 1 },
]

export default function StatsTrustBar() {
  return (
    <section className="bg-[#0A0A0B] py-20 md:py-28 px-4 md:px-8 lg:px-10 xl:px-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 max-w-[1200px] mx-auto">
        {stats.map((stat) => {
          const { count, ref } = useCountUp(stat.end, 2000, stat.decimals)
          return (
            <div key={stat.label} ref={ref} className="text-center">
              <div className="font-medium text-[#A5F41F] tracking-[-0.04em] leading-none" style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>
                {stat.prefix}{stat.end === 0 ? '0' : count.toLocaleString()}{stat.suffix}
              </div>
              <p className="mono text-[12px] md:text-[13px] text-white/40 uppercase mt-3 tracking-wide">{stat.label}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
