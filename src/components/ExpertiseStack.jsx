import { useInView } from '../hooks/useInView'

const columns = [
  { title: 'DATA VISUALIZATION',   items: ['Power BI (DAX, Power Query)','Custom SVG Measures','Interactive Dashboards','Theme Engineering (JSON)'] },
  { title: 'DATA ENGINEERING',     items: ['Python (Pandas, OpenPyXL)','XML / SPSS / STG Parsing','ETL Pipeline Design','Long-format Reshaping'] },
  { title: 'RESEARCH METHODOLOGY', items: ['Quantitative MR (BHT, MS, NPS)','Brand Funnels & Tracking','Desk Research','Data Collection & QC'] },
  { title: 'SPATIAL & OPERATIONS', items: ['GIS (Fieldwork Mapping)','Regional Operations (4 regions)','Survey Design','MR Operations Management'] },
]

export default function ExpertiseStack() {
  const [ref, inView] = useInView(0.1)
  return (
    <section className="py-32" style={{ background: '#0A0A0A' }}>
      <div className="max-w-content mx-auto px-6" ref={ref}>
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="section-label mb-4">// TECHNICAL EXPERTISE</p>
          <h2 className="font-display text-5xl md:text-6xl mb-16 leading-tight" style={{ color: '#F5F5F5' }}>
            FULL-STACK MR DATA ENGINEERING.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: '#222222' }}>
          {columns.map((col, i) => (
            <div key={i}
              className={`p-6 border transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ background: '#111111', borderColor: '#222222', transitionDelay: `${i * 100}ms` }}>
              <div className="font-mono-custom text-xs font-semibold mb-5 pb-3 border-b"
                style={{ color: '#2D6DF6', borderColor: '#222222' }}>
                {col.title}
              </div>
              <ul className="space-y-2.5">
                {col.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="text-xs mt-0.5 shrink-0" style={{ color: '#2D6DF6' }}>→</span>
                    <span className="text-sm" style={{ color: '#6B6B6B' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
