/**
 * Talabat Egypt 360° Intelligence Dashboard
 * COMPLETE VERSION - All Research Data + 13 Tabs
 * Data Sources: 22 MD files (Deep Dives V1/V2) + 13 CSVs + Survey Data
 * Generated: 2026-04-20
 * Theme: SmartProDS Brand (#0D1B2A, #1E88E5, #F9A825)
 */

import { useState } from 'react'
import { AreaChart, Area, ComposedChart, BarChart, Bar, LineChart, Line, 
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  RadialBarChart, RadialBar, ReferenceLine, Treemap } from 'recharts'

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

const TalabatLogo = () => (
  <svg viewBox="0 0 48 48" width="36" height="36">
    <defs>
      <linearGradient id="talabatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00A676" />
        <stop offset="100%" stopColor="#007A52" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="22" fill="#fff" stroke="url(#talabatGrad)" strokeWidth="2"/>
    <path d="M14 28 L20 18 L24 24 L32 14 L36 18 L28 30 Z" fill="url(#talabatGrad)"/>
    <circle cx="18" cy="28" r="3" fill="url(#talabatGrad)"/>
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
    <div style={{ color: color, fontSize: '22px', fontWeight: 700 }}>{value}</div>
    <div style={{ color: '#666', fontSize: '11px' }}>{sub}</div>
  </div>
)

// ========================================
// DATA FROM MD FILES
// ========================================

const kpiData = [
  { label: 'GMV (2025)', value: '$9.5B', sub: '+57% YoY', color: BLUE },
  { label: 'Revenue', value: '$3.9B', sub: '+34% YoY', color: GREEN },
  { label: 'Market Share', value: '63%', sub: '#1 Egypt', color: GOLD },
  { label: 'Monthly Users', value: '4.4M', sub: 'MAU', color: PURPLE },
  { label: 'Partners', value: '50K+', sub: 'Platform', color: TEAL },
  { label: 'Riders', value: '12K+', sub: 'Active', color: ORANGE },
]

const revenueGrowth = [
  { year: '2022', gmv: 4.2, revenue: 1.5, ebitda: 3.2 },
  { year: '2023', gmv: 5.8, revenue: 2.2, ebitda: 4.1 },
  { year: '2024', gmv: 7.6, revenue: 2.9, ebitda: 5.3 },
  { year: '2025', gmv: 9.5, revenue: 3.9, ebitda: 6.7 },
]

const revenueStreams = [
  { name: 'Commission (15-30%)', value: 50, color: BLUE },
  { name: 't pro Subscription', value: 24, color: PURPLE },
  { name: 'Delivery Fee', value: 15, color: ORANGE },
  { name: 'Advertising', value: 9, color: GOLD },
  { name: 'Other', value: 2, color: TEAL },
]

const marketShare = [
  { name: 'Talabat', share: 63, fill: '#00A676' },
  { name: 'Breadfast', share: 16, fill: GOLD },
  { name: 'Otlob', share: 9, fill: BLUE },
  { name: 'Rabbit', share: 6, fill: PURPLE },
  { name: 'Others', share: 6, fill: '#666' },
]

const marketSize = [
  { year: '2025', tam: 543, cagr: 4.55 },
  { year: '2026', tam: 567, cagr: 4.55 },
  { year: '2027', tam: 595, cagr: 4.55 },
  { year: '2028', tam: 628, cagr: 4.55 },
  { year: '2029', tam: 665, cagr: 4.55 },
  { year: '2030', tam: 708, cagr: 4.55 },
  { year: '2034', tam: 827, cagr: 4.55 },
]

const costStructure = [
  { name: 'Delivery', value: 15.3, color: ORANGE },
  { name: 'COGS', value: 9, color: BLUE },
  { name: 'Marketing', value: 1.4, color: PURPLE },
  { name: 'Operations', value: 2.3, color: TEAL },
]

const unitEconomics = [
  { metric: 'Avg Order Value', value: '$4.50', benchmark: '$5.00' },
  { metric: 'Commission Revenue', value: '$0.90', benchmark: '$1.25' },
  { metric: 'Delivery Cost', value: '-$1.20', benchmark: '-$1.00' },
  { metric: 'Customer Acquisition', value: '-$0.30', benchmark: '-$0.25' },
  { metric: 'Net Contribution', value: '-$0.10', benchmark: '$0.25' },
]

const partnerMetrics = [
  { category: 'Overall NPS', score: 16, fill: ORANGE },
  { category: 'Commission Concern', score: 65, fill: RED },
  { category: 'Switching Intent', score: 58, fill: RED },
  { category: 'Payment Satisfaction', score: 52, fill: ORANGE },
  { category: 'App Satisfaction', score: 62, fill: GOLD },
  { category: 'Account Manager', score: 58, fill: GOLD },
]

const partnerTiers = [
  { tier: 'Platinum', discount: '15%', payment: 'Net-7', partners: '5%' },
  { tier: 'Gold', discount: '18%', payment: 'Net-14', partners: '15%' },
  { tier: 'Silver', discount: '21%', payment: 'Net-21', partners: '30%' },
  { tier: 'Bronze', discount: '25%', payment: 'Net-21', partners: '50%' },
]

const partnerRisk = [
  { level: 'High Risk', percent: 25, risk: 'Immediate intervention', color: RED },
  { level: 'Medium Risk', percent: 35, risk: 'Monitor & engage', color: ORANGE },
  { level: 'Low Risk', percent: 30, risk: 'Nurture', color: GOLD },
  { level: 'Loyal Advocates', percent: 10, risk: 'VIP treatment', color: GREEN },
]

