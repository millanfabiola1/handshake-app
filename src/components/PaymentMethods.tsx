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
    <section className="min-h-screen flex flex-col items-center justify-center bg-[#F4F4F5] sticky top-0 z-[7] rounded-t-[24px] relative px-4 md:px-8 lg:px-10 xl:px-12">
      <ScrollReveal>
        <p className="mono text-[11px] text-[#18181B]/40 uppercase mb-10 text-center">Accepted everywhere</p>
      </ScrollReveal>
      <ScrollReveal delay={80}>
        <h2 className="font-light text-[#18181B] tracking-[-0.035em] leading-[0.95] text-center max-w-[600px] mb-20" style={{ fontSize: 'clamp(44px, 7vw, 80px)' }}>
          Every way to pay
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={160}>
        <div className="flex items-center justify-center gap-16 flex-wrap">
          {methods.map((m) => (
            <div key={m.label} className="flex flex-col items-center gap-4">
              <m.icon size={40} weight="regular" className="text-[#A1A1AA]" />
              <span className="mono text-[13px] text-[#A1A1AA] uppercase">{m.label}</span>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
