import { useState } from "react"
import { Treemap, ComposedChart, Bar, Line, RadialBarChart, RadialBar,
         XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
         ReferenceLine, Cell, LabelList } from "recharts"

const NAVY = "#0D1B2A"
const BLUE = "#1E88E5"
const GOLD = "#F9A825"
const GREEN = "#22C55E"
const ORANGE = "#EF5F17"
const PURPLE = "#A855F7"

// Treemap: B.TECH store categories (size=store count, colored by NPS tier)
const storeCategories = [
  { name: "Mobile", size: 47, nps: 91, children: [
    { name: "Flagship", size: 18, nps: 94 },
    { name: "Standard", size: 29, nps: 89 }
  ]},
  { name: "Electronics", size: 52, nps: 88, children: [
    { name: "Flagship", size: 20, nps: 91 },
    { name: "Standard", size: 32, nps: 86 }
  ]},
  { name: "Appliances", size: 38, nps: 84, children: [
    { name: "Flagship", size: 14, nps: 88 },
    { name: "Standard", size: 24, nps: 82 }
  ]},
  { name: "Computing", size: 31, nps: 86, children: [
    { name: "Flagship", size: 12, nps: 90 },
    { name: "Standard", size: 19, nps: 83 }
  ]},
  { name: "After-Sales", size: 22, nps: 79, children: [
    { name: "Warranty", size: 12, nps: 81 },
    { name: "Repairs", size: 10, nps: 77 }
  ]},
]

// RadialBarChart: 4 KPI gauges as concentric rings
const gaugeData = [
  { name: "Digital Wallet", value: 34, fill: PURPLE },
  { name: "App Rating", value: 90, fill: GREEN },
  { name: "CSAT %", value: 88, fill: GOLD },
  { name: "NPS Index", value: 71, fill: BLUE },
]

// ComposedChart: NPS by store tier with target line
const storeTierNPS = [
  { tier: "Flagship", nps: 55, stores: 8, csat: 93 },
  { tier: "Mall-Based", nps: 51, stores: 64, csat: 90 },
  { tier: "Express", nps: 47, stores: 24, csat: 88 },
  { tier: "Standard", nps: 44, stores: 94, csat: 86 },
]

// Top stores table
const topStores = [
  { rank: 1, store: "Maadi Flagship", nps: 62, csat: "94%", type: "Flagship", wow: "+8pp" },
  { rank: 2, store: "New Cairo City Stars", nps: 59, csat: "92%", type: "Mall", wow: "+6pp" },
  { rank: 3, store: "Heliopolis Citystars", nps: 57, csat: "91%", type: "Mall", wow: "+5pp" },
  { rank: 4, store: "Alexandria Sidi Gaber", nps: 56, csat: "90%", type: "Standard", wow: "+7pp" },
  { rank: 5, store: "Zamalek Branch", nps: 54, csat: "89%", type: "Standard", wow: "+4pp" },
]

// NPS color helper for treemap
const npsColor = (nps) => nps >= 90 ? GREEN : nps >= 85 ? BLUE : nps >= 80 ? GOLD : ORANGE

// Custom Treemap content renderer
const CustomTreemapContent = ({ x, y, width, height, name, nps }) => {
  if (width < 30 || height < 20) return null
  return (
    <g>
      <rect x={x+1} y={y+1} width={width-2} height={height-2}
        fill={npsColor(nps || 80)} fillOpacity={0.85} rx={3} />
      <text x={x + width/2} y={y + height/2 - 6} textAnchor="middle"
        fill="#fff" fontSize={Math.min(12, width/6)} fontWeight="600">{name}</text>
      <text x={x + width/2} y={y + height/2 + 10} textAnchor="middle"
        fill="#fff" fontSize={Math.min(10, width/7)} opacity={0.8}>NPS +{nps}</text>
    </g>
  )
}

