/**
 * Talabat Egypt Dashboard
 * Generated: 2026-04-19
 * Data Source: Synthetic Model Data (LOW Confidence)
 * 
 * Usage: Import into your React/Vite website
 * import TalabatDashboard from './talabat_dashboard.jsx';
 * 
 * Theme: NIQ Branding (#003087 navy, #FFB81C gold)
 */

import React, { useState, useMemo } from 'react';

// ========================================
// THEME CONSTANTS
// ========================================
const THEME = {
  navy: '#003087',
  navyLight: '#1E4BA3',
  gold: '#FFB81C',
  goldLight: '#FFD166',
  bg: '#0A0A0A',
  card: '#111111',
  border: '#1E1E1E',
  text: '#F5F5F5',
  textMuted: '#9CA3AF',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
};

// ========================================
// DATA (Embedded - replace with API call)
// ========================================
const DATA = {
  is_synthetic: true,
  confidence_level: 'LOW',
  confidence_message: '⚠️ SYNTHETIC MODEL DATA - For scenario planning only',
  survey_source: 'talabat_v1_v2_deep_dive',
  wave_date: '2026-04-01',
  
  // Consumer Survey Data
  consumer: {
    total_responses: 200,
    nps: 42,
    satisfaction_avg: 3.4,
    segments: [
      { id: 'convenience', name: 'Convenience Seekers', share: 38, nps: 52 },
      { id: 'price', name: 'Price Optimizers', share: 25, nps: 28 },
      { id: 'quality', name: 'Quality Focus', share: 18, nps: 61 },
      { id: 'variety', name: 'Variety Explorers', share: 12, nps: 45 },
      { id: 'loyal', name: 'Loyal Advocates', share: 7, nps: 89 },
    ],
    by_city: [
      { city: 'Cairo', share: 48, nps: 44 },
      { city: 'Alexandria', share: 22, nps: 40 },
      { city: 'Giza', share: 12, nps: 38 },
      { city: 'Other', share: 18, nps: 41 },
    ],
    by_age: [
      { age: '18-24', share: 35, nps: 38 },
      { age: '25-34', share: 42, nps: 45 },
      { age: '35-44', share: 15, nps: 48 },
      { age: '45+', share: 8, nps: 42 },
    ],
  },

  // Restaurant Partner Survey Data
  partner: {
    total_responses: 200,
    nps: 28,
    satisfaction_avg: 2.9,
    switching_risk: 58,
    commission_concern: 65,
    by_restaurant_type: [
      { type: 'Independent', share: 52, satisfaction: 2.7 },
      { type: 'Chain', share: 23, satisfaction: 3.4 },
      { type: 'Cloud Kitchen', share: 15, satisfaction: 2.1 },
      { type: 'Café', share: 10, satisfaction: 3.1 },
    ],
    by_city: [
      { city: 'Cairo', share: 48, satisfaction: 3.0 },
      { city: 'Alexandria', share: 22, satisfaction: 2.8 },
      { city: 'Giza', share: 12, satisfaction: 2.7 },
      { city: 'Other', share: 18, satisfaction: 2.9 },
    ],
  },
};

// ========================================
// STYLED COMPONENTS (Inline for portability)
// ========================================
const Box = ({ children, bg, p, m, ...props }) => (
  <div style={{ backgroundColor: bg || 'transparent', padding: p || 0, margin: m || 0, ...props }}>{children}</div>
);

const Flex = ({ children, gap, direction = 'row', align = 'stretch', justify = 'start', ...props }) => (
  <div style={{ 
    display: 'flex', 
    flexDirection: direction, 
    gap: gap || 0, 
    alignItems: align, 
    justifyContent: justify,
    ...props 
  }}>{children}</div>
);

const Grid = ({ children, columns = 4, gap = 4, ...props }) => (
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: `repeat(${columns}, 1fr)`, 
    gap: `${gap}rem`,
    ...props 
  }}>{children}</div>
);

const Card = ({ children, title, highlight }) => (
  <Box bg={THEME.card} p={4} style={{ borderRadius: 12, border: `1px solid ${THEME.border}` }}>
    {title && (
      <Box mb={3}>
        <h3 style={{ color: highlight ? THEME.gold : THEME.text, margin: 0, fontSize: '0.875rem', fontWeight: 600 }}>
          {title}
        </h3>
      </Box>
    )}
    {children}
  </Box>
);

const Text = ({ children, size = 'base', color = THEME.text, weight = 'normal', ...props }) => (
  <span style={{ 
    fontSize: size === 'xl' ? '1.5rem' : size === 'lg' ? '1.125rem' : size === 'sm' ? '0.875rem' : '1rem',
    color, 
    fontWeight: weight,
    ...props 
  }}>{children}</span>
);

