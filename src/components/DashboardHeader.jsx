import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, BarChart3, Building2, MapPin, Calendar, Layers, Database, Bot, TrendingUp, ExternalLink, Home, BookOpen } from 'lucide-react'
import entitiesData from '../data/entities.json'
import Logo from './Logo'

export default function DashboardHeader({ entity, onClose }) {
  const { '*': subPath } = useParams()
  
  const entityData = entity || (subPath ? entitiesData.entities.find(e => e.slug === subPath) : null)
  
  if (!entityData) return null
  
  return (
    <div className="border-b sticky top-0 z-50 backdrop-blur-md" style={{ borderColor: '#1E1E1E', background: 'rgba(10, 10, 10, 0.8)' }}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Link 
                to="/" 
                className="p-2 rounded-lg bg-[#111] text-gray-400 hover:text-white transition-colors" 
                title="Home"
              >
                <Home className="w-4 h-4" />
              </Link>
              <Link 
                to="/skills" 
                className="p-2 rounded-lg bg-[#111] text-gray-400 hover:text-white transition-colors" 
                title="Skills Library"
              >
                <BookOpen className="w-4 h-4" />
              </Link>
            </div>

            <div className="h-4 w-px bg-gray-700" />

            <Link 
              to="/research" 
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Research Hub
            </Link>
            
            <div className="h-4 w-px bg-gray-700" />

            <div className="flex items-center gap-3">
              <Logo entity={entityData} className="w-8 h-8" />
              <div>
                <h1 className="text-lg font-bold text-white leading-tight">{entityData.name}</h1>
                <p className="text-xs text-gray-500">{entityData.industry} • {entityData.market}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Layers className="w-3 h-3" />
                {entityData.research?.deepDives || 0} dives
              </span>
              <span className="flex items-center gap-1">
                <Database className="w-3 h-3" />
                {entityData.data?.csvFiles || 0} files
              </span>
              <span className="flex items-center gap-1">
                <Bot className="w-3 h-3" />
                {entityData.dashboard?.metrics?.length || 0} metrics
              </span>
            </div>
            
            <Link
              to={`/research/${entityData.slug}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-600/20 text-sm hover:bg-blue-600 hover:text-white transition-all"
            >
              <TrendingUp className="w-4 h-4" />
              View Research
            </Link>
          </div>
        </div>
        
        {entityData.dashboard?.metrics && entityData.dashboard.metrics.length > 0 && (
          <div className="flex items-center gap-3 mt-3 pt-3 border-t" style={{ borderColor: '#1E1E1E' }}>
            <span className="text-xs text-gray-500">Intelligence Focus:</span>
            <div className="flex gap-2">
              {entityData.dashboard.metrics.slice(0, 4).map((metric, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-blue-900/20 text-blue-400 text-xs border border-blue-500/20">
                  {metric}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
