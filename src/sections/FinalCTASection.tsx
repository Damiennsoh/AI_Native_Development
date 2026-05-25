import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AlertTriangle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const checkoutLink = 'https://selar.com/z21175n859'

export default function FinalCTASection() {
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
      id="enroll"
      className="relative py-24 lg:py-32"
      style={{ zIndex: 2, background: '#0B0F17' }}
    >
      {/* Urgency Banner */}
      <div className="animate-in max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0" />
          <div>
            <h3 className="font-heading font-semibold text-lg text-amber-100 mb-1">
              Cohort 1 Closes Soon
            </h3>
            <p className="text-sm text-amber-200/70">
              Only 30 spots available. Early Bird pricing ends soon. Program starts shortly after.
            </p>
          </div>
          <a
            href={checkoutLink}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:ml-auto btn-primary whitespace-nowrap text-xs"
          >
            Secure Your Spot Now
          </a>
        </div>
      </div>

      {/* Main CTA */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="animate-in font-heading font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
          Your <span className="neon-text">AI-Powered</span> Future Starts Here
        </h2>
        <p className="animate-in text-zinc-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          30 spots. 12 weeks. 1 life-changing skill. Don't be the person watching from the
          sidelines in 2027.
        </p>

        <div className="animate-in flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href={checkoutLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-10 py-5"
          >
            Enroll Now — Early Bird Ends Soon
          </a>
        </div>

        <div className="animate-in text-sm text-zinc-500 space-y-2">
          <p>
            Questions? WhatsApp me directly:{' '}
            <a
              href="https://wa.me/233544282060"
              className="text-[#00FF94] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              +233544282060
            </a>
          </p>
          <p>
            Or email:{' '}
            <a href="mailto:hello@psycatechsolution.dev" className="text-[#00FF94] hover:underline">
              hello@psycatechsolution.dev
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
