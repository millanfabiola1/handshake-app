'use client'
import { useEffect, useRef, useState } from 'react'
import { useWaitlist } from './WaitlistContext'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const showWaitlist = useWaitlist()
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  // 3D mouse-follow tilt
  useEffect(() => {
    const el = phoneRef.current
    if (!el) return
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (window.innerWidth / 2)
      const dy = (e.clientY - cy) / (window.innerHeight / 2)
      setTilt({
        x: Math.max(-1, Math.min(1, dy)) * -6,
        y: Math.max(-1, Math.min(1, dx)) * 8,
      })
    }
    const handleLeave = () => setTilt({ x: 0, y: 0 })
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  // Glass cards — matching StickyFeatures satellites exactly
  const glassWhite: React.CSSProperties = {
    backgroundImage: 'linear-gradient(62deg, rgba(255,255,255,0.25) 10%, rgba(255,255,255,0.06) 77%)',
    backdropFilter: 'blur(35px)',
    WebkitBackdropFilter: 'blur(35px)',
    border: '1px solid rgba(255,255,255,0.5)',
    boxShadow:
      '0 1.2px 30px 0 rgba(69,42,124,0.1), inset 10px 10px 29px 0 rgba(255,255,255,0.25)',
  }
  const glassGreen: React.CSSProperties = {
    backgroundImage: 'linear-gradient(37deg, rgba(165,244,31,0.6) 8%, rgba(166,245,31,0.08) 100%)',
    backdropFilter: 'blur(35px)',
    WebkitBackdropFilter: 'blur(35px)',
    border: '1px solid rgba(166,245,31,0.5)',
    boxShadow:
      '0 1.2px 30px 0 rgba(69,42,124,0.12), inset 10px 10px 29px 0 rgba(255,255,255,0.35)',
  }
  const glassDark: React.CSSProperties = {
    background: '#000',
    boxShadow: '0 8px 24px 0 rgba(0,0,0,0.25)',
  }

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col overflow-hidden"
      style={{ paddingBottom: '25vh' }}
    >
      {/* Base image — provides varied pixel content so backdrop-filter blur is visible through glass cards */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/hero-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
        aria-hidden
      />

      {/* Animated vibrant gradient mesh (overlays the image) */}
      <div className="hero-gradient-bg" aria-hidden style={{ mixBlendMode: 'soft-light' }}>
        <span />
        <span />
      </div>

      {/* SVG noise overlay */}
      <div className="hero-noise z-[1]" aria-hidden />

      {/* Dot grid overlay — stronger so backdrop-filter blur is visible behind cards */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.16) 2px, transparent 2px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden
      />

      {/* Bottom fade — gradient dissolves to white */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none z-[3]"
        style={{
          height: '40%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.8) 60%, rgba(255,255,255,1) 85%)',
        }}
        aria-hidden
      />


      {/* ── Centered content ─────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-[1360px] mx-auto px-6 lg:px-10 pt-32 lg:pt-36 pb-20">
        {/* Headline */}
        <h1
          className="font-medium text-black leading-[0.9] tracking-[-0.04em] text-center overflow-hidden pb-2"
          style={{ fontSize: 'clamp(56px, 8vw, 120px)' }}
        >
          <span className="hero-word" style={{ animationDelay: '0.15s' }}>Tap.</span>{' '}
          <span className="hero-word" style={{ animationDelay: '0.3s' }}>Text.</span>{' '}
          <span className="hero-word" style={{ animationDelay: '0.45s' }}>Get</span>{' '}
          <span className="hero-word" style={{ animationDelay: '0.57s' }}>Paid.</span>
        </h1>

        {/* Subcopy */}
        <p
          className="font-normal text-black/75 leading-[1.4] text-center mt-5 max-w-[560px]"
          style={{
            fontSize: 'clamp(15px, 1.4vw, 18px)',
            animation: 'hero-fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.9s both',
          }}
        >
          Messages and payments in one app. 0% fees. Keep everything you earn.
        </p>

        {/* CTAs */}
        <div
          className="flex items-center justify-center gap-3 mt-7"
          style={{ animation: 'hero-fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.1s both' }}
        >
          <button
            onClick={showWaitlist}
            className="text-[14px] font-semibold text-white px-8 py-4 rounded-full bg-black hover:bg-black/80 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-[0_2px_20px_rgba(0,0,0,0.2)]"
          >
            Get Tapp&apos;d
          </button>
          <a
            href="#product"
            className="text-[14px] font-semibold text-black px-8 py-4 rounded-full border-2 border-black hover:bg-black hover:text-white transition-all backdrop-blur-sm bg-white/10"
          >
            See the product
          </a>
        </div>

        {/* Phone + floating glass cards composition */}
        <div
          className="relative mt-10 lg:mt-14 mx-auto"
          style={{
            width: 'clamp(260px, 28vw, 360px)',
          }}
        >
          {/* Soft white veil behind composition — gives glass cards a clean backdrop like Section 2 */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              left: '-70%',
              right: '-70%',
              top: '-8%',
              bottom: '-15%',
              background:
                'radial-gradient(ellipse at center, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.55) 35%, rgba(255,255,255,0.2) 65%, rgba(255,255,255,0) 85%)',
              zIndex: 0,
            }}
          />
          {/* Phone — isolated perspective container so it doesn't affect glass siblings */}
          <div
            ref={phoneRef}
            className="relative z-[1]"
            style={{ perspective: 1400 }}
          >
          <div
            className="relative"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform',
              animation: 'hero-phone-in 1.1s cubic-bezier(0.2, 1.2, 0.4, 1) 0.6s both',
            }}
          >
            <div className="relative bg-black rounded-[clamp(34px,3vw,48px)] p-[clamp(8px,0.8vw,12px)] shadow-[0_60px_120px_-30px_rgba(12,28,60,0.5)]">
              <div className="absolute top-[clamp(10px,0.9vw,16px)] left-1/2 -translate-x-1/2 z-20 w-[clamp(70px,7vw,110px)] h-[clamp(20px,1.9vw,28px)] bg-black rounded-full" />
              <div className="relative rounded-[clamp(26px,2.4vw,40px)] overflow-hidden bg-black" style={{ aspectRatio: '9 / 19.5' }}>
                <video src="/demo.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
            <div className="absolute -right-[3px] top-[25%] w-[3px] h-[50px] bg-[#2a2a2a] rounded-r-sm" />
            <div className="absolute -left-[3px] top-[20%] w-[3px] h-[30px] bg-[#2a2a2a] rounded-l-sm" />
            <div className="absolute -left-[3px] top-[30%] w-[3px] h-[45px] bg-[#2a2a2a] rounded-l-sm" />
          </div>
          </div>
          {/* End phone perspective container — glass cards below are OUTSIDE the 3D context */}

          {/* Glass card — "You sent $50" (overlaps phone left side) */}
          <div
            className="absolute hidden md:block z-10"
            style={{
              top: '3%',
              left: '-55%',
              animation: 'glass-in 0.9s cubic-bezier(0.2, 1.2, 0.4, 1) 1.3s both',
            }}
          >
            <div style={{ animation: 'glass-float-1 7s ease-in-out 2.2s infinite' }}>
              <div
                className="rounded-[32px] px-9 py-7 text-center"
                style={{ ...glassGreen, minWidth: 200 }}
              >
                <p className="text-[22px] font-medium text-black/75 mb-1 relative">You sent</p>
                <p className="text-[64px] font-bold text-black leading-none tracking-tight relative">$50</p>
              </div>
            </div>
          </div>

          {/* Glass card — Incoming payment notification (overlaps phone right side) */}
          <div
            className="absolute hidden md:block z-10"
            style={{
              top: '10%',
              right: '-55%',
              animation: 'glass-in 0.9s cubic-bezier(0.2, 1.2, 0.4, 1) 1.5s both',
            }}
          >
            <div style={{ animation: 'glass-float-2 6s ease-in-out 2.4s infinite' }}>
              <div className="rounded-2xl p-4 pr-5 flex items-center gap-3" style={{ ...glassWhite, minWidth: 240 }}>
                <div className="w-11 h-11 rounded-full shrink-0 ring-2 ring-white shadow-lg" style={{ background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)' }} />
                <div className="text-left flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[11px] font-bold text-black/55 uppercase tracking-wider">Incoming</p>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#A5F41F] animate-pulse" />
                  </div>
                  <p className="text-[22px] font-bold text-black leading-tight">+$75 via text</p>
                  <p className="text-[11px] text-black/55">from @maya_k</p>
                </div>
              </div>
            </div>
          </div>

          {/* Glass card — Instant pill (mid-left, small, overlaps phone) */}
          <div
            className="absolute hidden md:block z-10"
            style={{
              top: '44%',
              left: '-25%',
              animation: 'glass-in 0.9s cubic-bezier(0.2, 1.2, 0.4, 1) 1.7s both',
            }}
          >
            <div style={{ animation: 'glass-float-3 8s ease-in-out 2.6s infinite' }}>
              <div className="rounded-full px-5 py-3 flex items-center gap-2" style={glassDark}>
                <span className="text-[#A5F41F] text-base">⚡</span>
                <p className="text-[14px] font-bold text-white tracking-tight">Instant</p>
              </div>
            </div>
          </div>

          {/* Glass card — Text reply with payment attached (mid-right, overlaps phone) */}
          <div
            className="absolute hidden md:block z-10"
            style={{
              top: '38%',
              right: '-55%',
              animation: 'glass-in 0.9s cubic-bezier(0.2, 1.2, 0.4, 1) 1.85s both',
            }}
          >
            <div style={{ animation: 'glass-float-4 7.5s ease-in-out 2.8s infinite' }}>
              <div className="rounded-2xl px-5 py-4" style={{ ...glassWhite, maxWidth: 250 }}>
                <p className="text-[10px] font-bold text-black/55 uppercase tracking-wider mb-1.5">New message</p>
                <p className="text-[15px] text-black font-medium leading-snug">&ldquo;Thanks for dinner! 🍕&rdquo;</p>
                <div
                  className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(165,244,31,0.85)' }}
                >
                  <span className="text-[10px]">💰</span>
                  <span className="text-[12px] font-bold text-black">+$25 attached</span>
                </div>
              </div>
            </div>
          </div>

          {/* Glass card — 0% fees badge (bottom-left, overlaps phone) */}
          <div
            className="absolute hidden md:block z-10"
            style={{
              bottom: '15%',
              left: '-45%',
              animation: 'glass-in 0.9s cubic-bezier(0.2, 1.2, 0.4, 1) 2s both',
            }}
          >
            <div style={{ animation: 'glass-float-2 6.5s ease-in-out 3s infinite' }}>
              <div className="rounded-2xl px-6 py-5" style={glassWhite}>
                <p className="text-[56px] font-bold text-black leading-none tracking-tight">0%</p>
                <p className="text-[11px] font-bold text-black/55 uppercase tracking-wider mt-2">Platform fees</p>
              </div>
            </div>
          </div>

          {/* Glass card — Secure text payment pill (bottom-right, overlaps phone) */}
          <div
            className="absolute hidden md:block z-10"
            style={{
              bottom: '8%',
              right: '-50%',
              animation: 'glass-in 0.9s cubic-bezier(0.2, 1.2, 0.4, 1) 2.15s both',
            }}
          >
            <div style={{ animation: 'glass-float-1 7s ease-in-out 3.2s infinite' }}>
              <div className="rounded-2xl px-5 py-4" style={{ ...glassWhite, minWidth: 230 }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-base">🔒</span>
                  <p className="text-[10px] font-bold text-black/55 uppercase tracking-wider">Secure text</p>
                </div>
                <p className="text-[15px] font-bold text-black leading-tight">End-to-end encrypted</p>
                <p className="text-[11px] text-black/55 mt-1">Pay anyone with a phone number</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
