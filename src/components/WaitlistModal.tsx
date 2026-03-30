'use client'
import { useEffect, useRef, useState } from 'react'
import { X } from '@phosphor-icons/react'

const STEPS = [
  { id: 'name', label: "What's your name?", type: 'text', placeholder: 'Type your full name...' },
  { id: 'email', label: "What's your email?", type: 'email', placeholder: 'name@company.com' },
  { id: 'company', label: 'What company are you with?', type: 'text', placeholder: 'Company name...' },
] as const

type StepId = (typeof STEPS)[number]['id']

export default function WaitlistModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [values, setValues] = useState<Record<StepId, string>>({ name: '', email: '', company: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [visible, setVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
    } else {
      document.body.style.overflow = ''
      setVisible(false)
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (open && visible) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open, visible, step])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  function handleClose() {
    onClose()
    setTimeout(() => {
      setStep(0)
      setValues({ name: '', email: '', company: '' })
      setSubmitted(false)
      setError('')
    }, 300)
  }

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleNext()
    }
  }

  async function handleNext() {
    const val = values[current.id].trim()
    if (!val) return

    if (current.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setError('Please enter a valid email address')
      return
    }

    setError('')

    if (isLast) {
      setSubmitting(true)
      try {
        const res = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        })
        if (!res.ok) throw new Error()
        setSubmitted(true)
      } catch {
        setError('Something went wrong. Please try again.')
      } finally {
        setSubmitting(false)
      }
    } else {
      setDirection('forward')
      setStep(step + 1)
    }
  }

  function handleBack() {
    if (step > 0) {
      setDirection('back')
      setError('')
      setStep(step - 1)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="relative bg-[#A5F41F] rounded-lg overflow-hidden w-full max-w-[900px] grid grid-cols-1 lg:grid-cols-2 shadow-2xl transition-all duration-400 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
        }}
      >
        {/* Left: Image */}
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
          <button onClick={handleClose} className="absolute top-4 right-4 text-white lg:text-black/30 hover:text-white/70 lg:hover:text-black transition-colors cursor-pointer z-20">
            <X size={20} weight="bold" />
          </button>

          {!submitted ? (
            <>
              <p className="mono text-[11px] text-black/40 uppercase mb-4">Early Access</p>

              {/* Progress */}
              <div className="flex gap-1.5 mb-6">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full transition-colors duration-300"
                    style={{ backgroundColor: i <= step ? '#0A0A0B' : 'rgba(10,10,11,0.15)' }}
                  />
                ))}
              </div>

              {/* Question */}
              <div
                key={step}
                className={direction === 'forward' ? 'animate-[fadeUp_0.3s_ease-out]' : 'animate-[fadeDown_0.3s_ease-out]'}
              >
                <label className="block text-[24px] font-light text-black tracking-[-0.03em] leading-[1.1] mb-6">
                  {current.label}
                </label>

                <input
                  ref={inputRef}
                  type={current.type}
                  value={values[current.id]}
                  onChange={e => setValues({ ...values, [current.id]: e.target.value })}
                  onKeyDown={handleKeyDown}
                  placeholder={current.placeholder}
                  className="w-full px-4 py-3.5 rounded-lg border border-black/20 bg-white/50 text-[14px] font-light text-black placeholder:text-black/30 outline-none focus:border-black transition-colors"
                />

                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={handleBack}
                  disabled={step === 0}
                  className="text-[13px] font-medium text-black/30 hover:text-black/60 transition-colors disabled:opacity-0 cursor-pointer disabled:cursor-default"
                >
                  &larr; Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={!values[current.id].trim() || submitting}
                  className="px-8 py-3.5 rounded-lg bg-black hover:bg-transparent hover:text-black border border-transparent hover:border-black text-[14px] font-medium text-white transition-all inline-flex items-center gap-2 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : isLast ? 'Join Waitlist' : 'Next →'}
                </button>
              </div>

              <p className="mono text-[11px] text-black/40 mt-6">
                50,000+ already on the list. No spam, ever.
              </p>
            </>
          ) : (
            <div className="text-center py-8 animate-[fadeUp_0.5s_ease-out]">
              <p className="mono text-[11px] text-black/40 uppercase mb-4">You&apos;re in</p>
              <h3 className="text-[28px] font-light text-black tracking-[-0.03em] leading-[1.1] mb-3">
                Welcome to Handshake
              </h3>
              <p className="text-[15px] font-light text-black/50 leading-[1.6]">
                We&apos;ll be in touch soon. Get ready to turn every conversation into commerce.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
