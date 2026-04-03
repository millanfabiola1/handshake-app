'use client'
import { useEffect, useRef, useState } from 'react'

export default function PhonePersist() {
  const [opacity, setOpacity] = useState(1)
  const [visible, setVisible] = useState(true)
  const phoneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const useCases = document.querySelector('#use-cases')
      if (useCases) {
        const rect = useCases.getBoundingClientRect()
        const vh = window.innerHeight
        // Fade out as section 3 approaches
        if (rect.top < vh) {
          const progress = Math.max(0, rect.top / vh)
          setOpacity(progress)
          setVisible(rect.top > -100)
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

  if (!visible) return null

  return (
    <div
      ref={phoneRef}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] pointer-events-none hidden lg:block"
      style={{
        opacity,
        transition: 'opacity 0.1s ease-out',
      }}
    >
      <div className="relative w-[clamp(180px,18vw,260px)]">
        <div className="relative bg-black rounded-[clamp(24px,4vw,44px)] p-[clamp(5px,1vw,12px)] shadow-2xl shadow-black/30">
          <div className="absolute top-[clamp(7px,1.2vw,14px)] left-1/2 -translate-x-1/2 z-20 w-[clamp(50px,12vw,100px)] h-[clamp(16px,2.5vw,28px)] bg-black rounded-full" />
          <div className="relative rounded-[clamp(18px,3.5vw,36px)] overflow-hidden bg-white">
            <video
              src="/demo.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto block"
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