const Badge = ({ children, color = THEME.navy }) => (
  <span style={{ 
    backgroundColor: color, 
    color: '#fff', 
    padding: '2px 8px', 
    borderRadius: 4, 
    fontSize: '0.75rem',
    fontWeight: 600 
  }}>
    {children}
  </span>
);

// ========================================
// CHART COMPONENTS (Simple SVG)
// ========================================
const BarChart = ({ data, labelKey = 'name', valueKey = 'value', horizontal = false, color = THEME.navy }) => {
  const max = Math.max(...data.map(d => d[valueKey]));
  
  return (
    <Box>
      {data.map((item, i) => (
        <Flex key={i} align="center" gap={2} mb={2}>
          {!horizontal && (
            <Text size="sm" style={{ width: 100 }}>{item[labelKey]}</Text>
          )}
          <Box style={{ flex: 1, height: 24, backgroundColor: THEME.border, borderRadius: 4, overflow: 'hidden' }}>
            <Box 
              style={{ 
                width: `${(item[valueKey] / max) * 100}%`, 
                height: '100%', 
                backgroundColor: color,
                borderRadius: 4,
                transition: 'width 0.3s ease'
              }} 
            />
          </Box>
          {horizontal && (
            <Text size="sm" style={{ width: 40 }}>{item[valueKey]}</Text>
          )}
        </Flex>
      ))}
    </Box>
  );
};

const DonutChart = ({ data, valueKey = 'share', nameKey = 'name', colors = [THEME.navy, THEME.gold, '#22C55E', '#A855F7', '#EF4444'] }) => {
  const total = data.reduce((sum, d) => sum + d[valueKey], 0);
  let cumulative = 0;
  
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  
  return (
    <Flex justify="center" align="center" gap={4}>
      <svg width="160" height="160" viewBox="0 0 160 160">
        {data.map((item, i) => {
          const percent = item[valueKey] / total;
          const offset = cumulative;
          cumulative += percent;
          const dashArray = percent * circumference;
          const dashOffset = circumference * 0.25 - offset;
          
          return (
            <circle
              key={i}
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={colors[i % colors.length]}
              strokeWidth="20"
              strokeDasharray={`${dashArray} ${circumference}`}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 80 80)"
            />
          );
        })}
        <text x="80" y="80" textAnchor="middle" fill={THEME.text} fontSize="24" fontWeight="bold">
          {total}%
        </text>
      </svg>
      <Box>
        {data.map((item, i) => (
          <Flex key={i} align="center" gap={2} mb={1}>
            <Box style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: colors[i % colors.length] }} />
            <Text size="sm">{item[nameKey]}: {item[valueKey]}%</Text>
          </Flex>
        ))}
      </Box>
    </Flex>
  );
};

const TrendLine = ({ data, valueKey = 'value', labelKey = 'label' }) => {
  const max = Math.max(...data.map(d => d[valueKey]));
  const min = Math.min(...data.map(d => d[valueKey]));
  const range = max - min || 1;
  
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 280;
    const y = 80 - ((d[valueKey] - min) / range) * 60;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <svg width="300" height="100" viewBox="0 0 300 100">
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
        <line 
          key={i}
          x1="0" 
          y1={p * 80 + 10} 
          x2="280" 
          y2={p * 80 + 10} 
          stroke={THEME.border} 
          strokeWidth="1" 
        />
      ))}
      
      {/* Line */}
      <polyline
        fill="none"
        stroke={THEME.gold}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
      
      {/* Points */}
      {data.map((d, i) => {
        const x = (i / (data.length - 1)) * 280;
        const y = 80 - ((d[valueKey] - min) / range) * 60;
        return <circle key={i} cx={x} cy={y} r="4" fill={THEME.gold} />;
      })}
      
      {/* Labels */}
      {data.map((d, i) => {
        const x = (i / (data.length - 1)) * 280;
        return (
          <text key={i} x={x} y="95" fill={THEME.textMuted} fontSize="10" textAnchor="middle">
            {d[labelKey]}
          </text>
        );
      })}
    </svg>
  );
};

