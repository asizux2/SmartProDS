import { useInView } from '../hooks/useInView'

const problems = [
  { icon: '⏳', title: 'Weeks of manual cleaning',
    body: 'STG exports, SPSS files, pipe-delimited headers — your team spends more time cleaning than analyzing.' },
  { icon: '📊', title: "Reports that don't scale",
    body: 'Static Excel outputs break every wave. No drill-down, no filters, no story.' },
  { icon: '🔥', title: 'Presentation pressure',
    body: 'Client meeting in 3 days. Dashboard still in progress.' },
]

export default function Problem() {
  const [ref, inView] = useInView(0.2)
  return (
    <section id="services" className="py-32" style={{ background: '#0A0A0A' }}>
      <div className="max-w-content mx-auto px-6" ref={ref}>
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="section-label mb-4">// THE PROBLEM</p>
          <h2 className="font-display text-5xl md:text-6xl mb-16 leading-tight" style={{ color: '#F5F5F5' }}>
            YOUR FIELDWORK IS DONE.<br />
            <span style={{ color: '#6B6B6B' }}>YOUR DASHBOARD ISN'T.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-px" style={{ background: '#222222' }}>
          {problems.map((item, i) => (
            <div key={i}
              className={`card-hover p-8 border transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ background: '#111111', borderColor: '#222222', transitionDelay: `${i * 100}ms` }}>
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="font-semibold text-lg mb-3" style={{ color: '#F5F5F5' }}>{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6B6B6B' }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
