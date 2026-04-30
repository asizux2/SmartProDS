import { motion } from 'framer-motion'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const COLORS = {
  blue: '#1E88E5',
  green: '#22C55E',
  red: '#EF4444',
  yellow: '#F59E0B',
  purple: '#A855F7',
  orange: '#F97316',
  teal: '#14B8A6',
}

export function KPICard({ 
  label, 
  value, 
  change, 
  trend = 'up', 
  color = 'blue',
  prefix = '',
  suffix = ''
}) {
  const trendColor = trend === 'up' ? COLORS.green : COLORS.red
  const colorValue = COLORS[color] || COLORS.blue

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl p-5"
      style={{ 
        backgroundColor: '#111111', 
        border: '1px solid #1E1E1E',
        borderLeft: `3px solid ${colorValue}`
      }}
    >
      <p className="text-gray-400 text-xs font-medium mb-2 uppercase tracking-wide">{label}</p>
      <div className="flex items-baseline gap-2">
        {prefix && <span className="text-gray-500 text-sm">{prefix}</span>}
        <span className="text-3xl font-bold text-white">{value}</span>
        {suffix && <span className="text-gray-500 text-sm">{suffix}</span>}
      </div>
      {change !== undefined && (
        <div className="flex items-center gap-1 mt-2">
          <span style={{ color: trendColor }} className="text-sm font-medium">
            {trend === 'up' ? '↑' : '↓'} {Math.abs(change)}%
          </span>
          <span className="text-gray-500 text-xs">vs last period</span>
        </div>
      )}
    </motion.div>
  )
}

export function MetricGrid({ children }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {children}
    </div>
  )
}

export function DonutChartCard({ title, data, colors }) {
  const total = data.reduce((sum, d) => sum + d.value, 0)
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl p-5"
      style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E' }}
    >
      <h3 className="text-gray-400 text-xs font-medium mb-4 uppercase tracking-wide">{title}</h3>
      <div className="flex items-center gap-6">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            {data.map((item, i) => {
              const offset = data.slice(0, i).reduce((sum, d) => sum + d.value, 0) / total * 100
              const dash = (item.value / total) * 100
              return (
                <circle
                  key={i}
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="transparent"
                  stroke={colors[i % colors.length]}
                  strokeWidth="3"
                  strokeDasharray={`${dash} ${100 - dash}`}
                  strokeDashoffset={-offset}
                />
              )
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{total}</span>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          {data.map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: colors[i % colors.length] }}
                />
                <span className="text-gray-400 text-sm">{item.name}</span>
              </div>
              <span className="text-white font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function BarListCard({ title, data, color = COLORS.blue }) {
  const max = Math.max(...data.map(d => d.value))
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl p-5"
      style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E' }}
    >
      <h3 className="text-gray-400 text-xs font-medium mb-4 uppercase tracking-wide">{title}</h3>
      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">{item.name}</span>
              <span className="text-white font-medium">{item.value}</span>
            </div>
            <div className="h-2 rounded-full bg-[#1E1E1E] overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / max) * 100}%` }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export function AreaChartCard({ title, data, dataKeys, colors = [] }) {
  const colorArray = Object.values(COLORS)
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl p-5"
      style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E' }}
    >
      <h3 className="text-gray-400 text-xs font-medium mb-4 uppercase tracking-wide">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <defs>
            {dataKeys.map((key, i) => (
              <linearGradient key={key} id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors[i] || colorArray[i % colorArray.length]} stopOpacity={0.4} />
                <stop offset="95%" stopColor={colors[i] || colorArray[i % colorArray.length]} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#222" />
          <XAxis dataKey="name" tick={{ fill: '#666', fontSize: 10 }} axisLine={{ stroke: '#333' }} />
          <YAxis tick={{ fill: '#666', fontSize: 10 }} axisLine={{ stroke: '#333' }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: 8 }}
            labelStyle={{ color: '#fff' }}
          />
          {dataKeys.map((key, i) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[i] || colorArray[i % colorArray.length]}
              fill={`url(#grad-${i})`}
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export { KPICard, MetricGrid, DonutChartCard, BarListCard, AreaChartCard, COLORS }