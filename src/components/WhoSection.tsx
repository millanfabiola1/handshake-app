import ScrollReveal from './ScrollReveal'

const SpiralSVG = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#E5E5E5" strokeWidth="1" className="absolute bottom-4 right-4">
    <circle cx="32" cy="32" r="6" />
    <circle cx="32" cy="32" r="12" />
    <circle cx="32" cy="32" r="18" />
    <circle cx="32" cy="32" r="24" />
    <circle cx="32" cy="32" r="30" />
    <line x1="32" y1="2" x2="32" y2="62" />
    <line x1="2" y1="32" x2="62" y2="32" />
  </svg>
)

const HouseSVG = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#E5E5E5" strokeWidth="1" className="absolute bottom-4 right-4">
    <path d="M8 28 L32 8 L56 28" />
    <rect x="12" y="28" width="40" height="28" />
    <rect x="24" y="40" width="16" height="16" />
    <line x1="32" y1="8" x2="32" y2="56" />
    <line x1="12" y1="42" x2="52" y2="42" />
  </svg>
)

const ShieldSVG = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#E5E5E5" strokeWidth="1" className="absolute bottom-4 right-4">
    <path d="M32 4 L52 12 L52 32 C52 46 32 58 32 58 C32 58 12 46 12 32 L12 12 Z" />
    <path d="M32 10 L46 17 L46 32 C46 42 32 52 32 52 C32 52 18 42 18 32 L18 17 Z" />
    <path d="M32 16 L40 20 L40 32 C40 38 32 46 32 46 C32 46 24 38 24 32 L24 20 Z" />
  </svg>
)

const BarChartSVG = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#E5E5E5" strokeWidth="1" className="absolute bottom-4 right-4">
    <line x1="8" y1="56" x2="56" y2="56" />
    <line x1="8" y1="8" x2="8" y2="56" />
    <rect x="14" y="36" width="10" height="20" />
    <rect x="28" y="24" width="10" height="32" />
    <rect x="42" y="14" width="10" height="42" />
    <path d="M14 36 L28 24 L42 14" strokeDasharray="2 2" />
  </svg>
)

const StarSVG = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#E5E5E5" strokeWidth="1" className="absolute bottom-4 right-4">
    <polygon points="32,4 39,24 60,24 44,37 51,58 32,46 13,58 20,37 4,24 25,24" />
    <polygon points="32,14 37,28 52,28 40,36 45,51 32,42 19,51 24,36 12,28 27,28" />
    <line x1="32" y1="4" x2="32" y2="58" />
    <line x1="4" y1="24" x2="60" y2="24" />
  </svg>
)

const cards = [
  {
    label: 'Psychics & Coaches',
    title: 'Premium readings & sessions',
    desc: 'Charge per message, lock premium readings, schedule paid call sessions — all from one thread.',
    accentColor: '#7C3AED',
    delay: 0,
    svg: <SpiralSVG />,
  },
  {
    label: 'Home Services',
    title: 'Quote, confirm, collect',
    desc: 'Quote, confirm, and collect payment without ever leaving the chat. Maids, handymen, landscapers.',
    accentColor: '#00C566',
    delay: 70,
    svg: <HouseSVG />,
  },
  {
    label: 'Security & Service Firms',
    title: 'Real-time coordination',
    desc: 'Coordinate with clients in real-time and invoice instantly on job completion.',
    accentColor: '#FF4F6A',
    delay: 140,
    svg: <ShieldSVG />,
  },
  {
    label: 'Sales & Retail',
    title: 'Human-feeling campaigns',
    desc: 'Send personalized mass campaigns that drive return visits and feel human — not automated.',
    accentColor: '#F59E0B',
    delay: 0,
    svg: <BarChartSVG />,
  },
  {
    label: 'Creators & Independents',
    title: 'Every follower, a revenue source',
    desc: 'Tips, locked drops, and paid access make every follower a potential revenue stream.',
    accentColor: '#7C3AED',
    delay: 70,
    svg: <StarSVG />,
  },
]

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    className="absolute top-7 right-7 text-[#EBEBEA] group-hover:text-[#0D0D0D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
)

export default function WhoSection() {
  return (
    <section className="bg-[#F5F3FF] px-12 py-24" id="who">
      <div className="max-w-[1160px] mx-auto">
        {/* Header */}
        <ScrollReveal className="mb-14">
          <span className="text-[11px] font-bold tracking-[3.5px] uppercase text-[#9CA3AF] block mb-3">
            Who It&apos;s For
          </span>
          <h2
            className="font-black tracking-[-1.5px] leading-[1.05] text-[#0D0D0D] mt-3"
            style={{ fontSize: 'clamp(32px, 3.5vw, 52px)' }}
          >
            Built for the{' '}
            <em style={{ fontFamily: 'var(--font-serif-display), Georgia, serif', fontStyle: 'italic' }}>
              new economy.
            </em>
          </h2>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px]">
          {cards.map((card) => (
            <ScrollReveal key={card.label} delay={card.delay}>
              <div
                className="group bg-white rounded-[18px] p-8 border border-[#EBEBEA] relative overflow-hidden hover:border-[#CCC] transition-colors"
                style={{ borderLeft: `4px solid ${card.accentColor}` }}
              >
                <ArrowIcon />
                {card.svg}
                <div className="text-[10px] font-bold tracking-[2.5px] uppercase text-[#9CA3AF] mb-[10px]">
                  {card.label}
                </div>
                <div className="text-[17px] font-extrabold text-[#0D0D0D] mb-[10px] tracking-[-0.2px]">
                  {card.title}
                </div>
                <div className="text-[14px] text-[#6B7280] leading-[1.65]">
                  {card.desc}
                </div>
              </div>
            </ScrollReveal>
          ))}

          {/* CTA card — green */}
          <ScrollReveal delay={140}>
            <div className="bg-[#00C566] rounded-[18px] p-8 border border-[#00C566] relative overflow-hidden">
              <div className="text-[10px] font-bold tracking-[2.5px] uppercase mb-[10px]" style={{ color: 'rgba(0,50,15,0.5)' }}>
                The Platform
              </div>
              <div className="text-[22px] font-extrabold text-[#0D0D0D] mb-4 tracking-[-0.5px] leading-[1.15]">
                A handshake seals every deal.
              </div>
              <div className="mt-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-[6px] h-10 px-5 bg-[#0D0D0D] text-white rounded-full text-[13px] font-bold no-underline"
                >
                  Get Early Access
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
