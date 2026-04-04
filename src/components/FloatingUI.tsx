'use client'
import ScrollReveal from './ScrollReveal'
import { Lock, Play, CurrencyDollar, Image, Microphone, PaperPlaneTilt } from '@phosphor-icons/react'

/* ------------------------------------------------------------------ */
/*  Card sub-components                                                */
/* ------------------------------------------------------------------ */

function ChatListCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 w-[260px] lg:w-[300px] hover:scale-[1.03] transition-transform duration-300">
      <p className="text-[20px] font-bold text-[#0A0A0B] mb-3">Chats</p>
      <div className="flex items-center gap-3 pb-3 border-b border-[#E4E4E7]">
        <div className="w-10 h-10 rounded-full bg-[#0A0A0B] shrink-0 flex items-center justify-center text-[#A5F41F] text-[14px] font-semibold">JC</div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-baseline">
            <span className="text-[13px] font-semibold text-[#0A0A0B]">Jordan Carter</span>
            <span className="text-[11px] font-medium text-[#A5F41F]">Now</span>
          </div>
          <p className="text-[11px] text-[#71717A] truncate">Just dropped something exclusive...</p>
        </div>
      </div>
      <div className="flex items-center gap-3 pt-3">
        <div className="w-10 h-10 rounded-full bg-[#0A0A0B] shrink-0 flex items-center justify-center text-[#A5F41F] text-[14px] font-semibold">MR</div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-baseline">
            <span className="text-[13px] font-semibold text-[#0A0A0B]">Maria Rodriguez</span>
            <span className="text-[11px] font-medium text-[#71717A]">2h</span>
          </div>
          <p className="text-[11px] text-[#71717A] truncate">Thanks for the quick response!</p>
        </div>
      </div>
    </div>
  )
}

function ReceivedBubble({ text }: { text: string }) {
  return (
    <div className="bg-[#F4F4F5] rounded-[20px] rounded-bl-[4px] px-4 py-3 max-w-[300px] shadow-md hover:scale-[1.03] transition-transform duration-300">
      <p className="text-[13px] text-[#0A0A0B] leading-[1.4]">{text}</p>
    </div>
  )
}

function SentBubble({ text }: { text: string }) {
  return (
    <div className="bg-[#0A0A0B] rounded-[20px] rounded-br-[4px] px-4 py-3 max-w-[300px] shadow-lg hover:scale-[1.03] transition-transform duration-300">
      <p className="text-[13px] text-white leading-[1.4]">{text}</p>
    </div>
  )
}

function LockedContentCard() {
  return (
    <div className="w-[240px] rounded-2xl overflow-hidden shadow-lg hover:scale-[1.03] transition-transform duration-300" style={{ background: 'linear-gradient(135deg, rgba(139,100,255,0.35), rgba(80,140,255,0.35))' }}>
      <div className="backdrop-blur-md p-6 flex flex-col items-center gap-2 rounded-2xl">
        <div className="w-11 h-11 rounded-full bg-white/30 flex items-center justify-center">
          <Lock size={20} weight="bold" className="text-white/80" />
        </div>
        <p className="text-[15px] font-semibold text-white/90">Exclusive Content</p>
        <p className="text-[11px] text-white/60">1 image</p>
        <button className="mt-2 w-full bg-white rounded-xl py-2.5 text-[13px] font-semibold text-[#0A0A0B]">
          Unlock for $4.00
        </button>
      </div>
    </div>
  )
}

function TipBadge() {
  return (
    <div className="bg-[#A5F41F] rounded-full px-4 py-2 shadow-md inline-flex items-center gap-1.5 hover:scale-[1.05] transition-transform duration-300">
      <span className="text-[14px]">💰</span>
      <span className="text-[13px] font-semibold text-[#0A0A0B]">Tipped $25</span>
    </div>
  )
}

function PaymentSheet() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-5 w-[240px] lg:w-[270px] hover:scale-[1.03] transition-transform duration-300">
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
      <button className="mt-4 w-full bg-[#0A0A0B] text-white rounded-lg py-2.5 text-[13px] font-semibold">
        Purchase
      </button>
    </div>
  )
}

