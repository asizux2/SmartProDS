import { useState, useEffect, Suspense, lazy } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, BarChart3, TrendingUp, Users, DollarSign, Activity, Download, RefreshCw } from 'lucide-react'
import entitiesData from '../data/entities.json'

const DASHBOARD_COMPONENTS = {
  'talabat-360': lazy(() => import('../components/dashboards/Talabat360Dashboard')),
  'vodafone-egypt-360': lazy(() => import('../components/dashboards/VodafoneEgypt360Dashboard')),
}

const TALABAT_DASHBOARD_DATA = {
  kpis: [
    { label: 'Partner NPS', value: 72, change: 4.2, trend: 'up' },
    { label: 'Consumer NPS', value: 68, change: -1.5, trend: 'down' },
    { label: 'Avg Order Value', value: 'EGP 285', change: 8.3, trend: 'up' },
    { label: 'Retention Rate', value: '78%', change: 2.1, trend: 'up' },
  ],
  charts: [
    { id: 'nps-trend', title: 'NPS Trend', type: 'line' },
    { id: 'partner-distribution', title: 'Partner Distribution', type: 'bar' },
    { id: 'segment-breakdown', title: 'Consumer Segments', type: 'pie' },
  ],
  metrics: ['nps', 'arpu', 'retention', 'churn', 'market-share'],
}

function DashboardLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-900 border-t-blue-500 rounded-full animate-spin mb-4" />
        <p className="text-gray-400 font-mono text-sm">Loading dashboard...</p>
      </div>
    </div>
  )
}

export default function DashboardHub() {
  const { '*': subPath } = useParams()
  const [entities, setEntities] = useState([])
  const [selectedEntity, setSelectedEntity] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setEntities(entitiesData.entities || [])
    if (subPath) {
      const found = entitiesData.entities.find(e => e.slug === subPath)
      setSelectedEntity(found || null)
    }
  }, [subPath])

  if (subPath && selectedEntity) {
    const DashboardComponent = DASHBOARD_COMPONENTS[subPath]
    
    return (
      <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
        <header className="border-b" style={{ borderColor: '#1E1E1E', background: '#111111' }}>
          <div className="max-w-7xl mx-auto px-6 py-4">
            <Link to="/dashboards" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard Hub
            </Link>
          </div>
        </header>
        
        {DashboardComponent ? (
          <Suspense fallback={<DashboardLoader />}>
            <DashboardComponent />
          </Suspense>
        ) : (
          <main className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">{selectedEntity.name} Dashboard</h1>
              <p className="text-gray-400">
                Interactive Power BI-style dashboard with {selectedEntity.dashboard.metrics.join(', ')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {TALABAT_DASHBOARD_DATA.kpis.map((kpi, i) => (
                <div key={i} className="rounded-lg p-6" style={{ background: '#111111', border: '1px solid #1E1E1E' }}>
                  <p className="text-gray-400 text-sm mb-1">{kpi.label}</p>
                  <div className="flex items-end gap-2">
                    <p className="text-3xl font-bold text-white">{kpi.value}</p>
                    <span className={`text-sm mb-1 ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {kpi.trend === 'up' ? '↑' : '↓'} {Math.abs(kpi.change)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1E1E1E] text-white hover:bg-[#2E2E2E] transition-colors">
                <RefreshCw className="w-4 h-4" />
                Refresh Data
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </main>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      <header className="border-b" style={{ borderColor: '#1E1E1E', background: '#111111' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link to="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard Hub</h1>
          <p className="text-gray-400">Interactive dashboards powered by Power BI and synthetic survey data</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entities.map(entity => (
            <Link
              key={entity.id}
              to={`/dashboards/${entity.slug}`}
              className="rounded-lg p-6 transition-all hover:scale-[1.02]"
              style={{ background: '#111111', border: '1px solid #1E1E1E' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-900/30 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{entity.name}</h3>
                  <p className="text-gray-400 text-sm">{entity.industry}</p>
                </div>
              </div>
              <div className="space-y-2">
                {entity.dashboard.metrics.slice(0, 3).map((metric, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                    <Activity className="w-3 h-3" />
                    <span className="capitalize">{metric}</span>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}