'use client'
import { useRef, useEffect, useState } from 'react'
import { ChatCircle, CurrencyDollar, Wallet } from '@phosphor-icons/react'

const steps = [
  {
    num: '01',
    title: 'Send a message.',
    desc: 'Text people like iMessage. Tips, locked content, and invoices are built right into the conversation.',
    icon: ChatCircle,
    bg: 'bg-[#A5F41F]',
    textColor: 'text-black',
  },
  {
    num: '02',
    title: 'Get paid.',
    desc: 'One tap. Instant payment. No links, no redirects, no third-party apps. Money moves inside the chat.',
    icon: CurrencyDollar,
    bg: 'bg-[#0A0A0B]',
    textColor: 'text-white',
  },
  {
    num: '03',
    title: 'Keep 100%.',
    desc: 'Every dollar sent goes directly to you. No commissions. No revenue splits. No surprises.',
    icon: Wallet,
    bg: 'bg-[#1A1A1D]',
    textColor: 'text-white',
  },
]

export default function HowItWorksHScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollable = el.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const p = Math.min(Math.max(-rect.top / scrollable, 0), 1)
      setProgress(p)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <section ref={containerRef} className="relative" style={{ height: '300vh' }}>
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center px-4 md:px-8 lg:px-10 xl:px-12 bg-white">
        <p className="mono text-[12px] text-black/40 uppercase tracking-widest mb-4">How it works</p>
        <h2 className="font-medium text-black tracking-[-0.04em] leading-[0.9] mb-12 md:mb-16" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>
          Three steps. Zero fees.
        </h2>

        {/* Desktop: horizontal sliding cards */}
        <div className="hidden lg:block overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-100 ease-out"
            style={{ transform: `translateX(-${progress * 66}%)` }}
          >
            {steps.map((step) => (
              <div
                key={step.num}
                className={`${step.bg} rounded-2xl p-10 xl:p-14 flex flex-col justify-between flex-shrink-0`}
                style={{ width: 'min(500px, 40vw)', minHeight: '400px' }}
              >
                <div>
                  <step.icon size={56} weight="light" className={`${step.textColor} opacity-30`} />
                  <p className={`mono text-[64px] font-medium ${step.textColor} opacity-10 mt-4`}>{step.num}</p>
                </div>
                <div>
                  <h3 className={`text-[32px] xl:text-[40px] font-medium ${step.textColor} tracking-[-0.03em] leading-[1.05] mb-4`}>{step.title}</h3>
                  <p className={`text-[16px] xl:text-[18px] ${step.textColor} opacity-60 leading-[1.6] max-w-[380px]`}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="lg:hidden flex flex-col gap-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className={`${step.bg} rounded-xl p-6 flex flex-col gap-4`}
            >
              <div className="flex items-center gap-3">
                <step.icon size={28} weight="light" className={`${step.textColor} opacity-40`} />
                <p className={`mono text-[12px] ${step.textColor} opacity-30`}>{step.num}</p>
              </div>
              <h3 className={`text-[24px] font-medium ${step.textColor} tracking-[-0.02em] leading-[1.1]`}>{step.title}</h3>
              <p className={`text-[14px] ${step.textColor} opacity-60 leading-[1.5]`}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
