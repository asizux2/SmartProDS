import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, Filter, Bot, Zap, Brain, Layers, Workflow, Cpu, ChevronRight } from 'lucide-react'

const SKILLS = [
  {
    id: 'agent-deep-research',
    name: 'Deep Research Agent',
    type: 'orchestrator',
    description: 'Master orchestrator for full research workflow: Research → Synthesis → Dashboard → Report',
    status: 'active',
    commands: ['/research', '/deep-dive'],
    metrics: ['4 research layers', 'multi-source', 'synthetic data'],
  },
  {
    id: 'agent-powerbi-survey',
    name: 'Power BI Survey Agent',
    type: 'output',
    description: 'Builds Power BI dashboards from STG/SPSS survey exports with DAX measures and tracking',
    status: 'active',
    commands: ['/dashboard', '/powerbi'],
    metrics: ['DAX measures', 'Power Query M', 'time series'],
  },
  {
    id: 'agent-data-analytics',
    name: 'Data Analytics Agent',
    type: 'processing',
    description: 'Python/pandas analysis, statistical methods, cross-tabs, segmentation',
    status: 'active',
    commands: ['/analyze', '/data'],
    metrics: ['pandas', 'statistics', 'visualization'],
  },
  {
    id: 'agent-document-creation',
    name: 'Document Creation Agent',
    type: 'output',
    description: 'Generates Word, PowerPoint, Excel, PDF deliverables from research data',
    status: 'active',
    commands: ['/report', '/document'],
    metrics: ['docx', 'pptx', 'xlsx'],
  },
  {
    id: 'agent-marketing-research',
    name: 'Marketing Research Agent',
    type: 'research',
    description: 'Campaign planning, brand health tracking, competitive intelligence',
    status: 'active',
    commands: ['/campaign', '/brand'],
    metrics: ['BHT', 'ad testing', 'NPS'],
  },
  {
    id: 'market-research',
    name: 'Market Research Engine',
    type: 'research',
    description: 'Open-source market research using free data sources for market sizing',
    status: 'active',
    commands: ['/market-research'],
    metrics: ['TAM/SAM/SOM', 'competitors'],
  },
  {
    id: 'wiki-researcher',
    name: 'Wiki Researcher',
    type: 'research',
    description: 'Deep research into new topics, builds knowledge base entries',
    status: 'active',
    commands: ['/wiki-research'],
    metrics: ['12 web searches', 'PDF harvest'],
  },
  {
    id: 'social-listening',
    name: 'Social Listening Agent',
    type: 'ingestion',
    description: 'Monitors social media conversations, brand mentions, sentiment',
    status: 'active',
    commands: ['/social', '/listen'],
    metrics: ['Reddit', 'Google Trends', 'YouTube'],
  },
  {
    id: 'nlp-analysis',
    name: 'NLP Analysis Agent',
    type: 'processing',
    description: 'Sentiment analysis, topic modeling, text classification',
    status: 'active',
    commands: ['/nlp', '/sentiment'],
    metrics: ['HuggingFace', 'spaCy', 'TextBlob'],
  },
  {
    id: 'trend-researcher',
    name: 'Trend Researcher',
    type: 'research',
    description: 'Identifies emerging trends, rising topics, industry shifts',
    status: 'active',
    commands: ['/trends', '/emerging'],
    metrics: ['news', 'research papers'],
  },
  {
    id: 'egypt-researcher',
    name: 'Egypt Researcher',
    type: 'research',
    description: 'Egypt-specific market data, MENA demographics, consumer psychology',
    status: 'active',
    commands: ['/egypt', '/mena'],
    metrics: ['Egypt data', 'Arabic'],
  },
  {
    id: 'competitive-researcher',
    name: 'Competitive Researcher',
    type: 'research',
    description: 'Competitor intelligence, competitive movements, feature comparison',
    status: 'active',
    commands: ['/competitor', '/intel'],
    metrics: ['LinkedIn', 'GitHub', 'job boards'],
  },
  {
    id: 'tech-researcher',
    name: 'Tech Researcher',
    type: 'research',
    description: 'AI tools, technical architecture, framework comparisons',
    status: 'active',
    commands: ['/tech', '/tools'],
    metrics: ['documentation', 'code search'],
  },
  {
    id: 'insight-generator',
    name: 'Insight Generator',
    type: 'synthesis',
    description: 'Finds hidden patterns, creates hypotheses, generates ideas',
    status: 'active',
    commands: ['/insights', '/ideas'],
    metrics: ['pattern matching'],
  },
  {
    id: 'wiki-expander',
    name: 'Wiki Expander',
    type: 'synthesis',
    description: 'Expands existing wiki notes with new sources and information',
    status: 'active',
    commands: ['/expand', '/enrich'],
    metrics: ['source addition'],
  },
  {
    id: 'wiki-synthesizer',
    name: 'Wiki Synthesizer',
    type: 'synthesis',
    description: 'Combines multiple notes, creates comprehensive overviews',
    status: 'active',
    commands: ['/synthesize', '/combine'],
    metrics: ['cross-referencing'],
  },
]

const TYPES = [...new Set(SKILLS.map(s => s.type))]

export default function SkillsLibrary() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const filteredSkills = SKILLS.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || s.type === filterType
    return matchesSearch && matchesType
  })

  const stats = {
    total: SKILLS.length,
    active: SKILLS.filter(s => s.status === 'active').length,
    types: TYPES.length,
  }

  const typeIcons = {
    orchestrator: Workflow,
    output: Layers,
    processing: Cpu,
    research: Brain,
    ingestion: Zap,
    synthesis: Bot,
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
          <h1 className="text-4xl font-bold text-white mb-2">Skills Library</h1>
          <p className="text-gray-400">Agent ecosystem powering the research platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="rounded-lg p-6" style={{ background: '#111111', border: '1px solid #1E1E1E' }}>
            <p className="text-gray-400 text-sm mb-1">Total Agents</p>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="rounded-lg p-6" style={{ background: '#111111', border: '1px solid #1E1E1E' }}>
            <p className="text-gray-400 text-sm mb-1">Active</p>
            <p className="text-3xl font-bold text-green-500">{stats.active}</p>
          </div>
          <div className="rounded-lg p-6" style={{ background: '#111111', border: '1px solid #1E1E1E' }}>
            <p className="text-gray-400 text-sm mb-1">Categories</p>
            <p className="text-3xl font-bold text-blue-500">{stats.types}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#111111] border border-[#1E1E1E] text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-10 pr-8 py-3 rounded-lg bg-[#111111] border border-[#1E1E1E] text-white focus:outline-none focus:border-blue-500 appearance-none"
            >
              <option value="all">All Types</option>
              {TYPES.map(t => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSkills.map(skill => {
            const TypeIcon = typeIcons[skill.type] || Bot
            return (
              <div
                key={skill.id}
                className="rounded-lg p-6 transition-all hover:border-blue-500"
                style={{ background: '#111111', border: '1px solid #1E1E1E' }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-900/30 flex items-center justify-center">
                    <TypeIcon className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-white">{skill.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        skill.status === 'active' ? 'bg-green-900 text-green-400' : 'bg-gray-700 text-gray-400'
                      }`}>
                        {skill.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{skill.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500">
                        {skill.commands.join(', ')}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}