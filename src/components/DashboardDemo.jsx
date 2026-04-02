import { useState } from 'react'

// ── BRAND COLORS ─────────────────────────────────────────────────────────────
const C = {
  navy:    '#060A45',
  blue:    '#2D6DF6',
  orange:  '#EF5F17',
  good:    '#0C7846',
  neutral: '#FFB500',
  bad:     '#AA213F',
  bg:      '#07093A',
  surface: '#0D1460',
  surf2:   '#111870',
  surf3:   '#192090',
  border:  '#2A3490',
  text:    '#E8ECFF',
  muted:   '#8892C8',
  dim:     '#4A5590',
}

const scoreColor = (v) => (v >= 0.9 ? C.good : v >= 0.7 ? C.neutral : C.bad)
const pct = (v, d = 1) => (typeof v === 'number' ? `${(v * 100).toFixed(d)}%` : v)

// ── DATA ──────────────────────────────────────────────────────────────────────
const DATA = {
  meta: { project: 'Fuel Station Mystery Shopping', waves: 'W1–W2 · 2025–2026', n: 284, type: 'Mystery Shopping' },

  kpi: {
    total:    0.882, prevTotal: 0.861,
    exterior: 0.894, exteriorW: 0.30,
    service:  0.871, serviceW:  0.45,
    product:  0.888, productW:  0.25,
  },

  waveTrend: [
    { wave: 'W1', total: 0.861, exterior: 0.875, service: 0.846, product: 0.869, n: 142 },
    { wave: 'W2', total: 0.882, exterior: 0.894, service: 0.871, product: 0.888, n: 142 },
  ],

  stations: [
    { name: 'Station A – Cairo North',  score: 0.924, n: 18, region: 'Cairo',       rank: 1  },
    { name: 'Station B – Alexandria',   score: 0.917, n: 22, region: 'Alexandria',  rank: 2  },
    { name: 'Station C – New Cairo',    score: 0.911, n: 16, region: 'Cairo',       rank: 3  },
    { name: 'Station D – 6th October',  score: 0.904, n: 14, region: 'Giza',        rank: 4  },
    { name: 'Station E – Heliopolis',   score: 0.896, n: 20, region: 'Cairo',       rank: 5  },
    { name: 'Station F – Giza Central', score: 0.889, n: 18, region: 'Giza',        rank: 6  },
    { name: 'Station G – Maadi',        score: 0.878, n: 16, region: 'Cairo',       rank: 7  },
    { name: 'Station H – Nasr City',    score: 0.865, n: 14, region: 'Cairo',       rank: 8  },
    { name: 'Station I – Shubra',       score: 0.844, n: 12, region: 'Cairo',       rank: 9  },
    { name: 'Station J – Delta North',  score: 0.812, n: 10, region: 'Delta',       rank: 10 },
    { name: 'Station K – Upper Egypt',  score: 0.786, n: 8,  region: 'Upper Egypt', rank: 11 },
    { name: 'Station L – Remote South', score: 0.741, n: 6,  region: 'Upper Egypt', rank: 12 },
  ],

  sectionKPIs: {
    exterior: [
      { name: 'Forecourt Cleanliness',    score: 0.948 },
      { name: 'Canopy & Signage Lighting', score: 0.912 },
      { name: 'Pump Island Condition',    score: 0.906 },
      { name: 'Brand Signage Visibility', score: 0.891 },
      { name: 'Parking Area',             score: 0.875 },
      { name: 'Landscaping / Surrounds',  score: 0.834 },
    ],
    service: [
      { name: 'Staff Greeting',           score: 0.934 },
      { name: 'Uniform & Appearance',     score: 0.922 },
      { name: 'Fuelling Assistance',      score: 0.896 },
      { name: 'Payment Process',          score: 0.884 },
      { name: 'Upsell / Offer Mention',   score: 0.812 },
      { name: 'Farewell & Thank You',     score: 0.801 },
      { name: 'Response to Complaint',    score: 0.744 },
    ],
    product: [
      { name: 'Fuel Meter Accuracy',      score: 0.966 },
      { name: 'Pump Functionality',       score: 0.948 },
      { name: 'Fuel Quality Perception',  score: 0.921 },
      { name: 'Shop Offer Quality',       score: 0.878 },
      { name: 'Car Wash Availability',    score: 0.847 },
      { name: 'Pricing Display',          score: 0.811 },
    ],
  },

  regions: [
    { name: 'Cairo',       score: 0.893, stations: 7, n: 110 },
    { name: 'Alexandria',  score: 0.917, stations: 1, n: 22  },
    { name: 'Giza',        score: 0.897, stations: 2, n: 32  },
    { name: 'Delta',       score: 0.812, stations: 1, n: 10  },
    { name: 'Upper Egypt', score: 0.764, stations: 2, n: 14  },
  ],

  actionItems: [
    { kpi: 'Response to Complaint',    score: 0.744, impact: 'high',   effort: 'low',    section: 'Service', priority: 1,
      action: 'Roll out complaint-handling protocol training across all stations; manager sign-off per shift.' },
    { kpi: 'Farewell & Thank You',     score: 0.801, impact: 'high',   effort: 'low',    section: 'Service', priority: 2,
      action: 'Add farewell checklist to staff daily briefing. Coach supervisors to audit 3 transactions per shift.' },
    { kpi: 'Pricing Display',          score: 0.811, impact: 'medium', effort: 'low',    section: 'Product', priority: 3,
      action: 'Audit and replace faded/missing price boards at Delta & Upper Egypt stations first.' },
    { kpi: 'Upsell / Offer Mention',   score: 0.812, impact: 'high',   effort: 'low',    section: 'Service', priority: 4,
      action: 'Script the upsell line into every customer interaction; tie to monthly incentive target.' },
    { kpi: 'Upper Egypt Stations',     score: 0.764, impact: 'high',   effort: 'high',   section: 'Region',  priority: 5,
      action: 'Assign regional coach; full retraining + facility audit Q3 2025.' },
    { kpi: 'Landscaping / Surrounds',  score: 0.834, impact: 'medium', effort: 'medium', section: 'Exterior', priority: 6,
      action: 'Include grounds in weekly station maintenance checklist; set photo evidence standard.' },
    { kpi: 'Car Wash Availability',    score: 0.847, impact: 'medium', effort: 'medium', section: 'Product', priority: 7,
      action: 'Increase car wash uptime SLA to 95%; add fault reporting to station ops app.' },
    { kpi: 'Delta North Station',      score: 0.812, impact: 'high',   effort: 'medium', section: 'Region',  priority: 8,
      action: 'Dedicated improvement sprint with weekly MS follow-ups for 6 weeks.' },
  ],
}

