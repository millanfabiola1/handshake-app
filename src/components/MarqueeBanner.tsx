'use client'
import { useEffect, useState } from 'react'

const items = ['0% Fees', 'Tips', 'Locked Content', 'Paid Calls', 'Mass Messaging', 'Keep 100%', 'Messages Meet Money', 'Get Tapp\'d']
const doubled = [...items, ...items]

// Sections with green backgrounds where marquee should be black
const greenSectionSelectors = ['#use-cases']

export default function MarqueeBanner() {
  const [hidden, setHidden] = useState(true)
  const [onGreen, setOnGreen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const productSection = document.querySelector('#product')
      if (productSection) {
        const rect = productSection.getBoundingClientRect()
        setHidden(rect.top > 80)
      } else {
        const heroHeight = document.querySelector('section')?.offsetHeight ?? window.innerHeight
        setHidden(window.scrollY < heroHeight - 120)
      }

      // Check if a green-bg section is at the top
      let isOnGreen = false

      // Hero check — first section with green bg
      const hero = document.querySelector('section')
      if (hero) {
        const rect = hero.getBoundingClientRect()
        if (rect.top <= 32 && rect.bottom > 32) {
          isOnGreen = true
        }
      }

      // Named green sections
      for (const sel of greenSectionSelectors) {
        const el = document.querySelector(sel)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 32 && rect.bottom > 32) {
            isOnGreen = true
            break
          }
        }
      }

      setOnGreen(isOnGreen)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const bg = onGreen ? 'bg-[#0A0A0B]' : 'bg-[#A5F41F]'
  const text = onGreen ? 'text-white' : 'text-black'
  const accent = onGreen ? 'text-white/50' : 'text-black/50'

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[120] ${bg} h-[32px] flex items-center overflow-hidden transition-all duration-500`}
      style={{ transform: hidden ? 'translateY(-100%)' : 'translateY(0)' }}
    >
      <div
        className="flex gap-16 whitespace-nowrap"
        style={{ animation: 'marquee 30s linear infinite', willChange: 'transform' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className={`text-[11px] font-normal ${text} uppercase tracking-[0.08em] flex-shrink-0 inline-flex items-center gap-3 transition-colors duration-500`}>
            {item}
            <span className={`${accent} text-[14px] leading-none transition-colors duration-500`}>&#x2197;</span>
          </span>
        ))}
      </div>
    </div>
  )
}
