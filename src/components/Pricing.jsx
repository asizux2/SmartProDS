import { useInView } from '../hooks/useInView'

const tiers = [
  {
    name: 'SPRINT', price: '$1,500', badge: 'MOST POPULAR', badgeColor: '#2D6DF6',
    turnaround: '5 business days', highlight: true, cta: 'Book Sprint →',
    features: ['Up to 1,000 respondents','Single wave / survey type','Full Python data cleaning','Power BI dashboard (up to 8 pages)','DAX measures library','One revision round','.pbix + documentation delivery'],
  },
  {
    name: 'TRACKER', price: '$2,800', badge: 'MULTI-WAVE', badgeColor: '#EF5F17',
    turnaround: '7 business days', highlight: false, cta: 'Book Tracker →',
    features: ['Everything in Sprint','Multi-wave / longitudinal setup','Wave-over-wave trend visuals','Automated data refresh pipeline','Brand funnel + NPS scoring','Two revision rounds','Training call (30 min)'],
  },
  {
    name: 'ENTERPRISE', price: 'Custom', badge: 'GCC TEAMS', badgeColor: '#22C55E',
    turnaround: 'Scoped per project', highlight: false, cta: "Let's Talk →",
    features: ['Everything in Tracker','Multi-country / multi-client','GIS fieldwork layer','Python automation pipeline','Ongoing monthly retainer option','Direct Slack/WhatsApp access','Priority turnaround'],
  },
]

export default function Pricing() {
  const [ref, inView] = useInView(0.1)
  return (
    <section id="pricing" className="py-32" style={{ background: '#111111', borderTop: '1px solid #222222', borderBottom: '1px solid #222222' }}>
      <div className="max-w-content mx-auto px-6" ref={ref}>
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="section-label mb-4">// PRICING</p>
          <h2 className="font-display text-5xl md:text-6xl mb-16 leading-tight" style={{ color: '#F5F5F5' }}>
            TRANSPARENT. FIXED.<br /><span style={{ color: '#6B6B6B' }}>NO SURPRISES.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px" style={{ background: '#222222' }}>
          {tiers.map((tier, i) => (
            <div key={i}
              className={`card-hover flex flex-col p-8 border transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{
                background: tier.highlight ? '#0A0A0A' : '#111111',
                borderColor: tier.highlight ? '#2D6DF6' : '#222222',
                transitionDelay: `${i * 100}ms`,
                outline: tier.highlight ? '1px solid #2D6DF6' : 'none',
              }}>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-2xl" style={{ color: '#F5F5F5' }}>{tier.name}</h3>
                  <span className="font-mono-custom text-xs px-2 py-0.5 rounded"
                    style={{ background: `${tier.badgeColor}22`, color: tier.badgeColor, border: `1px solid ${tier.badgeColor}44` }}>
                    {tier.badge}
                  </span>
                </div>
                <div className="font-display text-5xl mb-1" style={{ color: '#F5F5F5' }}>{tier.price}</div>
                <div className="font-mono-custom text-xs" style={{ color: '#6B6B6B' }}>{tier.turnaround}</div>
              </div>

              <div className="border-b mb-6" style={{ borderColor: '#222222' }} />

              <ul className="space-y-3 flex-1 mb-8">
                {tier.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm" style={{ color: '#6B6B6B' }}>
                    <span className="mt-0.5 font-bold shrink-0" style={{ color: '#22C55E' }}>✓</span>
                    {feat}
                  </li>
                ))}
              </ul>

              <a href="#book"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 font-semibold text-sm rounded transition-all duration-200"
                style={{
                  background: tier.highlight ? '#2D6DF6' : 'transparent',
                  color: tier.highlight ? '#F5F5F5' : '#2D6DF6',
                  border: '1px solid #2D6DF6',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#2D6DF6'; e.currentTarget.style.color = '#F5F5F5' }}
                onMouseLeave={e => { e.currentTarget.style.background = tier.highlight ? '#2D6DF6' : 'transparent'; e.currentTarget.style.color = tier.highlight ? '#F5F5F5' : '#2D6DF6' }}>
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        <div className={`mt-8 p-5 border text-center transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ borderColor: '#222222', background: '#0A0A0A' }}>
          <p className="font-mono-custom text-xs" style={{ color: '#6B6B6B' }}>
            All prices in USD · 50% upfront, 50% on delivery · 5-day money-back guarantee on Sprint tier · Invoicing available for agencies
          </p>
        </div>
      </div>
    </section>
  )
}
