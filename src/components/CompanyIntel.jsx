import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import { COMPANIES, PROOF_BANK } from '../data/companies'

const TEMPLATE_COLORS = {
  'banking-nps':    { bg: 'rgba(45,109,246,0.10)', border: '#2D6DF6', label: 'NPS/CSAT'   },
  'ops-platform':   { bg: 'rgba(239,95,23,0.10)',  border: '#EF5F17', label: 'Ops Automation' },
  'world-bank-gis': { bg: 'rgba(34,197,94,0.10)',  border: '#22C55E', label: 'GIS / Spatial' },
  'vodafone-etl':   { bg: 'rgba(168,85,247,0.10)', border: '#A855F7', label: 'ETL Pipeline' },
  'mobil-ms':       { bg: 'rgba(251,191,36,0.10)', border: '#FBB F24', label: 'Mystery Shop' },
}

const FIT_COLORS = {
  '★ Direct': { bg: 'rgba(239,95,23,0.15)',  color: '#EF5F17' },
  'High':     { bg: 'rgba(34,197,94,0.12)',  color: '#22C55E' },
  'Medium':   { bg: 'rgba(45,109,246,0.12)', color: '#2D6DF6' },
  'Channel':  { bg: 'rgba(168,85,247,0.12)', color: '#A855F7' },
}

