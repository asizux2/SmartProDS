import { useState } from "react"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts"

const NAVY = "#0D1B2A"
const BLUE = "#1E88E5"
const GOLD = "#F9A825"

export default function Dashboard() {
  const [filter, setFilter] = useState("All Sectors")

  const recruitmentFunnelData = [
    { stage: "Applied", count: 1240, fill: "#1E88E5" },
    { stage: "Screened", count: 620, fill: "#1976D2" },
    { stage: "Interviewed", count: 248, fill: "#1565C0" },
    { stage: "Offered", count: 124, fill: "#0D47A1" },
    { stage: "Placed", count: 93, fill: "#0D1B2A" }
  ]

  const timeToHireTrendData = [
    { month: "Jan", days: 24.2 },
    { month: "Feb", days: 23.1 },
    { month: "Mar", days: 22.4 },
    { month: "Apr", days: 21.8 },
    { month: "May", days: 20.9 },
    { month: "Jun", days: 20.1 },
    { month: "Jul", days: 19.7 },
    { month: "Aug", days: 19.3 },
    { month: "Sep", days: 19.0 },
    { month: "Oct", days: 18.8 },
    { month: "Nov", days: 18.5 },
    { month: "Dec", days: 18.4 }
  ]

  const sourceQualityData = [
    { channel: "LinkedIn", volume: 380, quality: 84 },
    { channel: "Wuzzuf", volume: 290, quality: 78 },
    { channel: "Indeed", volume: 210, quality: 75 },
    { channel: "Referral", volume: 145, quality: 92 },
    { channel: "Direct Website", volume: 120, quality: 81 },
    { channel: "Headhunting", volume: 95, quality: 95 }
  ]

  const placementPerformanceData = [
    { sector: "IT/Software", placements: 34, timeToHire: 14.2, retention: 96.2, clientScore: 4.8 },
    { sector: "Finance & Banking", placements: 21, timeToHire: 16.8, retention: 94.7, clientScore: 4.7 },
    { sector: "Manufacturing", placements: 18, timeToHire: 21.4, retention: 93.1, clientScore: 4.5 },
    { sector: "Chemical Industry", placements: 12, timeToHire: 19.7, retention: 95.8, clientScore: 4.6 },
    { sector: "FMCG/Retail", placements: 8, timeToHire: 22.3, retention: 91.4, clientScore: 4.4 }
  ]

  const filteredData = filter === "All Sectors"
    ? placementPerformanceData
    : placementPerformanceData.filter(row => row.sector.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div style={{ backgroundColor: NAVY, color: "#fff", fontFamily: "'Segoe UI', sans-serif", padding: "24px", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "700", margin: "0 0 8px 0", color: "#fff" }}>
          SmartProDS Portfolio — Envision Employment Solutions
        </h1>
        <p style={{ fontSize: "14px", color: "#B0BEC5", margin: "0" }}>
          Data Analyst: Eslam Khaled | Recruitment Analytics & ETL Pipeline Integration
        </p>
      </div>

      {/* Proof Point Banner */}
      <div style={{
        backgroundColor: "#1a2d3d",
        border: `2px solid ${GOLD}`,
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "32px",
        display: "flex",
        alignItems: "center",
        gap: "12px"
      }}>
        <div style={{ fontSize: "20px" }}>★</div>
        <p style={{ fontSize: "14px", color: "#B0BEC5", margin: "0", lineHeight: "1.6" }}>
          <strong style={{ color: GOLD }}>Proof Point:</strong> Built ETL pipelines processing 500,000+ survey records and automated reporting workflows at Vodafone Egypt — the same data pipeline logic applies to Envision's Workable ATS → Power BI recruitment analytics.
        </p>
      </div>

      {/* KPI Tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        <div style={{ backgroundColor: "#1a2d3d", borderRadius: "8px", padding: "20px", borderLeft: `4px solid ${BLUE}` }}>
          <p style={{ fontSize: "12px", color: "#B0BEC5", margin: "0 0 8px 0", textTransform: "uppercase" }}>Time-to-Hire</p>
          <p style={{ fontSize: "28px", fontWeight: "700", color: "#fff", margin: "0" }}>18.4 days</p>
        </div>
        <div style={{ backgroundColor: "#1a2d3d", borderRadius: "8px", padding: "20px", borderLeft: `4px solid ${GOLD}` }}>
          <p style={{ fontSize: "12px", color: "#B0BEC5", margin: "0 0 8px 0", textTransform: "uppercase" }}>Placement Retention</p>
          <p style={{ fontSize: "28px", fontWeight: "700", color: "#fff", margin: "0" }}>94.2%</p>
        </div>
        <div style={{ backgroundColor: "#1a2d3d", borderRadius: "8px", padding: "20px", borderLeft: `4px solid ${BLUE}` }}>
          <p style={{ fontSize: "12px", color: "#B0BEC5", margin: "0 0 8px 0", textTransform: "uppercase" }}>Source Quality Score</p>
          <p style={{ fontSize: "28px", fontWeight: "700", color: "#fff", margin: "0" }}>87%</p>
        </div>
        <div style={{ backgroundColor: "#1a2d3d", borderRadius: "8px", padding: "20px", borderLeft: `4px solid ${GOLD}` }}>
          <p style={{ fontSize: "12px", color: "#B0BEC5", margin: "0 0 8px 0", textTransform: "uppercase" }}>Client NPS</p>
          <p style={{ fontSize: "28px", fontWeight: "700", color: "#fff", margin: "0" }}>+51</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
        {/* Chart 1: Recruitment Funnel */}
        <div style={{ backgroundColor: "#1a2d3d", borderRadius: "8px", padding: "20px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 16px 0", color: "#fff" }}>
            Recruitment Funnel by Stage
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={recruitmentFunnelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3f50" />
              <XAxis dataKey="stage" stroke="#B0BEC5" />
              <YAxis stroke="#B0BEC5" />
              <Tooltip
                contentStyle={{ backgroundColor: NAVY, border: `1px solid ${GOLD}`, borderRadius: "4px" }}
                labelStyle={{ color: "#fff" }}
              />
              <Bar dataKey="count" fill={BLUE} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: Time-to-Hire Trend */}
        <div style={{ backgroundColor: "#1a2d3d", borderRadius: "8px", padding: "20px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 16px 0", color: "#fff" }}>
            Time-to-Hire Trend (Monthly)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeToHireTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3f50" />
              <XAxis dataKey="month" stroke="#B0BEC5" />
              <YAxis stroke="#B0BEC5" />
              <Tooltip
                contentStyle={{ backgroundColor: NAVY, border: `1px solid ${GOLD}`, borderRadius: "4px" }}
                labelStyle={{ color: "#fff" }}
              />
              <Legend />
              <ReferenceLine y={18} label={{ value: "Target 18 days", position: "insideTopRight", offset: -10, fill: GOLD }} stroke={GOLD} strokeDasharray="4 4" />
              <Line type="monotone" dataKey="days" stroke={BLUE} strokeWidth={2} dot={{ fill: GOLD, r: 4 }} activeDot={{ r: 6 }} name="Days to Hire" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div style={{ backgroundColor: "#1a2d3d", borderRadius: "8px", padding: "20px", marginBottom: "32px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 16px 0", color: "#fff" }}>
          Source Quality by Channel
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sourceQualityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a3f50" />
            <XAxis dataKey="channel" stroke="#B0BEC5" />
            <YAxis yAxisId="left" stroke="#B0BEC5" label={{ value: "Volume", angle: -90, position: "insideLeft" }} />
            <YAxis yAxisId="right" orientation="right" stroke={GOLD} label={{ value: "Quality %", angle: 90, position: "insideRight" }} />
            <Tooltip
              contentStyle={{ backgroundColor: NAVY, border: `1px solid ${GOLD}`, borderRadius: "4px" }}
              labelStyle={{ color: "#fff" }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="volume" fill={BLUE} name="Volume" radius={[8, 8, 0, 0]} />
            <Bar yAxisId="right" dataKey="quality" fill={GOLD} name="Quality Score %" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filter & Data Table */}
      <div style={{ backgroundColor: "#1a2d3d", borderRadius: "8px", padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0", color: "#fff" }}>
            Placement Performance by Industry Sector
          </h3>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              backgroundColor: NAVY,
              color: "#fff",
              border: `1px solid ${BLUE}`,
              borderRadius: "4px",
              padding: "8px 12px",
              fontSize: "14px",
              cursor: "pointer"
            }}
          >
            <option>All Sectors</option>
            <option>IT/Software</option>
            <option>Finance & Banking</option>
            <option>Manufacturing</option>
            <option>Chemical Industry</option>
            <option>FMCG/Retail</option>
          </select>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${BLUE}` }}>
              <th style={{ textAlign: "left", padding: "12px", color: GOLD, fontSize: "13px", fontWeight: "600" }}>Sector</th>
              <th style={{ textAlign: "left", padding: "12px", color: GOLD, fontSize: "13px", fontWeight: "600" }}>Placements</th>
              <th style={{ textAlign: "left", padding: "12px", color: GOLD, fontSize: "13px", fontWeight: "600" }}>Avg Time-to-Hire</th>
              <th style={{ textAlign: "left", padding: "12px", color: GOLD, fontSize: "13px", fontWeight: "600" }}>Retention 12m</th>
              <th style={{ textAlign: "left", padding: "12px", color: GOLD, fontSize: "13px", fontWeight: "600" }}>Client Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: `1px solid #2a3f50`, backgroundColor: idx % 2 === 0 ? "transparent" : "rgba(30, 136, 229, 0.05)" }}>
                <td style={{ padding: "12px", color: "#fff" }}>{row.sector}</td>
                <td style={{ padding: "12px", color: "#fff" }}>{row.placements}</td>
                <td style={{ padding: "12px", color: "#fff" }}>{row.timeToHire} days</td>
                <td style={{ padding: "12px", color: GOLD, fontWeight: "600" }}>{row.retention}%</td>
                <td style={{ padding: "12px", color: "#fff" }}>{row.clientScore}/5</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{ marginTop: "32px", textAlign: "center", color: "#B0BEC5", fontSize: "12px" }}>
        <p style={{ margin: "0" }}>SmartProDS | Portfolio Dashboard | Data prepared with ETL automation</p>
      </div>
    </div>
  )
}
