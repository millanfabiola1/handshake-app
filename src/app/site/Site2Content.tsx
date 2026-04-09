'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useWaitlist } from '@/components/WaitlistContext'
import WaitlistProvider from '@/components/WaitlistContext'
import MarqueeBanner from '@/components/MarqueeBanner'
import FloatingUI from '@/components/FloatingUI'
import BentoGrid from '@/components/BentoGrid'
import Nav from '@/components/Nav'
import { Check } from '@phosphor-icons/react'

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
  { label: 'CREATORS & INDEPENDENTS', title: 'Tips. Locked drops.\nKeep 100%.', desc: 'Every DM is a potential payday. Every follower is a potential revenue source.', stat: '47%', statLabel: 'HIGHER CONVERSION' },
  { label: 'HOME SERVICES', title: 'Quote, confirm, collect', desc: 'Your clients already text you. Now those texts make you money.', stat: '3x', statLabel: 'FASTER COLLECTIONS' },
  { label: 'PSYCHICS & COACHES', title: 'Lock premium readings', desc: 'Charge per message. Lock premium sessions. Schedule paid calls. One app does it all.', stat: '$120', statLabel: 'AVG SESSION REVENUE' },
  { label: 'SECURITY & SERVICE', title: 'Coordinate and\ninvoice instantly', desc: 'Ditch the invoicing software. Bill clients the second the job is done.', stat: '90%', statLabel: 'FASTER PAYMENTS' },
]

/* ────────────── Fee slideshow ────────────── */
const feeItems = [
  { name: 'Venmo charges 3%', isTappd: false },
  { name: 'PayPal charges 2.9%', isTappd: false },
  { name: 'Cash App charges 2.75%', isTappd: false },
  { name: 'Tappd charges 0%', isTappd: true },
]

