const logos = ['TechCrunch', 'Forbes', 'Bloomberg', 'Fast Company', 'Wired', 'The Verge', 'WSJ', 'Fortune']
const doubled = [...logos, ...logos]

export default function LogoStrip() {
  return (
    <section className="pt-16 pb-32 bg-white overflow-hidden sticky top-0 z-[2] rounded-t-[24px]">
      <p className="mono text-[11px] text-[#A1A1AA] text-center mb-10 uppercase px-6">Backed by leading investors</p>
      <div className="relative">
        <div className="inline-flex gap-16 md:gap-24 whitespace-nowrap" style={{ animation: 'marquee 30s linear infinite' }}>
          {doubled.map((name, i) => (
            <span key={i} className="text-[18px] font-light text-[#C4C4C4] tracking-[-0.02em] select-none flex-shrink-0">{name}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