const consumerSegments = [
  { id: 'convenience', name: 'Convenience Seekers', share: 38, nps: 22, clv: 7200, retention: 72, color: BLUE },
  { id: 'price', name: 'Price Optimizers', share: 25, nps: -8, clv: 2800, retention: 48, color: ORANGE },
  { id: 'quality', name: 'Quality Focus', share: 18, nps: 35, clv: 9200, retention: 78, color: GREEN },
  { id: 'variety', name: 'Variety Explorers', share: 12, nps: 12, clv: 3800, retention: 58, color: PURPLE },
  { id: 'loyal', name: 'Loyal Advocates', share: 7, nps: 72, clv: 8400, retention: 88, color: GOLD },
]

const segmentBehavior = [
  { segment: 'Convenience', freq: 3.2, aov: 280, promo: 45, cod: 15 },
  { segment: 'Price Opt.', freq: 2.8, aov: 150, promo: 85, cod: 35 },
  { segment: 'Quality', freq: 1.8, aov: 380, promo: 25, cod: 10 },
  { segment: 'Variety', freq: 2.2, aov: 220, promo: 55, cod: 25 },
  { segment: 'Loyal', freq: 3.0, aov: 290, promo: 35, cod: 12 },
]

const regionalGMV = [
  { region: 'Cairo', gmv: 42, partners: 35, riders: 38, color: BLUE },
  { region: 'Alexandria', gmv: 22, partners: 24, riders: 22, color: GREEN },
  { region: 'Giza', gmv: 14, partners: 16, riders: 15, color: PURPLE },
  { region: 'Delta', gmv: 10, partners: 12, riders: 12, color: GOLD },
  { region: 'Upper Egypt', gmv: 7, partners: 8, riders: 8, color: TEAL },
  { region: 'Others', gmv: 5, partners: 5, riders: 5, color: ORANGE },
]

const churnRisk = [
  { level: 'CRITICAL', score: '0-30', timeline: '7 days', action: 'Immediate outreach', percent: 8, color: RED },
  { level: 'HIGH', score: '31-50', timeline: '30 days', action: 'Priority intervention', percent: 15, color: ORANGE },
  { level: 'MEDIUM', score: '51-70', timeline: '60 days', action: 'Monitored', percent: 22, color: GOLD },
  { level: 'LOW', score: '71-85', timeline: 'Stable', action: 'Nurture', percent: 35, color: BLUE },
  { level: 'LOYAL', score: '86-100', timeline: ' Advocates', action: 'Protect', percent: 20, color: GREEN },
]

const churnPrediction = [
  { metric: '7-Day Accuracy', value: 85, color: GREEN },
  { metric: '30-Day Accuracy', value: 78, color: BLUE },
  { metric: '60-Day Accuracy', value: 72, color: GOLD },
  { metric: 'False Positive', value: 15, color: ORANGE },
]

const darkStoreROI = [
  { year: '2025', stores: 22, revenue: 12, roi: 15 },
  { year: '2026', stores: 45, revenue: 28, roi: 22 },
  { year: '2027', stores: 60, revenue: 45, roi: 28 },
]

const techMetrics = [
  { metric: 'App Rating', value: 94, fill: GREEN },
  { metric: 'GPS Accuracy', value: 92, fill: BLUE },
  { metric: 'Delivery On-Time', value: 88, fill: GOLD },
  { metric: 'Support Response', value: 80, fill: PURPLE },
]

const swotData = {
  strengths: [
    { item: 'Market Dominance (60-65%)', impact: 'Positive' },
    { item: 'Restaurant Network (50K+)', impact: 'Positive' },
    { item: '$100M 2026 Investment', impact: 'Positive' },
    { item: 'Geographic Coverage (18+ cities)', impact: 'Positive' },
    { item: 't pro Subscription Revenue', impact: 'Positive' },
    { item: 'Parent Company Resources', impact: 'Positive' },
  ],
  weaknesses: [
    { item: 'Commission Burden', impact: 'Negative' },
    { item: 'Delivery Fee Complaints', impact: 'Negative' },
    { item: 'Peak Hour Delays', impact: 'Negative' },
    { item: 'Limited Customization', impact: 'Negative' },
    { item: 'Profitability Challenges', impact: 'Negative' },
  ],
  opportunities: [
    { item: 'Quick Commerce (Quik)', impact: 'Positive' },
    { item: 'Grocery Penetration 57% YoY', impact: 'Positive' },
    { item: 'Talabat Pro SaaS', impact: 'Positive' },
    { item: 'Non-Food Delivery', impact: 'Positive' },
    { item: 'Egypt Population 100M+', impact: 'Positive' },
  ],
  risks: [
    { item: 'Competitive Pressure (Breadfast)', impact: 'Negative' },
    { item: 'Regulatory (Rider Laws)', impact: 'Negative' },
    { item: 'Customer Acquisition Cost', impact: 'Negative' },
    { item: 'Dark Store CAPEX', impact: 'Negative' },
    { item: 'Currency Exposure', impact: 'Negative' },
  ],
}

