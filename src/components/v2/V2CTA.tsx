'use client'
import ScrollReveal from '../ScrollReveal'
import { useWaitlist } from '../WaitlistContext'

export default function V2CTA() {
  const showWaitlist = useWaitlist()

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0A0A0B] relative overflow-hidden px-4 md:px-8">
      {/* Decorative faint phone outlines */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 opacity-[0.04] hidden lg:block">
        <div className="w-[300px] h-[600px] border-2 border-white rounded-[48px]" />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 opacity-[0.04] hidden lg:block">
        <div className="w-[300px] h-[600px] border-2 border-white rounded-[48px]" />
      </div>

      <div className="text-center relative z-10 max-w-[900px]">
        <ScrollReveal>
          <h2 className="font-medium text-white tracking-[-0.05em] leading-[0.85]" style={{ fontSize: 'clamp(56px, 12vw, 160px)' }}>
            Get<br />tappd.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="text-[18px] md:text-[22px] font-normal text-white/40 leading-[1.5] mt-8 md:mt-12 max-w-[480px] mx-auto">
            The messaging app that pays. Every conversation is a potential transaction. Every dollar is yours.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="flex items-center justify-center gap-4 mt-10 md:mt-14 flex-wrap">
            <button onClick={showWaitlist} className="text-[16px] font-semibold text-black px-10 py-5 rounded-full bg-[#A5F41F] hover:bg-[#b8f74d] transition-colors inline-flex items-center gap-2 cursor-pointer">
              Get tappd
            </button>
            <a href="#features" className="text-[16px] font-semibold text-white/60 px-10 py-5 rounded-full border border-white/20 hover:border-white/60 hover:text-white transition-all">
              See the product
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <p className="mono text-[12px] text-white/20 uppercase mt-12 tracking-widest">
            Tap &middot; Text &middot; Get Paid
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
