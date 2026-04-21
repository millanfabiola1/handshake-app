'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { CurrencyDollar, LockSimple, PhoneCall, Megaphone } from '@phosphor-icons/react'
import ScrollReveal from './ScrollReveal'
import { useWaitlist } from './WaitlistContext'

const paymentTabs = [
  {
    label: 'Tips',
    icon: CurrencyDollar,
    value: 0,
    suffix: '%',
    sublabel: 'Platform fee',
    desc: 'Your community shows love with one-tap payments. You keep 100%. Zero fees taken.',
  },
  {
    label: 'Locked Content',
    icon: LockSimple,
    value: 85,
    suffix: '%',
    sublabel: 'Unlock rate',
    desc: 'Photos, videos, messages. Lock them behind a paywall. Fans unlock, you earn.',
  },
  {
    label: 'Paid Calls',
    icon: PhoneCall,
    value: 8500,
    suffix: '+',
    sublabel: 'Calls booked',
    desc: 'Schedule a call. Set your price. The money hits before the conversation starts.',
  },
  {
    label: 'Mass Messaging',
    icon: Megaphone,
    value: 98,
    suffix: '%',
    sublabel: 'Delivery rate',
    desc: 'Hit your entire list at once. Every message feels personal. Every reply is a revenue opportunity.',
  },
]

function AnimatedNumber({ value, suffix, duration = 1500 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(value)
  const prevValue = useRef(value)

  useEffect(() => {
    const from = prevValue.current
    const to = value
    prevValue.current = value
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.round(from + (to - from) * eased))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [value, duration])

  return <>{count.toLocaleString()}{suffix}</>
}

const SLIDE_DURATION = 3200 // ms per slide

export default function CTASection() {
  const showWaitlist = useWaitlist()
  const [activeTab, setActiveTab] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(Date.now())
  const active = paymentTabs[activeTab]

  const goTo = (i: number) => {
    setActiveTab(i)
    setProgress(0)
    startTimeRef.current = Date.now()
  }

  useEffect(() => {
    if (paused) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
      return
    }

    startTimeRef.current = Date.now()
    setProgress(0)

    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      setProgress(Math.min(elapsed / SLIDE_DURATION, 1))
    }, 16)

    intervalRef.current = setTimeout(() => {
      setActiveTab((prev) => (prev + 1) % paymentTabs.length)
      setProgress(0)
      startTimeRef.current = Date.now()
    }, SLIDE_DURATION)

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [activeTab, paused])

  return (
    <section className="py-[140px] px-4 md:px-8 lg:px-10 xl:px-12 bg-[#0D0D0F] sticky top-0 z-[204] rounded-t-[24px] relative overflow-hidden">
      {/* Stronger radial gradient — prominent green glow */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 120%, rgba(165,244,31,0.32) 0%, rgba(165,244,31,0.08) 45%, transparent 70%)' }} aria-hidden />
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(165,244,31,0.18) 0%, transparent 60%)' }} aria-hidden />
      <div className="noise-texture absolute inset-0 z-0" aria-hidden />

      <div className="relative z-10 max-w-[900px] mx-auto text-center">
        {/* Animated stat */}
        <div className="mono leading-[0.85] tracking-[-0.06em] text-white transition-all duration-500" style={{ fontSize: 'clamp(100px, 20vw, 280px)' }}>
          <AnimatedNumber value={active.value} suffix={active.suffix} />
        </div>
        <p className="mono text-[12px] text-white/30 uppercase tracking-widest mt-6 mb-8 transition-all duration-300">
          {active.sublabel}
        </p>
        <p className="text-[18px] md:text-[20px] font-normal text-white/60 leading-[1.55] max-w-[460px] mx-auto mb-10">
          {active.desc}
        </p>

        {/* Tabs with progress indicators */}
        <div
          className="flex items-center justify-center gap-2 flex-wrap mb-24"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {paymentTabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => { goTo(i); setPaused(false) }}
              className={`mono text-[14px] px-7 py-3.5 rounded-lg transition-all duration-300 cursor-pointer inline-flex items-center gap-2.5 relative overflow-hidden ${
                activeTab === i
                  ? 'bg-white text-black shadow-[0_2px_12px_rgba(0,0,0,0.3)]'
                  : 'bg-white/8 text-white/50 hover:bg-white/15 hover:text-white ring-1 ring-white/10'
              }`}
            >
              {/* Progress fill on active tab */}
              {activeTab === i && !paused && (
                <span
                  className="absolute inset-0 bg-[#A5F41F]/20 origin-left pointer-events-none"
                  style={{ transform: `scaleX(${progress})`, transition: 'transform 16ms linear' }}
                />
              )}
              <tab.icon size={18} weight={activeTab === i ? 'fill' : 'regular'} />
              <span className="relative">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-16 bg-white/10 mx-auto mb-24" />

        {/* CTA */}
        <ScrollReveal>
          <h2 className="font-medium text-white tracking-[-0.045em] leading-[0.95]" style={{ fontSize: 'clamp(48px, 8vw, 100px)' }}>
            Get tappd.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <p className="text-[18px] font-normal text-white/60 leading-[1.5] mt-8 max-w-[420px] mx-auto">
            The messaging app that pays. Every conversation is a potential transaction. Every dollar is yours.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={140}>
          <div className="flex items-center justify-center gap-4 mt-12">
            <button onClick={showWaitlist} className="text-[14px] font-medium text-black px-8 py-4 rounded-full bg-[#A5F41F] hover:bg-[#94DC1B] transition-colors inline-flex items-center gap-2 cursor-pointer shadow-[0_0_24px_rgba(165,244,31,0.35)]">
              Get tappd <span className="text-[16px]">&#x2197;</span>
            </button>
            <a href="#product" className="text-[14px] font-medium text-white/80 px-8 py-4 rounded-full border border-white/15 hover:border-white/40 hover:text-white transition-all backdrop-blur-sm">
              See the product
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
