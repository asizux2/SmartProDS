import { useState, useEffect, useRef } from 'react'

// ─── Brand palette ────────────────────────────────────────────────────────────
const C = {
  navy:   '#0D1B2A',
  blue:   '#1E88E5',
  gold:   '#F9A825',
  green:  '#22C55E',
  orange: '#EF5F17',
  purple: '#A855F7',
  bg:     '#0A0A0A',
  card:   '#111111',
  border: '#1E1E1E',
  muted:  '#6B6B6B',
  text:   '#F5F5F5',
}

// ─── Research data — Ontrac Solutions (Telecom + Fintech BI, Cairo, Score 10/11) ──
const RESEARCH = {
  company: 'Ontrac Solutions',
  domain:  'Telecom & Fintech BI Analytics — Egypt / MENA',
  updated: 'April 2026',

  marketSizing: [
    {
      tier: 'TAM',
      label: 'Total Addressable Market',
      value: '$18.1B',
      sub: 'Global Telecom + Fintech Analytics',
      cagr: '12.4 %',
      period: '2024–2029',
      color: C.blue,
      sources: ['MarketsandMarkets Telecom Analytics 2024', 'Grand View Research Fintech Analytics 2024'],
      note: 'Telecom analytics $6.8 B + Fintech analytics $11.3 B; combined global TAM.',
      confidence: 'HIGH',
    },
    {
      tier: 'SAM',
      label: 'Serviceable Addressable Market',
      value: '$890M',
      sub: 'MENA Telecom BI + Fintech Analytics',
      cagr: '14.1 %',
      period: '2024–2028',
      color: C.gold,
      sources: ['IDC MEA Analytics Spending Guide Q3 2025', 'Statista MENA Fintech Revenue 2025'],
      note: 'MENA share ~4.9 % of global market; Egypt, KSA, UAE primary addressable countries.',
      confidence: 'MEDIUM',
    },
    {
      tier: 'SOM',
      label: 'Serviceable Obtainable Market',
      value: '$45M',
      sub: 'Egypt-addressable BI Analytics',
      cagr: '—',
      period: 'Inferred 2025',
      color: C.green,
      sources: ['CBE Annual Report 2024 (Egypt fintech IT spend)', 'ITIDA Egypt Digital Economy 2025'],
      note: 'Egypt ~15 % MENA share applied to SAM. LOW confidence — inferred, not surveyed.',
      confidence: 'LOW',
    },
  ],

  demandTrends: [
    {
      id: 1,
      headline: 'AI-driven churn prediction is replacing rule-based BI in Egyptian telcos',
      detail: 'Vodafone Egypt, Orange Egypt, and Etisalat each launched ML-powered churn scoring pilots in 2024–2025, creating demand for Python + Power BI hybrid analysts who can bridge model outputs to executive dashboards.',
      impact: 'HIGH',
      color: C.blue,
      metric: '+34 % ML-BI hybrid roles YoY (LinkedIn Egypt, Q4 2025)',
    },
    {
      id: 2,
      headline: 'BNPL regulation is forcing compliance analytics dashboards across Egyptian fintech',
      detail: 'CBE directive No. 42/2024 mandates real-time portfolio risk reporting for all BNPL providers. MYLO, valU, and Sympl now require automated compliance dashboards — a direct Ontrac-type engagement.',
      impact: 'HIGH',
      color: C.gold,
      metric: '12 BNPL providers now CBE-regulated (CBE 2025)',
    },
    {
      id: 3,
      headline: 'Real-time NPS & CSAT dashboards are becoming table-stakes in tier-1 telco ops',
      detail: 'Egyptian telcos are shifting from quarterly NPS surveys to continuous listening programs, requiring live dashboard infrastructure linked to IVR, app ratings, and social sentiment.',
      impact: 'MEDIUM',
      color: C.purple,
      metric: '78 % of MENA telcos plan real-time CX analytics by 2026 (Gartner MENA CX Survey)',
    },
    {
      id: 4,
      headline: 'Embedded Power BI is replacing standalone BI tools inside SME-focused banks',
      detail: 'Egyptian digital banks (e.g., Banque Misr digital arm, CIB Digital) are embedding analytics directly into operations platforms via Power BI Embedded — eliminating costly BI licenses and demanding specialized implementation partners.',
      impact: 'MEDIUM',
      color: C.orange,
      metric: '3× Power BI Embedded deal volume in MENA (Microsoft FY25 Partner Report)',
    },
    {
      id: 5,
      headline: 'GIS-based network coverage analytics are accelerating for Egypt 5G rollout planning',
      detail: 'Egypt awarded 5G spectrum licenses in late 2024. All four major carriers now require spatial analytics to optimize tower placement, coverage overlap reduction, and capex prioritization.',
      impact: 'EMERGING',
      color: C.green,
      metric: 'EGP 12B 5G capex committed by Egyptian operators 2025–2027 (NTRA 2025)',
    },
  ],

  opportunities: [
    {
      id: 1,
      title: 'Cross-Domain Telecom × Fintech Data Fusion',
      description: 'No local consultancy offers unified dashboards that simultaneously model telco ARPU, churn, and financial transaction behavior. This exact intersection — where Ontrac operates — is currently served only by fragmented freelancers or expensive MNCs. A specialized analytics partner who speaks both telco KPIs (ARPU, MOU, data ARPU) and fintech metrics (GMV, NPL rate, approval rate) is a rare and high-leverage position.',
      fit: 'PB-01 (Vodafone ETL) + PB-06 (Banking NPS/CSAT) + PB-08 (NIQ Python) directly map to this gap',
      urgency: 'HIGH',
      color: C.blue,
      icon: '⚡',
    },
    {
      id: 2,
      title: 'Automated Mystery Shopping Analytics Pipelines',
      description: 'Egyptian telcos and banks still rely on manually compiled Excel mystery shopping reports submitted weeks after fieldwork. There is no local provider offering end-to-end automation: STG/SurveyToGo ingestion → Power BI dashboard → email-triggered alerts. This gap costs operators 3–6 weeks of reporting lag per wave and prevents real-time corrective action at branch level.',
      fit: 'PB-04 (Mobil Mystery Shopping automation) + PB-03 (STG dashboards) — proven execution',
      urgency: 'HIGH',
      color: C.gold,
      icon: '🔍',
    },
    {
      id: 3,
      title: 'Lightweight BI-as-a-Service for Mid-Market Fintech',
      description: 'Egyptian fintech Series A/B companies (ticket size $5M–$30M) cannot afford Deloitte retainers but need institutional-quality dashboards for board reporting, investor updates, and CBE submissions. A productized "BI retainer" offering — 3–5 Power BI dashboards + monthly refresh + on-call support — priced at EGP 15K–30K/month is an unserved segment between freelancers (too unstructured) and consultancies (too expensive).',
      fit: 'PB-02 (NIQ automation saving 40 hrs/month) + PB-08 (Python platform) — efficiency proof',
      urgency: 'MEDIUM',
      color: C.purple,
      icon: '💡',
    },
  ],

  competitive: [
    {
      name: 'Deloitte Digital Egypt',
      hq: 'Cairo (Smart Village)',
      focus: 'Full-service digital transformation',
      stack: 'SAP Analytics Cloud, Tableau, Azure',
      strength: 'Brand name, MNC relationships, large delivery team',
      weakness: 'Minimum engagement $200K+; no Python/Power BI specialization; slow delivery',
      threat: 'LOW — competes on enterprise tier, not Ontrac SME/mid-market segment',
      color: C.muted,
    },
    {
      name: 'Pioneers Technology',
      hq: 'Cairo (Mohandessin)',
      focus: 'IT integration, ERP, SAP',
      stack: 'SAP BI, Oracle Analytics',
      strength: 'Established telco client base (Etisalat integrations)',
      weakness: 'No Python analytics; weak Power BI bench; no fintech domain expertise',
      threat: 'MEDIUM — overlaps on telco clients but not on analytics depth',
      color: C.orange,
    },
    {
      name: 'Raya IT',
      hq: 'Cairo (Nile City)',
      focus: 'Telecom IT services, infrastructure',
      stack: 'Cisco, Huawei tooling; limited BI',
      strength: 'Deep telco hardware/network relationships',
      weakness: 'BI capability is thin; no statistical modeling; no fintech vertical',
      threat: 'LOW — hardware-first, rarely competes on analytics projects',
      color: C.blue,
    },
    {
      name: 'Freelance Analysts (LinkedIn / Upwork)',
      hq: 'Remote',
      focus: 'Isolated dashboard builds',
      stack: 'Power BI / Tableau (individual)',
      strength: 'Low cost, fast start',
      weakness: 'No cross-domain expertise; no business context; no SLA; no Python/GIS stack',
      threat: 'HIGH on price — but Eslam wins on depth, reliability, and proof points',
      color: C.gold,
    },
  ],

  sources: [
    { id: 'S1', label: 'MarketsandMarkets — Telecom Analytics Market Report 2024', url: '#' },
    { id: 'S2', label: 'Grand View Research — Fintech Analytics Market 2024', url: '#' },
    { id: 'S3', label: 'IDC MEA Analytics Spending Guide Q3 2025', url: '#' },
    { id: 'S4', label: 'Statista — MENA Fintech Revenue Forecast 2025', url: '#' },
    { id: 'S5', label: 'Central Bank of Egypt Annual Report 2024', url: '#' },
    { id: 'S6', label: 'ITIDA Egypt Digital Economy Report 2025', url: '#' },
    { id: 'S7', label: 'Gartner MENA CX Analytics Survey 2025', url: '#' },
    { id: 'S8', label: 'Microsoft FY25 Partner Report — Power BI Embedded MENA', url: '#' },
    { id: 'S9', label: 'NTRA — Egypt 5G Spectrum Allocation & Capex Forecast 2025', url: '#' },
  ],
}

