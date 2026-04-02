import { useInView } from '../hooks/useInView'
import { motion } from 'framer-motion'

function SpatialHeatMap() {
  // Generate a random matrix of nodes for the spatial map
  const nodes = Array.from({ length: 48 }).map((_, i) => ({
    id: i,
    x: (i % 8) * 12 + Math.random() * 4,
    y: Math.floor(i / 8) * 15 + Math.random() * 4,
    size: Math.random() * 2.5 + 1,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
    isHotspot: Math.random() > 0.85
  }))

  const lines = []
  for (let i = 0; i < 20; i++) {
    const n1 = nodes[Math.floor(Math.random() * nodes.length)]
    const n2 = nodes[Math.floor(Math.random() * nodes.length)]
    if (n1 !== n2) lines.push({ id: i, x1: n1.x, y1: n1.y, x2: n2.x, y2: n2.y })
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        
        {/* Animated connecting lines */}
        {lines.map(line => (
          <motion.line
            key={`line-${line.id}`}
            x1={`${line.x1}%`} y1={`${line.y1}%`}
            x2={`${line.x2}%`} y2={`${line.y2}%`}
            stroke={line.id % 3 === 0 ? "#EF5F17" : "#2D6DF6"}
            strokeWidth="0.15"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1, 0],
              opacity: [0, 0.4, 0.4, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}

        {/* Pulsing GIS Nodes */}
        {nodes.map(node => (
          <motion.circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            fill={node.isHotspot ? "#EF5F17" : "#2D6DF6"}
            initial={{ opacity: 0.1, scale: 0.5 }}
            animate={{
              opacity: node.isHotspot ? [0.2, 0.8, 0.2] : [0.1, 0.4, 0.1],
              scale: node.isHotspot ? [0.8, 1.5, 0.8] : [0.5, 1, 0.5],
              filter: node.isHotspot ? ["blur(1px)", "blur(3px)", "blur(1px)"] : "none"
            }}
            transition={{
              duration: node.duration,
              repeat: Infinity,
              delay: node.delay,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Egypt Regional Overlay abstraction */}
        <motion.ellipse
          cx="30%" cy="40%" rx="15" ry="25"
          fill="url(#heatGradient1)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.ellipse
          cx="70%" cy="60%" rx="20" ry="15"
          fill="url(#heatGradient2)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 2, ease: "easeInOut" }}
        />

        <defs>
          <radialGradient id="heatGradient1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EF5F17" stopOpacity="1" />
            <stop offset="100%" stopColor="#EF5F17" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="heatGradient2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2D6DF6" stopOpacity="1" />
            <stop offset="100%" stopColor="#2D6DF6" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div className="font-mono-custom text-xs mb-2 tracking-widest uppercase" style={{ color: '#2D6DF6' }}>
      // {children}
    </div>
  )
}

export default function AboutMe() {
  const [ref, inView] = useInView(0.1)

  return (
    <section id="architect" className="py-32 relative overflow-hidden" style={{ background: '#050505' }}>
      <SpatialHeatMap />
      
      <div className="max-w-content mx-auto px-6 relative z-10" ref={ref}>
        {/* Header Area */}
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col md:flex-row gap-8 mb-16 items-end justify-between border-b pb-12" style={{ borderColor: '#1F1F1F' }}>
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 font-mono-custom text-xs border rounded mb-6" style={{ borderColor: '#EF5F17', color: '#EF5F17', background: 'rgba(239,95,23,0.05)' }}>
                THE DATA ARCHITECT
              </span>
              <h2 className="font-display text-4xl md:text-6xl leading-tight mb-4" style={{ color: '#F5F5F5' }}>
                ESLAM KHALED <span style={{ color: '#2D6DF6' }}>IBRAHIM</span>
              </h2>
              <p className="text-xl leading-relaxed" style={{ color: '#8B8B8B', fontFamily: 'DM Sans, sans-serif' }}>
                Manager at NielsenIQ (NIQ) · Founder of SmartProDS.<br/>
                Orchestrating end-to-end Market Research operations across 4 regions with advanced AI, Spatial GIS, and Code-Driven Automations.
              </p>
            </div>
            
            {/* Quick Stats Grid */}
            <div className="flex gap-6 shrink-0 font-mono-custom text-sm">
              <div className="flex flex-col gap-1 text-right">
                <span style={{ color: '#6B6B6B' }}>PROJECTS</span>
                <span className="text-2xl" style={{ color: '#F5F5F5' }}>50<span style={{ color: '#2D6DF6' }}>+</span></span>
              </div>
              <div className="w-px bg-[#1f1f1f]" />
              <div className="flex flex-col gap-1 text-right">
                <span style={{ color: '#6B6B6B' }}>REGIONS</span>
                <span className="text-2xl" style={{ color: '#F5F5F5' }}>04</span>
              </div>
              <div className="w-px bg-[#1f1f1f]" />
              <div className="flex flex-col gap-1 text-right">
                <span style={{ color: '#6B6B6B' }}>BASED IN</span>
                <span className="text-xl mt-1" style={{ color: '#F5F5F5' }}>CAIRO, EG</span>
              </div>
            </div>
          </div>
        </div>

        {/* Three Columns Stack */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          
          {/* Col 1: Credentials */}
          <div className={`transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <SectionLabel>Education & Credentials</SectionLabel>
            <div className="flex flex-col gap-6 mt-6">
              <div className="border-l-2 pl-4" style={{ borderColor: '#2D6DF6' }}>
                <h4 className="text-md font-semibold mb-1" style={{ color: '#F5F5F5', fontFamily: 'DM Sans, sans-serif' }}>Diploma in Data Science & AI</h4>
                <p className="font-mono-custom text-xs" style={{ color: '#6B6B6B' }}>Epsilon AI</p>
              </div>
              <div className="border-l-2 pl-4" style={{ borderColor: '#2D6DF6' }}>
                <h4 className="text-md font-semibold mb-1" style={{ color: '#F5F5F5', fontFamily: 'DM Sans, sans-serif' }}>Diploma in Geospatial Info Systems</h4>
                <p className="font-mono-custom text-xs" style={{ color: '#6B6B6B' }}>Ain Shams University</p>
              </div>
              <div className="border-l-2 pl-4" style={{ borderColor: '#222222' }}>
                <h4 className="text-md font-semibold mb-1" style={{ color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif' }}>Bachelor of Geography</h4>
                <p className="font-mono-custom text-xs" style={{ color: '#6B6B6B' }}>Ain Shams University</p>
              </div>
            </div>
          </div>

          {/* Col 2: Vibe Coding & AI stack */}
          <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <SectionLabel>Next-Gen & "Vibe" Coding</SectionLabel>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Vibe Coding', 'Openclaw', 'Claude 3.5/3.7', 'Local RAGs', 'AI Web Scrappers', 'Workflow Automations', 'Master Data (MD)'].map(tag => (
                <span key={tag} className="px-3 py-1.5 text-xs font-mono-custom rounded border transition-all duration-300"
                  style={{ 
                    background: 'rgba(34,197,94,0.05)', 
                    color: '#22C55E', 
                    borderColor: 'rgba(34,197,94,0.2)' 
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,197,94,0.15)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(34,197,94,0.05)' }}>
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed" style={{ color: '#8B8B8B', fontFamily: 'DM Sans, sans-serif' }}>
              Pioneering hyper-accelerated MR workflows using autonomous agent frameworks, advanced LLMs, and intelligent systemic integration.
            </p>
          </div>

          {/* Col 3: MR & Enterprise Stack */}
          <div className={`transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <SectionLabel>Enterprise Data Stack</SectionLabel>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold" style={{ color: '#F5F5F5' }}>Languages</span>
                <span className="font-mono-custom text-xs" style={{ color: '#6B6B6B' }}>Python • C# • VBA</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold" style={{ color: '#F5F5F5' }}>Databases</span>
                <span className="font-mono-custom text-xs" style={{ color: '#6B6B6B' }}>SQL • MySQL • Access</span>
              </div>
              <div className="flex flex-col gap-1.5 mt-2">
                <span className="text-xs font-semibold" style={{ color: '#F5F5F5' }}>Visualization</span>
                <span className="font-mono-custom text-xs" style={{ color: '#6B6B6B' }}>Power BI • Azure</span>
              </div>
              <div className="flex flex-col gap-1.5 mt-2">
                <span className="text-xs font-semibold" style={{ color: '#F5F5F5' }}>Survey/GIS</span>
                <span className="font-mono-custom text-xs" style={{ color: '#6B6B6B' }}>ESRI • SPSS • STG</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
