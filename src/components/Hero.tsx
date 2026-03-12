'use client'
import { useRef, useEffect } from 'react'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const phone = phoneRef.current
    if (!hero || !phone) return

    let tx = 0, ty = 0, cx = 0, cy = 0
    let rafId: number | null = null

    const loop = () => {
      cx += (tx - cx) * 0.12
      cy += (ty - cy) * 0.12
      phone.style.transform = `perspective(900px) rotateX(${cy}deg) rotateY(${cx}deg)`
      if (Math.abs(tx - cx) + Math.abs(ty - cy) > 0.05) {
        rafId = requestAnimationFrame(loop)
      } else {
        rafId = null
      }
    }

    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width - 0.5) * 10
      ty = -((e.clientY - r.top) / r.height - 0.5) * 7
      if (!rafId) rafId = requestAnimationFrame(loop)
    }

    const onLeave = () => {
      tx = 0
      ty = 0
    }

    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)

    return () => {
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="pt-[100px] pb-20 px-12 bg-white min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Gradient blobs */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: '-80px',
          right: '-100px',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute pointer-events-none z-0"
        style={{
          bottom: '-80px',
          left: '-100px',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0,197,102,0.10) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px_1fr] gap-16 items-center max-w-[1100px] w-full relative z-10">

        {/* Left text */}
        <div className="flex flex-col">
          <span className="text-[#00C566] text-xs font-bold uppercase tracking-widest mb-4">
            THE PLATFORM THAT PAYS
          </span>
          <h1
            className="font-black tracking-tight leading-[1.0] text-[#0D0D0D]"
            style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}
          >
            Where every text<br />
            <em
              className="text-[#00C566] not-italic"
              style={{ fontFamily: 'var(--font-serif-display), Georgia, serif', fontStyle: 'italic' }}
            >
              earns.
            </em>
          </h1>
          <p className="text-[15px] text-[#6B7280] leading-relaxed max-w-[280px] mt-4">
            Handshake is the messaging platform built for the modern economy — where conversations lead to commerce and every connection has real value.
          </p>
          {/* Stat pills */}
          <div className="mt-6 flex gap-3 flex-wrap">
            <span className="bg-[#E8FFF3] text-[#009E52] text-xs font-bold px-3 py-1.5 rounded-full">
              0% platform fee
            </span>
            <span className="bg-[#F3F0FF] text-[#7C3AED] text-xs font-bold px-3 py-1.5 rounded-full">
              P2P + B2B
            </span>
          </div>
        </div>

        {/* Center phone */}
        <div className="flex justify-center" style={{ transformStyle: 'preserve-3d' }}>
          <div
            ref={phoneRef}
            className="bg-[#1C1C1C] border border-[#333] overflow-hidden relative"
            style={{ width: '290px', borderRadius: '44px', willChange: 'transform' }}
          >
            {/* Status bar */}
            <div className="h-11 bg-[#1C1C1C] flex items-center justify-between px-[22px]">
              <span className="text-[15px] font-semibold text-white">9:41</span>
              <div className="flex items-center gap-[6px]">
                {/* Signal */}
                <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                  <rect x="0" y="4" width="3" height="7" rx="1" fill="white" opacity=".3" />
                  <rect x="4.5" y="2.5" width="3" height="8.5" rx="1" fill="white" opacity=".5" />
                  <rect x="9" y="0.5" width="3" height="10.5" rx="1" fill="white" />
                  <rect x="13.5" y="0" width="2.5" height="11" rx="1" fill="white" />
                </svg>
                {/* WiFi */}
                <svg width="15" height="11" viewBox="0 0 15 11" fill="white" opacity=".8">
                  <path d="M7.5 2.2c2.3 0 4.3.9 5.8 2.4l1.4-1.4A9.7 9.7 0 007.5.5 9.7 9.7 0 00.3 3.2l1.4 1.4A8 8 0 017.5 2.2zM7.5 5a5.7 5.7 0 014 1.7l1.4-1.4A7.7 7.7 0 007.5 3.3 7.7 7.7 0 003 5.3l1.4 1.4A5.7 5.7 0 017.5 5zm0 2.8c1 0 1.9.4 2.6 1l-2.6 2.7-2.6-2.6a3.7 3.7 0 012.6-1z" />
                </svg>
                {/* Battery */}
                <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                  <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity=".35" />
                  <rect x="2" y="2" width="16" height="8" rx="2" fill="white" />
                  <path d="M23 4v4a2 2 0 000-4z" fill="white" opacity=".4" />
                </svg>
              </div>
            </div>
            {/* Notch */}
            <div className="w-[100px] h-[10px] bg-black rounded-full mx-auto -mt-1 mb-2" />

            {/* Conversation header */}
            <div className="bg-[#1C1C1C] flex items-center gap-2 px-4 py-2">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #00C566, #009E52)' }}
              >
                A
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-white">Alex Rivera</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C566] animate-pulse-dot" />
                </div>
              </div>
              <span className="bg-[#00C566] text-black text-[9px] font-bold px-2 py-0.5 rounded-full">$ Handshake</span>
            </div>
            <div className="h-px bg-[#2A2A2A]" />

            {/* Message thread */}
            <div className="bg-[#111] px-4 py-3 flex flex-col gap-3">
              {/* Incoming */}
              <div
                className="bg-[#2A2A2A] text-[#CCC] self-start max-w-[80%] px-3 py-2"
                style={{ fontSize: '12.5px', borderRadius: '16px 16px 16px 3px' }}
              >
                Hey! Can I tip you for that advice?
              </div>
              {/* Outgoing */}
              <div
                className="bg-[#00C566] text-black font-semibold self-end max-w-[80%] px-3 py-2"
                style={{ fontSize: '12.5px', borderRadius: '16px 16px 3px 16px' }}
              >
                Of course — tap below
              </div>
              {/* Inline tip card */}
              <div className="bg-[#161616] border border-[#2A2A2A] rounded-[14px] p-3 w-full">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-[#00C566] text-[11px]">$</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#555]">Send a Tip</span>
                </div>
                <div className="flex gap-1.5 mb-2.5">
                  {['$5', '$10', '$25'].map((amt, i) => (
                    <div
                      key={amt}
                      className="flex-1 text-center py-1.5 rounded-full text-[11px] font-bold"
                      style={{
                        background: i === 1 ? '#00C566' : '#222',
                        color: i === 1 ? 'black' : '#888',
                      }}
                    >
                      {amt}
                    </div>
                  ))}
                </div>
                <button className="w-full bg-[#00C566] text-black text-xs font-bold py-2.5 rounded-[10px] border-none cursor-pointer">
                  Send $10 Tip
                </button>
              </div>
              {/* Confirmation */}
              <div
                className="bg-[#2A2A2A] text-[#CCC] self-start px-3 py-2 flex items-center gap-1.5"
                style={{ fontSize: '12.5px', borderRadius: '16px 16px 16px 3px' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" fill="#00C566" />
                  <path d="M7 12l3.5 3.5L17 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Sent! Thanks so much ★
              </div>
            </div>

            {/* Bottom bar */}
            <div className="bg-[#1C1C1C] flex items-center gap-2 px-4 py-3">
              <div className="bg-[#2A2A2A] rounded-full flex-1 h-8 px-3 flex items-center">
                <span className="text-xs text-[#555]">Message...</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#00C566] flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col">
          <span className="uppercase tracking-widest text-xs text-[#9CA3AF] mb-4">WHY HANDSHAKE</span>
          <div className="flex flex-col gap-4">
            {[
              {
                bg: '#E8FFF3',
                iconColor: '#00C566',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                  </svg>
                ),
                title: 'Tips inside every thread',
                desc: 'One-tap payments mid-conversation',
              },
              {
                bg: '#F3F0FF',
                iconColor: '#7C3AED',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                ),
                title: 'Gate content, earn on unlock',
                desc: 'Photos, videos, messages behind paywall',
              },
              {
                bg: '#FFF0F2',
                iconColor: '#FF4F6A',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                ),
                title: 'Paid calls, billed your way',
                desc: 'Per-minute or flat, booked in-thread',
              },
              {
                bg: '#FEF3C7',
                iconColor: '#F59E0B',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                ),
                title: 'Mass messages that feel personal',
                desc: 'Blast your entire client book at once',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: item.bg, color: item.iconColor }}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0D0D0D]">{item.title}</div>
                  <div className="text-[13px] text-[#6B7280] mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col gap-3">
            <a
              href="#"
              className="inline-flex items-center justify-center bg-[#00C566] text-black font-bold h-[52px] px-8 rounded-full self-start hover:bg-[#009E52] transition-colors"
              style={{ fontSize: '15px' }}
            >
              Join the Waitlist →
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center border border-[#EBEBEA] text-[#6B7280] h-[48px] px-6 rounded-full self-start hover:border-[#BBB] hover:text-[#0D0D0D] transition-colors"
              style={{ fontSize: '14px' }}
            >
              See how it works
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
