'use client'
import { useEffect, useRef, useState } from 'react'
import { CurrencyDollar, LockSimple, PhoneCall, Megaphone, Check, LockKey } from '@phosphor-icons/react'

/* ─── Card data ──────────────────────────────────────────────── */
const cards = [
  {
    label: 'Tips',
    Icon: CurrencyDollar,
    title: 'Get tipped\nmid-convo.',
    desc: 'One tap. Zero fees.',
    stat: '0%',
    statLabel: 'Platform fee',
    bg: '#A5F41F',
    textColor: '#000',
    mutedColor: 'rgba(0,0,0,0.45)',
    accentColor: '#000',
  },
  {
    label: 'Locked Content',
    Icon: LockSimple,
    title: 'Lock it.\nEarn it.',
    desc: 'Gate your best work.',
    stat: '85%',
    statLabel: 'Unlock rate',
    bg: '#0D0D0F',
    textColor: '#fff',
    mutedColor: 'rgba(255,255,255,0.38)',
    accentColor: '#A5F41F',
  },
  {
    label: 'Paid Calls',
    Icon: PhoneCall,
    title: 'Talk money.',
    desc: 'Get paid before you pick up.',
    stat: '8,500+',
    statLabel: 'Calls booked',
    bg: '#F0F0EE',
    textColor: '#0D0D0F',
    mutedColor: 'rgba(0,0,0,0.38)',
    accentColor: '#0D0D0F',
  },
  {
    label: 'Mass Messaging',
    Icon: Megaphone,
    title: 'Blast without\nthe spam.',
    desc: 'Personalized. Revenue-driving.',
    stat: '98%',
    statLabel: 'Delivery rate',
    bg: '#1A1A1D',
    textColor: '#fff',
    mutedColor: 'rgba(255,255,255,0.38)',
    accentColor: '#A5F41F',
  },
]

/* ─── Satellite UI widgets ───────────────────────────────────── */

/* Landscape "payment confirmed" card — sits in front of main card, bottom-left */
function PaymentCard({ amount, from, note }: { amount: string; from: string; note?: string }) {
  return (
    <div style={{
      width: 260, background: '#fff', borderRadius: 20,
      boxShadow: '0 16px 60px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.15)',
      overflow: 'hidden',
    }}>
      <div style={{ background: '#A5F41F', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#000', letterSpacing: '-0.02em' }}>Payment received</span>
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Check size={12} weight="bold" style={{ color: '#A5F41F' }} />
        </div>
      </div>
      <div style={{ padding: '16px 20px' }}>
        <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.05em', color: '#000', lineHeight: 1, fontFamily: 'var(--font-geist-mono)' }}>{amount}</div>
        <div style={{ fontSize: 12, color: '#71717A', marginTop: 4 }}>from {from}</div>
        {note && <div style={{ marginTop: 10, background: '#F4F4F5', borderRadius: 10, padding: '6px 12px', fontSize: 12, color: '#444' }}>{note}</div>}
      </div>
    </div>
  )
}

/* Small floating chip — top-right area */
function FloatChip({ icon, text, accent }: { icon: React.ReactNode; text: string; accent?: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      background: accent ? '#A5F41F' : '#fff',
      borderRadius: 40, padding: '10px 16px',
      boxShadow: '0 8px 28px rgba(0,0,0,0.22)',
      whiteSpace: 'nowrap' as const,
    }}>
      {icon}
      <span style={{ fontSize: 13, fontWeight: 600, color: accent ? '#000' : '#18181B' }}>{text}</span>
    </div>
  )
}

