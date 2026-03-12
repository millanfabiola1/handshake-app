'use client'
import { useState, useEffect } from 'react'
import { CaretDown, CurrencyDollar, LockSimple, PhoneCall, Megaphone, PaintBrush, Wrench, UserCircle, ArrowRight } from '@phosphor-icons/react'

const menuItems = [
  {
    label: 'Product',
    href: '#product',
    children: [
      { label: 'Tips', desc: 'One-tap payments in-thread', href: '#product', icon: CurrencyDollar },
      { label: 'Locked Content', desc: 'Gate your best work', href: '#product', icon: LockSimple },
      { label: 'Paid Calls', desc: 'Billed sessions, your rate', href: '#product', icon: PhoneCall },
      { label: 'Mass Messaging', desc: 'Reach everyone at once', href: '#product', icon: Megaphone },
    ],
  },
  {
    label: 'Use Cases',
    href: '#use-cases',
    children: [
      { label: 'Creators', desc: 'Turn followers into revenue', href: '#use-cases', icon: PaintBrush },
      { label: 'Service Providers', desc: 'Quote, confirm, collect', href: '#use-cases', icon: Wrench },
      { label: 'Coaches', desc: 'Premium sessions, no overhead', href: '#use-cases', icon: UserCircle },
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
      className={`fixed top-[32px] left-0 right-0 z-50 h-[72px] flex items-center justify-between px-4 md:px-8 lg:px-10 xl:px-12 transition-all duration-300 ${
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
                <CaretDown size={12} weight="bold" />
              )}
            </a>
          </div>
        ))}
      </div>

      {/* Full-width megamenu */}
      {menuItems.map((item) =>
        item.children ? (
          <div
            key={item.label}
            className={`absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-out origin-top ${
              open === item.label
                ? 'opacity-100 translate-y-0 scale-y-100 pointer-events-auto'
                : 'opacity-0 -translate-y-2 scale-y-95 pointer-events-none'
            }`}
          >
            <div className={`px-4 md:px-8 lg:px-10 xl:px-12 py-8 grid gap-4 ${item.children.length === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'}`}>
              {item.children.map((child) => (
                <a key={child.label} href={child.href} className="group block p-3 rounded-xl transition-all duration-300 hover:bg-black">
                  <div
                    className="h-[120px] bg-cover bg-center rounded-lg flex items-center justify-center overflow-hidden"
                    style={{ backgroundImage: 'url(/hologram-light.png)' }}
                  >
                    {child.icon && <child.icon size={32} weight="light" className="text-black/30 group-hover:text-black transition-colors" />}
                  </div>
                  <div className="px-4 py-4">
                    <div className="text-[14px] font-light text-black group-hover:text-white transition-colors">{child.label}</div>
                    <div className="mono text-[11px] text-black/40 group-hover:text-white/50 mt-1">{child.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ) : null
      )}

      <div className="flex items-center gap-4">
        <a href="#" className="mono text-[13px] text-black/50 hover:text-black transition-colors duration-300 hidden sm:block">Sign in</a>
        <a href="#" className="text-[13px] font-medium text-black px-5 py-2 rounded-lg bg-[#39FF78] hover:bg-[#2DE86A] transition-colors inline-flex items-center gap-1.5">Join waitlist <ArrowRight size={14} weight="bold" /></a>
      </div>
    </nav>
  )
}
