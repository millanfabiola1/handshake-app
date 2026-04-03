'use client'
import { useRef } from 'react'
import ScrollReveal from './ScrollReveal'
import { useWaitlist } from './WaitlistContext'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const showWaitlist = useWaitlist()
  return (
    <div style={{ height: '200vh' }}>
    <section
      ref={sectionRef}
      className="h-screen flex flex-col justify-center bg-[#A5F41F] relative overflow-hidden sticky top-0 z-[1]"
    >

      <div className="relative z-10 px-4 md:px-8 lg:px-10 xl:px-12 pt-16 pb-20 flex flex-col items-center w-full">
        {/* Text — phone — text */}
        <div className="flex flex-row items-center justify-center gap-3 md:gap-6 lg:gap-12 w-full">
          {/* Left text — rotated on mobile */}
          <h1 className="font-medium text-black leading-[0.85] tracking-[-0.06em] text-center lg:text-right [writing-mode:vertical-rl] lg:[writing-mode:horizontal-tb] rotate-180 lg:rotate-0" style={{ fontSize: 'clamp(36px, 12vw, 140px)', animation: 'hero-text-in-left 1s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
            Tap.<br />Text.
          </h1>

          {/* Center: phone mockup */}
          <ScrollReveal delay={200}>
            <div className="relative w-[clamp(200px,40vw,300px)] lg:w-[clamp(220px,22vw,300px)] shrink-0">
              <div className="relative bg-black rounded-[clamp(28px,5vw,52px)] p-[clamp(6px,1.2vw,14px)] shadow-2xl shadow-black/30">
                <div className="absolute top-[clamp(8px,1.5vw,16px)] left-1/2 -translate-x-1/2 z-20 w-[clamp(60px,14vw,120px)] h-[clamp(18px,3vw,32px)] bg-black rounded-full" />
                <div className="relative rounded-[clamp(20px,4vw,42px)] overflow-hidden bg-white">
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
              <div className="absolute -right-[3px] top-[25%] w-[3px] h-[60px] bg-[#2a2a2a] rounded-r-sm" />
              <div className="absolute -left-[3px] top-[20%] w-[3px] h-[35px] bg-[#2a2a2a] rounded-l-sm" />
              <div className="absolute -left-[3px] top-[30%] w-[3px] h-[55px] bg-[#2a2a2a] rounded-l-sm" />
            </div>
          </ScrollReveal>

          {/* Right text — rotated on mobile */}
          <h1 className="font-medium text-black leading-[0.85] tracking-[-0.06em] text-center lg:text-left [writing-mode:vertical-rl] lg:[writing-mode:horizontal-tb]" style={{ fontSize: 'clamp(36px, 12vw, 140px)', animation: 'hero-text-in-right 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' }}>
            Get<br />Paid.
          </h1>
        </div>

        {/* Bottom: subtext + CTAs */}
        <ScrollReveal delay={150}>
          <p className="font-normal text-black/55 leading-[1.5] max-w-[520px] mt-10 text-center mx-auto" style={{ fontSize: 'clamp(16px, 2vw, 22px)' }}>
            Messages and payments in one app. 0% fees. Keep everything you earn.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={250}>
          <div className="flex items-center justify-center gap-4 mt-10">
            <button onClick={showWaitlist} className="text-[16px] font-semibold text-white px-10 py-5 rounded-full bg-black hover:bg-black/80 transition-colors inline-flex items-center gap-2 cursor-pointer">
              Get Tapp&apos;d
            </button>
            <a href="#product" className="text-[16px] font-semibold text-black px-10 py-5 rounded-full border-2 border-black hover:bg-black hover:text-white transition-all">
              See the product
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
    </div>
  )
}
