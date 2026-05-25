import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const tools = [
  { name: 'Cursor', category: 'AI Editor' },
  { name: 'v0', category: 'UI Generation' },
  { name: 'VS Code', category: 'Editor' },
  { name: 'Supabase', category: 'Backend' },
  { name: 'Firebase', category: 'Backend' },
  { name: 'Vercel', category: 'Deploy' },
  { name: 'Cloudinary', category: 'Media' },
  { name: 'Paystack', category: 'Payments' },
  { name: 'Flutterwave', category: 'Payments' },
]

const marqueeTools = [...tools, ...tools]

export default function ToolsSection() {
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
      id="tools"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ zIndex: 2, background: '#0B0F17' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="animate-in section-label block mb-6">TOOLS</span>
          <h2 className="animate-in font-heading font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
            The Exact Stack Used by{' '}
            <span className="neon-text">Y Combinator</span> Startups
          </h2>
          <p className="animate-in text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            These aren't random tools. This is the stack that lets solo developers build
            million-dollar products. And you'll master them in 12 weeks.
          </p>
        </div>

        {/* Marquee */}
        <div className="animate-in relative mb-16 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0B0F17] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0B0F17] to-transparent z-10" />

          <div className="marquee-track flex gap-6" style={{ width: 'max-content' }}>
            {marqueeTools.map((tool, index) => (
              <div
                key={`${tool.name}-${index}`}
                className="flex-shrink-0 w-48 rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-[#00FF94]/30 hover:bg-white/[0.04] transition-all duration-300 group"
              >
                <div className="font-heading font-bold text-xl text-white mb-1 group-hover:text-[#00FF94] transition-colors">
                  {tool.name}
                </div>
                <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider">
                  {tool.category}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="animate-in grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-4">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center hover:border-[#00FF94]/30 transition-all duration-300"
            >
              <div className="font-heading font-semibold text-sm text-white mb-1">{tool.name}</div>
              <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                {tool.category}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
