import { useState } from "react"
import { BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts"

const NAVY = "#0D1B2A"
const BLUE = "#1E88E5"
const GOLD = "#F9A825"
const WHITE = "#FFFFFF"
const LIGHT = "#E3F2FD"

// NPS by Bank (Grouped by Quarter)
const npsBankData = [
  { bank: "ADIB", "Q2 2025": 47, "Q3 2025": 51, "Q4 2025": 54 },
  { bank: "Emirates Islamic", "Q2 2025": 44, "Q3 2025": 48, "Q4 2025": 51 },
  { bank: "RAK Bank", "Q2 2025": 39, "Q3 2025": 43, "Q4 2025": 46 }
]

// CSAT Trend by Bank
const csatTrendData = [
  { quarter: "Q1", ADIB: 87.1, "Emirates Islamic": 88.3, "RAK Bank": 83.2 },
  { quarter: "Q2", ADIB: 88.4, "Emirates Islamic": 89.1, "RAK Bank": 84.7 },
  { quarter: "Q3", ADIB: 90.2, "Emirates Islamic": 90.6, "RAK Bank": 86.1 },
  { quarter: "Q4", ADIB: 91.8, "Emirates Islamic": 91.3, "RAK Bank": 87.4 }
]

// Product Satisfaction Scores
const productData = [
  { product: "Personal Finance", value: 88 },
  { product: "Home Finance", value: 86 },
  { product: "Auto Finance", value: 84 },
  { product: "Business Banking", value: 82 },
  { product: "Mobile App", value: 91 },
  { product: "Branch Service", value: 79 }
]

// Department-Level Satisfaction Scores
const departmentData = [
  { department: "Retail Banking", adib: 92, emirates: 90, rak: 87, avg: 89.7 },
  { department: "Digital Banking", adib: 95, emirates: 93, rak: 91, avg: 93.0 },
  { department: "Wealth Mgmt", adib: 89, emirates: 87, rak: 84, avg: 86.7 },
  { department: "SME Banking", adib: 86, emirates: 85, rak: 82, avg: 84.3 },
  { department: "Call Center", adib: 84, emirates: 83, rak: 80, avg: 82.3 }
]

export default function Dashboard() {
  const [filter, setFilter] = useState("All Banks")

  // Filter data based on selected bank
  const getFilteredBankData = () => {
    if (filter === "All Banks") return npsBankData
    if (filter === "ADIB") return npsBankData.map(d => ({ bank: d.bank, ADIB: d.bank === "ADIB" ? d["Q4 2025"] : null })).filter(d => d.ADIB)
    if (filter === "Emirates Islamic") return npsBankData.map(d => ({ bank: d.bank, "Emirates Islamic": d.bank === "Emirates Islamic" ? d["Q4 2025"] : null })).filter(d => d["Emirates Islamic"])
    if (filter === "RAK Bank") return npsBankData.map(d => ({ bank: d.bank, "RAK Bank": d.bank === "RAK Bank" ? d["Q4 2025"] : null })).filter(d => d["RAK Bank"])
    return npsBankData
  }

  return (
    <div style={{ backgroundColor: NAVY, color: WHITE, fontFamily: "'Segoe UI', sans-serif", padding: "24px", minHeight: "100vh" }}>
      {/* Header: SmartProDS Logo + Company Name */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold", margin: "0 0 8px 0" }}>SmartProDS</h1>
        <p style={{ fontSize: "18px", color: LIGHT, margin: "0", fontWeight: "500" }}>DICETEK Portfolio — BFSI NPS & Multi-Bank CSAT</p>
      </div>

      {/* Proof Point Banner */}
      <div style={{ backgroundColor: GOLD, color: NAVY, padding: "16px 20px", borderRadius: "8px", marginBottom: "24px", fontWeight: "600", fontSize: "14px" }}>
        ✓ Designed NPS & CSAT Power BI dashboards for QNB Egypt, Bank Misr, and Alex Bank — multilingual BI expertise directly transferable to DICETEK's ADIB, Emirates Islamic, and RAK Bank engagements.
      </div>

      {/* KPI Tiles Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        <div style={{ backgroundColor: BLUE, padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
          <p style={{ margin: "0 0 8px 0", fontSize: "12px", opacity: "0.9", textTransform: "uppercase" }}>ADIB NPS</p>
          <p style={{ margin: "0", fontSize: "36px", fontWeight: "bold" }}>+54</p>
        </div>
        <div style={{ backgroundColor: BLUE, padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
          <p style={{ margin: "0 0 8px 0", fontSize: "12px", opacity: "0.9", textTransform: "uppercase" }}>Emirates Islamic CSAT</p>
          <p style={{ margin: "0", fontSize: "36px", fontWeight: "bold" }}>91.3%</p>
        </div>
        <div style={{ backgroundColor: BLUE, padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
          <p style={{ margin: "0 0 8px 0", fontSize: "12px", opacity: "0.9", textTransform: "uppercase" }}>RAK Bank App Rating</p>
          <p style={{ margin: "0", fontSize: "36px", fontWeight: "bold" }}>4.6</p>
          <p style={{ margin: "0", fontSize: "12px", opacity: "0.9" }}>/ 5</p>
        </div>
        <div style={{ backgroundColor: BLUE, padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
          <p style={{ margin: "0 0 8px 0", fontSize: "12px", opacity: "0.9", textTransform: "uppercase" }}>Arabic Dashboard Adoption</p>
          <p style={{ margin: "0", fontSize: "36px", fontWeight: "bold" }}>78%</p>
        </div>
      </div>

      {/* Filter Row */}
      <div style={{ marginBottom: "24px" }}>
        <label style={{ fontSize: "14px", fontWeight: "600", marginRight: "12px", display: "inline-block" }}>Filter by Bank:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "8px 12px",
            backgroundColor: BLUE,
            color: WHITE,
            border: "none",
            borderRadius: "4px",
            fontSize: "14px",
            cursor: "pointer"
          }}
        >
          <option>All Banks</option>
          <option>ADIB</option>
          <option>Emirates Islamic</option>
          <option>RAK Bank</option>
        </select>
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", gap: "24px", marginBottom: "32px" }}>
        {/* Chart 1: NPS by Bank (Grouped) */}
        <div style={{ backgroundColor: "#1A2332", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600" }}>NPS by Bank (Q2-Q4 2025)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={npsBankData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334455" />
              <XAxis dataKey="bank" stroke={WHITE} />
              <YAxis stroke={WHITE} />
              <Tooltip contentStyle={{ backgroundColor: NAVY, border: `1px solid ${BLUE}`, color: WHITE }} />
              <Legend />
              <Bar dataKey="Q2 2025" fill="#90CAF9" />
              <Bar dataKey="Q3 2025" fill={BLUE} />
              <Bar dataKey="Q4 2025" fill={GOLD} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: CSAT Trend by Bank */}
        <div style={{ backgroundColor: "#1A2332", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600" }}>CSAT Trend by Bank</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={csatTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334455" />
              <XAxis dataKey="quarter" stroke={WHITE} />
              <YAxis stroke={WHITE} />
              <Tooltip contentStyle={{ backgroundColor: NAVY, border: `1px solid ${BLUE}`, color: WHITE }} />
              <Legend />
              <ReferenceLine y={90} stroke={GOLD} strokeDasharray="5 5" label={{ value: "SLA Target: 90", position: "right", fill: GOLD }} />
              <Line type="monotone" dataKey="ADIB" stroke={BLUE} strokeWidth={2} dot={{ fill: BLUE, r: 4 }} />
              <Line type="monotone" dataKey="Emirates Islamic" stroke="#90CAF9" strokeWidth={2} dot={{ fill: "#90CAF9", r: 4 }} />
              <Line type="monotone" dataKey="RAK Bank" stroke={GOLD} strokeWidth={2} dot={{ fill: GOLD, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 3: Product Satisfaction Radar */}
      <div style={{ backgroundColor: "#1A2332", padding: "20px", borderRadius: "8px", marginBottom: "32px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600" }}>Product Satisfaction Scores</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={productData}>
            <PolarGrid stroke="#334455" />
            <PolarAngleAxis dataKey="product" stroke={WHITE} />
            <PolarRadiusAxis stroke={WHITE} />
            <Radar name="Satisfaction Score" dataKey="value" stroke={BLUE} fill={BLUE} fillOpacity={0.6} />
            <Tooltip contentStyle={{ backgroundColor: NAVY, border: `1px solid ${BLUE}`, color: WHITE }} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Data Table: Department-Level Satisfaction Scores */}
      <div style={{ backgroundColor: "#1A2332", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600" }}>Department-Level Satisfaction Scores</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${BLUE}` }}>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: GOLD }}>Department</th>
                <th style={{ padding: "12px", textAlign: "center", fontSize: "13px", fontWeight: "600", color: GOLD }}>ADIB</th>
                <th style={{ padding: "12px", textAlign: "center", fontSize: "13px", fontWeight: "600", color: GOLD }}>Emirates Islamic</th>
                <th style={{ padding: "12px", textAlign: "center", fontSize: "13px", fontWeight: "600", color: GOLD }}>RAK Bank</th>
                <th style={{ padding: "12px", textAlign: "center", fontSize: "13px", fontWeight: "600", color: GOLD }}>Average</th>
              </tr>
            </thead>
            <tbody>
              {departmentData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: `1px solid #334455`, backgroundColor: idx % 2 === 0 ? "rgba(30, 136, 229, 0.05)" : "transparent" }}>
                  <td style={{ padding: "12px", fontSize: "13px", fontWeight: "500" }}>{row.department}</td>
                  <td style={{ padding: "12px", fontSize: "13px", textAlign: "center" }}>{row.adib}</td>
                  <td style={{ padding: "12px", fontSize: "13px", textAlign: "center" }}>{row.emirates}</td>
                  <td style={{ padding: "12px", fontSize: "13px", textAlign: "center" }}>{row.rak}</td>
                  <td style={{ padding: "12px", fontSize: "13px", textAlign: "center", fontWeight: "600", color: GOLD }}>{row.avg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
