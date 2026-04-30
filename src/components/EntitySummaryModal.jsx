import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, X, Layers, Database, Bot, Globe, Clock, TrendingUp, BarChart3, Users, Target, Zap, ExternalLink } from 'lucide-react'
import entitiesData from '../data/entities.json'

export default function EntitySummaryModal({ entitySlug, onClose, onViewDashboard }) {
  const [entity, setEntity] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    if (entitySlug) {
      const found = entitiesData.entities.find(e => e.slug === entitySlug)
      setEntity(found || null)
    }
    setLoading(false)
  }, [entitySlug])
  
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }
  
  if (!entity) {
    return null
  }
  
  const metrics = [
    { label: 'Deep Dives', value: entity.research?.deepDives || 0, icon: Layers, color: 'text-blue-500', bg: 'bg-blue-900/30' },
    { label: 'CSV Files', value: entity.data?.csvFiles || 0, icon: Database, color: 'text-green-500', bg: 'bg-green-900/30' },
    { label: 'Agents Run', value: '7', icon: Bot, color: 'text-purple-500', bg: 'bg-purple-900/30' },
    { label: 'Data Sources', value: entity.data?.dataSources?.length || 1, icon: Globe, color: 'text-yellow-500', bg: 'bg-yellow-900/30' },
  ]
  
  const kpiMetrics = entity.dashboard?.metrics || []
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0D1B2A] border border-blue-500/30 overflow-hidden shadow-2xl">
        <div className="p-6 border-b" style={{ borderColor: '#1E3A5F' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-900/30">
                <BarChart3 className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{entity.name}</h2>
                <p className="text-sm text-gray-400">{entity.industry} • {entity.market}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((metric, i) => (
              <div key={i} className={`p-4 rounded-xl ${metric.bg}`}>
                <div className="flex items-center gap-2 mb-1">
                  <metric.icon className={`w-4 h-4 ${metric.color}`} />
                  <span className="text-xs text-gray-400">{metric.label}</span>
                </div>
                <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
              </div>
            ))}
          </div>
          
          {kpiMetrics.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Key Research Metrics
              </h3>
              <div className="flex flex-wrap gap-2">
                {kpiMetrics.map((metric, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-green-900/30 text-green-400 text-sm">
                    {metric}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>Last updated: {entity.lastUpdated}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[#111111] border border-[#1E1E1E] text-gray-400 font-medium hover:text-white hover:border-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onViewDashboard && onViewDashboard(entity)}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              View Full Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}