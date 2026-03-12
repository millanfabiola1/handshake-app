import ScrollReveal from './ScrollReveal'

const methods = [
  {
    title: 'Credit Cards',
    desc: 'All major networks',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.75" strokeLinecap="round">
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    delay: 0,
  },
  {
    title: 'Bank Transfer',
    desc: 'ACH & direct',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.75" strokeLinecap="round">
        <rect x="3" y="8" width="18" height="12" rx="2" />
        <path d="M7 8V6a2 2 0 012-2h6a2 2 0 012 2v2" />
        <line x1="3" y1="13" x2="21" y2="13" />
      </svg>
    ),
    delay: 70,
  },
  {
    title: 'Debit Cards',
    desc: 'Instant access',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.75" strokeLinecap="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
    delay: 140,
  },
  {
    title: 'P2P Payments',
    desc: 'Person to person',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.75" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    delay: 210,
  },
]

export default function Payments() {
  return (
    <section className="bg-white px-12 py-20 border-t border-[#E8E8E5]">
      <div className="max-w-[1160px] mx-auto">
        <ScrollReveal className="flex items-end justify-between mb-10">
          <h2
            className="font-black tracking-[-1.5px] text-[#0A0A0A]"
            style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}
          >
            Pay any way.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[10px]">
          {methods.map((m) => (
            <ScrollReveal key={m.title} delay={m.delay}>
              <div className="bg-[#F5F5F3] rounded-[16px] p-7 px-6 border border-[#E8E8E5] hover:bg-[#EDEDEB] hover:border-[#CCC] transition-colors">
                <div className="w-11 h-11 rounded-[12px] bg-white border border-[#E8E8E5] flex items-center justify-center mb-5">
                  {m.icon}
                </div>
                <h4 className="text-[16px] font-bold text-[#0A0A0A] mb-1">{m.title}</h4>
                <p className="text-[13px] text-[#717171]">{m.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