function VoiceMessage() {
  const bars = [8, 14, 20, 12, 18, 24, 10, 16, 22, 8, 14, 20, 16, 10, 18, 24, 12, 8]
  return (
    <div className="bg-[#F4F4F5] rounded-full px-3 py-2.5 flex items-center gap-2.5 shadow-md border border-[#E4E4E7] hover:scale-[1.03] transition-transform duration-300">
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

function InputBar() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#E4E4E7] p-3 w-[320px] lg:w-[360px] hover:scale-[1.02] transition-transform duration-300">
      <p className="text-[13px] text-[#A1A1AA] mb-2 pl-1">Type a message</p>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {[CurrencyDollar, Image, Microphone].map((Icon, i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-[#F4F4F5] border border-[#E4E4E7] flex items-center justify-center">
              <Icon size={16} weight="regular" className="text-[#71717A]" />
            </div>
          ))}
        </div>
        <div className="w-9 h-9 rounded-full bg-[#0A0A0B] flex items-center justify-center">
          <PaperPlaneTilt size={16} weight="fill" className="text-[#A5F41F]" />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main section — structured layout, no idle motion                   */
/* ------------------------------------------------------------------ */

export default function FloatingUI() {
  return (
    <div className="relative z-[58]">
      <section className="relative bg-[#F7F5ED] sticky top-0 rounded-t-[24px] overflow-hidden py-[100px] lg:py-[140px]">

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

          {/* Desktop: 3-column structured layout */}
          <div className="hidden lg:grid grid-cols-3 gap-6 max-w-[1200px] mx-auto items-start">

            {/* LEFT COLUMN — Chat & Messages */}
            <div className="flex flex-col gap-5">
              <ScrollReveal>
                <div style={{ transform: 'rotate(-2deg)' }}>
                  <ChatListCard />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <div style={{ transform: 'rotate(1deg)' }} className="ml-4">
                  <ReceivedBubble text="Premium plans include priority support and additional tools" />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={250}>
                <div style={{ transform: 'rotate(-1deg)' }} className="ml-12">
                  <SentBubble text="That sounds great! Sign me up" />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={350}>
                <div className="ml-6">
                  <VoiceMessage />
                </div>
              </ScrollReveal>
            </div>

            {/* CENTER COLUMN — Locked Content + Tip */}
            <div className="flex flex-col items-center gap-5 pt-8">
              <ScrollReveal delay={100}>
                <div style={{ transform: 'rotate(2deg)' }}>
                  <LockedContentCard />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div style={{ transform: 'rotate(-3deg)' }}>
                  <TipBadge />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <div style={{ transform: 'rotate(1deg)' }}>
                  <InputBar />
                </div>
              </ScrollReveal>
            </div>

            {/* RIGHT COLUMN — Payment */}
            <div className="flex flex-col items-end gap-5 pt-4">
              <ScrollReveal delay={180}>
                <div style={{ transform: 'rotate(2.5deg)' }}>
                  <PaymentSheet />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={280}>
                <div style={{ transform: 'rotate(-1.5deg)' }} className="mr-8">
                  <ReceivedBubble text="You're welcome! Anything else?" />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={380}>
                <div style={{ transform: 'rotate(2deg)' }} className="mr-4">
                  <SentBubble text="Thanks for your help! 🔥" />
                </div>
              </ScrollReveal>
            </div>

          </div>

          {/* Mobile/Tablet: stacked layout */}
          <div className="lg:hidden flex flex-col items-center gap-6 max-w-[340px] mx-auto">
            <ScrollReveal>
              <div style={{ transform: 'rotate(-1deg)' }}>
                <ChatListCard />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div style={{ transform: 'rotate(1deg)' }}>
                <ReceivedBubble text="Premium plans include priority support" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div style={{ transform: 'rotate(2deg)' }}>
                <LockedContentCard />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div style={{ transform: 'rotate(-1deg)' }}>
                <SentBubble text="That sounds great! Sign me up" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={250}>
              <div style={{ transform: 'rotate(-2deg)' }}>
                <TipBadge />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div style={{ transform: 'rotate(1.5deg)' }}>
                <PaymentSheet />
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>
    </div>
  )
}
