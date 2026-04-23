'use client'
import { useEffect, useRef, useState, useCallback } from 'react'

const feeItems = [
  { stat: '3%',    name: 'Venmo charges 3%',       line1: '"Low fees."',                               line2: 'Keep looking.',   isTappd: false },
  { stat: '2.9%',  name: 'PayPal charges 2.9%',    line1: '"Competitive rates."',                      line2: 'Still not zero.', isTappd: false },
  { stat: '2.75%', name: 'Cash App charges 2.75%', line1: '"Industry standard."',                      line2: 'Not even close.', isTappd: false },
  { stat: '0%',    name: 'tappd charges 0%',        line1: 'Not "low fees." Not "competitive rates."',  line2: 'Zero. Forever.',  isTappd: true  },
]

function lc(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(1, Math.max(0, t))
}
function parseVal(s: string) { return parseFloat(s.replace('%', '')) }

/* ── Animated fee counter ── */
function FeeCounter() {
  const [active, setActive]   = useState(0)
  const [pillKey, setPillKey] = useState(0)
  const [dispVal, setDispVal] = useState(3)
  const rafRef   = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const fromRef  = useRef(3)
  const toRef    = useRef(3)
  const containerRef = useRef<HTMLDivElement>(null)
  const isVisible = useRef(false)
  const activeRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const animateTo = useCallback((from: number, to: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    fromRef.current = from; toRef.current = to; startRef.current = null
    const dur = 700
    function frame(ts: number) {
      if (!startRef.current) startRef.current = ts
      const t = Math.min((ts - startRef.current) / dur, 1)
      const e = t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2
      setDispVal(fromRef.current + (toRef.current - fromRef.current) * e)
      if (t < 1) rafRef.current = requestAnimationFrame(frame)
    }
    rafRef.current = requestAnimationFrame(frame)
  }, [])

  const goTo = useCallback((next: number) => {
    const prev = activeRef.current
    if (prev === next) return
    activeRef.current = next
    animateTo(parseVal(feeItems[prev].stat), parseVal(feeItems[next].stat))
    setActive(next)
    setPillKey((k) => k + 1)
  }, [animateTo])

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      if (!isVisible.current) return
      goTo((activeRef.current + 1) % feeItems.length)
    }, 2800)
  }, [goTo])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible.current = entry.isIntersecting },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [startTimer])

  const fmt = (v: number) => v.toFixed(2).replace(/\.?0+$/, '')
  const CAP_H = 120

  return (
    <div ref={containerRef} className="max-w-[900px] mx-auto text-center select-none w-full px-4 md:px-6">
      <div style={{ height: 'clamp(120px,22vh,220px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p
          className="font-display leading-none tracking-[-0.04em] text-[#A5F41F]"
          style={{ fontSize: 'clamp(96px,22vw,210px)', textShadow: '0 0 80px rgba(165,244,31,0.4), 0 4px 40px rgba(0,0,0,0.8)' }}
        >
          {fmt(dispVal)}%
        </p>
      </div>
      <div style={{ height: CAP_H, overflow: 'hidden', position: 'relative', marginTop: '1rem' }}>
        <div style={{ transform: `translateY(${-active * CAP_H}px)`, transition: 'transform 650ms cubic-bezier(0.4,0,0.2,1)' }}>
          {feeItems.map((item) => (
            <div key={item.name} style={{ height: CAP_H, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'4px' }}>
              <p className="text-[clamp(16px,2.2vw,24px)] text-white leading-[1.2]">{item.line1}</p>
              <p className="font-display text-[clamp(26px,4vw,42px)] font-medium text-white leading-[1.1] tracking-[-0.02em]">{item.line2}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
        {feeItems.map((f, i) => (
          <button
            key={active === i ? `active-${pillKey}-${i}` : f.name}
            onClick={() => { goTo(i); startTimer() }}
            className={`rounded-full px-5 py-2 text-[13px] font-medium cursor-pointer ${
              active === i ? 'bg-[#A5F41F] text-black' : 'border border-white/25 text-white/60 hover:border-white/50 hover:text-white/90 transition-all duration-300'
            }`}
            style={active === i ? { animation: 'pill-pop 400ms cubic-bezier(0.34,1.56,0.64,1) both' } : {}}
          >{f.name}</button>
        ))}
      </div>
      <p className="text-[13px] text-white/35 mt-8 tracking-wide">Keep every dollar you earn. No hidden costs. Ever.</p>
    </div>
  )
}

/* ── Main section ── */
export default function EndJourney({ zeroFeesBg: _zeroFeesBg }: { zeroFeesBg?: string }) {
  const phoneWrapRef  = useRef<HTMLDivElement>(null)
  const phoneRef      = useRef<HTMLDivElement>(null)
  const ctaTextRef    = useRef<HTMLDivElement>(null)
  const ctaButtonsRef = useRef<HTMLDivElement>(null)
  const iconsRef      = useRef<HTMLDivElement>(null)
  const glowRef       = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onScroll() {
      const el = phoneWrapRef.current
      if (!el) return
      const scrolled = -el.getBoundingClientRect().top
      const total    = el.offsetHeight - window.innerHeight
      const p        = Math.min(1, Math.max(0, scrolled / total))

      /* CTA text + buttons + icons 0.20→0.60 */
      const ctaIn   = lc(0, 1, (p - 0.20) / 0.40)

      const phoneShift = lc(0, 44, ctaIn)
      if (phoneRef.current) {
        phoneRef.current.style.transform = `translate(-50%, calc(-50% + ${phoneShift.toFixed(1)}px))`
      }

      if (ctaTextRef.current) {
        ctaTextRef.current.style.opacity       = ctaIn.toFixed(3)
        ctaTextRef.current.style.transform     = `scale(${lc(0.93, 1, ctaIn).toFixed(4)})`
        ctaTextRef.current.style.pointerEvents = ctaIn > 0.5 ? 'auto' : 'none'
      }

      if (ctaButtonsRef.current) {
        ctaButtonsRef.current.style.opacity       = ctaIn.toFixed(3)
        ctaButtonsRef.current.style.transform     = `scale(${lc(0.93, 1, ctaIn).toFixed(4)})`
        ctaButtonsRef.current.style.pointerEvents = ctaIn > 0.5 ? 'auto' : 'none'
      }

      if (iconsRef.current) iconsRef.current.style.opacity = ctaIn.toFixed(3)
      if (glowRef.current)  glowRef.current.style.opacity  = Math.min(1, ctaIn * 1.5).toFixed(3)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── Stats — normal scroll, no sticky ── */}
      <div
        className="flex items-center justify-center py-24 overflow-hidden"
        style={{
          background: '#000',
          backgroundImage: 'url(/end-gradient.png)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 pointer-events-none noise-texture opacity-20" style={{ position: 'relative' }} />
        <FeeCounter />
      </div>

      {/* ── Phone + CTA — sticky scroll ── */}
      <div ref={phoneWrapRef} style={{ height: '300vh' }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden" style={{ background: '#060b04' }}>

          {/* Lime glow */}
          <div ref={glowRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0, background: 'radial-gradient(ellipse 65% 55% at 50% 55%, rgba(165,244,31,0.07) 0%, transparent 65%)' }} />
          <div className="absolute inset-0 pointer-events-none noise-texture opacity-20" />

          {/* Phone */}
          <div
            ref={phoneRef}
            className="absolute"
            style={{
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 1,
              zIndex: 10,
              WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 92%)',
              maskImage: 'linear-gradient(to bottom, black 55%, transparent 92%)',
            }}
          >
            <div className="relative">
              <div style={{
                width: 'clamp(155px, 38vw, 255px)',
                borderRadius: 50,
                overflow: 'hidden',
                aspectRatio: '9/19.5',
                position: 'relative',
                boxShadow: '0 0 0 1px rgba(165,244,31,0.22), 0 50px 120px rgba(0,0,0,0.9)',
              }}>
                <video src="/demo.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="absolute pointer-events-none" style={{ bottom:-28, left:'50%', transform:'translateX(-50%)', width:'65%', height:30, background:'radial-gradient(ellipse, rgba(165,244,31,0.28) 0%, transparent 70%)', filter:'blur(10px)' }} />
            </div>
          </div>

          {/* Top dark scrim — keeps CTA text legible over phone video */}
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{
              height: 'clamp(220px, 32vh, 340px)',
              background: 'linear-gradient(to bottom, rgba(6,11,4,0.92) 0%, rgba(6,11,4,0.72) 55%, rgba(6,11,4,0) 100%)',
              zIndex: 10,
            }}
          />

          {/* CTA headline — pinned to top */}
          <div
            ref={ctaTextRef}
            className="absolute top-0 left-0 right-0 flex flex-col items-center text-center pointer-events-none"
            style={{ paddingTop: 'clamp(36px, 7vh, 72px)', opacity: 0, transform: 'scale(0.93)', zIndex: 11 }}
          >
            <p className="mono text-[11px] text-white/50 uppercase tracking-widest mb-4">Available now</p>
            <h2
              className="font-display font-medium text-white tracking-[-0.045em] leading-[0.92] px-4"
              style={{ fontSize: 'clamp(28px, 4.5vw, 66px)', textShadow: '0 2px 24px rgba(0,0,0,0.6)' }}
            >
              Your phone. <span className="text-[#A5F41F]">Your income.</span>
            </h2>
            <p className="text-[clamp(13px,1.4vw,15px)] text-white/60 mt-3 leading-[1.55] px-6" style={{ maxWidth: 340, textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}>
              47,000+ creators already in. Every text earns.
            </p>
          </div>

          {/* Download buttons — pinned to bottom */}
          <div
            ref={ctaButtonsRef}
            className="absolute bottom-0 left-0 right-0 flex flex-col items-center pointer-events-none"
            style={{ paddingBottom: 'clamp(32px, 6vh, 64px)', opacity: 0, transform: 'scale(0.93)', zIndex: 11 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <a href="#" className="flex items-center gap-2.5 bg-white rounded-[14px] px-5 py-3 hover:bg-white/90 transition-colors no-underline">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#000">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <p className="text-[9px] text-black/50 leading-none font-medium">Download on the</p>
                  <p className="text-[13px] font-bold text-black leading-tight">App Store</p>
                </div>
              </a>
              <a href="#" className="flex items-center gap-2.5 border border-white/20 rounded-[14px] px-5 py-3 hover:border-white/40 hover:bg-white/5 transition-all no-underline">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#A5F41F">
                  <path d="M3.18 23.76c.37.21.8.22 1.2.06l12.12-7-2.47-2.47L3.18 23.76zm-1.15-20.9C1.7 3.27 1.5 3.83 1.5 4.5v15c0 .67.2 1.23.53 1.64l.09.09 8.4-8.4v-.19L2.03 2.86zm17.76 9.7L17 10.79l-2.73 2.73 2.73 2.73 2.8-1.62c.8-.46.8-1.21 0-1.67zm-14.61 8.7l10.98-6.34-2.44-2.44-8.54 8.78z"/>
                </svg>
                <div className="text-left">
                  <p className="text-[9px] text-white/40 leading-none font-medium">Get it on</p>
                  <p className="text-[13px] font-bold text-white leading-tight">Google Play</p>
                </div>
              </a>
            </div>
            <p className="text-[11px] text-white/25">No credit card &bull; Free forever &bull; 0% fees</p>
          </div>

          {/* 3D icons */}
          <div ref={iconsRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0, zIndex: 10 }}>
            <img src="/site2/cta-dollar.png" alt="" className="absolute object-contain -rotate-12 float-slow"      style={{ right: 'calc(50% + clamp(75px, 17vw, 125px))', top: '38%', width: 'clamp(110px, 20vw, 180px)' }} />
            <img src="/site2/cta-star.png"   alt="" className="absolute object-contain float-medium"               style={{ left: 'calc(50% + clamp(75px, 17vw, 125px))', top: '22%', width: 'clamp(95px, 17vw, 155px)' }} />
            <img src="/site2/cta-bubble.png" alt="" className="absolute object-contain -rotate-[10deg] float-slow" style={{ left: 'calc(50% + clamp(75px, 17vw, 125px))', bottom: '24%', width: 'clamp(100px, 18vw, 160px)' }} />
          </div>

        </div>
      </div>
    </>
  )
}
