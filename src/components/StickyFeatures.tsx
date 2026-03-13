'use client'
import { useEffect, useRef, useState } from 'react'
import { CurrencyDollar, LockSimple, PhoneCall, Megaphone } from '@phosphor-icons/react'

const features = [
  { label: '01 — Tips', title: 'One tap. Instant gratitude.', desc: 'Let your community show appreciation with one-tap payments mid-conversation. No links, no redirects — just seamless value exchange.', img: 'Tips interface', icon: CurrencyDollar },
  { label: '02 — Locked Content', title: 'Gate it. Earn from it.', desc: 'Photos, videos, or messages behind a paywall — fans unlock what they want, you earn what you deserve.', img: 'Content paywall', icon: LockSimple },
  { label: '03 — Paid Calls', title: 'Your time. Your rate.', desc: '1-on-1 voice or video sessions billed per minute or flat rate. Booked, confirmed, and paid — all inside the thread.', img: 'Call scheduling', icon: PhoneCall },
  { label: '04 — Mass Messaging', title: 'Blast it. Make it personal.', desc: 'Reach your entire client book with messages that never feel automated. Every message feels one-to-one, even at scale.', img: 'Campaign dashboard', icon: Megaphone },
]

export default function StickyFeatures() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [userClicked, setUserClicked] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      if (userClicked) return
      const rect = container.getBoundingClientRect()
      const scrollableHeight = container.scrollHeight - window.innerHeight
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight))
      const index = Math.min(features.length - 1, Math.floor(progress * features.length))
      setActiveIndex(index)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [userClicked])

  const handleTabClick = (i: number) => {
    setActiveIndex(i)
    setUserClicked(true)
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current)
    clickTimeoutRef.current = setTimeout(() => setUserClicked(false), 2000)
  }

  return (
    <section id="product" className="relative z-[3]">
      <div ref={containerRef} style={{ height: `${features.length * 100 + 50}vh` }} className="relative">
        <div className="sticky top-0 h-screen bg-white overflow-hidden">
          <div className="h-full flex flex-col justify-end pb-12 px-4 md:px-8 lg:px-10 xl:px-12">
            <div className="mb-8">
              <p className="mono text-[11px] text-black/40 uppercase mb-5">Product</p>
              <h2 className="font-light text-black tracking-[-0.04em] leading-[0.95] max-w-[700px]" style={{ fontSize: 'clamp(44px, 7vw, 80px)' }}>
                Built for the conversation economy
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 flex-1 max-h-[60vh]">
              <div className="flex flex-col justify-center relative">
                {features.map((f, i) => (
                  <div
                    key={f.label}
                    className="absolute inset-0 flex flex-col justify-center transition-all duration-700"
                    style={{
                      opacity: activeIndex === i ? 1 : 0,
                      transform: activeIndex === i ? 'translateY(0)' : activeIndex > i ? 'translateY(-40px)' : 'translateY(40px)',
                    }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <f.icon size={20} weight="light" className="text-black" />
                      <p className="mono text-[12px] text-black uppercase">{f.label}</p>
                    </div>
                    <h3 className="text-[32px] md:text-[40px] font-light text-black tracking-[-0.03em] leading-[1.1] mb-5">{f.title}</h3>
                    <p className="text-[16px] font-light text-[#71717A] leading-[1.65] max-w-[440px]">{f.desc}</p>
                  </div>
                ))}
              </div>

              <div className="hidden lg:flex items-center">
                <div className="w-full rounded-lg overflow-hidden relative" style={{ aspectRatio: '4 / 3' }}>
                  <video
                    src="/a5964603cb2e4a249ac8a336c1a0239d.HD-1080p-7.2Mbps-14082701.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Clickable tab pills */}
            <div className="flex gap-2 mt-4">
              {features.map((f, i) => (
                <button
                  key={f.label}
                  onClick={() => handleTabClick(i)}
                  className={`mono text-[14px] px-7 py-3.5 rounded-lg transition-all duration-400 cursor-pointer inline-flex items-center gap-2.5 ${
                    activeIndex === i
                      ? 'bg-[#39FF78] text-black'
                      : 'border border-black text-black hover:bg-black hover:text-white'
                  }`}
                >
                  <f.icon size={16} weight="light" />
                  {f.label.split(' — ')[1]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
