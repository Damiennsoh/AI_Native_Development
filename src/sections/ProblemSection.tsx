import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const comparisons = [
  { label: 'Duration', traditional: '6-12 months', accelerator: '12 weeks' },
  { label: 'Projects', traditional: 'Theory-heavy', accelerator: 'Build 3 real projects' },
  { label: 'Curriculum', traditional: 'Outdated', accelerator: 'AI-first, 2026 tools' },
  { label: 'Monetization', traditional: 'None', accelerator: 'Week 10-12: Sell & Launch' },
  { label: 'Cost', traditional: '₵10,000+', accelerator: 'Starts at ₵800' },
]

export default function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = contentRef.current?.querySelectorAll('.animate-in')
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
      id="problem"
      className="relative py-24 lg:py-32"
      style={{ zIndex: 2, background: '#0B0F17' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <span className="animate-in section-label block mb-6">THE PROBLEM</span>
            <h2 className="animate-in font-heading font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-8">
              Learning to Code the Old Way Takes{' '}
              <span className="neon-text">Years.</span> AI Changed Everything.
            </h2>
            <div className="animate-in space-y-4 text-zinc-400 leading-relaxed mb-8">
              <p>
                Traditional coding bootcamps demand 6-12 months, cost ₵10,000+, and still leave
                you jobless. The world has moved on.
              </p>
              <p>
                Today, AI tools like Cursor and v0 let you build full applications in hours — not
                months. The developers winning in 2026 aren't writing every line by hand. They're
                directing AI to build faster, smarter, and more profitably.
              </p>
              <p>
                The problem? Most Ghanaians don't know these tools exist. Or how to use them. Or
                how to turn them into income.
              </p>
              <p className="text-white font-medium">
                That's exactly what we fix.
              </p>
            </div>
          </div>

          {/* Right: Comparison Table */}
          <div className="animate-in">
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-white/5 text-xs font-mono uppercase tracking-wider text-zinc-500">
                <span>Feature</span>
                <span>Traditional</span>
                <span className="text-[#00FF94]">Our Accelerator</span>
              </div>
              <div className="divide-y divide-white/5">
                {comparisons.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-3 gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-sm text-zinc-400 font-medium">{item.label}</span>
                    <span className="text-sm text-zinc-500">{item.traditional}</span>
                    <span className="text-sm text-[#00FF94] font-medium">{item.accelerator}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
