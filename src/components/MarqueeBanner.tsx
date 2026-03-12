const items = ['Message', 'Monetize', 'Move Money', '0% Commission', 'Locked Content', 'Paid Calls', 'Mass Messaging', 'In-Thread Commerce']
const doubled = [...items, ...items]

export default function MarqueeBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-[#39FF78] h-[32px] flex items-center overflow-hidden">
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{ animation: 'marquee 20s linear infinite', willChange: 'transform' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="mono text-[11px] font-bold text-black uppercase tracking-[0.08em] flex-shrink-0 inline-flex items-center gap-12">
            {item}
            <span className="text-black/50 text-[16px] leading-none">&#x2022;</span>
          </span>
        ))}
      </div>
    </div>
  )
}
