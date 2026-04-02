import { useInView } from '../hooks/useInView'

const industries = [
  { icon: '🏦', name: 'BANKING',       brands: ['Alex Bank','Bank Misr','QNB','El Mashreq','AAIB','NBE'] },
  { icon: '📱', name: 'TELECOM',       brands: ['Vodafone','STC','Ooredoo'] },
  { icon: '🛒', name: 'FMCG',          brands: ['Nestlé','Unilever','Pharmazone','La Prairie'] },
  { icon: '🏛️', name: 'GOVERNMENT',    brands: ['World Bank','Ministry of Education','Assets Dashboard Project'] },
  { icon: '🚗', name: 'AUTOMOTIVE',    brands: ['BMW','Bajaj Qute','Mobil'] },
  { icon: '🛍️', name: 'RETAIL & OTHER',brands: ['B.Tech','Panda','Azza Fahmy','Allianz'] },
]

export default function ClientRoster() {
  const [ref, inView] = useInView(0.1)
  return (
    <section id="about" className="py-32" style={{ background: '#111111', borderTop: '1px solid #222222', borderBottom: '1px solid #222222' }}>
      <div className="max-w-content mx-auto px-6" ref={ref}>
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="section-label mb-4">// 5+ YEARS · GCC & MENA</p>
          <h2 className="font-display text-5xl md:text-6xl mb-16 leading-tight" style={{ color: '#F5F5F5' }}>
            BUILT FOR BRANDS YOU KNOW.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#222222' }}>
          {industries.map((ind, i) => (
            <div key={i}
              className={`card-hover p-6 border transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ background: '#111111', borderColor: '#222222', transitionDelay: `${i * 80}ms` }}>
              <div className="text-3xl mb-3">{ind.icon}</div>
              <div className="font-display text-xl mb-3 tracking-wide" style={{ color: '#F5F5F5' }}>{ind.name}</div>
              <div className="font-mono-custom text-xs leading-relaxed" style={{ color: '#6B6B6B' }}>
                {ind.brands.join(' · ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
