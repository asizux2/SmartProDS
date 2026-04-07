import {
  PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from 'recharts'

// ─── Brand palette ─────────────────────────────────────────────────────
const C = { navy:'#0D1B2A', blue:'#1E88E5', gold:'#F9A825', green:'#22C55E',
             orange:'#EF5F17', purple:'#A855F7', teal:'#0891B2', muted:'#6B6B6B',
             text:'#F5F5F5', bg:'#060A10' }

// ─── Mock data — Financial Analytics ────────────────────────────────────
const budgetAllocation = [
  { name:'Operations', value:34, color: C.blue },
  { name:'Technology', value:22, color: C.purple },
  { name:'Marketing',  value:18, color: C.gold },
  { name:'Risk/Comp.', value:14, color: C.orange },
  { name:'HR & Admin', value:12, color: C.teal },
]

const budgetVsActual = [
  { month:'Jan', budget:4.2, actual:3.9, forecast:4.0 },
  { month:'Feb', budget:4.5, actual:4.3, forecast:4.4 },
  { month:'Mar', budget:4.8, actual:4.7, forecast:4.6 },
  { month:'Apr', budget:5.1, actual:5.0, forecast:5.0 },
  { month:'May', budget:5.4, actual:5.2, forecast:5.3 },
  { month:'Jun', budget:5.8, actual:5.6, forecast:5.7 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background:'#111', border:'1px solid #222', borderRadius:'8px', padding:'10px 14px' }}>
      <p style={{ color:'#aaa', fontSize:'11px', marginBottom:'4px' }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontSize:'12px', margin:'2px 0' }}>
          {p.name}: <strong>${p.value}M</strong>
        </p>
      ))}
    </div>
  )
}

const CustomLegend = ({ data }) => (
  <div style={{ display:'flex', flexDirection:'column', gap:'8px', justifyContent:'center' }}>
    {data.map(item => (
      <div key={item.name} style={{ display:'flex', alignItems:'center', gap:'8px' }}>
        <div style={{ width:'10px', height:'10px', borderRadius:'2px', background: item.color, flexShrink:0 }} />
        <span style={{ color: C.muted, fontSize:'12px' }}>{item.name}</span>
        <span style={{ color: item.color, fontSize:'12px', fontWeight:700,
          fontFamily:'JetBrains Mono,monospace', marginLeft:'auto' }}>{item.value}%</span>
      </div>
    ))}
  </div>
)

const KPICard = ({ label, value, sub, color }) => (
  <div style={{ background:'#111', borderRadius:'10px', padding:'12px 14px', border:`1px solid ${color}33` }}>
    <p style={{ color: C.muted, fontSize:'11px', fontFamily:'JetBrains Mono,monospace', marginBottom:'4px' }}>{label}</p>
    <p style={{ color, fontSize:'20px', fontWeight:700, fontFamily:'JetBrains Mono,monospace', lineHeight:1 }}>{value}</p>
    {sub && <p style={{ color:'#555', fontSize:'11px', marginTop:'4px' }}>{sub}</p>}
  </div>
)

