'use client'
import { useState, useEffect } from 'react'
import { CaretDown, List, X, CurrencyDollar, LockSimple, PhoneCall, Megaphone, PaintBrush, Wrench, UserCircle, ArrowRight, XLogo, InstagramLogo, TiktokLogo, LinkedinLogo } from '@phosphor-icons/react'
import { useWaitlist } from './WaitlistContext'

const menuItems = [
  {
    label: 'Product',
    href: '#product',
    children: [
      { label: 'Tips', desc: 'One-tap payments in-thread', href: '#product', icon: CurrencyDollar, img: '/image%201.png' },
      { label: 'Locked Content', desc: 'Gate your best work', href: '#product', icon: LockSimple, img: '/image%202.png' },
      { label: 'Paid Calls', desc: 'Billed sessions, your rate', href: '#product', icon: PhoneCall, img: '/image%203.png' },
    ],
  },
  {
    label: 'Use Cases',
    href: '#use-cases',
    children: [
      { label: 'Creators', desc: 'Turn followers into revenue', href: '#use-cases', icon: PaintBrush, img: '/image%201.png' },
      { label: 'Service Providers', desc: 'Quote, confirm, collect', href: '#use-cases', icon: Wrench, img: '/image%202.png' },
      { label: 'Coaches', desc: 'Premium sessions, no overhead', href: '#use-cases', icon: UserCircle, img: '/image%203.png' },
    ],
  },
  { label: 'Pricing', href: '#pricing', children: null },
]

export default function Nav() {
  const [open, setOpen] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
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

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const visible = scrolled || hovered || open !== null

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-50 h-[80px] flex items-center justify-between px-4 md:px-8 lg:px-10 xl:px-12 transition-all duration-300 ${
          visible || mobileOpen
            ? `border-b ${open ? 'bg-[#A5F41F] border-transparent' : 'bg-white border-black/5'}`
            : 'bg-transparent border-b border-transparent'
        }`}
        style={{ top: scrolled ? 32 : 0 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setOpen(null) }}
      >
        <a href="#" className="transition-opacity duration-300 hover:opacity-70">
          <img src="/handshake-logo.svg" alt="Handshake" className="h-[28px] w-auto" />
        </a>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <div key={item.label} onMouseEnter={() => setOpen(item.children ? item.label : null)}>
              <a href={item.href} className="text-[16px] font-medium text-black hover:text-black/60 transition-colors duration-300 py-6 inline-flex items-center gap-1.5">
                {item.label}
                {item.children && (
                  <CaretDown size={14} weight="bold" />
                )}
              </a>
            </div>
          ))}
        </div>

        {/* Full-width megamenu (desktop) */}
        {menuItems.map((item) =>
          item.children ? (
            <div
              key={item.label}
              className={`absolute top-full left-0 right-0 bg-[#A5F41F] transition-all duration-300 ease-out origin-top hidden lg:block ${
                open === item.label
                  ? 'opacity-100 translate-y-0 scale-y-100 pointer-events-auto'
                  : 'opacity-0 -translate-y-2 scale-y-95 pointer-events-none'
              }`}
            >
              <div className="grid gap-3 p-3 grid-cols-3">
                {item.children.map((child) => (
                  <a
                    key={child.label}
                    href={child.href}
                    className="group h-[280px] flex items-end transition-all duration-300 overflow-hidden rounded-sm bg-white hover:bg-black"
                  >
                    <div className="p-6">
                      <div className="text-[32px] font-medium text-[#18181B] group-hover:text-white tracking-[-0.02em] transition-colors duration-300 inline-flex items-center gap-2">{child.label} <span className="text-[#18181B] group-hover:text-white transition-colors duration-300">&#x2197;</span></div>
                      <div className="text-[15px] text-[#71717A] group-hover:text-white/70 mt-0.5 transition-colors duration-300">{child.desc}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ) : null
        )}

        <div className="flex items-center gap-4">
          <a href="#" className="text-[16px] font-medium text-black hover:text-black/60 transition-colors duration-300 hidden lg:block">Sign in</a>
          <button onClick={showWaitlist} className="text-[16px] font-medium text-black px-7 py-3 rounded-lg bg-[#A5F41F] hover:bg-black hover:text-white transition-colors items-center gap-2 cursor-pointer hidden lg:inline-flex">Join waitlist <span className="text-[16px]">&#x2197;</span></button>
          {/* Hamburger button (mobile/tablet) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-black cursor-pointer"
          >
            {mobileOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
          </button>
        </div>
      </nav>

      {/* Blur overlay when megamenu is open */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-all duration-300 hidden lg:block ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onMouseEnter={() => { setHovered(false); setOpen(null) }}
      />

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white lg:hidden overflow-y-auto transition-all duration-500 ease-out ${
          mobileOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        style={{ paddingTop: scrolled ? 72 : 104 }}
      >
        <div className="px-6 py-8 flex flex-col gap-2">
            {menuItems.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      className="w-full flex items-center justify-between py-4 border-b border-black/5 cursor-pointer"
                    >
                      <span className="text-[24px] font-light text-black tracking-[-0.02em]">{item.label}</span>
                      <CaretDown
                        size={20}
                        weight="bold"
                        className={`text-black/40 transition-transform duration-300 ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${mobileExpanded === item.label ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="flex flex-col gap-3 py-3">
                        {item.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="h-[140px] rounded-lg overflow-hidden flex items-end bg-black transition-all duration-300"
                          >
                            <div className="p-4">
                              <div className="text-[20px] font-medium text-white tracking-[-0.02em] transition-colors duration-300 inline-flex items-center gap-2">{child.label} <span className="text-white transition-colors duration-300 text-[14px]">&#x2197;</span></div>
                              <div className="text-[13px] text-white/50 transition-colors duration-300">{child.desc}</div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between py-4 border-b border-black/5"
                  >
                    <span className="text-[24px] font-light text-black tracking-[-0.02em]">{item.label}</span>
                    <span className="text-black/40 text-[14px]">&#x2197;</span>
                  </a>
                )}
              </div>
            ))}

            <div className="flex flex-col gap-4 mt-8">
              <button onClick={() => { showWaitlist(); setMobileOpen(false) }} className="text-[14px] font-medium text-black px-7 py-3.5 rounded-lg bg-[#A5F41F] hover:bg-black hover:text-white transition-colors inline-flex items-center justify-center gap-2 cursor-pointer w-full">
                Join waitlist <span className="text-[16px]">&#x2197;</span>
              </button>
              <a href="#" className="text-[14px] text-black/50 text-center py-3">Sign in</a>
              <div className="flex items-center justify-center gap-5 mt-4">
                <a href="#" className="text-black/40 hover:text-black transition-colors"><XLogo size={22} weight="regular" /></a>
                <a href="#" className="text-black/40 hover:text-black transition-colors"><InstagramLogo size={22} weight="regular" /></a>
                <a href="#" className="text-black/40 hover:text-black transition-colors"><TiktokLogo size={22} weight="regular" /></a>
                <a href="#" className="text-black/40 hover:text-black transition-colors"><LinkedinLogo size={22} weight="regular" /></a>
              </div>
            </div>
          </div>
      </div>
    </>
  )
}
