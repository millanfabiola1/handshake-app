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
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const showWaitlist = useWaitlist()

  useEffect(() => {
    const handleScroll = () => {
      const productSection = document.querySelector('#product')
      if (productSection) {
        const rect = productSection.getBoundingClientRect()
        setScrolled(rect.top <= 80)
      } else {
        const heroHeight = document.querySelector('section')?.offsetHeight ?? window.innerHeight
        setScrolled(window.scrollY > heroHeight - 120)
      }
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

  const visible = scrolled

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-50 h-[80px] flex items-center justify-between px-4 md:px-8 lg:px-10 xl:px-12 transition-all duration-300 ${
          visible || mobileOpen
            ? 'bg-white'
            : 'bg-transparent'
        }`}
        style={{ top: scrolled ? 32 : 0 }}
      >
        <a href="#" className="transition-opacity duration-300 hover:opacity-70">
          <img src="/tappd-logo.svg" alt="Tapp'd" className="h-[28px] w-auto" />
        </a>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-10 h-10 flex flex-col items-center justify-center gap-[6px] cursor-pointer group"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[2px] bg-black transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
          <span className={`block w-6 h-[2px] bg-black transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-6 h-[2px] bg-black transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
        </button>
      </nav>

      {/* Menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-transform duration-500 ease-out lg:overflow-hidden ${
          mobileOpen
            ? 'translate-y-0 pointer-events-auto'
            : '-translate-y-full pointer-events-none'
        }`}
        style={{ paddingTop: scrolled ? 72 : 104 }}
      >
        {/* Desktop: multi-column mega-menu — full height, no scroll */}
        <div className="hidden lg:flex lg:flex-col lg:h-full px-8 xl:px-12 py-6">
          <div className="grid grid-cols-3 gap-6 flex-1">
            {menuItems.map((item) => (
              <div key={item.label} className="flex flex-col">
                <h3 className="text-[13px] font-semibold text-black/40 uppercase tracking-widest mb-4">{item.label}</h3>
                {item.children ? (
                  <div className="flex flex-col gap-2 flex-1">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="group flex items-end flex-1 rounded-lg overflow-hidden bg-[#A5F41F] hover:bg-[#94DC1B] transition-colors"
                      >
                        <div className="p-4">
                          <div className="text-[20px] font-medium text-black tracking-[-0.02em] inline-flex items-center gap-2">
                            {child.label} <span className="text-black/40 group-hover:text-black transition-colors text-[14px]">&#x2197;</span>
                          </div>
                          <div className="text-[13px] text-black/50 mt-1">{child.desc}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-end flex-1 rounded-lg overflow-hidden bg-[#A5F41F] hover:bg-[#94DC1B] transition-colors"
                  >
                    <div className="p-4">
                      <div className="text-[20px] font-medium text-black tracking-[-0.02em] inline-flex items-center gap-2">
                        {item.label} <span className="text-black/40 group-hover:text-black transition-colors text-[14px]">&#x2197;</span>
                      </div>
                    </div>
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-black/5">
            <div className="flex items-center gap-5">
              <a href="#" className="text-black/40 hover:text-black transition-colors"><XLogo size={22} weight="regular" /></a>
              <a href="#" className="text-black/40 hover:text-black transition-colors"><InstagramLogo size={22} weight="regular" /></a>
              <a href="#" className="text-black/40 hover:text-black transition-colors"><TiktokLogo size={22} weight="regular" /></a>
              <a href="#" className="text-black/40 hover:text-black transition-colors"><LinkedinLogo size={22} weight="regular" /></a>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-[14px] text-black/50 hover:text-black transition-colors">Sign in</a>
              <button onClick={() => { showWaitlist(); setMobileOpen(false) }} className="text-[14px] font-medium text-black px-7 py-3.5 rounded-lg bg-[#A5F41F] hover:bg-black hover:text-white transition-colors inline-flex items-center gap-2 cursor-pointer">
                Get Tapp'd <span className="text-[16px]">&#x2197;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile: stacked accordion */}
        <div className="lg:hidden px-6 py-8 flex flex-col gap-2">
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
                Get Tapp'd <span className="text-[16px]">&#x2197;</span>
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
