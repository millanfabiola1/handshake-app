'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useWaitlist } from '@/components/WaitlistContext'
import WaitlistProvider from '@/components/WaitlistContext'
import MarqueeBanner from '@/components/MarqueeBanner'
import FloatingUI from '@/components/FloatingUI'
import BentoGrid from '@/components/BentoGrid'
import EndJourney from '@/components/EndJourney'
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import { Check, ArrowLeft, ArrowRight } from '@phosphor-icons/react'

/* ────────────── local assets ────────────── */
const assets = {
  heroBackground: '/site2/hero-bg.jpg',
  heroPhoto: '/site2/hero-photo.jpg',
  phoneMockup: '/site2/phone-mockup.png',
  avatar1: '/site2/avatar1.jpg',
  avatar2: '/site2/avatar2.jpg',
  photo1: '/site2/photo1.jpg',
  photo2: '/site2/photo2.jpg',
  lockedContentBg: '/site2/locked-bg.jpg',
  contentCard: '/site2/content-card.png',
  zeroFeesBg: '/site2/zero-fees-bg.jpg',
}

/* ────────────── Tappd SVG Logo ────────────── */
function TappdLogo({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 464 143" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Tapp'd">
      <g clipPath="url(#s2-clip)">
        <path d="M90.0219 109.708V36.9541C90.0219 33.3164 86.2629 30.867 82.9405 32.3463L41.5921 50.6803C39.7733 51.4806 38.585 53.2994 38.585 55.288V128.042C38.585 131.679 42.3439 134.129 45.6663 132.65L87.0147 114.316C88.8336 113.515 90.0219 111.696 90.0219 109.708Z" fill="currentColor"/>
        <path d="M30.6546 50.1242V96.9292C30.6546 98.9178 29.4905 100.737 27.6474 101.537L7.08234 110.655C3.75992 112.135 0.000976562 109.685 0.000976562 106.048V33.2939C0.000976562 31.3053 1.16504 29.4864 3.00813 28.6861L44.3565 10.3522C47.6789 8.87288 51.4379 11.3223 51.4379 14.9599V34.3609C51.4379 36.3495 50.2738 38.1684 48.4307 38.9687L33.6375 45.5165C31.8186 46.3168 30.6303 48.1356 30.6303 50.1242H30.6546Z" fill="currentColor"/>
      </g>
      <path d="M174.566 112.438C160.536 112.438 155.02 104.404 155.02 90.8535V60.635H146.506L146.746 49.2431H151.303C156.939 48.8833 159.217 46.7249 159.817 41.4486L160.896 34.4936H169.77V48.5236H185.958V60.9947H169.77V90.134C169.77 96.7294 173.367 98.648 178.044 98.648C180.802 98.648 183.8 98.0484 186.198 96.3696V110.52C181.641 112.078 177.684 112.438 174.566 112.438ZM209.59 112.678C199.277 112.678 191.363 107.042 191.363 95.4103C191.363 78.982 207.311 76.7036 219.663 74.785C229.616 73.346 232.493 72.6265 232.493 68.1896C232.493 62.6736 228.656 58.8363 221.461 58.8363C214.746 58.8363 207.911 62.1939 206.832 70.8278L193.281 67.71C195.56 53.0804 207.431 46.8448 221.581 46.8448C240.288 46.8448 247.363 57.2774 247.363 73.9455V85.4574C247.483 93.7315 247.723 102.845 248.322 111.119H234.892C234.532 105.963 234.292 100.447 234.172 94.451H232.613C229.975 104.524 221.701 112.678 209.59 112.678ZM215.346 101.406C222.181 101.406 230.095 96.4895 232.733 85.8171L232.613 80.0612C223.74 84.1383 206.232 81.6201 206.232 93.1319C206.232 98.2883 209.949 101.406 215.346 101.406ZM258.712 130.066V77.7828V48.5236H271.782L271.423 66.5108L273.101 66.6307C275.62 53.56 282.695 46.8448 293.967 46.8448C309.915 46.8448 319.389 59.3159 319.389 79.8214C319.389 99.9671 310.275 112.678 294.686 112.678C282.455 112.678 276.099 104.884 273.341 92.5323H271.423C272.742 99.9671 273.941 107.282 273.941 113.398V130.066H258.712ZM289.65 100.207C298.643 100.207 303.68 91.8129 303.68 79.9413C303.68 67.8299 298.404 59.7956 289.53 59.7956C279.337 59.7956 273.821 69.8684 273.821 78.982V80.6608C273.821 89.1747 279.337 100.207 289.65 100.207ZM328.684 130.066V77.7828V48.5236H341.755L341.395 66.5108L343.074 66.6307C345.592 53.56 352.667 46.8448 363.939 46.8448C379.888 46.8448 389.361 59.3159 389.361 79.8214C389.361 99.9671 380.247 112.678 364.658 112.678C352.427 112.678 346.072 104.884 343.313 92.5323H341.395C342.714 99.9671 343.913 107.282 343.913 113.398V130.066H328.684ZM359.622 100.207C368.616 100.207 373.652 91.8129 373.652 79.9413C373.652 67.8299 368.376 59.7956 359.502 59.7956C349.309 59.7956 343.793 69.8684 343.793 78.982V80.6608C343.793 89.1747 349.309 100.207 359.622 100.207ZM421.2 112.678C406.211 112.678 395.898 100.687 395.898 79.5815C395.898 59.7956 404.892 46.9647 420.6 46.9647C432.952 46.9647 439.307 54.6393 442.065 67.9498H443.984C442.665 59.6757 441.466 51.7613 441.466 46.1253V26.819H456.695V111.119H443.624L443.984 92.4124H442.185C439.307 105.843 432.592 112.678 421.2 112.678ZM425.877 100.207C436.189 100.207 441.466 89.5345 441.466 80.7807V79.1019C441.466 70.8278 436.189 59.5558 425.877 59.5558C416.763 59.5558 411.607 68.0697 411.607 80.0612C411.607 92.0527 417.003 100.207 425.877 100.207Z" fill="currentColor"/>
      <defs><clipPath id="s2-clip"><rect width="90.0206" height="123.172" fill="white" transform="translate(0 9.91406)"/></clipPath></defs>
    </svg>
  )
}

