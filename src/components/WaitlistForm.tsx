'use client'

import { useState, useRef, useEffect } from 'react'

const STEPS = [
  { id: 'name', label: "What's your name?", type: 'text', placeholder: 'Type your full name...' },
  { id: 'email', label: "What's your email?", type: 'email', placeholder: 'name@company.com' },
  { id: 'company', label: 'What company are you with?', type: 'text', placeholder: 'Company name...' },
] as const

type StepId = (typeof STEPS)[number]['id']

export default function WaitlistForm() {
  const [step, setStep] = useState(0)
  const [values, setValues] = useState<Record<StepId, string>>({ name: '', email: '', company: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [step])

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

  if (submitted) {
    return (
      <div className="w-full text-center animate-[fadeUp_0.5s_ease-out]">
        <div className="text-5xl mb-4">&#x1F91D;</div>
        <h2 className="text-2xl font-semibold text-ink mb-2">You&apos;re in. Check your inbox.</h2>
        <p className="text-ink/70 text-base">Tapp&apos;d. Now go get paid.</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Progress */}
      <div className="flex gap-1.5 mb-8">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-colors duration-300"
            style={{ backgroundColor: i <= step ? '#0A0A0B' : 'rgba(10,10,11,0.15)' }}
          />
        ))}
      </div>

      {/* Step counter */}
      <p className="text-xs font-medium text-ink/50 mb-2 tracking-wide uppercase">
        {step + 1} of {STEPS.length}
      </p>

      {/* Question */}
      <div
        key={step}
        className={direction === 'forward' ? 'animate-[fadeUp_0.3s_ease-out]' : 'animate-[fadeDown_0.3s_ease-out]'}
      >
        <label className="block text-2xl font-semibold text-ink mb-6">
          {current.label}
        </label>

        <input
          ref={inputRef}
          type={current.type}
          value={values[current.id]}
          onChange={e => setValues({ ...values, [current.id]: e.target.value })}
          onKeyDown={handleKeyDown}
          placeholder={current.placeholder}
          className="w-full bg-transparent border-b-2 border-ink/20 focus:border-ink pb-3 text-lg text-ink placeholder:text-ink/30 outline-none transition-colors"
        />

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className="text-sm font-medium text-ink/40 hover:text-ink/70 transition-colors disabled:opacity-0"
        >
          &larr; Back
        </button>

        <button
          onClick={handleNext}
          disabled={!values[current.id].trim() || submitting}
          className="bg-ink text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-ink/85 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {submitting ? 'Getting tapp\'d...' : isLast ? 'Tapp Me In' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
