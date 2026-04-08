'use client'
import { useEffect, useState, useRef } from 'react'
import ScrollReveal from './ScrollReveal'
import { Lock, Play, CurrencyDollar, Check, PaperPlaneTilt, Megaphone } from '@phosphor-icons/react'

/* ------------------------------------------------------------------ */
/*  Card sub-components                                                */
/* ------------------------------------------------------------------ */

function ReceivedBubble({ text }: { text: string }) {
  return (
    <div className="bg-[#F4F4F5] rounded-[20px] rounded-bl-[4px] px-4 py-3 max-w-[340px] shadow-md hover:scale-[1.04] hover:-rotate-1 transition-transform duration-300 cursor-default">
      <p className="text-[14px] text-[#0A0A0B] leading-[1.4]">{text}</p>
    </div>
  )
}

function SentBubble({ text }: { text: string }) {
  return (
    <div className="bg-[#0A0A0B] rounded-[20px] rounded-br-[4px] px-4 py-3 max-w-[340px] shadow-lg hover:scale-[1.04] hover:rotate-1 transition-transform duration-300 cursor-default">
      <p className="text-[14px] text-white leading-[1.4]">{text}</p>
    </div>
  )
}

function PaymentSent({ amount, confirmed }: { amount: string; confirmed: boolean }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 w-[300px]">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-[#A5F41F] flex items-center justify-center">
          <CurrencyDollar size={20} weight="bold" className="text-black" />
        </div>
        <div>
          <p className="text-[14px] font-semibold text-[#0A0A0B]">Payment Sent</p>
          <p className="text-[11px] text-[#71717A]">Instant transfer</p>
        </div>
      </div>
      <div className="text-center py-4">
        <p className="text-[40px] font-bold text-[#0A0A0B] tracking-[-0.03em]">{amount}</p>
        <p className="text-[12px] text-[#71717A] mt-1">0% fee</p>
      </div>
      <div
        className="mt-3 w-full rounded-xl py-3 text-[14px] font-semibold text-center transition-all duration-300 flex items-center justify-center gap-2"
        style={{
          backgroundColor: confirmed ? '#A5F41F' : '#0A0A0B',
          color: confirmed ? '#0A0A0B' : '#FFFFFF',
        }}
      >
        {confirmed ? (
          <><Check size={16} weight="bold" /> Delivered</>
        ) : (
          'Sending...'
        )}
      </div>
    </div>
  )
}

function LockedContentMini() {
  return (
    <div className="bg-gradient-to-br from-[#A5F41F]/20 to-[#A5F41F]/10 rounded-xl px-4 py-3 flex items-center gap-3 shadow-md hover:scale-[1.04] transition-transform duration-300 cursor-default">
      <Lock size={18} weight="bold" className="text-[#0A0A0B]/60" />
      <div>
        <p className="text-[13px] font-semibold text-[#0A0A0B]">Exclusive Drop</p>
        <p className="text-[11px] text-[#71717A]">Unlock for $5.00</p>
      </div>
    </div>
  )
}

