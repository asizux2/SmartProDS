import { useEffect, useRef, useState } from 'react'

function CountUp({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const startTime = performance.now()
        const animate = (t) => {
          const p = Math.min((t - startTime) / duration, 1)
          const e = 1 - Math.pow(1 - p, 3)
          setCount(Math.floor(e * end))
          if (p < 1) requestAnimationFrame(animate)
          else setCount(end)
        }
        requestAnimationFrame(animate)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function Hero({ onOpenDemo }) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16"
      style={{ background: '#0A0A0A' }}>
      <div className="absolute inset-0 dot-grid opacity-30" style={{ pointerEvents: 'none' }} />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #2D6DF6, transparent)' }} />

      <div className="max-w-content mx-auto px-6 py-20 relative z-10">
        {/* Eyebrow */}
        <div className="animate-fade-up mb-6">
          <span className="font-mono-custom text-xs tracking-widest px-3 py-1.5 border inline-flex items-center gap-2"
            style={{ color: '#2D6DF6', borderColor: '#2D6DF6', background: 'rgba(45,109,246,0.08)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            AVAILABLE FOR GCC PROJECTS
          </span>
        </div>

        {/* H1 */}
        <h1 className="animate-fade-up-delay-1 font-display leading-none mb-6"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)', color: '#F5F5F5', letterSpacing: '-0.01em' }}>
          SURVEY DATA.<br />
          CLEANED. VISUALIZED.<br />
          <span style={{ color: '#2D6DF6' }}>DELIVERED IN 5 DAYS.</span>
        </h1>

        {/* Sub */}
        <p className="animate-fade-up-delay-2 text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
          style={{ color: '#6B6B6B' }}>
          I turn STG, SPSS, and fieldwork exports into production-ready
          Power BI dashboards for MR teams — with 5+ years of enterprise-grade
          data engineering behind every build.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up-delay-3 flex flex-wrap gap-4 mb-16">
          <a href="#book"
            className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold rounded transition-all duration-200 pulse-glow"
            style={{ background: '#2D6DF6', color: '#F5F5F5', fontSize: '0.95rem' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#1a5de0')}
            onMouseLeave={e => (e.currentTarget.style.background = '#2D6DF6')}>
            Book a Free 15-Min Call
          </a>
          <button onClick={onOpenDemo}
            className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold rounded transition-all duration-200 border"
            style={{ color: '#F5F5F5', borderColor: '#222222', fontSize: '0.95rem', cursor: 'pointer', background: 'transparent', fontFamily: 'inherit' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#2D6DF6'; e.currentTarget.style.color = '#2D6DF6' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#222222'; e.currentTarget.style.color = '#F5F5F5' }}>
            See a Dashboard Sample →
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-px max-w-lg border"
          style={{ borderColor: '#222222' }}>
          {[
            { value: 5,  suffix: '+',     label1: 'Years',        label2: 'Experience'  },
            { value: 50, suffix: '+',     label1: 'Projects',     label2: 'Delivered'   },
            { value: 5,  suffix: ' DAYS', label1: 'Avg Delivery', label2: 'Time'        },
          ].map((stat, i) => (
            <div key={i} className="px-5 py-4"
              style={{ background: '#111111', borderRight: i < 2 ? '1px solid #222222' : 'none' }}>
              <div className="font-mono-custom text-2xl font-semibold mb-1" style={{ color: '#2D6DF6' }}>
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-mono-custom text-xs" style={{ color: '#6B6B6B' }}>
                {stat.label1}<br />{stat.label2}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0A0A0A)' }} />
    </section>
  )
}
