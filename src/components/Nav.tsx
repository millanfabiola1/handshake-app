'use client'
import { useState, useEffect } from 'react'

const menuItems = [
  {
    label: 'Product',
    href: '#product',
    children: [
      { label: 'Tips', desc: 'One-tap payments in-thread', href: '#product' },
      { label: 'Locked Content', desc: 'Gate your best work', href: '#product' },
      { label: 'Paid Calls', desc: 'Billed sessions, your rate', href: '#product' },
      { label: 'Mass Messaging', desc: 'Reach everyone at once', href: '#product' },
    ],
  },
  {
    label: 'Use Cases',
    href: '#use-cases',
    children: [
      { label: 'Creators', desc: 'Turn followers into revenue', href: '#use-cases' },
      { label: 'Service Providers', desc: 'Quote, confirm, collect', href: '#use-cases' },
      { label: 'Coaches', desc: 'Premium sessions, no overhead', href: '#use-cases' },
    ],
  },
  { label: 'Pricing', href: '#pricing', children: null },
]

export default function Nav() {
  const [open, setOpen] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.querySelector('section')?.offsetHeight ?? window.innerHeight
      setScrolled(window.scrollY > heroHeight - 120)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const visible = scrolled || hovered || open !== null

  return (
    <nav
      className={`fixed top-[32px] left-0 right-0 z-50 h-[72px] flex items-center justify-between px-6 md:px-12 lg:px-20 xl:px-28 transition-all duration-300 ${
        visible
          ? `bg-white border-b ${open ? 'border-transparent' : 'border-black/5'} shadow-sm`
          : 'bg-transparent border-b border-transparent'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setOpen(null) }}
    >
      <a href="#" className="text-[16px] font-light tracking-[-0.3px] text-black transition-colors duration-300">Handshake</a>

      <div className="hidden md:flex items-center gap-8">
        {menuItems.map((item) => (
          <div key={item.label} onMouseEnter={() => setOpen(item.children ? item.label : null)}>
            <a href={item.href} className="mono text-[13px] text-black/50 hover:text-black transition-colors duration-300 py-6 inline-flex items-center gap-1">
              {item.label}
              {item.children && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
              )}
            </a>
          </div>
        ))}
      </div>

      {/* Full-width megamenu */}
      {menuItems.map((item) =>
        item.children && open === item.label ? (
          <div key={item.label} className="absolute top-full left-0 right-0 bg-white shadow-lg">
            <div className={`px-6 md:px-12 lg:px-20 xl:px-28 py-8 grid gap-4 ${item.children.length === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'}`}>
              {item.children.map((child) => (
                <a key={child.label} href={child.href} className="group block rounded-lg hover:ring-1 hover:ring-black/10 transition-all">
                  <div
                    className="h-[120px] bg-cover bg-center rounded-lg"
                    style={{ backgroundImage: 'url(/hologram-light.png)' }}
                  />
                  <div className="px-4 py-4">
                    <div className="text-[14px] font-light text-black group-hover:text-[#39FF78] transition-colors">{child.label}</div>
                    <div className="mono text-[11px] text-black/40 mt-1">{child.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ) : null
      )}

      <div className="flex items-center gap-4">
        <a href="#" className="mono text-[13px] text-black/50 hover:text-black transition-colors duration-300 hidden sm:block">Sign in</a>
        <a href="#" className="text-[13px] font-medium text-black px-5 py-2 rounded-lg bg-[#39FF78] hover:bg-[#2DE86A] transition-colors">Join waitlist</a>
      </div>
    </nav>
  )
}