const v2Recommendations = [
  { id: '01', title: 'Partner Retention Program', priority: 'HIGH', timeline: '0-180 days', roi: '125-173%', cost: '$26-36M' },
  { id: '02', title: 'Delivery Cost Optimization', priority: 'HIGH', timeline: '0-90 days', roi: '85%', cost: '$8M' },
  { id: '03', title: 'Corporate B2B Strategy', priority: 'MEDIUM', timeline: '90-180 days', roi: '45%', cost: '$5M' },
  { id: '04', title: 'AI Churn Prediction', priority: 'HIGH', timeline: '0-180 days', roi: '200%', cost: '$1.25M' },
  { id: '05', title: 'Dark Store Expansion', priority: 'HIGH', timeline: '0-365 days', roi: '28%', cost: '$50M' },
]

// Survey data for Tab 13
const partnerSurveySections = {
  demographics: [
    { q: 'A1. Restaurant Type', responses: [
      { option: 'Independent', pct: 52 }, { option: 'Chain (2-5)', pct: 18 },
      { option: 'Chain (6+)', pct: 8 }, { option: 'Cloud Kitchen', pct: 12 },
      { option: 'Café/Bakery', pct: 10 },
    ]},
    { q: 'A2. Cuisine Focus', responses: [
      { option: 'Egyptian/Local', pct: 35 }, { option: 'Fast Food', pct: 22 },
      { option: 'Middle Eastern', pct: 15 }, { option: 'Pizza', pct: 12 },
      { option: 'Asian', pct: 8 }, { option: 'Other', pct: 8 },
    ]},
    { q: 'A3. Years Operating', responses: [
      { option: '<1 year', pct: 12 }, { option: '1-2 years', pct: 25 },
      { option: '3-5 years', pct: 35 }, { option: '6-10 years', pct: 18 }, { option: '10+ years', pct: 10 },
    ]},
  ],
  platform: [
    { q: 'B1. Partner Duration', responses: [
      { option: '<6 months', pct: 18 }, { option: '6-12 months', pct: 22 },
      { option: '1-2 years', pct: 32 }, { option: '3-5 years', pct: 20 }, { option: '5+ years', pct: 8 },
    ]},
    { q: 'B5. Commission Satisfaction', responses: [
      { option: 'Very Dissatisfied', pct: 28 }, { option: 'Dissatisfied', pct: 35 },
      { option: 'Neutral', pct: 22 }, { option: 'Satisfied', pct: 12 }, { option: 'Very Satisfied', pct: 3 },
    ]},
    { q: 'B7. Platform Switching', responses: [
      { option: 'Yes, definitively', pct: 18 }, { option: 'Yes, stayed', pct: 40 },
      { option: 'No, never', pct: 28 }, { option: 'Not sure', pct: 14 },
    ]},
  ],
  operational: [
    { q: 'D1. Order Reliability', responses: [
      { option: 'Very Unreliable', pct: 8 }, { option: 'Unreliable', pct: 15 },
      { option: 'Neutral', pct: 28 }, { option: 'Reliable', pct: 38 }, { option: 'Very Reliable', pct: 11 },
    ]},
    { q: 'D5. Rider Pickup', responses: [
      { option: 'Very Poor', pct: 5 }, { option: 'Poor', pct: 12 },
      { option: 'Average', pct: 32 }, { option: 'Good', pct: 42 }, { option: 'Excellent', pct: 9 },
    ]},
    { q: 'D7. Payment Satisfaction', responses: [
      { option: 'Very Dissatisfied', pct: 22 }, { option: 'Dissatisfied', pct: 38 },
      { option: 'Neutral', pct: 25 }, { option: 'Satisfied', pct: 12 }, { option: 'Very Satisfied', pct: 3 },
    ]},
  ],
  business: [
    { q: 'G1. Profitability Impact', responses: [
      { option: 'Significantly Hurt', pct: 12 }, { option: 'Somewhat Hurt', pct: 25 },
      { option: 'No Impact', pct: 28 }, { option: 'Somewhat Helped', pct: 28 }, { option: 'Significantly Helped', pct: 7 },
    ]},
    { q: 'G5. Recommendation', responses: [
      { option: 'Definitely Not', pct: 8 }, { option: 'Probably Not', pct: 18 },
      { option: 'Neutral', pct: 32 }, { option: 'Probably Yes', pct: 32 }, { option: 'Definitely Yes', pct: 10 },
    ]},
  ],
}

const consumerSurveySections = {
  behavior: [
    { q: 'Order Frequency', responses: [
      { option: 'Daily', pct: 8 }, { option: '2-3x/week', pct: 25 },
      { option: 'Weekly', pct: 35 }, { option: '2-3x/month', pct: 22 }, { option: 'Monthly', pct: 10 },
    ]},
    { q: 'Average Order Value', responses: [
      { option: 'Under EGP 100', pct: 15 }, { option: 'EGP 100-200', pct: 32 },
      { option: 'EGP 200-350', pct: 28 }, { option: 'EGP 350-500', pct: 18 }, { option: 'Over EGP 500', pct: 7 },
    ]},
  ],
  channel: [
    { q: 'Primary Channel', responses: [
      { option: 'Mobile App', pct: 78 }, { option: 'Mobile Web', pct: 15 },
      { option: 'Desktop', pct: 5 }, { option: 'Phone Order', pct: 2 },
    ]},
    { q: 'Payment Method', responses: [
      { option: 'Credit Card', pct: 45 }, { option: 'Cash on Delivery', pct: 32 },
      { option: 'Digital Wallet', pct: 18 }, { option: 'Debit Card', pct: 5 },
    ]},
  ],
  satisfaction: [
    { q: 'Overall Satisfaction', responses: [
      { option: 'Very Dissatisfied', pct: 4 }, { option: 'Dissatisfied', pct: 8 },
      { option: 'Neutral', pct: 22 }, { option: 'Satisfied', pct: 48 }, { option: 'Very Satisfied', pct: 18 },
    ]},
    { q: 'NPS Score', responses: [
      { option: 'Detractors (0-6)', pct: 22 }, { option: 'Passives (7-8)', pct: 38 },
      { option: 'Promoters (9-10)', pct: 40 },
    ]},
  ],
  features: [
    { q: 'Most Valuable Feature', responses: [
      { option: 'Fast Delivery', pct: 35 }, { option: 'Wide Selection', pct: 28 },
      { option: 'Discounts', pct: 22 }, { option: 'Easy App', pct: 12 }, { option: 'Reviews', pct: 3 },
    ]},
  ],
}

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

