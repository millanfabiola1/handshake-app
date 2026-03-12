export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t border-[#1C1C1C] px-12 py-12 flex items-center justify-between gap-6 flex-wrap">
      {/* Brand */}
      <div className="flex items-center gap-[10px]">
        <div
          className="w-7 h-7 flex items-center justify-center flex-shrink-0 bg-[#00C566] text-black font-black text-[13px] leading-none"
          style={{ borderRadius: '7px' }}
        >
          H
        </div>
        <span className="text-[16px] font-extrabold text-white tracking-[-0.3px]">andshake</span>
      </div>

      {/* Tagline */}
      <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#2A2A2A]">
        Message · Monetize · Move Money
      </div>

      {/* Legal */}
      <div className="text-[12px] text-[#2A2A2A] text-right leading-[1.8]">
        handshake.app · The platform that puts money in your pocket.<br />
        &copy; 2026 Handshake. All rights reserved.
      </div>
    </footer>
  )
}
