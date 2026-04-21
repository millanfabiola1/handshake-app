'use client'
import { CurrencyDollar, LockSimple, PhoneCall, Megaphone } from '@phosphor-icons/react'
import ScrollReveal from '../ScrollReveal'

const features = [
  {
    label: 'Tips',
    title: 'Get tipped mid-convo.',
    desc: 'Tips flow in while you\'re still talking. No awkward payment requests.',
    Icon: CurrencyDollar,
    bg: 'bg-[#A5F41F]',
    textColor: 'text-black',
  },
  {
    label: 'Locked Content',
    title: 'Lock it. Earn it.',
    desc: 'Your premium content stays locked until they pay. Simple as that.',
    Icon: LockSimple,
    bg: 'bg-[#0A0A0B]',
    textColor: 'text-white',
  },
  {
    label: 'Paid Calls',
    title: 'Talk money.',
    desc: 'Your time has value. Now your phone calls do too.',
    Icon: PhoneCall,
    bg: 'bg-[#F4F4F5]',
    textColor: 'text-black',
  },
  {
    label: 'Mass Messaging',
    title: 'Blast without the spam.',
    desc: 'Text everyone you know. Personalized. Human. Revenue-driving.',
    Icon: Megaphone,
    bg: 'bg-[#1A1A1D]',
    textColor: 'text-white',
  },
]

export default function FeaturesBentoGrid() {
  return (
    <section id="features" className="py-24 md:py-40 px-4 md:px-8 lg:px-10 xl:px-12 bg-white">
      <ScrollReveal>
        <h2 className="font-medium text-black tracking-[-0.04em] leading-[0.9] text-center mb-16 md:mb-24" style={{ fontSize: 'clamp(40px, 8vw, 80px)' }}>
          Built for the<br />conversation economy.
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-[1200px] mx-auto">
        {features.map((f, i) => (
          <ScrollReveal key={f.label} delay={i * 100}>
            <div className={`${f.bg} rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[300px] md:min-h-[340px] group hover:scale-[1.02] transition-transform duration-300`}>
              <f.Icon size={48} weight="light" className={`${f.textColor} opacity-40`} />
              <div>
                <p className={`mono text-[11px] uppercase ${f.textColor} opacity-40 mb-3`}>{f.label}</p>
                <h3 className={`text-[28px] md:text-[36px] font-medium ${f.textColor} tracking-[-0.03em] leading-[1.05] mb-3`}>{f.title}</h3>
                <p className={`text-[15px] md:text-[16px] ${f.textColor} opacity-60 leading-[1.5]`}>{f.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
