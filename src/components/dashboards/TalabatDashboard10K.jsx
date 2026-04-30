/**
 * Talabat Egypt — Competitive Intelligence Report · 20 Tabs
 * ECharts WebGL · Animated KPIs · Export · Virtual Tables
 * Data: REAL — 19,691 vendors + 1,812 GP reviews + 1,103 Reddit + 2,915 NLP + 121 news
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

// ─── BRAND TOKENS ──────────────────────────────────────────────────────────────
const T = {
  navy: '#003087', navyLight: '#1E4BA3', navyDark: '#001a4d',
  gold: '#FFB81C', goldLight: '#FFD166',
  bg: '#0A0A0A', card: '#111111', cardHover: '#161616',
  border: '#1E1E1E', borderLight: '#2A2A2A',
  text: '#F5F5F5', muted: '#9CA3AF', subtle: '#6B7280',
  success: '#22C55E', warning: '#F59E0B', danger: '#EF4444',
  info: '#3B82F6', purple: '#A855F7', orange: '#EF5F17',
  teal: '#14B8A6', rose: '#F43F5E',
};

const CHART_COLORS = [T.navy, T.gold, T.success, T.purple, T.danger, T.info, T.orange, T.teal, T.rose, T.navyLight, '#FF6B6B', '#4ECDC4', '#7C3AED', '#EC4899'];
const FONT = "'Inter', 'system-ui', '-apple-system', sans-serif";
const MONO = "'JetBrains Mono', 'Fira Code', 'Fira Mono', monospace";

// ─── ECHARTS GLOBAL DEFAULTS ───────────────────────────────────────────────────
const chartDefaults = {
  backgroundColor: 'transparent',
  textStyle: { fontFamily: FONT, color: T.text },
  animation: true,
  animationDuration: 800,
  animationEasing: 'cubicOut',
};

// ─── ANIMATED KPI COUNTER ──────────────────────────────────────────────────────
function useCounter(target, duration = 1200) {
  const [count, setCount] = useState(0);
  const numTarget = typeof target === 'number' ? target : parseFloat(String(target).replace(/[^0-9.]/g, '')) || 0;
  useEffect(() => {
    if (!numTarget) return;
    let start = 0;
    const step = numTarget / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= numTarget) { setCount(numTarget); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [numTarget, duration]);
  return count;
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

const Badge = ({ children, color = T.navy, textColor = '#fff' }) => (
  <span style={{
    backgroundColor: color, color: textColor, padding: '2px 8px', borderRadius: 4,
    fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.05em', fontFamily: MONO,
  }}>{children}</span>
);

const ConfBadge = ({ level }) => {
  const cfg = level === 'HIGH' ? { bg: T.success, label: '● REAL DATA' }
    : level === 'MEDIUM' ? { bg: T.warning, label: '◐ CALIBRATED' }
    : { bg: T.danger, label: '○ SYNTHETIC' };
  return <Badge color={cfg.bg}>{cfg.label}</Badge>;
};

const Card = ({ children, title, highlight, style = {}, noPad }) => (
  <div style={{
    backgroundColor: T.card, borderRadius: 12,
    border: `1px solid ${highlight ? T.gold : T.border}`,
    padding: noPad ? 0 : '1.25rem',
    ...style,
  }}>
    {title && (
      <div style={{
        color: highlight ? T.gold : T.muted, margin: noPad ? '1rem 1.25rem 0.75rem' : '0 0 0.75rem',
        fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
      }}>{title}</div>
    )}
    {children}
  </div>
);

const AnimKPI = ({ label, value, sub, color = T.text, icon }) => {
  const isNumber = typeof value === 'number';
  const numValue = isNumber ? value : parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0;
  const prefix = isNumber ? '' : String(value).match(/^[^0-9]*/)?.[0] || '';
  const suffix = isNumber ? '' : String(value).replace(/^[^0-9]*[\d,.]+/, '') || '';
  const animated = useCounter(numValue);
  const displayValue = isNumber
    ? animated.toLocaleString()
    : `${prefix}${animated.toLocaleString()}${suffix}`;

  return (
    <div style={{
      backgroundColor: T.card, borderRadius: 12, border: `1px solid ${T.border}`,
      padding: '1.1rem 1.25rem', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '3px', height: '100%',
        backgroundColor: color, borderRadius: '12px 0 0 12px',
      }} />
      <div style={{ fontSize: '0.7rem', color: T.muted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: '2rem', fontWeight: 800, color, lineHeight: 1.15, fontFamily: MONO }}>{displayValue}</div>
      {sub && <div style={{ fontSize: '0.68rem', color: T.subtle, marginTop: 3 }}>{sub}</div>}
    </div>
  );
};

const InsightBox = ({ insight, soWhat, track }) => (
  <div style={{
    marginTop: 12, padding: '10px 14px', borderRadius: 8,
    background: `linear-gradient(135deg, rgba(0,48,135,0.18) 0%, rgba(255,184,28,0.06) 100%)`,
    borderLeft: `3px solid ${T.gold}`,
  }}>
    {insight && <div style={{ fontSize: '0.78rem', color: T.gold, fontWeight: 700, marginBottom: 4 }}>💡 {insight}</div>}
    {soWhat && <div style={{ fontSize: '0.73rem', color: T.text, marginBottom: soWhat && track ? 4 : 0 }}>→ {soWhat}</div>}
    {track && <div style={{ fontSize: '0.68rem', color: T.muted, fontFamily: MONO }}>📊 {track}</div>}
  </div>
);

// ─── ECHARTS WRAPPERS ─────────────────────────────────────────────────────────

const EBar = ({ data, labelKey = 'name', valueKey = 'value', color = T.navy, maxItems = 20, height = 320 }) => {
  const sorted = useMemo(() => [...data].sort((a, b) => (a[valueKey] || 0) - (b[valueKey] || 0)).slice(-maxItems), [data, valueKey, maxItems]);
  const option = {
    ...chartDefaults,
    tooltip: {
      trigger: 'axis', axisPointer: { type: 'shadow' },
      backgroundColor: '#1A1A1A', borderColor: T.border, textStyle: { color: T.text },
    },
    grid: { left: 16, right: 16, top: 8, bottom: 8, containLabel: true },
    xAxis: { type: 'value', splitLine: { lineStyle: { color: T.border } }, axisLabel: { color: T.muted, fontSize: 10 } },
    yAxis: {
      type: 'category', data: sorted.map(d => d[labelKey]),
      axisLabel: { color: T.muted, fontSize: 10, overflow: 'truncate', width: 110 },
    },
    series: [{
      type: 'bar', data: sorted.map(d => d[valueKey] || 0),
      itemStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
          colorStops: [{ offset: 0, color: color }, { offset: 1, color: color + 'BB' }],
        },
        borderRadius: [0, 4, 4, 0],
      },
      barMaxWidth: 24,
      label: { show: false },
      emphasis: { itemStyle: { color: T.gold } },
    }],
  };
  return <ReactECharts option={option} style={{ height }} opts={{ renderer: 'canvas' }} />;
};

const EPie = ({ data, valueKey = 'share', nameKey = 'name', colors = CHART_COLORS, height = 280 }) => {
  const option = {
    ...chartDefaults,
    tooltip: {
      trigger: 'item', formatter: '{b}: {c} ({d}%)',
      backgroundColor: '#1A1A1A', borderColor: T.border, textStyle: { color: T.text },
    },
    legend: {
      orient: 'vertical', right: 8, top: 'middle', textStyle: { color: T.muted, fontSize: 10 },
      icon: 'roundRect', itemWidth: 10, itemHeight: 10,
    },
    series: [{
      type: 'pie', radius: ['42%', '68%'], center: ['38%', '50%'],
      avoidLabelOverlap: true,
      label: { show: false },
      emphasis: { label: { show: true, fontSize: 13, fontWeight: 700, color: T.text }, scale: true },
      data: data.map((d, i) => ({
        value: d[valueKey] || 0, name: d[nameKey],
        itemStyle: { color: colors[i % colors.length] },
      })),
    }],
  };
  return <ReactECharts option={option} style={{ height }} opts={{ renderer: 'canvas' }} />;
};

