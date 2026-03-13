'use client'
import { XLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'

const socialLinks = [
  { label: 'Twitter', icon: XLogo, href: '#' },
  { label: 'Instagram', icon: InstagramLogo, href: '#' },
  { label: 'LinkedIn', icon: LinkedinLogo, href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1D] relative z-[8]">
      <div className="bg-[#39FF78] rounded-t-[24px] pt-24 pb-12 px-4 md:px-8 lg:px-10 xl:px-12">
      <div >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          {[
            { title: 'Product', items: ['Tips', 'Locked Content', 'Paid Calls', 'Mass Messaging'] },
            { title: 'Company', items: ['About', 'Blog', 'Careers', 'Press'] },
            { title: 'Legal', items: ['Privacy', 'Terms', 'Security'] },
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
          <div>
            <p className="mono text-[11px] text-black uppercase mb-5">Connect</p>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-[14px] font-light text-black no-underline hover:underline transition-all inline-flex items-center gap-2">
                  <link.icon size={16} weight="regular" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="font-light text-black tracking-[-0.06em] leading-[1] select-none" style={{ fontSize: 'clamp(60px, 15vw, 220px)' }}>
            Handshake
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4 mt-12 pt-8 border-t border-black/10">
          <span className="mono text-[12px] font-normal text-black">&copy; 2026 Handshake</span>
          <span className="mono text-[12px] font-normal text-black">Message &middot; Monetize &middot; Move Money</span>
        </div>
      </div>
      </div>
    </footer>
  )
}