// ── SHARED UI ─────────────────────────────────────────────────────────────────

const ScoreBar = ({ score, color, height = 10, showPct = true, label }) => {
  const col = color || scoreColor(score)
  return (
    <div>
      {label && <div style={{ fontSize: 11, color: C.muted, marginBottom: 3 }}>{label}</div>}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1, height, background: `${C.border}55`, borderRadius: height, overflow: 'hidden' }}>
          <div style={{
            width: `${score * 100}%`, height: '100%',
            background: `linear-gradient(90deg, ${col}aa, ${col})`,
            borderRadius: height,
          }} />
        </div>
        {showPct && (
          <span style={{ width: 40, fontSize: 12, fontWeight: 700, color: col, textAlign: 'right' }}>
            {pct(score, 0)}
          </span>
        )}
      </div>
    </div>
  )
}

const KPICard = ({ label, value, sub, color, icon, prev }) => {
  const col = color || scoreColor(value)
  const delta = prev !== undefined ? value - prev : null
  return (
    <div style={{
      background: `linear-gradient(135deg, ${col}14 0%, ${C.surface} 100%)`,
      border: `1px solid ${col}30`, borderTop: `3px solid ${col}`,
      borderRadius: 12, padding: '18px 20px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: '0.5px' }}>{label}</div>
        {icon && <div style={{ fontSize: 18 }}>{icon}</div>}
      </div>
      <div style={{ fontSize: 32, fontWeight: 800, color: col, marginTop: 8, letterSpacing: '-1px' }}>
        {pct(value)}
      </div>
      {sub && <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{sub}</div>}
      {delta !== null && (
        <div style={{ fontSize: 12, marginTop: 8, color: delta >= 0 ? C.good : C.bad, fontWeight: 600 }}>
          {delta >= 0 ? '▲' : '▼'} {pct(Math.abs(delta))} vs W1
        </div>
      )}
    </div>
  )
}

const HeatCell = ({ value, avg = 0.882 }) => {
  const col = scoreColor(value)
  const delta = value - avg
  return (
    <div style={{
      background: `${col}18`, border: `1px solid ${col}35`, borderRadius: 6, height: 44,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: col }}>{pct(value, 0)}</div>
      <div style={{ fontSize: 9, fontWeight: 600, color: delta >= 0 ? C.good : C.bad }}>
        {delta >= 0 ? '+' : ''}{pct(delta, 1)}
      </div>
    </div>
  )
}

const SectionDonut = ({ label, score, weight, color }) => {
  const r = 28, circ = 2 * Math.PI * r
  const col = color || scoreColor(score)
  return (
    <div style={{ textAlign: 'center' }}>
      <svg width={72} height={72} viewBox="0 0 72 72">
        <circle cx={36} cy={36} r={r} fill="none" stroke={`${col}22`} strokeWidth={7} />
        <circle cx={36} cy={36} r={r} fill="none" stroke={col} strokeWidth={7}
          strokeDasharray={`${circ * score} ${circ * (1 - score)}`}
          strokeDashoffset={circ / 4} strokeLinecap="round" />
        <text x={36} y={40} textAnchor="middle" fontSize={11} fontWeight={800} fill={col}>
          {pct(score, 0)}
        </text>
      </svg>
      <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginTop: 4 }}>{label}</div>
      <div style={{ fontSize: 11, color: C.muted }}>Weight {pct(weight, 0)}</div>
    </div>
  )
}

