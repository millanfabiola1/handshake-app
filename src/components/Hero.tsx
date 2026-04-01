'use client'
import { useRef } from 'react'
import ScrollReveal from './ScrollReveal'
import { useWaitlist } from './WaitlistContext'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const showWaitlist = useWaitlist()
  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center bg-[#A5F41F] relative overflow-hidden sticky top-0 z-[1]"
    >
      <div className="px-4 md:px-8 lg:px-10 xl:px-12 pt-24 pb-12 w-full relative z-10 flex flex-col lg:flex-row lg:items-center lg:gap-16">
        {/* Left: content */}
        <div className="flex-1">
          <h1 className="font-medium text-black leading-[0.95] tracking-[-0.05em]" style={{ fontSize: 'clamp(36px, 7vw, 80px)' }}>
            Text like iMessage.<br />
            Earn like a business.
          </h1>

          <ScrollReveal delay={200}>
            <p className="text-[18px] font-normal text-black/60 leading-[1.5] max-w-[460px] mt-10">
              The messaging platform where every conversation can become a transaction.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="flex items-center gap-4 mt-8">
              <button onClick={showWaitlist} className="text-[15px] font-medium text-black px-8 py-4 rounded-lg bg-[#A5F41F] hover:bg-black hover:text-white transition-colors inline-flex items-center gap-2 cursor-pointer">Join the waitlist <span className="text-[16px]">&#x2197;</span></button>
              <a href="#product" className="text-[15px] font-medium text-white px-8 py-4 rounded-lg bg-black hover:bg-transparent hover:text-black hover:border hover:border-black transition-all">See the product</a>
            </div>
          </ScrollReveal>
        </div>

        {/* Right: video */}
        <ScrollReveal delay={400}>
          <div className="flex justify-center mt-12 lg:mt-0">
            <div className="w-[280px] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <video
                src="/demo.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto block"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