function FeeSlideshow() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % feeItems.length), 2500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
      {feeItems.map((item, i) => (
        <div
          key={item.name}
          className={`backdrop-blur-[35px] rounded-full px-6 py-3 text-[14px] transition-all duration-500 ${
            item.isTappd
              ? 'bg-[#A5F41F] text-black font-semibold scale-100'
              : active === i
                ? 'border-2 border-white text-white shadow-xl scale-110 bg-white/10'
                : 'border border-white/40 text-white/60 shadow-lg scale-100'
          }`}
        >
          {item.name}
        </div>
      ))}
    </div>
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
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = sectionRef.current.offsetHeight
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / (sectionHeight - window.innerHeight)))
      const step = Math.min(2, Math.floor(progress * 3))
      setActiveStep(step)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: Visual that swaps */}
          <div className="relative flex-1 flex justify-center">
            <div className="relative w-[500px] h-[600px]">

              {/* ── State 0: Send Money ── */}
              <div className={`absolute inset-0 transition-all duration-700 ${activeStep === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <div className="absolute left-[120px] top-[220px] w-[75px] h-[75px] rounded-full overflow-hidden shadow-xl rotate-[4deg] float-slow z-10">
                  <img src={assets.avatar1} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute right-[30px] top-[60px] w-[70px] h-[70px] rounded-full overflow-hidden shadow-xl -rotate-[34deg] float-medium z-10">
                  <img src={assets.avatar2} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute left-[60px] top-[20px] w-[300px] -rotate-[11deg] z-[5]">
                  <div className="rounded-[40px] overflow-hidden shadow-2xl">
                    <img src={assets.phoneMockup} alt="Send Money" className="w-full h-auto" />
                  </div>
                </div>
                <div className="absolute right-[20px] top-[100px] -rotate-[22deg] float-medium z-10">
                  <div className="backdrop-blur-lg bg-white/30 border border-white/50 rounded-[20px] shadow-xl px-6 py-5">
                    <p className="font-display text-[44px] font-bold text-black text-center leading-none">$50</p>
                    <p className="text-[12px] text-gray-600 text-center mt-1">Enter amount</p>
                  </div>
                </div>
                <div className="absolute right-[60px] top-[230px] -rotate-[22deg] float-fast z-10">
                  <div className="bg-black rounded-full shadow-lg px-4 py-2.5 flex items-center gap-2">
                    <span className="text-[16px]">⚡</span>
                    <span className="text-[12px] font-bold text-white">Instant</span>
                  </div>
                </div>
                <div className="absolute left-[100px] bottom-[80px] z-10 float-slow">
                  <div className="backdrop-blur-lg bg-white/20 border border-white/40 rounded-[16px] shadow-xl px-5 py-3 flex items-center gap-3">
                    <div className="w-[40px] h-[40px] rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
                    <div>
                      <p className="text-[13px] font-semibold text-black">Alex Smith</p>
                      <p className="text-[10px] text-gray-500">@alexsmith</p>
                    </div>
                    <span className="text-[20px] ml-2">💸</span>
                  </div>
                </div>
                <div className="absolute left-[20px] top-[280px] rotate-[1deg] float-slow z-10">
                  <div className="backdrop-blur-lg bg-[#A5F41F]/50 border border-[#A5F41F]/50 rounded-[16px] shadow-lg px-4 py-2.5">
                    <p className="text-[10px] text-black">You sent</p>
                    <p className="text-[24px] font-bold text-black leading-tight">$50</p>
                  </div>
                </div>
                <div className="absolute left-[10px] bottom-[30px] -rotate-[18deg] float-medium z-10">
                  <div className="bg-white rounded-full shadow-lg px-4 py-2.5 flex items-center gap-1.5">
                    <span className="text-[16px]">🔒</span>
                    <span className="text-[12px] font-bold text-black">Secure</span>
                  </div>
                </div>
                <div className="absolute right-[10px] bottom-[100px] -rotate-[22deg] float-slow z-10">
                  <span className="text-[56px]">💵</span>
                </div>
                <div className="absolute left-[110px] bottom-[15px] z-10">
                  <div className="bg-[#A5F41F] rounded-full shadow-lg px-10 py-3.5">
                    <span className="text-[14px] font-bold text-black">Send Now</span>
                  </div>
                </div>
              </div>

              {/* ── State 1: Globe ── */}
              <div className={`absolute inset-0 transition-all duration-700 flex items-center justify-center ${activeStep === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <div className="relative w-[400px] h-[400px]">
                  {/* Orbit rings */}
                  <div className="absolute inset-[-10px] rounded-full border-2 border-[#A5F41F]/30" />
                  <div className="absolute inset-[20px] rounded-full border border-[#A5F41F]/20" />
                  {/* Center photo circle */}
                  <div className="absolute inset-[60px] rounded-full overflow-hidden">
                    <img src={assets.heroPhoto} alt="" className="w-full h-full object-cover" />
                  </div>
                  {/* US card */}
                  <div className="absolute left-[50%] top-[25%] -translate-x-1/2 -translate-y-1/2 z-10 float-slow">
                    <div className="backdrop-blur-lg bg-white/40 border border-white/50 rounded-[16px] shadow-xl px-4 py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[20px]">🇺🇸</span>
                        <span className="text-[12px] font-medium text-white">United States</span>
                      </div>
                      <p className="text-[32px] font-bold text-white leading-none">$100</p>
                    </div>
                  </div>
                  {/* EU card */}
                  <div className="absolute left-[50%] bottom-[15%] -translate-x-1/2 z-10 float-medium">
                    <div className="backdrop-blur-lg bg-[#A5F41F]/40 border border-[#A5F41F]/50 rounded-[16px] shadow-xl px-4 py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[20px]">🇪🇺</span>
                        <span className="text-[12px] font-medium text-white/70">Europe</span>
                      </div>
                      <p className="text-[32px] font-bold text-white leading-none">€92</p>
                    </div>
                  </div>
                  {/* Country badges */}
                  <div className="absolute top-[-5px] left-[50%] -translate-x-1/2 z-10">
                    <div className="bg-black/60 backdrop-blur rounded-full px-3 py-2 flex items-center gap-1.5">
                      <span className="text-[14px]">🇨🇦</span>
                      <span className="text-[12px] font-bold text-white">$130</span>
                      <span className="text-[9px] text-gray-400">CAD</span>
                    </div>
                  </div>
                  <div className="absolute right-[-20px] top-[30%] z-10">
                    <div className="bg-black/60 backdrop-blur rounded-full px-3 py-2 flex items-center gap-1.5">
                      <span className="text-[14px]">🇯🇵</span>
                      <span className="text-[12px] font-bold text-white">¥13,500</span>
                      <span className="text-[9px] text-gray-400">JPY</span>
                    </div>
                  </div>
                  <div className="absolute bottom-[5px] right-[10%] z-10">
                    <div className="bg-black/60 backdrop-blur rounded-full px-3 py-2 flex items-center gap-1.5">
                      <span className="text-[14px]">🇦🇺</span>
                      <span className="text-[12px] font-bold text-white">$145</span>
                      <span className="text-[9px] text-gray-400">AUD</span>
                    </div>
                  </div>
                  {/* Globe emoji + 150+ countries */}
                  <div className="absolute left-[-30px] bottom-[25%] z-10 float-slow">
                    <span className="text-[48px]">🌏</span>
                  </div>
                  <div className="absolute left-[-20px] bottom-[10%] z-10">
                    <div className="bg-black rounded-full px-4 py-2.5 shadow-lg">
                      <span className="text-[14px] font-bold text-[#A5F41F]">150+ countries</span>
                    </div>
                  </div>
                  {/* Profile cards */}
                  <div className="absolute left-[-10px] top-[20%] z-10 float-medium">
                    <div className="bg-white rounded-[16px] shadow-xl px-3 py-2 flex items-center gap-2">
                      <div className="w-[36px] h-[36px] rounded-full overflow-hidden">
                        <img src={assets.avatar1} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1"><span className="text-[12px]">🇧🇷</span><span className="text-[11px] font-bold">Brazil</span></div>
                        <span className="text-[9px] text-gray-400">Received $$$</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute right-[-30px] bottom-[30%] z-10 float-slow">
                    <div className="bg-white rounded-[16px] shadow-xl px-3 py-2 flex items-center gap-2">
                      <div className="w-[36px] h-[36px] rounded-full overflow-hidden">
                        <img src={assets.avatar2} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1"><span className="text-[12px]">🇬🇧</span><span className="text-[11px] font-bold">UK</span></div>
                        <span className="text-[9px] text-gray-400">Received $$$</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── State 2: Pay Wall ── */}
              <div className={`absolute inset-0 transition-all duration-700 flex items-center justify-center ${activeStep === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <div className="relative w-[380px]">
                  {/* Main card */}
                  <div className="bg-black/80 backdrop-blur-xl rounded-[32px] overflow-hidden shadow-2xl">
                    {/* Blurred image top */}
                    <div className="relative h-[180px] overflow-hidden">
                      <img src={assets.heroPhoto} alt="" className="w-full h-full object-cover blur-[3px] opacity-50" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
                      {/* Lock icon */}
                      <div className="absolute top-[30px] left-1/2 -translate-x-1/2 bg-white/20 rounded-full w-[56px] h-[56px] flex items-center justify-center">
                        <span className="text-[28px]">🔒</span>
                      </div>
                      <div className="absolute bottom-[30px] left-0 right-0 text-center">
                        <p className="text-[18px] font-bold text-white">Exclusive Content</p>
                        <p className="text-[14px] text-white/80 mt-1">3 photos &bull; 1 video</p>
                      </div>
                    </div>
                    {/* Divider + creator info */}
                    <div className="border-t border-white/10 px-6 py-4 flex items-center gap-3">
                      <div className="w-[44px] h-[44px] rounded-full overflow-hidden">
                        <img src={assets.avatar1} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-white">Maya Chen</p>
                        <p className="text-[11px] text-gray-400">@mayachen</p>
                      </div>
                    </div>
                    {/* Unlock button */}
                    <div className="px-6 pb-6">
                      <div className="bg-[#A5F41F] rounded-full py-4 text-center">
                        <span className="text-[16px] font-bold text-black">Unlock for $4.99</span>
                      </div>
                    </div>
                  </div>
                  {/* Floating elements */}
                  <div className="absolute -left-[30px] top-[20px] z-10 rotate-12 float-slow">
                    <div className="bg-[#A5F41F]/40 backdrop-blur border border-[#A5F41F]/50 rounded-[16px] shadow-lg w-[80px] h-[80px] flex items-center justify-center">
                      <span className="text-[36px]">🔓</span>
                    </div>
                  </div>
                  <div className="absolute right-[-20px] top-[100px] z-10 float-medium">
                    <div className="backdrop-blur-lg bg-white/20 border border-white/40 rounded-[20px] shadow-xl px-4 py-3 flex items-center gap-3">
                      <div className="bg-gradient-to-br from-blue-300 to-blue-400 rounded-full w-[44px] h-[44px] flex items-center justify-center">
                        <span className="text-[20px]">💰</span>
                      </div>
                      <div>
                        <p className="text-[20px] font-bold text-black">$284</p>
                        <p className="text-[11px] text-gray-500">This week</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -left-[10px] bottom-[120px] z-10 -rotate-4 float-medium">
                    <div className="bg-white rounded-full shadow-lg px-4 py-2.5">
                      <span className="text-[13px] font-medium text-black">Just unlocked! 🔥</span>
                    </div>
                  </div>
                  <div className="absolute right-[-10px] bottom-[60px] z-10 -rotate-[9deg] float-slow">
                    <div className="bg-black rounded-[16px] shadow-lg px-4 py-2.5">
                      <span className="text-[13px] text-white">Worth it! ❤️</span>
                    </div>
                  </div>
                  {/* Avatar cluster */}
                  <div className="absolute -left-[20px] bottom-[180px] z-10 flex">
                    <div className="w-[44px] h-[44px] rounded-full border-2 border-white overflow-hidden shadow-lg">
                      <img src={assets.avatar1} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-[44px] h-[44px] rounded-full border-2 border-white overflow-hidden shadow-lg -ml-3">
                      <img src={assets.avatar2} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-[44px] h-[44px] rounded-full border-2 border-white bg-black flex items-center justify-center shadow-lg -ml-3">
                      <span className="text-[11px] font-bold text-white">+12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text that swaps */}
          <div className="flex-1 lg:flex-none lg:w-[400px]">
            {swapSteps.map((step, i) => (
              <div key={step.title} className={`transition-all duration-500 ${activeStep === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute pointer-events-none'}`}>
                <h3 className="font-display text-[clamp(28px,3vw,40px)] font-medium text-black leading-[0.95] tracking-[-0.02em]">{step.title}</h3>
                <p className="text-[clamp(14px,1.4vw,18px)] text-black/60 mt-3 leading-[1.5]">{step.desc}</p>
              </div>
            ))}
            {/* Step indicators */}
            <div className="flex gap-2 mt-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className={`h-[3px] rounded-full transition-all duration-500 ${activeStep === i ? 'w-8 bg-[#A5F41F]' : 'w-3 bg-black/20'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ────────────── Inner content (needs WaitlistContext) ────────────── */
