import { useState, useEffect } from 'react'

const TRACKING_KEY = 'marbrain_dashboard_stats'

export function trackDashboardView(entitySlug, entityName) {
  const stats = getDashboardStats()
  
  if (!stats.views[entitySlug]) {
    stats.views[entitySlug] = { name: entityName, views: 0, lastView: null }
  }
  
  stats.views[entitySlug].views += 1
  stats.views[entitySlug].lastView = new Date().toISOString()
  stats.totalViews += 1
  stats.lastUpdated = new Date().toISOString()
  
  saveDashboardStats(stats)
  
  console.log(`[Learning] Tracked dashboard view: ${entityName}`)
}

export function getDashboardStats() {
  try {
    const stored = localStorage.getItem(TRACKING_KEY)
    return stored ? JSON.parse(stored) : {
      views: {},
      totalViews: 0,
      lastUpdated: null
    }
  } catch {
    return { views: {}, totalViews: 0, lastUpdated: null }
  }
}

function saveDashboardStats(stats) {
  try {
    localStorage.setItem(TRACKING_KEY, JSON.stringify(stats))
  } catch (e) {
    console.error('[Learning] Failed to save stats:', e)
  }
}

export function useDashboardStats() {
  const [stats, setStats] = useState({
    views: {},
    totalViews: 0,
    lastUpdated: null
  })

  useEffect(() => {
    setStats(getDashboardStats())
  }, [])

  return stats
}

export function DashboardStatsBar() {
  const stats = useDashboardStats()
  
  const topEntities = Object.entries(stats.views)
    .sort((a, b) => b[1].views - a[1].views)
    .slice(0, 3)

  if (stats.totalViews === 0) return null

  return (
    <div className="flex items-center gap-4 text-xs text-gray-500">
      <span>{stats.totalViews} views</span>
      {topEntities.length > 0 && (
        <span>
          Top: {topEntities.map(([slug, data]) => data.name).slice(0, 2).join(', ')}
        </span>
      )}
    </div>
  )
}

export default { trackDashboardView, getDashboardStats, useDashboardStats, DashboardStatsBar }