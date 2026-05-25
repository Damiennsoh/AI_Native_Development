import { useEffect } from 'react'
import ThreeBackground from './components/ThreeBackground'
import Navigation from './components/Navigation'
import HeroSection from './sections/HeroSection'
import ProblemSection from './sections/ProblemSection'
import CurriculumSection from './sections/CurriculumSection'
import ToolsSection from './sections/ToolsSection'
import PricingSection from './sections/PricingSection'
import InstructorSection from './sections/InstructorSection'
import TestimonialsSection from './sections/TestimonialsSection'
import FAQSection from './sections/FAQSection'
import FinalCTASection from './sections/FinalCTASection'
import FooterSection from './sections/FooterSection'

export default function App() {
  useEffect(() => {
    // Initialize smooth scroll with Lenis
    let lenis: any = null

    const initLenis = async () => {
      try {
        const Lenis = (await import('lenis')).default
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        })

        function raf(time: number) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
      } catch (e) {
        console.warn('Lenis not available, using native scroll')
      }
    }

    initLenis()

    return () => {
      if (lenis) {
        lenis.destroy()
      }
    }
  }, [])

  return (
    <div className="relative min-h-screen" style={{ background: '#0B0F17' }}>
      {/* Three.js Background */}
      <ThreeBackground />

      {/* Noise Overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 100,
          opacity: 0.06,
          mixBlendMode: 'overlay',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative" style={{ zIndex: 2 }}>
        <HeroSection />
        <ProblemSection />
        <CurriculumSection />
        <ToolsSection />
        <PricingSection />
        <InstructorSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection />
        <FooterSection />
      </main>
    </div>
  )
}
