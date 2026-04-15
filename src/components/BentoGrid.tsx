'use client'
import { useEffect, useState, useRef, useCallback } from 'react'
import { CurrencyDollar, Star } from '@phosphor-icons/react'
import ScrollReveal from './ScrollReveal'

/* ── Tag avoidance (scatter from mouse) ── */
const tags = ['Tips', 'Locked Content', 'Paid Calls', 'Mass Messaging', '0% Fees', 'In-Thread Payments', 'International', 'iOS & Android']
const tagRotations = tags.map((_, i) => (i % 2 === 0 ? -1 : 1) * (2 + i * 0.5))

function AvoidanceTags() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const tagRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [offsets, setOffsets] = useState(() => tags.map(() => ({ x: 0, y: 0 })))
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = wrapRef.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el); return () => obs.disconnect()
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect()
    if (!rect) return
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    setOffsets(tagRefs.current.map((el) => {
      if (!el) return { x: 0, y: 0 }
      const tr = el.getBoundingClientRect()
      const tx = tr.left + tr.width / 2 - rect.left
      const ty = tr.top + tr.height / 2 - rect.top
      const dx = tx - mx; const dy = ty - my
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist > 90) return { x: 0, y: 0 }
      const force = ((90 - dist) / 90) * 28
      return { x: (dx / dist) * force, y: (dy / dist) * force }
    }))
  }, [])

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOffsets(tags.map(() => ({ x: 0, y: 0 })))}
      className="flex flex-wrap gap-2"
    >
      {tags.map((tag, i) => (
        <span
          ref={el => { tagRefs.current[i] = el }}
          key={tag}
          className="text-[12px] font-medium px-3 py-1.5 rounded-full cursor-default"
          style={{
            background: 'rgba(255,255,255,0.12)',
            color: '#A5F41F',
            border: '1px solid rgba(165,244,31,0.2)',
            transform: visible
              ? `rotate(${tagRotations[i]}deg) translate(${offsets[i].x}px, ${offsets[i].y}px)`
              : `rotate(${tagRotations[i] * 3}deg) translateY(-80px)`,
            opacity: visible ? 1 : 0,
            transition: visible
              ? 'transform 250ms cubic-bezier(0.34,1.56,0.64,1), opacity 700ms'
              : `transform 700ms cubic-bezier(0.34,1.56,0.64,1) ${i * 80}ms, opacity 700ms ${i * 80}ms`,
          }}
        >{tag}</span>
      ))}
    </div>
  )
}

