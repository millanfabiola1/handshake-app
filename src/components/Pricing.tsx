'use client'
import { useEffect, useRef, useState } from 'react'
import { CurrencyDollar, LockSimple, PhoneCall, Megaphone } from '@phosphor-icons/react'
import ScrollReveal from './ScrollReveal'

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

export default function Pricing() {
  const [activeTab, setActiveTab] = useState(0)
  const active = paymentTabs[activeTab]

  return (
    <section className="py-[180px] px-4 md:px-8 lg:px-10 xl:px-12 bg-white text-[#18181B] sticky top-0 z-[11] rounded-t-[24px] relative" id="pricing">
      <div className="text-center">
        <div className="mono leading-[0.85] tracking-[-0.06em] text-[#18181B] transition-all duration-500" style={{ fontSize: 'clamp(100px, 20vw, 280px)' }}>
          <AnimatedNumber value={active.value} suffix={active.suffix} />
        </div>
        <ScrollReveal delay={100}><p className="mono text-[12px] text-[#A1A1AA] uppercase mt-8 mb-10 transition-all duration-300">{active.sublabel}</p></ScrollReveal>
        <ScrollReveal delay={150}>
          <p className="text-[18px] md:text-[20px] font-normal text-[#71717A] leading-[1.55] max-w-[460px] mx-auto">
            {active.desc}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="flex items-center justify-center gap-2 mt-16 flex-wrap">
            {paymentTabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={`mono text-[14px] px-7 py-3.5 rounded-lg transition-all duration-300 cursor-pointer inline-flex items-center gap-2.5 ${
                  activeTab === i
                    ? 'bg-[#18181B] text-white'
                    : 'bg-[#F4F4F5] text-[#71717A] hover:bg-[#E4E4E7] hover:text-black'
                }`}
              >
                <tab.icon size={18} weight={activeTab === i ? 'fill' : 'regular'} />
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