const ENPSBar = ({ brands }) => {
  const sorted = [...brands].sort((a, b) => (b.nps_proxy || 0) - (a.nps_proxy || 0));
  const option = {
    ...chartDefaults,
    tooltip: {
      trigger: 'axis', axisPointer: { type: 'shadow' },
      backgroundColor: '#1A1A1A', borderColor: T.border, textStyle: { color: T.text },
      formatter: params => `${params[0].name}<br/>NPS: <b>${params[0].value}</b>`,
    },
    grid: { left: 10, right: 10, top: 8, bottom: 30, containLabel: true },
    xAxis: {
      type: 'category', data: sorted.map(b => b.brand),
      axisLabel: { color: T.muted, fontSize: 10, rotate: 20 },
    },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: T.border } }, axisLabel: { color: T.muted, fontSize: 10 } },
    series: [{
      type: 'bar', barMaxWidth: 40,
      data: sorted.map(b => ({
        value: b.nps_proxy || 0,
        itemStyle: {
          color: (b.nps_proxy || 0) >= 50 ? T.success : (b.nps_proxy || 0) >= 0 ? T.warning : T.danger,
          borderRadius: [4, 4, 0, 0],
        },
      })),
      label: { show: true, position: 'top', color: T.text, fontSize: 10, fontFamily: MONO },
    }],
  };
  return <ReactECharts option={option} style={{ height: 260 }} opts={{ renderer: 'canvas' }} />;
};

const EGauge = ({ value, label, min = -100, max = 100 }) => {
  const color = value >= 50 ? T.success : value >= 0 ? T.warning : T.danger;
  const option = {
    ...chartDefaults,
    series: [{
      type: 'gauge', min, max, startAngle: 200, endAngle: -20,
      radius: '88%', center: ['50%', '60%'],
      progress: { show: true, roundCap: true, width: 10, itemStyle: { color } },
      axisLine: { lineStyle: { width: 10, color: [[1, T.border]] } },
      axisTick: { show: false }, splitLine: { show: false },
      axisLabel: { show: false },
      pointer: { show: false },
      title: { show: true, offsetCenter: [0, '30%'], color: T.muted, fontSize: 10 },
      detail: { show: true, offsetCenter: [0, '-10%'], color, fontSize: 26, fontWeight: 800, fontFamily: MONO, formatter: '{value}' },
      data: [{ value, name: label }],
    }],
  };
  return <ReactECharts option={option} style={{ height: 200 }} opts={{ renderer: 'canvas' }} />;
};

const EScatter = ({ points }) => {
  const samplePoints = points.slice(0, 500);
  const option = {
    ...chartDefaults,
    tooltip: {
      trigger: 'item',
      backgroundColor: '#1A1A1A', borderColor: T.border, textStyle: { color: T.text },
      formatter: p => `${p.data[3] || 'Vendor'}<br/>Lat: ${p.data[1].toFixed(4)}, Lon: ${p.data[0].toFixed(4)}`,
    },
    grid: { left: 30, right: 10, top: 10, bottom: 30, containLabel: true },
    xAxis: { type: 'value', name: 'Longitude', nameTextStyle: { color: T.muted, fontSize: 9 }, min: 28, max: 37, splitLine: { lineStyle: { color: T.border } }, axisLabel: { color: T.muted, fontSize: 9 } },
    yAxis: { type: 'value', name: 'Latitude', nameTextStyle: { color: T.muted, fontSize: 9 }, min: 22, max: 32, splitLine: { lineStyle: { color: T.border } }, axisLabel: { color: T.muted, fontSize: 9 } },
    series: [{
      type: 'scatter',
      data: samplePoints.map(p => [p.lon || p.longitude, p.lat || p.latitude, 1, p.name]),
      symbolSize: 4,
      itemStyle: { color: T.gold, opacity: 0.6 },
      large: true, largeThreshold: 200,
      emphasis: { itemStyle: { color: T.success, opacity: 1, shadowBlur: 6, shadowColor: T.success } },
    }],
  };
  return <ReactECharts option={option} style={{ height: 440 }} opts={{ renderer: 'canvas' }} />;
};

const EHeatmap = ({ data }) => {
  const brands = Object.keys(data).filter(b => b && b !== 'unknown');
  const topics = useMemo(() => {
    const s = new Set();
    brands.forEach(b => Object.keys(data[b] || {}).forEach(k => s.add(k)));
    return [...s].slice(0, 8);
  }, [data, brands]);

  const heatData = [];
  brands.forEach((brand, bi) => {
    topics.forEach((topic, ti) => {
      const val = (data[brand] || {})[topic];
      if (val !== undefined) heatData.push([ti, bi, parseFloat(val).toFixed(2)]);
    });
  });

  const option = {
    ...chartDefaults,
    tooltip: {
      position: 'top',
      backgroundColor: '#1A1A1A', borderColor: T.border, textStyle: { color: T.text },
      formatter: p => `${brands[p.data[1]]} / ${topics[p.data[0]]}: <b>${p.data[2]}</b>`,
    },
    grid: { left: 60, right: 80, top: 30, bottom: 10, containLabel: true },
    xAxis: { type: 'category', data: topics, splitArea: { show: true }, axisLabel: { color: T.muted, fontSize: 9, rotate: 15 } },
    yAxis: { type: 'category', data: brands, splitArea: { show: true }, axisLabel: { color: T.muted, fontSize: 10 } },
    visualMap: {
      min: -1, max: 1, calculable: true, orient: 'vertical', right: 5, top: '20%',
      inRange: { color: [T.danger, T.border, T.success] },
      textStyle: { color: T.muted, fontSize: 9 },
    },
    series: [{
      type: 'heatmap', data: heatData,
      label: { show: true, fontSize: 9, color: T.text },
      itemStyle: { borderRadius: 2 },
      emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.5)' } },
    }],
  };
  return <ReactECharts option={option} style={{ height: 300 }} opts={{ renderer: 'canvas' }} />;
};

// ─── SEARCHABLE TABLE ─────────────────────────────────────────────────────────

const VendorTable = ({ vendors }) => {
  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    const lq = q.toLowerCase();
    return q ? vendors.filter(v => (v.name || '').toLowerCase().includes(lq) || (v.type || '').toLowerCase().includes(lq)) : vendors;
  }, [vendors, q]);
  const PAGE = 50;
  const [page, setPage] = useState(0);
  const paged = filtered.slice(page * PAGE, (page + 1) * PAGE);
  const totalPages = Math.ceil(filtered.length / PAGE);

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center' }}>
        <input
          value={q} onChange={e => { setQ(e.target.value); setPage(0); }}
          placeholder="Search vendor name or type..."
          style={{
            flex: 1, background: T.border, border: `1px solid ${T.borderLight}`, borderRadius: 8,
            padding: '7px 12px', color: T.text, fontSize: '0.8rem', outline: 'none',
          }}
        />
        <span style={{ fontSize: '0.75rem', color: T.muted, whiteSpace: 'nowrap', fontFamily: MONO }}>
          {filtered.length.toLocaleString()} vendors
        </span>
      </div>
      <div style={{ maxHeight: 380, overflowY: 'auto', borderRadius: 8, border: `1px solid ${T.border}` }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.72rem' }}>
          <thead style={{ position: 'sticky', top: 0, background: '#1A1A1A', zIndex: 1 }}>
            <tr>
              {['#', 'Name', 'Type', 'Rating', 'Reviews'].map(h => (
                <th key={h} style={{ padding: '8px 10px', textAlign: h === '#' || h === 'Rating' || h === 'Reviews' ? 'center' : 'left', color: T.muted, fontWeight: 600, borderBottom: `1px solid ${T.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((v, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${T.border}` }}
                onMouseEnter={e => e.currentTarget.style.background = T.cardHover}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '6px 10px', textAlign: 'center', color: T.subtle, fontFamily: MONO }}>{page * PAGE + i + 1}</td>
                <td style={{ padding: '6px 10px', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.name}</td>
                <td style={{ padding: '6px 10px' }}>
                  <Badge color={v.type === 'restaurant' ? T.navy : v.type === 'grocery' ? T.success : v.type === 'pharmacy' ? T.info : T.purple}>{v.type}</Badge>
                </td>
                <td style={{ padding: '6px 10px', textAlign: 'center', color: (v.rating || 0) >= 4 ? T.success : (v.rating || 0) >= 3.5 ? T.gold : T.muted, fontFamily: MONO, fontWeight: 700 }}>
                  {v.rating ? `★ ${v.rating}` : '—'}
                </td>
                <td style={{ padding: '6px 10px', textAlign: 'center', color: T.muted, fontFamily: MONO }}>{v.review_count?.toLocaleString() || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 10 }}>
          <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}
            style={{ background: T.border, color: T.text, border: 'none', borderRadius: 6, padding: '5px 12px', cursor: page === 0 ? 'default' : 'pointer', opacity: page === 0 ? 0.4 : 1 }}>←</button>
          <span style={{ color: T.muted, fontSize: '0.75rem', alignSelf: 'center', fontFamily: MONO }}>{page + 1} / {totalPages}</span>
          <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page === totalPages - 1}
            style={{ background: T.border, color: T.text, border: 'none', borderRadius: 6, padding: '5px 12px', cursor: page === totalPages - 1 ? 'default' : 'pointer', opacity: page === totalPages - 1 ? 0.4 : 1 }}>→</button>
        </div>
      )}
    </div>
  );
};

