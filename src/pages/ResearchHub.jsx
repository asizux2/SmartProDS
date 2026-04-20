import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Search, Filter, Calendar, TrendingUp, Building2, MapPin, ChevronRight } from 'lucide-react'
import entitiesData from '../data/entities.json'

export default function ResearchHub() {
  const { '*': subPath } = useParams()
  const [entities, setEntities] = useState([])
  const [selectedEntity, setSelectedEntity] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterIndustry, setFilterIndustry] = useState('all')

  useEffect(() => {
    setEntities(entitiesData.entities || [])
    if (subPath) {
      const found = entitiesData.entities.find(e => e.slug === subPath)
      setSelectedEntity(found || null)
    }
  }, [subPath])

  const filteredEntities = entities.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.industry.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry = filterIndustry === 'all' || e.industry === filterIndustry
    return matchesSearch && matchesIndustry
  })

  const industries = [...new Set(entities.map(e => e.industry))]

  if (subPath && selectedEntity) {
    return (
      <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
        <header className="border-b" style={{ borderColor: '#1E1E1E', background: '#111111' }}>
          <div className="max-w-7xl mx-auto px-6 py-4">
            <Link to="/research" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Research Hub
            </Link>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">{selectedEntity.name}</h1>
            <div className="flex items-center gap-4 text-gray-400">
              <span className="inline-flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                {selectedEntity.industry}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {selectedEntity.market}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Updated: {selectedEntity.lastUpdated}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="rounded-lg p-6" style={{ background: '#111111', border: '1px solid #1E1E1E' }}>
              <h3 className="text-gray-400 text-sm mb-2">Deep Dives</h3>
              <p className="text-3xl font-bold text-white">{selectedEntity.research.deepDives}</p>
            </div>
            <div className="rounded-lg p-6" style={{ background: '#111111', border: '1px solid #1E1E1E' }}>
              <h3 className="text-gray-400 text-sm mb-2">Data Confidence</h3>
              <p className="text-3xl font-bold text-white capitalize">{selectedEntity.data.confidence}</p>
            </div>
            <div className="rounded-lg p-6" style={{ background: '#111111', border: '1px solid #1E1E1E' }}>
              <h3 className="text-gray-400 text-sm mb-2">Status</h3>
              <p className="text-3xl font-bold text-green-500 capitalize">{selectedEntity.status}</p>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Research Areas (V1)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedEntity.research.v1.map((area, i) => (
                  <div key={i} className="rounded-lg p-4" style={{ background: '#111111', border: '1px solid #1E1E1E' }}>
                    <div className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-blue-500" />
                      <span className="text-white capitalize">{area.replace(/-/g, ' ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {selectedEntity.research.v2?.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Advanced Research (V2)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedEntity.research.v2.map((area, i) => (
                    <div key={i} className="rounded-lg p-4" style={{ background: '#111111', border: '1px solid #1E1E1E' }}>
                      <div className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-purple-500" />
                        <span className="text-white capitalize">{area.replace(/-/g, ' ')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">360° Dashboard</h2>
              <Link
                to={selectedEntity.dashboard?.path || `/dashboards/${selectedEntity.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
              >
                <TrendingUp className="w-5 h-5" />
                View Interactive Dashboard →
              </Link>
            </section>
          </div>
        </main>
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
          <h1 className="text-4xl font-bold text-white mb-2">Research Hub</h1>
          <p className="text-gray-400">360° deep dive intelligence for every entity</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search entities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#111111] border border-[#1E1E1E] text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterIndustry}
              onChange={(e) => setFilterIndustry(e.target.value)}
              className="pl-10 pr-8 py-3 rounded-lg bg-[#111111] border border-[#1E1E1E] text-white focus:outline-none focus:border-blue-500 appearance-none"
            >
              <option value="all">All Industries</option>
              {industries.map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntities.map(entity => (
            <Link
              key={entity.id}
              to={`/research/${entity.slug}`}
              className="rounded-lg p-6 transition-all hover:scale-[1.02]"
              style={{ background: '#111111', border: '1px solid #1E1E1E' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{entity.name}</h3>
                  <p className="text-gray-400 text-sm">{entity.industry}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  entity.status === 'active' ? 'bg-green-900 text-green-400' : 'bg-gray-700 text-gray-400'
                }`}>
                  {entity.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{entity.market}</span>
                <span>{entity.research.deepDives} deep dives</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}