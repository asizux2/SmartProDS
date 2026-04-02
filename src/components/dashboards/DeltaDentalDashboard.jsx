import { useState } from "react"
import { BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts"

const NAVY = "#0D1B2A"
const BLUE = "#1E88E5"
const GOLD = "#F9A825"

export default function Dashboard() {
  const [filter, setFilter] = useState("All Plans")

  const npsData = [
    { tier: "Basic", 2024: 28, 2025: 32 },
    { tier: "Enhanced", 2024: 33, 2025: 38 },
    { tier: "Premium", 2024: 41, 2025: 47 },
    { tier: "PPO", 2024: 36, 2025: 42 },
    { tier: "HMO", 2024: 30, 2025: 35 }
  ]

  const improvementData = [
    { month: "Jan", nps: 25 },
    { month: "Feb", nps: 26 },
    { month: "Mar", nps: 28 },
    { month: "Apr", nps: 29 },
    { month: "May", nps: 30 },
    { month: "Jun", nps: 31 },
    { month: "Jul", nps: 33 },
    { month: "Aug", nps: 34 },
    { month: "Sep", nps: 35 },
    { month: "Oct", nps: 36 },
    { month: "Nov", nps: 37 },
    { month: "Dec", nps: 38 }
  ]

  const radarData = [
    { category: "Claims Processing", value: 84 },
    { category: "Provider Network", value: 89 },
    { category: "Member Portal", value: 86 },
    { category: "Mobile App", value: 87 },
    { category: "Customer Service", value: 81 },
    { category: "Preventive Care", value: 92 }
  ]

  const tableData = [
    { serviceType: "Preventive Care", nps: "+52", csat: "94.1%", days: "1.2", sample: "18,420" },
    { serviceType: "Basic Restorative", nps: "+41", csat: "88.3%", days: "3.4", sample: "12,840" },
    { serviceType: "Major Restorative", nps: "+29", csat: "81.2%", days: "7.8", sample: "5,310" },
    { serviceType: "Orthodontia", nps: "+35", csat: "83.7%", days: "12.4", sample: "3,890" },
    { serviceType: "Oral Surgery", nps: "+31", csat: "82.1%", days: "5.6", sample: "2,740" },
    { serviceType: "Endodontics", nps: "+28", csat: "80.3%", days: "4.9", sample: "1,980" }
  ]

  return (
    <div style={{ backgroundColor: NAVY, color: "#fff", fontFamily: "'Segoe UI', sans-serif", padding: "24px", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "0 0 8px 0", fontSize: "32px", fontWeight: "700" }}>Delta Dental NPS & CSAT Analytics</h1>
        <p style={{ margin: "0", color: "#B0BEC5", fontSize: "14px" }}>Member satisfaction tracking for 78M+ members across dental plans</p>
      </div>

      {/* Proof Point Banner */}
      <div style={{ backgroundColor: BLUE, padding: "16px", borderRadius: "8px", marginBottom: "24px", borderLeft: `4px solid ${GOLD}` }}>
        <p style={{ margin: "0", fontSize: "13px", color: "#E3F2FD", fontWeight: "500" }}>
          Built NPS/CSAT dashboards tracking 13-point improvement programs for financial services clients — the same Qualtrics-to-Power BI pipeline applies directly to Delta Dental's CAHPS and VoC analytics.
        </p>
      </div>

      {/* KPI Tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        <div style={{ backgroundColor: "#1A2F3F", padding: "20px", borderRadius: "8px", border: `1px solid ${BLUE}` }}>
          <p style={{ margin: "0 0 8px 0", color: "#B0BEC5", fontSize: "12px", textTransform: "uppercase", fontWeight: "600" }}>Member NPS</p>
          <p style={{ margin: "0", fontSize: "36px", fontWeight: "700", color: GOLD }}>+38</p>
        </div>
        <div style={{ backgroundColor: "#1A2F3F", padding: "20px", borderRadius: "8px", border: `1px solid ${BLUE}` }}>
          <p style={{ margin: "0 0 8px 0", color: "#B0BEC5", fontSize: "12px", textTransform: "uppercase", fontWeight: "600" }}>Claims CSAT</p>
          <p style={{ margin: "0", fontSize: "36px", fontWeight: "700", color: GOLD }}>84.2%</p>
        </div>
        <div style={{ backgroundColor: "#1A2F3F", padding: "20px", borderRadius: "8px", border: `1px solid ${BLUE}` }}>
          <p style={{ margin: "0 0 8px 0", color: "#B0BEC5", fontSize: "12px", textTransform: "uppercase", fontWeight: "600" }}>Provider Net Score</p>
          <p style={{ margin: "0", fontSize: "36px", fontWeight: "700", color: GOLD }}>+45</p>
        </div>
        <div style={{ backgroundColor: "#1A2F3F", padding: "20px", borderRadius: "8px", border: `1px solid ${BLUE}` }}>
          <p style={{ margin: "0 0 8px 0", color: "#B0BEC5", fontSize: "12px", textTransform: "uppercase", fontWeight: "600" }}>Plan Renewal Rate</p>
          <p style={{ margin: "0", fontSize: "36px", fontWeight: "700", color: GOLD }}>91.3%</p>
        </div>
      </div>

      {/* Filter */}
      <div style={{ marginBottom: "24px" }}>
        <label style={{ color: "#B0BEC5", fontSize: "12px", textTransform: "uppercase", fontWeight: "600", marginRight: "12px" }}>Filter by Plan Type:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: "8px 12px", backgroundColor: "#1A2F3F", color: "#fff", border: `1px solid ${BLUE}`, borderRadius: "4px", fontSize: "13px", cursor: "pointer" }}
        >
          <option>All Plans</option>
          <option>Basic</option>
          <option>Enhanced</option>
          <option>Premium</option>
          <option>PPO</option>
          <option>HMO</option>
        </select>
      </div>

      {/* Chart 1: NPS by Plan Tier */}
      <div style={{ backgroundColor: "#1A2F3F", padding: "24px", borderRadius: "8px", marginBottom: "24px", border: `1px solid ${BLUE}` }}>
        <h2 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600", color: "#fff" }}>NPS by Plan Tier (2024 vs 2025)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={npsData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334455" />
            <XAxis dataKey="tier" stroke="#B0BEC5" />
            <YAxis stroke="#B0BEC5" />
            <Tooltip contentStyle={{ backgroundColor: "#0D1B2A", border: `1px solid ${BLUE}`, borderRadius: "4px", color: "#fff" }} />
            <Legend />
            <Bar dataKey="2024" fill="#757575" />
            <Bar dataKey="2025" fill={BLUE} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 2: NPS Improvement Journey */}
      <div style={{ backgroundColor: "#1A2F3F", padding: "24px", borderRadius: "8px", marginBottom: "24px", border: `1px solid ${BLUE}` }}>
        <h2 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600", color: "#fff" }}>13-Point NPS Improvement Journey (2025)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={improvementData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334455" />
            <XAxis dataKey="month" stroke="#B0BEC5" />
            <YAxis stroke="#B0BEC5" />
            <Tooltip contentStyle={{ backgroundColor: "#0D1B2A", border: `1px solid ${BLUE}`, borderRadius: "4px", color: "#fff" }} />
            <ReferenceLine y={38} label={{ value: "Current", position: "right", fill: GOLD }} stroke={GOLD} strokeWidth={2} />
            <ReferenceLine y={45} label={{ value: "2026 Target", position: "right", fill: "#4CAF50" }} stroke="#4CAF50" strokeDasharray="4 4" />
            <Line type="monotone" dataKey="nps" stroke={BLUE} strokeWidth={3} dot={{ fill: GOLD, r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 3: Member Experience Radar */}
      <div style={{ backgroundColor: "#1A2F3F", padding: "24px", borderRadius: "8px", marginBottom: "24px", border: `1px solid ${BLUE}` }}>
        <h2 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600", color: "#fff" }}>Member Experience Touchpoints (2025)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#334455" />
            <PolarAngleAxis dataKey="category" stroke="#B0BEC5" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis stroke="#B0BEC5" />
            <Radar name="Score" dataKey="value" stroke={BLUE} fill={BLUE} fillOpacity={0.5} />
            <Tooltip contentStyle={{ backgroundColor: "#0D1B2A", border: `1px solid ${BLUE}`, borderRadius: "4px", color: "#fff" }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Data Table */}
      <div style={{ backgroundColor: "#1A2F3F", padding: "24px", borderRadius: "8px", border: `1px solid ${BLUE}` }}>
        <h2 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600", color: "#fff" }}>Claims Satisfaction by Service Type (Q4 2025)</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${BLUE}` }}>
                <th style={{ padding: "12px", textAlign: "left", color: GOLD, fontWeight: "600" }}>Service Type</th>
                <th style={{ padding: "12px", textAlign: "center", color: GOLD, fontWeight: "600" }}>NPS</th>
                <th style={{ padding: "12px", textAlign: "center", color: GOLD, fontWeight: "600" }}>CSAT</th>
                <th style={{ padding: "12px", textAlign: "center", color: GOLD, fontWeight: "600" }}>Avg Processing Days</th>
                <th style={{ padding: "12px", textAlign: "center", color: GOLD, fontWeight: "600" }}>Sample Size</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: `1px solid #334455`, backgroundColor: idx % 2 === 0 ? "transparent" : "rgba(30, 136, 229, 0.05)" }}>
                  <td style={{ padding: "12px", textAlign: "left", color: "#E0E0E0" }}>{row.serviceType}</td>
                  <td style={{ padding: "12px", textAlign: "center", color: GOLD, fontWeight: "600" }}>{row.nps}</td>
                  <td style={{ padding: "12px", textAlign: "center", color: BLUE }}>{row.csat}</td>
                  <td style={{ padding: "12px", textAlign: "center", color: "#B0BEC5" }}>{row.days}</td>
                  <td style={{ padding: "12px", textAlign: "center", color: "#B0BEC5" }}>{row.sample}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: `1px solid #334455`, textAlign: "center", color: "#8fa1ac", fontSize: "12px" }}>
        <p style={{ margin: "0" }}>SmartProDS • Eslam Khaled • Data Analytics Portfolio</p>
      </div>
    </div>
  )
}