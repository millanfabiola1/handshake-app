'use client'
import { useEffect, useState, useRef } from 'react'
import { CurrencyDollar, Star, Globe } from '@phosphor-icons/react'
import ScrollReveal from './ScrollReveal'

const tags = ['Tips', 'Locked Content', 'Paid Calls', 'Mass Messaging', '0% Fees', 'In-Thread Payments', 'International', 'iOS & Android']
const tagRotations = tags.map((_, i) => (i % 2 === 0 ? -1 : 1) * (2 + i * 0.5))

function FallingTags() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <span
          key={tag}
          className="text-[13px] font-medium text-white bg-black px-4 py-2 rounded-full transition-all duration-700 ease-out hover:scale-110 hover:rotate-0 cursor-default"
          style={{
            transform: visible
              ? `rotate(${tagRotations[i]}deg) translateY(0)`
              : `rotate(${tagRotations[i] * 3}deg) translateY(-80px)`,
            opacity: visible ? 1 : 0,
            transitionDelay: `${i * 80}ms`,
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

export default function BentoGrid() {
  return (
    <section className="relative z-[104] rounded-t-[24px] py-[100px] lg:py-[140px] px-4 md:px-8 lg:px-10 xl:px-12" style={{ background: '#F4F4F5' }}>
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[340px]">

        {/* All-in-one */}
        <ScrollReveal>
          <div className="bg-white rounded-2xl p-8 h-full flex flex-col justify-between">
            <div className="w-12 h-12 rounded-xl bg-[#A5F41F] flex items-center justify-center">
              <CurrencyDollar size={24} weight="bold" className="text-black" />
            </div>
            <div>
              <h3 className="text-[22px] font-semibold text-black tracking-[-0.02em] mb-2">
                All-in-One <span className="bg-[#A5F41F] text-black px-1.5 rounded">Platform</span>
              </h3>
              <p className="text-[14px] text-black/50 leading-[1.5]">
                Messages, tips, locked content, paid calls, and mass messaging. All in one app.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Tagline */}
        <ScrollReveal delay={100}>
          <div className="bg-white rounded-2xl p-8 h-full flex flex-col justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#A5F41F]" />
              <div className="w-3 h-3 rounded-full bg-[#0A0A0B]" />
              <div className="w-3 h-3 rounded-full bg-black/20" />
            </div>
            <p className="text-[22px] md:text-[26px] font-medium text-black tracking-[-0.03em] leading-[1.2]">
              Tapp&apos;d is the <span className="bg-[#A5F41F] text-black px-1.5 rounded">messaging app that pays.</span> Every conversation is a potential transaction.
            </p>
          </div>
        </ScrollReveal>

        {/* Global */}
        <ScrollReveal delay={200}>
          <div className="bg-white rounded-2xl p-8 h-full flex flex-col justify-between text-center">
            <img src="/globe-wireframe.webp" alt="" className="w-full max-h-[240px] object-contain mx-auto" />
            <div>
              <h3 className="text-[22px] font-semibold text-black tracking-[-0.02em] mb-2">
                <span className="bg-[#A5F41F] text-black px-1.5 rounded">International</span> &amp; Global
              </h3>
              <p className="text-[14px] text-black/50 leading-[1.5]">
                Global payments and payouts. 0% fee. No borders.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Phone mockup card */}
        <ScrollReveal delay={50}>
          <div className="bg-white rounded-2xl p-8 h-full flex flex-col justify-between">
            <div className="flex justify-center">
              <div className="w-[110px] bg-black rounded-[20px] p-[3px]">
                <div className="rounded-[17px] overflow-hidden bg-black" style={{ aspectRatio: '9/19.5' }}>
                  <video
                    src="/demo.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-[22px] font-semibold text-black tracking-[-0.02em] mb-2">
                <span className="bg-[#A5F41F] text-black px-1.5 rounded">Instant</span> Payments
              </h3>
              <p className="text-[14px] text-black/50 leading-[1.5]">
                Get paid in-thread. No redirects.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Features cloud — dark pills */}
        <ScrollReveal delay={150}>
          <div className="bg-gradient-to-br from-[#A5F41F] via-[#8BD818] to-[#6BBF12] rounded-2xl p-8 h-full flex flex-col justify-between">
            <FallingTags />
            <div>
              <h3 className="text-[22px] font-semibold text-black tracking-[-0.02em] mb-2">
                Everything You Need
              </h3>
              <p className="text-[14px] text-black/60 leading-[1.5]">
                One app for messages, monetization, and mass messaging. Zero platform fees.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Rating card */}
        <ScrollReveal delay={250}>
          <div className="bg-white rounded-2xl p-8 h-full flex flex-col justify-between">
            <div>
              <p className="text-[56px] font-bold text-[#A5F41F] leading-none tracking-[-0.04em]">4.9</p>
              <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} weight="fill" className="text-[#A5F41F]" />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[18px] font-semibold text-black tracking-[-0.02em] mb-2">
                Trusted by <span className="bg-[#A5F41F] text-black px-1.5 rounded">47,000+</span> businesses &amp; creators.
              </h3>
              <div className="flex -space-x-2 mt-2">
                {[1,2,3,4,5].map((n) => (
                  <img key={n} src={`/avatar-${n}.webp`} alt="" className="w-9 h-9 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
