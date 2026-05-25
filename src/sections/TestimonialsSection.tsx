import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote:
      "I went from zero coding knowledge to building a working web app in 3 weeks. The AI tools make it feel like cheating — in the best way.",
    name: 'Kwame A.',
    background: 'Former Teacher, Now Freelance Developer',
  },
  {
    quote:
      "Finally, a program that teaches you to make money, not just write code. The monetization module alone is worth the price.",
    name: 'Abena M.',
    background: 'Marketing Professional → SaaS Founder',
  },
  {
    quote:
      "The live sessions keep you accountable. By Week 8, I had a product I could show real customers.",
    name: 'Emmanuel O.',
    background: 'University Student, Tech Entrepreneur',
  },
]

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = sectionRef.current?.querySelectorAll('.animate-in')
      if (elements) {
        gsap.fromTo(
          elements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 lg:py-32"
      style={{ zIndex: 2, background: '#0B0F17' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="animate-in section-label block mb-6">TESTIMONIALS</span>
          <h2 className="animate-in font-heading font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight">
            What Early Students Are <span className="neon-text">Saying</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="animate-in rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:p-8 hover:border-white/20 transition-all duration-300 group"
            >
              <Quote className="w-8 h-8 text-[#00FF94]/30 mb-4 group-hover:text-[#00FF94]/50 transition-colors" />
              <p className="text-zinc-300 leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>
              <div className="border-t border-white/5 pt-4">
                <div className="font-heading font-semibold text-white">{t.name}</div>
                <div className="text-sm text-zinc-500">{t.background}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="animate-in text-center text-xs text-zinc-600 mt-8">
          Replace with real testimonials after Cohort 1
        </p>
      </div>
    </section>
  )
}