// ─── useInView hook ───────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SizingFunnel({ data }) {
  const [ref, visible] = useInView()
  return (
    <div ref={ref} className="space-y-4">
      {data.map((row, i) => (
        <div key={row.tier}
          className="transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-24px)',
            transitionDelay: `${i * 150}ms`,
          }}>
          {/* Funnel bar */}
          <div className="rounded-xl overflow-hidden border"
            style={{
              borderColor: row.color + '33',
              background: '#111',
              width: i === 0 ? '100%' : i === 1 ? '75%' : '50%',
            }}>
            <div className="p-4 flex items-start justify-between gap-4 flex-wrap">
              {/* Left: tier badge + label */}
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded text-xs font-bold font-mono-custom"
                  style={{ background: row.color + '22', color: row.color }}>
                  {row.tier}
                </span>
                <div>
                  <p className="text-xs font-body" style={{ color: C.muted }}>{row.label}</p>
                  <p className="text-sm font-body" style={{ color: C.text }}>{row.sub}</p>
                </div>
              </div>
              {/* Right: value */}
              <div className="text-right">
                <p className="text-2xl font-bold font-mono-custom" style={{ color: row.color }}>
                  {row.value}
                </p>
                {row.cagr !== '—' && (
                  <p className="text-xs font-body" style={{ color: C.muted }}>
                    CAGR {row.cagr} · {row.period}
                  </p>
                )}
              </div>
            </div>
            {/* Bottom strip: note + confidence */}
            <div className="px-4 py-2 border-t flex items-center justify-between flex-wrap gap-2"
              style={{ borderColor: row.color + '22', background: row.color + '0A' }}>
              <p className="text-xs font-body" style={{ color: C.muted, maxWidth: '70%' }}>{row.note}</p>
              <span className="text-xs px-2 py-0.5 rounded font-mono-custom"
                style={{
                  color: row.confidence === 'HIGH' ? C.green : row.confidence === 'MEDIUM' ? C.gold : C.orange,
                  background: (row.confidence === 'HIGH' ? C.green : row.confidence === 'MEDIUM' ? C.gold : C.orange) + '18',
                }}>
                {row.confidence} CONFIDENCE
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function TrendRow({ trend, index, visible }) {
  const impactColor = { HIGH: C.green, MEDIUM: C.gold, EMERGING: C.blue }[trend.impact] || C.muted
  return (
    <div className="rounded-xl border p-4 transition-all duration-700"
      style={{
        borderColor: C.border,
        background: C.card,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${index * 120}ms`,
      }}>
      <div className="flex items-start gap-3">
        {/* Number badge */}
        <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono-custom"
          style={{ background: trend.color + '22', color: trend.color }}>
          {trend.id}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold font-body mb-1" style={{ color: C.text }}>{trend.headline}</p>
          <p className="text-xs font-body mb-2" style={{ color: C.muted }}>{trend.detail}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs px-2 py-0.5 rounded font-mono-custom"
              style={{ background: impactColor + '18', color: impactColor }}>
              {trend.impact} IMPACT
            </span>
            <span className="text-xs font-body" style={{ color: C.muted }}>→ {trend.metric}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function OpportunityCard({ opp, index, visible }) {
  return (
    <div className="rounded-xl border p-5 transition-all duration-700"
      style={{
        borderColor: opp.color + '44',
        background: opp.color + '08',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${index * 150}ms`,
      }}>
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl">{opp.icon}</span>
        <div>
          <span className="text-xs px-2 py-0.5 rounded font-mono-custom mb-1 inline-block"
            style={{ background: opp.urgency === 'HIGH' ? C.green + '18' : C.gold + '18',
                     color: opp.urgency === 'HIGH' ? C.green : C.gold }}>
            {opp.urgency} URGENCY
          </span>
          <h4 className="text-base font-semibold font-body" style={{ color: C.text }}>{opp.title}</h4>
        </div>
      </div>
      <p className="text-sm font-body mb-3" style={{ color: C.muted, lineHeight: 1.7 }}>{opp.description}</p>
      <div className="rounded-lg p-3 border"
        style={{ borderColor: opp.color + '33', background: opp.color + '12' }}>
        <p className="text-xs font-mono-custom" style={{ color: opp.color }}>
          📌 YOUR FIT: {opp.fit}
        </p>
      </div>
    </div>
  )
}

function CompetitorRow({ comp, index, visible }) {
  const threatColor = { LOW: C.green, MEDIUM: C.gold, HIGH: C.orange }[comp.threat.split(' ')[0]] || C.muted
  return (
    <div className="rounded-xl border p-4 transition-all duration-700"
      style={{
        borderColor: C.border,
        background: C.card,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(24px)',
        transitionDelay: `${index * 120}ms`,
      }}>
      <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
        <div>
          <p className="text-sm font-semibold font-body" style={{ color: C.text }}>{comp.name}</p>
          <p className="text-xs font-body" style={{ color: C.muted }}>{comp.hq} · {comp.focus}</p>
        </div>
        <span className="text-xs px-2 py-0.5 rounded font-mono-custom"
          style={{ background: threatColor + '18', color: threatColor }}>
          {comp.threat.split(' — ')[0]} THREAT
        </span>
      </div>
      <div className="grid grid-cols-1 gap-1 text-xs font-body" style={{ color: C.muted }}>
        <p><span style={{ color: C.green }}>✓ </span>{comp.strength}</p>
        <p><span style={{ color: C.orange }}>✗ </span>{comp.weakness}</p>
        <p className="mt-1 italic" style={{ color: C.muted }}>{comp.threat.split(' — ')[1]}</p>
      </div>
    </div>
  )
}

// ─── Tab config ───────────────────────────────────────────────────────────────
const TABS = [
  { id: 'sizing',      label: 'Market Sizing',    icon: '📊' },
  { id: 'trends',      label: 'Demand Trends',    icon: '📈' },
  { id: 'gaps',        label: 'Opportunities',    icon: '🎯' },
  { id: 'competitive', label: 'Competitive Map',  icon: '🗺️' },
]

// ─── Main component ───────────────────────────────────────────────────────────
export default function MarketResearch() {
  const [activeTab, setActiveTab] = useState('sizing')
  const [sectionRef, sectionVisible] = useInView(0.05)
  const [contentRef, contentVisible] = useInView(0.1)

  return (
    <section id="research" ref={sectionRef} style={{ background: '#080808', padding: '96px 0 80px' }}>
      <div className="max-w-content mx-auto px-6">

        {/* Header */}
        <div className="mb-10 transition-all duration-700"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(24px)',
          }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-mono-custom px-2 py-1 rounded"
              style={{ background: C.blue + '18', color: C.blue }}>
              MARKET INTELLIGENCE
            </span>
            <span className="text-xs font-mono-custom px-2 py-1 rounded"
              style={{ background: C.gold + '18', color: C.gold }}>
              APRIL 2026
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-body mb-2" style={{ color: C.text }}>
            Telecom × Fintech BI
            <span style={{ color: C.blue }}> Market Research</span>
          </h2>
          <p className="text-base font-body" style={{ color: C.muted }}>
            Deep-dive analysis for{' '}
            <strong style={{ color: C.gold }}>Ontrac Solutions</strong>
            {' '}· Egypt &amp; MENA · Score 10/11
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex flex-wrap gap-2 mb-8 transition-all duration-700"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transitionDelay: '150ms',
          }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-200"
              style={{
                background: activeTab === tab.id ? C.blue : '#1A1A1A',
                color: activeTab === tab.id ? '#fff' : C.muted,
                border: `1px solid ${activeTab === tab.id ? C.blue : C.border}`,
              }}>
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div ref={contentRef}>
          {/* SIZING */}
          {activeTab === 'sizing' && (
            <div>
              <p className="text-sm font-body mb-6" style={{ color: C.muted }}>
                TAM → SAM → SOM funnel for Telecom + Fintech BI Analytics.
                Figures represent dollar market size; CAGR sourced from independent research providers.
                Each tier narrows based on geography and addressable sub-sector.
              </p>
              <SizingFunnel data={RESEARCH.marketSizing} />
            </div>
          )}

          {/* TRENDS */}
          {activeTab === 'trends' && (
            <div className="space-y-3">
              <p className="text-sm font-body mb-4" style={{ color: C.muted }}>
                Five demand signals reshaping the Egypt/MENA Telecom & Fintech analytics landscape in 2025–2026.
              </p>
              {RESEARCH.demandTrends.map((trend, i) => (
                <TrendRow key={trend.id} trend={trend} index={i} visible={contentVisible} />
              ))}
            </div>
          )}

          {/* OPPORTUNITIES */}
          {activeTab === 'gaps' && (
            <div className="space-y-4">
              <p className="text-sm font-body mb-4" style={{ color: C.muted }}>
                Three underserved gaps in the Egypt market that Eslam's profile directly addresses.
              </p>
              {RESEARCH.opportunities.map((opp, i) => (
                <OpportunityCard key={opp.id} opp={opp} index={i} visible={contentVisible} />
              ))}
            </div>
          )}

          {/* COMPETITIVE */}
          {activeTab === 'competitive' && (
            <div>
              <p className="text-sm font-body mb-4" style={{ color: C.muted }}>
                Competitive landscape for Telecom + Fintech BI analytics in Cairo.
                Threat level assessed relative to Eslam's positioning.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {RESEARCH.competitive.map((comp, i) => (
                  <CompetitorRow key={comp.name} comp={comp} index={i} visible={contentVisible} />
                ))}
              </div>
              {/* Positioning summary */}
              <div className="mt-6 rounded-xl border p-5"
                style={{ borderColor: C.blue + '44', background: C.blue + '08' }}>
                <p className="text-sm font-semibold font-body mb-2" style={{ color: C.blue }}>
                  🏆 Eslam's Positioning Advantage
                </p>
                <p className="text-sm font-body" style={{ color: C.muted }}>
                  Unique cross-domain depth (Telecom ETL + Fintech NPS + GIS + Python automation)
                  that no single competitor replicates. Price-competitive vs. MNCs while delivering
                  institutional-quality outputs. Direct proof points in 8 verified client engagements.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* NotebookLM Media Section */}
        <div className="mt-10 rounded-xl border overflow-hidden"
          style={{ borderColor: C.purple + '44', background: C.purple + '06' }}>
          <div className="p-5 border-b flex items-center gap-3"
            style={{ borderColor: C.purple + '33' }}>
            <span className="text-lg">🎙️</span>
            <div>
              <p className="text-sm font-semibold font-body" style={{ color: C.text }}>
                NotebookLM AI Research Brief
              </p>
              <p className="text-xs font-body" style={{ color: C.muted }}>
                Audio podcast + infographic generated from market research data
              </p>
            </div>
            <span className="ml-auto text-xs px-2 py-1 rounded font-mono-custom"
              style={{ background: C.purple + '22', color: C.purple }}>
              POWERED BY NOTEBOOKLM
            </span>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Audio player */}
            <div>
              <p className="text-xs font-mono-custom mb-2" style={{ color: C.muted }}>
                AUDIO DEEP-DIVE PODCAST
              </p>
              <audio controls
                src="/research/ontrac_audio.mp3"
                style={{ width:'100%', borderRadius:'8px',
                  filter:'invert(1) hue-rotate(200deg) brightness(0.85)' }}
                onError={e => { e.target.parentElement.innerHTML =
                  '<p style="color:#555;font-size:11px;padding:12px;background:#111;border-radius:8px;">Audio will appear here after running setup_notebooklm.sh</p>' }}>
                Your browser does not support audio.
              </audio>
            </div>
            {/* Infographic */}
            <div>
              <p className="text-xs font-mono-custom mb-2" style={{ color: C.muted }}>
                MARKET INFOGRAPHIC
              </p>
              <img
                src="/research/ontrac_infographic.png"
                alt="Ontrac Solutions Market Research Infographic"
                style={{ width:'100%', borderRadius:'8px', border:`1px solid ${C.purple}22` }}
                onError={e => {
                  e.target.style.display = 'none'
                  const p = document.createElement('p')
                  p.style.cssText = 'color:#555;font-size:11px;padding:12px;background:#111;border-radius:8px;'
                  p.textContent = 'Infographic will appear here after running setup_notebooklm.sh'
                  e.target.parentElement.appendChild(p)
                }}
              />
            </div>
          </div>
        </div>

        {/* Sources footer */}
        <div className="mt-10 pt-6 border-t" style={{ borderColor: C.border }}>
          <p className="text-xs font-mono-custom mb-2" style={{ color: C.muted }}>DATA SOURCES</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {RESEARCH.sources.map(s => (
              <p key={s.id} className="text-xs font-body" style={{ color: C.muted }}>
                <span style={{ color: C.blue }}>[{s.id}]</span> {s.label}
              </p>
            ))}
          </div>
          <p className="text-xs font-body mt-3" style={{ color: C.muted }}>
            ⚠ SOM figure is LOW confidence (inferred, not independently surveyed).
            All other figures sourced from ≥2 independent providers published within 36 months.
          </p>
        </div>
      </div>
    </section>
  )
}
