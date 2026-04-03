'use client'
import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import ScrollReveal from '../ScrollReveal'

const testimonials = [
  {
    quote: 'I made $1,200 in my first week just from locked content.',
    name: 'Maria',
    role: 'Tarot Reader',
  },
  {
    quote: 'My clients already text me. Now they pay me in the same thread. Why did this not exist sooner?',
    name: 'James',
    role: 'Cleaning Business',
  },
  {
    quote: 'Switched from Venmo. Saved $340 in fees month one. Not going back.',
    name: 'Aisha',
    role: 'Life Coach',
  },
  {
    quote: 'I mass texted 200 clients about a flash sale. $4,800 in revenue from one message blast.',
    name: 'Devon',
    role: 'Retail',
  },
  {
    quote: 'Locked content made my coaching practice profitable. 0% fees means I keep all of it.',
    name: 'Rachel',
    role: 'Business Coach',
  },
]

export default function TestimonialsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.querySelector('div')?.offsetWidth ?? 500
    scrollRef.current.scrollBy({ left: dir === 'left' ? -cardWidth - 24 : cardWidth + 24, behavior: 'smooth' })
  }

  return (
    <section className="py-24 md:py-40 bg-[#F4F4F5]">
      <div className="px-4 md:px-8 lg:px-10 xl:px-12 flex items-end justify-between mb-12 md:mb-16">
        <ScrollReveal>
          <div>
            <p className="mono text-[12px] text-black/40 uppercase tracking-widest mb-4">Don&apos;t take our word for it.</p>
            <h2 className="font-medium text-black tracking-[-0.04em] leading-[0.9]" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>
              Real people.<br />Real payments.
            </h2>
          </div>
        </ScrollReveal>
        <div className="flex gap-2">
          <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border border-black/20 hover:bg-black hover:text-white hover:border-transparent flex items-center justify-center transition-all cursor-pointer">
            <ArrowLeft size={20} weight="bold" />
          </button>
          <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full border border-black/20 hover:bg-black hover:text-white hover:border-transparent flex items-center justify-center transition-all cursor-pointer">
            <ArrowRight size={20} weight="bold" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pl-4 md:pl-8 lg:pl-10 xl:pl-12 pr-4 md:pr-8 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-white rounded-2xl p-8 md:p-12 flex flex-col justify-between snap-start flex-shrink-0"
            style={{ width: 'min(500px, 85vw)', minHeight: '320px' }}
          >
            <div>
              <span className="text-[#A5F41F] text-[64px] leading-none font-medium">&ldquo;</span>
              <p className="text-[20px] md:text-[24px] font-normal text-black tracking-[-0.02em] leading-[1.3] -mt-4">
                {t.quote}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-black/5">
              <p className="text-[15px] font-semibold text-black">{t.name}</p>
              <p className="mono text-[12px] text-black/40 uppercase">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
