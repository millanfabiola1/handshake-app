'use client'
import { CreditCard, Bank, Money, CurrencyCircleDollar } from '@phosphor-icons/react'
import ScrollReveal from './ScrollReveal'

const methods = [
  { label: 'Credit cards', icon: CreditCard },
  { label: 'Bank transfers', icon: Bank },
  { label: 'Debit cards', icon: Money },
  { label: 'P2P payments', icon: CurrencyCircleDollar },
]

export default function PaymentMethods() {
  return (
    <section className="min-h-screen flex items-center bg-[#F4F4F5] sticky top-0 z-[7] rounded-t-[24px] relative px-4 md:px-8 lg:px-10 xl:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 w-full max-w-[1200px] mx-auto">
        <div>
          <ScrollReveal>
            <p className="mono text-[11px] text-[#18181B]/40 uppercase mb-10">Accepted everywhere</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="font-light text-[#18181B] tracking-[-0.035em] leading-[0.95]" style={{ fontSize: 'clamp(44px, 7vw, 80px)' }}>
              Every way<br />to pay
            </h2>
          </ScrollReveal>
        </div>
        <div className="flex flex-col justify-center gap-10">
          {methods.map((m, i) => (
            <ScrollReveal key={m.label} delay={100 + i * 60}>
              <div className="flex items-center gap-6">
                <m.icon size={48} weight="regular" className="text-[#18181B]" />
                <span className="text-[28px] md:text-[36px] font-light text-[#18181B] tracking-[-0.02em]">{m.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
