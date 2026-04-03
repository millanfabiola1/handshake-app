'use client'
import { useRef } from 'react'
import { useWaitlist } from './WaitlistContext'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const showWaitlist = useWaitlist()
  return (
    <div className="relative z-[1]" style={{ height: '200vh' }}>
    <section
      ref={sectionRef}
      className="h-screen flex flex-col justify-center bg-[#A5F41F] relative overflow-hidden sticky top-0"
    >
      <div className="relative z-10 px-4 md:px-8 lg:px-10 xl:px-12 pt-20 pb-8 flex flex-col items-center justify-center w-full h-full">
        {/* Text — gap for phone — text */}
        <div className="flex flex-row items-center justify-center gap-2 md:gap-4 lg:gap-10 w-full flex-1">
          {/* Left text */}
          <h1 className="font-medium text-black leading-[0.85] tracking-[-0.06em] text-center lg:text-right [writing-mode:vertical-rl] lg:[writing-mode:horizontal-tb] lg:rotate-0" style={{ fontSize: 'clamp(56px, 14vw, 120px)', animation: 'hero-text-in-left 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both' }}>
            <span className="lg:hidden">Tap. Text.</span>
            <span className="hidden lg:inline">Tap.<br />Text.</span>
          </h1>

          {/* Center gap for fixed phone — mobile: show inline phone */}
          <div className="lg:hidden" style={{ animation: 'hero-phone-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
            <div className="relative w-[clamp(200px,50vw,280px)] shrink-0">
              <div className="relative bg-black rounded-[clamp(28px,6vw,44px)] p-[clamp(6px,1.5vw,12px)] shadow-2xl shadow-black/30">
                <div className="absolute top-[clamp(8px,1.5vw,14px)] left-1/2 -translate-x-1/2 z-20 w-[clamp(60px,15vw,100px)] h-[clamp(18px,3vw,28px)] bg-black rounded-full" />
                <div className="relative rounded-[clamp(22px,5vw,36px)] overflow-hidden bg-black" style={{ aspectRatio: '9 / 19.5' }}>
                  <video
                    src="/demo.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: invisible spacer matching phone width */}
          <div className="hidden lg:block w-[clamp(180px,20vw,280px)] shrink-0" />

          {/* Right text */}
          <h1 className="font-medium text-black leading-[0.85] tracking-[-0.06em] text-center lg:text-left [writing-mode:vertical-rl] lg:[writing-mode:horizontal-tb]" style={{ fontSize: 'clamp(56px, 14vw, 120px)', animation: 'hero-text-in-right 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both' }}>
            <span className="lg:hidden">Get Paid.</span>
            <span className="hidden lg:inline">Get<br />Paid.</span>
          </h1>
        </div>

        {/* Bottom: subtext + CTAs */}
        <div className="mt-auto">
          <p className="font-normal text-black/55 leading-[1.4] max-w-[480px] text-center mx-auto" style={{ fontSize: 'clamp(14px, 1.6vw, 18px)', animation: 'hero-fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.4s both' }}>
            Messages and payments in one app. 0% fees. Keep everything you earn.
          </p>

          <div className="flex items-center justify-center gap-3 mt-6" style={{ animation: 'hero-fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.6s both' }}>
            <button onClick={showWaitlist} className="text-[14px] font-semibold text-white px-8 py-4 rounded-full bg-black hover:bg-black/80 transition-colors inline-flex items-center gap-2 cursor-pointer">
              Get Tapp&apos;d
            </button>
            <a href="#product" className="text-[14px] font-semibold text-black px-8 py-4 rounded-full border-2 border-black hover:bg-black hover:text-white transition-all">
              See the product
            </a>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
