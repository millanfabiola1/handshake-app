'use client'
import { useEffect, useRef } from 'react'

function lerpClamped(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(1, Math.max(0, t))
}

export default function PhoneShowcase() {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const phoneRef  = useRef<HTMLDivElement>(null)
  const ctaRef    = useRef<HTMLDivElement>(null)
  const bgGlowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onScroll() {
      const el = wrapRef.current
      if (!el) return
      const scrolled = -el.getBoundingClientRect().top
      const total    = el.offsetHeight - window.innerHeight
      const p        = Math.min(1, Math.max(0, scrolled / total))

      /* ── Phone: slides in 0→0.38, holds, fades out 0.58→0.75 ── */
      const phoneIn  = Math.min(1, p / 0.38)
      const phoneOut = Math.min(1, Math.max(0, (p - 0.58) / 0.17))
      if (phoneRef.current) {
        const ty      = lerpClamped(140, 0, phoneIn)
        const scale   = lerpClamped(0.82, lerpClamped(1, 0.76, phoneOut), phoneIn)
        const opacity = Math.max(0, lerpClamped(0, lerpClamped(1, 0, phoneOut * 1.6), phoneIn))
        phoneRef.current.style.transform = `translateY(${ty.toFixed(2)}px) scale(${scale.toFixed(3)})`
        phoneRef.current.style.opacity   = opacity.toFixed(3)
      }

      /* ── CTA layer: fades + slides up 0.68→1 ── */
      const ctaIn = Math.min(1, Math.max(0, (p - 0.68) / 0.24))
      if (ctaRef.current) {
        ctaRef.current.style.opacity        = ctaIn.toFixed(3)
        ctaRef.current.style.transform      = `translateY(${lerpClamped(28, 0, ctaIn).toFixed(2)}px)`
        ctaRef.current.style.pointerEvents  = ctaIn > 0.4 ? 'auto' : 'none'
      }

      if (bgGlowRef.current) {
        bgGlowRef.current.style.opacity = Math.min(1, ctaIn * 1.5).toFixed(3)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={wrapRef} style={{ height: '290vh' }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center" style={{ background: '#060f04' }}>

        {/* Background lime radial glow — appears with CTA */}
        <div
          ref={bgGlowRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0,
            background: 'radial-gradient(ellipse 75% 60% at 50% 52%, rgba(165,244,31,0.09) 0%, transparent 68%)',
          }}
        />
        <div className="absolute inset-0 pointer-events-none noise-texture opacity-30" />

        {/* ── Phone mockup ── */}
        <div
          ref={phoneRef}
          className="absolute"
          style={{ opacity: 0, transform: 'translateY(140px) scale(0.82)' }}
        >
          <div className="relative">
            {/* Outer frame */}
            <div
              className="relative"
              style={{
                width: 'clamp(220px, 22vw, 290px)',
                background: '#0e0e10',
                borderRadius: 52,
                padding: 6,
                boxShadow: '0 0 0 1px rgba(165,244,31,0.18), 0 60px 120px rgba(0,0,0,0.85), inset 0 0 0 1px rgba(255,255,255,0.04)',
              }}
            >
              {/* Side button detail */}
              <div className="absolute right-[-3px] top-[22%] w-[3px] h-[60px] rounded-l-full" style={{ background: '#1a1a1c' }} />
              <div className="absolute right-[-3px] top-[38%] w-[3px] h-[40px] rounded-l-full" style={{ background: '#1a1a1c' }} />
              <div className="absolute left-[-3px] top-[28%] w-[3px] h-[50px] rounded-r-full" style={{ background: '#1a1a1c' }} />

              {/* Screen */}
              <div
                style={{
                  borderRadius: 46,
                  overflow: 'hidden',
                  background: '#000',
                  aspectRatio: '9/19.5',
                  position: 'relative',
                }}
              >
                <video
                  src="/demo.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* Screen top notch bar */}
                <div className="absolute top-0 left-0 right-0 h-[32px] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.4)' }}>
                  <div className="w-[90px] h-[22px] bg-black rounded-full" />
                </div>
              </div>
            </div>

            {/* Ground shadow */}
            <div
              className="absolute pointer-events-none"
              style={{
                bottom: -36,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '70%',
                height: 40,
                background: 'radial-gradient(ellipse, rgba(165,244,31,0.2) 0%, transparent 70%)',
                filter: 'blur(12px)',
              }}
            />

            {/* Floating notification badges */}
            <div
              className="absolute z-10 float-slow"
              style={{ right: '-80px', top: '18%' }}
            >
              <div className="bg-white rounded-[14px] shadow-2xl px-3 py-2.5 flex items-center gap-2 whitespace-nowrap">
                <span className="text-[18px]">💸</span>
                <div>
                  <p className="text-[11px] font-bold text-black leading-none">$47 received</p>
                  <p className="text-[9px] text-black/40 mt-0.5">Just now · 0% fee</p>
                </div>
              </div>
            </div>
            <div
              className="absolute z-10 float-medium"
              style={{ left: '-90px', top: '38%' }}
            >
              <div className="bg-[#A5F41F] rounded-[14px] shadow-xl px-3 py-2 whitespace-nowrap">
                <p className="text-[11px] font-bold text-black">Unlocked! 🔥</p>
                <p className="text-[9px] text-black/50">Exclusive drop</p>
              </div>
            </div>
            <div
              className="absolute z-10 float-slow"
              style={{ left: '-70px', bottom: '20%' }}
            >
              <div className="bg-[#0A0A0B] rounded-full shadow-xl px-3 py-2 flex items-center gap-1.5 whitespace-nowrap">
                <div className="w-[6px] h-[6px] rounded-full bg-[#A5F41F]" />
                <span className="text-[10px] font-semibold text-white">247 reached</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA content ── */}
        <div
          ref={ctaRef}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: 0, transform: 'translateY(28px)', pointerEvents: 'none' }}
        >
          {/* Floating 3D icons */}
          <img src="/site2/cta-dollar.svg" alt="" className="absolute left-[8%] md:left-[12%] top-[14%] w-[100px] md:w-[160px] object-contain -rotate-12 pointer-events-none float-slow" />
          <img src="/site2/cta-star.svg"   alt="" className="absolute right-[8%] md:right-[12%] top-[10%] w-[80px] md:w-[130px] object-contain pointer-events-none float-medium" />
          <img src="/site2/cta-bubble.svg" alt="" className="absolute right-[6%] md:right-[10%] bottom-[12%] w-[100px] md:w-[155px] object-contain -rotate-[10deg] pointer-events-none float-slow" />

          {/* Eyebrow */}
          <p className="mono text-[11px] text-white/30 uppercase tracking-widest mb-5">Available now</p>

          {/* Headline */}
          <h2
            className="font-display font-medium text-white tracking-[-0.045em] leading-[0.92] mb-5"
            style={{ fontSize: 'clamp(44px, 6.5vw, 88px)' }}
          >
            Your phone.<br />
            <span className="text-[#A5F41F]">Your income.</span>
          </h2>

          {/* Sub */}
          <p className="text-[16px] md:text-[18px] text-white/45 max-w-[400px] mb-10 leading-[1.55]">
            Join 47,000+ creators already earning<br className="hidden md:block" /> on every message.
          </p>

          {/* Download buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
            {/* App Store */}
            <a
              href="#"
              className="flex items-center gap-3 bg-white rounded-[18px] px-6 py-4 hover:bg-white/90 transition-colors no-underline group"
              style={{ minWidth: 180 }}
            >
              <svg viewBox="0 0 24 24" width="26" height="26" fill="#000">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <p className="text-[10px] text-black/50 leading-none font-medium">Download on the</p>
                <p className="text-[16px] font-bold text-black leading-tight">App Store</p>
              </div>
            </a>
            {/* Google Play */}
            <a
              href="#"
              className="flex items-center gap-3 border border-white/20 rounded-[18px] px-6 py-4 hover:border-white/40 hover:bg-white/5 transition-all no-underline"
              style={{ minWidth: 180 }}
            >
              <svg viewBox="0 0 24 24" width="26" height="26" fill="#A5F41F">
                <path d="M3.18 23.76c.37.21.8.22 1.2.06l12.12-7-2.47-2.47L3.18 23.76zm-1.15-20.9C1.7 3.27 1.5 3.83 1.5 4.5v15c0 .67.2 1.23.53 1.64l.09.09 8.4-8.4v-.19L2.03 2.86zm17.76 9.7L17 10.79l-2.73 2.73 2.73 2.73 2.8-1.62c.8-.46.8-1.21 0-1.67zm-14.61 8.7l10.98-6.34-2.44-2.44-8.54 8.78z"/>
              </svg>
              <div className="text-left">
                <p className="text-[10px] text-white/40 leading-none font-medium">Get it on</p>
                <p className="text-[16px] font-bold text-white leading-tight">Google Play</p>
              </div>
            </a>
          </div>

          <p className="text-[12px] text-white/20">
            No credit card &bull; Free forever &bull; 0% fees
          </p>
        </div>

      </div>
    </div>
  )
}
