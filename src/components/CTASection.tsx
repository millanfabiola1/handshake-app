import ScrollReveal from './ScrollReveal'

export default function CTASection() {
  return (
    <section className="bg-[#0D0D0D] px-12 py-[120px] text-center relative overflow-hidden">
      {/* Stripe-style gradient blob */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(0,197,102,0.08) 0%, rgba(124,58,237,0.06) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10">
        <ScrollReveal>
          <span className="text-[11px] font-bold tracking-[3.5px] uppercase text-[#3A3A3A] block mb-5 text-center">
            Get Started
          </span>
        </ScrollReveal>

        <ScrollReveal delay={70}>
          <h2
            className="font-black tracking-[-4px] leading-[0.95] text-white mb-7"
            style={{ fontSize: 'clamp(48px, 6.5vw, 96px)' }}
          >
            A handshake<br />
            seals{' '}
            <em
              className="text-[#00C566]"
              style={{ fontFamily: 'var(--font-serif-display), Georgia, serif', fontStyle: 'italic' }}
            >
              every
            </em>{' '}
            deal.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <p className="text-[18px] text-[#3A3A3A] mb-12">
            Join the platform that puts money in your pocket.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={210}>
          <div className="flex justify-center gap-3 flex-wrap">
            <a
              href="#"
              className="inline-flex items-center gap-2 h-14 px-9 rounded-full bg-[#00C566] text-[#0D0D0D] text-[16px] font-extrabold border-none cursor-pointer hover:bg-[#009E52] hover:-translate-y-px transition-all"
            >
              Get Early Access
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
            <a
              href="#features"
              className="inline-flex items-center h-14 px-8 rounded-full bg-transparent text-[#666] text-[16px] font-semibold border border-[#2A2A2A] cursor-pointer hover:border-[#555] hover:text-white transition-colors"
            >
              See the product
            </a>
          </div>

          {/* Payment methods row */}
          <div className="flex justify-center gap-2 flex-wrap mt-6">
            {['Credit Cards', 'Bank Transfer', 'Debit Cards', 'P2P'].map((method) => (
              <span
                key={method}
                className="bg-[#1A1A1A] text-[#555] text-xs px-3 py-1.5 rounded-full"
              >
                {method}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
