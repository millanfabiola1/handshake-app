'use client'
import { useEffect, useState } from 'react'
import { CurrencyDollar, LockSimple, PhoneCall, Megaphone } from '@phosphor-icons/react'

const leftCards = [
  {
    label: 'Tips',
    title: 'Get tipped mid-convo.',
    desc: 'One tap. Instant appreciation. Zero fees.',
    Icon: CurrencyDollar,
    bg: 'bg-[#A5F41F]',
    textColor: 'text-black',
  },
  {
    label: 'Paid Calls',
    title: 'Talk money.',
    desc: 'Bill per minute or flat. Get paid before you pick up.',
    Icon: PhoneCall,
    bg: 'bg-[#F4F4F5]',
    textColor: 'text-black',
  },
]

const rightCards = [
  {
    label: 'Locked Content',
    title: 'Lock it. Earn it.',
    desc: 'Premium content stays locked until they pay.',
    Icon: LockSimple,
    bg: 'bg-[#0A0A0B]',
    textColor: 'text-white',
  },
  {
    label: 'Mass Messaging',
    title: 'Blast without the spam.',
    desc: 'Personalized. Human. Revenue-driving.',
    Icon: Megaphone,
    bg: 'bg-[#1A1A1D]',
    textColor: 'text-white',
  },
]

const allCards = [...leftCards, ...rightCards]

function CardContent({ f }: { f: typeof leftCards[0] }) {
  return (
    <div className={`${f.bg} rounded-xl p-5 md:p-6 flex flex-col justify-between h-full group hover:scale-[1.03] transition-transform duration-300`}>
      <f.Icon size={28} weight="light" className={`${f.textColor} opacity-30`} />
      <div>
        <h3 className={`text-[16px] md:text-[20px] font-medium ${f.textColor} tracking-[-0.02em] leading-[1.1] mb-1`}>{f.title}</h3>
        <p className={`text-[12px] md:text-[13px] ${f.textColor} opacity-50 leading-[1.4]`}>{f.desc}</p>
      </div>
    </div>
  )
}

export default function StickyFeatures() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      // Use the wrapper div's position, not the sticky section
      const wrapper = document.querySelector('#product')?.parentElement
      if (!wrapper) return
      const wrapperTop = wrapper.getBoundingClientRect().top
      const vh = window.innerHeight
      // progress based on how far the wrapper has scrolled up
      // wrapper starts below viewport, scrolls up past it
      const p = Math.min(Math.max((vh - wrapperTop) / vh * 3, 0), 1)
      setProgress(p)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  // Gap widens from 0 to phone width as progress goes 0→1
  const gapWidth = progress * 100 // percentage of max gap
  const phoneGap = `clamp(0px, ${gapWidth * 2.8}px, 280px)`

  return (
    <div className="relative z-[3]" style={{ height: '200vh', marginTop: '-100vh' }}>
      <section id="product" className="h-screen relative bg-white sticky top-0 rounded-t-[24px] overflow-hidden">
        <div className="h-full flex flex-col justify-center px-4 md:px-8 lg:px-10 xl:px-12 py-10">

          {/* Desktop: cards split apart for phone */}
          <div className="hidden lg:flex items-center justify-center gap-4 max-w-[1000px] mx-auto w-full" style={{ height: '55vh' }}>
            {/* Left column */}
            <div className="flex flex-col gap-4 flex-1 h-full transition-all duration-100">
              {leftCards.map((f) => (
                <div key={f.label} className="flex-1">
                  <CardContent f={f} />
                </div>
              ))}
            </div>

            {/* Center gap — grows as you scroll */}
            <div className="shrink-0 transition-all duration-100" style={{ width: phoneGap }} />

            {/* Right column */}
            <div className="flex flex-col gap-4 flex-1 h-full transition-all duration-100">
              {rightCards.map((f) => (
                <div key={f.label} className="flex-1">
                  <CardContent f={f} />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: stacked grid */}
          <div className="lg:hidden grid grid-cols-2 gap-3 max-w-[600px] mx-auto w-full">
            {allCards.map((f) => (
              <div key={f.label} className="h-[clamp(140px,22vh,200px)]">
                <CardContent f={f} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
