'use client'

export default function Footer() {
  return (
    <footer
      className="relative z-[205] overflow-hidden"
      style={{
        background: '#A5F41F',
      }}
    >
      <div className="noise-texture absolute inset-0 opacity-20 pointer-events-none" />

      <div className="relative z-[1] px-6 md:px-10 xl:px-14 pt-16 pb-10">

        {/* Wordmark — centered */}
        <div className="mb-10 flex justify-center">
          <img
            src="/tappd-logo.svg"
            alt="tappd"
            className="h-auto select-none"
            style={{ filter: 'brightness(0)', width: 'clamp(110px, 14vw, 190px)' }}
          />
        </div>

        {/* Bottom bar — centered */}
        <div className="flex flex-col items-center gap-3 border-t border-black/10 pt-6">
          <div className="flex gap-5">
            <a href="#" className="mono text-[11px] text-black/45 hover:text-black/80 transition-colors no-underline">Privacy</a>
            <a href="#" className="mono text-[11px] text-black/45 hover:text-black/80 transition-colors no-underline">Terms</a>
          </div>
          <p className="mono text-[11px] text-black/40">&copy; 2026 tappd &middot; Tap &middot; Text &middot; Get Paid</p>
        </div>

      </div>
    </footer>
  )
}
