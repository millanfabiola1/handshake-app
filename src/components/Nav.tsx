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
        className={`fixed left-0 right-0 z-[115] h-[80px] flex items-center justify-between px-4 md:px-8 lg:px-10 xl:px-12 transition-all duration-300 ${
          visible || mobileOpen
            ? 'bg-white'
            : 'bg-transparent'
        }`}
        style={{ top: 32 }}
      >
        <a href="#" className="transition-opacity duration-300 hover:opacity-70">
          <svg width="90" height="28" viewBox="0 0 464 143" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Tapp'd">
            <g clipPath="url(#nav-clip)">
              <path d="M90.0219 109.708V36.9541C90.0219 33.3164 86.2629 30.867 82.9405 32.3463L41.5921 50.6803C39.7733 51.4806 38.585 53.2994 38.585 55.288V128.042C38.585 131.679 42.3439 134.129 45.6663 132.65L87.0147 114.316C88.8336 113.515 90.0219 111.696 90.0219 109.708Z" fill="currentColor"/>
              <path d="M30.6546 50.1242V96.9292C30.6546 98.9178 29.4905 100.737 27.6474 101.537L7.08234 110.655C3.75992 112.135 0.000976562 109.685 0.000976562 106.048V33.2939C0.000976562 31.3053 1.16504 29.4864 3.00813 28.6861L44.3565 10.3522C47.6789 8.87288 51.4379 11.3223 51.4379 14.9599V34.3609C51.4379 36.3495 50.2738 38.1684 48.4307 38.9687L33.6375 45.5165C31.8186 46.3168 30.6303 48.1356 30.6303 50.1242H30.6546Z" fill="currentColor"/>
            </g>
            <path d="M174.566 112.438C160.536 112.438 155.02 104.404 155.02 90.8535V60.635H146.506L146.746 49.2431H151.303C156.939 48.8833 159.217 46.7249 159.817 41.4486L160.896 34.4936H169.77V48.5236H185.958V60.9947H169.77V90.134C169.77 96.7294 173.367 98.648 178.044 98.648C180.802 98.648 183.8 98.0484 186.198 96.3696V110.52C181.641 112.078 177.684 112.438 174.566 112.438ZM209.59 112.678C199.277 112.678 191.363 107.042 191.363 95.4103C191.363 78.982 207.311 76.7036 219.663 74.785C229.616 73.346 232.493 72.6265 232.493 68.1896C232.493 62.6736 228.656 58.8363 221.461 58.8363C214.746 58.8363 207.911 62.1939 206.832 70.8278L193.281 67.71C195.56 53.0804 207.431 46.8448 221.581 46.8448C240.288 46.8448 247.363 57.2774 247.363 73.9455V85.4574C247.483 93.7315 247.723 102.845 248.322 111.119H234.892C234.532 105.963 234.292 100.447 234.172 94.451H232.613C229.975 104.524 221.701 112.678 209.59 112.678ZM215.346 101.406C222.181 101.406 230.095 96.4895 232.733 85.8171L232.613 80.0612C223.74 84.1383 206.232 81.6201 206.232 93.1319C206.232 98.2883 209.949 101.406 215.346 101.406ZM258.712 130.066V77.7828V48.5236H271.782L271.423 66.5108L273.101 66.6307C275.62 53.56 282.695 46.8448 293.967 46.8448C309.915 46.8448 319.389 59.3159 319.389 79.8214C319.389 99.9671 310.275 112.678 294.686 112.678C282.455 112.678 276.099 104.884 273.341 92.5323H271.423C272.742 99.9671 273.941 107.282 273.941 113.398V130.066H258.712ZM289.65 100.207C298.643 100.207 303.68 91.8129 303.68 79.9413C303.68 67.8299 298.404 59.7956 289.53 59.7956C279.337 59.7956 273.821 69.8684 273.821 78.982V80.6608C273.821 89.1747 279.337 100.207 289.65 100.207ZM328.684 130.066V77.7828V48.5236H341.755L341.395 66.5108L343.074 66.6307C345.592 53.56 352.667 46.8448 363.939 46.8448C379.888 46.8448 389.361 59.3159 389.361 79.8214C389.361 99.9671 380.247 112.678 364.658 112.678C352.427 112.678 346.072 104.884 343.313 92.5323H341.395C342.714 99.9671 343.913 107.282 343.913 113.398V130.066H328.684ZM359.622 100.207C368.616 100.207 373.652 91.8129 373.652 79.9413C373.652 67.8299 368.376 59.7956 359.502 59.7956C349.309 59.7956 343.793 69.8684 343.793 78.982V80.6608C343.793 89.1747 349.309 100.207 359.622 100.207ZM421.2 112.678C406.211 112.678 395.898 100.687 395.898 79.5815C395.898 59.7956 404.892 46.9647 420.6 46.9647C432.952 46.9647 439.307 54.6393 442.065 67.9498H443.984C442.665 59.6757 441.466 51.7613 441.466 46.1253V26.819H456.695V111.119H443.624L443.984 92.4124H442.185C439.307 105.843 432.592 112.678 421.2 112.678ZM425.877 100.207C436.189 100.207 441.466 89.5345 441.466 80.7807V79.1019C441.466 70.8278 436.189 59.5558 425.877 59.5558C416.763 59.5558 411.607 68.0697 411.607 80.0612C411.607 92.0527 417.003 100.207 425.877 100.207Z" fill="currentColor"/>
            <defs><clipPath id="nav-clip"><rect width="90.0206" height="123.172" fill="white" transform="translate(0 9.91406)"/></clipPath></defs>
          </svg>
        </a>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { showWaitlist(); setMobileOpen(false) }}
            className={`text-[13px] font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer ${scrolled ? 'bg-[#A5F41F] text-black hover:bg-[#94DC1B]' : 'bg-black text-white hover:bg-black/80'}`}
          >
            Join Waitlist
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-[6px] cursor-pointer group"
            aria-label="Toggle menu"
          >
          <span className={`block w-6 h-[2px] bg-black transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
          <span className={`block w-6 h-[2px] bg-black transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-6 h-[2px] bg-black transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Menu overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-white transition-transform duration-500 ease-out lg:overflow-hidden ${
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
