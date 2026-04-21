'use client'
import { useEffect, useRef, useState } from 'react'
import { ChatCircle, Gear, Wallet, UserCircle, PaperPlaneTilt, ChartLineUp } from '@phosphor-icons/react'

const steps = [
  {
    step: '01',
    icon: ChatCircle,
    title: 'Start a conversation with anyone',
    desc: 'Open a thread with anyone you work with. Every conversation is a potential transaction waiting to happen.',
    img: 'Conversation view',
  },
  {
    step: '02',
    icon: UserCircle,
    title: 'They engage on their terms',
    desc: 'People tip, unlock content, or book a call — all without leaving the chat. Zero friction, maximum conversion.',
    img: 'Engagement flow',
  },
  {
    step: '03',
    icon: Gear,
    title: 'Enable monetization in-thread',
    desc: 'Toggle tips, paywalls, and paid calls right inside the conversation. No setup pages, no external links.',
    img: 'Monetization tools',
  },
  {
    step: '04',
    icon: PaperPlaneTilt,
    title: 'Blast campaigns that feel personal',
    desc: 'Reach everyone you know at once with messages that read like one-to-one texts. Scale without losing the human touch.',
    img: 'Campaign dashboard',
  },
  {
    step: '05',
    icon: ChartLineUp,
    title: 'Track everything in real time',
    desc: 'See who tipped, what unlocked, and how much you earned — all from a single dashboard that updates live.',
    img: 'Analytics dashboard',
  },
  {
    step: '06',
    icon: Wallet,
    title: 'Get paid instantly — keep everything',
    desc: 'Money hits your account immediately. No platform cut, no waiting period, no revenue share. It\'s all yours.',
    img: 'Payout screen',
  },
]

export default function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = steps.map((_, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i) },
        { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' }
      )
      const el = stepRefs.current[i]
      if (el) obs.observe(el)
      return obs
    })
    return () => observers.forEach((obs) => obs.disconnect())
  }, [])


  const active = steps[activeIndex]

  return (
    <section className="bg-[#F4F4F5] text-[#18181B] relative z-[58] rounded-t-[24px]">
      <div ref={containerRef} className="px-4 md:px-8 lg:px-10 xl:px-12 pb-[120px] lg:pb-[200px]">
        {/* Header */}
        <div className="pt-[120px] pb-16">
          <h2 className="font-medium text-[#18181B] tracking-[-0.035em] leading-[0.95]" style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>
            How it works
          </h2>
        </div>

        {/* Scrolling content + sticky image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: scrolling text steps */}
          <div className="flex flex-col relative">
            {steps.map((s, i) => (
              <div key={s.step}>
                <div
                  ref={(el) => { stepRefs.current[i] = el }}
                  className={`lg:min-h-[50vh] flex flex-col justify-center py-10 lg:py-12 transition-opacity duration-500 ${activeIndex === i ? '' : 'lg:opacity-[0.25]'}`}
                >
                  <h3 className="text-[36px] md:text-[48px] font-normal text-[#18181B] tracking-[-0.03em] leading-[0.95] text-balance mb-6">{s.title}</h3>
                  <p className="text-[16px] font-medium text-[#71717A] leading-[1.75] max-w-[480px]">{s.desc}</p>
                  {/* Placeholder image - mobile only */}
                  <div className="mt-8 rounded-lg bg-[#E4E4E7] flex items-center justify-center lg:hidden" style={{ aspectRatio: '4 / 3' }}>
                    <span className="text-[80px] font-light text-[#A1A1AA]/50 tracking-[-0.03em]">{i + 1}</span>
                  </div>
                </div>
                {/* Divider line between steps */}
                {i < steps.length - 1 && (
                  <div className="flex justify-center">
                    <div className="relative w-px h-[80px] lg:h-[200px]">
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="absolute top-0 left-0 w-full bg-[#18181B] origin-top transition-all duration-500" style={{ height: '100%', transform: `scaleY(${activeIndex > i ? 1 : 0})` }} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: sticky image (desktop only) */}
          <div className="hidden lg:block">
            <div className="sticky top-[50vh] -translate-y-1/2">
              <div className="w-full rounded-lg overflow-hidden relative bg-[#E4E4E7]" style={{ aspectRatio: '4 / 3' }}>
                {steps.map((s, i) => (
                  <div
                    key={s.step}
                    className="absolute inset-0 flex items-center justify-center transition-all duration-500"
                    style={{
                      opacity: activeIndex === i ? 1 : 0,
                      transform: activeIndex === i ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
                    }}
                  >
                    <span className="text-[120px] font-light text-[#A1A1AA]/50 tracking-[-0.03em]">{i + 1}</span>
                  </div>
                ))}
              </div>

              {/* Step indicators */}
              <div className="flex gap-2.5 mt-8 justify-center">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className="h-[5px] rounded-full transition-all duration-400"
                    style={{
                      width: activeIndex === i ? 48 : 16,
                      backgroundColor: activeIndex === i ? '#18181B' : 'rgba(0,0,0,0.1)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