function MassTextMini() {
  return (
    <div className="bg-[#0A0A0B] rounded-xl px-4 py-3 flex items-center gap-3 shadow-lg hover:scale-[1.04] transition-transform duration-300 cursor-default">
      <Megaphone size={18} weight="bold" className="text-[#A5F41F]" />
      <div>
        <p className="text-[13px] font-semibold text-white">Blast sent</p>
        <p className="text-[11px] text-white/50">247 clients reached</p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Animated element wrapper                                           */
/* ------------------------------------------------------------------ */

function AnimStep({ children, active, pop = false, className = '' }: { children: React.ReactNode; active: boolean; pop?: boolean; className?: string }) {
  return (
    <div
      className={`transition-all ease-out ${className}`}
      style={{
        opacity: active ? 1 : 0,
        transform: active
          ? 'translateY(0) scale(1)'
          : pop
            ? 'translateY(0) scale(0.7)'
            : 'translateY(16px) scale(0.97)',
        transitionDuration: pop ? '500ms' : '600ms',
        transitionTimingFunction: pop ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : undefined,
        pointerEvents: active ? 'auto' : 'none',
      }}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main section                                                       */
/* ------------------------------------------------------------------ */

export default function FloatingUI() {
  const [step, setStep] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) setHasStarted(true)
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    const delays = [
      300,   // → 1: friend msg
      600,   // → 2: reply
      500,   // → 3: payment card (pop)
      900,   // → 4: confirmed
      700,   // → 5: thank you
      600,   // → 6: locked content mini
      500,   // → 7: mass text mini
    ]

    let current = 0
    let timeout: NodeJS.Timeout

    function advance() {
      if (current >= delays.length) return
      timeout = setTimeout(() => {
        current++
        setStep(current)
        advance()
      }, delays[current])
    }

    advance()
    return () => clearTimeout(timeout)
  }, [hasStarted])

  return (
    <div className="relative z-[201]">
      <section className="relative sticky top-0 rounded-t-[24px] overflow-hidden py-[100px] lg:py-[140px]" style={{ background: 'linear-gradient(to bottom, #F7F5ED 0%, #F7F5ED 70%, #F4F4F5 100%)' }}>

        {/* Background gradient blobs */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#A5F41F] opacity-25 blur-[120px] pointer-events-none" />
        <div className="absolute top-[30%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#A5F41F] opacity-15 blur-[100px] pointer-events-none" />

        <div className="relative z-10 px-4 md:px-8 lg:px-10 xl:px-12">

          {/* Heading */}
          <div className="text-center mb-14 lg:mb-20">
            <ScrollReveal>
              <p className="mono text-[13px] text-[#71717A] uppercase mb-4">Send Money Instantly</p>
              <h2
                className="font-medium text-[#0A0A0B] tracking-[-0.045em] leading-[0.95] max-w-[600px] mx-auto"
                style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
              >
                Pay friends in<br />
                <span className="text-[#A5F41F]">one tap</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <p className="text-[15px] lg:text-[17px] text-[#71717A] max-w-[440px] mx-auto mt-5 leading-[1.5]">
                Send money mid-conversation. No links, no apps, no fees. Just tap and it&apos;s there.
              </p>
            </ScrollReveal>
          </div>

          {/* Conversation simulation */}
          <div ref={sectionRef} className="max-w-[1100px] mx-auto">

            {/* Mobile: stacked */}
            <div className="lg:hidden flex flex-col items-center gap-4">
              <AnimStep active={step >= 0} pop className="self-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0A0A0B] flex items-center justify-center text-[#A5F41F] text-[14px] font-semibold">MR</div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#0A0A0B]">Maria Rodriguez</p>
                    <p className="text-[11px] text-[#A5F41F]">Online</p>
                  </div>
                </div>
              </AnimStep>
              <AnimStep active={step >= 1} className="self-start"><ReceivedBubble text="Hey can you send me that $50 for dinner last night?" /></AnimStep>
              <AnimStep active={step >= 2} className="self-end"><SentBubble text="Yeah one sec, sending now" /></AnimStep>
              <AnimStep active={step >= 3} pop><PaymentSent amount="$50.00" confirmed={step >= 4} /></AnimStep>
              <AnimStep active={step >= 5} className="self-start"><ReceivedBubble text="Got it instantly! Love this app 🙌" /></AnimStep>
              <AnimStep active={step >= 6} className="self-start"><LockedContentMini /></AnimStep>
              <AnimStep active={step >= 7} className="self-end"><MassTextMini /></AnimStep>
            </div>

            {/* Desktop: 3-column */}
            <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-10 lg:items-center">

              {/* LEFT — Friend's messages */}
              <div className="flex flex-col gap-4 items-start justify-center">
                <AnimStep active={step >= 0} pop>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0A0A0B] flex items-center justify-center text-[#A5F41F] text-[14px] font-semibold hover:scale-110 transition-transform duration-300">MR</div>
                    <div>
                      <p className="text-[14px] font-semibold text-[#0A0A0B]">Maria Rodriguez</p>
                      <p className="text-[11px] text-[#A5F41F]">Online</p>
                    </div>
                  </div>
                </AnimStep>

                <AnimStep active={step >= 1}>
                  <ReceivedBubble text="Hey can you send me that $50 for dinner last night?" />
                </AnimStep>

                <AnimStep active={step >= 5}>
                  <ReceivedBubble text="Got it instantly! Love this app 🙌" />
                </AnimStep>

                <AnimStep active={step >= 6}>
                  <LockedContentMini />
                </AnimStep>
              </div>

              {/* CENTER — Payment card */}
              <div className="flex items-center justify-center">
                <AnimStep active={step >= 3} pop>
                  <PaymentSent amount="$50.00" confirmed={step >= 4} />
                </AnimStep>
              </div>

              {/* RIGHT — User's messages */}
              <div className="flex flex-col gap-4 items-end justify-center">
                <AnimStep active={step >= 2}>
                  <SentBubble text="Yeah one sec, sending now" />
                </AnimStep>

                <AnimStep active={step >= 5}>
                  <SentBubble text="No fees either 😎" />
                </AnimStep>

                <AnimStep active={step >= 7}>
                  <MassTextMini />
                </AnimStep>
              </div>

            </div>

          </div>

        </div>
      </section>
    </div>
  )
}
