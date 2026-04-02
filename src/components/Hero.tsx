'use client'
import { useRef } from 'react'
import dynamic from 'next/dynamic'
import ScrollReveal from './ScrollReveal'
import { useWaitlist } from './WaitlistContext'

const IPhoneScene = dynamic(() => import('./IPhoneScene'), { ssr: false })

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
        <div className="flex-1 text-center lg:text-left">
          <h1 className="font-medium text-black leading-[0.95] tracking-[-0.05em]" style={{ fontSize: 'clamp(36px, 7vw, 80px)' }}>
            Tap. Text.<br />
            Get Paid.
          </h1>

          <ScrollReveal delay={200}>
            <p className="font-normal text-black/60 leading-[1.5] max-w-[460px] mt-[clamp(24px,3vw,40px)] mx-auto lg:mx-0" style={{ fontSize: 'clamp(14px, 1.8vw, 18px)' }}>
              Messages and payments in one app. 0% fees. Keep everything you earn.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="flex items-center justify-center lg:justify-start gap-4 mt-[clamp(20px,2.5vw,32px)]">
              <button onClick={showWaitlist} className="text-[clamp(13px,1.4vw,15px)] font-medium text-black px-6 md:px-8 py-3 md:py-4 rounded-lg bg-[#A5F41F] hover:bg-black hover:text-white transition-colors inline-flex items-center gap-2 cursor-pointer">Tapp Me In <span className="text-[16px]">&#x2197;</span></button>
              <a href="#product" className="text-[clamp(13px,1.4vw,15px)] font-medium text-white px-6 md:px-8 py-3 md:py-4 rounded-lg bg-black hover:bg-transparent hover:text-black hover:border hover:border-black transition-all">See the product</a>
            </div>
          </ScrollReveal>
        </div>

        {/* Right: 3D iPhone (desktop) / flat video (mobile) */}
        <div className="mt-12 lg:mt-0 lg:mr-24 xl:mr-40">
          {/* Mobile fallback */}
          <ScrollReveal delay={400}>
            <div className="flex justify-center lg:hidden">
              <div className="w-[clamp(220px,50vw,280px)] rounded-[2.5rem] overflow-hidden shadow-2xl">
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

          {/* Desktop: 3D iPhone */}
          <div className="hidden lg:block w-[clamp(280px,28vw,400px)]" style={{ aspectRatio: '9 / 19' }}>
            <IPhoneScene />
          </div>
        </div>
      </div>
    </section>
  )
}
