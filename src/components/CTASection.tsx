import ScrollReveal from './ScrollReveal'

export default function CTASection() {
  return (
    <section className="py-[180px] px-6 md:px-12 lg:px-20 xl:px-28 bg-[#1A1A1D] relative overflow-hidden">
      <div className="text-center relative z-10">
        <ScrollReveal>
          <h2 className="font-light text-white tracking-[-0.045em] leading-[0.95]" style={{ fontSize: 'clamp(44px, 7vw, 80px)' }}>
            A handshake seals<br />every deal
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <p className="text-[18px] font-light text-[#71717A] leading-[1.5] mt-8 max-w-[420px] mx-auto">
            Join the platform that puts money in your pocket. Message, monetize, and move money — all in one place.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={140}>
          <div className="flex items-center justify-center gap-4 mt-12">
            <a href="#" className="text-[14px] font-medium text-black px-8 py-4 rounded-lg bg-[#39FF78] hover:bg-[#2DE86A] transition-colors">Get early access</a>
            <a href="#product" className="text-[14px] font-light text-black px-8 py-4 rounded-lg border border-white/20 hover:border-white/40 bg-white hover:bg-white/90 transition-colors">See the product</a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
