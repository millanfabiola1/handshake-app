'use client'
import { useEffect, useState, useRef } from 'react'
import ScrollReveal from './ScrollReveal'
import { Lock, CurrencyDollar, Check, Megaphone } from '@phosphor-icons/react'

/* ------------------------------------------------------------------ */
/*  Bubble + card sub-components                                        */
/* ------------------------------------------------------------------ */

function ReceivedBubble({ text }: { text: string }) {
  return (
    <div className="bg-[#F4F4F5] rounded-[20px] rounded-bl-[4px] px-4 py-3 max-w-[260px] shadow-sm">
      <p className="text-[14px] text-[#0A0A0B] leading-[1.4]">{text}</p>
    </div>
  )
}

function SentBubble({ text }: { text: string }) {
  return (
    <div className="bg-[#0A0A0B] rounded-[20px] rounded-br-[4px] px-4 py-3 max-w-[260px] shadow-sm">
      <p className="text-[14px] text-white leading-[1.4]">{text}</p>
    </div>
  )
}

function PaymentCard({ confirmed }: { confirmed: boolean }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-black/6 p-5 w-[240px]">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-full bg-[#A5F41F] flex items-center justify-center shrink-0">
          <CurrencyDollar size={16} weight="bold" className="text-black" />
        </div>
        <div>
          <p className="text-[13px] font-semibold text-[#0A0A0B]">Payment Request</p>
          <p className="text-[11px] text-[#71717A]">0% fee · Instant</p>
        </div>
      </div>
      <p className="text-[36px] font-bold text-[#0A0A0B] tracking-[-0.03em] text-center py-2">$50.00</p>
      <div
        className="mt-2 w-full rounded-xl py-2.5 text-[13px] font-semibold text-center flex items-center justify-center gap-1.5 transition-all duration-500"
        style={{
          backgroundColor: confirmed ? '#A5F41F' : '#0A0A0B',
          color: confirmed ? '#0A0A0B' : '#FFFFFF',
        }}
      >
        {confirmed ? <><Check size={14} weight="bold" /> Delivered</> : 'Tap to pay'}
      </div>
    </div>
  )
}

function LockedContentMini() {
  return (
    <div className="bg-white rounded-2xl px-5 py-4 flex items-center gap-3 shadow-xl border border-black/5 w-[210px]">
      <div className="w-9 h-9 rounded-xl bg-[#A5F41F]/20 flex items-center justify-center shrink-0">
        <Lock size={18} weight="bold" className="text-[#0A0A0B]/70" />
      </div>
      <div>
        <p className="text-[13px] font-semibold text-[#0A0A0B]">Exclusive Drop</p>
        <p className="text-[11px] text-[#71717A]">Unlock for $5.00</p>
      </div>
    </div>
  )
}

