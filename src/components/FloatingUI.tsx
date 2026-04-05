'use client'
import { useEffect, useState, useRef } from 'react'
import ScrollReveal from './ScrollReveal'
import { Lock, Play, CurrencyDollar, Image, Microphone, PaperPlaneTilt, Check } from '@phosphor-icons/react'

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

function LockedContentCard({ pressing }: { pressing: boolean }) {
  return (
    <div className="w-[320px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300" style={{ background: 'linear-gradient(135deg, rgba(139,100,255,0.35), rgba(80,140,255,0.35))' }}>
      <div className="backdrop-blur-md p-8 flex flex-col items-center gap-3 rounded-2xl">
        <div className="w-14 h-14 rounded-full bg-white/30 flex items-center justify-center">
          <Lock size={24} weight="bold" className="text-white/80" />
        </div>
        <p className="text-[18px] font-semibold text-white/90">Exclusive Content</p>
        <p className="text-[12px] text-white/60">1 image</p>
        <div
          className="mt-3 w-full bg-white rounded-xl py-3 text-[14px] font-semibold text-[#0A0A0B] text-center transition-transform duration-150"
          style={{ transform: pressing ? 'scale(0.93)' : 'scale(1)' }}
        >
          Unlock for $4.00
        </div>
      </div>
    </div>
  )
}

function PaymentSheet({ confirmed }: { confirmed: boolean }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 w-[320px]">
      <div className="flex justify-between items-start mb-3">
        <p className="text-[16px] font-semibold text-[#0A0A0B]">Unlock Content</p>
        <span className="text-[14px] text-[#71717A]">✕</span>
      </div>
      <div className="flex justify-between items-baseline mb-4">
        <span className="text-[12px] text-[#71717A]">Total (includes tax)</span>
        <span className="text-[16px] font-bold text-[#0A0A0B]">$5.00</span>
      </div>
      <div className="border-t border-[#E4E4E7] pt-3 space-y-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-4 h-4 rounded-full border-[1.5px] border-[#D4D4D8]" />
          <span className="text-[13px] text-[#0A0A0B]"> Apple Pay</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-4 h-4 rounded-full bg-[#0A0A0B] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
          <span className="text-[13px] text-[#0A0A0B]">•••• 4242</span>
        </div>
      </div>
      <div
        className="mt-4 w-full rounded-lg py-2.5 text-[13px] font-semibold text-center transition-all duration-300 flex items-center justify-center gap-2"
        style={{
          backgroundColor: confirmed ? '#A5F41F' : '#0A0A0B',
          color: confirmed ? '#0A0A0B' : '#FFFFFF',
          transform: confirmed ? 'scale(0.97)' : 'scale(1)',
        }}
      >
        {confirmed ? (
          <>
            <Check size={16} weight="bold" />
            Purchased
          </>
        ) : (
          'Purchase'
        )}
      </div>
      {confirmed && (
        <p className="text-[11px] text-[#71717A] text-center mt-2">
          Content unlocked instantly
        </p>
      )}
    </div>
  )
}

function TipBadge() {
  return (
    <div className="bg-[#A5F41F] rounded-full px-5 py-2.5 shadow-md inline-flex items-center gap-2 hover:scale-[1.08] hover:-rotate-2 transition-transform duration-300 cursor-default">
      <span className="text-[15px]">💰</span>
      <span className="text-[14px] font-semibold text-[#0A0A0B]">Tipped $25</span>
    </div>
  )
}

