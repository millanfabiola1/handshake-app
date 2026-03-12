import ScrollReveal from './ScrollReveal'

const cases = [
  { label: 'Psychics & Coaches', title: 'Premium readings & sessions', desc: 'Charge per message, lock premium readings, schedule paid call sessions — all from one thread.' },
  { label: 'Home Services', title: 'Quote, confirm, collect', desc: 'Quote, confirm, and collect payment without ever leaving the chat. Maids, handymen, landscapers.' },
  { label: 'Creators & Independents', title: 'Every follower, a revenue source', desc: 'Tips, locked drops, and paid access make every follower a potential revenue stream.' },
  { label: 'Security & Service Firms', title: 'Real-time coordination', desc: 'Coordinate with clients in real-time and invoice instantly on job completion.' },
  { label: 'Sales & Retail', title: 'Human-feeling campaigns', desc: 'Send personalized mass campaigns that drive return visits and feel human — not automated.' },
]

export default function UseCases() {
  return (
    <section className="py-[140px] px-6 md:px-12 lg:px-20 xl:px-28 bg-white" id="use-cases" style={{ backgroundImage: 'url(/hologram-light.png)', backgroundSize: 'cover', backgroundPosition: 'bottom center' }}>
      <div >
        <ScrollReveal>
          <p className="mono text-[11px] text-[#18181B]/40 uppercase mb-5">Who it&apos;s for</p>
          <h2 className="font-light text-[#18181B] tracking-[-0.035em] leading-[1.1] max-w-[500px]" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
            Built for the new economy
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
          {cases.map((item, i) => (
            <ScrollReveal key={item.label} delay={i * 80}>
              <div className="group">
                <div className="w-full rounded-xl img-placeholder mb-8 group-hover:scale-[1.02] transition-transform duration-500" style={{ aspectRatio: '4 / 3' }}>
                  <span className="mono text-[13px] text-[#3F3F46]">{item.label}</span>
                </div>
                <p className="mono text-[11px] text-[#52525B] uppercase mb-3">{item.label}</p>
                <h3 className="text-[22px] font-light text-[#18181B] tracking-[-0.02em] leading-[1.2] mb-3">{item.title}</h3>
                <p className="text-[15px] font-light text-[#71717A] leading-[1.6]">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
          {/* CTA card */}
          <ScrollReveal delay={400}>
            <div className="bg-[#39FF78] rounded-xl p-8 flex flex-col justify-between" style={{ aspectRatio: '4 / 3' }}>
              <div>
                <p className="mono text-[11px] text-black/40 uppercase mb-3">The platform</p>
                <h3 className="text-[22px] font-light text-black tracking-[-0.02em] leading-[1.2]">A handshake seals every deal.</h3>
              </div>
              <a href="#" className="text-[13px] font-medium px-5 py-2.5 rounded-lg bg-white text-black hover:bg-white/90 transition-colors self-start">Get early access</a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
