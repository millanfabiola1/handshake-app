'use client'
import { useEffect, useRef, useState } from 'react'

const features = [
  { label: '01 — Tips', title: 'One tap. Instant gratitude.', desc: 'Let your community show appreciation with one-tap payments mid-conversation. No links, no redirects — just seamless value exchange.', img: 'Tips interface' },
  { label: '02 — Locked Content', title: 'Gate it. Earn from it.', desc: 'Photos, videos, or messages behind a paywall — fans unlock what they want, you earn what you deserve.', img: 'Content paywall' },
  { label: '03 — Paid Calls', title: 'Your time. Your rate.', desc: '1-on-1 voice or video sessions billed per minute or flat rate. Booked, confirmed, and paid — all inside the thread.', img: 'Call scheduling' },
  { label: '04 — Mass Messaging', title: 'Blast it. Make it personal.', desc: 'Reach your entire client book with messages that never feel automated. Every message feels one-to-one, even at scale.', img: 'Campaign dashboard' },
]

export default function StickyFeatures() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = features.map((_, i) => {
      const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActiveIndex(i) }, { threshold: 0.5, rootMargin: '-104px 0px -30% 0px' })
      const el = sectionRefs.current[i]
      if (el) obs.observe(el)
      return obs
    })
    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  return (
    <section className="bg-white relative" id="product">
      <div className="px-6 md:px-12 lg:px-20 xl:px-28 pt-[120px] pb-20">
        <p className="mono text-[11px] text-black/40 uppercase mb-5">Product</p>
        <h2 className="font-light text-black tracking-[-0.04em] leading-[1.05] max-w-[700px]" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>
          Built for the conversation economy
        </h2>
      </div>

      <div className="px-6 md:px-12 lg:px-20 xl:px-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div className="flex flex-col">
            {features.map((f, i) => (
              <div key={f.label} ref={(el) => { sectionRefs.current[i] = el }} className="min-h-[70vh] flex flex-col justify-center py-12">
                <p className="mono text-[12px] uppercase mb-6 transition-colors duration-500" style={{ color: activeIndex === i ? '#39FF78' : '#D4D4D8' }}>{f.label}</p>
                <h3 className="text-[32px] md:text-[40px] font-light tracking-[-0.03em] leading-[1.1] mb-5 transition-colors duration-500" style={{ color: activeIndex === i ? '#000000' : '#D4D4D8' }}>{f.title}</h3>
                <p className="text-[16px] font-light leading-[1.65] max-w-[440px] transition-colors duration-500" style={{ color: activeIndex === i ? '#71717A' : '#D4D4D8' }}>{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="hidden lg:block">
            <div className="sticky top-[104px] h-[calc(100vh-104px)] flex items-center">
              <div className="w-full rounded-2xl img-placeholder-light relative" style={{ aspectRatio: '4 / 3' }}>
                {features.map((f, i) => (
                  <div key={f.label} className="absolute inset-0 flex items-center justify-center transition-opacity duration-700" style={{ opacity: activeIndex === i ? 1 : 0 }}>
                    <span className="mono text-[14px] text-black/40">{f.img}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
