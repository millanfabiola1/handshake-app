'use client'
import { useEffect, useRef, useState } from 'react'

export default function PhonePersist() {
  const [opacity, setOpacity] = useState(1)
  const [visible, setVisible] = useState(true)
  const [scale, setScale] = useState(1)
  const [menuOpen, setMenuOpen] = useState(false)
  const phoneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setMenuOpen(document.body.style.overflow === 'hidden')
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const update = () => {
      const wrapper = document.querySelector('#product')
      const vh = window.innerHeight

      if (wrapper) {
        const rect = wrapper.getBoundingClientRect()
        const scrolledIn = Math.max(0, -rect.top)
        const wrapperHeight = wrapper.offsetHeight

        // Scale up slightly as product section enters (0 → 1.15)
        const enterP = Math.min(Math.max((vh - rect.top) / vh, 0), 1)
        setScale(1 + enterP * 0.15)

        // Fade out after 18% of product section scrolled
        // (before the first flip starts at 25%)
        const productProgress = scrolledIn / wrapperHeight
        if (productProgress > 0.10) {
          const fade = Math.max(0, 1 - (productProgress - 0.10) / 0.12)
          setOpacity(fade)
          if (fade <= 0) setVisible(false)
        } else {
          setOpacity(1)
          setVisible(true)
        }
      }
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  if (!visible || menuOpen) return null

  return (
    <div
      ref={phoneRef}
      className="fixed z-[116] pointer-events-none hidden lg:block"
      style={{
        top: '50%',
        left: '50%',
        opacity,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transition: 'opacity 0.1s ease-out',
      }}
    >
      <div className="relative w-[clamp(180px,18vw,260px)]">
        <div className="relative bg-black rounded-[clamp(24px,4vw,44px)] p-[clamp(5px,1vw,12px)] shadow-2xl shadow-black/30">
          <div className="absolute top-[clamp(7px,1.2vw,14px)] left-1/2 -translate-x-1/2 z-20 w-[clamp(50px,12vw,100px)] h-[clamp(16px,2.5vw,28px)] bg-black rounded-full" />
          <div className="relative rounded-[clamp(18px,3.5vw,36px)] overflow-hidden bg-black" style={{ aspectRatio: '9 / 19.5' }}>
            <video
              src="/demo.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="absolute -right-[3px] top-[25%] w-[3px] h-[50px] bg-[#2a2a2a] rounded-r-sm" />
        <div className="absolute -left-[3px] top-[20%] w-[3px] h-[30px] bg-[#2a2a2a] rounded-l-sm" />
        <div className="absolute -left-[3px] top-[30%] w-[3px] h-[45px] bg-[#2a2a2a] rounded-l-sm" />
      </div>
    </div>
  )
}
