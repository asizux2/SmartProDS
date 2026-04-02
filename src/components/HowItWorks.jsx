import { useInView } from '../hooks/useInView'

const steps = [
  { num: '01', day: 'DAY 1',   title: 'Discovery & Data Intake',
    body: 'You share your raw files (STG export, SPSS, Excel — any format). We align on KPIs, visual style, and delivery scope in a 30-min call.' },
  { num: '02', day: 'DAY 2–4', title: 'Build',
    body: 'Python pipeline cleans and reshapes your data. Power BI model is built with your measures, filters, and brand guidelines. You get a progress screenshot on Day 3.' },
  { num: '03', day: 'DAY 5',   title: 'Delivery & Handoff',
    body: '.pbix file + documentation delivered via Google Drive. One revision round open for 5 business days post-delivery.' },
]

export default function HowItWorks() {
  const [ref, inView] = useInView(0.1)
  return (
    <section className="py-32" style={{ background: '#0A0A0A' }}>
      <div className="max-w-content mx-auto px-6" ref={ref}>
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="section-label mb-4">// THE PROCESS</p>
          <h2 className="font-display text-5xl md:text-6xl mb-16 leading-tight" style={{ color: '#F5F5F5' }}>
            FROM RAW DATA TO CLIENT-READY.<br />
            <span style={{ color: '#6B6B6B' }}>THREE STEPS. FIVE DAYS.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-px" style={{ background: '#222222' }}>
          {steps.map((step, i) => (
            <div key={i}
              className={`relative p-8 border transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ background: '#111111', borderColor: '#222222', transitionDelay: `${i * 150}ms` }}>
              <div className="font-display text-6xl mb-4 leading-none"
                style={{ color: '#1A1A1A', WebkitTextStroke: '1px #222222' }}>
                {step.num}
              </div>
              <span className="font-mono-custom text-xs px-2 py-0.5 inline-block mb-3 border"
                style={{ color: '#2D6DF6', borderColor: '#2D6DF6', background: 'rgba(45,109,246,0.08)' }}>
                STEP {step.num} — {step.day}
              </span>
              <h3 className="font-semibold text-xl mb-3" style={{ color: '#F5F5F5' }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6B6B6B' }}>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
