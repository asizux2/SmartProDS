/**
 * Pepsi Egypt 360° Intelligence Dashboard
 * COMPLETE VERSION - All Research Data
 * Data Sources: Deep Research Report + CSVs from Knowledge Base
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
const COLORS = [BLUE, GOLD, GREEN, ORANGE, PURPLE, TEAL, RED]

const PepsiLogo = () => (
  <svg viewBox="0 0 48 48" width="36" height="36">
    <circle cx="24" cy="24" r="22" fill="#004B93"/>
    <circle cx="24" cy="24" r="19" fill="#fff"/>
    <circle cx="24" cy="24" r="16" fill="#004B93"/>
    <text x="24" y="27" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">P</text>
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

// Market Data
const MARKET_DATA = [
  { name: '2025', atHome: 9.25, outHome: 3.07, total: 12.32 },
  { name: '2026E', atHome: 10.32, outHome: 3.42, total: 15.74 },
  { name: '2027E', atHome: 11.52, outHome: 3.81, total: 15.33 },
  { name: '2028E', atHome: 12.86, outHome: 4.24, total: 17.10 },
  { name: '2029E', atHome: 14.36, outHome: 4.73, total: 19.09 },
]

const COMPETITOR_DATA = [
  { name: 'PepsiCo', share: 35, color: '#004B93' },
  { name: 'Coca-Cola', share: 28, color: '#F40009' },
  { name: 'Spiro', share: 12, color: '#FFD700' },
  { name: 'V7 Benefits', share: 8, color: '#22C55E' },
  { name: 'Others', share: 17, color: '#666' },
]

const BRAND_DATA = [
  { name: 'Pepsi', value: 40 },
  { name: '7UP', value: 18 },
  { name: 'Chipsy', value: 15 },
  { name: 'Gatorade', value: 12 },
  { name: 'Doritos', value: 10 },
  { name: 'Others', value: 5 },
]

const REGIONAL_DATA = [
  { name: 'Cairo', employees: 4200 },
  { name: 'Giza', employees: 2800 },
  { name: 'Alex', employees: 1900 },
  { name: 'Delta', employees: 2100 },
  { name: 'Upper Egypt', employees: 1500 },
  { name: 'Suez', employees: 900 },
  { name: 'Canal', employees: 600 },
]

const INVESTMENT_DATA = [
  { name: '2021', value: 85 },
  { name: '2022', value: 95 },
  { name: '2023', value: 110 },
  { name: '2024', value: 130 },
  { name: '2025', value: 95 },
]

const GROWTH_DRIVERS = [
  { name: 'Market CAGR', value: 85, full: '11.58% CAGR 2025-2029' },
  { name: 'Youth Population', value: 70, full: '60% of population under 30' },
  { name: 'Export Growth', value: 75, full: '27% export surge 2024' },
  { name: 'Local Sourcing', value: 80, full: '$515M agricultural investment' },
  { name: 'Digitization', value: 65, full: 'E-commerce expansion' },
]

const SWOT_DATA = [
  { subject: 'Market Position', A: 90, B: 85, C: 80, fullMark: '#1 FMCG player' },
  { subject: 'Distribution', A: 88, B: 82, C: 75, fullMark: '34 centers nationwide' },
  { subject: 'Brand Equity', A: 85, B: 78, C: 70, fullMark: 'Strong youth connection' },
  { subject: 'Investment', A: 80, B: 72, C: 65, fullMark: '$515M committed' },
  { subject: 'Product Mix', A: 75, B: 68, C: 60, fullMark: 'Beverages + Snacks' },
  { subject: 'Competitive Threat', A: 65, B: 58, C: 50, fullMark: 'Coca-Cola gaining' },
  { subject: 'Currency Risk', A: 60, B: 52, C: 45, fullMark: 'EGP volatility' },
  { subject: 'Health Trends', A: 55, B: 48, C: 40, fullMark: 'Sugar-conscious shift' },
]

const KPIS = [
  { label: 'Market Position', value: '#1', sub: 'FMCG in Egypt', color: GOLD },
  { label: 'Total Investment', value: '$515M', sub: 'Over 5 years', color: GREEN },
  { label: 'Employees', value: '14,000', sub: 'Direct workforce', color: BLUE },
  { label: 'Distribution', value: '34', sub: 'Centers nationwide', color: PURPLE },
]

const tabs = [
  { id: 'overview', label: 'EXECUTIVE OVERVIEW' },
  { id: 'market', label: 'MARKET SIZE' },
  { id: 'competitors', label: 'COMPETITIVE LANDSCAPE' },
  { id: 'brands', label: 'BRAND PORTFOLIO' },
  { id: 'operations', label: 'OPERATIONS' },
  { id: 'swot', label: 'SWOT ANALYSIS' },
  { id: 'investments', label: 'INVESTMENTS' },
  { id: 'growth', label: 'GROWTH DRIVERS' },
]

export default function PepsiEgypt360Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div style={{ background: NAVY, minHeight: '100vh', padding: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #1E3A5F' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <PepsiLogo />
          <div>
            <div style={{ color: '#fff', fontSize: '24px', fontWeight: 700 }}>Pepsi Egypt</div>
            <div style={{ color: '#888', fontSize: '12px', fontFamily: 'monospace' }}>360° INTELLIGENCE // FMCG / BEVERAGES</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ background: '#111', padding: '8px 16px', borderRadius: '6px', border: '1px solid #222' }}>
            <div style={{ color: '#666', fontSize: '10px' }}>RESEARCH STATUS</div>
            <div style={{ color: GREEN, fontSize: '14px', fontWeight: 600 }}>V1 COMPLETE</div>
          </div>
          <div style={{ background: '#111', padding: '8px 16px', borderRadius: '6px', border: '1px solid #222' }}>
            <div style={{ color: '#666', fontSize: '10px' }}>CONFIDENCE</div>
            <div style={{ color: BLUE, fontSize: '14px', fontWeight: 600 }}>HIGH</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '8px' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 20px',
              background: activeTab === tab.id ? BLUE : 'transparent',
              color: activeTab === tab.id ? '#fff' : '#888',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              fontFamily: 'monospace',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {KPIS.map((kpi, i) => (
          <KPITile key={i} {...kpi} />
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          <Card title="MARKET OVERVIEW">
            <div style={{ color: '#fff', fontSize: '18px', marginBottom: '16px', fontWeight: 600 }}>
              Egypt Soft Drinks Market
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={MARKET_DATA}>
                <defs>
                  <linearGradient id="colorAtHome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={BLUE} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={BLUE} stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorOutHome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={GOLD} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={GOLD} stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} tickFormatter={(v) => `$${v}B`} />
                <Tooltip contentStyle={{ background: '#0f1825', border: '1px solid #333', borderRadius: '8px' }} />
                <Legend />
                <Area type="monotone" dataKey="atHome" stroke={BLUE} fillOpacity={1} fill="url(#colorAtHome)" name="At-Home ($B)" />
                <Area type="monotone" dataKey="outHome" stroke={GOLD} fillOpacity={1} fill="url(#colorOutHome)" name="Out-of-Home ($B)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
          <Card title="KEY INSIGHTS">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: '#111', padding: '16px', borderRadius: '8px', borderLeft: `3px solid ${GOLD}` }}>
                <div style={{ color: GOLD, fontSize: '12px', marginBottom: '8px' }}>KEY FINDING</div>
                <div style={{ color: '#fff', fontSize: '14px', lineHeight: 1.6 }}>
                  PepsiCo Egypt maintains dominant #1 position in the Egyptian FMCG market with $515M invested over 5 years.
                </div>
              </div>
              <div style={{ background: '#111', padding: '16px', borderRadius: '8px', borderLeft: `3px solid ${BLUE}` }}>
                <div style={{ color: BLUE, fontSize: '12px', marginBottom: '8px' }}>GROWTH OPPORTUNITY</div>
                <div style={{ color: '#fff', fontSize: '14px', lineHeight: 1.6 }}>
                  Market growing at 11.58% CAGR with young population (60% under 30) providing decades of consumption growth.
                </div>
              </div>
              <div style={{ background: '#111', padding: '16px', borderRadius: '8px', borderLeft: `3px solid ${GREEN}` }}>
                <div style={{ color: GREEN, fontSize: '12px', marginBottom: '8px' }}>LOCAL SOURCE</div>
                <div style={{ color: '#fff', fontSize: '14px', lineHeight: 1.6 }}>
                  $515M agricultural investment creates supply chain resilience and government goodwill.
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'market' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <Card title="MARKET SIZE & GROWTH">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ textAlign: 'center', padding: '20px', background: '#0a1525', borderRadius: '8px' }}>
                <div style={{ color: BLUE, fontSize: '32px', fontWeight: 700 }}>$12.32B</div>
                <div style={{ color: '#888', fontSize: '12px' }}>Total Market (2025)</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', background: '#0a1525', borderRadius: '8px' }}>
                <div style={{ color: GREEN, fontSize: '32px', fontWeight: 700 }}>11.58%</div>
                <div style={{ color: '#888', fontSize: '12px' }}>CAGR 2025-2029</div>
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={MARKET_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis dataKey="name" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip contentStyle={{ background: '#0f1825', border: '1px solid #333' }} />
                  <Bar dataKey="total" fill={BLUE} name="Total Market ($B)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card title="MARKET SEGMENTS">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'At-Home', value: 9.25 },
                    { name: 'Out-of-Home', value: 3.07 },
                  ]}
                  cx="50%" cy="50%" innerRadius={60} outerRadius={100}
                  dataKey="value" label={({ name, value }) => `$${value}B`}
                >
                  {[BLUE, GOLD].map((color, i) => <Cell key={i} fill={color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#0f1825', border: '1px solid #333' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {activeTab === 'competitors' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <Card title="MARKET SHARE">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={COMPETITOR_DATA}
                  cx="50%" cy="50%" outerRadius={100}
                  dataKey="share" nameKey="name"
                  label={({ name, share }) => `${name}: ${share}%`}
                >
                  {COMPETITOR_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0f1825', border: '1px solid #333' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
          <Card title="COMPETITIVE ANALYSIS">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {COMPETITOR_DATA.slice(0, 4).map((comp, i) => (
                <div key={i} style={{ background: '#0a1525', padding: '12px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: comp.color }} />
                    <span style={{ color: '#fff', fontSize: '14px' }}>{comp.name}</span>
                  </div>
                  <span style={{ color: comp.color, fontSize: '16px', fontWeight: 600 }}>{comp.share}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'brands' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <Card title="BRAND PORTFOLIO">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={BRAND_DATA} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis type="number" stroke="#666" />
                <YAxis dataKey="name" type="category" stroke="#666" width={80} />
                <Tooltip contentStyle={{ background: '#0f1825', border: '1px solid #333' }} />
                <Bar dataKey="value" fill={BLUE} name="Brand Value %" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card title="KEY BRANDS">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Pepsi', '7UP', 'Chipsy', 'Gatorade', 'Doritos', 'Lay\'s', 'Mirinda', 'Mountain Dew', 'Sting', 'Aquafina'].map((brand, i) => (
                <div key={i} style={{ background: i < 5 ? BLUE : '#222', color: '#fff', padding: '8px 16px', borderRadius: '20px', fontSize: '12px' }}>
                  {brand}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'operations' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <Card title="EMPLOYMENT BY REGION">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={REGIONAL_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="name" stroke="#666" fontSize={10} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip contentStyle={{ background: '#0f1825', border: '1px solid #333' }} />
                <Bar dataKey="employees" fill={BLUE} name="Employees" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card title="INFRASTRUCTURE">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ background: '#0a1525', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ color: '#004B93', fontSize: '28px', fontWeight: 700 }}>8</div>
                <div style={{ color: '#888', fontSize: '12px' }}>Production Facilities</div>
              </div>
              <div style={{ background: '#0a1525', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ color: '#004B93', fontSize: '28px', fontWeight: 700 }}>34</div>
                <div style={{ color: '#888', fontSize: '12px' }}>Distribution Centers</div>
              </div>
              <div style={{ background: '#0a1525', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ color: '#004B93', fontSize: '28px', fontWeight: 700 }}>14K</div>
                <div style={{ color: '#888', fontSize: '12px' }}>Direct Employees</div>
              </div>
              <div style={{ background: '#0a1525', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ color: '#004B93', fontSize: '28px', fontWeight: 700 }}>$515M</div>
                <div style={{ color: '#888', fontSize: '12px' }}>5-Year Investment</div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'swot' && (
        <Card title="SWOT ANALYSIS">
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={SWOT_DATA}>
              <PolarGrid stroke="#333" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 11 }} />
              <Radar name="Strength" dataKey="A" stroke={GREEN} fill={GREEN} fillOpacity={0.3} />
              <Radar name="Opportunity" dataKey="B" stroke={BLUE} fill={BLUE} fillOpacity={0.3} />
              <Radar name="Risk" dataKey="C" stroke={RED} fill={RED} fillOpacity={0.3} />
              <Legend />
              <Tooltip contentStyle={{ background: '#0f1825', border: '1px solid #333' }} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      )}

      {activeTab === 'investments' && (
        <Card title="INVESTMENT TREND ($M)">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={INVESTMENT_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip contentStyle={{ background: '#0f1825', border: '1px solid #333' }} />
              <Area type="monotone" dataKey="value" stroke={GOLD} fill={GOLD} fillOpacity={0.3} name="Investment ($M)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      )}

      {activeTab === 'growth' && (
        <Card title="GROWTH DRIVERS">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {GROWTH_DRIVERS.map((driver, i) => (
              <div key={i} style={{ background: '#0a1525', padding: '16px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#fff', fontSize: '14px' }}>{driver.name}</span>
                  <span style={{ color: COLORS[i % COLORS.length], fontSize: '14px', fontWeight: 600 }}>{driver.value}%</span>
                </div>
                <div style={{ height: '6px', background: '#222', borderRadius: '3px' }}>
                  <div style={{ height: '100%', width: `${driver.value}%`, background: COLORS[i % COLORS.length], borderRadius: '3px' }} />
                </div>
                <div style={{ color: '#666', fontSize: '11px', marginTop: '8px' }}>{driver.full}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Footer */}
      <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #1E3A5F', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ color: '#444', fontSize: '11px', fontFamily: 'monospace' }}>
          DATA SOURCES: PepsiCo Egypt, Statista, Euromonitor, LinkedIn, Company Filings
        </div>
        <div style={{ color: '#444', fontSize: '11px', fontFamily: 'monospace' }}>
          SMARTPRODS RESEARCH ENGINE // APRIL 2026
        </div>
      </div>
    </div>
  )
}