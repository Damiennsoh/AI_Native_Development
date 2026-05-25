import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Wrench, GraduationCap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function InstructorSection() {
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
      id="instructor"
      className="relative py-24 lg:py-32"
      style={{ zIndex: 2, background: '#0B0F17' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="animate-in section-label block mb-6">INSTRUCTOR</span>
          <h2 className="animate-in font-heading font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Learn From Someone Building in the{' '}
            <span className="neon-text">Real World</span>
          </h2>
        </div>

        <div className="animate-in grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
          {/* Photo */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src="/curriculum_portrait.jpg"
                alt="Instructor"
                className="image-card w-72 lg:w-80"
                style={{ aspectRatio: '3/4' }}
              />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-[#00FF94]/10 border border-[#00FF94]/20 flex items-center justify-center">
                <span className="font-heading font-bold text-lg text-[#00FF94]">12</span>
                <span className="text-[10px] text-zinc-400 ml-1">wks</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="font-heading font-bold text-2xl text-white mb-2">
              AI-Native Developer &amp; Instructor
            </h3>
            <div className="space-y-4 text-zinc-400 leading-relaxed mb-8">
              <p>
                I've spent years building software with AI tools, shipping products for clients
                across Ghana and globally. I'm not teaching theory — I'm teaching exactly what's
                working right now in 2026.
              </p>
              <p className="text-white font-medium">
                My mission is simple: help Ghanaians build world-class software without leaving the
                country.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <MapPin className="w-4 h-4 text-[#00FF94]" />
                <span>Based in Accra, Ghana</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <Wrench className="w-4 h-4 text-[#00FF94]" />
                <span>Built multiple projects using Cursor, v0, Supabase</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <GraduationCap className="w-4 h-4 text-[#00FF94]" />
                <span>Trained dozens of students</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