export default function Dashboard() {
  const [filter, setFilter] = useState("All")
  const filtered = filter === "All" ? storeTierNPS : storeTierNPS.filter(d => d.tier === filter)

  return (
    <div style={{ backgroundColor: NAVY, color: "#fff", fontFamily: "'Segoe UI',sans-serif", padding: "24px", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div>
          <span style={{ color: GOLD, fontWeight: 700, fontSize: "20px" }}>SmartProDS</span>
          <span style={{ color: "#aaa", fontSize: "14px", marginLeft: "10px" }}>× B LABS Retail Intelligence</span>
        </div>
        <span style={{ color: "#aaa", fontSize: "12px" }}>Eslam Khaled | eslam.khaled@smartprods.com</span>
      </div>

      {/* Proof Banner */}
      <div style={{ background: GOLD, color: NAVY, borderRadius: "8px", padding: "10px 16px", marginBottom: "24px", fontWeight: 600, fontSize: "13px" }}>
        ⚡ PB-04: Power BI dashboard for 80+ petroleum stations across 3 waves & 6 KPIs — same multi-location compliance framework scales directly to B LABS's 190 B.TECH stores + MiniCash ecosystem.
      </div>

      {/* KPI Tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px", marginBottom: "24px" }}>
        {[
          { label: "B.TECH Stores", value: "190+", sub: "Active locations", color: BLUE },
          { label: "Overall NPS", value: "+47", sub: "MiniCash channel", color: GOLD },
          { label: "CSAT Score", value: "88.2%", sub: "Wave 3 avg", color: GREEN },
          { label: "WoW Gain", value: "+6.3pp", sub: "vs Wave 2", color: ORANGE },
        ].map((k, i) => (
          <div key={i} style={{ background: "#111", border: `1px solid ${k.color}22`, borderLeft: `3px solid ${k.color}`, borderRadius: "8px", padding: "14px" }}>
            <div style={{ color: "#aaa", fontSize: "11px", marginBottom: "4px" }}>{k.label}</div>
            <div style={{ color: k.color, fontSize: "22px", fontWeight: 700 }}>{k.value}</div>
            <div style={{ color: "#666", fontSize: "11px" }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Main layout: sidebar + content */}
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "20px", marginBottom: "20px" }}>

        {/* Left: RadialBarChart gauges */}
        <div style={{ background: "#0f1825", border: "1px solid #1E3A5F", borderRadius: "10px", padding: "16px" }}>
          <div style={{ color: "#aaa", fontSize: "11px", marginBottom: "12px" }}>// KPI GAUGES</div>
          <ResponsiveContainer width="100%" height={260}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={gaugeData} startAngle={180} endAngle={0}>
              <RadialBar minAngle={15} background={{ fill: "#1a2535" }} clockWise dataKey="value" label={{ fill: "#fff", fontSize: 10 }} />
              <Legend iconSize={10} layout="vertical" verticalAlign="bottom" align="center"
                formatter={(val) => <span style={{ color: "#ccc", fontSize: "11px" }}>{val}</span>} />
              <Tooltip formatter={(v, n) => [`${v}%`, n]} contentStyle={{ background: "#0D1B2A", border: "1px solid #333", color: "#fff" }} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        {/* Right: Treemap */}
        <div style={{ background: "#0f1825", border: "1px solid #1E3A5F", borderRadius: "10px", padding: "16px" }}>
          <div style={{ color: "#aaa", fontSize: "11px", marginBottom: "12px" }}>// STORE CATEGORY NPS MAP (size = store count)</div>
          <div style={{ display: "flex", gap: "12px", marginBottom: "8px" }}>
            {[{ c: GREEN, l: "NPS ≥90" }, { c: BLUE, l: "NPS 85–89" }, { c: GOLD, l: "NPS 80–84" }, { c: ORANGE, l: "NPS <80" }].map((lg, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ width: "10px", height: "10px", background: lg.c, borderRadius: "2px" }} />
                <span style={{ color: "#aaa", fontSize: "10px" }}>{lg.l}</span>
              </div>
            ))}
          </div>
          <Treemap data={storeCategories} dataKey="size" aspectRatio={4/3} content={<CustomTreemapContent />} />
        </div>
      </div>

      {/* ComposedChart: NPS by tier */}
      <div style={{ background: "#0f1825", border: "1px solid #1E3A5F", borderRadius: "10px", padding: "16px", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <div style={{ color: "#aaa", fontSize: "11px" }}>// NPS BY STORE TIER — Target: +50</div>
          <select value={filter} onChange={e => setFilter(e.target.value)}
            style={{ background: "#111", color: "#fff", border: "1px solid #333", padding: "4px 10px", borderRadius: "4px", fontSize: "12px" }}>
            <option>All</option>
            {storeTierNPS.map(d => <option key={d.tier}>{d.tier}</option>)}
          </select>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <ComposedChart data={filtered} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2535" />
            <XAxis dataKey="tier" tick={{ fill: "#aaa", fontSize: 12 }} />
            <YAxis yAxisId="left" domain={[0, 70]} tick={{ fill: "#aaa", fontSize: 11 }} label={{ value: "NPS", angle: -90, position: "insideLeft", fill: "#aaa", fontSize: 11 }} />
            <YAxis yAxisId="right" orientation="right" domain={[0, 120]} tick={{ fill: "#aaa", fontSize: 11 }} label={{ value: "Stores", angle: 90, position: "insideRight", fill: "#aaa", fontSize: 11 }} />
            <Tooltip contentStyle={{ background: "#0D1B2A", border: "1px solid #333", color: "#fff" }} />
            <Legend formatter={v => <span style={{ color: "#ccc", fontSize: "11px" }}>{v}</span>} />
            <Bar yAxisId="right" dataKey="stores" name="Store Count" fill={BLUE} opacity={0.4} radius={[3,3,0,0]} />
            <Bar yAxisId="left" dataKey="nps" name="NPS Score" fill={GOLD} radius={[3,3,0,0]} />
            <Line yAxisId="left" type="monotone" dataKey="csat" name="CSAT %" stroke={GREEN} strokeWidth={2} dot={{ fill: GREEN, r: 4 }} />
            <ReferenceLine yAxisId="left" y={50} stroke={ORANGE} strokeDasharray="5 5" label={{ value: "Target +50", fill: ORANGE, fontSize: 11 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div style={{ background: "#0f1825", border: "1px solid #1E3A5F", borderRadius: "10px", padding: "16px" }}>
        <div style={{ color: "#aaa", fontSize: "11px", marginBottom: "12px" }}>// TOP 5 STORE RANKINGS</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #1E3A5F" }}>
              {["#", "Store", "NPS", "CSAT", "Type", "WoW"].map(h => (
                <th key={h} style={{ padding: "8px 10px", textAlign: "left", color: "#aaa", fontSize: "11px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topStores.map((s, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #111", background: i % 2 === 0 ? "transparent" : "#ffffff08" }}>
                <td style={{ padding: "8px 10px", color: GOLD, fontWeight: 700 }}>{s.rank}</td>
                <td style={{ padding: "8px 10px", color: "#ddd" }}>{s.store}</td>
                <td style={{ padding: "8px 10px", color: s.nps >= 55 ? GREEN : s.nps >= 45 ? BLUE : "#ddd", fontWeight: 700 }}>+{s.nps}</td>
                <td style={{ padding: "8px 10px", color: "#ddd" }}>{s.csat}</td>
                <td style={{ padding: "8px 10px", color: "#aaa" }}>{s.type}</td>
                <td style={{ padding: "8px 10px", color: GREEN }}>{s.wow}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