function CompanyCard({ company, onOpenDashboard }) {
  const [ref, inView] = useInView(0.1)
  const tc = TEMPLATE_COLORS[company.template] || TEMPLATE_COLORS['banking-nps']
  const fc = FIT_COLORS[company.kpis[2].value] || FIT_COLORS['Medium']
  const proof = PROOF_BANK[company.proofPoint]

  return (
    <div
      ref={ref}
      className={`flex flex-col border rounded transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ background: '#111111', borderColor: '#222222' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = tc.border; e.currentTarget.style.boxShadow = `0 0 24px ${tc.bg}` }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#222222'; e.currentTarget.style.boxShadow = 'none' }}
    >
      {/* Card Header */}
      <div className="p-5 border-b" style={{ borderColor: '#222222' }}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{company.industryIcon}</span>
            <div>
              <div className="font-display text-xl leading-tight" style={{ color: '#F5F5F5' }}>
                {company.name}
              </div>
              <div className="font-mono-custom text-xs mt-0.5" style={{ color: '#6B6B6B' }}>
                {company.flag} {company.location} · {company.size}
              </div>
            </div>
          </div>
          {/* Fit badge */}
          <span className="font-mono-custom text-xs px-2 py-0.5 rounded shrink-0"
            style={{ background: fc.bg, color: fc.color }}>
            {company.kpis[2].value}
          </span>
        </div>

        {/* Industry + Template badges */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          <span className="font-mono-custom text-xs px-2 py-0.5 rounded border"
            style={{ color: tc.border, borderColor: tc.border, background: tc.bg }}>
            {tc.label}
          </span>
          {company.type === 'Recruiting Agency' && (
            <span className="font-mono-custom text-xs px-2 py-0.5 rounded"
              style={{ background: 'rgba(168,85,247,0.1)', color: '#A855F7' }}>
              AGENCY
            </span>
          )}
          {company.type === 'Remote Role' && (
            <span className="font-mono-custom text-xs px-2 py-0.5 rounded"
              style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E' }}>
              REMOTE
            </span>
          )}
          <span className="font-mono-custom text-xs px-2 py-0.5 rounded"
            style={{ background: '#1a1a1a', color: '#6B6B6B' }}>
            SCORE {company.score}/11
          </span>
        </div>
      </div>

      {/* Summary */}
      <div className="px-5 pt-4">
        <p className="text-sm leading-relaxed" style={{ color: '#8B8B8B', fontFamily: 'DM Sans, sans-serif' }}>
          {company.summary}
        </p>
      </div>

      {/* Pain Points */}
      <div className="px-5 pt-4">
        <div className="font-mono-custom text-xs mb-2" style={{ color: '#6B6B6B' }}>// PAIN POINTS</div>
        <ul className="space-y-1.5">
          {company.painPoints.map((pt, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="font-mono-custom text-xs mt-0.5 shrink-0" style={{ color: tc.border }}>→</span>
              <span className="text-xs leading-snug" style={{ color: '#8B8B8B', fontFamily: 'DM Sans, sans-serif' }}>{pt}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Tags */}
      <div className="px-5 pt-4 pb-4">
        <div className="flex flex-wrap gap-1.5">
          {company.tags.map(tag => (
            <span key={tag} className="font-mono-custom text-xs px-2 py-0.5 border rounded"
              style={{ color: '#F5F5F5', borderColor: '#333333', background: '#1a1a1a' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Proof Point Banner */}
      <div className="mx-5 mb-4 p-3 rounded border-l-2"
        style={{ background: 'rgba(45,109,246,0.06)', borderLeftColor: '#2D6DF6' }}>
        <div className="font-mono-custom text-xs mb-1" style={{ color: '#2D6DF6' }}>
          ⚡ {proof?.label} — {proof?.metric}
        </div>
        <p className="text-xs leading-snug" style={{ color: '#6B6B6B', fontFamily: 'DM Sans, sans-serif' }}>
          {company.proofText}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-auto px-5 pb-5">
        <button
          onClick={() => onOpenDashboard(company)}
          className="w-full py-2.5 text-sm font-semibold rounded border transition-all duration-200"
          style={{ borderColor: tc.border, color: tc.border, background: tc.bg, cursor: 'pointer', fontFamily: 'inherit' }}
          onMouseEnter={e => { e.currentTarget.style.background = tc.bg.replace('0.10','0.20') }}
          onMouseLeave={e => { e.currentTarget.style.background = tc.bg }}
        >
          View Tailored Dashboard →
        </button>
      </div>
    </div>
  )
}

export default function CompanyIntel({ onOpenDashboard }) {
  const [ref, inView] = useInView(0.05)
  const [filter, setFilter] = useState('ALL')

  const filters = ['ALL', '🇪🇬 EGYPT', '🇦🇪 UAE', '🇺🇸 USA', 'HIGH FIT']
  const filtered = COMPANIES.filter(c => {
    if (filter === 'ALL') return true
    if (filter === '🇪🇬 EGYPT') return c.flag === '🇪🇬'
    if (filter === '🇦🇪 UAE') return c.flag === '🇦🇪'
    if (filter === '🇺🇸 USA') return c.flag === '🇺🇸'
    if (filter === 'HIGH FIT') return c.score >= 8
    return true
  })

  return (
    <section id="intel" className="py-32 relative overflow-hidden" style={{ background: '#0D0D0D' }}>
      {/* Background grid */}
      <div className="absolute inset-0 dot-grid opacity-10" style={{ pointerEvents: 'none' }} />
      <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full pointer-events-none opacity-8"
        style={{ background: '#EF5F17', filter: 'blur(90px)' }} />

      <div className="max-w-content mx-auto px-6 relative z-10" ref={ref}>

        {/* Section header */}
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="section-label mb-4">// TARGET COMPANIES · APRIL 2026</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
            <h2 className="font-display text-4xl md:text-6xl leading-tight" style={{ color: '#F5F5F5' }}>
              MARKET INTEL<br />
              <span style={{ color: '#2D6DF6' }}>+ PROOF MATCH</span>
            </h2>
            <p className="text-sm max-w-sm" style={{ color: '#6B6B6B', fontFamily: 'DM Sans, sans-serif' }}>
              10 companies researched. Each card includes industry context, pain points, and a tailored
              interactive portfolio dashboard.
            </p>
          </div>
        </div>

        {/* Stats bar */}
        <div className={`grid grid-cols-4 gap-px mb-10 border transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ borderColor: '#222222' }}>
          {[
            { v: '10', l: 'COMPANIES RESEARCHED' },
            { v: '3',  l: 'COUNTRIES COVERED' },
            { v: '8',  l: 'HIGH-FIT TARGETS' },
            { v: '100%', l: 'PROOF BANK BACKED' },
          ].map((s, i) => (
            <div key={i} className="py-4 px-5 text-center"
              style={{ background: '#111111', borderRight: i < 3 ? '1px solid #222222' : 'none' }}>
              <div className="font-display text-2xl md:text-3xl mb-1" style={{ color: '#2D6DF6' }}>{s.v}</div>
              <div className="font-mono-custom text-xs" style={{ color: '#6B6B6B' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Filter pills */}
        <div className={`flex flex-wrap gap-2 mb-10 transition-all duration-700 delay-150 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="font-mono-custom text-xs px-3 py-1.5 border rounded transition-all duration-200"
              style={{
                borderColor: filter === f ? '#2D6DF6' : '#333333',
                color: filter === f ? '#2D6DF6' : '#6B6B6B',
                background: filter === f ? 'rgba(45,109,246,0.1)' : 'transparent',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {f}
            </button>
          ))}
          <span className="font-mono-custom text-xs px-3 py-1.5" style={{ color: '#444' }}>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Company cards grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((company, i) => (
            <div key={company.id} style={{ transitionDelay: `${i * 60}ms` }}>
              <CompanyCard company={company} onOpenDashboard={onOpenDashboard} />
            </div>
          ))}
        </div>

        {/* Proof bank legend */}
        <div className={`mt-16 border rounded p-6 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ borderColor: '#222222', background: '#111111' }}>
          <div className="font-mono-custom text-xs mb-4" style={{ color: '#6B6B6B' }}>// PROOF BANK — VERIFIED FACTS ONLY</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.values(PROOF_BANK).map(pb => (
              <div key={pb.id} className="flex flex-col gap-1">
                <span className="font-mono-custom text-xs font-semibold" style={{ color: '#2D6DF6' }}>{pb.id}</span>
                <span className="text-xs" style={{ color: '#F5F5F5', fontFamily: 'DM Sans, sans-serif' }}>{pb.label}</span>
                <span className="font-mono-custom text-xs" style={{ color: '#6B6B6B' }}>{pb.metric}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