/* ────────────── Tappd Icon only ────────────── */
function TappdIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 91 134" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#s2-icon)">
        <path d="M90.0219 109.708V36.9541C90.0219 33.3164 86.2629 30.867 82.9405 32.3463L41.5921 50.6803C39.7733 51.4806 38.585 53.2994 38.585 55.288V128.042C38.585 131.679 42.3439 134.129 45.6663 132.65L87.0147 114.316C88.8336 113.515 90.0219 111.696 90.0219 109.708Z" fill="currentColor"/>
        <path d="M30.6546 50.1242V96.9292C30.6546 98.9178 29.4905 100.737 27.6474 101.537L7.08234 110.655C3.75992 112.135 0.000976562 109.685 0.000976562 106.048V33.2939C0.000976562 31.3053 1.16504 29.4864 3.00813 28.6861L44.3565 10.3522C47.6789 8.87288 51.4379 11.3223 51.4379 14.9599V34.3609C51.4379 36.3495 50.2738 38.1684 48.4307 38.9687L33.6375 45.5165C31.8186 46.3168 30.6303 48.1356 30.6303 50.1242H30.6546Z" fill="currentColor"/>
      </g>
      <defs><clipPath id="s2-icon"><rect width="90.0206" height="123.172" fill="white" transform="translate(0 9.91406)"/></clipPath></defs>
    </svg>
  )
}

