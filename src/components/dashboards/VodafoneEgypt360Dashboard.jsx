/**
 * Vodafone Egypt 360° Intelligence Dashboard
 * Research Data + Web Search Results
 * Generated: 2026-04-20
 * Theme: SmartProDS Brand
 */

import { useState } from 'react'
import { AreaChart, Area, ComposedChart, BarChart, Bar, LineChart, Line, 
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts'

const NAVY = '#0D1B2A'
const CARD = '#0f1825'
const BLUE = '#1E88E5'
const GOLD = '#F9A825'
const GREEN = '#22C55E'
const ORANGE = '#EF5F17'
const PURPLE = '#A855F7'
const TEAL = '#14B8A6'
const RED = '#EF4444'
const COLORS = [BLUE, GREEN, GOLD, ORANGE, PURPLE, TEAL, RED]

const VodafoneLogo = () => (
  <svg viewBox="0 0 48 48" width="36" height="36">
    <circle cx="24" cy="24" r="22" fill="#E60000"/>
    <path d="M18 14h4v20h-4zM26 14h4v20h-4z" fill="#fff"/>
  </svg>
)

const SectionHeader = ({ children }) => (
  <div style={{ color: '#888', fontSize: '11px', marginBottom: '12px', fontFamily: 'monospace' }}>
    // {children}
  </div>
)

const Card = ({ children, title, style = {} }) => (
  <div style={{ background: CARD, border: '1px solid #1E3A5F', borderRadius: '10px', padding: '16px', ...style }}>
    {title && <div style={{ color: '#888', fontSize: '11px', marginBottom: '12px', fontFamily: 'monospace' }}>// {title}</div>}
    {children}
  </div>
)

const KPITile = ({ label, value, sub, color = BLUE }) => (
  <div style={{ background: '#111', border: `1px solid ${color}22`, borderLeft: `3px solid ${color}`, borderRadius: '8px', padding: '14px' }}>
    <div style={{ color: '#aaa', fontSize: '11px', marginBottom: '4px' }}>{label}</div>
    <div style={{ color, fontSize: '22px', fontWeight: 700 }}>{value}</div>
    <div style={{ color: '#666', fontSize: '11px' }}>{sub}</div>
  </div>
)

const TooltipCustom = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: NAVY, border: '1px solid #333', padding: '10px', borderRadius: '4px' }}>
        <p style={{ color: '#fff', margin: 0, fontWeight: 600 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, margin: '4px 0', fontSize: '12px' }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

// DATA FROM RESEARCH
const kpiData = [
  { label: 'Revenue 2025', value: 'EGP 55B', sub: '+46% YoY', color: RED },
  { label: 'Subscribers', value: '53M', sub: '#1 Egypt', color: PURPLE },
  { label: 'Market Share', value: '34%', sub: 'Mobile leader', color: BLUE },
  { label: 'Vodafone Cash', value: '11M+', sub: '55% wallet share', color: GREEN },
  { label: 'ARPU', value: 'EGP 159', sub: 'Monthly', color: GOLD },
  { label: 'CapEx 2025', value: 'EGP 7.5B', sub: 'Network upgrades', color: TEAL },
]

const revenueGrowth = [
  { year: '2022', revenue: 27, subscribers: 44 },
  { year: '2023', revenue: 34, subscribers: 47 },
  { year: '2024', revenue: 42, subscribers: 50 },
  { year: '2025', revenue: 55, subscribers: 53 },
]

const marketShare = [
  { name: 'Vodafone', share: 34, fill: RED },
  { name: 'Etisalat', share: 24, fill: GOLD },
  { name: 'Orange', share: 20, fill: ORANGE },
  { name: 'Telecom Egypt', share: 22, fill: BLUE },
]

const serviceRevenues = [
  { name: 'Mobile Voice', value: 28 },
  { name: 'Mobile Data', value: 45 },
  { name: 'Fixed Broadband', value: 15 },
  { name: 'Vodafone Cash', value: 8 },
  { name: 'Enterprise', value: 4 },
]

const subscriberMix = [
  { name: 'Prepaid', value: 78, fill: BLUE },
  { name: 'Postpaid', value: 22, fill: GREEN },
]

const dataPenetration = [
  { year: '2022', g4: 72, g5: 2 },
  { year: '2023', g4: 78, g5: 8 },
  { year: '2024', g4: 85, g5: 15 },
  { year: '2025', g4: 88, g5: 25 },
]

const financialServices = [
  { name: 'Vodafone Cash', users: 11.4, revenue: '8.4%', growth: '+18.8%' },
  { name: 'Insurance', users: 2.1, revenue: '1.2%', growth: '+12%' },
  { name: 'Remittances', users: 3.2, revenue: '2.1%', growth: '+36.7%' },
]

const networkMetrics = [
  { metric: '4G Coverage', value: '98%', fill: GREEN },
  { metric: '5G Coverage', value: '45%', fill: BLUE },
  { metric: 'Download Speed', value: '45 Mbps', fill: PURPLE },
  { metric: 'Upload Speed', value: '15 Mbps', fill: GOLD },
]

const competitors = [
  { name: 'Vodafone Egypt', subscribers: 53, share: 34, arpu: 159 },
  { name: 'Etisalat Egypt', subscribers: 35, share: 24, arpu: 145 },
  { name: 'Orange Egypt', subscribers: 30, share: 20, arpu: 138 },
  { name: 'Telecom Egypt', subscribers: 35, share: 22, arpu: 95 },
]

const swotData = {
  strengths: [
    { item: 'Market Leader (34% share)', impact: 'Positive' },
    { item: '53M Subscribers', impact: 'Positive' },
    { item: 'Vodafone Cash 55% wallet share', impact: 'Positive' },
    { item: 'Strong 4G Network', impact: 'Positive' },
    { item: 'Brand Recognition', impact: 'Positive' },
    { item: 'Financial Services Growth', impact: 'Positive' },
  ],
  weaknesses: [
    { item: 'High Debt Load', impact: 'Negative' },
    { item: 'Price Competition', impact: 'Negative' },
    { item: 'ARPU Decline', impact: 'Negative' },
    { item: 'Regulatory Costs', impact: 'Negative' },
  ],
  opportunities: [
    { item: '5G Expansion', impact: 'Positive' },
    { item: 'Digital Finance Growth', impact: 'Positive' },
    { item: 'Enterprise SME Push', impact: 'Positive' },
    { item: 'Fiber Broadband', impact: 'Positive' },
    { item: 'IoT Services', impact: 'Positive' },
  ],
  risks: [
    { item: 'ETI/Orange Competition', impact: 'Negative' },
    { item: 'Economic Volatility', impact: 'Negative' },
    { item: 'Currency Risk', impact: 'Negative' },
    { item: 'Regulatory Changes', impact: 'Negative' },
  ],
}

const regionPerformance = [
  { region: 'Cairo/Alex', gmv: 45, subs: 42 },
  { region: 'Delta', gmv: 25, subs: 28 },
  { region: 'Upper Egypt', gmv: 18, subs: 18 },
  { region: 'Canal', gmv: 12, subs: 12 },
]

const enterpriseData = [
  { name: 'V-Hub Users', value: '500K+', growth: '+45%' },
  { name: 'SME Digital Store', value: '150+', growth: 'Solutions' },
  { name: 'Business Summit', value: '300+', growth: 'Leaders' },
  { name: 'IoT Connections', value: '230M', growth: 'Global' },
]

const fiveGData = [
  { year: 'Q2 2025', sites: 2000, coverage: '2K areas' },
  { year: 'Q4 2025', sites: 3500, coverage: '3K areas' },
  { year: '2026 Target', sites: 5000, coverage: '5K areas' },
]

const customerMetrics = [
  { metric: 'NPS Score', value: 10, benchmark: 'Industry avg: 15' },
  { metric: 'CSAT', value: 80, benchmark: 'Mobile service' },
  { metric: 'Fixed Internet', value: 78, benchmark: 'Fixed service' },
  { metric: 'Customer Service', value: 80, benchmark: 'CSAT rating' },
]

const iotProjects = [
  { name: 'GEM Smart Museum', type: 'Cultural', devices: '19 systems', status: 'Live' },
  { name: 'Smart Parking', type: 'Urban', devices: '500+', status: 'Planning' },
  { name: 'Fleet Management', type: 'Logistics', devices: '1000+', status: 'Live' },
  { name: 'Smart Metering', type: 'Utilities', devices: '50K+', status: 'Pilot' },
]

export default function VodafoneEgypt360Dashboard() {
  const [tab, setTab] = useState(1)

  const tabs = [
    { id: 1, name: 'Executive Summary' },
    { id: 2, name: 'Financial Performance' },
    { id: 3, name: 'Market Analysis' },
    { id: 4, name: 'Network & Technology' },
    { id: 5, name: 'Financial Services' },
    { id: 6, name: 'Enterprise & SME' },
    { id: 7, name: '5G Expansion' },
    { id: 8, name: 'Customer Experience' },
    { id: 9, name: 'IoT & Smart Cities' },
    { id: 10, name: 'Competitive Position' },
    { id: 11, name: 'Regional Performance' },
    { id: 12, name: 'SWOT Analysis' },
  ]

  const renderExecutive = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <VodafoneLogo />
          <div>
            <div style={{ fontSize: '20px', fontWeight: 700 }}>
              <span style={{ color: GOLD }}>SmartProDS</span>
              <span style={{ color: '#666', marginLeft: '8px' }}>×</span>
              <span style={{ color: RED, marginLeft: '8px' }}>Vodafone Egypt</span>
            </div>
            <div style={{ color: '#888', fontSize: '12px' }}>360° Intelligence Dashboard</div>
          </div>
        </div>
        <div style={{ color: '#666', fontSize: '11px' }}>Research: Web Data | Data: April 2026</div>
      </div>

      <div style={{ background: GOLD, color: NAVY, borderRadius: '8px', padding: '12px 16px', fontWeight: 600, fontSize: '13px' }}>
        ⚡ PB-01: Vodafone Egypt 360° — From 53M subscribers to 5G expansion, this framework applies to any MENA telecom operator.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
        {kpiData.map((k, i) => (
          <KPITile key={i} label={k.label} value={k.value} sub={k.sub} color={k.color} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Card title="REVENUE GROWTH (EGP Billion)">
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={revenueGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="year" stroke="#888" fontSize={11} />
              <YAxis stroke="#888" fontSize={11} />
              <Tooltip content={<TooltipCustom />} />
              <Legend />
              <Bar dataKey="revenue" name="Revenue (EGP B)" fill={RED} />
              <Line type="monotone" dataKey="subscribers" name="Subscribers (M)" stroke={BLUE} strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        <Card title="SERVICE REVENUE MIX">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={serviceRevenues} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90} label={({ name, value }) => `${name}: ${value}%`}>
                {serviceRevenues.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<TooltipCustom />} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )

  const renderFinancial = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <SectionHeader>FINANCIAL PERFORMANCE</SectionHeader>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <KPITile label="Revenue 2025" value="EGP 55B" sub="+46% YoY" color={RED} />
        <KPITile label="H1 2025" value="EGP 55B" sub="Record half-year" color={RED} />
        <KPITile label="CapEx Investment" value="EGP 7.5B" sub="Network upgrade" color={TEAL} />
      </div>

      <Card title="ANNUAL REVENUE TRAJECTORY">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={revenueGrowth}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="year" stroke="#888" fontSize={11} />
            <YAxis stroke="#888" fontSize={11} />
            <Tooltip content={<TooltipCustom />} />
            <Area type="monotone" dataKey="revenue" name="Revenue (EGP B)" stroke={RED} fill={RED} fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Card title="SUBSCRIBER BASE (Millions)">
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '48px', fontWeight: 700, color: PURPLE }}>53M</div>
            <div style={{ color: '#888' }}>Total Subscribers</div>
            <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', background: '#111', borderRadius: '6px' }}>
                <div style={{ color: '#888', fontSize: '10px' }}>Prepaid</div>
                <div style={{ fontSize: '20px', color: BLUE }}>78%</div>
              </div>
              <div style={{ padding: '12px', background: '#111', borderRadius: '6px' }}>
                <div style={{ color: '#888', fontSize: '10px' }}>Postpaid</div>
                <div style={{ fontSize: '20px', color: GREEN }}>22%</div>
              </div>
            </div>
          </div>
        </Card>

        <Card title="ARPU TREND (EGP/month)">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={[
              { month: 'Q1', arpu: 155 },
              { month: 'Q2', arpu: 158 },
              { month: 'Q3', arpu: 156 },
              { month: 'Q4', arpu: 159 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#888" fontSize={11} />
              <YAxis stroke="#888" fontSize={11} />
              <Tooltip content={<TooltipCustom />} />
              <Line type="monotone" dataKey="arpu" name="ARPU" stroke={GOLD} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )

  const renderMarket = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <SectionHeader>MARKET ANALYSIS</SectionHeader>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Card title="MOBILE MARKET SHARE">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={marketShare} dataKey="share" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, share }) => `${name}: ${share}%`}>
                {marketShare.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<TooltipCustom />} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="COMPETITOR BENCHMARK">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={competitors} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis type="number" stroke="#888" fontSize={11} />
              <YAxis dataKey="name" type="category" stroke="#888" fontSize={10} width={100} />
              <Tooltip content={<TooltipCustom />} />
              <Bar dataKey="subscribers" name="Subscribers (M)" fill={PURPLE} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="EGYPT TELECOM MARKET SIZE">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', textAlign: 'center' }}>
          <div style={{ padding: '16px', background: '#111', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: BLUE }}>$3.23B</div>
            <div style={{ color: '#888', fontSize: '12px' }}>2025 Market</div>
          </div>
          <div style={{ padding: '16px', background: '#111', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: BLUE }}>$3.33B</div>
            <div style={{ color: '#888', fontSize: '12px' }}>2026 Market</div>
          </div>
          <div style={{ padding: '16px', background: '#111', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: GREEN }}>9.4%</div>
            <div style={{ color: '#888', fontSize: '12px' }}>CAGR 2026-32</div>
          </div>
          <div style={{ padding: '16px', background: '#111', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: GOLD }}>$12.8B</div>
            <div style={{ color: '#888', fontSize: '12px' }}>2032 Forecast</div>
          </div>
        </div>
      </Card>
    </div>
  )

  const renderNetwork = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <SectionHeader>NETWORK & TECHNOLOGY</SectionHeader>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Card title="NETWORK METRICS">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={networkMetrics} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis type="number" stroke="#888" fontSize={11} domain={[0, 100]} />
              <YAxis dataKey="metric" type="category" stroke="#888" fontSize={10} width={100} />
              <Tooltip content={<TooltipCustom />} />
              <Bar dataKey="value" name="Value" fill={BLUE} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="NETWORK COVERAGE TREND">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={dataPenetration}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="year" stroke="#888" fontSize={11} />
              <YAxis stroke="#888" fontSize={11} />
              <Tooltip content={<TooltipCustom />} />
              <Area type="monotone" dataKey="g4" name="4G %" stroke={GREEN} fill={GREEN} fillOpacity={0.3} />
              <Area type="monotone" dataKey="g5" name="5G %" stroke={BLUE} fill={BLUE} fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="TECHNOLOGY SPLIT">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div style={{ padding: '16px', background: '#111', borderRadius: '8px', borderLeft: `3px solid ${GREEN}` }}>
            <div style={{ fontSize: '12px', color: '#888' }}>4G Coverage</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: GREEN }}>98%</div>
          </div>
          <div style={{ padding: '16px', background: '#111', borderRadius: '8px', borderLeft: `3px solid ${BLUE}` }}>
            <div style={{ fontSize: '12px', color: '#888' }}>5G Coverage</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: BLUE }}>45%</div>
          </div>
          <div style={{ padding: '16px', background: '#111', borderRadius: '8px', borderLeft: `3px solid ${GOLD}` }}>
            <div style={{ fontSize: '12px', color: '#888' }}>Download Speed</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: GOLD }}>45 Mbps</div>
          </div>
        </div>
      </Card>
    </div>
  )

  const renderFinancialServices = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <SectionHeader>FINANCIAL SERVICES (Vodafone Cash)</SectionHeader>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <KPITile label="Vodafone Cash Users" value="11.4M" sub="+36.7% YoY" color={GREEN} />
        <KPITile label="Mobile Wallet Share" value="55%" sub="#1 in Egypt" color={GREEN} />
        <KPITile label="Revenue Contribution" value="8.4%" sub="of service" color={GREEN} />
      </div>

      <Card title="FINTECH PRODUCTS">
        <div style={{ display: 'grid', gap: '12px' }}>
          {financialServices.map((f, i) => (
            <div key={i} style={{ padding: '12px', background: '#111', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{f.name}</div>
                <div style={{ color: '#888', fontSize: '12px' }}>{f.users}M users</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: f.color || BLUE, fontWeight: 600 }}>{f.revenue}</div>
                <div style={{ color: GREEN, fontSize: '11px' }}>{f.growth}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="FINTECH REVENUE GROWTH">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={[
            { year: '2022', rev: 2.1 },
            { year: '2023', rev: 4.8 },
            { year: '2024', rev: 6.2 },
            { year: '2025', rev: 8.4 },
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="year" stroke="#888" fontSize={11} />
            <YAxis stroke="#888" fontSize={11} />
            <Tooltip content={<TooltipCustom />} />
            <Area type="monotone" dataKey="rev" name="% of Revenue" stroke={GREEN} fill={GREEN} fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )

  const renderCompetitive = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <SectionHeader>COMPETITIVE POSITION</SectionHeader>
      
      <Card title="COMPETITOR COMPARISON TABLE">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #333' }}>
              <th style={{ textAlign: 'left', padding: '8px', color: '#888' }}>Operator</th>
              <th style={{ textAlign: 'right', padding: '8px', color: '#888' }}>Subs (M)</th>
              <th style={{ textAlign: 'right', padding: '8px', color: '#888' }}>Share</th>
              <th style={{ textAlign: 'right', padding: '8px', color: '#888' }}>ARPU</th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((c, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #222' }}>
                <td style={{ padding: '8px', fontWeight: 600, color: c.fill }}>{c.name}</td>
                <td style={{ textAlign: 'right', padding: '8px' }}>{c.subscribers}M</td>
                <td style={{ textAlign: 'right', padding: '8px' }}>{c.share}%</td>
                <td style={{ textAlign: 'right', padding: '8px' }}>EGP {c.arpu}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )

  const renderRegional = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <SectionHeader>REGIONAL PERFORMANCE</SectionHeader>
      
      <Card title="SUBSCRIBERS BY REGION">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={regionPerformance} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis type="number" stroke="#888" fontSize={11} />
            <YAxis dataKey="region" type="category" stroke="#888" fontSize={11} width={80} />
            <Tooltip content={<TooltipCustom />} />
            <Bar dataKey="subs" name="Subscribers %" fill={PURPLE} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )

  const renderSWOT = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <SectionHeader>SWOT ANALYSIS</SectionHeader>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Card title="STRENGTHS">
          <div style={{ display: 'grid', gap: '8px' }}>
            {swotData.strengths.map((s, i) => (
              <div key={i} style={{ padding: '8px', background: '#111', borderRadius: '4px', borderLeft: `3px solid ${GREEN}` }}>
                <span style={{ color: '#fff', fontSize: '12px' }}>{s.item}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="WEAKNESSES">
          <div style={{ display: 'grid', gap: '8px' }}>
            {swotData.weaknesses.map((s, i) => (
              <div key={i} style={{ padding: '8px', background: '#111', borderRadius: '4px', borderLeft: `3px solid ${RED}` }}>
                <span style={{ color: '#fff', fontSize: '12px' }}>{s.item}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="OPPORTUNITIES">
          <div style={{ display: 'grid', gap: '8px' }}>
            {swotData.opportunities.map((s, i) => (
              <div key={i} style={{ padding: '8px', background: '#111', borderRadius: '4px', borderLeft: `3px solid ${BLUE}` }}>
                <span style={{ color: '#fff', fontSize: '12px' }}>{s.item}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="RISKS">
          <div style={{ display: 'grid', gap: '8px' }}>
            {swotData.risks.map((s, i) => (
              <div key={i} style={{ padding: '8px', background: '#111', borderRadius: '4px', borderLeft: `3px solid ${ORANGE}` }}>
                <span style={{ color: '#fff', fontSize: '12px' }}>{s.item}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )

  const renderEnterprise = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <SectionHeader>ENTERPRISE & SME</SectionHeader>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {enterpriseData.map((e, i) => (
          <KPITile key={i} label={e.name} value={e.value} sub={e.growth} color={COLORS[i]} />
        ))}
      </div>

      <Card title="V-HUB SME PLATFORM">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ padding: '16px', background: '#111', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600, marginBottom: '8px' }}>Digital Advisory</div>
            <div style={{ fontSize: '12px', color: '#888' }}>Personalized digital transformation guidance for SMEs</div>
          </div>
          <div style={{ padding: '16px', background: '#111', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600, marginBottom: '8px' }}>V-Hub Knowledge Centre</div>
            <div style={{ fontSize: '12px', color: '#888' }}>Expert advice on SEO, social media, cybersecurity</div>
          </div>
        </div>
      </Card>

      <Card title="BUSINESS SOLUTIONS">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {['Cloud & Hosting', 'IoT Platform', 'Business SMS', 'VDSL 100Mbps', 'Office 4G', 'Virtual Numbers'].map((s, i) => (
            <div key={i} style={{ padding: '12px', background: '#111', borderRadius: '6px', textAlign: 'center' }}>
              <span style={{ color: COLORS[i % COLORS.length], fontSize: '12px', fontWeight: 500 }}>{s}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  const renderFiveG = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <SectionHeader>5G EXPANSION</SectionHeader>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <KPITile label="5G Sites" value="3,500+" sub="Urban areas" color={BLUE} />
        <KPITile label="Coverage" value="45%" sub="Population" color={BLUE} />
        <KPITile label="Spectrum Deal" value="$600M" sub="Telecom Egypt" color={TEAL} />
      </div>

      <Card title="5G ROLLOUT TIMELINE">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={fiveGData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="year" stroke="#888" fontSize={11} />
            <YAxis stroke="#888" fontSize={11} />
            <Tooltip content={<TooltipCustom />} />
            <Bar dataKey="sites" name="5G Sites" fill={BLUE} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card title="SPECTRUM INVESTMENT">
        <div style={{ display: 'grid', gap: '12px' }}>
          <div style={{ padding: '12px', background: '#111', borderRadius: '6px' }}>
            <div style={{ fontWeight: 600 }}>$100M FY26</div>
            <div style={{ color: '#888', fontSize: '12px' }}>First payment - 1,800MHz + 2x20MHz</div>
          </div>
          <div style={{ padding: '12px', background: '#111', borderRadius: '6px' }}>
            <div style={{ fontWeight: 600 }}>FY28-FY32</div>
            <div style={{ color: '#888', fontSize: '12px' }}>3,500MHz band allocation</div>
          </div>
        </div>
      </Card>
    </div>
  )

  const renderCustomer = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <SectionHeader>CUSTOMER EXPERIENCE</SectionHeader>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Card title="CUSTOMER SATISFACTION SCORES">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={customerMetrics} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis type="number" stroke="#888" fontSize={11} domain={[0, 100]} />
              <YAxis dataKey="metric" type="category" stroke="#888" fontSize={10} width={100} />
              <Tooltip content={<TooltipCustom />} />
              <Bar dataKey="value" name="Score %" fill={GREEN} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="NTRA RANKINGS (Q2 2025)">
          <div style={{ display: 'grid', gap: '8px' }}>
            <div style={{ padding: '8px', background: '#111', borderRadius: '4px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#888' }}>Mobile Service</span>
              <span style={{ color: GOLD }}>#2 (80%)</span>
            </div>
            <div style={{ padding: '8px', background: '#111', borderRadius: '4px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#888' }}>Fixed Internet</span>
              <span style={{ color: GOLD }}>#1 (86%)</span>
            </div>
            <div style={{ padding: '8px', background: '#111', borderRadius: '4px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#888' }}>Customer Service</span>
              <span style={{ color: GOLD }}>#1 (80%)</span>
            </div>
            <div style={{ padding: '8px', background: '#111', borderRadius: '4px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#888' }}>Complaint Resolution</span>
              <span style={{ color: GOLD }}>#1 (75%)</span>
            </div>
          </div>
        </Card>
      </div>

      <Card title="TRUSTPILOT REVIEWS">
        <div style={{ padding: '16px', background: '#111', borderRadius: '8px', borderLeft: `3px solid ${RED}` }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: RED }}>1.5/5</div>
          <div style={{ color: '#888' }}>TrustScore (91% negative reviews)</div>
        </div>
      </Card>
    </div>
  )

  const renderIoT = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <SectionHeader>IOT & SMART CITIES</SectionHeader>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <KPITile label="Global IoT" value="230M+" sub="Connections" color={PURPLE} />
        <KPITile label="GEM Museum" value="19" sub="Systems integrated" color={TEAL} />
        <KPITile label="Smart Projects" value="4" sub="Active/Pilot" color={GREEN} />
      </div>

      <Card title="IOT PROJECTS">
        <div style={{ display: 'grid', gap: '12px' }}>
          {iotProjects.map((p, i) => (
            <div key={i} style={{ padding: '12px', background: '#111', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{p.name}</div>
                <div style={{ color: '#888', fontSize: '11px' }}>{p.type} | {p.devices} devices</div>
              </div>
              <div style={{ color: p.status === 'Live' ? GREEN : ORANGE, fontSize: '12px' }}>{p.status}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="INDUSTRIES SERVED">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {['Agriculture', 'Retail', 'Manufacturing', 'Construction', 'Hospitality', 'Real Estate'].map((ind, i) => (
            <div key={i} style={{ padding: '12px', background: '#111', borderRadius: '6px', textAlign: 'center' }}>
              <span style={{ color: COLORS[i % COLORS.length], fontSize: '12px', fontWeight: 500 }}>{ind}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  const renderTab = () => {
    switch(tab) {
      case 1: return renderExecutive()
      case 2: return renderFinancial()
      case 3: return renderMarket()
      case 4: return renderNetwork()
      case 5: return renderFinancialServices()
      case 6: return renderEnterprise()
      case 7: return renderFiveG()
      case 8: return renderCustomer()
      case 9: return renderIoT()
      case 10: return renderCompetitive()
      case 11: return renderRegional()
      case 12: return renderSWOT()
      default: return renderExecutive()
    }
  }

  return (
    <div style={{ backgroundColor: NAVY, color: '#fff', fontFamily: "'Segoe UI',sans-serif", padding: '24px', minHeight: '100vh' }}>
      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '8px 14px',
              background: tab === t.id ? BLUE : 'transparent',
              border: 'none',
              borderRadius: '4px 4px 0 0',
              color: tab === t.id ? '#fff' : '#888',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: tab === t.id ? 600 : 400,
            }}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderTab()}

      {/* Footer */}
      <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '1px solid #222', color: '#666', fontSize: '11px', textAlign: 'center' }}>
        SmartProDS × Vodafone Egypt Intelligence | Research: April 2026 | Data: Web Search + Company Reports
      </div>
    </div>
  )
}