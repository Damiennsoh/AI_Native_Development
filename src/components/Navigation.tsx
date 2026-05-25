import { useEffect, useState } from 'react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-heading font-bold text-lg text-white tracking-tight hover:text-[#00FF94] transition-colors"
        >
          AI-Native Accelerator
        </button>

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollTo('curriculum')}
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Curriculum
          </button>
          <button
            onClick={() => scrollTo('pricing')}
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            FAQ
          </button>
          <button
            onClick={() => scrollTo('enroll')}
            className="btn-primary text-xs px-5 py-2.5"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </nav>
  )
}
