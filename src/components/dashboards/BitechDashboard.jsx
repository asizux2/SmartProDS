import { useState } from "react"
import { BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts"

const NAVY = "#0D1B2A"
const BLUE = "#1E88E5"
const GOLD = "#F9A825"

export default function Dashboard() {
  const [filter, setFilter] = useState("All Verticals")

  const automationData = [
    { task: "FMCG Sales Reports", before: 18, after: 0.5 },
    { task: "Store Audit Dashboards", before: 12, after: 0.8 },
    { task: "KPI Scorecards", before: 8, after: 0.3 },
    { task: "ETL Data Pipelines", before: 14, after: 1.2 },
    { task: "Ad-Hoc Analysis", before: 6, after: 1.0 }
  ]

  const efficiencyData = [
    { month: "Jan", hoursSaved: 12 },
    { month: "Feb", hoursSaved: 18 },
    { month: "Mar", hoursSaved: 24 },
    { month: "Apr", hoursSaved: 28 },
    { month: "May", hoursSaved: 31 },
    { month: "Jun", hoursSaved: 33 },
    { month: "Jul", hoursSaved: 35 },
    { month: "Aug", hoursSaved: 36 },
    { month: "Sep", hoursSaved: 37 },
    { month: "Oct", hoursSaved: 38 },
    { month: "Nov", hoursSaved: 38 },
    { month: "Dec", hoursSaved: 38 }
  ]

  const radarDataBefore = [
    { dimension: "Speed", before: 40, after: 95 },
    { dimension: "Accuracy", before: 72, after: 99 },
    { dimension: "Cost Savings", before: 35, after: 91 },
    { dimension: "Client Satisfaction", before: 78, after: 96 },
    { dimension: "Scalability", before: 30, after: 94 },
    { dimension: "Maintenance Ease", before: 65, after: 88 }
  ]

  const tableData = [
    { vertical: "FMCG Retail", reports: "24", before: "18.4", after: "0.5", saved: "97%", cost: "142,800" },
    { vertical: "Consumer Goods", reports: "12", before: "9.2", after: "0.3", saved: "97%", cost: "71,400" },
    { vertical: "Food & Beverage", reports: "8", before: "6.8", after: "0.4", saved: "94%", cost: "49,200" },
    { vertical: "Personal Care", reports: "6", before: "4.9", after: "0.3", saved: "94%", cost: "36,600" },
    { vertical: "Home Products", reports: "5", before: "3.8", after: "0.2", saved: "95%", cost: "29,400" },
    { vertical: "Pharma", reports: "4", before: "3.1", after: "0.3", saved: "90%", cost: "21,000" }
  ]

  return (
    <div style={{ backgroundColor: NAVY, color: "#fff", fontFamily: "'Segoe UI', sans-serif", padding: "24px", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "0 0 8px 0", fontSize: "32px", fontWeight: "700" }}>Operations Automation Platform</h1>
        <p style={{ margin: "0", color: "#B0BEC5", fontSize: "14px" }}>Bi-technologies Salesbuzz FMCG Reporting Suite</p>
      </div>

      {/* Proof Point Banner */}
      <div style={{ backgroundColor: BLUE, padding: "16px", borderRadius: "8px", marginBottom: "24px", borderLeft: `4px solid ${GOLD}` }}>
        <p style={{ margin: "0", fontSize: "13px", color: "#E3F2FD", fontWeight: "500" }}>
          Built NIQ's operations automation platform cutting 40+ manual hours/month to &lt;2 hrs — same Power BI + Python automation framework directly applicable to Bi-technologies' Salesbuzz FMCG reporting suite.
        </p>
      </div>

      {/* KPI Tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        <div style={{ backgroundColor: "#1A2F3F", padding: "20px", borderRadius: "8px", border: `1px solid ${BLUE}` }}>
          <p style={{ margin: "0 0 8px 0", color: "#B0BEC5", fontSize: "12px", textTransform: "uppercase", fontWeight: "600" }}>Reports Automated</p>
          <p style={{ margin: "0", fontSize: "36px", fontWeight: "700", color: GOLD }}>47</p>
        </div>
        <div style={{ backgroundColor: "#1A2F3F", padding: "20px", borderRadius: "8px", border: `1px solid ${BLUE}` }}>
          <p style={{ margin: "0 0 8px 0", color: "#B0BEC5", fontSize: "12px", textTransform: "uppercase", fontWeight: "600" }}>Manual Hours Saved/yr</p>
          <p style={{ margin: "0", fontSize: "36px", fontWeight: "700", color: GOLD }}>380 hrs</p>
        </div>
        <div style={{ backgroundColor: "#1A2F3F", padding: "20px", borderRadius: "8px", border: `1px solid ${BLUE}` }}>
          <p style={{ margin: "0 0 8px 0", color: "#B0BEC5", fontSize: "12px", textTransform: "uppercase", fontWeight: "600" }}>Client Delivery Time</p>
          <p style={{ margin: "0", fontSize: "36px", fontWeight: "700", color: GOLD }}>-73%</p>
        </div>
        <div style={{ backgroundColor: "#1A2F3F", padding: "20px", borderRadius: "8px", border: `1px solid ${BLUE}` }}>
          <p style={{ margin: "0 0 8px 0", color: "#B0BEC5", fontSize: "12px", textTransform: "uppercase", fontWeight: "600" }}>Data Accuracy</p>
          <p style={{ margin: "0", fontSize: "36px", fontWeight: "700", color: GOLD }}>+15pp</p>
        </div>
      </div>

      {/* Filter */}
      <div style={{ marginBottom: "24px" }}>
        <label style={{ color: "#B0BEC5", fontSize: "12px", textTransform: "uppercase", fontWeight: "600", marginRight: "12px" }}>Filter by Client Vertical:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: "8px 12px", backgroundColor: "#1A2F3F", color: "#fff", border: `1px solid ${BLUE}`, borderRadius: "4px", fontSize: "13px", cursor: "pointer" }}
        >
          <option>All Verticals</option>
          <option>FMCG Retail</option>
          <option>Consumer Goods</option>
          <option>Food & Beverage</option>
          <option>Personal Care</option>
          <option>Home Products</option>
          <option>Pharma</option>
        </select>
      </div>

      {/* Chart 1: Before vs After Automation */}
      <div style={{ backgroundColor: "#1A2F3F", padding: "24px", borderRadius: "8px", marginBottom: "24px", border: `1px solid ${BLUE}` }}>
        <h2 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600", color: "#fff" }}>Before vs After Automation by Task Type (Hours/Month)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={automationData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 160, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334455" />
            <XAxis type="number" stroke="#B0BEC5" />
            <YAxis dataKey="task" type="category" stroke="#B0BEC5" width={150} tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: "#0D1B2A", border: `1px solid ${BLUE}`, borderRadius: "4px", color: "#fff" }} />
            <Legend />
            <Bar dataKey="before" fill="#757575" name="Before (hrs/month)" />
            <Bar dataKey="after" fill={BLUE} name="After (hrs/month)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 2: Monthly Efficiency Gain */}
      <div style={{ backgroundColor: "#1A2F3F", padding: "24px", borderRadius: "8px", marginBottom: "24px", border: `1px solid ${BLUE}` }}>
        <h2 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600", color: "#fff" }}>Monthly Efficiency Gain (Hours Saved)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={efficiencyData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334455" />
            <XAxis dataKey="month" stroke="#B0BEC5" />
            <YAxis stroke="#B0BEC5" />
            <Tooltip contentStyle={{ backgroundColor: "#0D1B2A", border: `1px solid ${BLUE}`, borderRadius: "4px", color: "#fff" }} />
            <ReferenceLine y={38} label={{ value: "Full Automation", position: "right", fill: GOLD }} stroke={GOLD} strokeWidth={2} />
            <Line type="monotone" dataKey="hoursSaved" stroke={BLUE} strokeWidth={3} dot={{ fill: GOLD, r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 3: Automation Impact Radar */}
      <div style={{ backgroundColor: "#1A2F3F", padding: "24px", borderRadius: "8px", marginBottom: "24px", border: `1px solid ${BLUE}` }}>
        <h2 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600", color: "#fff" }}>Automation Impact by Dimension (Before vs After)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarDataBefore}>
            <PolarGrid stroke="#334455" />
            <PolarAngleAxis dataKey="dimension" stroke="#B0BEC5" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis stroke="#B0BEC5" />
            <Radar name="Before" dataKey="before" stroke="#999999" fill="#999999" fillOpacity={0.3} />
            <Radar name="After" dataKey="after" stroke={BLUE} fill={BLUE} fillOpacity={0.5} />
            <Tooltip contentStyle={{ backgroundColor: "#0D1B2A", border: `1px solid ${BLUE}`, borderRadius: "4px", color: "#fff" }} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Data Table */}
      <div style={{ backgroundColor: "#1A2F3F", padding: "24px", borderRadius: "8px", border: `1px solid ${BLUE}` }}>
        <h2 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600", color: "#fff" }}>Automation Impact by Client Vertical</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${BLUE}` }}>
                <th style={{ padding: "12px", textAlign: "left", color: GOLD, fontWeight: "600" }}>Client Vertical</th>
                <th style={{ padding: "12px", textAlign: "center", color: GOLD, fontWeight: "600" }}>Reports/Month</th>
                <th style={{ padding: "12px", textAlign: "center", color: GOLD, fontWeight: "600" }}>Before (hrs)</th>
                <th style={{ padding: "12px", textAlign: "center", color: GOLD, fontWeight: "600" }}>After (hrs)</th>
                <th style={{ padding: "12px", textAlign: "center", color: GOLD, fontWeight: "600" }}>Time Saved</th>
                <th style={{ padding: "12px", textAlign: "center", color: GOLD, fontWeight: "600" }}>Cost Saving (EGP/yr)</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: `1px solid #334455`, backgroundColor: idx % 2 === 0 ? "transparent" : "rgba(30, 136, 229, 0.05)" }}>
                  <td style={{ padding: "12px", textAlign: "left", color: "#E0E0E0" }}>{row.vertical}</td>
                  <td style={{ padding: "12px", textAlign: "center", color: "#B0BEC5" }}>{row.reports}</td>
                  <td style={{ padding: "12px", textAlign: "center", color: "#B0BEC5" }}>{row.before}</td>
                  <td style={{ padding: "12px", textAlign: "center", color: "#B0BEC5" }}>{row.after}</td>
                  <td style={{ padding: "12px", textAlign: "center", color: BLUE, fontWeight: "600" }}>{row.saved}</td>
                  <td style={{ padding: "12px", textAlign: "center", color: GOLD, fontWeight: "600" }}>EGP {row.cost}</td>
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