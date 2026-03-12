export default function Footer() {
  return (
    <footer className="bg-[#39FF78] pt-24 pb-12 px-6 md:px-12 lg:px-20 xl:px-28">
      <div >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          {[
            { title: 'Product', items: ['Tips', 'Locked Content', 'Paid Calls', 'Mass Messaging'] },
            { title: 'Company', items: ['About', 'Blog', 'Careers', 'Press'] },
            { title: 'Legal', items: ['Privacy', 'Terms', 'Security'] },
            { title: 'Connect', items: ['Twitter', 'Instagram', 'LinkedIn'] },
          ].map((col) => (
            <div key={col.title}>
              <p className="mono text-[11px] text-black uppercase mb-5">{col.title}</p>
              <div className="flex flex-col gap-3">
                {col.items.map((item) => (
                  <a key={item} href="#" className="text-[14px] font-light text-black no-underline hover:underline transition-all">{item}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full">
          <div className="font-light text-black tracking-[-0.06em] leading-[1] select-none" style={{ fontSize: 'clamp(60px, 15vw, 220px)' }}>
            Handshake
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4 mt-12 pt-8 border-t border-black/10">
          <span className="mono text-[12px] text-black">&copy; 2026 Handshake</span>
          <span className="mono text-[12px] text-black">Message &middot; Monetize &middot; Move Money</span>
        </div>
      </div>
    </footer>
  )
}
