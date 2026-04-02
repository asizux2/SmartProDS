import { useState } from "react"
import { BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts"

const NAVY = "#0D1B2A"
const BLUE = "#1E88E5"
const GOLD = "#F9A825"

export default function Dashboard() {
  const [filter, setFilter] = useState("All Channels")

  const channelComparisonData = [
    { quarter: "Q1 2025", "Branch NPS": 33, "onebank Digital NPS": 44, "Mobile App NPS": 41 },
    { quarter: "Q2 2025", "Branch NPS": 36, "onebank Digital NPS": 49, "Mobile App NPS": 45 },
    { quarter: "Q3 2025", "Branch NPS": 38, "onebank Digital NPS": 53, "Mobile App NPS": 50 },
    { quarter: "Q4 2025", "Branch NPS": 40, "onebank Digital NPS": 58, "Mobile App NPS": 55 }
  ]

  const trendsData = [
    { quarter: "Q1", nps: 35, csat: 84.1 },
    { quarter: "Q2", nps: 38, csat: 85.3 },
    { quarter: "Q3", nps: 40, csat: 86.7 },
    { quarter: "Q4", nps: 42, csat: 87.3 }
  ]

  const radarData = [
    { dimension: "Account Opening", score: 88 },
    { dimension: "Loan Process", score: 82 },
    { dimension: "Digital Banking", score: 91 },
    { dimension: "ATM Service", score: 86 },
    { dimension: "Branch Staff", score: 89 },
    { dimension: "Call Center", score: 80 }
  ]

  const regionalData = [
    { region: "Greater Cairo", nps: "+45", csat: "88.4%", branches: 280, wow: "+4pp" },
    { region: "Alexandria", nps: "+43", csat: "87.1%", branches: 95, wow: "+5pp" },
    { region: "Giza", nps: "+41", csat: "86.3%", branches: 72, wow: "+3pp" },
    { region: "Delta Region", nps: "+38", csat: "85.1%", branches: 142, wow: "+4pp" },
    { region: "Upper Egypt", nps: "+36", csat: "83.8%", branches: 118, wow: "+3pp" },
    { region: "Canal Zone", nps: "+39", csat: "85.7%", branches: 47, wow: "+4pp" },
    { region: "Red Sea & Sinai", nps: "+37", csat: "84.2%", branches: 46, wow: "+3pp" }
  ]

  return (
    <div style={{ backgroundColor: NAVY, color: "#fff", fontFamily: "'Segoe UI', sans-serif", padding: "24px", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "0 0 8px 0", fontSize: "32px", fontWeight: "bold" }}>Banque Misr — NPS & CSAT Dashboard</h1>
        <p style={{ margin: "0", fontSize: "14px", color: "#aaa" }}>Branch vs Digital Performance Tracking</p>
      </div>

      {/* Proof Point Banner */}
      <div style={{
        backgroundColor: BLUE,
        borderLeft: `4px solid ${GOLD}`,
        padding: "16px",
        marginBottom: "32px",
        borderRadius: "4px",
        fontSize: "14px",
        lineHeight: "1.6"
      }}>
        <strong>Proof Point:</strong> Designed and managed Banque Misr's NPS/CSAT tracking dashboard as part of a 3-bank comparative study — the same analytical framework now powers the onebank digital transformation.
      </div>

      {/* KPI Tiles */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px",
        marginBottom: "32px"
      }}>
        <div style={{
          backgroundColor: "#1a2a3a",
          border: `1px solid ${BLUE}`,
          padding: "20px",
          borderRadius: "4px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "12px", color: "#aaa", marginBottom: "8px" }}>Overall NPS</div>
          <div style={{ fontSize: "36px", fontWeight: "bold", color: GOLD }}>+42</div>
        </div>
        <div style={{
          backgroundColor: "#1a2a3a",
          border: `1px solid ${BLUE}`,
          padding: "20px",
          borderRadius: "4px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "12px", color: "#aaa", marginBottom: "8px" }}>Branch CSAT</div>
          <div style={{ fontSize: "36px", fontWeight: "bold", color: GOLD }}>87.3%</div>
        </div>
        <div style={{
          backgroundColor: "#1a2a3a",
          border: `1px solid ${BLUE}`,
          padding: "20px",
          borderRadius: "4px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "12px", color: "#aaa", marginBottom: "8px" }}>onebank Digital NPS</div>
          <div style={{ fontSize: "36px", fontWeight: "bold", color: GOLD }}>+58</div>
        </div>
        <div style={{
          backgroundColor: "#1a2a3a",
          border: `1px solid ${BLUE}`,
          padding: "20px",
          borderRadius: "4px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "12px", color: "#aaa", marginBottom: "8px" }}>Digital Adoption</div>
          <div style={{ fontSize: "36px", fontWeight: "bold", color: GOLD }}>38%</div>
        </div>
      </div>

      {/* Filter */}
      <div style={{ marginBottom: "24px" }}>
        <label style={{ fontSize: "14px", marginRight: "12px" }}>Filter by Channel:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "8px 12px",
            backgroundColor: "#1a2a3a",
            color: "#fff",
            border: `1px solid ${BLUE}`,
            borderRadius: "4px",
            fontSize: "14px",
            cursor: "pointer"
          }}
        >
          <option>All Channels</option>
          <option>Branch</option>
          <option>onebank Digital</option>
          <option>Mobile App</option>
        </select>
      </div>

      {/* Chart 1: Channel Comparison */}
      <div style={{
        backgroundColor: "#1a2a3a",
        border: `1px solid ${BLUE}`,
        padding: "20px",
        borderRadius: "4px",
        marginBottom: "32px"
      }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "bold" }}>NPS by Channel: Branch vs Digital</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={channelComparisonData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="quarter" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{ backgroundColor: "#0D1B2A", border: `1px solid ${BLUE}` }}
              labelStyle={{ color: "#fff" }}
            />
            <Legend />
            <Bar dataKey="Branch NPS" fill={BLUE} />
            <Bar dataKey="onebank Digital NPS" fill={GOLD} />
            <Bar dataKey="Mobile App NPS" fill="#50C878" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 2: Quarterly Trends */}
      <div style={{
        backgroundColor: "#1a2a3a",
        border: `1px solid ${BLUE}`,
        padding: "20px",
        borderRadius: "4px",
        marginBottom: "32px"
      }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "bold" }}>Quarterly NPS & CSAT Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendsData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="quarter" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{ backgroundColor: "#0D1B2A", border: `1px solid ${BLUE}` }}
              labelStyle={{ color: "#fff" }}
            />
            <Legend />
            <ReferenceLine y={45} stroke={GOLD} label={{ value: "2026 NPS Target", position: "right", fill: GOLD }} />
            <Line type="monotone" dataKey="nps" stroke={BLUE} dot={{ fill: BLUE }} />
            <Line type="monotone" dataKey="csat" stroke={GOLD} dot={{ fill: GOLD }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 3: Radar */}
      <div style={{
        backgroundColor: "#1a2a3a",
        border: `1px solid ${BLUE}`,
        padding: "20px",
        borderRadius: "4px",
        marginBottom: "32px"
      }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "bold" }}>Service Quality Scores (Q4 2025)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#333" />
            <PolarAngleAxis dataKey="dimension" stroke="#aaa" tick={{ fontSize: 12 }} />
            <Radar name="Score" dataKey="score" stroke={BLUE} fill={BLUE} fillOpacity={0.3} />
            <Tooltip
              contentStyle={{ backgroundColor: "#0D1B2A", border: `1px solid ${BLUE}` }}
              labelStyle={{ color: "#fff" }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Data Table */}
      <div style={{
        backgroundColor: "#1a2a3a",
        border: `1px solid ${BLUE}`,
        padding: "20px",
        borderRadius: "4px",
        marginBottom: "32px"
      }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "bold" }}>Regional Branch NPS Performance (Q4 2025)</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px"
          }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${BLUE}` }}>
                <th style={{ padding: "12px", textAlign: "left", color: GOLD }}>Region</th>
                <th style={{ padding: "12px", textAlign: "center", color: GOLD }}>NPS</th>
                <th style={{ padding: "12px", textAlign: "center", color: GOLD }}>CSAT</th>
                <th style={{ padding: "12px", textAlign: "center", color: GOLD }}># Branches</th>
                <th style={{ padding: "12px", textAlign: "center", color: GOLD }}>Wave-on-Wave</th>
              </tr>
            </thead>
            <tbody>
              {regionalData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: `1px solid #333`, backgroundColor: idx % 2 === 0 ? "#0D1B2A" : "transparent" }}>
                  <td style={{ padding: "12px", textAlign: "left" }}>{row.region}</td>
                  <td style={{ padding: "12px", textAlign: "center", color: GOLD }}>{row.nps}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{row.csat}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{row.branches}</td>
                  <td style={{ padding: "12px", textAlign: "center", color: "#50C878" }}>{row.wow}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div style={{ fontSize: "12px", color: "#666", textAlign: "center", marginTop: "24px" }}>
        SmartProDS — Data Analytics & Customer Research
      </div>
    </div>
  )
}
