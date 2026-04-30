import { motion } from 'framer-motion'
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie
} from 'recharts'

const COLORS = {
  blue: '#1E88E5',
  green: '#22C55E',
  red: '#EF4444',
  yellow: '#F59E0B',
  purple: '#A855F7',
  orange: '#F97316',
  teal: '#14B8A6',
  cyan: '#06B6D4',
  pink: '#EC4899',
}

const colorArray = Object.values(COLORS)

export function RadarChartCard({ title, data, dataKey, colors }) {
  const chartColors = colors || colorArray
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl p-5"
      style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E' }}
    >
      <h3 className="text-gray-400 text-xs font-medium mb-4 uppercase tracking-wide">{title}</h3>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={data}>
          <PolarGrid stroke="#333" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 11 }} />
          <PolarRadiusAxis tick={{ fill: '#555', fontSize: 10 }} domain={[0, 'auto']} />
          <Radar
            name={dataKey}
            dataKey={dataKey}
            stroke={chartColors[0]}
            fill={chartColors[0]}
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export function MultiRadarCard({ title, data, dataKeys, colors }) {
  const chartColors = colors || colorArray
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl p-5"
      style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E' }}
    >
      <h3 className="text-gray-400 text-xs font-medium mb-4 uppercase tracking-wide">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid stroke="#333" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 11 }} />
          <PolarRadiusAxis tick={{ fill: '#555', fontSize: 10 }} domain={[0, 'auto']} />
          {dataKeys.map((key, i) => (
            <Radar
              key={key}
              name={key}
              dataKey={key}
              stroke={chartColors[i % chartColors.length]}
              fill={chartColors[i % chartColors.length]}
              fillOpacity={0.2}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export function FunnelChartCard({ title, data, colors }) {
  const chartColors = colors || colorArray
  const total = data.reduce((sum, d) => sum + d.value, 0)
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl p-5"
      style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E' }}
    >
      <h3 className="text-gray-400 text-xs font-medium mb-4 uppercase tracking-wide">{title}</h3>
      <div className="space-y-2">
        {data.map((item, i) => {
          const width = (item.value / total) * 100
          return (
            <motion.div 
              key={item.name}
              initial={{ width: 0 }}
              animate={{ width: `${width}%` }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative h-10 rounded-lg overflow-hidden"
              style={{ margin: '0 auto', maxWidth: '100%' }}
            >
              <div 
                className="absolute inset-0 flex items-center justify-between px-4"
                style={{ backgroundColor: chartColors[i % chartColors.length] }}
              >
                <span className="text-white text-sm font-medium">{item.name}</span>
                <span className="text-white text-sm font-bold">{item.value}</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export function HeatmapCard({ title, data, xKey, yKey, valueKey, colors }) {
  const chartColors = colors || ['#1E88E5', '#22C55E', '#F59E0B', '#EF4444']
  
  const maxValue = Math.max(...data.map(d => d[valueKey]))
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl p-5"
      style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E' }}
    >
      <h3 className="text-gray-400 text-xs font-medium mb-4 uppercase tracking-wide">{title}</h3>
      <div className="overflow-x-auto">
        <div className="min-w-[300px]">
          {data.map((row, i) => {
            const intensity = row[valueKey] / maxValue
            return (
              <div key={i} className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-xs w-20">{row[yKey]}</span>
                <div className="flex-1 h-6 rounded mx-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${intensity * 100}%` }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="h-full rounded"
                    style={{ 
                      backgroundColor: chartColors[Math.floor(intensity * (chartColors.length - 1))] 
                    }}
                  />
                </div>
                <span className="text-white text-xs w-12 text-right">{row[valueKey]}</span>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export function GaugeChartCard({ title, value, max = 100, color, label }) {
  const col = color || COLORS.blue
  const percentage = Math.min((value / max) * 100, 100)
  const circumference = 2 * Math.PI * 40
  const strokeDasharray = (percentage / 100) * circumference
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl p-5"
      style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E' }}
    >
      <h3 className="text-gray-400 text-xs font-medium mb-4 uppercase tracking-wide">{title}</h3>
      <div className="flex items-center justify-center">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#222"
              strokeWidth="10"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke={col}
              strokeWidth="10"
              strokeLinecap="round"
              initial={{ strokeDasharray: 0 }}
              animate={{ strokeDasharray: `${strokeDasharray} ${circumference - strokeDasharray}` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">{value}</span>
            {label && <span className="text-gray-500 text-xs">{label}</span>}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function BubbleChartCard({ title, data, colors }) {
  const chartColors = colors || colorArray
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl p-5"
      style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E' }}
    >
      <h3 className="text-gray-400 text-xs font-medium mb-4 uppercase tracking-wide">{title}</h3>
      <div className="h-64 flex flex-wrap items-center justify-center gap-4">
        {data.map((item, i) => {
          const size = Math.max(20, Math.min(80, item.value / 10))
          return (
            <motion.div
              key={item.name}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="rounded-full flex items-center justify-center"
              style={{ 
                width: size * 2, 
                height: size * 2,
                backgroundColor: chartColors[i % chartColors.length] + '40',
                border: `2px solid ${chartColors[i % chartColors.length]}`
              }}
            >
              <span className="text-white text-xs font-medium px-2 text-center">{item.name}</span>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export function TreemapCard({ title, data, colors }) {
  const chartColors = colors || colorArray
  
  const total = data.reduce((sum, d) => sum + d.value, 0)
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl p-5"
      style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E' }}
    >
      <h3 className="text-gray-400 text-xs font-medium mb-4 uppercase tracking-wide">{title}</h3>
      <div className="w-full aspect-video rounded-lg overflow-hidden flex flex-wrap">
        {data.map((item, i) => {
          const pct = (item.value / total) * 100
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex flex-col items-center justify-center p-2"
              style={{ 
                width: `${pct}%`, 
                backgroundColor: chartColors[i % chartColors.length] + '90',
                border: '1px solid #111'
              }}
            >
              <span className="text-white text-xs font-medium truncate">{item.name}</span>
              <span className="text-white text-xs">{item.value}</span>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export { COLORS, colorArray }