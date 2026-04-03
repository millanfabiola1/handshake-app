'use client'
import { Eye, Wrench, PaintBrush, ShieldCheck, Storefront } from '@phosphor-icons/react'
import ScrollReveal from '../ScrollReveal'

const cases = [
  {
    label: 'Psychics & Coaches',
    icon: Eye,
    title: 'Lock premium readings.',
    desc: 'Charge per message. Lock premium sessions. Schedule paid calls. One app does it all.',
  },
  {
    label: 'Home Services',
    icon: Wrench,
    title: 'Quote, confirm, collect.',
    desc: 'Your clients already text you. Now those texts make you money.',
  },
  {
    label: 'Creators & Independents',
    icon: PaintBrush,
    title: 'Tips. Locked drops. Keep 100%.',
    desc: 'Every DM is a potential payday. Every follower is a potential revenue source.',
  },
  {
    label: 'Security & Service Companies',
    icon: ShieldCheck,
    title: 'Coordinate and invoice instantly.',
    desc: 'Ditch the invoicing software. Bill clients the second the job is done.',
  },
  {
    label: 'Sales & Retail',
    icon: Storefront,
    title: 'Revenue on autopilot.',
    desc: 'Send personalized campaigns that drive return visits and feel human, not automated.',
  },
]

export default function V2UseCases() {
  return (
    <section className="py-24 md:py-40 bg-white">
      <div className="px-4 md:px-8 lg:px-10 xl:px-12 mb-16 md:mb-24">
        <ScrollReveal>
          <h2 className="font-medium text-black tracking-[-0.04em] leading-[0.9] text-center" style={{ fontSize: 'clamp(40px, 8vw, 80px)' }}>
            Built for everyone<br />who gets paid.
          </h2>
        </ScrollReveal>
      </div>

      <div className="flex flex-col">
        {cases.map((item, i) => {
          const isReversed = i % 2 === 1
          return (
            <ScrollReveal key={item.label} delay={100}>
              <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch border-t border-black/5`}>
                {/* Visual side */}
                <div className={`w-full lg:w-1/2 ${i % 2 === 0 ? 'bg-[#F4F4F5]' : 'bg-[#0A0A0B]'} flex items-center justify-center py-20 md:py-28 px-8`}>
                  <item.icon size={120} weight="thin" className={`${i % 2 === 0 ? 'text-black/10' : 'text-white/10'}`} />
                </div>

                {/* Content side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center py-16 md:py-24 px-8 md:px-16 lg:px-20">
                  <p className="mono text-[11px] text-black/40 uppercase tracking-widest mb-6">{item.label}</p>
                  <h3 className="font-medium text-black tracking-[-0.03em] leading-[1.05] mb-5" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                    {item.title}
                  </h3>
                  <p className="text-[16px] md:text-[18px] text-black/55 leading-[1.6] max-w-[440px]">
                    {item.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          )
        })}
      </div>
    </section>
  )
}
