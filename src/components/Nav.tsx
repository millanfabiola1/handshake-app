'use client'
import { useState, useEffect } from 'react'
import { CaretDown, CurrencyDollar, LockSimple, PhoneCall, Megaphone, PaintBrush, Wrench, UserCircle, ArrowRight } from '@phosphor-icons/react'
import { useWaitlist } from './WaitlistContext'

const menuItems = [
  {
    label: 'Product',
    href: '#product',
    children: [
      { label: 'Tips', desc: 'One-tap payments in-thread', href: '#product', icon: CurrencyDollar, img: '/image.png' },
      { label: 'Locked Content', desc: 'Gate your best work', href: '#product', icon: LockSimple, img: '/image.png' },
      { label: 'Paid Calls', desc: 'Billed sessions, your rate', href: '#product', icon: PhoneCall, img: '/image.png' },
    ],
  },
  {
    label: 'Use Cases',
    href: '#use-cases',
    children: [
      { label: 'Creators', desc: 'Turn followers into revenue', href: '#use-cases', icon: PaintBrush, img: '/image.png' },
      { label: 'Service Providers', desc: 'Quote, confirm, collect', href: '#use-cases', icon: Wrench, img: '/image.png' },
      { label: 'Coaches', desc: 'Premium sessions, no overhead', href: '#use-cases', icon: UserCircle, img: '/image.png' },
    ],
  },
  { label: 'Pricing', href: '#pricing', children: null },
]

export default function Nav() {
  const [open, setOpen] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState(false)
  const showWaitlist = useWaitlist()

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
      className={`fixed left-0 right-0 z-50 h-[72px] flex items-center justify-between px-4 md:px-8 lg:px-10 xl:px-12 transition-all duration-300 ${
        visible
          ? `bg-white border-b ${open ? 'border-transparent' : 'border-black/5'}`
          : 'bg-transparent border-b border-transparent'
      }`}
      style={{ top: scrolled ? 0 : 32 }}
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
            className={`absolute top-full left-0 right-0 bg-white transition-all duration-300 ease-out origin-top ${
              open === item.label
                ? 'opacity-100 translate-y-0 scale-y-100 pointer-events-auto'
                : 'opacity-0 -translate-y-2 scale-y-95 pointer-events-none'
            }`}
          >
            <div className="grid gap-3 p-3 grid-cols-1 md:grid-cols-3">
              {item.children.map((child) => (
                <a
                  key={child.label}
                  href={child.href}
                  className="group relative h-[280px] bg-cover bg-center flex items-end transition-all duration-300 overflow-hidden rounded-sm"
                  style={{ backgroundImage: `url(${child.img})` }}
                >
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black transition-all duration-300" />
                  <div className="relative z-10 p-6">
                    <div className="text-[32px] font-medium text-white uppercase tracking-[-0.02em] transition-colors duration-300 inline-flex items-center gap-2">{child.label} <span className="text-white transition-colors duration-300">&#x2197;</span></div>
                    <div className="mono text-[15px] text-white/50 group-hover:text-white/70 mt-0.5 uppercase transition-colors duration-300">{child.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ) : null
      )}

      <div className="flex items-center gap-4">
        <a href="#" className="mono text-[13px] text-black/50 hover:text-black transition-colors duration-300 hidden sm:block">Sign in</a>
        <button onClick={showWaitlist} className="text-[13px] font-medium text-black px-5 py-2 rounded-lg bg-[#39FF78] hover:bg-black hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer">Join waitlist <span className="text-[14px]">&#x2197;</span></button>
      </div>
    </nav>
  )
}