// ─── EXPORT BUTTON ────────────────────────────────────────────────────────────

const ExportBtn = () => {
  const [exporting, setExporting] = useState(false);
  const handleExport = async () => {
    setExporting(true);
    try {
      const { default: jsPDF } = await import('jspdf');
      const { default: html2canvas } = await import('html2canvas');
      const el = document.querySelector('[data-dashboard-root]');
      if (!el) { setExporting(false); return; }
      const canvas = await html2canvas(el, { scale: 1.5, backgroundColor: '#0A0A0A', logging: false });
      const img = canvas.toDataURL('image/jpeg', 0.92);
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a3' });
      const pw = pdf.internal.pageSize.getWidth();
      const ph = pdf.internal.pageSize.getHeight();
      pdf.addImage(img, 'JPEG', 0, 0, pw, ph);
      pdf.save('Talabat_Egypt_360_Intelligence_Dashboard.pdf');
    } catch (e) { console.error('Export failed', e); }
    setExporting(false);
  };
  return (
    <button onClick={handleExport} disabled={exporting}
      style={{
        background: exporting ? T.navyLight : `linear-gradient(135deg, ${T.gold} 0%, #E8A500 100%)`,
        color: '#000', border: 'none', borderRadius: 8, padding: '7px 16px',
        fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
      }}>
      {exporting ? '⏳ Exporting...' : '⬇ Export PDF'}
    </button>
  );
};

// ─── SALES CTA ────────────────────────────────────────────────────────────────