/* Landscape unlock card — bottom-left */
function UnlockCard() {
  return (
    <div style={{
      width: 270, background: '#1A1A1D', borderRadius: 20,
      boxShadow: '0 16px 60px rgba(0,0,0,0.4)',
      overflow: 'hidden',
    }}>
      {/* Blurred preview area */}
      <div style={{
        height: 120, background: 'linear-gradient(135deg, #2A2A2E 0%, #1A1A1D 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' as const,
      }}>
        <div style={{ fontSize: 48, filter: 'blur(10px)', opacity: 0.35 }}>📸</div>
        <div style={{
          position: 'absolute' as const, inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' as const, gap: 6,
        }}>
          <LockKey size={28} style={{ color: 'rgba(255,255,255,0.5)' }} />
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' as const, letterSpacing: '0.06em', fontWeight: 500 }}>1 exclusive photo</span>
        </div>
      </div>
      <div style={{ padding: '14px 16px' }}>
        <div style={{ background: '#A5F41F', borderRadius: 40, padding: '10px 0', textAlign: 'center' as const, fontSize: 13, fontWeight: 700, color: '#000', cursor: 'default' }}>
          Unlock for $4.00
        </div>
      </div>
    </div>
  )
}

/* Live call card — bottom-left for calls */
function LiveCallCard() {
  const [secs, setSecs] = useState(272)
  useEffect(() => {
    const t = setInterval(() => setSecs(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [])
  const m = String(Math.floor(secs / 60)).padStart(2, '0')
  const s = String(secs % 60).padStart(2, '0')
  return (
    <div style={{
      width: 260, background: '#fff', borderRadius: 20,
      boxShadow: '0 16px 60px rgba(0,0,0,0.28)',
      padding: '18px 20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 11, color: '#71717A', textTransform: 'uppercase' as const, letterSpacing: '0.06em', fontWeight: 500 }}>Active Call</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#A5F41F', boxShadow: '0 0 8px rgba(165,244,31,0.9)' }} />
          <span style={{ fontSize: 11, color: '#A5F41F', fontWeight: 600 }}>LIVE</span>
        </div>
      </div>
      <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: '0.04em', color: '#0A0A0B', fontFamily: 'monospace', lineHeight: 1 }}>{m}:{s}</div>
      <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, color: '#71717A' }}>Billing at $2.00/min</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#0A0A0B', fontFamily: 'var(--font-geist-mono)', letterSpacing: '-0.03em' }}>
          ${(secs / 60 * 2).toFixed(2)}
        </span>
      </div>
    </div>
  )
}

/* Campaign stats card — bottom-left for mass messaging */
function CampaignCard() {
  return (
    <div style={{
      width: 260, background: '#fff', borderRadius: 20,
      boxShadow: '0 16px 60px rgba(0,0,0,0.28)',
      padding: '18px 20px',
    }}>
      <div style={{ fontSize: 11, color: '#71717A', textTransform: 'uppercase' as const, letterSpacing: '0.06em', fontWeight: 500, marginBottom: 8 }}>Campaign sent</div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.04em', color: '#0A0A0B', lineHeight: 1, fontFamily: 'var(--font-geist-mono)' }}>47K</div>
          <div style={{ fontSize: 11, color: '#71717A', marginTop: 2 }}>Recipients</div>
        </div>
        <div style={{ width: 1, background: '#E4E4E7' }} />
        <div>
          <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.04em', color: '#0A0A0B', lineHeight: 1, fontFamily: 'var(--font-geist-mono)' }}>98%</div>
          <div style={{ fontSize: 11, color: '#71717A', marginTop: 2 }}>Delivered</div>
        </div>
      </div>
      <div style={{ background: '#A5F41F', borderRadius: 10, padding: '6px 12px', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <Check size={12} weight="bold" />
        <span style={{ fontSize: 12, fontWeight: 600 }}>All delivered</span>
      </div>
    </div>
  )
}

/* ─── Satellite layout per card ──────────────────────────────── */
// tx/ty = offset from center of composition
// Card is ~300px wide × 560px tall → edges at ±150px / ±280px

function Satellites({ index, opacity }: { index: number; opacity: number }) {
  const style = (tx: number, ty: number, rot: number, delay = 0, z = 10) => ({
    position: 'absolute' as const,
    left: '50%', top: '50%',
    transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${rot}deg)`,
    opacity,
    transition: 'opacity 0.15s ease-out',
    animationDelay: `${delay}s`,
    zIndex: z,
    pointerEvents: 'none' as const,
  })

  if (index === 0) return (
    <>
      {/* "$50 Enter amount" big glass card — top-right, rotated */}
      <div style={style(200, -200, -11, 0, 12)}>
        <div className="float-slow">
          <div
            style={{
              width: 213,
              height: 159,
              borderRadius: 28,
              border: '1px solid rgba(255,255,255,0.5)',
              backgroundImage:
                'linear-gradient(62deg, rgba(255,255,255,0.25) 10%, rgba(255,255,255,0.06) 77%)',
              backdropFilter: 'blur(35px)',
              WebkitBackdropFilter: 'blur(35px)',
              boxShadow:
                '0 1.2px 30px 0 rgba(69,42,124,0.1), inset 10px 10px 29px 0 rgba(255,255,255,0.25)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <p style={{ fontSize: 60, fontWeight: 700, color: '#0a0a0a', lineHeight: 1, letterSpacing: '0.01em' }}>$50</p>
            <p style={{ fontSize: 14, color: '#000', lineHeight: 1 }}>Enter amount</p>
          </div>
        </div>
      </div>

      {/* "⚡ Instant" dark pill — right side under the $50 card */}
      <div style={style(220, -70, -11, 0.3, 13)}>
        <div className="float-medium">
          <div
            style={{
              height: 52,
              width: 117,
              borderRadius: 999,
              background: '#000',
              boxShadow: '0 8px 24px 0 rgba(0,0,0,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <span style={{ fontSize: 18 }}>⚡</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>Instant</span>
          </div>
        </div>
      </div>

      {/* "You sent $50" green glass card — mid-left, rotated */}
      <div style={style(-215, -50, 12, 0.15, 12)}>
        <div className="float-slow">
          <div
            style={{
              width: 107,
              height: 88,
              borderRadius: 24,
              border: '1px solid rgba(166,245,31,0.5)',
              backgroundImage:
                'linear-gradient(37deg, rgba(165,244,31,0.6) 8%, rgba(166,245,31,0.08) 100%)',
              backdropFilter: 'blur(35px)',
              WebkitBackdropFilter: 'blur(35px)',
              boxShadow:
                '0 1.2px 30px 0 rgba(69,42,124,0.12), inset 10px 10px 29px 0 rgba(255,255,255,0.35)',
              padding: '15px 23px',
            }}
          >
            <p style={{ fontSize: 12, color: '#000', lineHeight: 1, marginBottom: 10 }}>You sent</p>
            <p style={{ fontSize: 30, fontWeight: 700, color: '#0a0a0a', lineHeight: 1, letterSpacing: '0.01em' }}>$50</p>
          </div>
        </div>
      </div>

      {/* "🔒 Secure" white pill — bottom-left, rotated */}
      <div style={style(-225, 140, -8, 0.5, 13)}>
        <div className="float-medium">
          <div
            style={{
              height: 52,
              borderRadius: 999,
              background: '#fff',
              boxShadow: '0 8px 24px 0 rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 7,
              padding: '0 16px',
            }}
          >
            <span style={{ fontSize: 18 }}>🔒</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#000', letterSpacing: '-0.01em' }}>Secure</span>
          </div>
        </div>
      </div>

      {/* Money bundle emoji 💵 — right side */}
      <div style={style(240, 100, -11, 0.7, 11)}>
        <div className="float-slow">
          <span style={{ fontSize: 85, lineHeight: 1, display: 'block', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.25))' }}>💵</span>
        </div>
      </div>

      {/* Top-right person avatar (placeholder gradient circle) */}
      <div style={style(175, -280, 14, 0.2, 11)}>
        <div className="float-medium">
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8B5A3C 0%, #3A2419 60%, #1A0F08 100%)',
              boxShadow: '0 9px 35px -2px rgba(0,0,0,0.3)',
              border: '2px solid rgba(255,255,255,0.3)',
            }}
          />
        </div>
      </div>

      {/* Mid-left sunglasses avatar (placeholder gradient circle) */}
      <div style={style(-210, -190, -24, 0.4, 11)}>
        <div className="float-slow">
          <div
            style={{
              width: 81,
              height: 81,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #F4C79C 0%, #C89470 50%, #5A3A26 100%)',
              boxShadow: '0 9px 37px -2px rgba(0,0,0,0.3)',
              border: '2px solid rgba(255,255,255,0.3)',
            }}
          />
        </div>
      </div>
    </>
  )

  if (index === 1) return (
    <>
      {/* Bottom-left: unlock card overlapping bottom of main card */}
      <div className="float-slow" style={style(-215, 240, -6, 0, 12)}>
        <UnlockCard />
      </div>
      {/* Top-right: lock chip */}
      <div className="float-medium" style={style(180, -265, 7, 0.4, 10)}>
        <FloatChip icon={<LockSimple size={15} style={{ color: '#18181B' }} />} text="Paywall protected" />
      </div>
    </>
  )

  if (index === 2) return (
    <>
      {/* Bottom-left: live call card */}
      <div className="float-slow" style={style(-215, 220, -4, 0, 12)}>
        <LiveCallCard />
      </div>
      {/* Top-right: rate chip */}
      <div className="float-medium" style={style(185, -265, 6, 0.5, 10)}>
        <FloatChip icon={<span style={{ fontSize: 16 }}>📞</span>} text="$2.00 / min" />
      </div>
    </>
  )

  if (index === 3) return (
    <>
      {/* Bottom-left: campaign stats card */}
      <div className="float-slow" style={style(-215, 225, -5, 0, 12)}>
        <CampaignCard />
      </div>
      {/* Top-right: delivery chip */}
      <div className="float-medium" style={style(185, -265, 5, 0.5, 10)}>
        <FloatChip accent icon={<Check size={15} weight="bold" />} text="98% delivered" />
      </div>
    </>
  )

  return null
}

/* ─── Flip state math ────────────────────────────────────────── */
function getFlipState(p: number, n: number): { angle: number; cardIndex: number } {
  const zoneSize = 1 / n
  const zoneIndex = Math.min(Math.floor(p / zoneSize), n - 1)
  if (zoneIndex === 0) return { angle: 0, cardIndex: 0 }
  const ti = zoneIndex - 1
  const localP = Math.min((p - zoneIndex * zoneSize) / zoneSize, 1)
  if (localP <= 0.5) {
    return { angle: (localP / 0.5) * 90, cardIndex: ti }
  } else {
    return { angle: -90 + ((localP - 0.5) / 0.5) * 90, cardIndex: Math.min(ti + 1, n - 1) }
  }
}

/* ─── Main component ─────────────────────────────────────────── */
export default function StickyFeatures() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [angle, setAngle] = useState(0)
  const [cardIndex, setCardIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const el = wrapperRef.current
      if (!el) return
      const scrolled = Math.max(0, -el.getBoundingClientRect().top)
      const range = Math.max(1, el.offsetHeight - window.innerHeight)
      const p = Math.min(1, scrolled / range)
      setScrollProgress(p)
      const { angle: a, cardIndex: ci } = getFlipState(p, cards.length)
      setAngle(a)
      setCardIndex(ci)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  const card = cards[cardIndex]
  const contentOpacity = Math.max(0, 1 - Math.abs(angle) / 50)

  return (
    <div
      ref={wrapperRef}
      id="product"
      className="relative z-[3]"
      style={{ height: '800vh' }}
    >
      <section className="h-screen sticky top-0 overflow-hidden flex items-center justify-center" style={{ background: '#ffffff' }}>

        {/* Two-column layout: phone composition LEFT, copy RIGHT */}
        <div className="w-full max-w-[1360px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16 items-center">

          {/* LEFT: Composition wrapper (phone + satellites) — phone pushed right-of-center in col so satellites can extend both directions */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', overflow: 'visible', paddingLeft: 'clamp(40px, 6vw, 120px)' }}>

            {/* Satellites */}
            <Satellites index={cardIndex} opacity={contentOpacity} />

            {/* 3D flip card — phone proportions */}
            <div style={{ perspective: '1400px', perspectiveOrigin: '50% 50%', position: 'relative', zIndex: 5 }}>
            <div
              style={{
                transform: `rotateY(${angle}deg)`,
                willChange: 'transform',
                width: 'clamp(260px, 22vw, 320px)',
                height: 'clamp(480px, 62vh, 580px)',
                borderRadius: 36,
                background: card.bg,
                boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '32px 28px',
                overflow: 'hidden',
                opacity: contentOpacity,
              }}
            >
              {/* Top */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <card.Icon size={26} weight="light" style={{ color: card.textColor, opacity: 0.3 }} />
                <span className="mono text-[10px] uppercase tracking-widest" style={{ color: card.mutedColor }}>{card.label}</span>
              </div>

              {/* Middle */}
              <div>
                <h2 style={{
                  color: card.textColor,
                  fontSize: 'clamp(28px, 3vw, 40px)',
                  fontWeight: 500,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.08,
                  whiteSpace: 'pre-line',
                  marginBottom: 10,
                }}>
                  {card.title}
                </h2>
                <p style={{ color: card.mutedColor, fontSize: 13, lineHeight: 1.5 }}>
                  {card.desc}
                </p>
              </div>

              {/* Bottom */}
              <div>
                <div style={{
                  color: card.accentColor,
                  fontSize: 'clamp(48px, 5vw, 68px)',
                  fontWeight: 700,
                  letterSpacing: '-0.05em',
                  lineHeight: 1,
                  fontFamily: 'var(--font-geist-mono)',
                }}>
                  {card.stat}
                </div>
                <div className="mono text-[10px] uppercase tracking-widest mt-2" style={{ color: card.mutedColor }}>
                  {card.statLabel}
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* RIGHT: Copy block */}
          <div className="relative flex flex-col justify-center" style={{ opacity: contentOpacity }}>
            <p className="mono text-[12px] text-black/40 uppercase tracking-[0.15em] mb-5">
              Product · 0{cardIndex + 1} / 0{cards.length}
            </p>
            <h2
              className="font-medium text-black leading-[0.95] tracking-[-0.03em] mb-6"
              style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}
            >
              Everything in<br />one thread
            </h2>
            <div
              key={cardIndex}
              style={{ animation: 'hero-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both' }}
            >
              <p className="mono text-[11px] text-black/50 uppercase tracking-[0.12em] mb-3">
                {cards[cardIndex].label}
              </p>
              <h3
                className="font-medium text-black leading-[1.05] tracking-[-0.02em] mb-4"
                style={{ fontSize: 'clamp(24px, 2.2vw, 32px)', whiteSpace: 'pre-line' }}
              >
                {cards[cardIndex].title.replace('\n', ' ')}
              </h3>
              <p className="text-black/60 text-[15px] leading-[1.5] max-w-[440px]">
                {cards[cardIndex].desc}
              </p>
            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 items-center">
          {cards.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-500"
              style={{
                width: i === cardIndex ? 22 : 6,
                height: 6,
                background: i === cardIndex ? '#0D0D0F' : 'rgba(0,0,0,0.15)',
              }}
            />
          ))}
        </div>

        {/* Scroll hint */}
        {scrollProgress < 0.03 && (
          <div className="absolute bottom-10 right-8 md:right-12 flex items-center gap-2" style={{ opacity: 0.3 }}>
            <span className="mono text-[11px] uppercase tracking-widest text-black">Scroll</span>
            <span className="text-black">↓</span>
          </div>
        )}
      </section>
    </div>
  )
}