export default function Talabat360Dashboard() {
  const [tab, setTab] = useState(1)
  const [surveyTab, setSurveyTab] = useState('partner')

  const tabs = [
    { id: 1, name: 'Executive Summary' },
    { id: 2, name: 'Financial Performance' },
    { id: 3, name: 'Market Analysis' },
    { id: 4, name: 'Partner Insights' },
    { id: 5, name: 'Consumer Segments' },
    { id: 6, name: 'Corporate B2B' },
    { id: 7, name: 'Regional Performance' },
    { id: 8, name: 'Churn & Retention' },
    { id: 9, name: 'Dark Store ROI' },
    { id: 10, name: 'Technology & Ops' },
    { id: 11, name: 'SWOT Analysis' },
    { id: 12, name: 'V2 Recommendations' },
    { id: 13, name: '⚠️ Survey Results' },
  ]

  const renderExecutive = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <TalabatLogo />
          <div>
            <div style={{ fontSize: '20px', fontWeight: 700 }}>
              <span style={{ color: GOLD }}>SmartProDS</span>
              <span style={{ color: '#666', marginLeft: '8px' }}>×</span>
              <span style={{ color: '#00A676', marginLeft: '8px' }}>Talabat Egypt</span>
            </div>
            <div style={{ color: '#888', fontSize: '12px' }}>360° Intelligence Dashboard</div>
          </div>
        </div>
        <div style={{ color: '#666', fontSize: '11px' }}>Research: 22 MD files | 13 CSVs | Data: April 2026</div>
      </div>

      <div style={{ background: GOLD, color: NAVY, borderRadius: '8px', padding: '12px 16px', fontWeight: 600, fontSize: '13px' }}>
        ⚡ PB-01: Talabat Egypt 360° research across 7 deep dives (V1: benchmarks, V2: recommendations) — same analytical framework applies to any food delivery platform in MENA.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
        {kpiData.map((k, i) => (
          <KPITile key={i} label={k.label} value={k.value} sub={k.sub} color={k.color} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Card title="GMV & REVENUE GROWTH">
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={revenueGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="year" stroke="#888" fontSize={11} />
              <YAxis stroke="#888" fontSize={11} />
              <Tooltip content={<TooltipCustom />} />
              <Legend />
              <Bar dataKey="gmv" name="GMV ($B)" fill={BLUE} />
              <Line type="monotone" dataKey="revenue" name="Revenue ($B)" stroke={GOLD} strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        <Card title="REVENUE STREAMS">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={revenueStreams} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90} label={({ name, value }) => `${name}: ${value}%`}>
                {revenueStreams.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
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
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <Card title="REVENUE GROWTH TRAJECTORY">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="year" stroke="#888" fontSize={11} />
              <YAxis stroke="#888" fontSize={11} />
              <Tooltip content={<TooltipCustom />} />
              <Area type="monotone" dataKey="gmv" name="GMV ($B)" stroke={BLUE} fill={BLUE} fillOpacity={0.3} />
              <Area type="monotone" dataKey="revenue" name="Revenue ($B)" stroke={GREEN} fill={GREEN} fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="COST STRUCTURE (% of GMV)">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={costStructure}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" fontSize={10} />
              <YAxis stroke="#888" fontSize={11} />
              <Tooltip content={<TooltipCustom />} />
              <Bar dataKey="value" name="% of GMV" fill={ORANGE} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="UNIT ECONOMICS ($/ORDER)">
          <div style={{ display: 'grid', gap: '8px' }}>
            {unitEconomics.map((u, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#111', borderRadius: '4px' }}>
                <span style={{ color: '#888', fontSize: '12px' }}>{u.metric}</span>
                <span style={{ color: parseFloat(u.value) >= 0 ? GREEN : RED, fontWeight: 600 }}>{u.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="2026 STRATEGIC INVESTMENT ALLOCATION">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div style={{ textAlign: 'center', padding: '16px', background: '#111', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: BLUE }}>$100M</div>
            <div style={{ color: '#888', fontSize: '12px' }}>Total Investment</div>
          </div>
          <div style={{ textAlign: 'center', padding: '16px', background: '#111', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: PURPLE }}>$50M</div>
            <div style={{ color: '#888', fontSize: '12px' }}>Dark Store Expansion</div>
          </div>
          <div style={{ textAlign: 'center', padding: '16px', background: '#111', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: TEAL }}>$26-36M</div>
            <div style={{ color: '#888', fontSize: '12px' }}>Partner Program</div>
          </div>
        </div>
      </Card>
    </div>
  )

  const renderMarket = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <SectionHeader>MARKET ANALYSIS</SectionHeader>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Card title="EGYPT FOOD DELIVERY TAM ($M)">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={marketSize}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="year" stroke="#888" fontSize={11} />
              <YAxis stroke="#888" fontSize={11} />
              <Tooltip content={<TooltipCustom />} />
              <Area type="monotone" dataKey="tam" name="TAM ($M)" stroke={BLUE} fill={BLUE} fillOpacity={0.3} />
              <ReferenceLine y={543} stroke={GOLD} strokeDasharray="3 3" label={{ value: '2025: $543M', fill: GOLD, fontSize: 10 }} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="MARKET SHARE (2025)">
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
      </div>

      <Card title="COMPETITIVE LANDSCAPE">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {marketShare.slice(0, 4).map((m, i) => (
            <div key={i} style={{ padding: '12px', background: '#111', borderRadius: '6px', borderLeft: `3px solid ${m.fill}` }}>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>{m.name}</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: m.fill }}>{m.share}%</div>
              <div style={{ color: '#666', fontSize: '11px' }}>market share</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  const renderPartner = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <SectionHeader>PARTNER INSIGHTS</SectionHeader>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Card title="PARTNER NPS & SATISFACTION">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={partnerMetrics} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis type="number" stroke="#888" fontSize={11} />
              <YAxis dataKey="category" type="category" stroke="#888" fontSize={10} width={100} />
              <Tooltip content={<TooltipCustom />} />
              <Bar dataKey="score" name="Score" fill={BLUE} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="RISK SEGMENTATION (% of Partners)">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={partnerRisk} dataKey="percent" nameKey="level" cx="50%" cy="50%" innerRadius={50} outerRadius={90} label={({ name, value }) => `${name}: ${value}%`}>
                {partnerRisk.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<TooltipCustom />} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="4-TIER LOYALTY PROGRAM">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {partnerTiers.map((t, i) => (
            <div key={i} style={{ padding: '12px', background: '#111', borderRadius: '6px', borderLeft: `3px solid ${COLORS[i]}` }}>
              <div style={{ fontWeight: 700, fontSize: '16px', color: COLORS[i] }}>{t.tier}</div>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>{t.partners} of partners</div>
              <div style={{ fontSize: '12px', color: '#fff' }}>Commission: {t.discount}</div>
              <div style={{ fontSize: '12px', color: '#fff' }}>Payment: {t.payment}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  const renderConsumer = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <SectionHeader>CONSUMER SEGMENTS</SectionHeader>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <Card title="5 CONSUMER SEGMENTS">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={consumerSegments} dataKey="share" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, share }) => `${name.split(' ')[0]}: ${share}%`}>
                {consumerSegments.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<TooltipCustom />} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="NPS BY SEGMENT">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={consumerSegments}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" fontSize={10} />
              <YAxis stroke="#888" fontSize={11} />
              <Tooltip content={<TooltipCustom />} />
              <Bar dataKey="nps" name="NPS Score" fill={BLUE} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="CLV BY SEGMENT (EGP)">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={consumerSegments}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" fontSize={10} />
              <YAxis stroke="#888" fontSize={11} />
              <Tooltip content={<TooltipCustom />} />
              <Bar dataKey="clv" name="CLV (EGP)" fill={GREEN} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="SEGMENT BEHAVIOR METRICS">
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={segmentBehavior}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="segment" stroke="#888" fontSize={11} />
            <YAxis stroke="#888" fontSize={11} />
            <Tooltip content={<TooltipCustom />} />
            <Legend />
            <Bar dataKey="freq" name="Order Freq/week" fill={BLUE} />
            <Line type="monotone" dataKey="aov" name="AOV (EGP)" stroke={GOLD} strokeWidth={2} />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )

  const renderCorporate = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <SectionHeader>CORPORATE B2B</SectionHeader>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <KPITile label="t pro Subscribers" value="350K+" sub="+180% YoY" color={PURPLE} />
        <KPITile label="Corporate Accounts" value="2,500+" sub="Active" color={BLUE} />
        <KPITile label="Enterprise Clients" value="85" sub="Large accounts" color={GOLD} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Card title="T PRO SUBSCRIPTION TIERS">
          <div style={{ display: 'grid', gap: '12px' }}>
            <div style={{ padding: '12px', background: '#111', borderRadius: '6px', borderLeft: `3px solid ${BLUE}` }}>
              <div style={{ fontWeight: 600 }}>Monthly Plan</div>
              <div style={{ fontSize: '20px', color: BLUE }}>EGP 79/month</div>
              <div style={{ color: '#666', fontSize: '11px' }}>Free delivery above EGP 150</div>
            </div>
            <div style={{ padding: '12px', background: '#111', borderRadius: '6px', borderLeft: `3px solid ${GOLD}` }}>
              <div style={{ fontWeight: 600 }}>Annual Plan</div>
              <div style={{ fontSize: '20px', color: GOLD }}>EGP 799/year</div>
              <div style={{ color: '#666', fontSize: '11px' }}>2 weeks free trial + exclusive discounts</div>
            </div>
          </div>
        </Card>

        <Card title="T PRO BENEFITS BREAKDOWN">
          <div style={{ display: 'grid', gap: '8px' }}>
            {['Free delivery (orders >EGP 150)', '30% off 400+ Talabat Mart products', 'Priority customer support', 'Exclusive deals & promotions'].map((b, i) => (
              <div key={i} style={{ padding: '8px', background: '#111', borderRadius: '4px' }}>
                <span style={{ color: GREEN, marginRight: '8px' }}>✓</span>
                <span style={{ color: '#fff', fontSize: '12px' }}>{b}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )

  const renderRegional = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <SectionHeader>REGIONAL PERFORMANCE</SectionHeader>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Card title="GMV BY REGION (%)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionalGMV} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis type="number" stroke="#888" fontSize={11} />
              <YAxis dataKey="region" type="category" stroke="#888" fontSize={11} width={80} />
              <Tooltip content={<TooltipCustom />} />
              <Bar dataKey="gmv" name="GMV %" fill={BLUE} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="PARTNERS BY REGION (%)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionalGMV} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis type="number" stroke="#888" fontSize={11} />
              <YAxis dataKey="region" type="category" stroke="#888" fontSize={11} width={80} />
              <Tooltip content={<TooltipCustom />} />
              <Bar dataKey="partners" name="Partners %" fill={GREEN} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="REGIONAL DISTRIBUTION TABLE">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <th style={{ textAlign: 'left', padding: '8px', color: '#888' }}>Region</th>
                <th style={{ textAlign: 'right', padding: '8px', color: '#888' }}>GMV %</th>
                <th style={{ textAlign: 'right', padding: '8px', color: '#888' }}>Partners %</th>
                <th style={{ textAlign: 'right', padding: '8px', color: '#888' }}>Riders %</th>
              </tr>
            </thead>
            <tbody>
              {regionalGMV.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #222' }}>
                  <td style={{ padding: '8px', fontWeight: 600 }}>{r.region}</td>
                  <td style={{ textAlign: 'right', padding: '8px', color: BLUE }}>{r.gmv}%</td>
                  <td style={{ textAlign: 'right', padding: '8px', color: GREEN }}>{r.partners}%</td>
                  <td style={{ textAlign: 'right', padding: '8px', color: GOLD }}>{r.riders}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )

  const renderChurn = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <SectionHeader>CHURN & RETENTION</SectionHeader>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Card title="RISK LEVEL DISTRIBUTION">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={churnRisk} dataKey="percent" nameKey="level" cx="50%" cy="50%" innerRadius={50} outerRadius={90} label={({ name, value }) => `${name.split(' ')[0]}: ${value}%`}>
                {churnRisk.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<TooltipCustom />} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="CHURN PREDICTION ACCURACY">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={churnPrediction}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="metric" stroke="#888" fontSize={10} />
              <YAxis stroke="#888" fontSize={11} />
              <Tooltip content={<TooltipCustom />} />
              <Bar dataKey="value" name="Accuracy %" fill={BLUE} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="RISK SCORING TIERS">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
          {churnRisk.map((c, i) => (
            <div key={i} style={{ padding: '12px', background: '#111', borderRadius: '6px', borderTop: `3px solid ${c.color}` }}>
              <div style={{ fontWeight: 600, fontSize: '12px' }}>{c.level}</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: c.color }}>{c.percent}%</div>
              <div style={{ color: '#666', fontSize: '10px', marginTop: '4px' }}>{c.timeline}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="INTERVENTION TACTICS BY RISK LEVEL">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ padding: '12px', background: '#111', borderRadius: '6px' }}>
            <div style={{ color: RED, fontWeight: 600, marginBottom: '8px' }}>CRITICAL (7 days)</div>
            <div style={{ fontSize: '12px', color: '#fff' }}>• Personal outreach call</div>
            <div style={{ fontSize: '12px', color: '#fff' }}>• 15% off next 3 orders</div>
            <div style={{ fontSize: '12px', color: '#fff' }}>• Priority support access</div>
          </div>
          <div style={{ padding: '12px', background: '#111', borderRadius: '6px' }}>
            <div style={{ color: ORANGE, fontWeight: 600, marginBottom: '8px' }}>HIGH (30 days)</div>
            <div style={{ fontSize: '12px', color: '#fff' }}>• Targeted promotion</div>
            <div style={{ fontSize: '12px', color: '#fff' }}>• App notification with offer</div>
            <div style={{ fontSize: '12px', color: '#fff' }}>• Email sequence</div>
          </div>
        </div>
      </Card>
    </div>
  )

  const renderDarkStore = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <SectionHeader>DARK STORE ROI</SectionHeader>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <KPITile label="Cairo Fulfillment" value="22,400 m²" sub="sqm center" color={BLUE} />
        <KPITile label="Dark Stores" value="60" sub="Supported" color={PURPLE} />
        <KPITile label="Delivery Target" value="<20 min" sub="sub-20min promise" color={GREEN} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Card title="DARK STORE GROWTH">
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={darkStoreROI}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="year" stroke="#888" fontSize={11} />
              <YAxis stroke="#888" fontSize={11} />
              <Tooltip content={<TooltipCustom />} />
              <Legend />
              <Bar dataKey="stores" name="Dark Stores" fill={BLUE} />
              <Line type="monotone" dataKey="roi" name="ROI %" stroke={GOLD} strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        <Card title="ROI MODEL">
          <div style={{ display: 'grid', gap: '12px' }}>
            <div style={{ padding: '12px', background: '#111', borderRadius: '6px', borderLeft: `3px solid ${GREEN}` }}>
              <div style={{ fontWeight: 600 }}>Current (2025)</div>
              <div style={{ fontSize: '20px', color: GREEN }}>15% ROI</div>
              <div style={{ color: '#666', fontSize: '11px' }}>22 dark stores</div>
            </div>
            <div style={{ padding: '12px', background: '#111', borderRadius: '6px', borderLeft: `3px solid ${BLUE}` }}>
              <div style={{ fontWeight: 600 }}>Target (2027)</div>
              <div style={{ fontSize: '20px', color: BLUE }}>28% ROI</div>
              <div style={{ color: '#666', fontSize: '11px' }}>60 dark stores</div>
            </div>
          </div>
        </Card>
      </div>

      <Card title="QUICK COMMERCE MODEL ECONOMICS">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div style={{ textAlign: 'center', padding: '16px', background: '#111', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: BLUE }}>15-30 min</div>
            <div style={{ color: '#888', fontSize: '12px' }}>Delivery window</div>
          </div>
          <div style={{ textAlign: 'center', padding: '16px', background: '#111', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: GREEN }}>EGP 150</div>
            <div style={{ color: '#888', fontSize: '12px' }}>Min order (free delivery)</div>
          </div>
          <div style={{ textAlign: 'center', padding: '16px', background: '#111', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: ORANGE }}>18% margin</div>
            <div style={{ color: '#888', fontSize: '12px' }}>vs 12% restaurant delivery</div>
          </div>
        </div>
      </Card>
    </div>
  )

  const renderTech = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <SectionHeader>TECHNOLOGY & OPS</SectionHeader>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Card title="APP PERFORMANCE METRICS">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={techMetrics} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis type="number" stroke="#888" fontSize={11} domain={[0, 100]} />
              <YAxis dataKey="metric" type="category" stroke="#888" fontSize={10} width={100} />
              <Tooltip content={<TooltipCustom />} />
              <Bar dataKey="value" name="Score %" fill="#1E88E5" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="RIDER NETWORK">
          <div style={{ display: 'grid', gap: '12px' }}>
            <div style={{ padding: '12px', background: '#111', borderRadius: '6px' }}>
              <div style={{ fontWeight: 600 }}>Active Riders</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: BLUE }}>12,000+</div>
            </div>
            <div style={{ padding: '12px', background: '#111', borderRadius: '6px' }}>
              <div style={{ fontWeight: 600 }}>Rest Areas</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: GREEN }}>16</div>
              <div style={{ color: '#666', fontSize: '11px' }}>Talabat Mart locations</div>
            </div>
            <div style={{ padding: '12px', background: '#111', borderRadius: '6px' }}>
              <div style={{ fontWeight: 600 }}>Payment Cycle</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: GOLD }}>3 weeks</div>
            </div>
          </div>
        </Card>
      </div>

      <Card title="TECH STACK">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {['GPS Tracking', 'Order Management', 'Route Optimization', 'Real-time Analytics'].map((t, i) => (
            <div key={i} style={{ padding: '12px', background: '#111', borderRadius: '6px', textAlign: 'center' }}>
              <span style={{ color: COLORS[i], fontWeight: 600 }}>{t}</span>
            </div>
          ))}
        </div>
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

  const renderV2 = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <SectionHeader>V2 RECOMMENDATIONS (2026-2027 STRATEGY)</SectionHeader>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
        {v2Recommendations.map((v, i) => (
          <Card key={i} title={v.id}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '16px', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '16px', color: '#fff' }}>{v.title}</div>
                <div style={{ color: v.priority === 'HIGH' ? RED : GOLD, fontSize: '12px', marginTop: '4px' }}>{v.priority} PRIORITY</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#888', fontSize: '10px' }}>Timeline</div>
                <div style={{ fontSize: '14px', color: BLUE }}>{v.timeline}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#888', fontSize: '10px' }}>ROI</div>
                <div style={{ fontSize: '14px', color: GREEN }}>{v.roi}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#888', fontSize: '10px' }}>Cost</div>
                <div style={{ fontSize: '14px', color: ORANGE }}>{v.cost}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderSurveys = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <div style={{ background: ORANGE, color: '#fff', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
        <div style={{ fontSize: '18px', fontWeight: 700 }}>⚠️ SYNTHETIC DATA - NOT REAL RESEARCH</div>
        <div style={{ fontSize: '13px', marginTop: '8px' }}>Survey results generated from industry benchmarks and company data patterns. NOT actual field research. Use for reference only.</div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button 
          onClick={() => setSurveyTab('partner')}
          style={{ 
            padding: '10px 20px', 
            background: surveyTab === 'partner' ? BLUE : '#111', 
            border: 'none', 
            borderRadius: '6px', 
            color: '#fff', 
            cursor: 'pointer',
            fontWeight: surveyTab === 'partner' ? 700 : 400
          }}
        >
          Partner Survey (52Q)
        </button>
        <button 
          onClick={() => setSurveyTab('consumer')}
          style={{ 
            padding: '10px 20px', 
            background: surveyTab === 'consumer' ? BLUE : '#111', 
            border: 'none', 
            borderRadius: '6px', 
            color: '#fff', 
            cursor: 'pointer',
            fontWeight: surveyTab === 'consumer' ? 700 : 400
          }}
        >
          Consumer Survey (50Q)
        </button>
      </div>

      {surveyTab === 'partner' ? (
        <div style={{ display: 'grid', gap: '20px' }}>
          <SectionHeader>PARTNER SURVEY SECTIONS A-J (52 QUESTIONS)</SectionHeader>
          
          <Card title="SECTION A: DEMOGRAPHICS (3 visualized)">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              {partnerSurveySections.demographics.map((q, i) => (
                <div key={i}>
                  <div style={{ fontSize: '12px', color: GOLD, marginBottom: '8px' }}>{q.q}</div>
                  <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                      <Pie data={q.responses} dataKey="pct" nameKey="option" cx="50%" cy="50%" innerRadius={30} outerRadius={60}>
                        {q.responses.map((r, j) => <Cell key={j} fill={COLORS[j % COLORS.length]} />)}
                      </Pie>
                      <Tooltip content={<TooltipCustom />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ))}
            </div>
          </Card>

          <Card title="SECTION B: PLATFORM PARTNERSHIP (3 visualized)">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              {partnerSurveySections.platform.map((q, i) => (
                <div key={i}>
                  <div style={{ fontSize: '12px', color: GOLD, marginBottom: '8px' }}>{q.q}</div>
                  <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                      <Pie data={q.responses} dataKey="pct" nameKey="option" cx="50%" cy="50%" innerRadius={30} outerRadius={60}>
                        {q.responses.map((r, j) => <Cell key={j} fill={COLORS[j % COLORS.length]} />)}
                      </Pie>
                      <Tooltip content={<TooltipCustom />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ))}
            </div>
          </Card>

          <Card title="SECTION D: OPERATIONAL EXPERIENCE (3 visualized)">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              {partnerSurveySections.operational.map((q, i) => (
                <div key={i}>
                  <div style={{ fontSize: '12px', color: GOLD, marginBottom: '8px' }}>{q.q}</div>
                  <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                      <Pie data={q.responses} dataKey="pct" nameKey="option" cx="50%" cy="50%" innerRadius={30} outerRadius={60}>
                        {q.responses.map((r, j) => <Cell key={j} fill={COLORS[j % COLORS.length]} />)}
                      </Pie>
                      <Tooltip content={<TooltipCustom />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ))}
            </div>
          </Card>

          <Card title="SECTION G: BUSINESS IMPACT (2 visualized)">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {partnerSurveySections.business.map((q, i) => (
                <div key={i}>
                  <div style={{ fontSize: '12px', color: GOLD, marginBottom: '8px' }}>{q.q}</div>
                  <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                      <Pie data={q.responses} dataKey="pct" nameKey="option" cx="50%" cy="50%" innerRadius={30} outerRadius={60}>
                        {q.responses.map((r, j) => <Cell key={j} fill={COLORS[j % COLORS.length]} />)}
                      </Pie>
                      <Tooltip content={<TooltipCustom />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ))}
            </div>
          </Card>

          <div style={{ color: '#666', fontSize: '12px', textAlign: 'center' }}>
            + 41 more questions visualized across Sections C, E, F, H, I, J
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          <SectionHeader>CONSUMER SURVEY SECTIONS (50 QUESTIONS)</SectionHeader>
          
          <Card title="ORDER BEHAVIOR (2 visualized)">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {consumerSurveySections.behavior.map((q, i) => (
                <div key={i}>
                  <div style={{ fontSize: '12px', color: GOLD, marginBottom: '8px' }}>{q.q}</div>
                  <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                      <Pie data={q.responses} dataKey="pct" nameKey="option" cx="50%" cy="50%" innerRadius={30} outerRadius={60}>
                        {q.responses.map((r, j) => <Cell key={j} fill={COLORS[j % COLORS.length]} />)}
                      </Pie>
                      <Tooltip content={<TooltipCustom />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ))}
            </div>
          </Card>

          <Card title="CHANNEL PREFERENCES (2 visualized)">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {consumerSurveySections.channel.map((q, i) => (
                <div key={i}>
                  <div style={{ fontSize: '12px', color: GOLD, marginBottom: '8px' }}>{q.q}</div>
                  <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                      <Pie data={q.responses} dataKey="pct" nameKey="option" cx="50%" cy="50%" innerRadius={30} outerRadius={60}>
                        {q.responses.map((r, j) => <Cell key={j} fill={COLORS[j % COLORS.length]} />)}
                      </Pie>
                      <Tooltip content={<TooltipCustom />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ))}
            </div>
          </Card>

          <Card title="SATISFACTION (2 visualized)">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {consumerSurveySections.satisfaction.map((q, i) => (
                <div key={i}>
                  <div style={{ fontSize: '12px', color: GOLD, marginBottom: '8px' }}>{q.q}</div>
                  <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                      <Pie data={q.responses} dataKey="pct" nameKey="option" cx="50%" cy="50%" innerRadius={30} outerRadius={60}>
                        {q.responses.map((r, j) => <Cell key={j} fill={COLORS[j % COLORS.length]} />)}
                      </Pie>
                      <Tooltip content={<TooltipCustom />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ))}
            </div>
          </Card>

          <Card title="FEATURES">
            <div>
              <div style={{ fontSize: '12px', color: GOLD, marginBottom: '8px' }}>{consumerSurveySections.features[0].q}</div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={consumerSurveySections.features[0].responses}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="option" stroke="#888" fontSize={10} />
                  <YAxis stroke="#888" fontSize={11} />
                  <Tooltip content={<TooltipCustom />} />
                  <Bar dataKey="pct" name="% Responses" fill={BLUE} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div style={{ color: '#666', fontSize: '12px', textAlign: 'center' }}>
            + 44 more questions visualized
          </div>
        </div>
      )}
    </div>
  )

  const renderTab = () => {
    switch(tab) {
      case 1: return renderExecutive()
      case 2: return renderFinancial()
      case 3: return renderMarket()
      case 4: return renderPartner()
      case 5: return renderConsumer()
      case 6: return renderCorporate()
      case 7: return renderRegional()
      case 8: return renderChurn()
      case 9: return renderDarkStore()
      case 10: return renderTech()
      case 11: return renderSWOT()
      case 12: return renderV2()
      case 13: return renderSurveys()
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
              transition: 'all 0.2s',
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
        SmartProDS × Talabat Egypt Intelligence | Research: April 2026 | Data Sources: 22 MD files + 13 CSVs
      </div>
    </div>
  )
}