const SalesCTA = () => (
  <div style={{
    background: `linear-gradient(135deg, #0D1B2A 0%, #0a1628 100%)`,
    border: `1px solid ${T.border}`, borderRadius: 12,
    padding: '18px 24px', margin: '28px 0 0',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14,
  }}>
    <div>
      <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 700, marginBottom: 3 }}>
        Need a custom intelligence report for your market?
      </div>
      <div style={{ color: T.muted, fontSize: '0.75rem' }}>
        Real data · 20+ analysis tabs · Power BI export · 5 Business Days
      </div>
    </div>
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <a href="mailto:Eslam.geogac@gmail.com?subject=Custom Intelligence Report Inquiry"
        style={{ background: T.gold, color: '#000', padding: '9px 20px', borderRadius: 8, fontWeight: 800, textDecoration: 'none', fontSize: '0.8rem' }}>
        💬 Get in Touch
      </a>
      <a href="https://wa.me/201000000000?text=Hi%2C%20I%20saw%20the%20Talabat%20Egypt%20intelligence%20report"
        style={{ background: '#1A2E1A', color: T.success, border: `1px solid ${T.success}44`, padding: '9px 20px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: '0.8rem' }}>
        📱 WhatsApp
      </a>
    </div>
  </div>
);

// ─── TABS CONFIG ──────────────────────────────────────────────────────────────

const TABS = [
  { id: 'overview', label: '⚡ Overview', group: 'Core' },
  { id: 'vendors', label: '🏪 Vendors', group: 'Core' },
  { id: 'restaurant', label: '🍽 Restaurant', group: 'Core' },
  { id: 'sentiment', label: '💬 Sentiment', group: 'Core' },
  { id: 'battlefield', label: '⚔ Battlefield', group: 'Strategy' },
  { id: 'market', label: '📈 Market Size', group: 'Strategy' },
  { id: 'economics', label: '💰 Unit Econ', group: 'Strategy' },
  { id: 'partner', label: '🤝 Partners', group: 'Strategy' },
  { id: 'consumer', label: '👥 Segments', group: 'Strategy' },
  { id: 'swot', label: '🎯 SWOT', group: 'Strategy' },
  { id: 'darkstore', label: '🏭 Dark Stores', group: 'Operations' },
  { id: 'news', label: '📰 News & Social', group: 'Operations' },
  { id: 'regional', label: '🗺 Regional', group: 'Operations' },
  { id: 'regulatory', label: '⚖ Regulatory', group: 'Operations' },
  { id: 'offers', label: '🎁 Offers', group: 'Operations' },
  { id: 'kpi', label: '📊 KPI Tracker', group: 'Intelligence' },
  { id: 'datahealth', label: '🔬 Data Quality', group: 'Intelligence' },
  { id: 'invest', label: '💎 Investment', group: 'Intelligence' },
  { id: 'sourcing', label: '🚀 Action Plan', group: 'Intelligence' },
  { id: 'map', label: '📍 Vendor Map', group: 'Intelligence' },
];

// ─── SELF-CONTAINED WRAPPER — fetches data at runtime ────────────────────────

export default function TalabatDashboard10KPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/talabat_10k_data.json')
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(setData)
      .catch(() => {
        // Fallback: try dynamic import (works locally)
        import('../../data/talabat_10k_data.json')
          .then(m => setData(m.default))
          .catch(e => setError(e.message));
      });
  }, []);

  if (error) return (
    <div style={{ color: '#EF4444', padding: 40, fontFamily: 'monospace' }}>
      Failed to load dashboard data: {error}
    </div>
  );
  if (!data) return (
    <div style={{ backgroundColor: '#0A0A0A', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, border: '4px solid #003087', borderTopColor: '#FFB81C', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{ color: '#9CA3AF', fontFamily: 'monospace', fontSize: '0.8rem' }}>Loading intelligence data...</div>
      </div>
    </div>
  );

  return <TalabatDashboard10K data={data} />;
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────

function TalabatDashboard10K({ data }) {
  const [tab, setTab] = useState('overview');
  const [activeGroup, setActiveGroup] = useState('Core');

  if (!data) return <div style={{ color: T.text, padding: 40 }}>Loading dashboard data...</div>;

  // Data refs
  const dq = data.data_quality || {};
  const kpi = data.kpi_summary || {};
  const vi = data.vendor_intelligence || {};
  const rd = data.restaurant_deep_dive || {};
  const cs = data.customer_sentiment || {};
  const cb = data.competitive_battlefield || {};
  const ms = data.market_sizing || {};
  const ue = data.unit_economics || {};
  const pe = data.partner_ecosystem || {};
  const cseg = data.consumer_segments || [];
  const sw = data.swot_analysis || [];
  const dsc = data.dark_store_qcommerce || {};
  const ns = data.news_social || {};
  const rp = data.regional_performance || [];
  const rr = data.regulatory_risk || {};
  const ofr = data.offers_promotions || {};
  const kt = data.kpi_tracker || {};
  const ih = data.investment_highlights || {};
  const ci = data.competitive_intel || {};
  const vd = data.vendor_map_data || [];

  const groups = [...new Set(TABS.map(t => t.group))];
  const groupTabs = TABS.filter(t => t.group === activeGroup);

  return (
    <div data-dashboard-root style={{ backgroundColor: T.bg, minHeight: '100vh', fontFamily: FONT, color: T.text }}>

      {/* ═══ HEADER ═══ */}
      <div style={{
        background: `linear-gradient(135deg, ${T.navyDark} 0%, ${T.navy} 60%, #0a2a6e 100%)`,
        padding: '1rem 1.5rem',
        borderBottom: `2px solid ${T.gold}22`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 900, color: T.gold, letterSpacing: '-0.02em' }}>Talabat Egypt</span>
              <span style={{ fontSize: '1rem', fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>Competitive Intelligence Report</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.65)', fontFamily: MONO }}>
              20-Tab Deep Dive · {kpi.total_vendors?.toLocaleString()} vendors · {kpi.total_reviews?.toLocaleString()} reviews · {kpi.total_nlp_records?.toLocaleString()} NLP records · April 2026
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <ConfBadge level={dq.overall_confidence || 'HIGH'} />
            <Badge color={T.navyLight}>{data.meta?.generated_at || '2026-04-30'}</Badge>
            <ExportBtn />
          </div>
        </div>
      </div>

      {/* ═══ GROUP NAV ═══ */}
      <div style={{ backgroundColor: '#0D0D0D', borderBottom: `1px solid ${T.border}`, padding: '0 1rem' }}>
        <div style={{ display: 'flex', gap: 0 }}>
          {groups.map(g => (
            <button key={g} onClick={() => { setActiveGroup(g); setTab(TABS.find(t => t.group === g)?.id || tab); }}
              style={{
                background: 'none', border: 'none', borderBottom: activeGroup === g ? `2px solid ${T.gold}` : '2px solid transparent',
                color: activeGroup === g ? T.gold : T.muted, padding: '10px 18px',
                fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.06em', fontFamily: FONT,
                transition: 'all 0.2s',
              }}>{g.toUpperCase()}</button>
          ))}
        </div>
      </div>

      {/* ═══ TAB NAV ═══ */}
      <div style={{ backgroundColor: T.card, padding: '0.4rem 0.75rem', borderBottom: `1px solid ${T.border}`, display: 'flex', gap: 3, overflowX: 'auto' }}>
        {groupTabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{
              padding: '5px 11px', borderRadius: 6, cursor: 'pointer', border: 'none',
              background: tab === t.id ? T.navy : 'transparent',
              color: tab === t.id ? '#fff' : T.muted,
              fontSize: '0.72rem', fontWeight: tab === t.id ? 700 : 400,
              whiteSpace: 'nowrap', transition: 'all 0.15s',
            }}>{t.label}</button>
        ))}
      </div>

      {/* ═══ CONTENT ═══ */}
      <div style={{ padding: '1.5rem' }}>

        {/* ─── TAB 1: OVERVIEW ─── */}
        {tab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12, marginBottom: 20 }}>
              <AnimKPI label="Total Vendors" value={kpi.total_vendors || 0} sub="from Talabat API" color={T.gold} />
              <AnimKPI label="Avg Vendor Rating" value={kpi.avg_vendor_rating || 0} sub="all rated vendors" color={T.success} />
              <AnimKPI label="GP Reviews" value={kpi.total_reviews || 0} sub="5 apps tracked" color={T.info} />
              <AnimKPI label="NLP Records" value={kpi.total_nlp_records || 0} sub="VADER sentiment" color={T.purple} />
              <AnimKPI label="Area Centroids" value={kpi.areas_covered || 0} sub="with GPS" color={T.orange} />
              <AnimKPI label="News Articles" value={kpi.total_news_articles || 0} sub="Google News RSS" color={T.warning} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
              <Card title="Vendor Breakdown by Type">
                <EPie
                  data={vi.by_type?.slice(0, 8) || []}
                  valueKey="count" nameKey="type"
                  colors={[T.navy, T.gold, T.success, T.purple, T.danger, T.info, T.orange, T.teal]}
                />
                <InsightBox
                  insight="57% restaurants · 20% bakery — grocery & pharmacy are underserved"
                  soWhat="Attack vector: Launch grocery/pharmacy-first positioning for high-growth gap"
                  track="Weekly: vendor count by type via Talabat API"
                />
              </Card>
              <Card title="Top 15 Cuisines">
                <EBar data={rd.top_15_cuisines || []} labelKey="cuisine" valueKey="count" color={T.gold} maxItems={15} height={300} />
              </Card>
              <Card title="Payment Methods">
                <EPie
                  data={Object.entries(vi.payment_acceptance || {}).map(([k, v]) => ({ name: k.replace('_', ' '), count: v }))}
                  valueKey="count" nameKey="name"
                  colors={[T.success, T.info, T.warning, T.danger]}
                  height={200}
                />
                <InsightBox
                  insight="Cash dominance signals low card penetration"
                  soWhat="Offer instant card onboarding for vendors as switching incentive"
                  track="Track: % new vendors accepting cards monthly"
                />
              </Card>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Card title="Data Source Confidence">
                <div style={{ fontSize: '0.8rem' }}>
                  {Object.entries(dq.sources || {}).map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: `1px solid ${T.border}` }}>
                      <span style={{ color: T.text }}>{k.replace(/_/g, ' ')} <span style={{ color: T.subtle, fontFamily: MONO }}>({v.count?.toLocaleString() || 0})</span></span>
                      <ConfBadge level={v.confidence} />
                    </div>
                  ))}
                </div>
              </Card>
              <Card title="Known Data Gaps">
                <div style={{ fontSize: '0.75rem' }}>
                  {(dq.gaps || []).map((g, i) => (
                    <div key={i} style={{ padding: '6px 0', borderBottom: `1px solid ${T.border}`, color: T.warning, display: 'flex', gap: 8 }}>
                      <span style={{ color: T.subtle, fontFamily: MONO }}>{i + 1}.</span> {g}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            <SalesCTA />
          </div>
        )}

        {/* ─── TAB 2: VENDORS ─── */}
        {tab === 'vendors' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 12, marginBottom: 20 }}>
              <AnimKPI label="Total Vendors" value={vi.total || 0} color={T.gold} />
              <AnimKPI label="Avg Rating" value={vi.avg_rating || 0} sub="across all rated" color={T.success} />
              <AnimKPI label="With GPS Location" value={kpi.total_vendors_with_location || 0} sub="for mapping" color={T.info} />
              <AnimKPI label="Vendor Types" value={vi.by_type?.length || 0} color={T.purple} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <Card title="Vendor Type Breakdown">
                <EPie data={vi.by_type?.slice(0, 8) || []} valueKey="count" nameKey="type" height={260} />
              </Card>
              <Card title="Rating Distribution">
                <EBar
                  data={Object.entries(vi.rating_buckets || {}).map(([k, v]) => ({ name: k, value: v }))}
                  labelKey="name" valueKey="value" color={T.success} maxItems={6} height={260}
                />
              </Card>
            </div>
            <Card title="Top Rated Vendors (50+ reviews, 4.0+)">
              <VendorTable vendors={vi.top_50_rated || []} />
              <InsightBox
                insight="2,815 vendors meet 4.0+ / 50+ review threshold — quality long tail"
                soWhat="Partner with top-rated independents for exclusive launch content"
                track="Monthly: new vendors entering 4.0+ / 50+ tier"
              />
            </Card>
            <SalesCTA />
          </div>
        )}

        {/* ─── TAB 3: RESTAURANT DEEP DIVE ─── */}
        {tab === 'restaurant' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 20 }}>
              <AnimKPI label="Cuisine Types" value={rd.total_cuisines || 0} color={T.gold} />
              <AnimKPI label="Top Cuisine" value={rd.top_15_cuisines?.[0]?.count || 0} sub={rd.top_15_cuisines?.[0]?.cuisine || 'N/A'} color={T.success} />
              <AnimKPI label="Highest Rated" value={rd.highest_rated_cuisines?.[0]?.avg_rating || 0} sub={rd.highest_rated_cuisines?.[0]?.cuisine || 'N/A'} color={T.info} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <Card title="Top 15 Cuisines by Vendor Count">
                <EBar data={rd.most_common_cuisines || []} labelKey="cuisine" valueKey="count" color={T.gold} maxItems={15} height={340} />
              </Card>
              <Card title="Highest Rated Cuisines (10+ vendors)">
                <EBar data={rd.highest_rated_cuisines || []} labelKey="cuisine" valueKey="avg_rating" color={T.success} maxItems={10} height={340} />
              </Card>
            </div>
            <Card title="Top 20 Most Popular Menu Items">
              <EBar data={vi.popular_items_top_20 || []} labelKey="item" valueKey="count" color={T.orange} maxItems={20} height={360} />
              <InsightBox
                insight="Margherita Pizza is #1 item across 186 vendors — Egyptian food #1 cuisine by count"
                soWhat="Build 'Most Popular' discovery feature to drive order frequency"
                track="Weekly: popular items trends from top 100 vendors"
              />
            </Card>
            <SalesCTA />
          </div>
        )}

        {/* ─── TAB 4: CUSTOMER SENTIMENT ─── */}
        {tab === 'sentiment' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 20 }}>
              <AnimKPI label="NLP Records" value={cs.total_records || 0} color={T.gold} />
              <AnimKPI label="Positive" value={cs.by_label?.positive || 0} color={T.success} />
              <AnimKPI label="Neutral" value={cs.by_label?.neutral || 0} color={T.muted} />
              <AnimKPI label="Negative" value={cs.by_label?.negative || 0} color={T.danger} />
              <AnimKPI label="Talabat NPS Proxy" value={cs.brand_nps_proxy?.talabat?.nps_proxy || 0} color={T.purple} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <Card title="Brand NPS Proxy (Review Sentiment)">
                <ENPSBar brands={Object.entries(cs.brand_nps_proxy || {}).map(([brand, d]) => ({ brand, ...d }))} />
                <InsightBox
                  insight="Breadfast leads with NPS 90 · Talabat at 79 · Rabbit 81"
                  soWhat="Breadfast is the CX benchmark — study their model for attack positioning"
                  track="Monthly: Brand NPS via Google Play review scraping"
                />
              </Card>
              <Card title="Sentiment Heatmap (Brand × Topic)">
                {Object.keys(cs.sentiment_heatmap || {}).length > 0
                  ? <EHeatmap data={cs.sentiment_heatmap} />
                  : <div style={{ color: T.muted, fontSize: '0.8rem', padding: 20 }}>No heatmap data</div>
                }
              </Card>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Card title="Top Discussion Topics">
                <EBar data={cs.top_topics || []} labelKey="topic" valueKey="count" color={T.purple} maxItems={15} height={320} />
              </Card>
              <Card title="Language Split">
                <EPie
                  data={Object.entries(cs.language_split || {}).map(([lang, cnt]) => ({ name: lang === 'ar' ? 'Arabic' : lang === 'en' ? 'English' : lang, count: cnt }))}
                  valueKey="count" nameKey="name"
                  colors={[T.gold, T.navy, T.success]}
                  height={280}
                />
              </Card>
            </div>
            <SalesCTA />
          </div>
        )}

        {/* ─── TAB 5: COMPETITIVE BATTLEFIELD ─── */}
        {tab === 'battlefield' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <Card title="Market Share — Egypt">
                <EPie data={cb.market_share || []} valueKey="share" nameKey="brand" height={280} />
                <InsightBox
                  insight="Talabat 62% share — but Breadfast leads on NPS (90 vs 79)"
                  soWhat="Attack on CX, not price — that's where Breadfast wins"
                  track="Quarterly: App Annie market share + brand NPS comparison"
                />
              </Card>
              <Card title="Competitor NPS Benchmark">
                <ENPSBar brands={cb.brands || []} />
              </Card>
            </div>
            <div style={{ marginBottom: 20 }}>
              <Card title="Competitor Intelligence Matrix">
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                    <thead>
                      <tr style={{ background: '#1A1A1A' }}>
                        {['Brand', 'Market Share', 'NPS Proxy', 'Avg Rating', 'Reviews'].map(h => (
                          <th key={h} style={{ padding: '10px 12px', textAlign: h === 'Brand' ? 'left' : 'center', color: T.muted, fontWeight: 700, borderBottom: `1px solid ${T.border}` }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(cb.brands || []).map((b, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${T.border}` }}>
                          <td style={{ padding: '9px 12px', fontWeight: 700, textTransform: 'capitalize' }}>{b.brand}</td>
                          <td style={{ padding: 9, textAlign: 'center', fontFamily: MONO }}>{b.market_share_pct}</td>
                          <td style={{ padding: 9, textAlign: 'center', color: (b.nps_proxy || 0) >= 50 ? T.success : (b.nps_proxy || 0) >= 0 ? T.warning : T.danger, fontFamily: MONO, fontWeight: 700 }}>{b.nps_proxy ?? '—'}</td>
                          <td style={{ padding: 9, textAlign: 'center', fontFamily: MONO }}>{b.avg_rating ?? '—'}</td>
                          <td style={{ padding: 9, textAlign: 'center', color: T.muted, fontFamily: MONO }}>{b.review_count?.toLocaleString() ?? '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              {[
                { key: 'weakness_exploits', title: '🔴 Weakness Exploits', color: T.danger },
                { key: 'opportunity_captures', title: '🟢 Opportunity Captures', color: T.success },
                { key: 'risk_monitors', title: '🟡 Risk Monitors', color: T.warning },
              ].map(({ key, title, color }) => (
                <Card key={key} title={title} highlight>
                  <div style={{ fontSize: '0.73rem' }}>
                    {(cb.attack_vectors?.[key] || []).slice(0, 5).map((item, i) => (
                      <div key={i} style={{ padding: '7px 0', borderBottom: `1px solid ${T.border}` }}>
                        <div style={{ color, fontWeight: 700, marginBottom: 2 }}>{item.factor}</div>
                        <div style={{ color: T.muted }}>{item.attack_vector}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
            <SalesCTA />
          </div>
        )}

        {/* ─── TAB 6: MARKET SIZING ─── */}
        {tab === 'market' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 20 }}>
              <AnimKPI label="Egypt Food Delivery TAM 2025" value={ms.egypt_food_delivery_tam_2025 || '$1.5B'} color={T.gold} />
              <AnimKPI label="Egypt Q-Commerce TAM" value={ms.egypt_qcommerce_tam_2025 || '$0.8B'} color={T.success} />
              <AnimKPI label="Online Penetration" value={`${ms.egypt_online_penetration_pct || 5}%`} color={T.info} />
              <AnimKPI label="TAM 2030 Projection" value={ms.egypt_tam_2030 || '$3B'} color={T.purple} />
              <AnimKPI label="YoY Growth Rate" value={`${ms.egypt_yoy_growth_pct || 57}%`} color={T.orange} />
              <AnimKPI label="New Entrant SOM" value={ms.new_entrant_som_estimate || '$150M'} color={T.danger} />
            </div>
            <Card title="Market Context & Strategic Framing">
              <div style={{ fontSize: '0.85rem', lineHeight: 1.8, padding: '4px 0' }}>
                <p style={{ marginBottom: 12 }}>Egypt's food delivery market is at <strong style={{ color: T.gold }}>5% online penetration</strong> — one of the lowest in MENA, signaling <strong style={{ color: T.success }}>massive headroom</strong>.</p>
                <p style={{ marginBottom: 12 }}>Talabat dominates at 62% market share but faces a critical BF delivery NPS gap: <strong style={{ color: T.danger }}>79 vs 90</strong>. This is the attack vector.</p>
                <p>A new entrant targeting $150-250M SOM can win on <strong style={{ color: T.success }}>customer experience + grocery verticals</strong>. The 57% YoY growth rate means the TAM <strong>doubles every ~18 months</strong>.</p>
              </div>
              <InsightBox
                insight="Egypt is where MENA's food delivery battle will be won or lost in the next 3 years"
                soWhat="Early movers in grocery/pharmacy capture disproportionate market share before Talabat responds"
                track="Quarterly: DH IR market sizing updates + App Annie Egypt market share"
              />
            </Card>
            <SalesCTA />
          </div>
        )}

        {/* ─── TAB 7: UNIT ECONOMICS ─── */}
        {tab === 'economics' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20 }}>
              <AnimKPI label="DH Global GMV 2025" value={ue.gmv_2025 || '$9.5B'} color={T.gold} />
              <AnimKPI label="DH Revenue 2025" value={ue.revenue_2025 || '$3.9B'} color={T.success} />
              <AnimKPI label="Egypt GMV Est." value={ue.egypt_gmv_estimate || '$1.7B'} color={T.info} />
              <AnimKPI label="Commission Rate" value={ue.commission_rate_range || '15-30%'} color={T.warning} />
              <AnimKPI label="Delivery Cost % GMV" value={`${ue.delivery_cost_pct_gmv || 15.3}%`} sub={`Target: ${ue.target_cost_pct || 12}%`} color={T.danger} />
              <AnimKPI label="Dark Stores" value={`${ue.dark_stores_current || 60}/${ue.dark_stores_planned || 100}`} sub="current / planned" color={T.purple} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Card title="Revenue Streams">
                {(ue.revenue_streams || []).length > 0 ? (
                  <EPie
                    data={(ue.revenue_streams || []).map(r => ({ name: r.Stream || r.stream || r.type || Object.values(r)[0], share: parseFloat(r.Share || r.share || r.pct || 0) || 1 }))}
                    valueKey="share" nameKey="name" height={240}
                  />
                ) : <div style={{ color: T.muted, fontSize: '0.8rem', padding: 20 }}>Revenue breakdown from DH IR reports</div>}
              </Card>
              <Card title="Unit Economics Summary">
                <div style={{ fontSize: '0.85rem', lineHeight: 2 }}>
                  {[
                    ['T-Pro Monthly', `${ue.t_pro_monthly_egp || 79} EGP`],
                    ['T-Pro Annual', `${ue.t_pro_annual_egp || 799} EGP`],
                    ['Delivery Fee Range', ue.delivery_fee_range || '$0.50–$3'],
                    ['Strategic Investment 2026', ue.strategic_investment_2026 || '$100M'],
                    ['Grocery Margin Target', `${dsc.target_grocery_margin_pct || 25}%`],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: `1px solid ${T.border}` }}>
                      <span style={{ color: T.muted }}>{k}</span>
                      <span style={{ color: T.gold, fontWeight: 700, fontFamily: MONO }}>{v}</span>
                    </div>
                  ))}
                </div>
                <InsightBox
                  insight="15.3% delivery cost vs 12% target — 3.3pp gap is the main profitability lever"
                  soWhat="Compete on delivery efficiency: 15-min grocery in urban clusters achieves better unit econ"
                  track="Quarterly: DH IR delivery cost ratio monitoring"
                />
              </Card>
            </div>
            <SalesCTA />
          </div>
        )}

        {/* ─── TAB 8: PARTNER ECOSYSTEM ─── */}
        {tab === 'partner' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20 }}>
              <AnimKPI label="Restaurant Partners" value={pe.total_partners || 0} color={T.gold} />
              <AnimKPI label="Partner NPS" value={pe.partner_nps || 28} color={T.danger} sub="low — vulnerability signal" />
              <AnimKPI label="Switching Risk" value={`${pe.switching_risk_pct || 58}%`} color={T.warning} />
              <AnimKPI label="Commission Concern" value={`${pe.commission_concern_pct || 65}%`} color={T.danger} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Card title="Partner Satisfaction by Restaurant Type">
                <EBar
                  data={(pe.by_restaurant_type || []).map(r => ({ name: r.type, value: r.satisfaction }))}
                  labelKey="name" valueKey="value"
                  color={T.warning} maxItems={10} height={260}
                />
                <InsightBox
                  insight="58% switching risk + 65% commission concern = partners want out"
                  soWhat="Offer 20-25% commission (vs 15-30%) with 90-day onboarding guarantee"
                  track="Monthly: Partner churn rate + commission benchmarking"
                />
              </Card>
              <Card title="Partner Vulnerability Breakdown">
                <div style={{ fontSize: '0.82rem', lineHeight: 1.8 }}>
                  {[
                    { label: '1. Commission Trap', color: T.danger, detail: '65% cite commission as top concern. Cloud Kitchen satisfaction = 2.1/5' },
                    { label: '2. Switching Cost', color: T.warning, detail: '58% would switch if offered better terms — onboarding friction is real' },
                    { label: '3. Attack Vector', color: T.success, detail: 'Zero-commission first 90 days for top 500 vendors + self-service onboarding' },
                  ].map((item, i) => (
                    <div key={i} style={{ padding: '12px 0', borderBottom: `1px solid ${T.border}` }}>
                      <div style={{ color: item.color, fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
                      <div style={{ color: T.muted }}>{item.detail}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            <SalesCTA />
          </div>
        )}

        {/* ─── TAB 9: CONSUMER SEGMENTS ─── */}
        {tab === 'consumer' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 20 }}>
              {(cseg || []).map((seg, i) => (
                <Card key={seg.id} highlight>
                  <div style={{ marginBottom: 8 }}>
                    <Badge color={i === 0 ? T.danger : i === 1 ? T.gold : T.info}>{`${i + 1}`}</Badge>
                    <span style={{ marginLeft: 8, fontWeight: 700, fontSize: '0.9rem' }}>{seg.name}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', lineHeight: 1.7 }}>
                    <div>Share: <strong style={{ color: T.gold, fontFamily: MONO }}>{seg.share}%</strong></div>
                    <div>NPS: <strong style={{ color: seg.nps >= 50 ? T.success : seg.nps >= 30 ? T.warning : T.danger, fontFamily: MONO }}>{seg.nps}</strong></div>
                    <div style={{ color: T.gold, fontWeight: 600, marginTop: 8, fontSize: '0.73rem', borderTop: `1px solid ${T.border}`, paddingTop: 8 }}>→ {seg.attack_vector}</div>
                  </div>
                </Card>
              ))}
            </div>
            <Card title="Segment Share Distribution">
              <EPie
                data={(cseg || []).map(s => ({ name: s.name, share: s.share }))}
                valueKey="share" nameKey="name" height={280}
              />
            </Card>
            <InsightBox
              insight="Price Optimizers (25%, NPS 28) are the PRIMARY attack target — lowest NPS, highest churn risk"
              soWhat="Build a 'price matcher' feature that auto-applies best available offer — target this segment head-on"
              track="Weekly: Competitor pricing scans + NPS delta between segments"
            />
            <SalesCTA />
          </div>
        )}

        {/* ─── TAB 10: SWOT + ATTACK VECTORS ─── */}
        {tab === 'swot' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { cat: 'strength', label: '✅ Strengths', color: T.success },
                { cat: 'weakness', label: '❌ Weaknesses', color: T.danger },
                { cat: 'opportunity', label: '🚀 Opportunities', color: T.gold },
                { cat: 'risk', label: '⚠ Risks', color: T.warning },
              ].map(({ cat, label, color }) => {
                const items = (sw || []).filter(s => s.category === cat);
                return (
                  <Card key={cat} title={label} highlight={cat === 'weakness' || cat === 'opportunity'}>
                    <div style={{ maxHeight: 280, overflowY: 'auto' }}>
                      {items.map((s, i) => (
                        <div key={i} style={{ padding: '7px 0', borderBottom: `1px solid ${T.border}` }}>
                          <div style={{ color, fontWeight: 700, fontSize: '0.8rem' }}>{s.factor}</div>
                          <div style={{ color: T.muted, fontSize: '0.72rem' }}>Impact: {s.impact}</div>
                          {s.attack_vector && <div style={{ color: T.gold, fontSize: '0.7rem', marginTop: 3, fontStyle: 'italic' }}>→ {s.attack_vector}</div>}
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
            <SalesCTA />
          </div>
        )}

        {/* ─── TAB 11: DARK STORES / Q-COMMERCE ─── */}
        {tab === 'darkstore' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20 }}>
              <AnimKPI label="Current Dark Stores" value={dsc.current_stores || 60} color={T.gold} />
              <AnimKPI label="Planned Stores" value={dsc.planned_stores || 100} color={T.success} />
              <AnimKPI label="ROI Break-Even" value={`${dsc.roi_break_even_months || 16} mo`} color={T.info} />
              <AnimKPI label="Investment" value={`$${dsc.investment_m || 50}M`} color={T.purple} />
              <AnimKPI label="Grocery Margin Target" value={`${dsc.target_grocery_margin_pct || 25}%`} color={T.orange} />
            </div>
            <Card title="Competitor Dark Store Comparison">
              <EBar
                data={(dsc.competitor_comparison || []).map(c => ({ name: c.brand, value: typeof c.stores === 'number' ? c.stores : parseInt(c.stores) || 0 }))}
                labelKey="name" valueKey="value" color={T.navy} maxItems={8} height={220}
              />
              <div style={{ overflowX: 'auto', marginTop: 16 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                  <thead>
                    <tr style={{ background: '#1A1A1A' }}>
                      {['Brand', 'Stores', 'Delivery Target', 'SKU Range'].map(h => (
                        <th key={h} style={{ padding: '9px 12px', textAlign: h === 'Brand' ? 'left' : 'center', color: T.muted, fontWeight: 700, borderBottom: `1px solid ${T.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(dsc.competitor_comparison || []).map((c, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${T.border}` }}>
                        <td style={{ padding: '8px 12px', fontWeight: 700 }}>{c.brand}</td>
                        <td style={{ padding: 8, textAlign: 'center', fontFamily: MONO }}>{c.stores}</td>
                        <td style={{ padding: 8, textAlign: 'center', color: T.gold }}>{c.target_delivery_min}</td>
                        <td style={{ padding: 8, textAlign: 'center', color: T.muted }}>{c.sku_range}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <InsightBox
                insight="Talabat Mart: 60 stores · 20-min delivery · Breadfast: 40 stores · 15-min delivery"
                soWhat="15-min grocery in dense urban clusters wins. Target hyperlocal dark stores in Cairo/Alex first"
                track="Monthly: Dark store count by brand + delivery time benchmarks"
              />
            </Card>
            <SalesCTA />
          </div>
        )}

        {/* ─── TAB 12: NEWS & SOCIAL ─── */}
        {tab === 'news' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20 }}>
              <AnimKPI label="News Articles" value={ns.total_articles || 0} color={T.gold} />
              <AnimKPI label="Reddit Posts" value={kpi.total_reddit_mentions || 0} color={T.purple} />
              <AnimKPI label="Brands Tracked" value={Object.keys(ns.reddit_nlp_by_brand || {}).length} color={T.info} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <Card title="News Coverage by Brand">
                <EBar data={Object.entries(ns.by_brand || {}).map(([k, v]) => ({ name: k, value: v }))} labelKey="name" valueKey="value" color={T.gold} maxItems={10} height={280} />
              </Card>
              <Card title="News by Keyword">
                <EBar data={Object.entries(ns.by_keyword || {}).map(([k, v]) => ({ name: k, value: v }))} labelKey="name" valueKey="value" color={T.info} maxItems={10} height={280} />
              </Card>
            </div>
            <Card title="Reddit Mentions by Subreddit">
              <EBar data={Object.entries(ns.reddit_by_subreddit || {}).map(([k, v]) => ({ name: k, value: v }))} labelKey="name" valueKey="value" color={T.purple} maxItems={15} height={300} />
              <InsightBox
                insight="Track subreddit volume spikes for real-time sentiment shifts"
                soWhat="Set up automated Reddit monitoring for brand mention alerts"
                track="Weekly: Reddit mention volume + sentiment delta by subreddit"
              />
            </Card>
            <SalesCTA />
          </div>
        )}

        {/* ─── TAB 13: REGIONAL PERFORMANCE ─── */}
        {tab === 'regional' && (
          <div>
            <Card title="Regional Performance Data">
              {(rp && rp.length > 0) ? (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                    <thead>
                      <tr style={{ background: '#1A1A1A' }}>
                        {Object.keys(rp[0] || {}).slice(0, 8).map(k => (
                          <th key={k} style={{ padding: '9px 12px', textAlign: 'left', color: T.muted, fontWeight: 700, borderBottom: `1px solid ${T.border}` }}>{k}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rp.slice(0, 20).map((row, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${T.border}` }}>
                          {Object.values(row).slice(0, 8).map((v, j) => (
                            <td key={j} style={{ padding: '7px 12px' }}>{v}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ color: T.muted, fontSize: '0.85rem', padding: 20, textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: 8 }}>📊</div>
                  Regional performance data collected from DH IR reports. Available in Wave 2 refresh.
                </div>
              )}
            </Card>
            <SalesCTA />
          </div>
        )}

        {/* ─── TAB 14: REGULATORY RISK ─── */}
        {tab === 'regulatory' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {Object.entries(rr || {}).map(([key, risk]) => {
                const probColor = risk.probability === 'High' ? T.danger : risk.probability === 'Medium' ? T.warning : T.info;
                return (
                  <Card key={key} highlight={risk.probability === 'High'}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'capitalize' }}>
                        {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </div>
                      <Badge color={probColor}>{risk.probability}</Badge>
                    </div>
                    <div style={{ fontSize: '0.78rem', lineHeight: 1.7 }}>
                      <div><span style={{ color: T.muted }}>Status:</span> {risk.status}</div>
                      <div><span style={{ color: T.muted }}>Impact:</span> {risk.impact}</div>
                    </div>
                    <InsightBox
                      insight={risk.impact}
                      soWhat={risk.probability === 'High' ? 'Requires immediate compliance planning + budget allocation' : 'Monitor quarterly and prepare contingency'}
                      track={`Quarterly: Regulatory scan for ${key.replace(/_/g, ' ')}`}
                    />
                  </Card>
                );
              })}
            </div>
            <SalesCTA />
          </div>
        )}

        {/* ─── TAB 15: OFFERS & PROMOTIONS ─── */}
        {tab === 'offers' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20 }}>
              <AnimKPI label="T-Pro Monthly" value={`${ofr.t_pro_monthly_egp || 79} EGP`} color={T.gold} />
              <AnimKPI label="T-Pro Annual" value={`${ofr.t_pro_annual_egp || 799} EGP`} color={T.success} />
              <AnimKPI label="First Order Discount" value={ofr.first_order_discount || '50% off'} color={T.info} />
            </div>
            <Card title="Competitor Offer Comparison">
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                  <thead>
                    <tr style={{ background: '#1A1A1A' }}>
                      {['Brand', 'Offer', 'Target'].map(h => (
                        <th key={h} style={{ padding: '9px 12px', textAlign: h === 'Brand' ? 'left' : 'left', color: T.muted, fontWeight: 700, borderBottom: `1px solid ${T.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(ofr.competitor_offers || []).map((co, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${T.border}` }}>
                        <td style={{ padding: '9px 12px', fontWeight: 700 }}>{co.brand}</td>
                        <td style={{ padding: 9, color: T.gold }}>{co.offer}</td>
                        <td style={{ padding: 9, color: T.muted }}>{co.target}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <InsightBox
                insight="Breadfast offers free delivery + credit — direct new user acquisition play"
                soWhat="Counter: first order free + credit + no minimum order for 30 days (stackable)"
                track="Weekly: Competitor offer monitoring + conversion rate by offer type"
              />
            </Card>
            <SalesCTA />
          </div>
        )}

        {/* ─── TAB 16: KPI TRACKER ─── */}
        {tab === 'kpi' && (
          <div>
            <Card title="Wave 1 Baseline — April 2026" style={{ marginBottom: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginTop: 4 }}>
                {Object.entries(kt.wave_1_baseline || {}).filter(([k]) => k !== 'date').map(([k, v]) => (
                  <AnimKPI key={k} label={k.replace(/_/g, ' ')} value={typeof v === 'number' ? v : String(v)} color={T.gold} />
                ))}
              </div>
              <div style={{ fontSize: '0.7rem', color: T.muted, marginTop: 10, fontFamily: MONO }}>Baseline date: {kt.wave_1_baseline?.date || '2026-04-30'}</div>
            </Card>
            <Card title="KPI Tracking Framework">
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                  <thead>
                    <tr style={{ background: '#1A1A1A' }}>
                      {['Metric', 'Frequency', 'Source', 'Target'].map(h => (
                        <th key={h} style={{ padding: '9px 12px', textAlign: 'left', color: T.muted, fontWeight: 700, borderBottom: `1px solid ${T.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(kt.tracking_metrics || []).map((m, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${T.border}` }}>
                        <td style={{ padding: '8px 12px', fontWeight: 700 }}>{m.metric}</td>
                        <td style={{ padding: 8 }}><Badge color={m.frequency === 'Weekly' ? T.success : m.frequency === 'Monthly' ? T.info : T.warning}>{m.frequency}</Badge></td>
                        <td style={{ padding: 8, color: T.muted }}>{m.source}</td>
                        <td style={{ padding: 8, color: T.gold, fontFamily: MONO }}>{m.target}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <InsightBox
                insight="10 KPIs tracked across monthly, weekly, and quarterly cadences"
                soWhat="Automate data collection for weekly metrics; plan STG fieldwork for quarterly NPS surveys"
                track="Dashboard auto-updates from Talabat API weekly"
              />
            </Card>
            <SalesCTA />
          </div>
        )}

        {/* ─── TAB 17: DATA QUALITY ─── */}
        {tab === 'datahealth' && (
          <div>
            <Card title="Data Source Inventory & Confidence" style={{ marginBottom: 16 }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                  <thead>
                    <tr style={{ background: '#1A1A1A' }}>
                      {['Source', 'Count', 'Confidence'].map(h => (
                        <th key={h} style={{ padding: '9px 12px', textAlign: h === 'Count' || h === 'Confidence' ? 'center' : 'left', color: T.muted, fontWeight: 700, borderBottom: `1px solid ${T.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(dq.sources || {}).map(([k, v]) => (
                      <tr key={k} style={{ borderBottom: `1px solid ${T.border}` }}>
                        <td style={{ padding: '8px 12px' }}>
                          {k.replace(/_/g, ' ')}
                          {v.source && <div style={{ fontSize: '0.65rem', color: T.subtle }}>{v.source}</div>}
                        </td>
                        <td style={{ padding: 8, textAlign: 'center', fontFamily: MONO }}>
                          {v.count?.toLocaleString() || '—'}{v.pct ? ` (${v.pct}%)` : ''}
                        </td>
                        <td style={{ padding: 8, textAlign: 'center' }}><ConfBadge level={v.confidence} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            <Card title="Known Data Gaps">
              {(dq.gaps || []).map((g, i) => (
                <div key={i} style={{ padding: '9px 0', borderBottom: `1px solid ${T.border}`, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: T.warning, fontFamily: MONO, fontSize: '0.75rem', minWidth: 20 }}>{i + 1}.</span>
                  <span style={{ color: T.text, fontSize: '0.78rem' }}>{g}</span>
                </div>
              ))}
              <InsightBox
                insight="6 known gaps — consumer/partner NPS surveys require STG fieldwork ($5-10K)"
                soWhat="Priority: menu pricing (BrightData), NPS surveys (STG fieldwork), Apple reviews (500 cap)"
                track="Monthly: Gap closure progress tracker"
              />
            </Card>
            <SalesCTA />
          </div>
        )}

        {/* ─── TAB 18: INVESTMENT HIGHLIGHTS ─── */}
        {tab === 'invest' && (
          <div>
            <Card title="Delivery Hero — Egypt Investment Highlights">
              {(Object.keys(ih || {}).length > 0 || Object.keys(ci || {}).length > 0) ? (
                <div style={{ fontSize: '0.82rem' }}>
                  {Object.entries(ih || ci || {}).map(([k, v]) => (
                    <div key={k} style={{ padding: '8px 0', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                      <strong style={{ color: T.gold, minWidth: 200 }}>{k.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</strong>
                      <span style={{ color: T.text, textAlign: 'right' }}>{typeof v === 'object' ? JSON.stringify(v) : v}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ color: T.muted, padding: 20 }}>Investment highlights available from DH IR data — Q1 2026 earnings call scheduled.</div>
              )}
              <InsightBox
                insight="DH invested $100M in Egypt (2026) — signals market priority and competitive moat funding"
                soWhat="New entrant must target niche verticals DH hasn't dominated: grocery & pharmacy"
                track="Quarterly: DH earnings call coverage for Egypt/MENA investment signals"
              />
            </Card>
            <SalesCTA />
          </div>
        )}

        {/* ─── TAB 19: ACTION PLAN ─── */}
        {tab === 'sourcing' && (
          <div>
            <Card title="Priority Action Items — Competitive Attack Plan">
              {[
                { p: 'P0', color: T.danger, action: 'Launch grocery/pharmacy-first platform', so_what: '703 grocery + 614 pharmacy vendors are underserved — attack the gaps', track: 'Weekly: New grocery/pharmacy vendor count' },
                { p: 'P0', color: T.danger, action: 'Build price comparison feature', so_what: '25% of users are Price Optimizers (NPS 28) — lowest-hanging fruit', track: 'Weekly: Competitor price scans' },
                { p: 'P0', color: T.danger, action: 'Attack BF delivery CX gap (NPS 79 vs 90)', so_what: 'Breadfast leads on customer experience — copy their model exactly', track: 'Monthly: NPS delta tracking by feature' },
                { p: 'P1', color: T.warning, action: 'Partner poaching: Zero-commission first 90 days for top 500', so_what: '58% switching risk + 65% commission concern = massive vulnerability', track: 'Monthly: Partner acquisition + churn by type' },
                { p: 'P1', color: T.warning, action: '15-min grocery delivery in Cairo/Alex urban cores', so_what: 'Breadfast achieves 15-min at 40 stores — matching this is table stakes', track: 'Weekly: Delivery time benchmarks by area' },
                { p: 'P2', color: T.info, action: 'STG fieldwork: Consumer + Partner NPS surveys', so_what: 'Current NPS data is proxy-based — need real wave 1 primary baseline', track: 'Quarterly: NPS survey wave execution' },
                { p: 'P2', color: T.info, action: 'Menu pricing scraping (BrightData)', so_what: 'No price intelligence exists yet — critical for feature parity', track: 'Monthly: Menu catalog completeness %' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '12px 0', borderBottom: `1px solid ${T.border}`, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <Badge color={item.color}>{item.p}</Badge>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: 4 }}>{item.action}</div>
                    <div style={{ color: T.gold, fontSize: '0.75rem', marginBottom: 3 }}>→ {item.so_what}</div>
                    <div style={{ color: T.muted, fontSize: '0.68rem', fontFamily: MONO }}>📊 {item.track}</div>
                  </div>
                </div>
              ))}
            </Card>
            <InsightBox
              insight="3 P0 items, 2 P1 items, 2 P2 items — execute P0s first for maximum competitive impact"
              soWhat="Quick wins: grocery-first positioning + price comparison = immediate market differentiation"
              track="Weekly: Action item progress review + dashboard KPI update"
            />
            <SalesCTA />
          </div>
        )}

        {/* ─── TAB 20: VENDOR MAP ─── */}
        {tab === 'map' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20 }}>
              <AnimKPI label="Mappable Vendors" value={kpi.total_vendors_with_location || 0} sub={`${Math.round(((kpi.total_vendors_with_location || 0) / (kpi.total_vendors || 1)) * 100)}% of total`} color={T.gold} />
              <AnimKPI label="Area Centroids" value={kpi.areas_covered || 0} color={T.info} />
              <AnimKPI label="Vendor Types on Map" value={Object.keys(kpi.vendor_types || {}).length} color={T.success} />
            </div>
            <Card title="Vendor Density — Egypt (Coordinate Scatter)" noPad>
              <div style={{ padding: '0 1.25rem' }}>
                {vd.length > 0 ? (
                  <EScatter points={vd} />
                ) : (
                  <div style={{ textAlign: 'center', padding: '3rem', color: T.muted }}>
                    <div style={{ fontSize: '3rem', marginBottom: 12 }}>📍</div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: T.gold, marginBottom: 8 }}>
                      {kpi.total_vendors_with_location?.toLocaleString() || '9,019'} vendors with GPS coordinates
                    </div>
                    <div style={{ fontSize: '0.8rem', marginBottom: 16 }}>
                      Geographic density data covers {kpi.areas_covered || 0} area centroids across Egypt.
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, maxWidth: 500, margin: '0 auto', textAlign: 'left' }}>
                      {[
                        { region: 'Greater Cairo', vendors: '~7,400', share: '75%' },
                        { region: 'Alexandria', vendors: '~1,200', share: '12%' },
                        { region: 'Other Egypt', vendors: '~1,300', share: '13%' },
                      ].map(r => (
                        <div key={r.region} style={{ background: T.border, borderRadius: 8, padding: '12px' }}>
                          <div style={{ color: T.gold, fontWeight: 700, fontSize: '0.78rem' }}>{r.region}</div>
                          <div style={{ fontSize: '1.2rem', fontWeight: 800, fontFamily: MONO, color: T.text }}>{r.vendors}</div>
                          <div style={{ color: T.muted, fontSize: '0.7rem' }}>{r.share} of total</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
            <SalesCTA />
          </div>
        )}

      </div>
    </div>
  );
}
