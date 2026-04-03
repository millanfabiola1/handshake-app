'use client'
import { useState } from 'react'
import { CreditCard, Bank, Money, CurrencyCircleDollar } from '@phosphor-icons/react'
import ScrollReveal from './ScrollReveal'

const methods = [
  { label: 'Credit cards', icon: CreditCard, heading: 'All major\nnetworks. 0%.' },
  { label: 'Bank transfers', icon: Bank, heading: 'ACH and\ndirect. 0%.' },
  { label: 'Debit cards', icon: Money, heading: 'Instant\naccess. 0%.' },
  { label: 'International', icon: CurrencyCircleDollar, heading: 'Global\npayouts. 0%.' },
]

const defaultHeading = 'All cards.\nAll banks.\n0%.'

export default function PaymentMethods() {
  const [hovered, setHovered] = useState<number | null>(null)
  const activeHeading = hovered !== null ? methods[hovered].heading : defaultHeading

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#F4F4F5] sticky top-0 z-[13] rounded-t-[24px] relative px-4 md:px-8 lg:px-10 xl:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 w-full">
        <div>
          <ScrollReveal>
            <p className="mono text-[11px] text-[#18181B]/40 uppercase mb-10">Accepted everywhere</p>
          </ScrollReveal>
          <h2 className="font-light text-[#18181B] tracking-[-0.05em] leading-[0.85] transition-all duration-300 whitespace-pre-line" style={{ fontSize: 'clamp(60px, 10vw, 140px)' }}>
            {activeHeading}
          </h2>
        </div>
        <div className="flex flex-col justify-center gap-10">
          {methods.map((m, i) => (
            <ScrollReveal key={m.label} delay={100 + i * 60}>
              <div
                className="flex items-center gap-6 cursor-pointer group"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <m.icon size={64} weight="regular" className="text-[#18181B]" />
                <span className="text-[36px] md:text-[48px] font-light text-[#18181B] tracking-[-0.02em] underline-offset-8 decoration-2 group-hover:underline">{m.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
