import ScrollReveal from './ScrollReveal'

export default function BentoGrid() {
  return (
    <section className="bg-white py-20 px-12" id="features">
      {/* Header */}
      <ScrollReveal className="max-w-[1160px] mx-auto mb-12">
        <span className="text-[11px] font-bold tracking-[3.5px] uppercase text-[#9CA3AF] block mb-5">
          PRODUCT
        </span>
        <h2
          className="font-black tracking-tight leading-[1.05] text-[#0D0D0D] max-w-[600px]"
          style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
        >
          Built for the conversation economy.
        </h2>
      </ScrollReveal>

      {/* Row 1 */}
      <div className="max-w-[1160px] mx-auto grid grid-cols-3 gap-3">

        {/* Card A — Purple-to-coral gradient, col-span-2 */}
        <ScrollReveal className="col-span-2 rounded-[20px] overflow-hidden min-h-[360px]">
          <div
            className="h-full flex flex-col"
            style={{ background: 'linear-gradient(135deg, #3B1FA8 0%, #7C3AED 40%, #FF4F6A 100%)', minHeight: '360px' }}
          >
            <div className="p-8">
              <span className="text-[10px] tracking-[3px] uppercase block mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
                P2P
              </span>
              <div className="text-white font-black text-[28px] tracking-tight leading-tight">
                Personal connections that pay.
              </div>
              <div className="text-[14px] mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Every DM is a potential income stream.
              </div>
            </div>
            {/* Chat thread */}
            <div className="px-8 pb-8 flex-1 flex flex-col justify-end">
              <div
                className="rounded-[16px] p-4 flex flex-col gap-2"
                style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
              >
                <div
                  className="text-white text-[12px] px-3 py-2 self-start max-w-[75%]"
                  style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '12px 12px 12px 3px' }}
                >
                  Can I tip you for that breakdown?
                </div>
                <div
                  className="bg-[#00C566] text-black font-semibold text-[12px] px-3 py-2 self-end max-w-[75%]"
                  style={{ borderRadius: '12px 12px 3px 12px' }}
                >
                  Yes! One tap below
                </div>
                <div className="bg-white rounded-[10px] p-3 flex justify-between items-center">
                  <span className="text-[#0D0D0D] font-black text-sm">$10 Tip</span>
                  <span className="bg-[#00C566] text-black text-[10px] font-bold px-2 py-1 rounded-full">Sent ✓</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Card B — Electric green, 0% fee */}
        <ScrollReveal
          delay={70}
          className="rounded-[20px] bg-[#00C566] p-8 flex flex-col justify-between min-h-[360px]"
        >
          <div>
            <span className="text-[10px] tracking-[3px] uppercase block" style={{ color: 'rgba(0,0,0,0.4)' }}>
              PLATFORM FEE
            </span>
            <div
              className="text-black font-black leading-none mt-4"
              style={{ fontSize: '96px', letterSpacing: '-6px' }}
            >
              0%
            </div>
          </div>
          <div className="text-[15px]" style={{ color: 'rgba(0,0,0,0.6)' }}>
            Zero commission. Every dollar goes directly to you.
          </div>
        </ScrollReveal>

      </div>

      {/* Row 2 */}
      <div className="max-w-[1160px] mx-auto grid grid-cols-3 gap-3 mt-3">

        {/* Card C — Soft lavender, Tips */}
        <ScrollReveal className="rounded-[20px] bg-[#F3F0FF] p-7">
          <span className="text-[10px] tracking-[3px] uppercase block" style={{ color: 'rgba(124,58,237,0.6)' }}>
            TIPS
          </span>
          <div className="text-[#0D0D0D] font-black text-[20px] tracking-tight mt-2 mb-4">
            Instant gratitude.
          </div>
          <div className="flex gap-1.5 mb-3">
            {['$5', '$10', '$25'].map((amt, i) => (
              <div
                key={amt}
                className="flex-1 text-center py-2 rounded-full text-sm font-bold"
                style={
                  i === 1
                    ? { background: '#7C3AED', color: 'white' }
                    : { background: 'white', border: '1px solid #E0D9FF', color: '#7C3AED' }
                }
              >
                {amt}
              </div>
            ))}
          </div>
          <button className="w-full bg-[#7C3AED] text-white font-bold text-sm rounded-[10px] py-2.5 border-none cursor-pointer">
            Send Tip
          </button>
        </ScrollReveal>

        {/* Card D — Coral bg, Locked Content */}
        <ScrollReveal delay={70} className="rounded-[20px] bg-[#FF4F6A] p-7">
          <span className="text-[10px] tracking-[3px] uppercase block" style={{ color: 'rgba(255,255,255,0.5)' }}>
            LOCKED CONTENT
          </span>
          <div className="text-white font-black text-[20px] tracking-tight mt-2">
            Gate it. Earn.
          </div>
          <div
            className="rounded-[12px] p-3 mt-3"
            style={{ background: 'rgba(255,255,255,0.2)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <svg width="12" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <span className="text-white text-xs">Premium Drop</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white font-black text-lg">$15</span>
              <span className="bg-white text-[#FF4F6A] font-bold text-xs px-3 py-1 rounded-full">Unlock</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Card E — Dark, Paid Calls */}
        <ScrollReveal delay={140} className="rounded-[20px] bg-[#0D0D0D] border border-[#2A2A2A] p-7">
          <span className="text-[10px] tracking-[3px] uppercase text-[#555] block">
            PAID CALLS
          </span>
          <div className="text-white font-black text-[20px] tracking-tight mt-2">
            Your rate. Your time.
          </div>
          <div
            className="text-[#00C566] font-black leading-none mt-3"
            style={{ fontSize: '36px', letterSpacing: '-2px' }}
          >
            12:47
          </div>
          <div className="text-[#555] text-[11px] mt-1">$3.00/min · $38.41 earned</div>
        </ScrollReveal>

      </div>
    </section>
  )
}
