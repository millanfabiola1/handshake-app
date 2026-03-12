export default function SplitPanel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {/* Left: white — 0% fee */}
      <div className="bg-white px-16 py-24 flex flex-col justify-center border-r border-[#EBEBEA]">
        <span className="text-[11px] font-bold tracking-[3.5px] uppercase text-[#9CA3AF] block mb-0">
          Platform Fee
        </span>
        <div
          className="font-black text-[#00C566] leading-[0.9] mb-6"
          style={{
            fontSize: 'clamp(100px, 14vw, 180px)',
            letterSpacing: '-8px',
          }}
        >
          0%
        </div>
        <div className="text-[11px] font-bold tracking-[3px] uppercase text-[#9CA3AF] mb-7">
          Platform Fee
        </div>
        <p className="text-[17px] text-[#6B7280] leading-[1.7] max-w-[400px]">
          Handshake takes zero percent from small businesses. Every dollar your clients send
          goes directly to you. No commissions, no revenue splits, no surprises.
        </p>
      </div>

      {/* Right: dark */}
      <div className="bg-[#0D0D0D] px-16 py-24 flex flex-col justify-center relative overflow-hidden">
        {/* Decorative SVG line art — Robinhood-style */}
        <svg
          className="absolute top-0 right-0 opacity-[0.04]"
          width="320"
          height="320"
          viewBox="0 0 320 320"
          fill="none"
          stroke="white"
          strokeWidth="1"
        >
          <circle cx="280" cy="40" r="60" />
          <circle cx="280" cy="40" r="100" />
          <circle cx="280" cy="40" r="140" />
          <circle cx="280" cy="40" r="180" />
          <circle cx="280" cy="40" r="220" />
          <line x1="280" y1="40" x2="80" y2="240" />
          <line x1="280" y1="40" x2="40" y2="160" />
          <line x1="280" y1="40" x2="160" y2="280" />
        </svg>

        <span className="text-[11px] font-bold tracking-[3.5px] uppercase text-[#444] block mb-5">
          Business at Scale
        </span>
        <h2
          className="font-black tracking-[-1.5px] leading-[1.05] text-white mb-5"
          style={{ fontSize: 'clamp(32px, 3vw, 48px)' }}
        >
          Keep{' '}
          <em
            className="text-[#00C566]"
            style={{ fontFamily: 'var(--font-serif-display), Georgia, serif', fontStyle: 'italic' }}
          >
            everything
          </em>
          <br />you earn.
        </h2>
        <p className="text-[16px] text-[#4A4A4A] leading-[1.7] max-w-[400px]">
          Mass-text your entire client list, manage invoices, and collect payments — all inside
          the same thread. Handshake is your CRM, messenger, and payment terminal in one.
        </p>

        {/* B2B card */}
        <div className="bg-[#161616] border border-[#282828] rounded-[18px] p-6 mt-9">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] font-bold tracking-[2px] uppercase text-[#333]">
              Client Book
            </span>
            <div className="flex items-center gap-2">
              <span className="bg-[#00C566] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                247 msgs
              </span>
              <span className="bg-[rgba(0,197,102,0.1)] border border-[rgba(0,197,102,0.2)] rounded-full px-[10px] py-[3px] text-[11px] font-bold text-[#00C566]">
                Live
              </span>
            </div>
          </div>

          {[
            { initial: 'J', gradient: 'linear-gradient(135deg,#00C566,#009E52)', name: 'Jordan M.', amount: '$340', status: 'Paid', paid: true },
            { initial: 'S', gradient: 'linear-gradient(135deg,#FFD700,#B89000)', name: 'Sofia R.', amount: '$180', status: 'Pending', paid: false },
            { initial: 'A', gradient: 'linear-gradient(135deg,#6699FF,#3366CC)', name: 'Alex T.', amount: '$220', status: 'Paid', paid: true },
          ].map((client) => (
            <div key={client.name} className="flex items-center gap-3 py-[11px] border-b border-[#1E1E1E] last:border-b-0">
              <div
                className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[12px] font-extrabold text-black"
                style={{ background: client.gradient }}
              >
                {client.initial}
              </div>
              <span className="text-[13px] font-semibold text-[#CCC] flex-1">{client.name}</span>
              <span className="text-[13px] font-bold text-[#666] mr-2">{client.amount}</span>
              <span
                className={`text-[11px] font-semibold px-[9px] py-[3px] rounded-full ${
                  client.paid
                    ? 'bg-[rgba(0,197,102,0.1)] text-[#00C566]'
                    : 'bg-[rgba(255,255,255,0.06)] text-[#555]'
                }`}
              >
                {client.status}
              </span>
            </div>
          ))}

          {/* Mass bar */}
          <div className="mt-4">
            <div className="flex justify-between mb-2">
              <span className="text-[11px] text-[#444]">Mass blast · 247 recipients</span>
              <strong className="text-[11px] text-[#00C566] font-bold">82% delivered</strong>
            </div>
            <div className="h-1 bg-[#1E1E1E] rounded-full overflow-hidden">
              <div className="h-full w-[82%] bg-[#00C566] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
