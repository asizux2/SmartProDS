import { useState } from "react"
import { BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts"

const NAVY = "#0D1B2A"
const BLUE = "#1E88E5"
const GOLD = "#F9A825"

export default function Dashboard() {
  const [filter, setFilter] = useState("All Governorates")

  const assetCountByGovernorateData = [
    { name: "Cairo", value: 2840 },
    { name: "Giza", value: 1920 },
    { name: "Alexandria", value: 1540 },
    { name: "Qalyubia", value: 1280 },
    { name: "Sharqia", value: 1090 },
    { name: "Gharbiya", value: 980 },
    { name: "Dakahlia", value: 870 },
    { name: "Minya", value: 780 },
    { name: "Assiut", value: 680 },
    { name: "Sohag", value: 620 }
  ]

  const inspectionCompletionData = [
    { month: "Jan", completion: 72.4 },
    { month: "Feb", completion: 75.8 },
    { month: "Mar", completion: 78.2 },
    { month: "Apr", completion: 80.1 },
    { month: "May", completion: 82.4 },
    { month: "Jun", completion: 84.7 },
    { month: "Jul", completion: 86.3 },
    { month: "Aug", completion: 87.9 },
    { month: "Sep", completion: 89.1 },
    { month: "Oct", completion: 90.2 },
    { month: "Nov", completion: 91.0 },
    { month: "Dec", completion: 91.3 }
  ]

  const assetConditionData = [
    { category: "Excellent", value: 24.3 },
    { category: "Good", value: 38.7 },
    { category: "Fair", value: 21.4 },
    { category: "Needs Repair", value: 9.8 },
    { category: "Critical", value: 3.2 },
    { category: "Under Construction", value: 2.6 }
  ]

  const districtCoverageData = [
    { district: "Maadi (Cairo)", assets: 842, coverage: 99.4, lastInspection: "2025-12-15", conditionScore: 4.8 },
    { district: "Heliopolis (Cairo)", assets: 791, coverage: 99.1, lastInspection: "2025-12-18", conditionScore: 4.7 },
    { district: "Dokki (Giza)", assets: 723, coverage: 98.8, lastInspection: "2025-12-12", conditionScore: 4.6 },
    { district: "Agouza (Giza)", assets: 698, coverage: 98.7, lastInspection: "2025-12-10", conditionScore: 4.6 },
    { district: "Cleopatra (Alex)", assets: 672, coverage: 98.4, lastInspection: "2025-12-08", conditionScore: 4.5 },
    { district: "Manshiyya (Alex)", assets: 648, coverage: 98.2, lastInspection: "2025-12-05", conditionScore: 4.5 },
    { district: "Shubra (Cairo)", assets: 634, coverage: 97.9, lastInspection: "2025-12-03", conditionScore: 4.4 },
    { district: "Boulaq (Cairo)", assets: 612, coverage: 97.7, lastInspection: "2025-11-28", conditionScore: 4.4 },
    { district: "Imbaba (Giza)", assets: 589, coverage: 97.4, lastInspection: "2025-11-25", conditionScore: 4.3 },
    { district: "Sidi Gaber (Alex)", assets: 567, coverage: 97.2, lastInspection: "2025-11-22", conditionScore: 4.3 }
  ]

  const filteredData = filter === "All Governorates"
    ? districtCoverageData
    : filter === "Cairo"
    ? districtCoverageData.filter(row => row.district.includes("Cairo"))
    : filter === "Giza"
    ? districtCoverageData.filter(row => row.district.includes("Giza"))
    : filter === "Alexandria"
    ? districtCoverageData.filter(row => row.district.includes("Alex"))
    : districtCoverageData

  return (
    <div style={{ backgroundColor: NAVY, color: "#fff", fontFamily: "'Segoe UI', sans-serif", padding: "24px", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "700", margin: "0 0 8px 0", color: "#fff" }}>
          SmartProDS Portfolio — Penta-B GIS Solutions
        </h1>
        <p style={{ fontSize: "14px", color: "#B0BEC5", margin: "0" }}>
          Data Analyst: Eslam Khaled | Spatial Data Management & Municipal Asset Mapping
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
          <strong style={{ color: GOLD }}>Proof Point:</strong> Mapped 12,847 education assets across Egypt's governorates for the World Bank / Ministry of Education — the same spatial data management and GIS dashboard methodology powers Penta-B's municipal client solutions.
        </p>
      </div>

      {/* KPI Tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        <div style={{ backgroundColor: "#1a2d3d", borderRadius: "8px", padding: "20px", borderLeft: `4px solid ${BLUE}` }}>
          <p style={{ fontSize: "12px", color: "#B0BEC5", margin: "0 0 8px 0", textTransform: "uppercase" }}>Assets Mapped</p>
          <p style={{ fontSize: "28px", fontWeight: "700", color: "#fff", margin: "0" }}>12,847</p>
        </div>
        <div style={{ backgroundColor: "#1a2d3d", borderRadius: "8px", padding: "20px", borderLeft: `4px solid ${GOLD}` }}>
          <p style={{ fontSize: "12px", color: "#B0BEC5", margin: "0 0 8px 0", textTransform: "uppercase" }}>Spatial Accuracy</p>
          <p style={{ fontSize: "28px", fontWeight: "700", color: "#fff", margin: "0" }}>99.1%</p>
        </div>
        <div style={{ backgroundColor: "#1a2d3d", borderRadius: "8px", padding: "20px", borderLeft: `4px solid ${BLUE}` }}>
          <p style={{ fontSize: "12px", color: "#B0BEC5", margin: "0 0 8px 0", textTransform: "uppercase" }}>Coverage Area</p>
          <p style={{ fontSize: "28px", fontWeight: "700", color: "#fff", margin: "0" }}>1,240 km²</p>
        </div>
        <div style={{ backgroundColor: "#1a2d3d", borderRadius: "8px", padding: "20px", borderLeft: `4px solid ${GOLD}` }}>
          <p style={{ fontSize: "12px", color: "#B0BEC5", margin: "0 0 8px 0", textTransform: "uppercase" }}>Inspection Compliance</p>
          <p style={{ fontSize: "28px", fontWeight: "700", color: "#fff", margin: "0" }}>91.3%</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
        {/* Chart 1: Asset Count by Governorate (Horizontal Bar) */}
        <div style={{ backgroundColor: "#1a2d3d", borderRadius: "8px", padding: "20px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 16px 0", color: "#fff" }}>
            Asset Count by Governorate
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={assetCountByGovernorateData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3f50" />
              <XAxis type="number" stroke="#B0BEC5" />
              <YAxis dataKey="name" type="category" stroke="#B0BEC5" width={100} style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{ backgroundColor: NAVY, border: `1px solid ${GOLD}`, borderRadius: "4px" }}
                labelStyle={{ color: "#fff" }}
              />
              <Bar dataKey="value" fill={BLUE} radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: Monthly Inspection Completion Rate */}
        <div style={{ backgroundColor: "#1a2d3d", borderRadius: "8px", padding: "20px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 16px 0", color: "#fff" }}>
            Monthly Inspection Completion Rate
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={inspectionCompletionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3f50" />
              <XAxis dataKey="month" stroke="#B0BEC5" />
              <YAxis stroke="#B0BEC5" domain={[70, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: NAVY, border: `1px solid ${GOLD}`, borderRadius: "4px" }}
                labelStyle={{ color: "#fff" }}
              />
              <Legend />
              <ReferenceLine y={95} label={{ value: "95% Target", position: "insideTopRight", offset: -10, fill: GOLD }} stroke={GOLD} strokeDasharray="4 4" />
              <Line type="monotone" dataKey="completion" stroke={BLUE} strokeWidth={2} dot={{ fill: GOLD, r: 4 }} activeDot={{ r: 6 }} name="Completion %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div style={{ backgroundColor: "#1a2d3d", borderRadius: "8px", padding: "20px", marginBottom: "32px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 16px 0", color: "#fff" }}>
          Asset Condition Assessment
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={assetConditionData}>
            <PolarGrid stroke="#2a3f50" />
            <PolarAngleAxis dataKey="category" stroke="#B0BEC5" style={{ fontSize: "12px" }} />
            <PolarRadiusAxis angle={90} domain={[0, 40]} stroke="#B0BEC5" />
            <Radar name="Percentage" dataKey="value" stroke={BLUE} fill={BLUE} fillOpacity={0.6} />
            <Tooltip
              contentStyle={{ backgroundColor: NAVY, border: `1px solid ${GOLD}`, borderRadius: "4px" }}
              labelStyle={{ color: "#fff" }}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Filter & Data Table */}
      <div style={{ backgroundColor: "#1a2d3d", borderRadius: "8px", padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0", color: "#fff" }}>
            Top 10 Districts by Asset Coverage
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
            <option>All Governorates</option>
            <option>Cairo</option>
            <option>Giza</option>
            <option>Alexandria</option>
          </select>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${BLUE}` }}>
              <th style={{ textAlign: "left", padding: "12px", color: GOLD, fontSize: "13px", fontWeight: "600" }}>District</th>
              <th style={{ textAlign: "left", padding: "12px", color: GOLD, fontSize: "13px", fontWeight: "600" }}>Assets Mapped</th>
              <th style={{ textAlign: "left", padding: "12px", color: GOLD, fontSize: "13px", fontWeight: "600" }}>Coverage %</th>
              <th style={{ textAlign: "left", padding: "12px", color: GOLD, fontSize: "13px", fontWeight: "600" }}>Last Inspection</th>
              <th style={{ textAlign: "left", padding: "12px", color: GOLD, fontSize: "13px", fontWeight: "600" }}>Condition Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: `1px solid #2a3f50`, backgroundColor: idx % 2 === 0 ? "transparent" : "rgba(30, 136, 229, 0.05)" }}>
                <td style={{ padding: "12px", color: "#fff" }}>{row.district}</td>
                <td style={{ padding: "12px", color: "#fff" }}>{row.assets.toLocaleString()}</td>
                <td style={{ padding: "12px", color: GOLD, fontWeight: "600" }}>{row.coverage}%</td>
                <td style={{ padding: "12px", color: "#fff" }}>{row.lastInspection}</td>
                <td style={{ padding: "12px", color: "#fff" }}>{row.conditionScore}/5</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{ marginTop: "32px", textAlign: "center", color: "#B0BEC5", fontSize: "12px" }}>
        <p style={{ margin: "0" }}>SmartProDS | Portfolio Dashboard | Spatial data prepared with QGIS/PostGIS/GeoServer</p>
      </div>
    </div>
  )
}
