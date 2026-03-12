import ScrollReveal from './ScrollReveal'

const tools = [
  {
    label: 'Tips',
    title: 'One tap. Instant gratitude.',
    desc: 'Let your community show appreciation with one-tap payments mid-conversation.',
    iconBg: '#E8FFF3',
    iconColor: '#00C566',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    label: 'Locked Content',
    title: 'Gate it. Earn from it.',
    desc: 'Photos, videos, or messages behind a paywall — fans unlock, you earn.',
    iconBg: '#F3F0FF',
    iconColor: '#7C3AED',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
  {
    label: 'Paid Calls',
    title: 'Your time. Your rate.',
    desc: '1-on-1 voice or video sessions billed per minute or flat rate.',
    iconBg: '#FFF0F2',
    iconColor: '#FF4F6A',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    label: 'Mass Messaging',
    title: 'Blast it. Make it personal.',
    desc: 'Reach your entire client book with messages that never feel automated.',
    iconBg: '#FEF3C7',
    iconColor: '#F59E0B',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
]

const delays = [0, 70, 140, 210]

export default function GreenSection() {
  return (
    <section className="bg-[#00C566] px-12 py-24" id="tools">
      {/* Header */}
      <ScrollReveal className="text-center max-w-[700px] mx-auto mb-16">
        <span className="text-[11px] font-bold tracking-[3.5px] uppercase block mb-5" style={{ color: 'rgba(0,50,15,0.55)' }}>
          Monetization Tools
        </span>
        <h2
          className="font-black tracking-[-2.5px] leading-[1.0] text-[#0D0D0D]"
          style={{ fontSize: 'clamp(36px, 4.5vw, 64px)' }}
        >
          Monetize inside{' '}
          <em style={{ fontFamily: 'var(--font-serif-display), Georgia, serif', fontStyle: 'italic' }}>
            every thread.
          </em>
        </h2>
      </ScrollReveal>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[10px] max-w-[1160px] mx-auto">
        {tools.map((tool, i) => (
          <ScrollReveal key={tool.label} delay={delays[i]}>
            <div className="bg-white rounded-[18px] p-7 relative cursor-default hover:-translate-y-1 transition-transform">
              {/* Plus icon */}
              <div className="absolute top-5 right-5 w-6 h-6 rounded-full border-[1.5px] border-[#EBEBEA] flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="5" y1="1" x2="5" y2="9" />
                  <line x1="1" y1="5" x2="9" y2="5" />
                </svg>
              </div>
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-[12px] flex items-center justify-center mb-5"
                style={{ background: tool.iconBg, color: tool.iconColor }}
              >
                {tool.icon}
              </div>
              <div className="text-[10px] font-bold tracking-[2px] uppercase text-[#9CA3AF] mb-2">
                {tool.label}
              </div>
              <div className="text-[20px] font-extrabold text-[#0D0D0D] tracking-[-0.5px] leading-[1.15] mb-3">
                {tool.title}
              </div>
              <div className="text-[13px] text-[#6B7280] leading-[1.65]">
                {tool.desc}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
