'use client'
import { ArrowRight } from '@phosphor-icons/react'
import ScrollReveal from './ScrollReveal'

export default function CTASection() {
  return (
    <section className="py-[180px] px-4 md:px-8 lg:px-10 xl:px-12 bg-[#1A1A1D] relative overflow-hidden sticky top-0 z-[7] rounded-t-[24px]">
      <div className="text-center relative z-10">
        <ScrollReveal>
          <h2 className="font-light text-white tracking-[-0.045em] leading-[0.95]" style={{ fontSize: 'clamp(44px, 7vw, 80px)' }}>
            A handshake seals<br />every deal
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <p className="text-[18px] font-light text-[#71717A] leading-[1.5] mt-8 max-w-[420px] mx-auto">
            Join the platform that puts money in your pocket. Message, monetize, and move money — all in one place.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={140}>
          <div className="flex items-center justify-center gap-4 mt-12">
            <a href="#" className="text-[14px] font-medium text-black px-8 py-4 rounded-lg bg-[#39FF78] hover:bg-[#2DE86A] transition-colors inline-flex items-center gap-2">Get early access <ArrowRight size={16} weight="bold" /></a>
            <a href="#product" className="text-[14px] font-light text-black px-8 py-4 rounded-lg border border-white/20 hover:border-white/40 bg-white hover:bg-white/90 transition-colors">See the product</a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
