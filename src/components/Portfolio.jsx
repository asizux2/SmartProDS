import { useInView } from '../hooks/useInView'

const stats = [
  { value: '2',   label1: 'WAVES',      label2: 'Tracked'  },
  { value: '15+', label1: 'CUSTOM DAX', label2: 'Measures' },
  { value: 'SVG', label1: 'ICONS',      label2: 'Built'    },
  { value: '5',   label1: 'DAYS',       label2: 'Delivery' },
]

export default function Portfolio({ onOpenDemo }) {
  const [ref, inView] = useInView(0.15)

  return (
    <section id="work" className="py-32 relative overflow-hidden" style={{ background: '#0A0A0A' }}>
      <div className="absolute inset-0 dot-grid opacity-20" style={{ pointerEvents: 'none' }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: '#2D6DF6', filter: 'blur(80px)' }} />

      <div className="max-w-content mx-auto px-6 relative z-10" ref={ref}>
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="section-label mb-4">// FEATURED WORK</p>
          <h2 className="font-display text-4xl md:text-6xl mb-4 leading-tight" style={{ color: '#F5F5F5' }}>
            FUEL STATION<br />MYSTERY SHOPPING
          </h2>
        </div>

        {/* Metadata bar */}
        <div className={`flex flex-wrap gap-0 mb-10 border transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ borderColor: '#222222' }}>
          {[['TYPE','Mystery Shopping'],['WAVES','2025–2026'],['TOOL','Power BI'],['STATUS','Delivered']].map(([label, value], i, arr) => (
            <div key={i} className="px-5 py-3 flex items-center gap-2"
              style={{ background: '#111111', borderRight: i < arr.length - 1 ? '1px solid #222222' : 'none' }}>
              <span className="font-mono-custom text-xs" style={{ color: '#6B6B6B' }}>{label}:</span>
              <span className="font-mono-custom text-xs font-semibold" style={{ color: '#F5F5F5' }}>{value}</span>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Description */}
          <div className={`transition-all duration-700 delay-150 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#6B6B6B' }}>
              A multi-wave mystery shopping dashboard tracking service quality across fuel stations.
              Built to support the 2025 Fuel Station Wave study and the 2026 Center Visit study
              covering multiple station types.
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#6B6B6B' }}>
              Includes wave-based detection, RANKX station-level ranking with tiebreakers,
              section-level scoring via weighted DAX measures, and custom SVG icon packs
              rendered as matrix visual image URLs — styled with a fully custom dark brand theme.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {['RANKX Ranking','Weighted DAX','Wave Detection','SVG Icons','Python ETL','Power BI'].map(tag => (
                <span key={tag} className="font-mono-custom text-xs px-2.5 py-1 border"
                  style={{ color: '#2D6DF6', borderColor: '#2D6DF6', background: 'rgba(45,109,246,0.08)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Preview card */}
          <div onClick={onOpenDemo}
            className={`border rounded p-6 transition-all duration-700 delay-200 cursor-pointer group ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ background: '#060A45', borderColor: '#2D6DF6' }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 30px rgba(45,109,246,0.2)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-mono-custom text-xs mb-1" style={{ color: '#2D6DF6' }}>MYSTERY SHOPPING</div>
                <div className="font-display text-lg" style={{ color: '#F5F5F5' }}>FUEL STATION DASHBOARD</div>
              </div>
              <div className="font-mono-custom text-xs px-2 py-1 rounded" style={{ background: '#2D6DF6', color: '#fff' }}>WAVE 2</div>
            </div>

            {[
              { label: 'Customer Service',     score: 87 },
              { label: 'Facility Quality',     score: 89 },
              { label: 'Product Availability', score: 92 },
              { label: 'Staff Knowledge',      score: 74 },
            ].map(item => (
              <div key={item.label} className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="font-mono-custom text-xs" style={{ color: '#8892C8' }}>{item.label}</span>
                  <span className="font-mono-custom text-xs font-semibold"
                    style={{ color: item.score >= 85 ? '#22C55E' : '#EF5F17' }}>{item.score}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: '#0A0A0A' }}>
                  <div className="h-full rounded-full"
                    style={{ width: `${item.score}%`, background: item.score >= 85 ? '#22C55E' : '#EF5F17' }} />
                </div>
              </div>
            ))}

            <div className="grid grid-cols-3 gap-2 mt-4 mb-4">
              {[{v:'284',l:'Visits'},{v:'12',l:'Stations'},{v:'88%',l:'Avg Score'}].map(s => (
                <div key={s.l} className="text-center p-2 rounded" style={{ background: 'rgba(45,109,246,0.12)' }}>
                  <div className="font-display text-xl" style={{ color: '#2D6DF6' }}>{s.v}</div>
                  <div className="font-mono-custom text-xs" style={{ color: '#8892C8' }}>{s.l}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 py-2.5 rounded border font-semibold text-sm"
              style={{ borderColor: '#2D6DF6', color: '#2D6DF6', background: 'rgba(45,109,246,0.1)' }}>
              <span>▶</span><span>Open Interactive Dashboard</span>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-px mb-8 border transition-all duration-700 delay-250 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ borderColor: '#222222' }}>
          {stats.map((stat, i) => (
            <div key={i} className="py-5 px-6 text-center"
              style={{ background: '#111111', borderRight: i < stats.length - 1 ? '1px solid #222222' : 'none' }}>
              <div className="font-display text-3xl mb-1" style={{ color: '#2D6DF6' }}>{stat.value}</div>
              <div className="font-mono-custom text-xs" style={{ color: '#6B6B6B' }}>
                {stat.label1}<br />{stat.label2}
              </div>
            </div>
          ))}
        </div>

        <button onClick={onOpenDemo}
          className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold rounded border transition-all duration-200"
          style={{ color: '#2D6DF6', borderColor: '#2D6DF6', background: 'rgba(45,109,246,0.08)', fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'inherit' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(45,109,246,0.15)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(45,109,246,0.08)')}>
          View Dashboard Sample →
        </button>
      </div>
    </section>
  )
}
