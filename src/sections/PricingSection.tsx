import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, Star, Zap, Building2, CreditCard, Smartphone, Banknote, Coins } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const checkoutLink = 'https://selar.com/z21175n859'
const GHS_TO_USD = 0.084861

const formatUsd = (amount: number) =>
  amount
    .toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

const plans = [
  {
    name: 'Lite',
    price: '₵800',
    amount: 800,
    original: '₵1,150',
    originalAmount: 1150,
    description: 'Live cohort sessions online with community support.',
    features: ['Live cohort sessions online', 'Community support', 'Weekly Q&A sessions'],
    cta: 'Get Lite Access',
    popular: false,
    icon: Zap,
  },
  {
    name: 'Pro',
    price: '₵2,500',
    amount: 2500,
    original: '₵3,570',
    originalAmount: 3570,
    description: 'Everything in Lite plus live cohort sessions on Zoom, MS Teams, or Google Meet and project reviews.',
    features: [
      'Everything in Lite',
      'Live cohort sessions online',
      'Weekly code reviews',
      '1 project deep-dive feedback',
      'Demo Day participation',
    ],
    cta: 'Join Pro Cohort',
    popular: true,
    icon: Star,
  },
  {
    name: 'Premium',
    price: '₵5,000',
    amount: 5000,
    original: '₵7,140',
    originalAmount: 7140,
    description: 'Everything in Pro plus 1-on-1 mentorship and job referrals.',
    features: [
      'Everything in Pro',
      '1-on-1 mentorship (4 sessions)',
      'Priority Demo Day slot',
      'Job/freelance referrals',
      'Lifetime alumni community',
    ],
    cta: 'Go Premium',
    popular: false,
    icon: Star,
  },
]

const teamPlan = {
  name: 'Team/Corporate',
  price: '₵15,000',
  amount: 15000,
  description: 'Up to 5 team members with custom scheduling.',
  features: ['Up to 5 team members', 'Custom scheduling', 'Private group sessions'],
  cta: 'Contact Us',
}

const paymentMethods = [
  { icon: CreditCard, label: 'Card' },
  { icon: Smartphone, label: 'Mobile Money' },
  { icon: Banknote, label: 'Bank Transfer' },
  { icon: Coins, label: 'Cash (in-person)' },
]

export default function PricingSection() {
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
      id="pricing"
      className="relative py-24 lg:py-32"
      style={{ zIndex: 2, background: '#0B0F17' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="animate-in section-label block mb-6">PRICING</span>
          <h2 className="animate-in font-heading font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
            Invest in Skills That{' '}
            <span className="neon-text">Pay You Back</span>
          </h2>
          <p className="animate-in text-zinc-400 max-w-xl mx-auto">
            Choose the plan that fits your goals. All plans include access to the core curriculum.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="animate-in grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => {
            const Icon = plan.icon
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-6 lg:p-8 transition-all duration-300 hover:-translate-y-2 ${
                  plan.popular
                    ? 'border-[#00FF94]/30 bg-[#00FF94]/[0.03] shadow-lg shadow-[#00FF94]/5'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#00FF94] text-black">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      plan.popular ? 'bg-[#00FF94]/10' : 'bg-white/5'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${plan.popular ? 'text-[#00FF94]' : 'text-zinc-400'}`}
                    />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-white">{plan.name}</h3>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading font-bold text-3xl text-white">
                      {plan.price}
                    </span>
                    <span className="text-sm text-zinc-500 line-through">{plan.original}</span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-500">
                    GHS → USD: ≈ {formatUsd(Math.round(plan.amount * GHS_TO_USD * 100) / 100)}
                  </p>
                  <p className="text-xs text-zinc-500">
                    Original (GHS → USD): ≈ {formatUsd(Math.round(plan.originalAmount * GHS_TO_USD * 100) / 100)}
                  </p>
                  <span className="text-xs text-[#00FF94] font-medium">Early Bird</span>
                </div>

                <p className="text-sm text-zinc-400 mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-[#00FF94] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={checkoutLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    plan.popular
                      ? 'bg-[#00FF94] text-black hover:bg-[#00FF94]/90 hover:shadow-lg hover:shadow-[#00FF94]/20'
                      : 'bg-white/5 text-white border border-white/10 hover:border-[#00FF94]/30 hover:bg-white/[0.04]'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            )
          })}
        </div>

        {/* Team Plan */}
        <div className="animate-in rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:p-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-zinc-400" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-xl text-white">{teamPlan.name}</h3>
                <p className="text-sm text-zinc-400">{teamPlan.description}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-2">
              <div>
                <span className="font-heading font-bold text-2xl text-white">{teamPlan.price}</span>
                <p className="text-sm text-zinc-500">
                  ≈ {formatUsd(Math.round(teamPlan.amount * GHS_TO_USD * 100) / 100)} USD
                </p>
              </div>
              <button className="btn-secondary">{teamPlan.cta}</button>
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="animate-in text-center">
          <p className="text-sm text-zinc-500 mb-4">Payment Options Available</p>
          <div className="flex flex-wrap justify-center gap-6">
            {paymentMethods.map((method) => {
              const Icon = method.icon
              return (
                <div key={method.label} className="flex items-center gap-2 text-sm text-zinc-400">
                  <Icon className="w-4 h-4 text-zinc-500" />
                  <span>{method.label}</span>
                </div>
              )
            })}
          </div>
          <p className="text-xs text-zinc-500 mt-4">
            Installments available: 2 or 3 monthly payments at no extra cost
          </p>
        </div>
      </div>
    </section>
  )
}