function Site2Inner() {
  const showWaitlist = useWaitlist()
  const [heroDesign, setHeroDesign] = useState(0)

  return (
    <div className="bg-white min-h-screen">
      {/* ═══════ MARQUEE ═══════ */}
      <MarqueeBanner />

      {/* ═══════ NAV — always visible ═══════ */}
      <Nav />

      <main>
        {/* ═══════ HERO ═══════ */}
        <div className="relative">
          {/* Design A: Figma-based hero with photo + video phone */}
          <div className={`transition-opacity duration-500 ${heroDesign === 0 ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden pointer-events-none'}`}>
            <section className="relative min-h-screen overflow-hidden pt-[112px] pb-0">
              <div className="absolute inset-0 pointer-events-none" aria-hidden>
                <img src={assets.heroBackground} alt="" className="absolute inset-0 w-full h-full object-cover opacity-75" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, white 100%)' }} />
              </div>

              <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-8 flex flex-col items-center">
                <div className="relative w-full flex flex-col items-center">
                  <h1 className="font-display text-[clamp(56px,8vw,96px)] font-medium leading-[0.85] text-black tracking-[-0.04em] text-center">
                    Tap. Text. Get Paid.
                  </h1>
                  <p className="text-[clamp(16px,1.6vw,20px)] text-black/60 mt-5 max-w-[672px] text-center leading-[1.4]">
                    No apps. No links. Just text your clients and get paid instantly. Zero fees.
                  </p>
                  <div className="relative mt-10 flex justify-center">
                    <div className="relative rounded-[22px] overflow-hidden w-[clamp(500px,65vw,900px)] h-[clamp(350px,45vw,600px)]">
                      <img src={assets.heroPhoto} alt="People using Tapp'd" className="w-full h-full object-cover" />
                      {/* Fade-out gradient at bottom of image */}
                      <div className="absolute bottom-0 left-0 right-0 h-[120px] pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, white)' }} />
                    </div>
                    <div className="absolute right-[clamp(-40px,-3vw,0px)] top-[20px] lg:right-[40px] w-[clamp(200px,22vw,280px)]">
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
          <div className={`transition-opacity duration-500 ${heroDesign === 1 ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden pointer-events-none'}`}>
            <section
              className="relative min-h-screen overflow-hidden flex flex-col"
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
              <div className="relative z-10 flex justify-center pb-0 -mb-[100px]">
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
                  <div className="absolute left-[-120px] top-[15%] z-10 float-slow">
                    <div className="bg-[#A5F41F]/80 backdrop-blur-sm rounded-[16px] shadow-xl px-5 py-4">
                      <p className="text-[12px] text-black/70">You sent</p>
                      <p className="text-[36px] font-bold text-black leading-none">$50</p>
                    </div>
                  </div>

                  {/* Floating: "+$75 via text" — right */}
                  <div className="absolute right-[-160px] top-[20%] z-10 float-medium">
                    <div className="bg-white rounded-[16px] shadow-xl px-5 py-4">
                      <p className="text-[11px] text-black/50 font-medium uppercase tracking-wider">Incoming <span className="text-[#A5F41F]">&bull;</span></p>
                      <p className="text-[24px] font-bold text-black leading-tight">+$75 via text</p>
                      <p className="text-[12px] text-black/40 mt-0.5">from @maya_k</p>
                    </div>
                  </div>

                  {/* Floating: "Thanks for dinner!" — bottom right */}
                  <div className="absolute right-[-140px] bottom-[20%] z-10 float-slow">
                    <div className="bg-white rounded-[16px] shadow-xl px-5 py-3">
                      <p className="text-[10px] text-black/40 font-medium uppercase tracking-wider">New Message</p>
                      <p className="text-[15px] font-medium text-black">&quot;Thanks for dinner! 📬&quot;</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Arrow toggles — bottom right of hero section */}
          <div className="absolute bottom-8 right-8 z-[200] flex items-center gap-2">
            <button
              onClick={() => setHeroDesign(heroDesign === 0 ? 1 : 0)}
              className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer bg-transparent"
              aria-label="Previous design"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button
              onClick={() => setHeroDesign(heroDesign === 0 ? 1 : 0)}
              className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer bg-transparent"
              aria-label="Next design"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        {/* ═══════ FEATURES SCROLL-SWAP: Send Money → Globe → PayWall ═══════ */}
        <ScrollSwapSection assets={assets} />

        {/* ═══════ BUILT FOR THE NEW ECONOMY — Carousel ═══════ */}
        <section className="bg-[#A5F41F] pt-24 pb-16 overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6 mb-12">
            <h2 className="font-display text-[clamp(40px,5vw,60px)] font-medium text-black leading-[0.95] tracking-[-0.02em]">
              Built for the<br />new economy
            </h2>
          </div>

          {/* Auto-scrolling carousel loop */}
          <div className="relative overflow-hidden pb-8 group/carousel">
            <div
              className="flex gap-6 w-max hover:[animation-play-state:paused]"
              style={{ animation: 'marquee 40s linear infinite' }}
            >
              {/* Render items twice for seamless loop */}
              {[0, 1].map((set) =>
                useCases.map((uc, i) => (
                  <React.Fragment key={`${set}-${uc.label}`}>
                    <div className="shrink-0 w-[340px] bg-white rounded-[24px] p-8 flex flex-col justify-between min-h-[440px] hover:bg-black hover:text-white transition-colors duration-300 group cursor-pointer">
                      <div>
                        <p className="mono text-[11px] text-black/40 group-hover:text-white/40 uppercase mb-4">{uc.label}</p>
                        <h3 className="font-display text-[30px] font-medium leading-tight whitespace-pre-line">{uc.title}</h3>
                        <p className="text-[14px] text-black/60 group-hover:text-white/60 mt-3">{uc.desc}</p>
                      </div>
                      <div className="mt-8">
                        <p className="font-display text-[36px] font-medium text-[#A5F41F]">{uc.stat}</p>
                        <p className="mono text-[11px] text-black/40 group-hover:text-white/40 uppercase">{uc.statLabel}</p>
                      </div>
                    </div>
                    <div className="shrink-0 w-[280px] rounded-[24px] overflow-hidden min-h-[440px]">
                      <img src={i % 2 === 0 ? assets.photo1 : assets.photo2} alt="" className="w-full h-full object-cover" />
                    </div>
                  </React.Fragment>
                ))
              )}
            </div>
          </div>
        </section>

        {/* ═══════ EVERYTHING IN ONE PLACE — FloatingUI ═══════ */}
        <section className="relative pt-24 pb-0 overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <img src={assets.lockedContentBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="relative z-10 max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16 reveal reveal-in">
              <h2 className="font-display text-[clamp(40px,5vw,60px)] font-medium text-black leading-[0.95] tracking-[-0.02em]">
                Everything in<br />one place
              </h2>
              <p className="text-[clamp(16px,1.4vw,20px)] text-black/60 mt-4 max-w-[612px] mx-auto leading-[1.5]">
                Payments, locked content, mass texts. All through your phone. Zero complexity.
              </p>
            </div>
          </div>

          {/* FloatingUI with its internal heading + background hidden */}
          <style>{`
            .site2-floating-ui section { background: transparent !important; }
            .site2-floating-ui .text-center.mb-14 { display: none !important; }
            .site2-floating-ui .text-center.lg\\:mb-20 { display: none !important; }
            .site2-floating-ui section > .absolute { display: none !important; }
          `}</style>
          <div className="site2-floating-ui" style={{ marginTop: '-2rem' }}>
            <FloatingUI />
          </div>

          {/* Fade-out gradient into next section */}
          <div className="h-[120px] relative z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, white)' }} />
        </section>

        {/* ═══════ BENTO GRID ═══════ */}
        <div className="[&_section]:!rounded-none" style={{ ['--bento-bg' as string]: 'transparent' }}>
          <style>{`.site2-bento > section { background: white !important; }`}</style>
          <div className="site2-bento">
            <BentoGrid />
          </div>
        </div>

        {/* ═══════ FEATURES: LOCK YOUR CONTENT ═══════ */}
        <section className="py-24 bg-gradient-to-b from-transparent to-white">
          <div className="max-w-[1200px] mx-auto px-6">
            {/* Lock your content */}
            <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
              <div className="flex-1">
                <h2 className="font-display text-[clamp(40px,5vw,60px)] font-medium text-black leading-[0.95] tracking-[-0.02em]">
                  Lock your<br />content
                </h2>
                <p className="text-[18px] text-black/60 mt-6 max-w-[567px] leading-relaxed">
                  Photos, videos, messages. Set your price. They pay to unlock. You get paid instantly. Perfect for exclusive content, tutorials, or premium offerings.
                </p>
                <div className="flex flex-col gap-4 mt-8">
                  <CheckItem>Any file type supported</CheckItem>
                  <CheckItem>Set your own pricing</CheckItem>
                  <CheckItem>Instant payouts</CheckItem>
                </div>
              </div>

              <div className="shrink-0">
                <div className="bg-black rounded-[24px] shadow-2xl w-[384px] max-w-full overflow-hidden">
                  <div className="relative w-full h-[320px] overflow-hidden rounded-t-[16px] m-8 mb-0" style={{ background: 'linear-gradient(135deg, #1E2939 0%, #101828 100%)', width: 'calc(100% - 64px)' }}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                      <img src={assets.contentCard} alt="" className="w-1/2 h-auto" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[72px]">🔒</span>
                    </div>
                  </div>
                  <div className="p-8 pt-6">
                    <p className="text-[14px] text-white/50">Premium Content</p>
                    <p className="font-display text-[24px] font-medium text-white mt-1">Unlock exclusive access</p>
                    <button className="bg-[#A5F41F] text-black text-[14px] font-medium py-4 rounded-full w-full mt-6 hover:bg-[#94DC1B] transition-colors cursor-pointer">
                      Pay $15 to unlock
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Text everyone at once */}
            <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
              <div className="shrink-0">
                <div className="bg-[#A5F41F] rounded-[24px] shadow-2xl w-[384px] max-w-full p-8">
                  <div className="bg-black/10 rounded-[16px] p-6 mb-6">
                    <p className="text-[12px] text-black/60 mb-4">Compose message</p>
                    <div className="bg-white/50 rounded-[14px] p-4 min-h-[100px]">
                      <p className="text-[14px] text-black/50">Write your message...</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[14px] text-black/60">Recipients</span>
                    <span className="font-display text-[20px] font-medium text-black">1,247</span>
                  </div>
                  <button className="bg-black text-white text-[14px] font-medium py-4 rounded-full w-full hover:bg-black/80 transition-colors cursor-pointer">
                    Send to all clients
                  </button>
                </div>
              </div>

              <div className="flex-1">
                <h2 className="font-display text-[clamp(40px,5vw,60px)] font-medium text-black leading-[0.95] tracking-[-0.02em]">
                  Text everyone<br />at once
                </h2>
                <p className="text-[18px] text-black/60 mt-6 max-w-[542px] leading-relaxed">
                  Send updates, promotions, or announcements to your entire client list instantly. Track open rates and responses in real-time.
                </p>
                <div className="flex flex-col gap-4 mt-8">
                  <CheckItem dark>Unlimited contacts</CheckItem>
                  <CheckItem dark>90%+ open rate</CheckItem>
                  <CheckItem dark>Real-time analytics</CheckItem>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ ZERO FEES ═══════ */}
        <section className="relative py-32 min-h-[800px] flex items-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <img src={assets.zeroFeesBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, transparent 79%, white 100%), linear-gradient(180deg, transparent 15%, #090B06 88%)' }} />
          </div>

          <div className="relative z-10 max-w-[1024px] mx-auto px-6 text-center">
            <p className="font-display text-[clamp(200px,25vw,320px)] font-medium text-[#A5F41F] leading-none">0%</p>

            <p className="text-[clamp(18px,2.5vw,30px)] text-white mt-4">
              Not &quot;low fees.&quot; Not &quot;competitive rates.&quot;
            </p>

            <p className="font-display text-[clamp(30px,4vw,48px)] font-medium text-white mt-4">
              Zero. Forever.
            </p>

            <FeeSlideshow />

            <p className="text-[14px] text-white/50 mt-10">
              Keep every dollar you earn. No hidden costs. Ever.
            </p>
          </div>
        </section>

        {/* ═══════ FINAL CTA ═══════ */}
        <section className="bg-[#090B06] py-32 relative overflow-hidden">
          {/* Floating 3D graphics from Figma */}
          <img src="/site2/cta-dollar.svg" alt="" className="absolute left-[3%] top-[15%] w-[80px] md:w-[120px] h-auto -rotate-15 pointer-events-none float-slow" />
          <img src="/site2/cta-star.svg" alt="" className="absolute right-[10%] top-[3%] w-[60px] md:w-[90px] h-auto -rotate-15 pointer-events-none float-medium" />
          <img src="/site2/cta-bubble.svg" alt="" className="absolute right-[3%] bottom-[10%] w-[100px] md:w-[160px] h-auto -rotate-[12deg] pointer-events-none float-slow" />

          <div className="relative z-10 max-w-[896px] mx-auto px-6 text-center">
            <h2 className="font-display text-[clamp(48px,6vw,72px)] font-medium text-white leading-[0.95] tracking-[-0.02em]">
              Ready to get<br />Tapp&apos;d?
            </h2>

            <p className="text-[20px] text-white/60 mt-6 max-w-[655px] mx-auto">
              Join thousands of creators and businesses getting paid faster with zero fees.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
              <button
                onClick={showWaitlist}
                className="bg-[#A5F41F] text-black text-[18px] font-semibold px-12 py-5 rounded-full hover:bg-[#94DC1B] transition-colors cursor-pointer"
              >
                Download now
              </button>
              <button className="backdrop-blur-[35px] border-2 border-white/50 text-white text-[18px] font-semibold px-12 py-5 rounded-full hover:bg-white/10 transition-colors cursor-pointer bg-white/10">
                Learn more
              </button>
            </div>

            <p className="text-[14px] text-white/40 mt-8">
              No credit card &bull; Free forever &bull; 0% fees
            </p>
          </div>
        </section>
      </main>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="bg-[#A5F41F] pt-20 pb-12 px-6 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-6 mb-4">
            <TappdIcon className="w-[55px] h-auto text-black" />
            <span className="font-display text-[clamp(48px,8vw,90px)] font-medium text-black leading-none">tappd</span>
          </div>
          <p className="text-[clamp(18px,2vw,26px)] text-black/60 max-w-[570px] leading-relaxed">
            The simplest way to get paid. No apps, no links, just text.
          </p>

          <div className="flex items-center justify-between flex-wrap gap-4 mt-20 pt-8 border-t border-black/10">
            <span className="text-[14px] text-black/60">&copy; 2026 Tappd. All rights reserved.</span>
            <div className="flex items-center gap-6">
              {['Twitter', 'Instagram', 'LinkedIn', 'TikTok'].map((link) => (
                <a key={link} href="#" className="text-[14px] text-black/60 hover:text-black transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
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
