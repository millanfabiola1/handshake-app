'use client'
import { useRef, useEffect, useState } from 'react'
import { Eye, Wrench, PaintBrush, ShieldCheck, Storefront, ArrowRight, ArrowLeft } from '@phosphor-icons/react'
import ScrollReveal from './ScrollReveal'
import { useWaitlist } from './WaitlistContext'

const cardImages = ['/image%201.png', '/image%202.png', '/image%203.png']

const cases = [
  {
    label: 'Psychics & Coaches',
    icon: Eye,
    title: 'Lock premium readings',
    desc: 'Charge per message. Lock premium sessions. Schedule paid calls. One app does it all.',
    stat: { value: '$120', label: 'Avg session revenue' },
    img: '/usecase-psychics.webp',
  },
  {
    label: 'Home Services',
    icon: Wrench,
    title: 'Quote, confirm, collect',
    desc: 'Your clients already text you. Now those texts make you money.',
    stat: { value: '3x', label: 'Faster collections' },
    img: '/usecase-homeservices.webp',
  },
  {
    label: 'Creators & Independents',
    icon: PaintBrush,
    title: 'Tips. Locked drops. Keep 100%.',
    desc: 'Every DM is a potential payday. Every follower is a potential revenue source.',
    stat: { value: '47%', label: 'Higher conversion' },
    img: '/usecase-creators.webp',
  },
  {
    label: 'Security & Service Companies',
    icon: ShieldCheck,
    title: 'Coordinate and invoice instantly',
    desc: 'Ditch the invoicing software. Bill clients the second the job is done.',
    stat: { value: '90%', label: 'Faster invoicing' },
  },
  {
    label: 'Sales & Retail',
    icon: Storefront,
    title: 'Revenue on autopilot',
    desc: 'Send personalized campaigns that drive return visits and feel human, not automated.',
    stat: { value: '98%', label: 'Open rate' },
  },
]

export default function UseCases() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const showWaitlist = useWaitlist()
  const [paused, setPaused] = useState(false)
  const animRef = useRef<number>(0)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.querySelector('div')?.offsetWidth ?? 400
    scrollRef.current.scrollBy({ left: dir === 'left' ? -cardWidth - 20 : cardWidth + 20, behavior: 'smooth' })
    setPaused(true)
    setTimeout(() => setPaused(false), 3000)
  }

  // Auto-scroll carousel
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let lastTime = 0
    const speed = 0.5 // pixels per frame

    const animate = (time: number) => {
      if (!paused && lastTime) {
        const delta = time - lastTime
        el.scrollLeft += speed * (delta / 16)
        // Loop back when reaching the end
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
          el.scrollLeft = 0
        }
      }
      lastTime = time
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [paused])

  return (
    <div className="relative z-[56]" style={{ marginTop: '-100vh' }}>
    <section className="bg-[#A5F41F] sticky top-0 rounded-t-[24px] relative" id="use-cases">
      <div className="py-[140px]">
      <div className="px-4 md:px-8 lg:px-10 xl:px-12 flex items-end justify-between mb-14">
        <ScrollReveal>
          <h2 className="font-medium text-[#18181B] tracking-[-0.035em] leading-[0.95] max-w-[500px]" style={{ fontSize: 'clamp(44px, 7vw, 80px)' }}>
            Built for the new economy
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="flex gap-2">
            <button onClick={() => scroll('left')} className="w-14 h-14 rounded-full border border-black hover:bg-black hover:text-white hover:border-transparent flex items-center justify-center transition-all duration-300 cursor-pointer text-black">
              <ArrowLeft size={22} weight="bold" />
            </button>
            <button onClick={() => scroll('right')} className="w-14 h-14 rounded-full border border-black hover:bg-black hover:text-white hover:border-transparent flex items-center justify-center transition-all duration-300 cursor-pointer text-black">
              <ArrowRight size={22} weight="bold" />
            </button>
          </div>
        </ScrollReveal>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pl-8 md:pl-12 lg:pl-16 xl:pl-20 pr-4 md:pr-8 pb-4 scrollbar-hide scroll-pl-8 md:scroll-pl-12 lg:scroll-pl-16 xl:scroll-pl-20"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setTimeout(() => setPaused(false), 3000)}
      >
        {cases.map((item, i) => (
          <div
            key={item.label}
            className="group rounded-lg overflow-hidden transition-all duration-300 cursor-pointer flex flex-col snap-start flex-shrink-0 bg-white hover:bg-black"
            style={{ width: 'min(380px, 80vw)', minHeight: '480px' }}
          >
            <div className="p-8 flex flex-col flex-1 justify-end">
            <p className="mono text-[11px] text-black/40 group-hover:text-white/50 uppercase transition-colors duration-300 mb-6">{item.label}</p>
            <h3 className="text-[36px] font-normal text-[#18181B] group-hover:text-white tracking-[-0.03em] leading-[1.1] mb-3 transition-colors duration-300">{item.title}</h3>
            <p className="text-[15px] font-normal text-[#71717A] group-hover:text-white/70 leading-[1.6] mb-8 transition-colors duration-300 flex-1">{item.desc}</p>
            <div className="flex items-baseline gap-2 mt-auto">
              <span className="text-[48px] font-semibold text-[#18181B] group-hover:text-[#A5F41F] tracking-[-0.04em] transition-colors duration-300">{item.stat.value}</span>
              <span className="mono text-[11px] text-black/40 group-hover:text-white/50 uppercase transition-colors duration-300">{item.stat.label}</span>
            </div>
            </div>
          </div>
        ))}

        {/* CTA card */}
        <div
          className="bg-black rounded-lg p-8 flex flex-col justify-between snap-start flex-shrink-0"
          style={{ width: 'min(380px, 80vw)' }}
        >
          <div>
            <p className="mono text-[11px] text-white/40 uppercase mb-3">The platform</p>
            <h3 className="text-[22px] font-normal text-white tracking-[-0.02em] leading-[1.2]">0% fees. 100% yours.</h3>
          </div>
          <button onClick={showWaitlist} className="text-[13px] font-medium px-5 py-2.5 rounded-lg bg-[#A5F41F] text-black hover:bg-[#A5F41F]/80 transition-colors self-start inline-flex items-center gap-1.5 mt-8 cursor-pointer">
            Get Tapp'd <span className="text-[14px]">&#x2197;</span>
          </button>
        </div>
      </div>
      </div>
    </section>
    </div>
  )
}
