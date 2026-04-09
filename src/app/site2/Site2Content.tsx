'use client'

import React from 'react'
import { useWaitlist } from '@/components/WaitlistContext'
import WaitlistProvider from '@/components/WaitlistContext'
import MarqueeBanner from '@/components/MarqueeBanner'
import FloatingUI from '@/components/FloatingUI'
import BentoGrid from '@/components/BentoGrid'
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

/* ────────────── Inner content (needs WaitlistContext) ────────────── */
function Site2Inner() {
  const showWaitlist = useWaitlist()

  return (
    <div className="bg-white min-h-screen">
      {/* ═══════ MARQUEE ═══════ */}
      <MarqueeBanner />

      {/* ═══════ HEADER ═══════ */}
      <header className="fixed top-[32px] left-0 right-0 z-50 h-[80px] flex items-center justify-between px-6">
        <TappdLogo className="h-[28px] w-auto text-black" />
        <button
          onClick={showWaitlist}
          className="bg-black text-white text-[14px] font-medium px-6 py-3 rounded-full hover:bg-black/80 transition-colors cursor-pointer"
        >
          Get Tapp&apos;d
        </button>
      </header>

      <main>
        {/* ═══════ HERO ═══════ */}
        <section className="relative min-h-screen overflow-hidden pt-[112px]">
          {/* Background image with gradient fade */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <img src={assets.heroBackground} alt="" className="absolute inset-0 w-full h-full object-cover opacity-75" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, white 100%)' }} />
          </div>

          <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-8 flex flex-col items-center">
            <div className="relative w-full">
              {/* Headline */}
              <h1 className="font-display text-[clamp(48px,7vw,83px)] font-medium leading-[0.9] text-black tracking-tight">
                Tap. Text. Get Paid.
              </h1>

              {/* Subheadline — between headline and photo */}
              <p className="text-[18px] text-black/70 mt-6 max-w-[672px]">
                No apps. No links. Just text your clients and get paid instantly. Zero fees.
              </p>

              {/* Photo + Phone arrangement */}
              <div className="relative mt-10 flex justify-center">
                {/* Main photo */}
                <div className="relative rounded-[22px] overflow-hidden w-[clamp(400px,60vw,840px)] h-[clamp(300px,40vw,560px)]">
                  <img src={assets.heroPhoto} alt="People using Tapp'd" className="w-full h-full object-cover" />
                </div>

                {/* Phone mockup with video — overlapping right edge of photo */}
                <div className="absolute right-[clamp(-60px,-5vw,-20px)] top-[20px] lg:right-[60px] w-[clamp(180px,20vw,240px)]">
                  <div className="bg-black rounded-[clamp(28px,4vw,44px)] p-[clamp(6px,1vw,9px)] shadow-2xl shadow-black/30">
                    <div className="absolute top-[clamp(8px,1.5vw,14px)] left-1/2 -translate-x-1/2 z-20 w-[clamp(60px,12vw,100px)] h-[clamp(18px,2vw,22px)] bg-black rounded-full" />
                    <div className="relative rounded-[clamp(22px,3.5vw,36px)] overflow-hidden bg-black" style={{ aspectRatio: '9 / 19.5' }}>
                      <video src="/demo.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ SEND MONEY ═══════ */}
        <section className="relative py-24 overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
            {/* Left: Phone with floating elements — matching Figma */}
            <div className="relative flex-1 flex justify-center py-8">
              <div className="relative w-[420px] h-[500px]">
                {/* Avatar - top left */}
                <div className="absolute left-[120px] top-[220px] w-[75px] h-[75px] rounded-full overflow-hidden shadow-xl rotate-[4deg] float-slow z-10">
                  <img src={assets.avatar1} alt="" className="w-full h-full object-cover" />
                </div>
                {/* Avatar - top right */}
                <div className="absolute right-[30px] top-[60px] w-[70px] h-[70px] rounded-full overflow-hidden shadow-xl -rotate-[34deg] float-medium z-10">
                  <img src={assets.avatar2} alt="" className="w-full h-full object-cover" />
                </div>

                {/* Phone mockup — tilted */}
                <div className="absolute left-[80px] top-[40px] w-[240px] -rotate-[11deg] z-[5]">
                  <div className="rounded-[36px] overflow-hidden shadow-2xl">
                    <img src={assets.phoneMockup} alt="Send Money screen" className="w-full h-auto" />
                  </div>
                </div>

                {/* Floating $50 card */}
                <div className="absolute right-[20px] top-[100px] -rotate-[22deg] float-medium z-10">
                  <div className="backdrop-blur-lg bg-white/30 border border-white/50 rounded-[20px] shadow-xl px-6 py-5">
                    <p className="font-display text-[44px] font-bold text-black text-center leading-none">$50</p>
                    <p className="text-[12px] text-gray-600 text-center mt-1">Enter amount</p>
                  </div>
                </div>

                {/* Floating "Instant" pill */}
                <div className="absolute right-[60px] top-[230px] -rotate-[22deg] float-fast z-10">
                  <div className="bg-black rounded-full shadow-lg px-4 py-2.5 flex items-center gap-2">
                    <span className="text-[16px]">⚡</span>
                    <span className="text-[12px] font-bold text-white">Instant</span>
                  </div>
                </div>

                {/* Contact card - glass */}
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

                {/* "You sent" badge */}
                <div className="absolute left-[20px] top-[280px] rotate-[1deg] float-slow z-10">
                  <div className="backdrop-blur-lg bg-[#A5F41F]/50 border border-[#A5F41F]/50 rounded-[16px] shadow-lg px-4 py-2.5">
                    <p className="text-[10px] text-black">You sent</p>
                    <p className="text-[24px] font-bold text-black leading-tight">$50</p>
                  </div>
                </div>

                {/* "Secure" pill */}
                <div className="absolute left-[10px] bottom-[30px] -rotate-[18deg] float-medium z-10">
                  <div className="bg-white rounded-full shadow-lg px-4 py-2.5 flex items-center gap-1.5">
                    <span className="text-[16px]">🔒</span>
                    <span className="text-[12px] font-bold text-black">Secure</span>
                  </div>
                </div>

                {/* Money emoji */}
                <div className="absolute right-[10px] bottom-[100px] -rotate-[22deg] float-slow z-10">
                  <span className="text-[56px]">💵</span>
                </div>

                {/* Send Now button */}
                <div className="absolute left-[110px] bottom-[15px] z-10">
                  <div className="bg-[#A5F41F] rounded-full shadow-lg px-10 py-3.5">
                    <span className="text-[14px] font-bold text-black">Send Now</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Text */}
            <div className="flex-1 lg:flex-none">
              <h3 className="font-display text-[28px] font-medium text-black">Text-based payments</h3>
              <p className="text-[14px] text-black/60 mt-1">Works with any phone number. No apps required.</p>
            </div>
          </div>
        </section>

        {/* ═══════ BUILT FOR THE NEW ECONOMY — Carousel ═══════ */}
        <section className="bg-[#A5F41F] pt-24 pb-16 overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6 mb-12">
            <h2 className="font-display text-[clamp(40px,5vw,60px)] font-medium text-black leading-[1.25]">
              Built for the<br />new economy
            </h2>
          </div>

          {/* Horizontal carousel */}
          <div className="flex gap-6 px-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
            {/* Spacer for left alignment */}
            <div className="shrink-0 w-[max(0px,calc((100%-1200px)/2))]" />

            {useCases.map((uc, i) => (
              <React.Fragment key={uc.label}>
                {/* Use case card */}
                <div className="shrink-0 w-[340px] snap-start bg-white rounded-[24px] p-8 flex flex-col justify-between min-h-[440px] hover:bg-black hover:text-white transition-colors duration-300 group cursor-pointer">
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

                {/* Photo card */}
                <div className="shrink-0 w-[280px] snap-start rounded-[24px] overflow-hidden min-h-[440px]">
                  <img src={i % 2 === 0 ? assets.photo1 : assets.photo2} alt="" className="w-full h-full object-cover" />
                </div>
              </React.Fragment>
            ))}

            {/* Right spacer */}
            <div className="shrink-0 w-6" />
          </div>
        </section>

        {/* ═══════ EVERYTHING IN ONE PLACE — FloatingUI ═══════ */}
        <section className="relative pt-24 pb-12 overflow-hidden">
          {/* Actual gradient background image from Figma */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <img src={assets.lockedContentBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="relative z-10 max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-display text-[clamp(40px,5vw,60px)] font-medium text-black leading-[1.25]">
                Everything in<br />one place
              </h2>
              <p className="text-[20px] text-black/60 mt-6 max-w-[612px] mx-auto">
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
                <h2 className="font-display text-[clamp(40px,5vw,60px)] font-medium text-black leading-[1.25]">
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
                <h2 className="font-display text-[clamp(40px,5vw,60px)] font-medium text-black leading-[1.25]">
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

            <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
              {[
                { name: 'Venmo charges 3%', highlight: false },
                { name: 'PayPal charges 2.9%', highlight: false },
                { name: 'Cash App charges 2.75%', highlight: false },
                { name: 'Tappd charges 0%', highlight: true },
              ].map((item) => (
                <div
                  key={item.name}
                  className={`backdrop-blur-[35px] rounded-full px-6 py-3 text-[14px] ${
                    item.highlight
                      ? 'bg-[#A5F41F] text-black font-semibold'
                      : 'border border-white text-white shadow-lg'
                  }`}
                >
                  {item.name}
                </div>
              ))}
            </div>

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
            <h2 className="font-display text-[clamp(48px,6vw,72px)] font-medium text-white leading-[1.25]">
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
