// EnhancedDashboard.jsx
// Reconstructed full dashboard component (modular-in-one-file version)
// Tabs: Overview, Analytics, Customization, Integration, Compliance, Revenue, Preview
// NOTE: In future consider splitting into /dashboard/ subcomponents for maintainability.

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {
  RefreshCw,
  Loader2,
  BarChart3,
  Settings,
  Code,
  Shield,
  DollarSign,
  Eye,
  Grid,
  Palette,
  Globe,
  Database,
  Copy,
  CheckCircle2,
  AlertCircle,
  Info,
  Save,
  Download,
  ExternalLink,
  PieChart,
  LineChart,
  Laptop,
  Smartphone,
  Tablet,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight
} from 'lucide-react'
import { useAuth } from './AuthContext'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Badge } from '@/components/ui/badge.jsx'

/* ------------------------------------------------------------------
 * Utilities
 * ------------------------------------------------------------------ */

const formatNumber = (n) => {
  if (n == null || isNaN(n)) return '—'
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
  return n.toString()
}

const relativeTime = (iso) => {
  if (!iso) return '—'
  const d = new Date(iso)
  const diff = Date.now() - d.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return d.toLocaleDateString()
}

/* ------------------------------------------------------------------
 * Tab Keys
 * ------------------------------------------------------------------ */
const TABS = [
  { key: 'overview', label: 'Overview', icon: Grid },
  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
  { key: 'customization', label: 'Customization', icon: Palette },
  { key: 'integration', label: 'Integration', icon: Code },
  { key: 'compliance', label: 'Compliance', icon: Shield },
  { key: 'revenue', label: 'Revenue', icon: DollarSign },
  { key: 'preview', label: 'Preview', icon: Eye }
]

/* ------------------------------------------------------------------
 * Hook: useDashboardData (aggregated simple fetch pattern)
 * ------------------------------------------------------------------ */
