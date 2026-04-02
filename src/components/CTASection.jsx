import { useInView } from '../hooks/useInView'

export default function CTASection() {
  const [ref, inView] = useInView(0.2)
  return (
    <section id="book" className="py-40 relative overflow-hidden" style={{ background: '#0A0A0A' }}>
      <div className="absolute inset-0 dot-grid opacity-20" style={{ pointerEvents: 'none' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: '#2D6DF6', filter: 'blur(100px)' }} />

      <div className="max-w-content mx-auto px-6 text-center relative z-10" ref={ref}>
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="section-label mb-6">// READY TO START?</p>

          <h2 className="font-display text-5xl md:text-7xl mb-6 leading-tight mx-auto"
            style={{ color: '#F5F5F5', maxWidth: 800 }}>
            YOUR NEXT WAVE CLOSES FRIDAY.<br />
            <span style={{ color: '#2D6DF6' }}>LET'S MAKE SURE YOUR DASHBOARD</span><br />
            IS READY MONDAY.
          </h2>

          <p className="text-lg max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: '#6B6B6B' }}>
            15 minutes. No pitch. Just tell me what you're working with
            and I'll tell you exactly how fast I can turn it around.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a href="mailto:eslam.khaled@smartprods.com"
              className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-base rounded transition-all duration-200 pulse-glow"
              style={{ background: '#2D6DF6', color: '#F5F5F5' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#1a5de0')}
              onMouseLeave={e => (e.currentTarget.style.background = '#2D6DF6')}>
              Book a Free Call →
            </a>
            <a href="https://www.linkedin.com/in/eslam-khaled91/"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-base rounded border transition-all duration-200"
              style={{ color: '#F5F5F5', borderColor: '#222222' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#2D6DF6'; e.currentTarget.style.color = '#2D6DF6' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#222222'; e.currentTarget.style.color = '#F5F5F5' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Connect on LinkedIn
            </a>
          </div>

          <p className="font-mono-custom text-xs" style={{ color: '#6B6B6B' }}>
            Or email:{' '}
            <a href="mailto:eslam.khaled@smartprods.com" className="underline" style={{ color: '#2D6DF6' }}>
              eslam.khaled@smartprods.com
            </a>
            {' '}· Response within 4 hours during Cairo business hours (EET)
          </p>
        </div>
      </div>
    </section>
  )
}
