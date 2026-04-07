import { useEffect, lazy, Suspense } from 'react'

// Lazy-load each dashboard to keep initial bundle small
const DASHBOARDS = {
  BLabsDashboard:            lazy(() => import('./dashboards/BLabsDashboard')),
  DicetekDashboard:          lazy(() => import('./dashboards/DicetekDashboard')),
  ZenniDashboard:            lazy(() => import('./dashboards/ZenniDashboard')),
  BanqueMisrDashboard:       lazy(() => import('./dashboards/BanqueMisrDashboard')),
  DeltaDentalDashboard:      lazy(() => import('./dashboards/DeltaDentalDashboard')),
  BitechDashboard:           lazy(() => import('./dashboards/BitechDashboard')),
  EnvisionDashboard:         lazy(() => import('./dashboards/EnvisionDashboard')),
  PentaBDashboard:           lazy(() => import('./dashboards/PentaBDashboard')),
  RootsMCDashboard:          lazy(() => import('./dashboards/RootsMCDashboard')),
  TechScalerzDashboard:      lazy(() => import('./dashboards/TechScalerzDashboard')),
  // New — April 2026 job hunt qualifying companies
  OntracSolutionsDashboard:  lazy(() => import('./dashboards/OntracSolutionsDashboard')),
  MyloDashboard:             lazy(() => import('./dashboards/MyloDashboard')),
  TechBizGlobalDashboard:    lazy(() => import('./dashboards/TechBizGlobalDashboard')),
}

const TEMPLATE_LABELS = {
  'banking-nps':          '📊 NPS / CSAT Dashboard',
  'ops-platform':         '⚙️ Ops Automation Platform',
  'world-bank-gis':       '🗺️ GIS Asset Dashboard',
  'vodafone-etl':         '🔄 ETL Pipeline Analytics',
  'mobil-ms':             '🔍 Mystery Shopping Dashboard',
  'telecom-bi':           '📡 Telecom BI Analytics',
  'fintech-bnpl':         '💳 BNPL Portfolio Dashboard',
  'financial-analytics':  '💰 Financial Analytics',
}

function LoadingSpinner() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '400px', background: '#0D1B2A',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '40px', height: '40px', border: '3px solid #1E3A5F',
          borderTopColor: '#1E88E5', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite', margin: '0 auto 16px',
        }} />
        <div style={{ color: '#1E88E5', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}>
          Loading dashboard...
        </div>
      </div>
    </div>
  )
}

export default function CompanyDashboardModal({ company, onClose }) {
  const DashboardComponent = company ? DASHBOARDS[company.dashboardFile] : null

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!company || !DashboardComponent) return null

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex', flexDirection: 'column',
        backdropFilter: 'blur(4px)',
      }}
    >
      {/* Modal toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 20px',
        background: '#060A10',
        borderBottom: '1px solid #1a1a1a',
        flexShrink: 0,
      }}>
        {/* Left: company info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '20px' }}>{company.industryIcon}</span>
          <div>
            <div style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '18px', letterSpacing: '0.05em',
              color: '#F5F5F5', lineHeight: 1.2,
            }}>
              {company.name}
            </div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px', color: '#6B6B6B',
            }}>
              {TEMPLATE_LABELS[company.template]} · {company.flag} {company.location}
            </div>
          </div>
        </div>

        {/* Right: proof badge + close */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
            padding: '4px 10px', borderRadius: '4px',
            background: 'rgba(45,109,246,0.12)', color: '#2D6DF6',
            border: '1px solid rgba(45,109,246,0.3)',
          }}>
            {company.proofPoint} · Score {company.score}/11
          </div>
          <button
            onClick={onClose}
            style={{
              width: '32px', height: '32px', borderRadius: '4px',
              border: '1px solid #333', background: 'transparent',
              color: '#6B6B6B', cursor: 'pointer', fontSize: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#F5F5F5' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6B6B6B' }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Dashboard scroll area */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Proof point banner */}
        <div style={{
          background: 'rgba(45,109,246,0.08)',
          borderBottom: '1px solid rgba(45,109,246,0.2)',
          padding: '10px 20px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '12px', color: '#8899CC',
        }}>
          ⚡ <strong style={{ color: '#2D6DF6' }}>{company.proofPoint}</strong> · {company.proofText}
        </div>

        {/* Dashboard content */}
        <Suspense fallback={<LoadingSpinner />}>
          <DashboardComponent />
        </Suspense>
      </div>

      {/* Bottom bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 20px',
        background: '#060A10',
        borderTop: '1px solid #1a1a1a',
        flexShrink: 0,
      }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#444',
        }}>
          ESC to close · SmartProDS Portfolio · Eslam Khaled Ibrahim
        </div>
        <a
          href="mailto:eslam.khaled@smartprods.com"
          style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
            color: '#2D6DF6', textDecoration: 'none',
          }}
        >
          eslam.khaled@smartprods.com →
        </a>
      </div>

      {/* Spin animation */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