function MassTextMini() {
  return (
    <div className="bg-[#0A0A0B] rounded-2xl px-5 py-4 flex items-center gap-3 shadow-xl w-[210px]">
      <div className="w-9 h-9 rounded-xl bg-[#A5F41F]/15 flex items-center justify-center shrink-0">
        <Megaphone size={18} weight="bold" className="text-[#A5F41F]" />
      </div>
      <div>
        <p className="text-[13px] font-semibold text-white">Blast sent</p>
        <p className="text-[11px] text-white/50">247 clients reached</p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Animated element wrapper                                            */
/* ------------------------------------------------------------------ */

function AnimStep({ children, active, pop = false, className = '' }: {
  children: React.ReactNode; active: boolean; pop?: boolean; className?: string
}) {
  return (
    <div
      className={`transition-all ease-out ${className}`}
      style={{
        opacity: active ? 1 : 0,
        transform: active
          ? 'translateY(0) scale(1)'
          : pop ? 'translateY(0) scale(0.75)' : 'translateY(12px) scale(0.97)',
        transitionDuration: pop ? '480ms' : '550ms',
        transitionTimingFunction: pop ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : undefined,
        pointerEvents: active ? 'auto' : 'none',
      }}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main section                                                        */
/* ------------------------------------------------------------------ */

export default function FloatingUI() {
  const [step, setStep] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasStarted) setHasStarted(true) },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return
    const delays = [
      400,  // → 1: Maria msg
      700,  // → 2: your reply
      500,  // → 3: payment card
      900,  // → 4: confirmed
      700,  // → 5: Maria thanks
      600,  // → 6: your reply + locked content
      500,  // → 7: blast sent
    ]
    let current = 0
    let timeout: NodeJS.Timeout
    function advance() {
      if (current >= delays.length) return
      timeout = setTimeout(() => { current++; setStep(current); advance() }, delays[current])
    }
    advance()
    return () => clearTimeout(timeout)
  }, [hasStarted])

  return (
    <div className="relative z-[201]">
      <section
        className="relative sticky top-0 rounded-t-[24px] overflow-hidden pt-10 pb-[100px] lg:pb-[140px]"
        style={{ background: 'linear-gradient(to bottom, #F7F5ED 0%, #F7F5ED 70%, #F4F4F5 100%)' }}
      >
        {/* Background blobs */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#A5F41F] opacity-25 blur-[120px] pointer-events-none" />
        <div className="absolute top-[30%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#A5F41F] opacity-15 blur-[100px] pointer-events-none" />

        <div className="relative z-10 px-4 md:px-8 lg:px-10 xl:px-12">

          {/* Heading */}
          <div className="text-center mb-8 lg:mb-10">
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

          {/* Chat simulation */}
          <div ref={sectionRef} className="flex items-center justify-center gap-8">

            {/* Left feature card — desktop only */}
            <div className="hidden lg:flex flex-col gap-4 items-end">
              <AnimStep active={step >= 6}>
                <LockedContentMini />
              </AnimStep>
            </div>

            {/* ── Chat window ── */}
            <div className="w-full max-w-[380px] bg-white rounded-[28px] shadow-2xl overflow-hidden border border-black/5">

              {/* Contact header */}
              <div className="px-5 py-4 border-b border-black/6 flex items-center gap-3 bg-white">
                <div className="w-10 h-10 rounded-full bg-[#0A0A0B] flex items-center justify-center text-[#A5F41F] text-[13px] font-bold shrink-0">MR</div>
                <div>
                  <p className="text-[14px] font-semibold text-[#0A0A0B]">Maria Rodriguez</p>
                  <p className="text-[11px] text-[#A5F41F]">Online</p>
                </div>
              </div>

              {/* Messages */}
              <div className="px-4 py-5 flex flex-col gap-3 min-h-[360px]">

                {/* Maria: asks to pay */}
                <AnimStep active={step >= 1} className="self-start">
                  <ReceivedBubble text="Hey! Can I pay for Sunday's session? 💅" />
                </AnimStep>

                {/* You: send request */}
                <AnimStep active={step >= 2} className="self-end">
                  <SentBubble text="Yep! Here's the request 👇" />
                </AnimStep>

                {/* Payment card — inline */}
                <AnimStep active={step >= 3} pop className="self-end">
                  <PaymentCard confirmed={step >= 4} />
                </AnimStep>

                {/* Maria: paid + reaction */}
                <AnimStep active={step >= 5} className="self-start">
                  <ReceivedBubble text="Paid! That was instant 🙌" />
                </AnimStep>

                {/* You: zero fees */}
                <AnimStep active={step >= 6} className="self-end">
                  <SentBubble text="Zero fees too — I keep every dollar 😎" />
                </AnimStep>

              </div>
            </div>

            {/* Right feature card — desktop only */}
            <div className="hidden lg:flex flex-col gap-4 items-start">
              <AnimStep active={step >= 7}>
                <MassTextMini />
              </AnimStep>
            </div>

          </div>

        </div>
      </section>
    </div>
  )
}
