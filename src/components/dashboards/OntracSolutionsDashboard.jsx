import {
  ComposedChart, Bar, Line, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, AreaChart,
} from 'recharts'

// ─── Brand palette ─────────────────────────────────────────────────────
const C = { navy:'#0D1B2A', blue:'#1E88E5', gold:'#F9A825', green:'#22C55E',
             orange:'#EF5F17', purple:'#A855F7', muted:'#6B6B6B', text:'#F5F5F5', bg:'#060A10' }

// ─── Mock data — Telecom BI KPIs ────────────────────────────────────────
const arpu_nps = [
  { month:'Jan', arpu:142, nps:38, transactions:21 },
  { month:'Feb', arpu:148, nps:41, transactions:24 },
  { month:'Mar', arpu:151, nps:39, transactions:22 },
  { month:'Apr', arpu:158, nps:44, transactions:27 },
  { month:'May', arpu:163, nps:47, transactions:29 },
  { month:'Jun', arpu:172, nps:51, transactions:33 },
]

const segmentData = [
  { segment:'Postpaid', arpu:198, churn:2.1, ltv:2840 },
  { segment:'Prepaid', arpu:84, churn:7.8, ltv:410 },
  { segment:'Data-Only', arpu:112, churn:4.2, ltv:960 },
  { segment:'Business', arpu:387, churn:1.4, ltv:6200 },
]

const churnTrend = [
  { month:'Jan', churnRate:5.2, benchmark:6.0 },
  { month:'Feb', churnRate:4.9, benchmark:6.0 },
  { month:'Mar', churnRate:4.7, benchmark:5.8 },
  { month:'Apr', churnRate:4.4, benchmark:5.8 },
  { month:'May', churnRate:4.1, benchmark:5.5 },
  { month:'Jun', churnRate:3.8, benchmark:5.5 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background:'#111', border:'1px solid #222', borderRadius:'8px', padding:'10px 14px' }}>
      <p style={{ color:'#aaa', fontSize:'11px', marginBottom:'4px' }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontSize:'12px', margin:'2px 0' }}>
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  )
}

const KPICard = ({ label, value, sub, color }) => (
  <div style={{ background:'#0D1B2A', borderRadius:'10px', padding:'14px 16px',
    border:`1px solid ${color}33` }}>
    <p style={{ color: C.muted, fontSize:'11px', fontFamily:'JetBrains Mono,monospace', marginBottom:'4px' }}>{label}</p>
    <p style={{ color, fontSize:'22px', fontWeight:700, fontFamily:'JetBrains Mono,monospace', lineHeight:1 }}>{value}</p>
    {sub && <p style={{ color:'#555', fontSize:'11px', marginTop:'4px' }}>{sub}</p>}
  </div>
)