/* ── Point-cloud globe with mouse-tracking offset ── */
function PointCloudGlobe({ offsetX = 0, offsetY = 0 }: { offsetX?: number; offsetY?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    const c = ctx
    const W = canvas.width; const H = canvas.height
    const R = Math.min(W, H) / 2 - 12
    const N = 700
    const golden = Math.PI * (3 - Math.sqrt(5))
    const pts = Array.from({ length: N }, (_, i) => {
      const y = 1 - (i / (N - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = golden * i
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r }
    })
    let angle = 0; let raf: number
    function draw() {
      c.clearRect(0, 0, W, H)
      const cx = W / 2; const cy = H / 2
      const ca = Math.cos(angle); const sa = Math.sin(angle)
      const rotated = pts.map(p => ({ x: p.x * ca + p.z * sa, y: p.y, z: -p.x * sa + p.z * ca }))
      rotated.sort((a, b) => a.z - b.z)
      rotated.forEach(p => {
        const depth = (p.z + 1) / 2
        const opacity = 0.2 + depth * 0.8
        const size = 0.7 + depth * 1.8
        c.beginPath()
        c.arc(cx + p.x * R, cy + p.y * R, size, 0, Math.PI * 2)
        c.fillStyle = `rgba(165,244,31,${opacity.toFixed(2)})`
        c.fill()
      })
      angle += 0.004; raf = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={240}
      height={240}
      className="w-full max-h-[170px] object-contain"
      style={{
        transform: `translate(${offsetX}px, ${offsetY}px)`,
        transition: 'transform 350ms cubic-bezier(0.23,1,0.32,1)',
      }}
    />
  )
}

/* ── Globe card with internal mouse state ── */
function GlobeCard() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  return (
    <div
      className="rounded-2xl px-8 pt-6 pb-8 h-full flex flex-col justify-between overflow-hidden relative transition-all duration-300 hover:-translate-y-1"
      style={{ background: 'linear-gradient(145deg, #050f03 0%, #091a07 50%, #0d2410 100%)' }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setOffset({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 22,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 22,
        })
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(165,244,31,0.08) 0%, transparent 70%)' }} />
      <div className="flex justify-center flex-1 items-center relative z-10">
        <PointCloudGlobe offsetX={offset.x} offsetY={offset.y} />
      </div>
      <div className="relative z-10">
        <h3 className="text-[22px] font-semibold text-white tracking-[-0.02em] mb-1">
          <span className="text-[#A5F41F]">International</span> &amp; Global
        </h3>
        <p className="text-[14px] text-white/35 leading-[1.5]">Global payments and payouts. 0% fee. No borders.</p>
      </div>
    </div>
  )
}

/* ── Phone card with mouse-tilt ── */
function PhoneCard() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  return (
    <div
      className="rounded-2xl p-8 h-full flex flex-col justify-between overflow-hidden relative transition-all duration-300 hover:-translate-y-1 ring-1 ring-black/[0.06]"
      style={{
        background: 'radial-gradient(ellipse 80% 70% at 90% 95%, rgba(204,255,60,0.85) 0%, rgba(204,255,60,0) 55%), radial-gradient(ellipse 55% 45% at 10% 10%, #dedad5 0%, transparent 60%), #c8c3bc',
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setTilt({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 12,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 12,
        })
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div className="flex justify-center">
        <div
          className="w-[100px] bg-[#0A0A0B] rounded-[20px] p-[3px] ring-2 ring-[#A5F41F]/30 shadow-xl"
          style={{
            transform: `translate(${tilt.x}px, ${tilt.y * 0.5}px) rotate(${tilt.x * 0.3}deg)`,
            transition: 'transform 350ms cubic-bezier(0.23,1,0.32,1)',
          }}
        >
          <div className="rounded-[17px] overflow-hidden bg-black" style={{ aspectRatio: '9/19.5' }}>
            <video src="/demo.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-[22px] font-semibold text-black tracking-[-0.02em] mb-2">
          <span className="bg-[#A5F41F] text-black px-1.5 rounded">Instant</span> Payments
        </h3>
        <p className="text-[14px] text-black/55 leading-[1.5]">Get paid in-thread. No redirects.</p>
      </div>
    </div>
  )
}

export default function BentoGrid() {
  return (
    <section className="relative py-[32px] lg:py-[40px] px-4 md:px-8 lg:px-10 xl:px-12 overflow-hidden bg-white">
      <div className="noise-texture absolute inset-0 z-0 opacity-20" aria-hidden />

      <div className="relative z-[1] max-w-[1300px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <ScrollReveal>
            <p className="mono text-[11px] text-black/30 uppercase tracking-widest mb-4">The Platform</p>
          </ScrollReveal>
          <ScrollReveal delay={60}>
            <h2
              className="font-display font-medium text-[#18181B] tracking-[-0.045em] leading-[0.95] mb-4 max-w-[480px]"
              style={{ fontSize: 'clamp(32px,4vw,56px)' }}
            >
              Built to make<br />every message pay.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <p className="text-[17px] text-black/40 leading-[1.55] max-w-[380px]">
              One platform. Every monetization tool. Zero fees on tips.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:auto-rows-[280px]">

          {/* 1 — All-in-One: PURE BLACK */}
          <ScrollReveal>
            <div
              className="rounded-2xl p-8 min-h-[240px] h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
              style={{ background: '#0A0A0B' }}
            >
              <div className="w-12 h-12 rounded-xl bg-[#A5F41F] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                <CurrencyDollar size={24} weight="bold" className="text-black" />
              </div>
              <div>
                <h3 className="text-[22px] font-semibold text-white tracking-[-0.02em] mb-2">
                  All-in-One <span className="bg-[#A5F41F] text-black px-1.5 rounded">Platform</span>
                </h3>
                <p className="text-[14px] text-white/40 leading-[1.5]">
                  Messages, tips, locked content, paid calls, and mass messaging. All in one app.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* 2 — Tagline: SOFT AURA MESH (lavender + green blobs) */}
          <ScrollReveal delay={100}>
            <div
              className="rounded-2xl p-8 min-h-[240px] h-full flex flex-col justify-between overflow-hidden relative transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'radial-gradient(ellipse 75% 65% at 18% 78%, rgba(165,244,31,0.52) 0%, transparent 58%), radial-gradient(ellipse 65% 55% at 82% 22%, rgba(130,218,196,0.65) 0%, transparent 55%), radial-gradient(ellipse 45% 38% at 52% 52%, rgba(200,215,248,0.38) 0%, transparent 60%), #b4c1de',
              }}
            >
              <div className="noise-texture absolute inset-0" aria-hidden />
              <div className="flex gap-2 relative z-10">
                <div className="w-3 h-3 rounded-full bg-black/20" />
                <div className="w-3 h-3 rounded-full bg-black/60" />
                <div className="w-3 h-3 rounded-full bg-black/10" />
              </div>
              <p className="text-[22px] md:text-[24px] font-medium text-black tracking-[-0.03em] leading-[1.2] relative z-10">
                Tapp&apos;d is the{' '}
                <span className="bg-black text-[#A5F41F] px-1.5 rounded">messaging app that pays.</span>{' '}
                Every conversation is a potential transaction.
              </p>
            </div>
          </ScrollReveal>

          {/* 3 — Globe: COSMIC DARK + mouse-tracking */}
          <ScrollReveal delay={200}>
            <GlobeCard />
          </ScrollReveal>

          {/* 4 — Phone: SANDY-LIME AURA + mouse-tilt */}
          <ScrollReveal delay={50}>
            <PhoneCard />
          </ScrollReveal>

          {/* 5 — Features: DEEP EMERALD + avoidance tags */}
          <ScrollReveal delay={150}>
            <div
              className="rounded-2xl p-8 min-h-[240px] h-full flex flex-col justify-between overflow-hidden relative transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'linear-gradient(145deg, #041a0c 0%, #072a14 55%, #0a3a1c 100%)' }}
            >
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 30% 80%, rgba(165,244,31,0.07) 0%, transparent 60%)' }} />
              <AvoidanceTags />
              <div className="relative z-10">
                <h3 className="text-[22px] font-semibold text-white tracking-[-0.02em] mb-2">Everything You Need</h3>
                <p className="text-[14px] text-white/35 leading-[1.5]">
                  One app for messages, monetization, and mass messaging. Zero platform fees.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* 6 — Rating: FULL LIME GREEN */}
          <ScrollReveal delay={250}>
            <div
              className="rounded-2xl p-8 min-h-[240px] h-full flex flex-col justify-between overflow-hidden relative transition-all duration-300 hover:-translate-y-1 group"
              style={{ background: 'linear-gradient(145deg, #b8f53c 0%, #A5F41F 55%, #7bc714 100%)' }}
            >
              <div className="noise-texture absolute inset-0" aria-hidden />
              <div className="relative z-10">
                <p className="text-[56px] font-bold text-black leading-none tracking-[-0.04em] transition-transform duration-300 group-hover:scale-105 origin-left">4.9</p>
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      weight="fill"
                      className="text-black/60 transition-transform duration-300 group-hover:scale-125"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-[18px] font-semibold text-black tracking-[-0.02em] mb-2">
                  Trusted by <span className="bg-black text-[#A5F41F] px-1.5 rounded">47,000+</span> businesses &amp; creators.
                </h3>
                <div className="flex -space-x-2 mt-2">
                  {[1,2,3,4,5].map((n) => (
                    <img key={n} src={`/avatar-${n}.webp`} alt="" className="w-9 h-9 rounded-full border-2 border-[#A5F41F] object-cover" />
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>

      {/* Bottom fade into Zero Fees section */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0), white)' }} />
    </section>
  )
}