const useDashboardData = (enabled) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState({
    metrics: null,
    compliance: null,
    revenue: null,
    customization: null,
    integration: null
  })

  const load = useCallback(async () => {
    if (!enabled) return
    setLoading(true)
    setError(null)
    try {
      // Batch parallel fetch for speed; each wrapped to avoid total failure cascade
      const endpoints = {
        metrics: '/api/dashboard/metrics',
        compliance: '/api/compliance/status',
        revenue: '/api/revenue/summary',
        customization: '/api/customization/config',
        integration: '/api/integration/sites'
      }

      const entries = await Promise.all(
        Object.entries(endpoints).map(async ([k, endpoint]) => {
          try {
            const res = await api.get(endpoint)
            return [k, res]
          } catch (e) {
            return [k, { error: true, message: e.message }]
          }
        })
      )

      setData(prev => {
        const next = { ...prev }
        for (const [k, v] of entries) next[k] = v
        return next
      })
    } catch (e) {
      setError(e.message || 'Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }, [enabled])

  useEffect(() => {
    load()
  }, [load])

  return { ...data, loading, error, reload: load }
}

/* ------------------------------------------------------------------
 * Collapsible Section Component
 * ------------------------------------------------------------------ */
const Collapsible = ({ title, defaultOpen = true, children, icon: Icon }) => {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <span className="flex items-center gap-2 font-medium text-gray-800">
          {Icon && <Icon className="h-4 w-4 text-gray-500" />}
          {title}
        </span>
        {open ? <ChevronDown className="h-4 w-4 text-gray-500" /> : <ChevronRight className="h-4 w-4 text-gray-500" />}
      </button>
      {open && (
        <div className="border-t border-gray-100 p-4">
          {children}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------
 * Overview Tab
 * ------------------------------------------------------------------ */
const OverviewTab = ({ metrics, compliance, revenue, reload, globalLoading }) => {
  const metricCards = useMemo(() => {
    return [
      {
        label: 'Monthly Page Views',
        value: formatNumber(metrics?.page_views),
        desc: 'Total tracked this month',
        icon: Globe
      },
      {
        label: 'Consent Rate',
        value: metrics?.consent_rate != null ? (metrics.consent_rate * 100).toFixed(1) + '%' : '—',
        desc: 'Accept / total prompts',
        icon: PieChart
      },
      {
        label: 'Revenue (MTD)',
        value: revenue?.summary?.mtd != null ? '$' + (revenue.summary.mtd / 100).toFixed(2) : '—',
        desc: 'Privacy Insights gross',
        icon: DollarSign
      },
      {
        label: 'Compliance Status',
        value: compliance?.status || 'Unknown',
        desc: compliance?.jurisdictions?.join(', ') || 'No data',
        icon: Shield
      }
    ]
  }, [metrics, compliance, revenue])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Overview</h2>
        <Button variant="outline" size="sm" disabled={globalLoading} onClick={reload}>
          {globalLoading ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-1" />}
          Refresh
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {metricCards.map((mc, i) => {
          const Icon = mc.icon
            return (
              <Card key={i} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600">{mc.label}</CardTitle>
                    <Icon className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="text-2xl font-semibold mt-2">{mc.value}</div>
                  <CardDescription className="mt-1">{mc.desc}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Snapshot of latest consent events</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">
            <p>Activity feed integration pending. This placeholder gives structure.</p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Example: User accepted all cookies 2m ago.
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                Example: User declined analytics 14m ago.
              </li>
              <li className="flex items-center gap-2">
                <Info className="h-4 w-4 text-blue-500" />
                Example: User updated preferences 1h ago.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Status of key services</CardDescription>
          </CardHeader>
            <CardContent className="text-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-indigo-500" /> Database
                  </span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">OK</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-indigo-500" /> Compliance Service
                  </span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">OK</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-indigo-500" /> Preview CDN
                  </span>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">DEGRADED</Badge>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">This section can be wired to a /api/status endpoint.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------
 * Analytics Tab (simplified placeholders)
 * ------------------------------------------------------------------ */
const AnalyticsTab = ({ metrics, loading, reload }) => {
  const chartPlaceholder = (
    <div className="h-56 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 border border-dashed border-gray-300 rounded-lg text-gray-400 text-sm">
      Chart placeholder – integrate Recharts/Victory or custom D3
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-indigo-500" /> Analytics
        </h2>
        <Button variant="outline" size="sm" onClick={reload} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle>Consent Trend</CardTitle>
            <CardDescription>Daily consent acceptance vs rejections</CardDescription>
          </CardHeader>
          <CardContent>{chartPlaceholder}</CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>Functional / Analytics / Marketing distribution</CardDescription>
          </CardHeader>
          <CardContent>{chartPlaceholder}</CardContent>
        </Card>
      </div>

      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle>Key Metrics (Raw)</CardTitle>
          <CardDescription>Debug / direct values from API</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-md text-xs overflow-auto">
            {JSON.stringify(metrics || {}, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}

/* ------------------------------------------------------------------
 * Customization Tab
 * ------------------------------------------------------------------ */
const defaultCustomization = {
  theme: 'light',
  layout: 'dialog',
  position: 'bottom-right',
  palette: {
    primary: '#4f46e5',
    accent: '#9333ea',
    background: '#ffffff',
    text: '#111827'
  },
  bannerType: 'multilevel',
  buttonStyle: 'cta',
  showOverlay: true,
  animation: 'slide',
  customCSS: ''
}

const CustomizationTab = ({ initialConfig, onSave }) => {
  const [config, setConfig] = useState(() => ({ ...defaultCustomization, ...(initialConfig || {}) }))
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState(null)
  const [error, setError] = useState(null)

  const update = (path, value) => {
    setConfig(prev => {
      const next = { ...prev }
      if (path.includes('.')) {
        const [root, key] = path.split('.')
        next[root] = { ...next[root], [key]: value }
      } else {
        next[path] = value
      }
      return next
    })
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    try {
      await onSave(config)
      setSavedAt(new Date().toISOString())
    } catch (e) {
      setError(e.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Palette className="h-5 w-5 text-indigo-500" />
          Customization
        </h2>
        <div className="flex items-center gap-3">
          {savedAt && (
            <span className="text-xs text-gray-500">
              Saved {relativeTime(savedAt)}
            </span>
          )}
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Save
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-3 border border-red-200 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Collapsible title="Layout & Theme" icon={SlidersHorizontal}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Layout</label>
                <select
                  className="w-full border rounded-md px-3 py-2"
                  value={config.layout}
                  onChange={e => update('layout', e.target.value)}
                >
                  <option value="dialog">Dialog</option>
                  <option value="bar">Bar</option>
                  <option value="inline">Inline</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Theme</label>
                <select
                  className="w-full border rounded-md px-3 py-2"
                  value={config.theme}
                  onChange={e => update('theme', e.target.value)}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Banner Type</label>
                <select
                  className="w-full border rounded-md px-3 py-2"
                  value={config.bannerType}
                  onChange={e => update('bannerType', e.target.value)}
                >
                  <option value="multilevel">Multilevel</option>
                  <option value="accept-only">Accept Only</option>
                  <option value="accept-decline">Accept / Decline</option>
                  <option value="inline-multilevel">Inline Multilevel</option>
                  <option value="ccpa">CCPA</option>
                </select>
              </div>
            </div>
          </Collapsible>

          <Collapsible title="Colors" defaultOpen={false} icon={Palette}>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(config.palette).map(([k, v]) => (
                <div key={k}>
                  <label className="block text-xs font-medium mb-1 uppercase tracking-wide">{k}</label>
                  <input
                    type="color"
                    className="w-full h-10 rounded cursor-pointer"
                    value={v}
                    onChange={(e) => update(`palette.${k}`, e.target.value)}
                  />
                  <input
                    type="text"
                    className="mt-1 w-full text-xs border rounded px-2 py-1"
                    value={v}
                    onChange={(e) => update(`palette.${k}`, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </Collapsible>

          <Collapsible title="Behavior" defaultOpen={false} icon={Settings}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Overlay</span>
                <input
                  type="checkbox"
                  checked={config.showOverlay}
                  onChange={e => update('showOverlay', e.target.checked)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Animation</label>
                <select
                  className="w-full border rounded-md px-3 py-2"
                  value={config.animation}
                  onChange={e => update('animation', e.target.value)}
                >
                  <option value="slide">Slide</option>
                  <option value="fade">Fade</option>
                  <option value="none">None</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Position</label>
                <select
                  className="w-full border rounded-md px-3 py-2"
                  value={config.position}
                  onChange={e => update('position', e.target.value)}
                >
                  <option value="bottom-right">Bottom Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="top-right">Top Right</option>
                  <option value="top-left">Top Left</option>
                  <option value="center">Center</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Button Style</label>
                <select
                  className="w-full border rounded-md px-3 py-2"
                  value={config.buttonStyle}
                  onChange={e => update('buttonStyle', e.target.value)}
                >
                  <option value="cta">CTA</option>
                  <option value="solid">Solid</option>
                  <option value="outline">Outline</option>
                  <option value="minimal">Minimal</option>
                </select>
              </div>
            </div>
          </Collapsible>
        </div>

        <div className="space-y-6">
          <Collapsible title="Custom CSS" icon={Code}>
            <Textarea
              rows={10}
              value={config.customCSS}
              onChange={(e) => update('customCSS', e.target.value)}
              placeholder="/* Add custom CSS overrides here */"
            />
            <p className="text-xs text-gray-500 mt-2">Be cautious: CSS errors could break banner layout.</p>
          </Collapsible>

          <Collapsible title="Live Banner Snapshot (Mock)" icon={Eye} defaultOpen={false}>
            <div
              className="rounded-lg border p-4 text-sm"
              style={{
                background: config.theme === 'dark' ? '#1f2937' : config.palette.background,
                color: config.theme === 'dark' ? '#f3f4f6' : config.palette.text,
                borderColor: config.palette.primary
              }}
            >
              <div className="font-semibold mb-2">Cookie Preferences</div>
              <p className="text-xs mb-4">
                We use cookies to enhance your experience. Customize consent below.
              </p>
              <div className="flex gap-2 flex-wrap">
                <button
                  style={{
                    background: config.palette.primary,
                    color: '#fff'
                  }}
                  className="px-3 py-1 rounded text-xs font-medium"
                >Accept All</button>
                <button
                  style={{
                    background: config.palette.accent,
                    color: '#fff'
                  }}
                  className="px-3 py-1 rounded text-xs font-medium"
                >Customize</button>
                <button
                  className="px-3 py-1 rounded text-xs font-medium border border-current"
                  style={{
                    background: 'transparent'
                  }}
                >Decline</button>
              </div>
            </div>
          </Collapsible>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------
 * Integration Tab
 * ------------------------------------------------------------------ */
const IntegrationTab = ({ integration, onAddSite, onGenerateSnippet }) => {
  const [newDomain, setNewDomain] = useState('')
  const [adding, setAdding] = useState(false)
  const [copyOk, setCopyOk] = useState(false)
  const [snippet, setSnippet] = useState(null)
  const [genLoading, setGenLoading] = useState(false)
  const [error, setError] = useState(null)

  const sites = integration?.sites || []

  const handleAdd = async () => {
    setError(null)
    if (!newDomain.trim()) return
    setAdding(true)
    try {
      await onAddSite(newDomain.trim())
      setNewDomain('')
    } catch (e) {
      setError(e.message || 'Failed to add site')
    } finally {
      setAdding(false)
    }
  }

  const handleGenerate = async (domain) => {
    setGenLoading(true)
    setSnippet(null)
    setError(null)
    try {
      const result = await onGenerateSnippet(domain)
      setSnippet(result?.snippet || '// Snippet unavailable')
    } catch (e) {
      setError(e.message || 'Failed to generate snippet')
    } finally {
      setGenLoading(false)
    }
  }

  const copySnippet = async () => {
    if (!snippet) return
    try {
      await navigator.clipboard.writeText(snippet)
      setCopyOk(true)
      setTimeout(() => setCopyOk(false), 1600)
    } catch { /* noop */ }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Code className="h-5 w-5 text-indigo-500" /> Integration
      </h2>

      {error && (
        <div className="p-3 rounded-md border border-red-200 bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}

      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle>Websites</CardTitle>
          <CardDescription>Domains currently configured</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="example.com"
              value={newDomain}
              onChange={e => setNewDomain(e.target.value)}
              disabled={adding}
            />
            <Button onClick={handleAdd} disabled={adding || !newDomain.trim()}>
              {adding ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Add
            </Button>
          </div>
          <ul className="space-y-2 text-sm">
            {sites.length === 0 && <li className="text-gray-500">No sites added yet.</li>}
            {sites.map(s => (
              <li key={s.id || s.domain} className="flex items-center justify-between border rounded px-3 py-2">
                <span className="font-medium text-gray-800">{s.domain}</span>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    {s.status || 'active'}
                  </Badge>
                  <Button size="sm" variant="outline" onClick={() => handleGenerate(s.domain)}>
                    {genLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Code className="h-3 w-3" />}
                    <span className="ml-1">Snippet</span>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {snippet && (
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle>Integration Snippet</CardTitle>
            <CardDescription>Copy & paste before closing &lt;/head&gt;</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className="bg-gray-900 text-green-300 text-xs p-4 rounded-md overflow-auto">
                {snippet}
              </pre>
              <Button
                size="sm"
                className="absolute top-2 right-2"
                variant="secondary"
                onClick={copySnippet}
              >
                {copyOk ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------
 * Compliance Tab
 * ------------------------------------------------------------------ */
const ComplianceTab = ({ compliance, reload, loading }) => {
  const jurisdictions = compliance?.jurisdictions || []
  const issues = compliance?.issues || []
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Shield className="h-5 w-5 text-indigo-500" /> Compliance
        </h2>
        <Button size="sm" variant="outline" onClick={reload} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          <span className="ml-1">Refresh</span>
        </Button>
      </div>

      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle>Status</CardTitle>
          <CardDescription>Current compliance coverage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {jurisdictions.length === 0 && (
              <Badge variant="outline">None Detected</Badge>
            )}
            {jurisdictions.map(j => (
              <Badge key={j} variant="outline" className="bg-indigo-50 border-indigo-200 text-indigo-700">
                {j}
              </Badge>
            ))}
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Potential Issues</h4>
            {issues.length === 0 && (
              <p className="text-xs text-gray-500">No issues reported.</p>
            )}
            <ul className="space-y-2">
              {issues.map((iss, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                  <span>{iss.message || iss}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* ------------------------------------------------------------------
 * Revenue Tab
 * ------------------------------------------------------------------ */
const RevenueTab = ({ revenue, reload, loading }) => {
  const summary = revenue?.summary || {}
  const payouts = revenue?.payouts || []
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-indigo-500" /> Revenue
        </h2>
        <Button size="sm" variant="outline" onClick={reload} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          <span className="ml-1">Refresh</span>
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle>MTD</CardTitle>
            <CardDescription>Month to Date gross</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">
              {summary.mtd != null ? '$' + (summary.mtd / 100).toFixed(2) : '—'}
            </div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle>Projected</CardTitle>
            <CardDescription>Projected month-end</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">
              {summary.projected != null ? '$' + (summary.projected / 100).toFixed(2) : '—'}
            </div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle>Last Payout</CardTitle>
            <CardDescription>Most recent payment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">
              {summary.last_payout_amount != null
                ? '$' + (summary.last_payout_amount / 100).toFixed(2)
                : '—'}
            </div>
            <p className="text-xs text-gray-500">
              {summary.last_payout_at ? relativeTime(summary.last_payout_at) : 'No payout recorded'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
          <CardDescription>Most recent payouts</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Amount</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Method</th>
              </tr>
            </thead>
            <tbody>
              {payouts.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-500">
                    No payouts yet.
                  </td>
                </tr>
              )}
              {payouts.map(p => (
                <tr key={p.id} className="border-b last:border-none">
                  <td className="py-2 pr-4">{new Date(p.created_at).toLocaleDateString()}</td>
                  <td className="py-2 pr-4">${(p.amount / 100).toFixed(2)}</td>
                  <td className="py-2 pr-4">
                    <Badge variant="outline" className="capitalize">
                      {p.status}
                    </Badge>
                  </td>
                  <td className="py-2 pr-4">{p.method || 'ACH'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

/* ------------------------------------------------------------------
 * Preview Tab
 * ------------------------------------------------------------------ */
const PreviewTab = ({ customization }) => {
  const config = customization || {}
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Eye className="h-5 w-5 text-indigo-500" /> Live Preview
      </h2>
      <p className="text-sm text-gray-600">
        This tab displays a synthesized preview of your configured banner. In a future iteration
        this should be isolated in an iframe sandbox injecting generated CSS + script.
      </p>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle>Current Configuration</CardTitle>
            <CardDescription>Raw JSON for debugging</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-900 text-gray-100 text-xs p-4 rounded overflow-auto">
              {JSON.stringify(config, null, 2)}
            </pre>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle>Interactive Mock</CardTitle>
            <CardDescription>Approximate final appearance</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border rounded-lg p-4 text-sm relative overflow-hidden"
              style={{
                background: config.theme === 'dark' ? '#111827' : (config.palette?.background || '#fff'),
                color: config.theme === 'dark' ? '#f3f4f6' : (config.palette?.text || '#111827'),
                borderColor: config.palette?.primary || '#4f46e5'
              }}
            >
              <div className="font-semibold mb-2">We value your privacy</div>
              <p className="text-xs mb-3">
                Cookies help us deliver an optimized experience. Adjust preferences or accept to continue.
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  className="px-3 py-1 rounded text-xs font-medium"
                  style={{ background: config.palette?.primary || '#4f46e5', color: '#fff' }}
                >Accept All</button>
                <button
                  className="px-3 py-1 rounded text-xs font-medium"
                  style={{ background: config.palette?.accent || '#9333ea', color: '#fff' }}
                >Customize</button>
                <button
                  className="px-3 py-1 rounded text-xs font-medium border"
                >Decline</button>
              </div>
              {config.showOverlay && (
                <div className="absolute inset-0 pointer-events-none opacity-10"
                  style={{ background: (config.palette?.primary || '#4f46e5') }}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------
 * Root Component (Dashboard Shell)
 * ------------------------------------------------------------------ */
const EnhancedDashboard = () => {
  const { user, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [savingCustomization, setSavingCustomization] = useState(false)

  // Load aggregated data
  const {
    metrics,
    compliance,
    revenue,
    customization,
    integration,
    loading: globalLoading,
    error: loadError,
    reload
  } = useDashboardData(isAuthenticated())

  /* Handlers */
  const handleSaveCustomization = async (cfg) => {
    setSavingCustomization(true)
    try {
      await api.put('/api/customization/config', cfg)
      await reload()
    } finally {
      setSavingCustomization(false)
    }
  }

  const handleAddSite = async (domain) => {
    const body = { domain }
    await api.post('/api/integration/sites', body)
    await reload()
  }

  const handleGenerateSnippet = async (domain) => {
    return api.post('/api/integration/snippet', { domain })
  }

  /* Render tab content */
  const renderTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab
          metrics={metrics}
          compliance={compliance}
          revenue={revenue}
          reload={reload}
          globalLoading={globalLoading}
        />
      case 'analytics':
        return <AnalyticsTab metrics={metrics} loading={globalLoading} reload={reload} />
      case 'customization':
        return (
          <CustomizationTab
            initialConfig={customization?.config}
            onSave={handleSaveCustomization}
            saving={savingCustomization}
          />
        )
      case 'integration':
        return (
          <IntegrationTab
            integration={integration}
            onAddSite={handleAddSite}
            onGenerateSnippet={handleGenerateSnippet}
          />
        )
      case 'compliance':
        return (
            <ComplianceTab
              compliance={compliance}
              reload={reload}
              loading={globalLoading}
            />
        )
      case 'revenue':
        return (
            <RevenueTab
              revenue={revenue}
              reload={reload}
              loading={globalLoading}
            />
        )
      case 'preview':
        return <PreviewTab customization={customization?.config} />
      default:
        return null
    }
  }

  if (!isAuthenticated()) {
    return (
      <div className="max-w-xl mx-auto mt-24 p-8 border border-gray-200 rounded-xl shadow-sm bg-white text-center">
        <h1 className="text-2xl font-semibold mb-2">Authentication Required</h1>
        <p className="text-gray-600 mb-4">You must be logged in to view the dashboard.</p>
        <p className="text-xs text-gray-400">
          (If you are logged in and still see this, the token may have expired.)
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-4 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Grid className="h-6 w-6 text-indigo-600" />
              Dashboard
            </h1>
            <p className="text-sm text-gray-600">
              Welcome back{user?.first_name ? `, ${user.first_name}` : ''}! Manage consent, compliance, and revenue.
            </p>
            {loadError && (
              <div className="mt-2 p-2 text-xs rounded bg-red-50 border border-red-200 text-red-600">
                {loadError}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={reload} disabled={globalLoading}>
              {globalLoading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <RefreshCw className="h-4 w-4 mr-1" />}
              Sync
            </Button>
            <Button variant="secondary" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map(t => {
            const Icon = t.icon
            const active = activeTab === t.key
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={
                  'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors border ' +
                  (active
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow'
                    : 'bg-white text-gray-700 hover:bg-indigo-50 border-gray-200')
                }
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="pb-10">
          {renderTab()}
        </div>

        <div className="text-center text-xs text-gray-400 mt-16">
          © {new Date().getFullYear()} CookieBot.ai • Internal build
        </div>
      </div>
    </div>
  )
}

export default EnhancedDashboard