function VoiceMessage() {
  const bars = [8, 14, 20, 12, 18, 24, 10, 16, 22, 8, 14, 20, 16, 10, 18, 24, 12, 8]
  return (
    <div className="bg-[#F4F4F5] rounded-full px-3 py-2.5 flex items-center gap-2.5 shadow-md border border-[#E4E4E7] hover:scale-[1.04] transition-transform duration-300 cursor-default">
      <div className="w-8 h-8 rounded-full bg-[#A5F41F] flex items-center justify-center shrink-0">
        <Play size={14} weight="fill" className="text-[#0A0A0B] ml-0.5" />
      </div>
      <div className="flex items-center gap-[3px] h-6">
        {bars.map((h, i) => (
          <div key={i} className="w-[2.5px] rounded-full bg-[#71717A]/40" style={{ height: h }} />
        ))}
      </div>
      <span className="text-[12px] font-medium text-[#71717A] ml-1">0:42</span>
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
      200,   // → 1: creator msg
      700,   // → 2: locked content (pop)
      600,   // → 3: fan reply
      800,   // → 4: button press
      300,   // → 5: crossfade to payment
      800,   // → 6: purchase confirmed
      600,   // → 7: tip badge
      600,   // → 8: voice message
      500,   // → 9: fan final reply
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

  const showLocked = step >= 2 && step < 5
  const showPayment = step >= 5
  const buttonPressing = step === 4
  const purchaseConfirmed = step >= 6

  return (
    <div className="relative z-[58]">
      <section className="relative sticky top-0 rounded-t-[24px] overflow-hidden py-[100px] lg:py-[140px]" style={{ background: 'linear-gradient(to bottom, #F7F5ED 0%, #F7F5ED 70%, #F4F4F5 100%)' }}>

        {/* Background gradient blobs */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#A5F41F] opacity-25 blur-[120px] pointer-events-none" />
        <div className="absolute top-[30%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#A5F41F] opacity-15 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-5%] left-[30%] w-[350px] h-[350px] rounded-full bg-[#A5F41F] opacity-10 blur-[80px] pointer-events-none" />

        <div className="relative z-10 px-4 md:px-8 lg:px-10 xl:px-12">

          {/* Heading */}
          <div className="text-center mb-14 lg:mb-20">
            <ScrollReveal>
              <p className="mono text-[13px] text-[#71717A] uppercase mb-4">The Platform</p>
              <h2
                className="font-medium text-[#0A0A0B] tracking-[-0.045em] leading-[0.95] max-w-[600px] mx-auto"
                style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
              >
                Everything in<br />
                <span className="text-[#A5F41F]">One Thread</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <p className="text-[15px] lg:text-[17px] text-[#71717A] max-w-[440px] mx-auto mt-5 leading-[1.5]">
                Messages, payments, content, and calls — all in the same conversation.
              </p>
            </ScrollReveal>
          </div>

          {/* Conversation simulation */}
          <div ref={sectionRef} className="max-w-[1100px] mx-auto">

            {/* Mobile: stacked */}
            <div className="lg:hidden flex flex-col items-center gap-4">
              <AnimStep active={step >= 0} pop className="self-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0A0A0B] flex items-center justify-center text-[#A5F41F] text-[14px] font-semibold hover:scale-110 transition-transform duration-300">JC</div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#0A0A0B]">Jordan Carter</p>
                    <p className="text-[11px] text-[#A5F41F]">Online</p>
                  </div>
                </div>
              </AnimStep>
              <AnimStep active={step >= 1} className="self-start"><ReceivedBubble text="Just dropped something exclusive for you 👀" /></AnimStep>
              <AnimStep active={step >= 2} pop>
                <div className="relative" style={{ minHeight: 300, width: 320 }}>
                  <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out" style={{ opacity: showLocked ? 1 : 0, transform: showLocked ? 'scale(1)' : 'scale(0.95)', pointerEvents: showLocked ? 'auto' : 'none' }}>
                    <LockedContentCard pressing={buttonPressing} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out" style={{ opacity: showPayment ? 1 : 0, transform: showPayment ? 'scale(1)' : 'scale(0.95) translateY(8px)', pointerEvents: showPayment ? 'auto' : 'none' }}>
                    <PaymentSheet confirmed={purchaseConfirmed} />
                  </div>
                </div>
              </AnimStep>
              <AnimStep active={step >= 3} className="self-end"><SentBubble text="This looks amazing! Let me unlock it" /></AnimStep>
              <AnimStep active={step >= 7} className="self-end"><TipBadge /></AnimStep>
              <AnimStep active={step >= 8} className="self-start"><VoiceMessage /></AnimStep>
              <AnimStep active={step >= 9} className="self-end"><SentBubble text="Thanks for the exclusive! 🔥" /></AnimStep>
            </div>

            {/* Desktop: 3-column — left msgs | center modal | right msgs */}
            <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-10 lg:items-center">

              {/* LEFT — Jordan's messages */}
              <div className="flex flex-col gap-4 items-start justify-center">
                <AnimStep active={step >= 0} pop>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0A0A0B] flex items-center justify-center text-[#A5F41F] text-[14px] font-semibold hover:scale-110 transition-transform duration-300">JC</div>
                    <div>
                      <p className="text-[14px] font-semibold text-[#0A0A0B]">Jordan Carter</p>
                      <p className="text-[11px] text-[#A5F41F]">Online</p>
                    </div>
                  </div>
                </AnimStep>

                <AnimStep active={step >= 1}>
                  <ReceivedBubble text="Just dropped something exclusive for you 👀" />
                </AnimStep>

                <AnimStep active={step >= 8}>
                  <VoiceMessage />
                </AnimStep>
              </div>

              {/* CENTER — Locked content / Payment sheet */}
              <div className="flex items-center justify-center">
                <AnimStep active={step >= 2} pop>
                  <div className="relative flex items-center justify-center" style={{ minHeight: 360, width: 320 }}>
                    <div
                      className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out"
                      style={{
                        opacity: showLocked ? 1 : 0,
                        transform: showLocked ? 'scale(1)' : 'scale(0.95)',
                        pointerEvents: showLocked ? 'auto' : 'none',
                      }}
                    >
                      <LockedContentCard pressing={buttonPressing} />
                    </div>
                    <div
                      className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out"
                      style={{
                        opacity: showPayment ? 1 : 0,
                        transform: showPayment ? 'scale(1)' : 'scale(0.95) translateY(8px)',
                        pointerEvents: showPayment ? 'auto' : 'none',
                      }}
                    >
                      <PaymentSheet confirmed={purchaseConfirmed} />
                    </div>
                  </div>
                </AnimStep>
              </div>

              {/* RIGHT — User's messages */}
              <div className="flex flex-col gap-4 items-end justify-center">
                <AnimStep active={step >= 3}>
                  <SentBubble text="This looks amazing! Let me unlock it" />
                </AnimStep>

                <AnimStep active={step >= 7}>
                  <TipBadge />
                </AnimStep>

                <AnimStep active={step >= 9}>
                  <SentBubble text="Thanks for the exclusive! 🔥" />
                </AnimStep>
              </div>

            </div>

          </div>

        </div>
      </section>
    </div>
  )
}
