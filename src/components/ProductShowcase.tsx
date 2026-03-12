import ScrollReveal from './ScrollReveal'

export default function ProductShowcase() {
  return (
    <section className="py-[140px] px-6 md:px-12 lg:px-20 xl:px-28 bg-[#39FF78] text-black">
      <div >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <ScrollReveal>
            <div className="w-full rounded-2xl img-placeholder-light" style={{ aspectRatio: '1 / 1' }}>
              <span className="mono text-[14px] text-black/40">App interface</span>
            </div>
          </ScrollReveal>
          <div>
            <ScrollReveal>
              <p className="mono text-[11px] text-black/50 uppercase mb-5">How it works</p>
              <h2 className="font-light text-black tracking-[-0.035em] leading-[1.1]" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
                Text like iMessage. Earn like a business.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <p className="text-[16px] font-light text-black/60 leading-[1.65] mt-7 max-w-[440px]">
                Every conversation is a commerce opportunity. Tips, locked content, paid bookings, and mass campaigns — all living inside the thread, right where the relationship is.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <div className="mt-14 flex flex-col gap-10">
                {[
                  { step: '01', text: 'Start a conversation with anyone' },
                  { step: '02', text: 'Enable monetization tools in-thread' },
                  { step: '03', text: 'Get paid instantly — keep everything' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-6">
                    <span className="mono text-[13px] text-black/30 mt-0.5">{item.step}</span>
                    <p className="text-[17px] font-light text-black leading-[1.4]">{item.text}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
