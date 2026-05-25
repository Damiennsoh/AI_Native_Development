import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Brain, Globe, Smartphone, Monitor, Rocket } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const phases = [
  {
    weeks: 'Week 1-2',
    title: 'AI Developer Mindset & Workspace Setup',
    description: 'How to think in prompts, not syntax. Cursor, VS Code, GitHub workflow. Write your first Product Requirements Doc.',
    icon: Brain,
  },
  {
    weeks: 'Week 3-5',
    title: 'Web Development with AI',
    description: 'Frontend with v0 + Cursor. Backend with Supabase. Deploy to Vercel. Project 1: SaaS Dashboard.',
    icon: Globe,
  },
  {
    weeks: 'Week 6-7',
    title: 'Mobile & Cross-Platform',
    description: 'React Native via AI. Progressive Web Apps. Project 2: Mobile Business App.',
    icon: Smartphone,
  },
  {
    weeks: 'Week 8-9',
    title: 'Desktop + AI-Powered Features',
    description: 'Desktop apps with Electron/Tauri. Integrate OpenAI APIs. Image handling with Cloudinary. Project 3: AI-Powered Application.',
    icon: Monitor,
  },
  {
    weeks: 'Week 10-12',
    title: 'Monetization & Launch',
    description: 'SaaS pricing strategies. Paystack/Flutterwave integration. Building in public. Demo Day + pitch to real customers.',
    icon: Rocket,
  },
]

export default function CurriculumSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = sectionRef.current?.querySelector('.section-header')
      if (header) {
        gsap.fromTo(
          header,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      const cards = cardsRef.current?.querySelectorAll('.phase-card')
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
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
      id="curriculum"
      className="relative py-24 lg:py-32"
      style={{ zIndex: 2, background: '#0B0F17' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="section-header mb-16 text-center lg:text-left">
          <span className="section-label block mb-6">CURRICULUM</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Your <span className="neon-text">12-Week</span> Journey
          </h2>
        </div>

        <div ref={cardsRef} className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#00FF94]/50 via-white/10 to-transparent" />

          <div className="space-y-8">
            {phases.map((phase, index) => {
              const Icon = phase.icon
              return (
                <div
                  key={phase.weeks}
                  className="phase-card relative pl-0 lg:pl-20 group"
                >
                  {/* Timeline dot */}
                  <div className="hidden lg:flex absolute left-0 top-6 w-16 h-16 rounded-full bg-[#0B0F17] border border-white/10 items-center justify-center group-hover:border-[#00FF94]/50 transition-colors z-10">
                    <Icon className="w-6 h-6 text-[#00FF94]" />
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:p-8 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#00FF94]">
                        {phase.weeks}
                      </span>
                      {index === phases.length - 1 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#00FF94]/10 text-[#00FF94]">
                          Final Phase
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading font-semibold text-xl lg:text-2xl text-white mb-3">
                      {phase.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed">{phase.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
