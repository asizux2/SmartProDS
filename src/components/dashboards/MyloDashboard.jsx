import {
  RadialBarChart, RadialBar, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts'

// ─── Brand palette ─────────────────────────────────────────────────────
const C = { navy:'#0D1B2A', blue:'#1E88E5', gold:'#F9A825', green:'#22C55E',
             orange:'#EF5F17', purple:'#A855F7', muted:'#6B6B6B', text:'#F5F5F5', bg:'#060A10' }

// ─── Mock data — BNPL Analytics ─────────────────────────────────────────
const gaugeData = [
  { name:'Approval Rate', value:72, fill: C.green, max:100 },
  { name:'On-Time Rate',  value:84, fill: C.blue,  max:100 },
  { name:'NPL Rate',      value:18, fill: C.orange, max:100 },
  { name:'NPS Score',     value:61, fill: C.purple, max:100 },
]

const radialData = gaugeData.map(g => ({ ...g, value: g.value }))

const gmvTrend = [
  { month:'Jan', gmv:12.4, applications:8200 },
  { month:'Feb', gmv:14.1, applications:9100 },
  { month:'Mar', gmv:15.8, applications:10400 },
  { month:'Apr', gmv:18.3, applications:12800 },
  { month:'May', gmv:21.7, applications:15100 },
  { month:'Jun', gmv:25.4, applications:17600 },
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
  <div style={{ background:'#111', borderRadius:'10px', padding:'12px 14px', border:`1px solid ${color}33` }}>
    <p style={{ color: C.muted, fontSize:'11px', fontFamily:'JetBrains Mono,monospace', marginBottom:'4px' }}>{label}</p>
    <p style={{ color, fontSize:'20px', fontWeight:700, fontFamily:'JetBrains Mono,monospace', lineHeight:1 }}>{value}</p>
    {sub && <p style={{ color:'#555', fontSize:'11px', marginTop:'4px' }}>{sub}</p>}
  </div>
)

const GaugeMeter = ({ item }) => (
  <div style={{ textAlign:'center' }}>
    <div style={{ position:'relative', width:'100%', height:'90px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%" cy="85%" innerRadius="65%" outerRadius="100%"
          startAngle={180} endAngle={0} data={[item]}>
          <RadialBar dataKey="value" background={{ fill:'#1a2a3a' }} cornerRadius={4} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div style={{ position:'absolute', bottom:'6px', left:'50%', transform:'translateX(-50%)' }}>
        <p style={{ color: item.fill, fontSize:'16px', fontWeight:700,
          fontFamily:'JetBrains Mono,monospace', lineHeight:1 }}>{item.value}%</p>
      </div>
    </div>
    <p style={{ color: C.muted, fontSize:'10px', marginTop:'4px' }}>{item.name}</p>
  </div>
)

export default function MyloDashboard() {
  return (
    <div style={{ background: C.bg, color: C.text, padding:'24px', fontFamily:'Inter,sans-serif',
      display:'grid', gridTemplateColumns:'1fr 2fr', gap:'20px', minHeight:'540px' }}>

      {/* LEFT SIDEBAR — KPIs + Gauges */}
      <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
        <div>
          <p style={{ color: C.blue, fontSize:'11px', fontFamily:'JetBrains Mono,monospace', marginBottom:'2px' }}>
            BNPL ANALYTICS · MYLO
          </p>
          <h2 style={{ fontSize:'17px', fontWeight:700, color: C.text, margin:0, lineHeight:1.3 }}>
            Portfolio Health Dashboard
          </h2>
          <p style={{ color: C.muted, fontSize:'11px', marginTop:'4px' }}>
            ⚡ PB-06 · Banking NPS pipeline → fintech risk analytics
          </p>
        </div>

        <KPICard label="GMV (M EGP)" value="25.4M" sub="↑ 105% H1 2026" color={C.green} />
        <KPICard label="ACTIVE USERS" value="41,200" sub="↑ 38% QoQ" color={C.blue} />
        <KPICard label="AVG TICKET (EGP)" value="1,470" sub="Consumer electronics" color={C.gold} />
        <KPICard label="CBE COMPLIANCE" value="100%" sub="No.42/2024 met" color={C.purple} />

        {/* 4 radial gauge meters */}
        <div style={{ background:'#0D1B2A', borderRadius:'12px', padding:'14px',
          border:`1px solid #1E1E1E` }}>
          <p style={{ color:'#aaa', fontSize:'11px', fontFamily:'JetBrains Mono,monospace', marginBottom:'10px' }}>
            BNPL HEALTH GAUGES
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
            {gaugeData.map(g => <GaugeMeter key={g.name} item={g} />)}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — GMV + Applications trend */}
      <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
        <div style={{ background:'#0D1B2A', borderRadius:'12px', padding:'20px',
          border:`1px solid ${C.blue}22`, flex:1 }}>
          <p style={{ color:'#aaa', fontSize:'12px', fontFamily:'JetBrains Mono,monospace', marginBottom:'12px' }}>
            GMV (M EGP) & MONTHLY APPLICATIONS — H1 2026
          </p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={gmvTrend} margin={{ top:5, right:10, left:0, bottom:5 }}>
              <defs>
                <linearGradient id="gmvGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.green} stopOpacity={0.35}/>
                  <stop offset="95%" stopColor={C.green} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="appGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.blue} stopOpacity={0.25}/>
                  <stop offset="95%" stopColor={C.blue} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2a3a" />
              <XAxis dataKey="month" tick={{ fill:'#6B6B6B', fontSize:11 }} axisLine={false} />
              <YAxis yAxisId="gmv" orientation="left" tick={{ fill:'#6B6B6B', fontSize:11 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="app" orientation="right" tick={{ fill:'#6B6B6B', fontSize:11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area yAxisId="gmv" type="monotone" dataKey="gmv" stroke={C.green}
                fill="url(#gmvGrad)" strokeWidth={2} name="GMV (M EGP)" />
              <Area yAxisId="app" type="monotone" dataKey="applications" stroke={C.blue}
                fill="url(#appGrad)" strokeWidth={2} name="Applications" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Risk summary grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'10px' }}>
          {[
            { label:'Approval Rate', val:'72%', color: C.green, note:'Target: 75%' },
            { label:'NPL Rate',      val:'3.2%', color: C.orange, note:'CBE max: 5%' },
            { label:'On-Time Rate',  val:'84%',  color: C.blue,  note:'↑ from 79%' },
          ].map(item => (
            <div key={item.label} style={{ background:'#0D1B2A', borderRadius:'10px',
              padding:'12px', border:`1px solid ${item.color}33`, textAlign:'center' }}>
              <p style={{ color: C.muted, fontSize:'10px', marginBottom:'4px' }}>{item.label}</p>
              <p style={{ color: item.color, fontSize:'18px', fontWeight:700,
                fontFamily:'JetBrains Mono,monospace' }}>{item.val}</p>
              <p style={{ color:'#555', fontSize:'10px', marginTop:'2px' }}>{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
