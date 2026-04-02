import { useState } from "react"
import { BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts"

const NAVY = "#0D1B2A"
const BLUE = "#1E88E5"
const GOLD = "#F9A825"

export default function Dashboard() {
  const [filter, setFilter] = useState("All Channels")

  const npsChannelData = [
    { name: "Mobile App", nps: 52 },
    { name: "Web Browser", nps: 43 },
    { name: "Phone Order", nps: 31 },
    { name: "In-Store Kiosk", nps: 38 }
  ]

  const trendsData = [
    { quarter: "Q1 2025", nps: 36, csat: 87.4 },
    { quarter: "Q2 2025", nps: 39, csat: 88.9 },
    { quarter: "Q3 2025", nps: 41, csat: 90.1 },
    { quarter: "Q4 2025", nps: 43, csat: 91.2 }
  ]

  const radarData = [
    { touchpoint: "Product Quality", score: 92 },
    { touchpoint: "Shipping Speed", score: 88 },
    { touchpoint: "Fit Accuracy", score: 84 },
    { touchpoint: "Price Value", score: 94 },
    { touchpoint: "Mobile UX", score: 87 },
    { touchpoint: "Customer Support", score: 83 }
  ]

  const tableData = [
    { category: "Premium Frames", nps: "+51", csat: "93.4%", avgRating: 4.7, sampleSize: 2840 },
    { category: "Standard Frames", nps: "+44", csat: "91.2%", avgRating: 4.5, sampleSize: 8120 },
    { category: "Progressive Lenses", nps: "+39", csat: "88.7%", avgRating: 4.4, sampleSize: 3210 },
    { category: "Sun Readers", nps: "+47", csat: "92.1%", avgRating: 4.6, sampleSize: 1890 },
    { category: "Blue Light Glasses", nps: "+42", csat: "90.3%", avgRating: 4.5, sampleSize: 4320 },
    { category: "Accessories", nps: "+35", csat: "86.9%", avgRating: 4.3, sampleSize: 1540 }
  ]

  return (
    <div style={{ backgroundColor: NAVY, color: "#fff", fontFamily: "'Segoe UI', sans-serif", padding: "24px", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "0 0 8px 0", fontSize: "32px", fontWeight: "bold" }}>Zenni Optical — NPS & CSAT Dashboard</h1>
        <p style={{ margin: "0", fontSize: "14px", color: "#aaa" }}>Director of Research / Customer Analytics</p>
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
        <strong>Proof Point:</strong> Built end-to-end NPS/CSAT survey-to-dashboard pipelines processing 500K+ responses — the same methodology applies to Zenni's post-purchase experience tracking across web, mobile, and app channels.
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
          <div style={{ fontSize: "12px", color: "#aaa", marginBottom: "8px" }}>Post-Purchase NPS</div>
          <div style={{ fontSize: "36px", fontWeight: "bold", color: GOLD }}>+43</div>
        </div>
        <div style={{
          backgroundColor: "#1a2a3a",
          border: `1px solid ${BLUE}`,
          padding: "20px",
          borderRadius: "4px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "12px", color: "#aaa", marginBottom: "8px" }}>CSAT Score</div>
          <div style={{ fontSize: "36px", fontWeight: "bold", color: GOLD }}>91.2%</div>
        </div>
        <div style={{
          backgroundColor: "#1a2a3a",
          border: `1px solid ${BLUE}`,
          padding: "20px",
          borderRadius: "4px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "12px", color: "#aaa", marginBottom: "8px" }}>Return Rate</div>
          <div style={{ fontSize: "36px", fontWeight: "bold", color: GOLD }}>8.3%</div>
        </div>
        <div style={{
          backgroundColor: "#1a2a3a",
          border: `1px solid ${BLUE}`,
          padding: "20px",
          borderRadius: "4px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "12px", color: "#aaa", marginBottom: "8px" }}>Mobile Checkout Score</div>
          <div style={{ fontSize: "36px", fontWeight: "bold", color: GOLD }}>87</div>
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
          <option>Mobile App</option>
          <option>Web Browser</option>
          <option>Phone Order</option>
        </select>
      </div>

      {/* Chart 1: NPS by Order Channel */}
      <div style={{
        backgroundColor: "#1a2a3a",
        border: `1px solid ${BLUE}`,
        padding: "20px",
        borderRadius: "4px",
        marginBottom: "32px"
      }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "bold" }}>NPS by Order Channel</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={npsChannelData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{ backgroundColor: "#0D1B2A", border: `1px solid ${BLUE}` }}
              labelStyle={{ color: "#fff" }}
            />
            <Bar dataKey="nps" fill={BLUE} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 2: Trends */}
      <div style={{
        backgroundColor: "#1a2a3a",
        border: `1px solid ${BLUE}`,
        padding: "20px",
        borderRadius: "4px",
        marginBottom: "32px"
      }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "bold" }}>Customer Satisfaction Trend (Quarterly)</h3>
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
            <ReferenceLine y={45} stroke={GOLD} label={{ value: "NPS Target", position: "right", fill: GOLD }} />
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
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "bold" }}>CSAT by Touchpoint</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#333" />
            <PolarAngleAxis dataKey="touchpoint" stroke="#aaa" tick={{ fontSize: 12 }} />
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
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "bold" }}>Product Category Satisfaction (Q4 2025)</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px"
          }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${BLUE}` }}>
                <th style={{ padding: "12px", textAlign: "left", color: GOLD }}>Category</th>
                <th style={{ padding: "12px", textAlign: "center", color: GOLD }}>NPS</th>
                <th style={{ padding: "12px", textAlign: "center", color: GOLD }}>CSAT</th>
                <th style={{ padding: "12px", textAlign: "center", color: GOLD }}>Avg Rating</th>
                <th style={{ padding: "12px", textAlign: "center", color: GOLD }}>Sample Size</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: `1px solid #333`, backgroundColor: idx % 2 === 0 ? "#0D1B2A" : "transparent" }}>
                  <td style={{ padding: "12px", textAlign: "left" }}>{row.category}</td>
                  <td style={{ padding: "12px", textAlign: "center", color: GOLD }}>{row.nps}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{row.csat}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{row.avgRating}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{row.sampleSize.toLocaleString()}</td>
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
