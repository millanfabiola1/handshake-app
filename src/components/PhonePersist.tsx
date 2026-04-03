'use client'
import { useEffect, useRef, useState } from 'react'

export default function PhonePersist() {
  const [opacity, setOpacity] = useState(1)
  const [visible, setVisible] = useState(true)
  const [scale, setScale] = useState(1)
  const phoneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const wrapper = document.querySelector('#product')?.parentElement
      const useCases = document.querySelector('#use-cases')
      const vh = window.innerHeight

      // Scale up as section 2 scrolls in
      if (wrapper) {
        const wrapperTop = wrapper.getBoundingClientRect().top
        const p = Math.min(Math.max((vh - wrapperTop) / vh * 3, 0), 1)
        // Scale from 1 to 1.35 as section 2 arrives
        setScale(1 + p * 0.35)
      }

      // Fade out as section 3 approaches
      if (useCases) {
        const rect = useCases.getBoundingClientRect()
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
      className="fixed z-[55] pointer-events-none hidden lg:block"
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
