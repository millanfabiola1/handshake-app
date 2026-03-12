const ITEMS = [
  'Message',
  'Monetize',
  'Move Money',
  '0% Commission',
  'Locked Content',
  'Paid Calls',
  'Mass Messaging',
  'Tips',
  'P2P Payments',
  'Business at Scale',
  'SMS + Payments',
  'In-Thread Commerce',
]

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div
      className="bg-[#FAFAF8] border-t border-b border-[#EBEBEA] py-[14px] overflow-hidden whitespace-nowrap"
      aria-hidden="true"
    >
      <div className="inline-flex gap-14 animate-ticker">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-[11px] font-semibold tracking-[3px] uppercase text-[#9CA3AF]"
          >
            {item}
            <span className="mx-0.5" style={{ color: '#FF4F6A' }}> + </span>
          </span>
        ))}
      </div>
    </div>
  )
}
