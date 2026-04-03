'use client'
import { useWaitlist } from '../WaitlistContext'
import ScrollReveal from '../ScrollReveal'

export default function V2Hero() {
  const showWaitlist = useWaitlist()

  return (
    <section className="min-h-screen flex flex-col justify-center bg-[#A5F41F] relative overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-[#b8f74d] opacity-40 -top-20 -left-20" style={{ animation: 'v2-drift 20s ease-in-out infinite' }} />
        <div className="absolute w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-[#c4fa6a] opacity-30 top-1/3 -right-10" style={{ animation: 'v2-drift 25s ease-in-out infinite reverse' }} />
        <div className="absolute w-[150px] h-[150px] md:w-[300px] md:h-[300px] rounded-full bg-[#b0f230] opacity-35 bottom-10 left-1/3" style={{ animation: 'v2-drift 18s ease-in-out infinite 3s' }} />
      </div>

      <div className="relative z-10 px-4 md:px-8 lg:px-10 xl:px-12 pt-16 pb-20 flex flex-col items-center w-full">
        {/* Middle: text — phone — text */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 w-full">
          {/* Left text */}
          <h1 className="font-medium text-black leading-[0.85] tracking-[-0.06em] text-center lg:text-right" style={{ fontSize: 'clamp(56px, 12vw, 140px)', animation: 'hero-text-in-left 1s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
            Tap.<br />Text.
          </h1>

          {/* Center: phone mockup */}
          <ScrollReveal delay={200}>
            <div className="relative w-[clamp(220px,22vw,300px)] shrink-0">
              <div className="relative bg-black rounded-[clamp(32px,4vw,52px)] p-[clamp(8px,1vw,14px)] shadow-2xl shadow-black/30">
                <div className="absolute top-[clamp(10px,1.2vw,16px)] left-1/2 -translate-x-1/2 z-20 w-[clamp(80px,10vw,120px)] h-[clamp(22px,2.5vw,32px)] bg-black rounded-full" />
                <div className="relative rounded-[clamp(24px,3.2vw,42px)] overflow-hidden bg-white">
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

          {/* Right text */}
          <h1 className="font-medium text-black leading-[0.85] tracking-[-0.06em] text-center lg:text-left" style={{ fontSize: 'clamp(56px, 12vw, 140px)', animation: 'hero-text-in-right 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' }}>
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
            <a href="#features" className="text-[16px] font-semibold text-black px-10 py-5 rounded-full border-2 border-black hover:bg-black hover:text-white transition-all">
              See the product
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
