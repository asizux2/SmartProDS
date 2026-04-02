import { useState } from "react"
import { BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts"

const NAVY = "#0D1B2A"
const BLUE = "#1E88E5"
const GOLD = "#F9A825"

export default function Dashboard() {
  const [filter, setFilter] = useState("All Technologies")

  // Candidate Pipeline: Before vs After
  const pipelineData = [
    { stage: "Resume Parsing", Before: 8.4, After: 0.3 },
    { stage: "Skill Matching", Before: 12.1, After: 0.8 },
    { stage: "Score Ranking", Before: 6.8, After: 0.2 },
    { stage: "Client Shortlisting", Before: 9.2, After: 0.6 },
    { stage: "Interview Scheduling", Before: 4.7, After: 0.3 }
  ]

  // Monthly Processing Efficiency
  const efficiencyData = [
    { month: "Jan", processed: 12 },
    { month: "Feb", processed: 18 },
    { month: "Mar", processed: 28 },
    { month: "Apr", processed: 42 },
    { month: "May", processed: 58 },
    { month: "Jun", processed: 74 },
    { month: "Jul", processed: 88 },
    { month: "Aug", processed: 96 },
    { month: "Sep", processed: 102 },
    { month: "Oct", processed: 106 },
    { month: "Nov", processed: 108 },
    { month: "Dec", processed: 110 }
  ]

  // Tech Skill Demand vs Supply
  const skillData = [
    { tech: "Python/ML", Demand: 95, Supply: 72 },
    { tech: "Cloud (AWS/Azure)", Demand: 92, Supply: 68 },
    { tech: "Data Engineering", Demand: 88, Supply: 61 },
    { tech: "Power BI/Tableau", Demand: 84, Supply: 74 },
    { tech: "Java/.NET", Demand: 78, Supply: 82 },
    { tech: "QA/Testing", Demand: 71, Supply: 69 }
  ]

  // Tech Stack Placement Performance
  const placementData = [
    { tech: "Python / ML / AI", placements: 28, timeToFill: "18.4 days", matchRate: "96.2%", satisfaction: "4.9/5" },
    { tech: "Cloud (AWS/Azure/GCP)", placements: 22, timeToFill: "21.3 days", matchRate: "94.7%", satisfaction: "4.8/5" },
    { tech: "Data Engineering", placements: 18, timeToFill: "23.8 days", matchRate: "93.1%", satisfaction: "4.7/5" },
    { tech: "Power BI / Tableau", placements: 12, timeToFill: "16.2 days", matchRate: "97.4%", satisfaction: "4.9/5" },
    { tech: "Java / .NET", placements: 10, timeToFill: "19.7 days", matchRate: "91.3%", satisfaction: "4.6/5" },
    { tech: "QA / Testing", placements: 8, timeToFill: "14.9 days", matchRate: "95.8%", satisfaction: "4.8/5" },
    { tech: "DevOps / Infrastructure", placements: 7, timeToFill: "22.1 days", matchRate: "92.4%", satisfaction: "4.7/5" }
  ]

  const technologies = ["All Technologies", "Python/ML", "Cloud", "Data Engineering", "Power BI", "Java", "QA"]

  return (
    <div style={{ backgroundColor: NAVY, color: "#fff", fontFamily: "'Segoe UI', sans-serif", padding: "24px", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "0 0 8px 0", fontSize: "32px", fontWeight: "700" }}>Tech Scalerz ETL & Talent Analytics</h1>
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
          <strong>Proof Point:</strong> Built ETL pipelines processing 500,000+ survey records at Vodafone Egypt — the same Python/SQL automation framework delivers AI-assisted candidate matching pipeline analytics for Tech Scalerz's talent acquisition operations.
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
          <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#90A4AE", textTransform: "uppercase" }}>Pipelines Processed</p>
          <h3 style={{ margin: 0, fontSize: "32px", fontWeight: "700" }}>84</h3>
        </div>
        <div style={{ backgroundColor: "#1A2332", padding: "20px", borderRadius: "8px", borderTop: `4px solid #4CAF50` }}>
          <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#90A4AE", textTransform: "uppercase" }}>Match Accuracy</p>
          <h3 style={{ margin: 0, fontSize: "32px", fontWeight: "700" }}>94.3%</h3>
        </div>
        <div style={{ backgroundColor: "#1A2332", padding: "20px", borderRadius: "8px", borderTop: `4px solid ${GOLD}` }}>
          <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#90A4AE", textTransform: "uppercase" }}>Processing Time Saved</p>
          <h3 style={{ margin: 0, fontSize: "32px", fontWeight: "700" }}>-68%</h3>
        </div>
        <div style={{ backgroundColor: "#1A2332", padding: "20px", borderRadius: "8px", borderTop: `4px solid ${BLUE}` }}>
          <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#90A4AE", textTransform: "uppercase" }}>Data Quality Score</p>
          <h3 style={{ margin: 0, fontSize: "32px", fontWeight: "700" }}>99.1%</h3>
        </div>
      </div>

      {/* Filter */}
      <div style={{ marginBottom: "24px" }}>
        <label style={{ fontSize: "13px", marginRight: "12px", color: "#B0BEC5", textTransform: "uppercase" }}>
          Filter by Technology:
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
          {technologies.map(tech => (
            <option key={tech} value={tech}>{tech}</option>
          ))}
        </select>
      </div>

      {/* Chart 1: Candidate Pipeline Before vs After */}
      <div style={{
        backgroundColor: "#1A2332",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "24px"
      }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600" }}>Candidate Pipeline: Before vs After Automation</h3>
        <p style={{ margin: "0 0 16px 0", fontSize: "12px", color: "#90A4AE" }}>Processing time per candidate (minutes)</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={pipelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#34495E" />
            <XAxis dataKey="stage" stroke="#90A4AE" style={{ fontSize: "12px" }} />
            <YAxis stroke="#90A4AE" style={{ fontSize: "12px" }} />
            <Tooltip contentStyle={{ backgroundColor: "#0D1B2A", border: `1px solid ${BLUE}`, borderRadius: "4px" }} />
            <Legend />
            <Bar dataKey="Before" fill="#546E7A" />
            <Bar dataKey="After" fill={BLUE} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 2: Monthly Processing Efficiency Trend */}
      <div style={{
        backgroundColor: "#1A2332",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "24px"
      }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600" }}>Monthly Processing Efficiency Trend</h3>
        <p style={{ margin: "0 0 16px 0", fontSize: "12px", color: "#90A4AE" }}>Candidates processed per hour</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={efficiencyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#34495E" />
            <XAxis dataKey="month" stroke="#90A4AE" style={{ fontSize: "12px" }} />
            <YAxis stroke="#90A4AE" style={{ fontSize: "12px" }} />
            <Tooltip contentStyle={{ backgroundColor: "#0D1B2A", border: `1px solid ${BLUE}`, borderRadius: "4px" }} />
            <ReferenceLine y={100} label={{ value: "Target", position: "right", fill: GOLD }} stroke={GOLD} strokeDasharray="4 4" />
            <Line type="monotone" dataKey="processed" stroke={BLUE} dot={{ fill: BLUE }} strokeWidth={2} name="Candidates/Hour" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 3: Tech Skill Demand vs Supply */}
      <div style={{
        backgroundColor: "#1A2332",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "24px"
      }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600" }}>Tech Skill Demand vs Supply Index</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={skillData}>
            <PolarGrid stroke="#34495E" />
            <PolarAngleAxis dataKey="tech" stroke="#90A4AE" style={{ fontSize: "12px" }} />
            <Radar name="Demand" dataKey="Demand" stroke={BLUE} fill={BLUE} fillOpacity={0.4} />
            <Radar name="Supply" dataKey="Supply" stroke={GOLD} fill={GOLD} fillOpacity={0.4} />
            <Tooltip contentStyle={{ backgroundColor: "#0D1B2A", border: `1px solid ${BLUE}`, borderRadius: "4px" }} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Data Table: Tech Stack Placement Performance */}
      <div style={{
        backgroundColor: "#1A2332",
        padding: "20px",
        borderRadius: "8px"
      }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600" }}>Tech Stack Placement Performance (2025)</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "13px"
          }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${BLUE}` }}>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: GOLD }}>Technology</th>
                <th style={{ padding: "12px", textAlign: "center", fontWeight: "600", color: GOLD }}>Placements</th>
                <th style={{ padding: "12px", textAlign: "center", fontWeight: "600", color: GOLD }}>Avg Time-to-Fill</th>
                <th style={{ padding: "12px", textAlign: "center", fontWeight: "600", color: GOLD }}>Match Rate</th>
                <th style={{ padding: "12px", textAlign: "center", fontWeight: "600", color: GOLD }}>Client Satisfaction</th>
              </tr>
            </thead>
            <tbody>
              {placementData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: `1px solid #34495E`, backgroundColor: idx % 2 === 0 ? "#0D1B2A" : "transparent" }}>
                  <td style={{ padding: "12px", textAlign: "left" }}>{row.tech}</td>
                  <td style={{ padding: "12px", textAlign: "center", fontWeight: "600", color: BLUE }}>{row.placements}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{row.timeToFill}</td>
                  <td style={{ padding: "12px", textAlign: "center", color: "#4CAF50", fontWeight: "600" }}>{row.matchRate}</td>
                  <td style={{ padding: "12px", textAlign: "center", color: GOLD, fontWeight: "600" }}>{row.satisfaction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}