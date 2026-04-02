import { useInView } from '../hooks/useInView'

const features = [
  'Full data ingestion (STG · SPSS · Excel · CSV)',
  'Python ETL pipeline (cleaning, reshaping, flagging)',
  'Power BI dashboard build (measures, visuals, filters)',
  'Brand tracker / MS / NPS / BHT — any survey type',
  'Advanced DAX (weighted scores, brand funnels, ranking)',
  'GIS layer integration if fieldwork is geo-coded',
  'One revision round included',
  'Delivered as .pbix + data model documentation',
]

export default function Offer() {
  const [ref, inView] = useInView(0.15)
  return (
    <section className="py-32" style={{ background: '#111111', borderTop: '1px solid #222222', borderBottom: '1px solid #222222' }}>
      <div className="max-w-content mx-auto px-6" ref={ref}>
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="section-label mb-4">// THE SOLUTION</p>
          <h2 className="font-display text-5xl md:text-6xl mb-4 leading-tight" style={{ color: '#F5F5F5' }}>
            THE MR DASHBOARD SPRINT
          </h2>
          <p className="text-lg max-w-2xl mb-12 leading-relaxed" style={{ color: '#6B6B6B' }}>
            A fixed-scope engagement: raw fieldwork data in → client-ready Power BI dashboard out.
            In 5 business days. Flat fee. Zero back-and-forth.
          </p>
        </div>

        <div className={`grid md:grid-cols-2 gap-px mb-8 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ background: '#222222' }}>
          {features.map((feat, i) => (
            <div key={i} className="flex items-start gap-3 px-6 py-4" style={{ background: '#111111' }}>
              <span className="mt-0.5 text-sm font-bold shrink-0" style={{ color: '#22C55E' }}>✓</span>
              <span className="text-sm" style={{ color: '#F5F5F5' }}>{feat}</span>
            </div>
          ))}
        </div>

        <div className={`p-6 border-l-4 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ background: 'rgba(239,95,23,0.06)', borderColor: '#EF5F17', borderTop: '1px solid #222222', borderRight: '1px solid #222222', borderBottom: '1px solid #222222' }}>
          <p className="font-semibold" style={{ color: '#EF5F17' }}>
            ⚡ If it's not delivered in 5 business days, you get a full refund.
          </p>
          <p className="text-sm mt-1" style={{ color: '#6B6B6B' }}>No questions. No negotiation.</p>
        </div>
      </div>
    </section>
  )
}
