'use client'
import { useState } from 'react'
import { CurrencyDollar, LockSimple, PhoneCall, Megaphone } from '@phosphor-icons/react'
import ScrollReveal from './ScrollReveal'

const features = [
  { label: 'Tips', title: 'One tap. Instant gratitude.', desc: 'Let your community show appreciation with one-tap payments mid-conversation. No links, no redirects — just seamless value exchange.', icon: CurrencyDollar },
  { label: 'Locked Content', title: 'Gate it. Earn from it.', desc: 'Photos, videos, or messages behind a paywall — fans unlock what they want, you earn what you deserve.', icon: LockSimple },
  { label: 'Paid Calls', title: 'Your time. Your rate.', desc: '1-on-1 voice or video sessions billed per minute or flat rate. Booked, confirmed, and paid — all inside the thread.', icon: PhoneCall },
  { label: 'Mass Messaging', title: 'Blast it. Make it personal.', desc: 'Reach your entire client book with messages that never feel automated. Every message feels one-to-one, even at scale.', icon: Megaphone },
]

export default function StickyFeatures() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = features[activeIndex]

  return (
    <section id="product" className="relative z-[3] rounded-t-none lg:rounded-t-[24px] bg-white sticky top-0">
      <div className="pt-[60px] pb-[80px] lg:py-[180px] px-4 md:px-8 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          {/* Left: headline + tabs + feature text */}
          <div>
            <ScrollReveal>
              <h2 className="font-light text-black tracking-[-0.04em] leading-[0.95] mb-12" style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>
                Built for the<br />conversation economy
              </h2>
            </ScrollReveal>

            {/* Tab pills */}
            <div className="flex gap-2 mb-10 flex-wrap">
              {features.map((f, i) => (
                <button
                  key={f.label}
                  onClick={() => setActiveIndex(i)}
                  className={`text-[14px] lg:text-[15px] font-normal px-7 py-3.5 rounded-lg transition-all duration-300 cursor-pointer inline-flex items-center gap-2 shrink-0 ${
                    activeIndex === i
                      ? 'bg-[#39FF78] text-black'
                      : 'bg-[#F4F4F5] text-[#71717A] hover:bg-[#E4E4E7] hover:text-black'
                  }`}
                >
                  <f.icon size={16} weight="light" />
                  {f.label}
                </button>
              ))}
            </div>

            <h3 className="text-[28px] md:text-[40px] font-light text-black tracking-[-0.03em] leading-[1.1] mb-5 transition-all duration-300">{active.title}</h3>
            <p className="text-[19px] font-light text-black leading-[1.65] max-w-[480px] transition-all duration-300">{active.desc}</p>
          </div>

          {/* Right: Video */}
          <ScrollReveal delay={150}>
            <div className="w-full rounded-lg overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
              <video
                src="/a5964603cb2e4a249ac8a336c1a0239d.HD-1080p-7.2Mbps-14082701.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
