import { useState } from "react"
import { BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts"

const NAVY = "#0D1B2A"
const BLUE = "#1E88E5"
const GOLD = "#F9A825"

export default function Dashboard() {
  const [filter, setFilter] = useState("All Areas")

  // Project Status Data
  const projectStatusData = [
    { practice: "Strategy", "On Track": 5, "At Risk": 1, Completed: 3 },
    { practice: "Operations", "On Track": 4, "At Risk": 1, Completed: 2 },
    { practice: "HR Consulting", "On Track": 3, "At Risk": 0, Completed: 4 },
    { practice: "Digital Transformation", "On Track": 4, "At Risk": 1, Completed: 2 },
    { practice: "Finance", "On Track": 3, "At Risk": 0, Completed: 3 },
    { practice: "Market Research", "On Track": 3, "At Risk": 1, Completed: 2 }
  ]

  // Monthly KPI Achievement
  const kpiData = [
    { month: "Jan", achievement: 81.4 },
    { month: "Feb", achievement: 83.2 },
    { month: "Mar", achievement: 84.7 },
    { month: "Apr", achievement: 85.9 },
    { month: "May", achievement: 87.1 },
    { month: "Jun", achievement: 88.3 },
    { month: "Jul", achievement: 89.4 },
    { month: "Aug", achievement: 90.2 },
    { month: "Sep", achievement: 91.1 },
    { month: "Oct", achievement: 92.0 },
    { month: "Nov", achievement: 92.8 },
    { month: "Dec", achievement: 93.2 }
  ]

  // Consultant Competency
  const competencyData = [
    { dimension: "Strategic Thinking", score: 84 },
    { dimension: "Data Analytics", score: 78 },
    { dimension: "Client Management", score: 91 },
    { dimension: "Project Delivery", score: 88 },
    { dimension: "Industry Knowledge", score: 82 },
    { dimension: "Communication", score: 93 }
  ]

  // Engagement Performance Table
  const engagementData = [
    { sector: "Financial Services", engagements: 6, onTime: "95.2%", avgNps: "+52", revenue: "4.8M", renewal: "92%" },
    { sector: "FMCG & Retail", engagements: 5, onTime: "93.8%", avgNps: "+47", revenue: "3.9M", renewal: "88%" },
    { sector: "Telecom", engagements: 4, onTime: "94.1%", avgNps: "+51", revenue: "3.2M", renewal: "91%" },
    { sector: "Healthcare", engagements: 4, onTime: "91.7%", avgNps: "+44", revenue: "2.8M", renewal: "84%" },
    { sector: "Government", engagements: 3, onTime: "92.3%", avgNps: "+42", revenue: "2.1M", renewal: "87%" },
    { sector: "Real Estate", engagements: 2, onTime: "89.4%", avgNps: "+39", revenue: "1.6M", renewal: "80%" }
  ]

  const practiceAreas = ["All Areas", "Strategy", "Operations", "HR Consulting", "Digital", "Finance", "Market Research"]

  return (
    <div style={{ backgroundColor: NAVY, color: "#fff", fontFamily: "'Segoe UI', sans-serif", padding: "24px", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "0 0 8px 0", fontSize: "32px", fontWeight: "700" }}>Roots MC Operations Analytics</h1>
        <p style={{ margin: 0, fontSize: "14px", color: "#B0BEC5" }}>Data Analyst: Eslam Khaled | SmartProDS</p>
      </div>

      {/* Proof Point Banner */}
      <div style={{
        backgroundColor: BLUE,
        padding: "16px 20px",
        borderRadius: "8px",
        marginBottom: "24px",
        borderLeft: `4px solid ${GOLD}`
      }}>
        <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.5" }}>
          <strong>Proof Point:</strong> Built operations analytics platforms for NIQ (Nielsen IQ) and SmartProDS tracking 47 automated deliverables — the same consulting-grade BI methodology delivers real-time engagement health for Roots MC's client portfolio.
        </p>
      </div>

      {/* KPI Tiles */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
        marginBottom: "32px"
      }}>
        <div style={{ backgroundColor: "#1A2332", padding: "20px", borderRadius: "8px", borderTop: `4px solid ${BLUE}` }}>
          <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#90A4AE", textTransform: "uppercase" }}>Active Engagements</p>
          <h3 style={{ margin: 0, fontSize: "32px", fontWeight: "700" }}>24</h3>
        </div>
        <div style={{ backgroundColor: "#1A2332", padding: "20px", borderRadius: "8px", borderTop: `4px solid ${GOLD}` }}>
          <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#90A4AE", textTransform: "uppercase" }}>On-Time Delivery</p>
          <h3 style={{ margin: 0, fontSize: "32px", fontWeight: "700" }}>93.2%</h3>
        </div>
        <div style={{ backgroundColor: "#1A2332", padding: "20px", borderRadius: "8px", borderTop: `4px solid #4CAF50` }}>
          <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#90A4AE", textTransform: "uppercase" }}>Client NPS</p>
          <h3 style={{ margin: 0, fontSize: "32px", fontWeight: "700" }}>+48</h3>
        </div>
        <div style={{ backgroundColor: "#1A2332", padding: "20px", borderRadius: "8px", borderTop: `4px solid ${BLUE}` }}>
          <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#90A4AE", textTransform: "uppercase" }}>Billable Utilization</p>
          <h3 style={{ margin: 0, fontSize: "32px", fontWeight: "700" }}>87%</h3>
        </div>
      </div>

      {/* Filter */}
      <div style={{ marginBottom: "24px" }}>
        <label style={{ fontSize: "13px", marginRight: "12px", color: "#B0BEC5", textTransform: "uppercase" }}>
          Filter by Practice Area:
        </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "4px",
            border: `1px solid ${BLUE}`,
            backgroundColor: "#1A2332",
            color: "#fff",
            fontSize: "14px",
            cursor: "pointer"
          }}
        >
          {practiceAreas.map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
      </div>

      {/* Chart 1: Project Status by Practice Area */}
      <div style={{
        backgroundColor: "#1A2332",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "24px"
      }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600" }}>Project Status by Practice Area</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={projectStatusData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#34495E" />
            <XAxis dataKey="practice" stroke="#90A4AE" style={{ fontSize: "12px" }} />
            <YAxis stroke="#90A4AE" style={{ fontSize: "12px" }} />
            <Tooltip contentStyle={{ backgroundColor: "#0D1B2A", border: `1px solid ${BLUE}`, borderRadius: "4px" }} />
            <Legend />
            <Bar dataKey="On Track" fill={BLUE} />
            <Bar dataKey="At Risk" fill={GOLD} />
            <Bar dataKey="Completed" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 2: Monthly KPI Achievement Rate */}
      <div style={{
        backgroundColor: "#1A2332",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "24px"
      }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600" }}>Monthly KPI Achievement Rate</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={kpiData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#34495E" />
            <XAxis dataKey="month" stroke="#90A4AE" style={{ fontSize: "12px" }} />
            <YAxis stroke="#90A4AE" style={{ fontSize: "12px" }} />
            <Tooltip contentStyle={{ backgroundColor: "#0D1B2A", border: `1px solid ${BLUE}`, borderRadius: "4px" }} />
            <ReferenceLine y={95} label={{ value: "95% Target", position: "right", fill: GOLD }} stroke={GOLD} strokeDasharray="4 4" />
            <Line type="monotone" dataKey="achievement" stroke={BLUE} dot={{ fill: BLUE }} strokeWidth={2} name="Achievement %" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 3: Consultant Competency Assessment */}
      <div style={{
        backgroundColor: "#1A2332",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "24px"
      }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600" }}>Consultant Competency Assessment</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={competencyData}>
            <PolarGrid stroke="#34495E" />
            <PolarAngleAxis dataKey="dimension" stroke="#90A4AE" style={{ fontSize: "12px" }} />
            <Radar name="Avg Team Score" dataKey="score" stroke={BLUE} fill={BLUE} fillOpacity={0.6} />
            <Tooltip contentStyle={{ backgroundColor: "#0D1B2A", border: `1px solid ${BLUE}`, borderRadius: "4px" }} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Data Table: Engagement Performance by Client Sector */}
      <div style={{
        backgroundColor: "#1A2332",
        padding: "20px",
        borderRadius: "8px"
      }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600" }}>Engagement Performance by Client Sector</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "13px"
          }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${BLUE}` }}>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: GOLD }}>Sector</th>
                <th style={{ padding: "12px", textAlign: "center", fontWeight: "600", color: GOLD }}>Engagements</th>
                <th style={{ padding: "12px", textAlign: "center", fontWeight: "600", color: GOLD }}>On-Time %</th>
                <th style={{ padding: "12px", textAlign: "center", fontWeight: "600", color: GOLD }}>Avg NPS</th>
                <th style={{ padding: "12px", textAlign: "center", fontWeight: "600", color: GOLD }}>Revenue (EGP M)</th>
                <th style={{ padding: "12px", textAlign: "center", fontWeight: "600", color: GOLD }}>Renewal Rate</th>
              </tr>
            </thead>
            <tbody>
              {engagementData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: `1px solid #34495E`, backgroundColor: idx % 2 === 0 ? "#0D1B2A" : "transparent" }}>
                  <td style={{ padding: "12px", textAlign: "left" }}>{row.sector}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{row.engagements}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{row.onTime}</td>
                  <td style={{ padding: "12px", textAlign: "center", color: "#4CAF50", fontWeight: "600" }}>{row.avgNps}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{row.revenue}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{row.renewal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}