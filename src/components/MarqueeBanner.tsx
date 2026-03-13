'use client'
import { useEffect, useState } from 'react'

const items = ['Message', 'Monetize', 'Move Money', '0% Commission', 'Locked Content', 'Paid Calls', 'Mass Messaging', 'In-Thread Commerce']
const doubled = [...items, ...items]

export default function MarqueeBanner() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.querySelector('section')?.offsetHeight ?? window.innerHeight
      setHidden(window.scrollY > heroHeight - 120)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] bg-[#39FF78] h-[32px] flex items-center overflow-hidden transition-transform duration-300"
      style={{ transform: hidden ? 'translateY(-100%)' : 'translateY(0)' }}
    >
      <div
        className="flex gap-16 whitespace-nowrap"
        style={{ animation: 'marquee 30s linear infinite', willChange: 'transform' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="text-[11px] font-normal text-black uppercase tracking-[0.08em] flex-shrink-0 inline-flex items-center gap-3">
            {item}
            <span className="text-black/50 text-[14px] leading-none">&#x2197;</span>
          </span>
        ))}
      </div>
    </div>
  )
}
