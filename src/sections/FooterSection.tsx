export default function FooterSection() {
  return (
    <footer
      className="relative py-12 border-t border-white/10"
      style={{ zIndex: 2, background: '#0B0F17' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="font-heading font-bold text-lg text-white mb-1">
              PsyCatech-Solutions
            </div>
            <p className="text-sm text-zinc-500">AI-Native Accelerator • Built for modern learners.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a
              href="https://wa.me/233544282060"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00FF94] transition-colors"
            >
              WhatsApp (+233544282060)
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-white transition-colors">
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-zinc-600">
            © 2026 PsyCatech-Solutions. AI-Native Developer Accelerator. Built in Accra, Ghana.
          </p>
        </div>
      </div>
    </footer>
  )
}