// ── TABS ──────────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'overview',  label: '◉  Overview'       },
  { id: 'sections',  label: '▦  Sections'        },
  { id: 'stations',  label: '📍  Station Ranking' },
  { id: 'trend',     label: '📈  Wave Trend'      },
  { id: 'heatmap',   label: '🔥  Heatmap'         },
  { id: 'action',    label: '🎯  Action Plan'     },
]

// ── MAIN DASHBOARD ────────────────────────────────────────────────────────────
export default function DashboardDemo({ onClose }) {
  const [tab, setTab] = useState('overview')

  const s = {
    wrap: {
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'stretch', justifyContent: 'center',
      overflowY: 'auto',
    },
    panel: {
      width: '100%', maxWidth: 1120,
      background: C.bg,
      display: 'flex', flexDirection: 'column',
      minHeight: '100vh',
    },
    header: {
      background: `linear-gradient(135deg, ${C.navy} 0%, #0A0F60 100%)`,
      borderBottom: `2px solid ${C.blue}`,
      padding: '0 28px',
      boxShadow: `0 4px 40px rgba(45,109,246,0.25)`,
      position: 'sticky', top: 0, zIndex: 10,
    },
    headerTop: { display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0 10px' },
    tabs: { display: 'flex', gap: 0, overflowX: 'auto' },
    tab: (a) => ({
      padding: '11px 16px', fontSize: 13, fontWeight: a ? 600 : 400,
      color: a ? C.blue : C.muted, borderBottom: `2px solid ${a ? C.blue : 'transparent'}`,
      cursor: 'pointer', background: 'none', border: 'none',
      whiteSpace: 'nowrap', transition: 'all 0.15s', fontFamily: 'inherit',
    }),
    content: { padding: '24px 28px', flex: 1 },
    card: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 24px', marginBottom: 16 },
    cardTitle: { fontSize: 11, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 16 },
    g2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 },
    g3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 },
    g4: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginBottom: 16 },
    divider: { borderTop: `1px solid ${C.border}`, margin: '14px 0' },
  }

  return (
    <div style={s.wrap} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={s.panel}>

        {/* ── HEADER ── */}
        <div style={s.header}>
          <div style={s.headerTop}>
            <div style={{
              width: 40, height: 40, background: C.orange, borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 900, color: 'white', flexShrink: 0,
            }}>⛽</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.5px', color: C.text }}>
                Fuel Station Mystery Shopping Dashboard
              </div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
                {DATA.meta.waves} · n={DATA.meta.n} visits · Exterior 30% · Service 45% · Product 25%
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {[['Exterior','30%',C.blue],['Service','45%',C.orange],['Product','25%','#A78BFA']].map(([l,w,c]) => (
                <div key={l} style={{
                  background: `${c}18`, border: `1px solid ${c}44`,
                  borderRadius: 20, padding: '4px 11px', fontSize: 11, color: c, fontWeight: 700,
                }}>{l} {w}</div>
              ))}
              <button
                onClick={onClose}
                style={{
                  marginLeft: 8, width: 32, height: 32, borderRadius: 6,
                  background: `${C.bad}22`, border: `1px solid ${C.bad}50`,
                  color: C.bad, cursor: 'pointer', fontSize: 16, fontFamily: 'inherit',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >✕</button>
            </div>
          </div>
          <div style={s.tabs}>
            {TABS.map(t => (
              <button key={t.id} style={s.tab(tab === t.id)} onClick={() => setTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div style={s.content}>

          {/* ─────────── OVERVIEW ─────────── */}
          {tab === 'overview' && (
            <>
              <div style={s.g4}>
                <KPICard label="OVERALL SCORE" value={DATA.kpi.total} icon="🎯" prev={DATA.waveTrend[0].total} />
                <KPICard label="EXTERIOR"   value={DATA.kpi.exterior} sub="Weight: 30%" color={scoreColor(DATA.kpi.exterior)} icon="🏪" prev={DATA.waveTrend[0].exterior} />
                <KPICard label="SERVICE"    value={DATA.kpi.service}  sub="Weight: 45%" color={scoreColor(DATA.kpi.service)}  icon="🧑‍💼" prev={DATA.waveTrend[0].service} />
                <KPICard label="PRODUCT"    value={DATA.kpi.product}  sub="Weight: 25%" color={scoreColor(DATA.kpi.product)}  icon="⛽" prev={DATA.waveTrend[0].product} />
              </div>

              <div style={s.g2}>
                <div style={s.card}>
                  <div style={s.cardTitle}>◉  Section Achievement</div>
                  <div style={{ display: 'flex', justifyContent: 'space-around', padding: '8px 0' }}>
                    <SectionDonut label="Exterior" score={DATA.kpi.exterior} weight={DATA.kpi.exteriorW} color={C.blue} />
                    <SectionDonut label="Service"  score={DATA.kpi.service}  weight={DATA.kpi.serviceW}  color={C.orange} />
                    <SectionDonut label="Product"  score={DATA.kpi.product}  weight={DATA.kpi.productW}  color="#A78BFA" />
                  </div>
                  <div style={s.divider} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.muted }}>
                    <span>Weighted total:</span>
                    <span style={{ color: C.text, fontWeight: 700 }}>
                      {pct(DATA.kpi.exterior * DATA.kpi.exteriorW + DATA.kpi.service * DATA.kpi.serviceW + DATA.kpi.product * DATA.kpi.productW)}
                    </span>
                  </div>
                </div>

                <div style={s.card}>
                  <div style={s.cardTitle}>📈  Wave Progression W1 → W2</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {DATA.waveTrend.map(w => (
                      <div key={w.wave} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                          background: `${C.blue}22`, border: `1px solid ${C.blue}44`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 11, fontWeight: 800, color: C.blue,
                        }}>{w.wave}</div>
                        <div style={{ flex: 1 }}><ScoreBar score={w.total} showPct={false} height={10} /></div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: scoreColor(w.total), width: 44, textAlign: 'right' }}>
                          {pct(w.total)}
                        </div>
                        <div style={{ fontSize: 11, color: C.dim, width: 32 }}>n={w.n}</div>
                      </div>
                    ))}
                  </div>
                  <div style={s.divider} />
                  <div style={{ fontSize: 11, color: C.muted }}>
                    Overall improvement: <span style={{ color: C.good, fontWeight: 700 }}>+{pct(DATA.kpi.total - DATA.waveTrend[0].total)} W1→W2</span>
                  </div>
                </div>
              </div>

              {/* Region map + top/bottom stations */}
              <div style={s.g2}>
                <div style={s.card}>
                  <div style={s.cardTitle}>🗺️  Regional Performance</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {DATA.regions.map((r) => {
                      const col = scoreColor(r.score)
                      return (
                        <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 90, fontSize: 12, fontWeight: 600, color: C.text }}>{r.name}</div>
                          <div style={{ flex: 1 }}><ScoreBar score={r.score} color={col} height={12} showPct={false} /></div>
                          <div style={{ fontSize: 13, fontWeight: 800, color: col, width: 44, textAlign: 'right' }}>{pct(r.score, 0)}</div>
                          <div style={{ fontSize: 10, color: C.dim, width: 24 }}>×{r.stations}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div style={s.card}>
                  <div style={s.cardTitle}>🏆  Top 3 · ⚠️ Bottom 3 Stations</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[...DATA.stations.slice(0,3), null, ...DATA.stations.slice(-3)].map((st, i) => {
                      if (!st) return (
                        <div key="sep" style={{ textAlign: 'center', color: C.dim, fontSize: 10, letterSpacing: '3px', padding: '2px 0' }}>
                          · · ·
                        </div>
                      )
                      const col = scoreColor(st.score)
                      const isTop = st.rank <= 3
                      return (
                        <div key={st.name} style={{
                          display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 8,
                          background: isTop ? `${C.good}10` : `${C.bad}10`,
                          border: `1px solid ${isTop ? C.good : C.bad}25`,
                        }}>
                          <div style={{ fontSize: 11, fontWeight: 800, color: col, width: 20 }}>#{st.rank}</div>
                          <div style={{ flex: 1, fontSize: 12, color: C.text }}>{st.name}</div>
                          <div style={{ fontSize: 15, fontWeight: 800, color: col }}>{pct(st.score, 0)}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Action summary */}
              <div style={s.card}>
                <div style={s.cardTitle}>⚡  Priority Action Summary</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
                  {[
                    { label: 'Quick Wins',     count: 3, icon: '⚡', color: C.good    },
                    { label: 'High Impact',    count: 5, icon: '🎯', color: C.orange  },
                    { label: 'Need Training',  count: 3, icon: '🧑‍💼', color: '#A78BFA' },
                    { label: 'Below Target',   count: DATA.stations.filter(s=>s.score<0.85).length, icon: '⚠️', color: C.bad },
                  ].map(box => (
                    <div key={box.label} style={{
                      background: `${box.color}12`, border: `1px solid ${box.color}30`,
                      borderTop: `3px solid ${box.color}`, borderRadius: 10, padding: '14px 16px',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: 10, color: C.muted, fontWeight: 600 }}>{box.label}</div>
                        <span style={{ fontSize: 14 }}>{box.icon}</span>
                      </div>
                      <div style={{ fontSize: 32, fontWeight: 900, color: box.color, marginTop: 4 }}>{box.count}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ─────────── SECTIONS ─────────── */}
          {tab === 'sections' && (
            <>
              <div style={s.g3}>
                {[
                  { key: 'exterior', label: 'Exterior',  color: C.blue,   icon: '🏪', weight: '30%', score: DATA.kpi.exterior },
                  { key: 'service',  label: 'Service',   color: C.orange, icon: '🧑‍💼', weight: '45%', score: DATA.kpi.service  },
                  { key: 'product',  label: 'Product',   color: '#A78BFA',icon: '⛽', weight: '25%', score: DATA.kpi.product  },
                ].map(sec => (
                  <div key={sec.key} style={{ ...s.card, borderTop: `3px solid ${sec.color}` }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: sec.color, letterSpacing: '1px',
                      textTransform: 'uppercase', marginBottom: 6 }}>{sec.icon}  {sec.label} · {sec.weight}</div>
                    <div style={{ fontSize: 30, fontWeight: 900, color: scoreColor(sec.score), marginBottom: 16 }}>
                      {pct(sec.score)}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {[...DATA.sectionKPIs[sec.key]].sort((a,b) => b.score - a.score).map(kpi => (
                        <ScoreBar key={kpi.name} score={kpi.score} label={kpi.name} color={sec.color} height={10} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Section vs avg bar */}
              <div style={s.card}>
                <div style={s.cardTitle}>📊  Section Scores vs Overall Average ({pct(DATA.kpi.total, 0)})</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { name: 'Exterior', score: DATA.kpi.exterior, color: C.blue   },
                    { name: 'Service',  score: DATA.kpi.service,  color: C.orange  },
                    { name: 'Product',  score: DATA.kpi.product,  color: '#A78BFA' },
                  ].map(row => {
                    const delta = row.score - DATA.kpi.total
                    return (
                      <div key={row.name}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{row.name}</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: delta >= 0 ? C.good : C.bad }}>
                            {delta >= 0 ? '▲' : '▼'} {pct(Math.abs(delta))} vs avg
                          </span>
                        </div>
                        <ScoreBar score={row.score} color={row.color} height={16} />
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          )}

          {/* ─────────── STATION RANKING ─────────── */}
          {tab === 'stations' && (
            <>
              <div style={s.card}>
                <div style={s.cardTitle}>📍  Station Performance Ranking · All Waves Combined</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {DATA.stations.map((st, i) => {
                    const col = scoreColor(st.score)
                    const medals = [C.neutral, '#C0C0C0', '#CD7F32']
                    const below = st.score < 0.85
                    return (
                      <div key={st.name} style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        background: below ? `${C.bad}08` : C.surf2,
                        borderRadius: 8, padding: '11px 14px',
                        border: `1px solid ${below ? C.bad + '30' : C.border}`,
                      }}>
                        <div style={{
                          width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                          background: i < 3 ? `${medals[i]}22` : C.surf3,
                          border: `2px solid ${i < 3 ? medals[i] : C.border}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 12, fontWeight: 900, color: i < 3 ? medals[i] : C.muted,
                        }}>{st.rank}</div>
                        <div style={{ width: 180, fontWeight: 600, fontSize: 13, color: C.text }}>{st.name}</div>
                        <div style={{
                          fontSize: 10, color: C.muted, background: C.surf3, borderRadius: 3,
                          padding: '2px 7px', flexShrink: 0,
                        }}>{st.region}</div>
                        <div style={{ flex: 1 }}><ScoreBar score={st.score} height={12} showPct={false} /></div>
                        <div style={{ fontSize: 18, fontWeight: 900, color: col, width: 54, textAlign: 'right' }}>
                          {pct(st.score, 0)}
                        </div>
                        <div style={{ fontSize: 10, color: C.dim, width: 32 }}>n={st.n}</div>
                        {below && (
                          <div style={{
                            background: `${C.bad}22`, border: `1px solid ${C.bad}50`,
                            color: C.bad, borderRadius: 4, padding: '2px 8px', fontSize: 10, fontWeight: 700, flexShrink: 0,
                          }}>⚠ Below Target</div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div style={s.card}>
                <div style={s.cardTitle}>📉  Gap to Top Station ({pct(DATA.stations[0].score, 0)})</div>
                {DATA.stations.slice(1).map(st => {
                  const gap = DATA.stations[0].score - st.score
                  return (
                    <div key={st.name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <div style={{ width: 160, fontSize: 12, color: C.text }}>{st.name}</div>
                      <div style={{ flex: 1, height: 10, background: `${C.border}55`, borderRadius: 5 }}>
                        <div style={{
                          width: `${(gap / 0.183) * 100}%`, height: '100%',
                          background: gap > 0.06 ? C.bad : C.neutral, borderRadius: 5,
                        }} />
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: gap > 0.06 ? C.bad : C.neutral, width: 44 }}>
                        -{pct(gap)}
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {/* ─────────── WAVE TREND ─────────── */}
          {tab === 'trend' && (
            <>
              <div style={s.card}>
                <div style={s.cardTitle}>📈  Overall Score · W1 → W2</div>
                <div style={{ display: 'flex', gap: 60, alignItems: 'flex-end', padding: '10px 0 20px', justifyContent: 'center' }}>
                  {DATA.waveTrend.map(w => {
                    const col = scoreColor(w.total)
                    const barH = Math.round(w.total * 200)
                    return (
                      <div key={w.wave} style={{ textAlign: 'center' }}>
                        <div style={{ height: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                          <div style={{
                            width: 80, height: barH,
                            background: `linear-gradient(180deg, ${col}, ${col}88)`,
                            borderRadius: '6px 6px 0 0',
                          }} />
                        </div>
                        <div style={{ marginTop: 8, fontSize: 22, fontWeight: 900, color: col }}>{pct(w.total)}</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: C.muted, marginTop: 2 }}>{w.wave}</div>
                        <div style={{ fontSize: 11, color: C.dim }}>n={w.n}</div>
                      </div>
                    )
                  })}
                </div>
                <div style={{ textAlign: 'center', fontSize: 13, color: C.good, fontWeight: 700 }}>
                  ▲ +{pct(DATA.kpi.total - DATA.waveTrend[0].total)} overall improvement W1→W2
                </div>
              </div>

              <div style={s.g3}>
                {[
                  { key: 'exterior', label: 'Exterior',  color: C.blue    },
                  { key: 'service',  label: 'Service',   color: C.orange  },
                  { key: 'product',  label: 'Product',   color: '#A78BFA' },
                ].map(sec => {
                  const trend = DATA.waveTrend[1][sec.key] - DATA.waveTrend[0][sec.key]
                  return (
                    <div key={sec.key} style={{ ...s.card, borderTop: `3px solid ${sec.color}` }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: sec.color, letterSpacing: '1px',
                        textTransform: 'uppercase', marginBottom: 14 }}>{sec.label}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {DATA.waveTrend.map(w => (
                          <div key={w.wave} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 24, fontSize: 11, color: C.muted, fontWeight: 600 }}>{w.wave}</div>
                            <div style={{ flex: 1 }}><ScoreBar score={w[sec.key]} color={sec.color} height={10} showPct={false} /></div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: scoreColor(w[sec.key]), width: 44, textAlign: 'right' }}>
                              {pct(w[sec.key])}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div style={{
                        marginTop: 14, padding: '8px 12px', borderRadius: 6,
                        background: `${sec.color}12`, border: `1px solid ${sec.color}25`, fontSize: 11,
                      }}>
                        W1→W2 Δ:{' '}
                        <span style={{ fontWeight: 700, color: trend >= 0 ? C.good : C.bad }}>
                          {trend >= 0 ? '+' : ''}{pct(trend)}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div style={s.card}>
                <div style={s.cardTitle}>💡  Wave Insights</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { icon: '📈', color: C.good,   text: 'All three sections improved W1→W2 — positive trajectory across the network.' },
                    { icon: '🧑‍💼', color: C.orange, text: 'Service recovery is the biggest gain (+2.5pp) — training investments are working.' },
                    { icon: '⛽', color: '#A78BFA', text: 'Product scores improved steadily; Fuel Meter Accuracy remains the strongest KPI at 96.6%.' },
                    { icon: '⚠️', color: C.bad,     text: 'Upper Egypt stations declined in Service W1→W2 — require focused intervention.' },
                  ].map((ins, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: 10, alignItems: 'flex-start',
                      padding: '10px 14px', borderRadius: 8,
                      background: `${ins.color}10`, border: `1px solid ${ins.color}25`,
                    }}>
                      <span style={{ fontSize: 16 }}>{ins.icon}</span>
                      <span style={{ fontSize: 13, lineHeight: 1.5, color: C.text }}>{ins.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ─────────── HEATMAP ─────────── */}
          {tab === 'heatmap' && (
            <>
              {/* Section range */}
              <div style={s.g3}>
                {[
                  { label: 'Exterior', color: C.blue,   kpis: DATA.sectionKPIs.exterior },
                  { label: 'Service',  color: C.orange, kpis: DATA.sectionKPIs.service  },
                  { label: 'Product',  color: '#A78BFA',kpis: DATA.sectionKPIs.product  },
                ].map(sec => {
                  const scores = sec.kpis.map(k => k.score)
                  const best   = Math.max(...scores)
                  const worst  = Math.min(...scores)
                  return (
                    <div key={sec.label} style={{ ...s.card, borderTop: `3px solid ${sec.color}` }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: sec.color, textTransform: 'uppercase',
                        letterSpacing: '1px', marginBottom: 10 }}>{sec.label} Section</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                        {[['Best KPI', best, C.good],['Worst KPI', worst, C.bad],['Range', best-worst, best-worst > 0.1 ? C.bad : C.neutral]].map(([l,v,c]) => (
                          <div key={l} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 9, color: C.muted }}>{l}</div>
                            <div style={{ fontSize: 18, fontWeight: 800, color: c }}>{pct(v, 0)}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {[...sec.kpis].sort((a,b) => b.score - a.score).map(kpi => (
                          <div key={kpi.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ flex: 1 }}>
                              <HeatCell value={kpi.score} avg={DATA.kpi.total} />
                            </div>
                            <div style={{ fontSize: 10, color: C.muted, width: 130 }}>{kpi.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Region × Wave heatmap */}
              <div style={s.card}>
                <div style={s.cardTitle}>🔥  Region Performance Heatmap</div>
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr 60px', gap: 8, marginBottom: 8 }}>
                  <div style={{ fontSize: 10, color: C.dim }}>REGION</div>
                  {['W1','W2'].map(w => (
                    <div key={w} style={{ fontSize: 11, fontWeight: 700, color: C.blue, textAlign: 'center' }}>{w}</div>
                  ))}
                  <div style={{ fontSize: 10, color: C.dim, textAlign: 'center' }}>TREND</div>
                </div>
                {[
                  { region: 'Cairo',      W1: 0.874, W2: 0.893 },
                  { region: 'Alexandria', W1: 0.901, W2: 0.917 },
                  { region: 'Giza',       W1: 0.882, W2: 0.897 },
                  { region: 'Delta',      W1: 0.798, W2: 0.812 },
                  { region: 'Upper Egypt',W1: 0.752, W2: 0.764 },
                ].map((row, i) => {
                  const trend = row.W2 - row.W1
                  const tCol  = trend > 0.005 ? C.good : trend < -0.005 ? C.bad : C.neutral
                  return (
                    <div key={row.region} style={{
                      display: 'grid', gridTemplateColumns: '140px 1fr 1fr 60px',
                      gap: 8, marginBottom: 8, alignItems: 'center',
                      padding: '6px 8px', borderRadius: 8,
                      background: i % 2 === 0 ? C.surf2 : 'transparent',
                    }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{row.region}</div>
                      <HeatCell value={row.W1} />
                      <HeatCell value={row.W2} />
                      <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 800, color: tCol }}>
                        {trend >= 0 ? '▲' : '▼'}
                      </div>
                    </div>
                  )
                })}
                <div style={s.divider} />
                <div style={{ display: 'flex', gap: 16, fontSize: 11 }}>
                  {[[C.good,'≥ 90%  Above target'],[C.neutral,'70–89%  Near target'],[C.bad,'< 70%  Below target']].map(([col, lbl]) => (
                    <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: col }} />
                      <span style={{ color: C.muted }}>{lbl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ─────────── ACTION PLAN ─────────── */}
          {tab === 'action' && (
            <>
              <div style={s.g4}>
                {[
                  { label: 'QUICK WINS',     count: DATA.actionItems.filter(a=>a.impact==='high'&&a.effort==='low').length,   color: C.good,   icon: '⚡', sub: 'High impact, low effort'  },
                  { label: 'MAJOR PROJECTS', count: DATA.actionItems.filter(a=>a.impact==='high'&&a.effort!=='low').length,   color: C.blue,   icon: '🎯', sub: 'High impact, more effort' },
                  { label: 'FILL-INS',       count: DATA.actionItems.filter(a=>a.impact!=='high'&&a.effort==='low').length,   color: C.neutral,icon: '📋', sub: 'Easy, smaller gain'        },
                  { label: 'TOTAL ACTIONS',  count: DATA.actionItems.length,                                                  color: C.muted,  icon: '📌', sub: 'Across all sections'       },
                ].map(box => (
                  <div key={box.label} style={{
                    background: `${box.color}14`, border: `1px solid ${box.color}30`,
                    borderTop: `3px solid ${box.color}`, borderRadius: 12, padding: '18px 20px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: 10, color: C.muted, fontWeight: 600 }}>{box.label}</div>
                      <span style={{ fontSize: 16 }}>{box.icon}</span>
                    </div>
                    <div style={{ fontSize: 36, fontWeight: 900, color: box.color, marginTop: 4 }}>{box.count}</div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{box.sub}</div>
                  </div>
                ))}
              </div>

              {/* Priority matrix */}
              <div style={s.card}>
                <div style={s.cardTitle}>📊  Priority Matrix – Impact vs Effort</div>
                <div style={s.g2}>
                  {[
                    { label: '⚡ Quick Wins',       impact: 'high',   effort: 'low',  color: C.good,   desc: 'Do now – max ROI'         },
                    { label: '🎯 Strategic Projects',impact: 'high',   effort: 'high', color: C.blue,   desc: 'Plan carefully – big payoff'},
                    { label: '📋 Nice to Have',      impact: 'medium', effort: 'low',  color: C.neutral,desc: 'Easy, fill in when possible'},
                    { label: '✗ Reconsider',          impact: 'medium', effort: 'high', color: C.dim,    desc: 'Low priority'              },
                  ].map(quad => {
                    const items = DATA.actionItems.filter(a=>a.impact===quad.impact && a.effort===quad.effort)
                    return (
                      <div key={quad.label} style={{
                        background: `${quad.color}10`, border: `1px solid ${quad.color}25`,
                        borderRadius: 10, padding: '16px 18px', minHeight: 110,
                      }}>
                        <div style={{ fontWeight: 700, color: quad.color, fontSize: 13, marginBottom: 4 }}>{quad.label}</div>
                        <div style={{ fontSize: 10, color: C.dim, marginBottom: 10 }}>{quad.desc}</div>
                        {items.length === 0
                          ? <div style={{ fontSize: 11, color: C.dim, fontStyle: 'italic' }}>No items</div>
                          : items.map(a => (
                            <div key={a.kpi} style={{
                              display: 'flex', alignItems: 'center', gap: 8,
                              padding: '5px 0', borderBottom: `1px solid ${quad.color}15`,
                            }}>
                              <div style={{ fontSize: 11, fontWeight: 800, color: scoreColor(a.score), width: 42 }}>{pct(a.score, 0)}</div>
                              <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{a.kpi}</div>
                              <div style={{ marginLeft: 'auto', fontSize: 9, color: quad.color,
                                background: `${quad.color}20`, borderRadius: 3, padding: '1px 5px' }}>{a.section}</div>
                            </div>
                          ))
                        }
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Action list */}
              <div style={s.card}>
                <div style={s.cardTitle}>📋  Recommended Actions – By Priority</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {DATA.actionItems.map((a, i) => {
                    const col   = scoreColor(a.score)
                    const efCol = a.effort==='low' ? C.good : a.effort==='medium' ? C.neutral : C.bad
                    const imCol = a.impact==='high' ? C.good : C.neutral
                    return (
                      <div key={a.kpi} style={{
                        display: 'flex', gap: 12, alignItems: 'flex-start',
                        padding: '13px 14px', borderRadius: 10,
                        background: i === 0 ? `${C.good}10` : C.surf2,
                        border: `1px solid ${i === 0 ? C.good+'35' : C.border}`,
                      }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                          background: i<3 ? `${col}22` : C.surf3, border: `2px solid ${i<3 ? col : C.border}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 11, fontWeight: 900, color: i<3 ? col : C.muted,
                        }}>#{a.priority}</div>
                        <div style={{
                          flexShrink: 0, textAlign: 'center',
                          background: `${col}18`, border: `1px solid ${col}30`,
                          borderRadius: 6, padding: '4px 10px', minWidth: 52,
                        }}>
                          <div style={{ fontSize: 14, fontWeight: 900, color: col }}>{pct(a.score, 0)}</div>
                          <div style={{ fontSize: 9, color: C.muted }}>{a.section}</div>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 4 }}>{a.kpi}</div>
                          <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{a.action}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end', flexShrink: 0 }}>
                          <div style={{ fontSize: 9, fontWeight: 700, color: imCol, background: `${imCol}18`, borderRadius: 4, padding: '2px 7px' }}>
                            {a.impact.toUpperCase()} IMPACT
                          </div>
                          <div style={{ fontSize: 9, fontWeight: 700, color: efCol, background: `${efCol}18`, borderRadius: 4, padding: '2px 7px' }}>
                            {a.effort.toUpperCase()} EFFORT
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}
