'use client'
import ScrollReveal from './ScrollReveal'

export default function QuoteSection() {
  return (
    <section className="h-screen sticky top-0 z-[7] rounded-t-[24px] relative overflow-hidden flex items-center justify-center">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/a5964603cb2e4a249ac8a336c1a0239d.HD-1080p-7.2Mbps-14082701.mp4"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 px-4 md:px-8 lg:px-10 xl:px-12 text-center max-w-[900px]">
        <ScrollReveal>
          <blockquote className="font-normal text-white tracking-[-0.035em] leading-[1.1]" style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
            &ldquo;The best deals aren&apos;t closed in boardrooms. They&apos;re sealed with a handshake.&rdquo;
          </blockquote>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="mono text-[13px] text-white/50 uppercase mt-10">The Handshake Philosophy</p>
        </ScrollReveal>
      </div>
    </section>
  )
}
