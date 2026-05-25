import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    question: 'Do I need coding experience?',
    answer:
      'No. We start from zero. If you can use a laptop and browse the internet, you can do this. Our AI-first approach means you learn by building, not by memorizing syntax.',
  },
  {
    question: 'Do I need a powerful laptop?',
    answer:
      'Any laptop from the last 5 years works. You\'ll need reliable internet for live sessions. A Mac, Windows, or Linux machine is fine — we\'ll help you set up the optimal workspace.',
  },
  {
    question: 'What if I miss a live session?',
    answer:
      'All sessions are recorded and uploaded within 24 hours. You can watch them at your own pace and still get full value from the program.',
  },
  {
    question: 'Can I really make money after this?',
    answer:
      'Yes. Graduates leave with 3 portfolio projects, a live product, and a monetization playbook. Several past students have landed freelance clients within 30 days of graduating.',
  },
  {
    question: 'Is this certificate recognized?',
    answer:
      'You receive a verified completion certificate via Selar. More importantly, you leave with a portfolio that speaks louder than any paper.',
  },
  {
    question: "What's the refund policy?",
    answer:
      'Full refund within 7 days of program start, minus ₵200 admin fee. No questions asked. We want you to feel confident in your investment.',
  },
  {
    question: 'Can I pay in installments?',
    answer:
      'Yes. Choose 2 or 3-month installments at checkout. No extra cost, no interest. We want to make this accessible to everyone.',
  },
  {
    question: 'When does the next cohort start?',
    answer:
      'Cohort 1 starts soon. Cohort 2 will open at full price. Apply early to lock in the Early Bird discount.',
  },
]

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        gsap.to(contentRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }
  }, [isOpen])

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-white/15 transition-colors">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-heading font-medium text-white text-sm lg:text-base">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-zinc-500 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="px-5 pb-4 text-sm text-zinc-400 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  )
}

export default function FAQSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

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
            stagger: 0.08,
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
      id="faq"
      className="relative py-24 lg:py-32"
      style={{ zIndex: 2, background: '#0B0F17' }}
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="animate-in section-label block mb-6">FAQ</span>
          <h2 className="animate-in font-heading font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Questions? <span className="neon-text">Answered.</span>
          </h2>
        </div>

        <div className="animate-in space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
