'use client'
import ScrollReveal from './ScrollReveal'
import { useWaitlist } from './WaitlistContext'

export default function CTASection() {
  const showWaitlist = useWaitlist()
  return (
    <section className="py-[180px] px-4 md:px-8 lg:px-10 xl:px-12 bg-[#1A1A1D] sticky top-0 z-[60] rounded-t-[24px] relative overflow-hidden">
      <div className="text-center relative z-10">
        <ScrollReveal>
          <h2 className="font-medium text-white tracking-[-0.045em] leading-[0.95]" style={{ fontSize: 'clamp(48px, 8vw, 100px)' }}>
            Get Tapp&apos;d.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <p className="text-[18px] font-normal text-white leading-[1.5] mt-8 max-w-[420px] mx-auto">
            The messaging app that pays. Every conversation is a potential transaction. Every dollar is yours.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={140}>
          <div className="flex items-center justify-center gap-4 mt-12">
            <button onClick={showWaitlist} className="text-[14px] font-medium text-black px-8 py-4 rounded-lg bg-[#A5F41F] hover:bg-black hover:text-white transition-colors inline-flex items-center gap-2 cursor-pointer">Get Tapp'd <span className="text-[16px]">&#x2197;</span></button>
            <a href="#product" className="text-[14px] font-medium text-black px-8 py-4 rounded-lg border border-black bg-white hover:bg-black hover:text-white transition-colors">See the product</a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