export default function TechBizGlobalDashboard() {
  return (
    <div style={{ background: C.bg, color: C.text, padding:'24px', fontFamily:'Inter,sans-serif', minHeight:'580px' }}>
      {/* Header */}
      <div style={{ marginBottom:'16px' }}>
        <p style={{ color: C.gold, fontSize:'11px', fontFamily:'JetBrains Mono,monospace', marginBottom:'2px' }}>
          FINANCIAL ANALYTICS · TECHBIZ GLOBAL
        </p>
        <h2 style={{ fontSize:'20px', fontWeight:700, color: C.text, margin:0 }}>
          Budget Allocation & Financial Performance
        </h2>
        <p style={{ color: C.muted, fontSize:'12px', marginTop:'4px' }}>
          ⚡ PB-06 · Multi-entity financial dashboards → executive reporting layer
        </p>
      </div>

      {/* KPI row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'10px', marginBottom:'16px' }}>
        <KPICard label="TOTAL BUDGET" value="$33.8M" sub="FY2026" color={C.blue} />
        <KPICard label="YTD SPEND" value="$28.7M" sub="85% utilization" color={C.gold} />
        <KPICard label="VARIANCE" value="-2.4%" sub="Under budget" color={C.green} />
        <KPICard label="ROI" value="18.3%" sub="↑ vs 14.1% prior yr" color={C.purple} />
      </div>

      {/* Main content: donut + area chart side by side */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1.8fr', gap:'16px', marginBottom:'16px' }}>
        {/* Donut chart */}
        <div style={{ background:'#0D1B2A', borderRadius:'12px', padding:'18px',
          border:`1px solid ${C.gold}22` }}>
          <p style={{ color:'#aaa', fontSize:'12px', fontFamily:'JetBrains Mono,monospace', marginBottom:'12px' }}>
            BUDGET ALLOCATION BY CATEGORY
          </p>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', flexWrap:'wrap' }}>
            <div style={{ minWidth:'130px' }}>
              <ResponsiveContainer width="100%" height={130}>
                <PieChart>
                  <Pie data={budgetAllocation} cx="50%" cy="50%" innerRadius={40} outerRadius={60}
                    paddingAngle={3} dataKey="value">
                    {budgetAllocation.map((entry, i) => (
                      <Cell key={i} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <CustomLegend data={budgetAllocation} />
          </div>
        </div>

        {/* Budget vs Actual Area Chart */}
        <div style={{ background:'#0D1B2A', borderRadius:'12px', padding:'18px',
          border:`1px solid #1E1E1E` }}>
          <p style={{ color:'#aaa', fontSize:'12px', fontFamily:'JetBrains Mono,monospace', marginBottom:'12px' }}>
            BUDGET vs ACTUAL vs FORECAST ($M) — H1 2026
          </p>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={budgetVsActual} margin={{ top:5, right:10, left:0, bottom:0 }}>
              <defs>
                <linearGradient id="budGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.blue} stopOpacity={0.2}/>
                  <stop offset="95%" stopColor={C.blue} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.green} stopOpacity={0.25}/>
                  <stop offset="95%" stopColor={C.green} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2a3a" />
              <XAxis dataKey="month" tick={{ fill:'#6B6B6B', fontSize:11 }} axisLine={false} />
              <YAxis tick={{ fill:'#6B6B6B', fontSize:11 }} axisLine={false} tickLine={false}
                domain={[3,7]} tickFormatter={v => `$${v}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize:'11px', color:'#6B6B6B' }} />
              <Area type="monotone" dataKey="budget" stroke={C.blue} fill="url(#budGrad)"
                strokeWidth={2} name="Budget" strokeDasharray="4 2" />
              <Area type="monotone" dataKey="actual" stroke={C.green} fill="url(#actGrad)"
                strokeWidth={2} name="Actual" />
              <Area type="monotone" dataKey="forecast" stroke={C.gold}
                fill="none" strokeWidth={1.5} strokeDasharray="3 3" name="Forecast" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom: variance table */}
      <div style={{ background:'#0D1B2A', borderRadius:'12px', padding:'16px', border:`1px solid #1E1E1E` }}>
        <p style={{ color:'#aaa', fontSize:'12px', fontFamily:'JetBrains Mono,monospace', marginBottom:'10px' }}>
          CATEGORY VARIANCE ANALYSIS
        </p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'8px' }}>
          {budgetAllocation.map(cat => {
            const variance = (Math.random() * 6 - 3).toFixed(1)
            const isNeg = parseFloat(variance) < 0
            return (
              <div key={cat.name} style={{ textAlign:'center', padding:'8px',
                background:'#111', borderRadius:'8px', border:`1px solid ${cat.color}22` }}>
                <p style={{ color: C.muted, fontSize:'10px', marginBottom:'3px' }}>{cat.name}</p>
                <p style={{ color: cat.color, fontSize:'14px', fontWeight:700,
                  fontFamily:'JetBrains Mono,monospace' }}>{cat.value}%</p>
                <p style={{ color: isNeg ? C.green : C.orange, fontSize:'10px', marginTop:'2px' }}>
                  {isNeg ? '▼' : '▲'} {Math.abs(variance)}%
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