// ========================================
// MAIN DASHBOARD COMPONENT
// ========================================
export default function TalabatDashboard({ 
  data = DATA,
  showDisclaimer = true,
  theme = THEME 
}) {
  const [activeTab, setActiveTab] = useState('summary');
  const [activeSurvey, setActiveSurvey] = useState('all');

  // KPI Cards Data
  const kpis = useMemo(() => [
    { 
      label: 'Consumer NPS', 
      value: data.consumer.nps, 
      change: null, 
      status: data.consumer.nps >= 50 ? 'good' : data.consumer.nps >= 0 ? 'warning' : 'bad',
      survey: 'consumer'
    },
    { 
      label: 'Partner NPS', 
      value: data.partner.nps, 
      change: null, 
      status: data.partner.nps >= 50 ? 'good' : data.partner.nps >= 0 ? 'warning' : 'bad',
      survey: 'partner'
    },
    { 
      label: 'Partner Switching Risk', 
      value: `${data.partner.switching_risk}%`, 
      change: null, 
      status: data.partner.switching_risk > 50 ? 'bad' : data.partner.switching_risk > 30 ? 'warning' : 'good',
      survey: 'partner'
    },
    { 
      label: 'Total Responses', 
      value: data.consumer.total_responses + data.partner.total_responses, 
      change: null, 
      status: 'neutral',
      survey: 'all'
    },
  ], [data]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return theme.success;
      case 'warning': return theme.warning;
      case 'bad': return theme.danger;
      default: return theme.textMuted;
    }
  };

  return (
    <Box bg={theme.bg} minH="100vh" fontFamily="system-ui, sans-serif">
      {/* ======================================== */}
      {/* HEADER */}
      {/* ======================================== */}
      <Box bg={theme.navy} p={4}>
        <Flex justify="space-between" align="center">
          <Box>
            <Text size="xl" weight="bold" color={theme.gold}>
              Talabat Egypt
            </Text>
            <Text size="sm" color="white" opacity={0.8}>
              Deep Dive Research Dashboard
            </Text>
          </Box>
          <Flex gap={2}>
            <Badge>{data.wave_date}</Badge>
            <Badge color={data.is_synthetic ? theme.warning : theme.success}>
              {data.is_synthetic ? 'SYNTHETIC' : 'REAL DATA'}
            </Badge>
          </Flex>
        </Flex>
      </Box>

      {/* ======================================== */}
      {/* DATA CONFIDENCE DISCLAIMER */}
      {/* ======================================== */}
      {showDisclaimer && data.is_synthetic && (
        <Box 
          bg={theme.warning} 
          p={3} 
          style={{ opacity: 0.9 }}
        >
          <Flex align="center" gap={2}>
            <Text weight="bold" color="#000">⚠️ LOW DATA CONFIDENCY</Text>
            <Text color="#000" size="sm">
              {data.confidence_message} - Results are based on synthetic model data derived from V1/V2 deep dive personas. 
              Not suitable for production decisions without real field validation.
            </Text>
          </Flex>
        </Box>
      )}

      {/* ======================================== */}
      {/* TAB NAVIGATION */}
      {/* ======================================== */}
      <Box bg={theme.card} p={3} borderBottom={`1px solid ${theme.border}`}>
        <Flex gap={2}>
          {['summary', 'segments', 'partners', 'trends'].map(tab => (
            <Box
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                cursor: 'pointer',
                backgroundColor: activeTab === tab ? theme.navy : 'transparent',
                color: activeTab === tab ? '#fff' : theme.textMuted,
                transition: 'all 0.2s ease'
              }}
            >
              <Text 
                weight={activeTab === tab ? 600 : 400}
                color={activeTab === tab ? '#fff' : theme.textMuted}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </Box>
          ))}
        </Flex>
      </Box>

      {/* ======================================== */}
      {/* MAIN CONTENT */}
      {/* ======================================== */}
      <Box p={6}>
        
        {/* KPI CARDS */}
        {activeTab === 'summary' && (
          <>
            <Grid columns={4} gap={4} mb={6}>
              {kpis.map((kpi, i) => (
                <Card key={i} title={kpi.label} highlight>
                  <Flex align="baseline" gap={2}>
                    <Text size="xl" weight="bold" color={getStatusColor(kpi.status)}>
                      {kpi.value}
                    </Text>
                    {kpi.change && (
                      <Text size="sm" color={kpi.change > 0 ? theme.success : theme.danger}>
                        {kpi.change > 0 ? '+' : ''}{kpi.change}%
                      </Text>
                    )}
                  </Flex>
                </Card>
              ))}
            </Grid>

            {/* CHARTS ROW */}
            <Grid columns={2} gap={6}>
              {/* Consumer Segments */}
              <Card title="Consumer Segments">
                <DonutChart 
                  data={data.consumer.segments} 
                  valueKey="share" 
                  nameKey="name"
                />
              </Card>

              {/* City Distribution */}
              <Card title="Consumer by City">
                <BarChart 
                  data={data.consumer.by_city.map(c => ({ name: c.city, value: c.share }))}
                  color={theme.navy}
                />
              </Card>

              {/* Partner Restaurant Types */}
              <Card title="Partner by Restaurant Type">
                <BarChart 
                  data={data.partner.by_restaurant_type.map(r => ({ name: r.type, value: r.share }))}
                  color={theme.gold}
                />
              </Card>

              {/* Partner by City */}
              <Card title="Partner by City">
                <BarChart 
                  data={data.partner.by_city.map(c => ({ name: c.city, value: c.share }))}
                  color={theme.gold}
                />
              </Card>
            </Grid>
          </>
        )}

        {/* SEGMENTS TAB */}
        {activeTab === 'segments' && (
          <>
            <Text size="lg" weight="bold" mb={4}>Consumer Segment Analysis</Text>
            <Grid columns={3} gap={4}>
              {data.consumer.segments.map((segment, i) => (
                <Card key={i} title={segment.name}>
                  <Flex direction="column" gap={3}>
                    <Flex justify="space-between" align="center">
                      <Text size="sm" color={theme.textMuted}>Share</Text>
                      <Text weight="bold">{segment.share}%</Text>
                    </Flex>
                    <Box style={{ height: 8, backgroundColor: theme.border, borderRadius: 4 }}>
                      <Box style={{ width: `${segment.share}%`, height: '100%', backgroundColor: theme.navy, borderRadius: 4 }} />
                    </Box>
                    <Flex justify="space-between" align="center">
                      <Text size="sm" color={theme.textMuted}>NPS</Text>
                      <Badge color={segment.nps >= 50 ? theme.success : segment.nps >= 30 ? theme.warning : theme.danger}>
                        {segment.nps}
                      </Badge>
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </Grid>
          </>
        )}

        {/* PARTNERS TAB */}
        {activeTab === 'partners' && (
          <>
            <Grid columns={2} gap={6}>
              <Card title="Restaurant Partner Satisfaction">
                <Box mb={4}>
                  <Flex justify="space-between" mb={2}>
                    <Text>Overall NPS</Text>
                    <Text weight="bold" color={data.partner.nps >= 30 ? theme.warning : theme.danger}>
                      {data.partner.nps}
                    </Text>
                  </Flex>
                  <Box style={{ height: 12, backgroundColor: theme.border, borderRadius: 6 }}>
                    <Box 
                      style={{ 
                        width: `${Math.max(0, Math.min(100, data.partner.nps + 50))}%`, 
                        height: '100%', 
                        backgroundColor: data.partner.nps >= 30 ? theme.warning : theme.danger,
                        borderRadius: 6 
                      }} 
                    />
                  </Box>
                </Box>
                <Box>
                  <Flex justify="space-between" mb={2}>
                    <Text>Switching Risk</Text>
                    <Text weight="bold" color={data.partner.switching_risk > 50 ? theme.danger : theme.warning}>
                      {data.partner.switching_risk}%
                    </Text>
                  </Flex>
                  <Box style={{ height: 12, backgroundColor: theme.border, borderRadius: 6 }}>
                    <Box 
                      style={{ 
                        width: `${data.partner.switching_risk}%`, 
                        height: '100%', 
                        backgroundColor: data.partner.switching_risk > 50 ? theme.danger : theme.warning,
                        borderRadius: 6 
                      }} 
                    />
                  </Box>
                </Box>
              </Card>

              <Card title="Key Partner Metrics">
                <Flex direction="column" gap={3}>
                  <Flex justify="space-between">
                    <Text color={theme.textMuted}>Commission Concern</Text>
                    <Text weight="bold">{data.partner.commission_concern}%</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text color={theme.textMuted}>Avg Satisfaction</Text>
                    <Text weight="bold">{data.partner.satisfaction_avg}/5</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text color={theme.textMuted}>Total Partners</Text>
                    <Text weight="bold">{data.partner.total_responses}</Text>
                  </Flex>
                </Flex>
              </Card>
            </Grid>
          </>
        )}

        {/* TRENDS TAB */}
        {activeTab === 'trends' && (
          <>
            <Card title="NPS Trend (Tracking)">
              <Flex justify="center" align="center" p={4}>
                <Box textAlign="center">
                  <Text color={theme.textMuted} mb={2}>Single wave data - Add future waves to see trends</Text>
                  <TrendLine 
                    data={[
                      { label: 'W1', value: data.consumer.nps },
                    ]} 
                  />
                </Box>
              </Flex>
            </Card>
            <Box mt={4}>
              <Text color={theme.textMuted} size="sm">
                📊 Tracking enabled: Next wave due Q2 2026. Add new survey data to enable trend analysis.
              </Text>
            </Box>
          </>
        )}
      </Box>

      {/* ======================================== */}
      {/* FOOTER */}
      {/* ======================================== */}
      <Box 
        p={4} 
        borderTop={`1px solid ${theme.border}`}
        textAlign="center"
      >
        <Text size="xs" color={theme.textMuted}>
          Talabat Egypt Dashboard | Generated: 2026-04-19 | 
          Data: {data.is_synthetic ? 'Synthetic Model (LOW Confidence)' : 'Primary Research'} |
          Source: Deep Dive V1 + V2
        </Text>
      </Box>
    </Box>
  );
}

// ========================================
// DEFAULT EXPORT
// ========================================
export { TalabatDashboard as default };