export default function OntracSolutionsDashboard() {
  return (
    <div style={{ background: C.bg, color: C.text, padding:'24px', fontFamily:'Inter,sans-serif', minHeight:'600px' }}>
      {/* Header */}
      <div style={{ marginBottom:'20px' }}>
        <p style={{ color: C.blue, fontSize:'11px', fontFamily:'JetBrains Mono,monospace', marginBottom:'4px' }}>
          TELECOM BI ANALYTICS · ONTRAC SOLUTIONS
        </p>
        <h2 style={{ fontSize:'20px', fontWeight:700, color: C.text, margin:0 }}>
          Subscriber Revenue & NPS Performance
        </h2>
        <p style={{ color: C.muted, fontSize:'12px', marginTop:'4px' }}>
          ⚡ PB-06 + PB-01 · Banking NPS pipeline applied to telco ARPU segmentation
        </p>
      </div>

      {/* KPI row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px', marginBottom:'20px' }}>
        <KPICard label="BLENDED ARPU" value="EGP 163" sub="↑ 14.8% YoY" color={C.blue} />
        <KPICard label="NET NPS SCORE" value="51" sub="Industry avg: 34" color={C.green} />
        <KPICard label="MONTHLY CHURN" value="3.8%" sub="↓ from 5.2% Jan" color={C.gold} />
        <KPICard label="DATA TRANSACTIONS" value="33M" sub="+57% H1 2026" color={C.purple} />
      </div>

      {/* Hero chart: ComposedChart — ARPU bar + NPS line + transactions area */}
      <div style={{ background:'#0D1B2A', borderRadius:'12px', padding:'20px', marginBottom:'16px',
        border:`1px solid ${C.blue}22` }}>
        <p style={{ color:'#aaa', fontSize:'12px', fontFamily:'JetBrains Mono,monospace', marginBottom:'12px' }}>
          ARPU (EGP) · NPS Score · Monthly Transactions (M) — H1 2026
        </p>
        <ResponsiveContainer width="100%" height={240}>
          <ComposedChart data={arpu_nps} margin={{ top:5, right:20, left:0, bottom:5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2a3a" />
            <XAxis dataKey="month" tick={{ fill:'#6B6B6B', fontSize:11 }} axisLine={{ stroke:'#222' }} />
            <YAxis yAxisId="arpu" orientation="left" tick={{ fill:'#6B6B6B', fontSize:11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="nps" orientation="right" tick={{ fill:'#6B6B6B', fontSize:11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize:'11px', color:'#6B6B6B' }} />
            <Area yAxisId="nps" type="monotone" dataKey="transactions" fill={C.purple+'22'} stroke={C.purple}
              strokeWidth={1.5} name="Transactions (M)" dot={false} />
            <Bar yAxisId="arpu" dataKey="arpu" fill={C.blue+'88'} name="ARPU (EGP)" radius={[3,3,0,0]} />
            <Line yAxisId="nps" type="monotone" dataKey="nps" stroke={C.green}
              strokeWidth={2.5} name="NPS Score" dot={{ fill: C.green, r:4 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* 2-column lower grid */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
        {/* Segment ARPU table */}
        <div style={{ background:'#0D1B2A', borderRadius:'12px', padding:'16px', border:`1px solid #1E1E1E` }}>
          <p style={{ color:'#aaa', fontSize:'12px', fontFamily:'JetBrains Mono,monospace', marginBottom:'12px' }}>
            ARPU BY SEGMENT
          </p>
          {segmentData.map(row => (
            <div key={row.segment} style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
              padding:'8px 0', borderBottom:'1px solid #1a1a1a' }}>
              <span style={{ color: C.muted, fontSize:'12px' }}>{row.segment}</span>
              <div style={{ textAlign:'right' }}>
                <span style={{ color: C.blue, fontFamily:'JetBrains Mono,monospace', fontSize:'13px', fontWeight:700 }}>
                  EGP {row.arpu}
                </span>
                <span style={{ color:'#555', fontSize:'11px', marginLeft:'8px' }}>Churn {row.churn}%</span>
              </div>
            </div>
          ))}
        </div>
        {/* Churn trend AreaChart */}
        <div style={{ background:'#0D1B2A', borderRadius:'12px', padding:'16px', border:`1px solid #1E1E1E` }}>
          <p style={{ color:'#aaa', fontSize:'12px', fontFamily:'JetBrains Mono,monospace', marginBottom:'8px' }}>
            CHURN RATE VS INDUSTRY BENCHMARK
          </p>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={churnTrend} margin={{ top:5, right:10, left:-20, bottom:0 }}>
              <defs>
                <linearGradient id="churnGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.orange} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={C.orange} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2a3a" />
              <XAxis dataKey="month" tick={{ fill:'#6B6B6B', fontSize:10 }} axisLine={false} />
              <YAxis tick={{ fill:'#6B6B6B', fontSize:10 }} axisLine={false} tickLine={false} domain={[2,7]} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="churnRate" stroke={C.orange} fill="url(#churnGrad)" strokeWidth={2} name="Churn %" />
              <Line type="monotone" dataKey="benchmark" stroke={C.muted} strokeDasharray="4 2" strokeWidth={1.5} name="Benchmark" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
