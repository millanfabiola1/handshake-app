'use client'
import { useRef } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import ScrollReveal from './ScrollReveal'
import DotGrid from './DotGrid'
import { useWaitlist } from './WaitlistContext'

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const showWaitlist = useWaitlist()
  return (
    <section ref={sectionRef} className="py-[180px] px-4 md:px-8 lg:px-10 xl:px-12 bg-[#1A1A1D] sticky top-0 z-[9] rounded-t-[24px] relative overflow-hidden">
      <DotGrid sectionRef={sectionRef} color="255, 255, 255" />
      <div className="text-center relative z-10">
        <ScrollReveal>
          <h2 className="font-light text-white tracking-[-0.045em] leading-[0.95]" style={{ fontSize: 'clamp(48px, 8vw, 100px)' }}>
            A handshake seals<br />every deal
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <p className="text-[18px] font-light text-white leading-[1.5] mt-8 max-w-[420px] mx-auto">
            Join the platform that puts money in your pocket. Message, monetize, and move money — all in one place.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={140}>
          <div className="flex items-center justify-center gap-4 mt-12">
            <button onClick={showWaitlist} className="text-[14px] font-medium text-black px-8 py-4 rounded-lg bg-[#39FF78] hover:bg-black hover:text-white transition-colors inline-flex items-center gap-2 cursor-pointer">Get early access <span className="text-[16px]">&#x2197;</span></button>
            <a href="#product" className="text-[14px] font-normal text-black px-8 py-4 rounded-lg border border-black bg-white hover:bg-black hover:text-white transition-colors">See the product</a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
