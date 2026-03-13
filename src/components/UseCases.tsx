'use client'
import { useRef } from 'react'
import { Eye, Wrench, PaintBrush, ShieldCheck, Storefront, ArrowRight, ArrowLeft } from '@phosphor-icons/react'
import ScrollReveal from './ScrollReveal'
import { useWaitlist } from './WaitlistContext'

const cardImages = ['/image%201.png', '/image%202.png', '/image%203.png']

const cases = [
  {
    label: 'Psychics & Coaches',
    icon: Eye,
    title: 'Premium readings & sessions',
    desc: 'Charge per message, lock premium readings, schedule paid call sessions — all from one thread.',
    stat: { value: '$120', label: 'Avg session revenue' },
  },
  {
    label: 'Home Services',
    icon: Wrench,
    title: 'Quote, confirm, collect',
    desc: 'Quote, confirm, and collect payment without ever leaving the chat.',
    stat: { value: '3x', label: 'Faster collections' },
  },
  {
    label: 'Creators',
    icon: PaintBrush,
    title: 'Every follower, a revenue source',
    desc: 'Tips, locked drops, and paid access make every follower a potential revenue stream.',
    stat: { value: '47%', label: 'Higher conversion' },
  },
  {
    label: 'Security Firms',
    icon: ShieldCheck,
    title: 'Real-time coordination',
    desc: 'Coordinate with clients in real-time and invoice instantly on job completion.',
    stat: { value: '90%', label: 'Faster invoicing' },
  },
  {
    label: 'Sales & Retail',
    icon: Storefront,
    title: 'Human-feeling campaigns',
    desc: 'Send personalized mass campaigns that drive return visits and feel human.',
    stat: { value: '98%', label: 'Open rate' },
  },
]

export default function UseCases() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const showWaitlist = useWaitlist()

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.querySelector('div')?.offsetWidth ?? 400
    scrollRef.current.scrollBy({ left: dir === 'left' ? -cardWidth - 20 : cardWidth + 20, behavior: 'smooth' })
  }

  return (
    <section className="bg-white sticky top-0 z-[5] rounded-t-[24px] relative" id="use-cases">
      <div className="py-[140px]" style={{ backgroundImage: 'url(/hologram-light.png)', backgroundSize: 'cover', backgroundPosition: 'bottom center' }}>
      <div className="px-4 md:px-8 lg:px-10 xl:px-12 flex items-end justify-between mb-14">
        <ScrollReveal>
          <p className="mono text-[11px] text-[#18181B]/40 uppercase mb-5">Who it&apos;s for</p>
          <h2 className="font-light text-[#18181B] tracking-[-0.035em] leading-[0.95] max-w-[500px]" style={{ fontSize: 'clamp(44px, 7vw, 80px)' }}>
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
        className="flex gap-5 overflow-x-auto pl-8 md:pl-12 lg:pl-16 xl:pl-20 pr-4 md:pr-8 pb-4 snap-x snap-mandatory scrollbar-hide scroll-pl-8 md:scroll-pl-12 lg:scroll-pl-16 xl:scroll-pl-20"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {cases.map((item, i) => (
          <div
            key={item.label}
            className="group relative rounded-lg overflow-hidden transition-all duration-300 cursor-pointer flex flex-col justify-end snap-start flex-shrink-0 bg-cover bg-center"
            style={{ width: 'min(380px, 80vw)', minHeight: '480px', backgroundImage: `url(${cardImages[i % cardImages.length]})` }}
          >
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black transition-all duration-300" />
            <div className="relative z-10 p-8 flex flex-col flex-1 justify-end">
            <p className="mono text-[11px] text-white/40 uppercase transition-colors duration-300 mb-6">{item.label}</p>
            <h3 className="text-[22px] font-light text-white tracking-[-0.02em] leading-[1.2] mb-3 transition-colors duration-300">{item.title}</h3>
            <p className="text-[15px] font-light text-white/50 leading-[1.6] mb-8 transition-colors duration-300 flex-1">{item.desc}</p>
            <div className="flex items-baseline gap-2 mt-auto">
              <span className="text-[32px] font-light text-[#39FF78] tracking-[-0.03em] transition-colors duration-300">{item.stat.value}</span>
              <span className="mono text-[11px] text-white/40 uppercase transition-colors duration-300">{item.stat.label}</span>
            </div>
            </div>
          </div>
        ))}

        {/* CTA card */}
        <div
          className="bg-[#39FF78] rounded-lg p-8 flex flex-col justify-between snap-start flex-shrink-0"
          style={{ width: 'min(380px, 80vw)' }}
        >
          <div>
            <p className="mono text-[11px] text-black/40 uppercase mb-3">The platform</p>
            <h3 className="text-[22px] font-light text-black tracking-[-0.02em] leading-[1.2]">A handshake seals every deal.</h3>
          </div>
          <button onClick={showWaitlist} className="text-[13px] font-medium px-5 py-2.5 rounded-lg bg-black text-white hover:bg-black/80 transition-colors self-start inline-flex items-center gap-1.5 mt-8 cursor-pointer">
            Get early access <span className="text-[14px]">&#x2197;</span>
          </button>
        </div>
      </div>
      </div>
    </section>
  )
}
