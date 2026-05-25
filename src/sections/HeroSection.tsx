import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Users, Globe, CreditCard } from 'lucide-react'

const checkoutLink = 'https://selar.com/z21175n859'

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const badgesRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const microRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      const tl = gsap.timeline({ delay: 0.3 })

      tl.fromTo(
        imageRef.current,
        { y: '18vh', scale: 0.92, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.9, ease: 'power3.out' }
      )

      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll('.headline-line')
        tl.fromTo(
          lines,
          { x: '-8vw', opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
          '-=0.5'
        )
      }

      tl.fromTo(
        bodyRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )

      tl.fromTo(
        ctaRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )

      tl.fromTo(
        badgesRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )

      tl.fromTo(
        [labelRef.current, microRef.current],
        { opacity: 0 },
        { opacity: 1, duration: 0.4, stagger: 0.1 },
        '-=0.3'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ zIndex: 2 }}
    >
      {/* Decorative line */}
      <div
        className="absolute hidden lg:block"
        style={{
          left: '4.5vw',
          top: '10vh',
          height: '80vh',
          width: '1px',
          background: 'rgba(244,246,251,0.08)',
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-0 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left: Text Content */}
        <div className="order-2 lg:order-1 relative" style={{ zIndex: 3 }}>
          <div ref={headlineRef} className="mb-8">
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[0.92] tracking-tight">
              <span className="headline-line block">Build Desktop,</span>
              <span className="headline-line block">Web &amp; Mobile</span>
              <span className="headline-line block neon-text">Apps Using AI</span>
              <span className="headline-line block text-zinc-400 text-2xl sm:text-3xl lg:text-4xl mt-4">
                Even If You've Never Written a Line of Code
              </span>
            </h1>
          </div>

          <div ref={bodyRef} className="mb-8 max-w-lg">
            <p className="text-base lg:text-lg text-zinc-400 leading-relaxed">
              12-week intensive program. Learn Cursor, v0, Supabase, Vercel &amp; more.
              Then monetize your skills. Limited to 30 students.
            </p>
          </div>

          <div ref={ctaRef} className="flex flex-wrap gap-4 mb-10">
            <a
              href={checkoutLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Enroll Now — Early Bird 30% Off
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Watch Free Intro Video
            </a>
          </div>

          <div ref={badgesRef} className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Users className="w-4 h-4 text-[#00FF94]" />
              <span>30 students max</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Globe className="w-4 h-4 text-[#00FF94]" />
              <span>Online sessions via Zoom, MS Teams, or Google Meet</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <CreditCard className="w-4 h-4 text-[#00FF94]" />
              <span>Pay in installments</span>
            </div>
          </div>
        </div>

        {/* Right: Image Card */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative" style={{ zIndex: 2 }}>
          <div ref={imageRef} className="relative">
            <img
              src="/hero_workspace.jpg"
              alt="AI Developer Workspace"
              className="image-card w-72 sm:w-80 lg:w-96"
              style={{ aspectRatio: '3/4' }}
            />
            {/* Accent line sweep */}
            <div
              className="absolute inset-0 rounded-[999px] overflow-hidden pointer-events-none"
            >
              <div
                className="absolute top-1/2 left-0 w-full h-[2px]"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(0,255,148,0.4), transparent)',
                  animation: 'sweep 4s linear infinite',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Vertical label */}
      <div
        ref={labelRef}
        className="absolute hidden lg:block font-mono text-xs font-semibold uppercase tracking-[0.14em] text-zinc-600"
        style={{
          right: '4vw',
          top: '50%',
          transform: 'translateY(-50%) rotate(90deg)',
          transformOrigin: 'center center',
        }}
      >
        ACCELERATOR
      </div>

      {/* Bottom microcopy */}
      <div
        ref={microRef}
        className="absolute hidden lg:block text-xs text-zinc-600 text-right"
        style={{
          right: '8vw',
          bottom: '8vh',
          width: '26vw',
        }}
      >
        Cohorts are small. We prioritize builders who want to ship.
      </div>

      <style>{`
        @keyframes sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}
