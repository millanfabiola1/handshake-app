'use client'
import { CreditCard, Bank, Money, CurrencyCircleDollar } from '@phosphor-icons/react'

const methods = [
  { label: 'Credit cards', icon: CreditCard },
  { label: 'Bank transfers', icon: Bank },
  { label: 'Debit cards', icon: Money },
  { label: 'P2P payments', icon: CurrencyCircleDollar },
]

export default function PaymentMethods() {
  return (
    <section className="py-16 bg-white sticky top-0 z-[7] rounded-t-[24px] relative">
      <div className="flex items-center justify-center gap-10 flex-wrap px-4">
        {methods.map((m) => (
          <div key={m.label} className="flex items-center gap-2">
            <m.icon size={18} weight="regular" className="text-[#D4D4D8]" />
            <span className="mono text-[12px] text-[#D4D4D8] uppercase">{m.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