/* ────────────── Checkmark list item ────────────── */
function CheckItem({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${dark ? 'bg-black' : 'bg-[#A5F41F]'}`}>
        <Check size={12} weight="bold" className={dark ? 'text-white' : 'text-black'} />
      </div>
      <span className="text-[16px] text-black/70">{children}</span>
    </div>
  )
}

/* ────────────── Use case data ────────────── */
const useCases = [
  { label: 'CREATORS & INDEPENDENTS', title: 'Tips. Locked drops.\nKeep 100%.', desc: 'Every DM is a potential payday. Every follower is a potential revenue source.', stat: '47%', statLabel: 'HIGHER CONVERSION', photo: '/site2/photo-glamour.jpg' },
  { label: 'HOME SERVICES', title: 'Quote, confirm, collect', desc: 'Your clients already text you. Now those texts make you money.', stat: '3x', statLabel: 'FASTER COLLECTIONS', photo: '/site2/photo1.jpg' },
  { label: 'PSYCHICS & COACHES', title: 'Lock premium readings', desc: 'Charge per message. Lock premium sessions. Schedule paid calls. One app does it all.', stat: '$120', statLabel: 'AVG SESSION REVENUE', photo: '/site2/photo-chill.jpg' },
  { label: 'SECURITY & SERVICE', title: 'Coordinate and\ninvoice instantly', desc: 'Ditch the invoicing software. Bill clients the second the job is done.', stat: '90%', statLabel: 'FASTER PAYMENTS', photo: '/site2/photo2.jpg' },
]

/* ────────────── Fee slideshow ────────────── */
const feeItems = [
  { stat: '3%',    name: 'Venmo charges 3%',       line1: '\u201cLow fees.\u201d',                                              line2: 'Keep looking.',   isTappd: false },
  { stat: '2.9%',  name: 'PayPal charges 2.9%',    line1: '\u201cCompetitive rates.\u201d',                                     line2: 'Still not zero.', isTappd: false },
  { stat: '2.75%', name: 'Cash App charges 2.75%', line1: '\u201cIndustry standard.\u201d',                                     line2: 'Not even close.', isTappd: false },
  { stat: '0%',    name: 'Tappd charges 0%',        line1: 'Not \u201clow fees.\u201d Not \u201ccompetitive rates.\u201d',       line2: 'Zero. Forever.',  isTappd: true  },
]

function FeeSlideshow() {
  const [active, setActive] = useState(0)
  const [pillKey, setPillKey] = useState(0)
  // Animated counter value (float, e.g. 2.94 during animation between 3 and 2.9)
  const [displayedVal, setDisplayedVal] = useState(3)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const fromRef = useRef(3)
  const toRef = useRef(3)

  const parseVal = (stat: string) => parseFloat(stat.replace('%', ''))

  const animateTo = useCallback((from: number, to: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    fromRef.current = from
    toRef.current = to
    startRef.current = null
    const duration = 700

    function frame(ts: number) {
      if (!startRef.current) startRef.current = ts
      const t = Math.min((ts - startRef.current) / duration, 1)
      // ease-in-out cubic
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      setDisplayedVal(fromRef.current + (toRef.current - fromRef.current) * eased)
      if (t < 1) rafRef.current = requestAnimationFrame(frame)
    }
    rafRef.current = requestAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % feeItems.length
        animateTo(parseVal(feeItems[prev].stat), parseVal(feeItems[next].stat))
        setPillKey((k) => k + 1)
        return next
      })
    }, 2800)
    return () => {
      clearInterval(timer)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [animateTo])

  // Format: trim trailing zeros — "3.00" → "3", "2.90" → "2.9", "2.75" → "2.75"
  const formatVal = (v: number) => v.toFixed(2).replace(/\.?0+$/, '')

  const CAP_H = 120

  return (
    <div className="max-w-[900px] mx-auto text-center select-none">

      {/* ── Animated counter ── */}
      <div style={{ height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p
          className="font-display leading-none tracking-[-0.04em] text-[#A5F41F]"
          style={{ fontSize: 'clamp(130px, 17vw, 210px)', textShadow: '0 0 80px rgba(165,244,31,0.4), 0 4px 40px rgba(0,0,0,0.8)' }}
        >
          {formatVal(displayedVal)}%
        </p>
      </div>

      {/* ── Caption slot machine ── */}
      <div style={{ height: CAP_H, overflow: 'hidden', position: 'relative', marginTop: '1rem' }}>
        <div style={{ transform: `translateY(${-active * CAP_H}px)`, transition: 'transform 650ms cubic-bezier(0.4,0,0.2,1)' }}>
          {feeItems.map((item) => (
            <div key={item.name} style={{ height: CAP_H, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <p className="text-[clamp(15px,1.8vw,24px)] text-white leading-[1.2]">{item.line1}</p>
              <p className="font-display text-[clamp(22px,3vw,42px)] font-medium text-white leading-[1.1] tracking-[-0.02em]">{item.line2}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Pills with pop animation on active ── */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
        {feeItems.map((f, i) => (
          <button
            key={active === i ? `active-${pillKey}-${i}` : f.name}
            onClick={() => {
              const fromVal = parseVal(feeItems[active].stat)
              animateTo(fromVal, parseVal(f.stat))
              setActive(i)
              setPillKey((k) => k + 1)
            }}
            className={`rounded-full px-5 py-2 text-[13px] font-medium cursor-pointer ${
              active === i
                ? 'bg-[#A5F41F] text-black'
                : 'border border-white/25 text-white/60 hover:border-white/50 hover:text-white/90 transition-all duration-300'
            }`}
            style={active === i ? { animation: 'pill-pop 400ms cubic-bezier(0.34,1.56,0.64,1) both' } : {}}
          >
            {f.name}
          </button>
        ))}
      </div>

      <p className="text-[13px] text-white/35 mt-8 tracking-wide">
        Keep every dollar you earn. No hidden costs. Ever.
      </p>
    </div>
  )
}

/* ────────────── Globe orbit ring ────────────── */
const ORBIT_ITEMS_DATA = [
  { radius: 232, offsetDeg: 270 },
  { radius: 228, offsetDeg: 330 },
  { radius: 244, offsetDeg: 38  },
  { radius: 232, offsetDeg: 108 },
  { radius: 240, offsetDeg: 158 },
  { radius: 254, offsetDeg: 188 },
  { radius: 244, offsetDeg: 226 },
]

function GlobeOrbitRing() {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let raf: number
    const DURATION_MS = 52000
    let startTime: number | null = null
    const items = ORBIT_ITEMS_DATA

    function frame(ts: number) {
      if (!startTime) startTime = ts
      const baseAngle = ((ts - startTime) / DURATION_MS) * 2 * Math.PI
      items.forEach((item, i) => {
        const el = refs.current[i]
        if (!el) return
        const a = baseAngle + (item.offsetDeg * Math.PI) / 180
        el.style.left = `calc(50% + ${(Math.cos(a) * item.radius).toFixed(2)}px)`
        el.style.top  = `calc(50% + ${(Math.sin(a) * item.radius).toFixed(2)}px)`
      })
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])

  const setRef = (i: number) => (el: HTMLDivElement | null) => { refs.current[i] = el }

  return (
    <>
      {/* CAD */}
      <div ref={setRef(0)} className="absolute z-10" style={{ transform: 'translate(-50%,-50%)' }}>
        <div className="bg-black/65 backdrop-blur rounded-full px-3 py-2 flex items-center gap-1.5 whitespace-nowrap shadow-md">
          <span className="text-[13px]">🇨🇦</span><span className="text-[12px] font-bold text-white">$130</span><span className="text-[9px] text-gray-400 ml-0.5">CAD</span>
        </div>
      </div>
      {/* JPY */}
      <div ref={setRef(1)} className="absolute z-10" style={{ transform: 'translate(-50%,-50%)' }}>
        <div className="bg-black/65 backdrop-blur rounded-full px-3 py-2 flex items-center gap-1.5 whitespace-nowrap shadow-md">
          <span className="text-[13px]">🇯🇵</span><span className="text-[12px] font-bold text-white">¥13,500</span><span className="text-[9px] text-gray-400 ml-0.5">JPY</span>
        </div>
      </div>
      {/* UK */}
      <div ref={setRef(2)} className="absolute z-10" style={{ transform: 'translate(-50%,-50%)' }}>
        <div className="bg-white rounded-[14px] shadow-xl px-3 py-2 flex items-center gap-2 whitespace-nowrap">
          <div className="w-[30px] h-[30px] rounded-full overflow-hidden shrink-0"><img src="/site2/avatar3.jpg" alt="" className="w-full h-full object-cover" /></div>
          <div><div className="flex items-center gap-1"><span className="text-[11px]">🇬🇧</span><span className="text-[11px] font-bold">UK</span></div><span className="text-[9px] text-gray-400">Received $$$</span></div>
        </div>
      </div>
      {/* AUD */}
      <div ref={setRef(3)} className="absolute z-10" style={{ transform: 'translate(-50%,-50%)' }}>
        <div className="bg-black/65 backdrop-blur rounded-full px-3 py-2 flex items-center gap-1.5 whitespace-nowrap shadow-md">
          <span className="text-[13px]">🇦🇺</span><span className="text-[12px] font-bold text-white">$145</span><span className="text-[9px] text-gray-400 ml-0.5">AUD</span>
        </div>
      </div>
      {/* 150+ countries */}
      <div ref={setRef(4)} className="absolute z-10" style={{ transform: 'translate(-50%,-50%)' }}>
        <div className="bg-black rounded-full px-4 py-2.5 shadow-lg whitespace-nowrap">
          <span className="text-[13px] font-bold text-[#A5F41F]">150+ countries</span>
        </div>
      </div>
      {/* Globe emoji */}
      <div ref={setRef(5)} className="absolute z-10" style={{ transform: 'translate(-50%,-50%)' }}>
        <span className="text-[36px] drop-shadow-md">🌏</span>
      </div>
      {/* Brazil */}
      <div ref={setRef(6)} className="absolute z-10" style={{ transform: 'translate(-50%,-50%)' }}>
        <div className="bg-white rounded-[14px] shadow-xl px-3 py-2 flex items-center gap-2 whitespace-nowrap">
          <div className="w-[30px] h-[30px] rounded-full overflow-hidden shrink-0"><img src="/site2/avatar8.jpg" alt="" className="w-full h-full object-cover" /></div>
          <div><div className="flex items-center gap-1"><span className="text-[11px]">🇧🇷</span><span className="text-[11px] font-bold">Brazil</span></div><span className="text-[9px] text-gray-400">Received $$$</span></div>
        </div>
      </div>
    </>
  )
}

/* ────────────── Locked content unlock loop ────────────── */
type LockPhase = 'locked' | 'pressing' | 'unlocking' | 'unlocked' | 'relocking'

function LockedContentSlide() {
  const [phase, setPhase] = useState<LockPhase>('locked')

  useEffect(() => {
    const durations: Record<LockPhase, number> = { locked: 2200, pressing: 380, unlocking: 720, unlocked: 2800, relocking: 620 }
    const next: Record<LockPhase, LockPhase> = { locked: 'pressing', pressing: 'unlocking', unlocking: 'unlocked', unlocked: 'relocking', relocking: 'locked' }
    const t = setTimeout(() => setPhase(next[phase]), durations[phase])
    return () => clearTimeout(t)
  }, [phase])

  const unlocked  = phase === 'unlocked' || phase === 'relocking'
  const unlocking = phase === 'unlocking' || phase === 'unlocked' || phase === 'relocking'
  const pressing  = phase === 'pressing'  || phase === 'unlocking'

  return (
    <>
      {/* Main card */}
      <div className="relative w-[300px] rounded-[32px] overflow-hidden shadow-2xl z-10">
        <div className="relative h-[280px] overflow-hidden">
          <img
            src="/locked-content-photo.jpg" alt=""
            className="absolute inset-0 w-full h-full object-cover scale-110"
            style={{
              filter: unlocked ? 'blur(0px) brightness(1)' : 'blur(8px) brightness(0.65)',
              transition: 'filter 750ms cubic-bezier(0.4,0,0.2,1)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/55"
            style={{ opacity: unlocked ? 0.1 : 1, transition: 'opacity 750ms' }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div
              className="rounded-full w-[52px] h-[52px] flex items-center justify-center"
              style={{
                background: unlocking ? 'rgba(165,244,31,0.35)' : 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(4px)',
                transform: pressing ? 'scale(1.25) rotate(12deg)' : 'scale(1)',
                transition: 'transform 400ms cubic-bezier(0.34,1.56,0.64,1), background 400ms',
              }}
            >
              <span className="text-[26px]">{unlocking ? '🔓' : '🔒'}</span>
            </div>
            <p className="text-[17px] font-bold text-white mt-1" style={{ opacity: unlocked ? 0 : 1, transition: 'opacity 400ms' }}>Exclusive Content</p>
            <p className="text-[13px] text-white/70" style={{ opacity: unlocked ? 0 : 1, transition: 'opacity 400ms' }}>3 photos &bull; 1 video</p>
            {/* Unlocked badge */}
            <div style={{
              position: 'absolute', bottom: 14, left: '50%',
              transform: unlocked ? 'translate(-50%,0) scale(1)' : 'translate(-50%,12px) scale(0.8)',
              opacity: unlocked ? 1 : 0,
              transition: 'all 500ms cubic-bezier(0.34,1.56,0.64,1)',
              pointerEvents: 'none',
            }}>
              <div className="bg-[#A5F41F] rounded-full px-4 py-1.5 whitespace-nowrap shadow-lg">
                <span className="text-[13px] font-bold text-black">Unlocked! ✨</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white px-5 pt-4 pb-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden shrink-0">
              <img src="/site2/avatar4.jpg" alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-black leading-none">Maya Chen</p>
              <p className="text-[11px] text-black/40 mt-0.5">@mayachen</p>
            </div>
          </div>
          <div className="rounded-full py-4 text-center" style={{
            background: unlocked ? '#0A0A0B' : '#A5F41F',
            transform: pressing ? 'scale(0.95)' : 'scale(1)',
            transition: 'background 600ms, transform 200ms cubic-bezier(0.34,1.56,0.64,1)',
          }}>
            <span className="text-[15px] font-bold" style={{ color: unlocked ? '#A5F41F' : '#000000', transition: 'color 600ms' }}>
              {unlocked ? 'Content Unlocked ✓' : 'Unlock for $4.99'}
            </span>
          </div>
        </div>
      </div>

      {/* Lock icon — upper left */}
      <div className="absolute left-[20px] top-[10px] rotate-[10deg] float-slow z-20">
        <div className="bg-[#A5F41F] rounded-[22px] shadow-xl w-[80px] h-[80px] flex items-center justify-center"
          style={{ transform: pressing ? 'scale(1.15) rotate(-8deg)' : 'scale(1)', transition: 'transform 400ms cubic-bezier(0.34,1.56,0.64,1)' }}>
          <span className="text-[40px]">{unlocking ? '🔓' : '🔒'}</span>
        </div>
      </div>

      {/* Avatar cluster */}
      <div className="absolute left-[10px] top-[220px] z-20 flex items-center float-medium">
        <div className="w-[42px] h-[42px] rounded-full border-2 border-white overflow-hidden shadow-lg"><img src="/site2/avatar3.jpg" alt="" className="w-full h-full object-cover" /></div>
        <div className="w-[42px] h-[42px] rounded-full border-2 border-white overflow-hidden shadow-lg -ml-3"><img src="/site2/avatar7.jpg" alt="" className="w-full h-full object-cover" /></div>
        <div className="w-[42px] h-[42px] rounded-full border-2 border-white bg-black flex items-center justify-center shadow-lg -ml-3">
          <span className="text-[10px] font-bold text-white">+12</span>
        </div>
      </div>

      {/* Just unlocked — animated */}
      <div className="absolute left-[5px] top-[290px] z-20" style={{
        opacity: unlocked ? 1 : 0,
        transform: unlocked ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.9)',
        transition: 'opacity 500ms, transform 500ms cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        <div className="bg-white rounded-full shadow-lg px-4 py-2.5">
          <span className="text-[13px] font-medium text-black">Just unlocked! 🔥</span>
        </div>
      </div>

      {/* $284 earnings card */}
      <div className="absolute right-[10px] top-[80px] float-medium z-20">
        <div className="bg-[#EAF0FB] rounded-[18px] shadow-lg px-4 py-3 flex items-center gap-3">
          <span className="text-[28px]">💰</span>
          <div>
            <p className="text-[22px] font-bold text-black leading-none">$284</p>
            <p className="text-[11px] text-black/40 mt-0.5">This week</p>
          </div>
        </div>
      </div>

      {/* Worth it */}
      <div className="absolute right-[5px] bottom-[120px] -rotate-[3deg] float-slow z-20">
        <div className="bg-black rounded-[16px] shadow-lg px-4 py-2.5">
          <span className="text-[13px] font-semibold text-white">Worth it! ❤️</span>
        </div>
      </div>
    </>
  )
}

/* ────────────── Scroll-swap feature section ────────────── */
const swapSteps = [
  { title: 'Text-based payments', desc: 'Works with any phone number. No apps required.' },
  { title: 'Send money globally', desc: '150+ countries supported. Instant cross-border payments with zero fees.' },
  { title: 'Lock your best content', desc: 'Sell exclusive photos, videos, and messages. Set your price, get paid instantly.' },
]

function ScrollSwapSection({ assets }: { assets: Record<string, string> }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [displayStep, setDisplayStep] = useState(0)
  const [flipClass, setFlipClass] = useState('')
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const isFlipping = flipClass !== ''

  // Scroll → step
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = sectionRef.current.offsetHeight
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / (sectionHeight - window.innerHeight)))
      const step = progress < 0.28 ? 0 : progress < 0.6 ? 1 : 2
      setActiveStep(step)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Flip transition when activeStep changes
  useEffect(() => {
    if (activeStep === displayStep) return
    setFlipClass('visual-flip-out')
    setTilt({ x: 0, y: 0 })
    const t1 = setTimeout(() => {
      setDisplayStep(activeStep)
      setFlipClass('visual-flip-in')
      const t2 = setTimeout(() => setFlipClass(''), 300)
      return () => clearTimeout(t2)
    }, 300)
    return () => clearTimeout(t1)
  }, [activeStep, displayStep])

  // Mouse 3D tilt — responds to mouse anywhere in the section
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isFlipping) return
    const x = e.clientX / window.innerWidth
    const y = e.clientY / window.innerHeight
    setTilt({ x: (y - 0.5) * -14, y: (x - 0.5) * 14 })
    setGlare({ x: x * 100, y: y * 100, opacity: 0.12 })
  }, [isFlipping])

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    setGlare(g => ({ ...g, opacity: 0 }))
  }, [])

  return (
    <section ref={sectionRef} className="relative" style={{ height: '450vh' }}>
      <div
        className="sticky top-0 h-screen flex items-center overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-[1400px] mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-20 pt-[clamp(16px,2vh,80px)]">

          {/* Left: Visual — tilt wrapper + flip inner */}
          <div className="relative flex-1 flex justify-center">
            <div
              ref={tiltRef}
              style={{
                transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: isFlipping ? 'none' : 'transform 100ms ease-out',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Flip layer — square on mobile so globe isn't squashed */}
              <div
                className={`relative w-[min(500px,85vw)] aspect-square lg:aspect-auto lg:h-[min(600px,60vw)] ${flipClass}`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Glare overlay */}
                <div
                  className="absolute inset-0 z-30 pointer-events-none rounded-[24px]"
                  style={{
                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 55%)`,
                    transition: isFlipping ? 'none' : 'background 100ms ease-out',
                  }}
                />

                {/* ── State 0: Send Money ── */}
                <div className={`absolute inset-0 ${displayStep === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

                  {/* ── Main phone card ── */}
                  <div className="absolute left-[50px] top-[10px] w-[255px] h-[540px] rounded-[36px] overflow-hidden shadow-2xl rotate-[2deg] z-[5]">
                    <img src={assets.phoneMockup} alt="Send Money" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
                    {/* Top bar */}
                    <div className="relative z-10 px-5 pt-5 flex items-start justify-between">
                      <p className="text-[20px] font-bold text-white leading-tight">Send Money</p>
                      <div className="w-9 h-9 bg-[#A5F41F] rounded-[10px] flex items-center justify-center">
                        <TappdIcon className="w-4 h-auto text-black" />
                      </div>
                    </div>
                    {/* Bottom UI */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2.5">
                      <div className="bg-black/50 backdrop-blur-lg rounded-[18px] px-4 py-3 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shrink-0" />
                        <div>
                          <p className="text-[13px] font-semibold text-white leading-none">Alex Smith</p>
                          <p className="text-[10px] text-white/50 mt-0.5">@alexsmith</p>
                        </div>
                        <span className="text-[18px] ml-auto">💸</span>
                      </div>
                      <div className="bg-[#A5F41F] rounded-full py-3.5 text-center">
                        <span className="text-[15px] font-bold text-black">Send Now</span>
                      </div>
                    </div>
                  </div>

                  {/* Avatar — upper right, outside phone */}
                  <div className="absolute right-[20px] top-[0px] w-[68px] h-[68px] rounded-full overflow-hidden shadow-xl border-[3px] border-white z-20 float-slow">
                    <img src="/site2/avatar4.jpg" alt="" className="w-full h-full object-cover" />
                  </div>

                  {/* Avatar — left mid, slightly overlapping phone */}
                  <div className="absolute left-[0px] top-[190px] w-[64px] h-[64px] rounded-full overflow-hidden shadow-xl border-[3px] border-white z-20 float-medium">
                    <img src="/site2/avatar6.jpg" alt="" className="w-full h-full object-cover" />
                  </div>

                  {/* $50 card — upper right */}
                  <div className="absolute right-[0px] top-[90px] rotate-[5deg] float-slow z-20">
                    <div className="bg-white rounded-[20px] shadow-xl px-6 py-4 min-w-[140px]">
                      <p className="font-display text-[42px] font-bold text-black leading-none">$50</p>
                      <p className="text-[11px] text-gray-400 mt-1">Enter amount</p>
                    </div>
                  </div>

                  {/* ⚡ Instant — right, below $50 */}
                  <div className="absolute right-[25px] top-[230px] float-medium z-20">
                    <div className="bg-black rounded-full px-5 py-2.5 flex items-center gap-2 shadow-lg">
                      <span className="text-[14px]">⚡</span>
                      <span className="text-[13px] font-bold text-white">Instant</span>
                    </div>
                  </div>

                  {/* You sent $50 — left, mid-low */}
                  <div className="absolute left-[8px] top-[350px] -rotate-[2deg] float-slow z-20">
                    <div className="bg-[#A5F41F] rounded-[16px] shadow-lg px-4 py-3">
                      <p className="text-[10px] text-black/60 font-medium">You sent</p>
                      <p className="text-[26px] font-bold text-black leading-tight">$50</p>
                    </div>
                  </div>

                  {/* 🔒 Secure — lower left */}
                  <div className="absolute left-[15px] bottom-[50px] rotate-[1deg] float-medium z-20">
                    <div className="bg-white rounded-full shadow-lg px-5 py-2.5 flex items-center gap-2">
                      <span className="text-[14px]">🔒</span>
                      <span className="text-[13px] font-semibold text-black">Secure</span>
                    </div>
                  </div>

                  {/* 💵 — right, lower mid */}
                  <div className="absolute right-[10px] bottom-[160px] float-slow z-20">
                    <span className="text-[52px]">💵</span>
                  </div>

                </div>

                {/* ── State 1: Globe ── */}
                <div className={`absolute inset-0 flex items-center justify-center ${displayStep === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  <div className="relative w-[min(480px,78vw)] h-[min(480px,78vw)]">
                    <div className="absolute inset-[-10px] rounded-full border-2 border-[#A5F41F]/30" />
                    <div className="absolute inset-[20px] rounded-full border border-[#A5F41F]/20" />
                    <div className="absolute inset-[60px] rounded-full overflow-hidden flex items-center justify-center">
                      <img src="/ellipse-2161.png" alt="" className="w-full h-full object-cover spin-slow" />
                    </div>
                    <div className="absolute left-[50%] top-[25%] -translate-x-1/2 -translate-y-1/2 z-10 float-slow">
                      <div className="backdrop-blur-lg bg-white/40 border border-white/50 rounded-[16px] shadow-xl px-3 py-2">
                        <div className="flex items-center gap-2 mb-1"><span className="text-[16px]">🇺🇸</span><span className="text-[11px] font-medium text-white">United States</span></div>
                        <p className="font-bold text-white leading-none" style={{ fontSize: 'clamp(20px,5vw,32px)' }}>$100</p>
                      </div>
                    </div>

                    {/* Transfer arrow */}
                    <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1">
                      <div className="flex flex-col items-center gap-[5px]">
                        <div className="w-[6px] h-[6px] rounded-full bg-white flow-dot-1" />
                        <div className="w-[6px] h-[6px] rounded-full bg-white flow-dot-2" />
                        <div className="w-[6px] h-[6px] rounded-full bg-white flow-dot-3" />
                      </div>
                      <div className="bg-black/50 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg my-1">
                        <span className="text-[10px] font-bold text-[#A5F41F]">0% fee</span>
                        <span className="text-[10px] text-white/60">·</span>
                        <span className="text-[10px] text-white/80">Instant</span>
                      </div>
                      <div className="flex flex-col items-center gap-[5px]">
                        <div className="w-[6px] h-[6px] rounded-full bg-[#A5F41F] flow-dot-1" />
                        <div className="w-[6px] h-[6px] rounded-full bg-[#A5F41F] flow-dot-2" />
                        <div className="w-[6px] h-[6px] rounded-full bg-[#A5F41F] flow-dot-3" />
                      </div>
                    </div>

                    <div className="absolute left-[50%] bottom-[15%] -translate-x-1/2 z-10 float-medium">
                      <div className="backdrop-blur-lg bg-[#A5F41F]/40 border border-[#A5F41F]/50 rounded-[16px] shadow-xl px-3 py-2">
                        <div className="flex items-center gap-2 mb-1"><span className="text-[16px]">🇪🇺</span><span className="text-[11px] font-medium text-white/70">Europe</span></div>
                        <p className="font-bold text-white leading-none" style={{ fontSize: 'clamp(20px,5vw,32px)' }}>€92</p>
                      </div>
                    </div>
                    {/* Orbit ring hidden on mobile — 240px radius doesn't fit in a 300px container */}
                    <div className="hidden lg:block"><GlobeOrbitRing /></div>
                  </div>
                </div>

                {/* ── State 2: Pay Wall ── */}
                <div className={`absolute inset-0 flex items-center justify-center ${displayStep === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  <LockedContentSlide />
                </div>

              </div>{/* end flip layer */}
            </div>{/* end tilt wrapper */}
          </div>

          {/* Right: Text */}
          <div className="flex-none lg:w-[400px] w-full text-center lg:text-left">
            <div className="relative min-h-[120px] lg:h-[160px]">
              {swapSteps.map((step, i) => (
                <div key={step.title} className={`lg:absolute inset-0 transition-all duration-500 ${activeStep === i ? 'opacity-100 translate-y-0' : 'hidden lg:block opacity-0 translate-y-4 pointer-events-none'}`}>
                  <h3 className="font-display text-[clamp(28px,3vw,40px)] font-medium text-black leading-[0.95] tracking-[-0.02em]">{step.title}</h3>
                  <p className="text-[clamp(14px,1.4vw,18px)] text-black/60 mt-3 leading-[1.5]">{step.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-2 justify-center lg:justify-start">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (!sectionRef.current) return
                    const thresholds = [0, 0.28, 0.6]
                    const top = sectionRef.current.offsetTop + thresholds[i] * (sectionRef.current.offsetHeight - window.innerHeight) + 10
                    window.scrollTo({ top, behavior: 'smooth' })
                  }}
                  className={`rounded-full transition-all duration-500 cursor-pointer ${activeStep === i ? 'w-10 h-3 bg-[#A5F41F]' : 'w-3 h-3 bg-black/20 hover:bg-black/40'}`}
                  aria-label={`Step ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ────────────── Bento grid — fades white → lime-to-black gradient on scroll ────────────── */
function BentoStickySection() {
  const wrapRef    = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onScroll() {
      const el = wrapRef.current
      if (!el) return
      const scrolled = -el.getBoundingClientRect().top
      const total    = el.offsetHeight - window.innerHeight
      const p        = Math.min(1, Math.max(0, scrolled / total))
      /* white fades into lime gradient from p=0.30 onward */
      const t = Math.max(0, (p - 0.30) / 0.70)
      if (overlayRef.current) overlayRef.current.style.opacity = t.toFixed(3)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={wrapRef} style={{ height: '180vh' }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        <BentoGrid />
        {/* Lime-to-black gradient overlay — transitions white into the stats section background */}
        <div
          ref={overlayRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0,
            background: 'linear-gradient(to bottom, #c8ff50 0%, #A5F41F 18%, #5a9610 36%, #1e4408 54%, #091202 74%, #000 100%)',
          }}
        />
      </div>
    </div>
  )
}

/* ────────────── Inner content (needs WaitlistContext) ────────────── */
function Site2Inner() {
  const showWaitlist = useWaitlist()
  const [heroDesign, setHeroDesign] = useState(0)

  return (
    <div className="bg-white min-h-screen">
      {/* ═══════ MARQUEE — outside overflow:hidden so it's never clipped on iOS ═══════ */}
      <MarqueeBanner />

      {/* ═══════ NAV — always visible ═══════ */}
      <Nav />

      <main>
        {/* ═══════ HERO ═══════ */}
        <div className="relative h-screen overflow-hidden">
          {/* Design A: Figma-based hero with photo + video phone */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${heroDesign === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <section className="relative h-full overflow-hidden pt-[112px] pb-0">
              <div className="absolute inset-0 pointer-events-none" aria-hidden>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={assets.heroBackground} alt="" fetchPriority="high" decoding="sync" className="absolute inset-0 w-full h-full object-cover opacity-75" />
                {/* Dot grid — matches Design B, fades out toward bottom */}
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.08) 1.5px, transparent 1.5px)', backgroundSize: '26px 26px', maskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 80%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 80%)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 65%, white 100%)' }} />
              </div>

              <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-8 flex flex-col items-center">
                <div className="relative w-full flex flex-col items-center">
                  <h1 className="font-display text-[clamp(56px,8vw,96px)] font-medium leading-[0.85] text-black tracking-[-0.04em] text-center">
                    Tap. Text. Get Paid.
                  </h1>
                  <p className="text-[clamp(16px,1.6vw,20px)] text-black/60 mt-5 max-w-[672px] text-center leading-[1.4]">
                    No apps. No links. Just text your clients and get paid instantly. Zero fees.
                  </p>
                  <div className="flex items-center justify-center gap-3 mt-6">
                    <button
                      onClick={showWaitlist}
                      className="text-[14px] font-semibold text-white px-8 py-4 rounded-full bg-black hover:bg-black/80 transition-colors cursor-pointer shadow-[0_2px_20px_rgba(0,0,0,0.2)]"
                    >
                      Get Tapp&apos;d
                    </button>
                    <a href="#product" className="text-[14px] font-semibold text-black px-8 py-4 rounded-full border-2 border-black/60 hover:bg-black hover:text-white hover:border-black transition-all">
                      See how it works
                    </a>
                  </div>
                  <div className="relative mt-8 md:mt-10 flex justify-center w-full">
                    <div className="relative overflow-hidden w-full md:w-[clamp(500px,65vw,900px)] h-[220px] sm:h-[280px] md:h-[clamp(350px,45vw,600px)]" style={{ borderRadius: 'clamp(12px,3vw,22px)' }}>
                      <img src={assets.heroPhoto} alt="People using Tapp'd" className="w-full h-full object-cover object-top" />
                      <div className="absolute bottom-0 left-0 right-0 h-[70%] pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 0%, white 100%)' }} />
                    </div>
                    <div className="absolute right-0 md:right-[clamp(-40px,-3vw,0px)] lg:right-[40px] top-[12px] w-[clamp(110px,22vw,280px)] hidden sm:block">
                      <div className="bg-black rounded-[clamp(28px,4vw,44px)] p-[clamp(6px,1vw,10px)] shadow-2xl shadow-black/30">
                        <div className="absolute top-[clamp(8px,1.5vw,14px)] left-1/2 -translate-x-1/2 z-20 w-[clamp(60px,12vw,100px)] h-[clamp(18px,2vw,24px)] bg-black rounded-full" />
                        <div className="relative rounded-[clamp(22px,3.5vw,36px)] overflow-hidden bg-black" style={{ aspectRatio: '9 / 19.5' }}>
                          <video src="/demo.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Design B: Centered headline + dot grid + phone with floating cards */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${heroDesign === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <section
              className="relative h-full overflow-hidden flex flex-col"
              style={{ background: 'linear-gradient(145deg, #A5F41F 0%, #c2f55a 12%, #d8f890 24%, #ebfbc8 38%, #f4f6ee 58%, #efefeb 100%)' }}
            >
              {/* Dot grid */}
              <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.10) 1.5px, transparent 1.5px)', backgroundSize: '26px 26px' }} aria-hidden />
              <div className="noise-texture absolute inset-0 z-[1]" aria-hidden />

              <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-8">
                {/* Centered headline */}
                <h1
                  className="font-medium text-black tracking-[-0.04em] text-center leading-[0.85]"
                  style={{ fontSize: 'clamp(56px, 10vw, 120px)' }}
                >
                  Tap. Text. Get Paid.
                </h1>

                <p className="text-[clamp(14px,1.6vw,18px)] text-black/55 text-center max-w-[480px] mt-6 leading-[1.4]">
                  Messages and payments in one app. 0% fees. Keep everything you earn.
                </p>

                <div className="flex items-center justify-center gap-3 mt-6">
                  <button
                    onClick={showWaitlist}
                    className="text-[14px] font-semibold text-white px-8 py-4 rounded-full bg-black hover:bg-black/80 transition-colors cursor-pointer shadow-[0_2px_20px_rgba(0,0,0,0.2)]"
                  >
                    Get Tapp&apos;d
                  </button>
                  <a
                    href="#product"
                    className="text-[14px] font-semibold text-black px-8 py-4 rounded-full border-2 border-black/60 hover:bg-black hover:text-white hover:border-black transition-all backdrop-blur-sm bg-white/10"
                  >
                    See the product
                  </a>
                </div>
              </div>

              {/* Phone + floating cards at bottom */}
              <div className="relative z-10 flex justify-center pb-0 -mb-[60px]">
                <div className="relative">
                  {/* Phone */}
                  <div className="relative w-[clamp(260px,40vw,340px)]">
                    <div className="bg-black rounded-[clamp(28px,5vw,44px)] p-[clamp(6px,1.2vw,10px)] shadow-2xl shadow-black/30">
                      <div className="absolute top-[clamp(8px,1.5vw,14px)] left-1/2 -translate-x-1/2 z-20 w-[clamp(60px,14vw,100px)] h-[clamp(18px,2.5vw,24px)] bg-black rounded-full" />
                      <div className="relative rounded-[clamp(22px,4vw,36px)] overflow-hidden bg-black" style={{ aspectRatio: '9 / 19.5' }}>
                        <video src="/demo.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>

                  {/* Floating: "You sent $50" — left */}
                  <div className="absolute left-[-120px] top-[15%] z-10 float-slow hidden md:block">
                    <div className="bg-[#A5F41F]/80 backdrop-blur-sm rounded-[16px] shadow-xl px-5 py-4">
                      <p className="text-[12px] text-black/70">You sent</p>
                      <p className="text-[36px] font-bold text-black leading-none">$50</p>
                    </div>
                  </div>

                  {/* Floating: "+$75 via text" — right */}
                  <div className="absolute right-[-160px] top-[20%] z-10 float-medium hidden md:block">
                    <div className="bg-white rounded-[16px] shadow-xl px-5 py-4">
                      <p className="text-[11px] text-black/50 font-medium uppercase tracking-wider">Incoming <span className="text-[#A5F41F]">&bull;</span></p>
                      <p className="text-[24px] font-bold text-black leading-tight">+$75 via text</p>
                      <p className="text-[12px] text-black/40 mt-0.5">from @maya_k</p>
                    </div>
                  </div>

                  {/* Floating: "Thanks for dinner!" — bottom right */}
                  <div className="absolute right-[-140px] bottom-[20%] z-10 float-slow hidden md:block">
                    <div className="bg-white rounded-[16px] shadow-xl px-5 py-3">
                      <p className="text-[10px] text-black/40 font-medium uppercase tracking-wider">New Message</p>
                      <p className="text-[15px] font-medium text-black">&quot;Thanks for dinner! 📬&quot;</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Bottom fade — ensures seamless transition into next section for both designs */}
          <div className="absolute bottom-0 left-0 right-0 h-[80px] pointer-events-none z-[150]" style={{ background: 'linear-gradient(to bottom, transparent, white)' }} />

          {/* Arrow toggles — bottom right of hero only */}
          <div className="absolute bottom-8 right-8 z-[200] flex items-center gap-2">
            <button
              onClick={() => setHeroDesign(heroDesign === 0 ? 1 : 0)}
              className="w-11 h-11 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer bg-transparent"
              aria-label="Previous design"
            >
              <ArrowLeft size={18} weight="bold" />
            </button>
            <button
              onClick={() => setHeroDesign(heroDesign === 0 ? 1 : 0)}
              className="w-11 h-11 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer bg-transparent"
              aria-label="Next design"
            >
              <ArrowRight size={18} weight="bold" />
            </button>
          </div>
        </div>

        {/* ═══════ FEATURES SCROLL-SWAP: Send Money → Globe → PayWall ═══════ */}
        <ScrollSwapSection assets={assets} />

        {/* ═══════ BUILT FOR THE NEW ECONOMY — Carousel ═══════ */}
        <section className="bg-[#A5F41F] pt-24 pb-16 overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6 mb-12">
            <h2 className="font-display text-[clamp(40px,5vw,64px)] font-medium text-black leading-[0.92] tracking-[-0.03em]">
              Built for the<br />new economy
            </h2>
          </div>

          {/* Auto-scrolling carousel loop */}
          <div className="relative overflow-hidden pb-8 group/carousel">
            <div
              className="flex gap-6 w-max hover:[animation-play-state:paused]"
              style={{ animation: 'marquee 48s linear infinite' }}
            >
              {/* Render items twice for seamless loop — each use case has its own unique photo */}
              {[0, 1].map((set) =>
                useCases.map((uc) => (
                  <React.Fragment key={`${set}-${uc.label}`}>
                    <div className="shrink-0 w-[320px] bg-white rounded-[24px] p-7 flex flex-col justify-between min-h-[360px] hover:bg-black hover:text-white transition-colors duration-300 group cursor-pointer">
                      <div>
                        <p className="mono text-[11px] text-black/40 group-hover:text-white/40 uppercase mb-4">{uc.label}</p>
                        <h3 className="font-display text-[28px] font-medium leading-tight whitespace-pre-line">{uc.title}</h3>
                        <p className="text-[13px] text-black/60 group-hover:text-white/60 mt-3 leading-[1.5]">{uc.desc}</p>
                      </div>
                      <div className="mt-6">
                        <p className="font-display text-[34px] font-medium text-[#A5F41F]">{uc.stat}</p>
                        <p className="mono text-[11px] text-black/40 group-hover:text-white/40 uppercase">{uc.statLabel}</p>
                      </div>
                    </div>
                    <div className="shrink-0 w-[260px] rounded-[24px] overflow-hidden min-h-[360px]">
                      <img src={uc.photo} alt={uc.label} className="w-full h-full object-cover" />
                    </div>
                  </React.Fragment>
                ))
              )}
            </div>
          </div>
        </section>

        {/* ═══════ EVERYTHING IN ONE PLACE — FloatingUI ═══════ */}
        <section className="relative pt-16 pb-0 overflow-hidden" style={{ marginBottom: -1 }}>
          {/* Animated gradient background — bottom must be exactly #ffffff to match BentoGrid */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #f0f7e4 0%, #e3f5d0 20%, #d8ecf6 45%, #e0eaf8 70%, #ffffff 100%)' }} />
            <div className="absolute rounded-full" style={{ width: '70vw', height: '70vw', top: '-30%', left: '-15%', background: 'radial-gradient(circle, rgba(165,244,31,0.3), transparent 60%)', filter: 'blur(80px)', animation: 'hero-blob-a 20s ease-in-out infinite' }} />
            <div className="absolute rounded-full" style={{ width: '55vw', height: '55vw', top: '20%', right: '-15%', background: 'radial-gradient(circle, rgba(204,213,246,0.45), transparent 60%)', filter: 'blur(80px)', animation: 'hero-blob-b 25s ease-in-out infinite' }} />
            <div className="absolute rounded-full" style={{ width: '45vw', height: '45vw', bottom: '-20%', left: '20%', background: 'radial-gradient(circle, rgba(165,244,31,0.2), transparent 60%)', filter: 'blur(60px)', animation: 'hero-blob-d 30s ease-in-out infinite' }} />
            {/* Hard lock: final 160px fades opaquely to white — eliminates hue mismatch at seam */}
            <div className="absolute bottom-0 left-0 right-0 h-[160px]" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0), #ffffff)' }} />
          </div>

          <div className="relative z-10 max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-12 reveal reveal-in">
              <h2 className="font-display text-[clamp(40px,5vw,60px)] font-medium text-black leading-[0.95] tracking-[-0.02em]">
                Everything in<br />one place
              </h2>
              <p className="text-[clamp(16px,1.4vw,20px)] text-black/60 mt-4 max-w-[612px] mx-auto leading-[1.5]">
                Payments, locked content, mass texts. All through your phone. Zero complexity.
              </p>
            </div>
          </div>

          {/* FloatingUI — hide internal heading, bg, blobs; keep below nav */}
          <style>{`
            .site2-floating-ui > div { z-index: 50 !important; }
            .site2-floating-ui section { background: transparent !important; }
            .site2-floating-ui .text-center.mb-14 { display: none !important; }
            .site2-floating-ui .text-center.lg\\:mb-20 { display: none !important; }
            .site2-floating-ui section > .absolute { display: none !important; }
          `}</style>
          <div className="site2-floating-ui" style={{ marginTop: '-1.5rem' }}>
            <FloatingUI />
          </div>

        </section>

        {/* ═══════ BENTO GRID ═══════ */}
        <BentoGrid />

        {/* Bridge: white → near-white (matches gradient.png top color) */}
        <div style={{ height: 60, background: 'linear-gradient(to bottom, #ffffff, #f8ffe8)', margin: 0 }} />

        {/* ═══════ END JOURNEY — stats → phone → CTA ═══════ */}
        <EndJourney zeroFeesBg={assets.zeroFeesBg} />

      </main>

      <Footer />
    </div>
  )
}

/* ────────────── Export with WaitlistProvider ────────────── */
export default function Site2Content() {
  return (
    <WaitlistProvider>
      <Site2Inner />
    </WaitlistProvider>
  )
}
