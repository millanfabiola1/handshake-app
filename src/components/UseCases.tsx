'use client'
import { useRef } from 'react'
import { Eye, Wrench, PaintBrush, ShieldCheck, Storefront, ArrowRight, ArrowLeft } from '@phosphor-icons/react'
import ScrollReveal from './ScrollReveal'

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

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.querySelector('div')?.offsetWidth ?? 400
    scrollRef.current.scrollBy({ left: dir === 'left' ? -cardWidth - 20 : cardWidth + 20, behavior: 'smooth' })
  }

  return (
    <section className="py-[140px] bg-[#39FF78] sticky top-0 z-[5]" id="use-cases">
      <div className="bg-white rounded-t-[24px] py-[140px] -my-[140px]" style={{ backgroundImage: 'url(/hologram-light.png)', backgroundSize: 'cover', backgroundPosition: 'bottom center' }}>
      <div className="px-4 md:px-8 lg:px-10 xl:px-12 flex items-end justify-between mb-14">
        <ScrollReveal>
          <p className="mono text-[11px] text-[#18181B]/40 uppercase mb-5">Who it&apos;s for</p>
          <h2 className="font-light text-[#18181B] tracking-[-0.035em] leading-[1.1] max-w-[500px]" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
            Built for the new economy
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="flex gap-2">
            <button onClick={() => scroll('left')} className="w-14 h-14 rounded-full border border-black/10 hover:bg-black hover:text-white hover:border-transparent flex items-center justify-center transition-all duration-300 cursor-pointer text-black/40">
              <ArrowLeft size={22} weight="bold" />
            </button>
            <button onClick={() => scroll('right')} className="w-14 h-14 rounded-full border border-black/10 hover:bg-black hover:text-white hover:border-transparent flex items-center justify-center transition-all duration-300 cursor-pointer text-black/40">
              <ArrowRight size={22} weight="bold" />
            </button>
          </div>
        </ScrollReveal>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pl-4 md:pl-8 lg:pl-10 xl:pl-12 pr-4 md:pr-8 pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {cases.map((item) => (
          <div
            key={item.label}
            className="group bg-white border border-black/5 rounded-2xl overflow-hidden hover:bg-black hover:border-transparent transition-all duration-300 cursor-pointer flex flex-col snap-start flex-shrink-0"
            style={{ width: 'min(380px, 80vw)' }}
          >
            <div className="h-[180px] img-placeholder-light group-hover:img-placeholder flex items-center justify-center transition-all duration-300">
              <item.icon size={40} weight="thin" className="text-black/15 group-hover:text-white/20 transition-colors duration-300" />
            </div>
            <div className="p-8 flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-black/5 group-hover:bg-white/10 flex items-center justify-center transition-colors duration-300">
                <item.icon size={20} weight="light" className="text-black/40 group-hover:text-white transition-colors duration-300" />
              </div>
              <p className="mono text-[11px] text-black/40 group-hover:text-white/40 uppercase transition-colors duration-300">{item.label}</p>
            </div>
            <h3 className="text-[22px] font-light text-[#18181B] group-hover:text-white tracking-[-0.02em] leading-[1.2] mb-3 transition-colors duration-300">{item.title}</h3>
            <p className="text-[15px] font-light text-[#71717A] group-hover:text-white/50 leading-[1.6] mb-8 transition-colors duration-300 flex-1">{item.desc}</p>
            <div className="flex items-baseline gap-2 mt-auto">
              <span className="text-[32px] font-light text-[#18181B] group-hover:text-[#39FF78] tracking-[-0.03em] transition-colors duration-300">{item.stat.value}</span>
              <span className="mono text-[11px] text-[#A1A1AA] group-hover:text-white/40 uppercase transition-colors duration-300">{item.stat.label}</span>
            </div>
            </div>
          </div>
        ))}

        {/* CTA card */}
        <div
          className="bg-[#39FF78] rounded-2xl p-8 flex flex-col justify-between snap-start flex-shrink-0"
          style={{ width: 'min(380px, 80vw)' }}
        >
          <div>
            <p className="mono text-[11px] text-black/40 uppercase mb-3">The platform</p>
            <h3 className="text-[22px] font-light text-black tracking-[-0.02em] leading-[1.2]">A handshake seals every deal.</h3>
          </div>
          <a href="#" className="text-[13px] font-medium px-5 py-2.5 rounded-lg bg-black text-white hover:bg-black/80 transition-colors self-start inline-flex items-center gap-1.5 mt-8">
            Get early access <ArrowRight size={14} weight="bold" />
          </a>
        </div>
      </div>
      </div>
    </section>
  )
}
