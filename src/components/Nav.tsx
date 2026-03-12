export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[400] h-16 flex items-center justify-between px-8 bg-white/95 backdrop-blur-[12px] border-b border-[#EBEBEA]">
      {/* Brand */}
      <div className="flex items-center gap-[10px]">
        <div
          className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-[#00C566] text-black font-black text-[15px] leading-none"
          style={{ borderRadius: '8px' }}
        >
          H
        </div>
        <span className="text-[17px] font-extrabold text-[#0D0D0D] tracking-[-0.5px]">andshake</span>
      </div>

      {/* Centered links */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex gap-2">
        <a href="#features" className="text-[14px] font-medium text-[#6B7280] px-[14px] py-[6px] rounded-full hover:bg-[#FAFAF8] hover:text-[#0D0D0D] transition-colors">
          Product
        </a>
        <a href="#who" className="text-[14px] font-medium text-[#6B7280] px-[14px] py-[6px] rounded-full hover:bg-[#FAFAF8] hover:text-[#0D0D0D] transition-colors">
          For Business
        </a>
        <a href="#tools" className="text-[14px] font-medium text-[#6B7280] px-[14px] py-[6px] rounded-full hover:bg-[#FAFAF8] hover:text-[#0D0D0D] transition-colors">
          Pricing
        </a>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <a
          href="#"
          className="text-[14px] font-semibold text-[#0D0D0D] px-[18px] py-[7px] rounded-full border border-[#EBEBEA] bg-white hover:border-[#CCC] hover:bg-[#FAFAF8] transition-colors"
        >
          Log in
        </a>
        <a
          href="#"
          className="text-[14px] font-bold text-black px-[18px] py-[7px] rounded-full bg-[#00C566] hover:bg-[#009E52] transition-colors flex items-center gap-[6px]"
        >
          Join waitlist →
        </a>
      </div>
    </nav>
  )
}
