'use client'
import { useEffect, useRef, useState } from 'react'
import { X, ArrowRight } from '@phosphor-icons/react'

export function useWaitlistModal() {
  const [open, setOpen] = useState(false)
  return { open, show: () => setOpen(true), hide: () => setOpen(false) }
}

export default function WaitlistModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 300)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
    } else {
      setVisible(false)
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative bg-[#39FF78] rounded-lg overflow-hidden w-full max-w-[900px] grid grid-cols-1 lg:grid-cols-2 shadow-2xl transition-all duration-400 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
        }}
      >
        {/* Left/Top: Image */}
        <div className="relative h-[200px] lg:h-full lg:min-h-[480px]">
          <img src="/image.png" alt="Handshake" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8 z-10">
            <p className="text-[36px] lg:text-[44px] font-light text-white leading-[1.05] tracking-[-0.03em]">
              Where every conversation<br className="lg:hidden" /> has real value
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="p-10 lg:p-12 flex flex-col justify-center">
          <button onClick={onClose} className="absolute top-4 right-4 text-white lg:text-black/30 hover:text-white/70 lg:hover:text-black transition-colors cursor-pointer z-20">
            <X size={20} weight="bold" />
          </button>

          {!submitted ? (
            <>
              <p className="mono text-[11px] text-black/40 uppercase mb-4">Early Access</p>
              <h3 className="text-[28px] font-light text-black tracking-[-0.03em] leading-[1.1] mb-3">
                Join the waitlist
              </h3>
              <p className="text-[15px] font-light text-black/50 leading-[1.6] mb-8">
                Be the first to access Handshake. Zero platform fees, payments inside every conversation.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3.5 rounded-lg border border-black/20 bg-white/50 text-[14px] font-light text-black placeholder:text-black/30 outline-none focus:border-black transition-colors"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-3.5 rounded-lg bg-black hover:bg-transparent hover:text-black border border-transparent hover:border-black text-[14px] font-medium text-white transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  Get early access <span className="text-[16px]">&#x2197;</span>
                </button>
              </form>

              <p className="mono text-[11px] text-black/40 mt-6">
                50,000+ already on the list. No spam, ever.
              </p>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="mono text-[11px] text-black/40 uppercase mb-4">You're in</p>
              <h3 className="text-[28px] font-light text-black tracking-[-0.03em] leading-[1.1] mb-3">
                Welcome to Handshake
              </h3>
              <p className="text-[15px] font-light text-black/50 leading-[1.6]">
                We'll be in touch soon. Get ready to turn every conversation into commerce.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
