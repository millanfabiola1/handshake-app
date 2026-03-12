export default function MessagingFeature() {
  return (
    <section className="bg-[#F5F3FF] py-24 px-12" id="messaging">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-20 items-center max-w-[1160px] mx-auto">

        {/* Left side */}
        <div>
          <span className="text-[#00C566] uppercase text-xs tracking-[4px] font-bold mb-5 block">
            THE MESSAGING EXPERIENCE
          </span>
          <h2
            className="font-black tracking-tight leading-[1.0] text-[#0D0D0D]"
            style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}
          >
            Text like iMessage.<br />
            <em
              style={{
                fontFamily: 'var(--font-serif-display), Georgia, serif',
                fontStyle: 'italic',
                color: '#7C3AED',
              }}
            >
              Earn like a business.
            </em>
          </h2>
          <p className="text-[16px] text-[#6B7280] leading-[1.75] max-w-[440px] mt-5">
            Every conversation is a commerce opportunity. Tips, locked content, paid bookings, and mass campaigns — all living inside the thread, right where the relationship is.
          </p>
          {/* Feature tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            <span className="bg-[#E8FFF3] text-[#009E52] text-xs font-bold px-3 py-1.5 rounded-full">Tips in-thread</span>
            <span className="bg-[#F3F0FF] text-[#7C3AED] text-xs font-bold px-3 py-1.5 rounded-full">Locked Content</span>
            <span className="bg-[#FFF0F2] text-[#FF4F6A] text-xs font-bold px-3 py-1.5 rounded-full">Paid Calls</span>
            <span className="bg-[#FEF3C7] text-[#92400E] text-xs font-bold px-3 py-1.5 rounded-full">Mass Messaging</span>
          </div>
        </div>

        {/* Right side — phone */}
        <div>
          <div
            className="overflow-hidden mx-auto"
            style={{
              background: '#0D0D0D',
              borderRadius: '40px',
              border: '1px solid #2A2A2A',
              width: '320px',
            }}
          >
            {/* Status bar */}
            <div className="h-10 bg-[#0D0D0D] flex justify-between items-center px-5">
              <span className="text-white text-sm font-semibold">9:41</span>
              <div className="flex items-center gap-[6px]">
                <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                  <rect x="0" y="4" width="3" height="7" rx="1" fill="white" opacity=".3" />
                  <rect x="4.5" y="2.5" width="3" height="8.5" rx="1" fill="white" opacity=".5" />
                  <rect x="9" y="0.5" width="3" height="10.5" rx="1" fill="white" />
                  <rect x="13.5" y="0" width="2.5" height="11" rx="1" fill="white" />
                </svg>
                <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                  <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity=".35" />
                  <rect x="2" y="2" width="16" height="8" rx="2" fill="white" />
                  <path d="M23 4v4a2 2 0 000-4z" fill="white" opacity=".4" />
                </svg>
              </div>
            </div>

            {/* Contact header */}
            <div className="bg-[#111] px-5 py-3 flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #00C566, #7C3AED)' }}
              >
                J
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">Jordan M.</div>
                <div className="text-[#00C566] text-[10px]">Online via Handshake</div>
              </div>
              <span className="bg-[#00C566] text-black text-[9px] font-bold px-2 py-0.5 rounded-full">$ HS</span>
            </div>

            {/* Thread */}
            <div className="bg-[#0D0D0D] px-4 py-3 flex flex-col gap-3">
              {/* 1 — Incoming */}
              <div
                className="bg-[#1E1E1E] text-[#CCC] self-start max-w-[75%] px-3 py-2"
                style={{ fontSize: '11.5px', borderRadius: '14px 14px 14px 3px' }}
              >
                Are you available for a session?
              </div>

              {/* 2 — Outgoing */}
              <div
                className="bg-[#00C566] text-black font-semibold self-end max-w-[75%] px-3 py-2"
                style={{ fontSize: '11.5px', borderRadius: '14px 14px 3px 14px' }}
              >
                Yes! Book a paid call below
              </div>

              {/* 3 — Paid call card */}
              <div className="bg-[#161616] border border-[#2A2A2A] rounded-[14px] p-3 w-full">
                <div className="flex items-center gap-1.5 mb-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00C566" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  <span className="text-[#555] text-[10px] uppercase tracking-wider">Paid Call Session</span>
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-white font-black text-xl tracking-tight">$45.00</span>
                  <span className="text-[#555] text-xs">/30 min</span>
                </div>
                <button className="w-full bg-[#00C566] text-black text-[11px] font-bold py-2 rounded-[8px] border-none cursor-pointer">
                  Book Session
                </button>
              </div>

              {/* 4 — Incoming */}
              <div
                className="bg-[#1E1E1E] text-[#CCC] self-start px-3 py-2"
                style={{ fontSize: '11.5px', borderRadius: '14px 14px 14px 3px' }}
              >
                Booked! Also love your content
              </div>

              {/* 5 — Outgoing */}
              <div
                className="bg-[#00C566] text-black font-semibold self-end max-w-[75%] px-3 py-2"
                style={{ fontSize: '11.5px', borderRadius: '14px 14px 3px 14px' }}
              >
                New exclusive drop just for you
              </div>

              {/* 6 — Locked content card */}
              <div className="bg-[#161616] border border-[#2A2A2A] rounded-[14px] p-3 w-full">
                <div className="h-[52px] bg-[#222] rounded-[8px] flex items-center justify-center gap-2 mb-2">
                  <svg width="12" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  <span className="text-[#555] text-[10px]">Premium Content · Vol.5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold text-sm">$8.00</span>
                  <button className="bg-[#7C3AED] text-white text-[10px] font-bold px-3 py-1.5 rounded-[8px] border-none cursor-pointer">
                    Unlock
                  </button>
                </div>
              </div>

              {/* 7 — Notification toast */}
              <div className="bg-[#00C566] text-black text-[10px] font-bold px-3 py-1.5 rounded-full self-center flex items-center gap-1.5">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" fill="rgba(0,0,0,0.15)" />
                  <path d="M7 12l3.5 3.5L17 9" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Payment received · +$53.00
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
