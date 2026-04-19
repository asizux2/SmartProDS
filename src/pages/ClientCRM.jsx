import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, Filter, Building2, Briefcase, Star, TrendingUp, Plus, Mail, Phone } from 'lucide-react'
import { COMPANIES } from '../data/companies'

export default function ClientCRM() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterIndustry, setFilterIndustry] = useState('all')
  const [filterType, setFilterType] = useState('all')

  const filteredCompanies = COMPANIES.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry = filterIndustry === 'all' || c.industry === filterIndustry
    const matchesType = filterType === 'all' || c.type === filterType
    return matchesSearch && matchesIndustry && matchesType
  })

  const industries = [...new Set(COMPANIES.map(c => c.industry))]
  const types = [...new Set(COMPANIES.map(c => c.type))]

  const stats = {
    total: COMPANIES.length,
    active: COMPANIES.filter(c => c.score >= 8).length,
    avgScore: (COMPANIES.reduce((a, c) => a + c.score, 0) / COMPANIES.length).toFixed(1),
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
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Client CRM</h1>
            <p className="text-gray-400">Qualified leads and opportunity tracking</p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">
            <Plus className="w-4 h-4" />
            Add Client
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="rounded-lg p-6" style={{ background: '#111111', border: '1px solid #1E1E1E' }}>
            <p className="text-gray-400 text-sm mb-1">Total Leads</p>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="rounded-lg p-6" style={{ background: '#111111', border: '1px solid #1E1E1E' }}>
            <p className="text-gray-400 text-sm mb-1">High Score (8+)</p>
            <p className="text-3xl font-bold text-green-500">{stats.active}</p>
          </div>
          <div className="rounded-lg p-6" style={{ background: '#111111', border: '1px solid #1E1E1E' }}>
            <p className="text-gray-400 text-sm mb-1">Avg Score</p>
            <p className="text-3xl font-bold text-blue-500">{stats.avgScore}/11</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#111111] border border-[#1E1E1E] text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-10 pr-8 py-3 rounded-lg bg-[#111111] border border-[#1E1E1E] text-white focus:outline-none focus:border-blue-500 appearance-none"
            >
              <option value="all">All Types</option>
              {types.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredCompanies.map(company => (
            <div
              key={company.id}
              className="rounded-lg p-6 transition-all hover:border-blue-500"
              style={{ background: '#111111', border: '1px solid #1E1E1E' }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-900/30 flex items-center justify-center text-2xl">
                    {company.flag}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-white">{company.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        company.score >= 8 ? 'bg-green-900 text-green-400' : 'bg-gray-700 text-gray-400'
                      }`}>
                        {company.score}/11
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{company.industry} · {company.location}</p>
                    <p className="text-gray-500 text-sm mb-3">{company.summary}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500">{company.type}</span>
                      <span className="text-gray-500">{company.size}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(company.kpis.length)].map((_, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500" fill="currentColor" />
                      </div>
                    ))}
                  </div>
                  <Link
                    to={`/dashboards/${company.id}`}
                    className="inline-flex items-center gap-1 text-sm text-blue-500 hover:text-blue-400"
                  >
                    View Dashboard <TrendingUp className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}