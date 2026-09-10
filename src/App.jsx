import { useEffect, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import * as echarts from 'echarts'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import '@aspentech/pf-ui-core/integrations/eds-aggrid.css'

const pages = [
  { id: 'overview', label: 'Overview', icon: 'home', navIcon: 'home_filled' },
  { id: 'example-1', label: 'Example 1', icon: 'insights', navIcon: 'insights_filled' },
  { id: 'example-2', label: 'Example 2', icon: 'tune', navIcon: 'tune_filled' },
  { id: 'example-3', label: 'Example 3', icon: 'account_tree', navIcon: 'account_tree_filled' },
  { id: 'example-4', label: 'Example 4', icon: 'description', navIcon: 'description_filled' },
]

const apps = [
  { id: 'application-a', label: 'Application A', icon: 'apps', navIcon: 'apps_filled' },
]

const overviewRows = [
  { asset: 'Compressor 01', status: 'Online', output: '2,130 bbl', efficiency: '93.1%', downtime: '0.4 hrs' },
  { asset: 'Turbine 03', status: 'Online', output: '1,980 bbl', efficiency: '89.7%', downtime: '1.2 hrs' },
  { asset: 'Separator 06', status: 'Maintenance', output: '1,420 bbl', efficiency: '87.2%', downtime: '2.2 hrs' },
  { asset: 'Pump 11', status: 'Online', output: '2,560 bbl', efficiency: '95.4%', downtime: '0.0 hrs' },
]

const overviewColumns = [
  { field: 'asset', headerName: 'Asset', flex: 1.2, minWidth: 160 },
  { field: 'status', headerName: 'Status', flex: 1, minWidth: 140 },
  { field: 'output', headerName: 'Output', flex: 1, minWidth: 140 },
  { field: 'efficiency', headerName: 'Efficiency', flex: 1, minWidth: 140 },
  { field: 'downtime', headerName: 'Downtime', flex: 1, minWidth: 140 },
]

function OverviewContent({ theme }) {
  const outputChartRef = useRef(null)
  const performanceChartRef = useRef(null)

  useEffect(() => {
    let outputChart
    let performanceChart
    let animationFrame

    const initializeCharts = () => {
      const outputElement = outputChartRef.current
      const performanceElement = performanceChartRef.current
      if (!outputElement || !performanceElement || !outputElement.clientWidth || !outputElement.clientHeight || !performanceElement.clientWidth || !performanceElement.clientHeight) {
        return
      }

      const styles = getComputedStyle(document.documentElement)
      const textColor = styles.getPropertyValue('--eds-text-secondary').trim()
      const borderColor = styles.getPropertyValue('--eds-border-default').trim()
      const primaryColor = styles.getPropertyValue('--eds-interactive-default').trim()
      const successColor = styles.getPropertyValue('--eds-support-success').trim()
      outputChart = echarts.init(outputElement)
      performanceChart = echarts.init(performanceElement)

      outputChart.setOption({
        color: [primaryColor],
        tooltip: { trigger: 'axis' },
        grid: { top: 16, right: 12, bottom: 24, left: 38 },
        xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], axisLabel: { color: textColor }, axisLine: { lineStyle: { color: borderColor } } },
        yAxis: { type: 'value', max: 800, interval: 200, axisLabel: { color: textColor }, splitLine: { lineStyle: { color: borderColor } } },
        series: [{ type: 'bar', barMaxWidth: 28, data: [420, 530, 560, 510, 640, 700, 760] }],
      })

      performanceChart.setOption({
        color: [successColor],
        tooltip: {},
        radar: {
          indicator: [
            { name: 'Site A', max: 100 },
            { name: 'Site B', max: 100 },
            { name: 'Site C', max: 100 },
            { name: 'Site D', max: 100 },
            { name: 'Site E', max: 100 },
          ],
          axisName: { color: textColor },
          axisLine: { lineStyle: { color: borderColor } },
          splitLine: { lineStyle: { color: borderColor } },
          splitArea: { areaStyle: { color: ['transparent'] } },
          radius: '62%',
        },
        series: [{ type: 'radar', data: [{ value: [82, 68, 91, 74, 79], name: 'Site performance' }] }],
      })
    }

    const resizeCharts = () => {
      if (!outputChart || !performanceChart) {
        animationFrame = requestAnimationFrame(initializeCharts)
        return
      }
      outputChart.resize()
      performanceChart.resize()
    }
    const resizeObserver = new ResizeObserver(resizeCharts)
    if (outputChartRef.current) resizeObserver.observe(outputChartRef.current)
    if (performanceChartRef.current) resizeObserver.observe(performanceChartRef.current)
    animationFrame = requestAnimationFrame(initializeCharts)
    window.addEventListener('resize', resizeCharts)

    return () => {
      window.removeEventListener('resize', resizeCharts)
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      outputChart?.dispose()
      performanceChart?.dispose()
    }
  }, [theme])

  return (
    <section className="overview-content" aria-label="Overview">
      <div className="overview-kpis">
        <sl-card class="overview-kpi"><span className="kpi-label">Total output</span><strong className="kpi-value">12,480 bbl</strong><span className="kpi-comparison kpi-positive total-output-change">+4.2% vs last week</span></sl-card>
        <sl-card class="overview-kpi"><span className="kpi-label">Efficiency</span><strong className="kpi-value">91.6%</strong><span className="kpi-comparison kpi-positive">+1.1 pts vs target</span></sl-card>
        <sl-card class="overview-kpi"><span className="kpi-label">Downtime</span><strong className="kpi-value">3.8 hrs</strong><span className="kpi-comparison kpi-negative">+0.6 hrs this week</span></sl-card>
      </div>

      <div className="overview-charts">
        <sl-card className="overview-chart-card"><h2 slot="header">Weekly output trend</h2><div className="overview-chart" ref={outputChartRef} aria-label="Weekly output trend bar chart" /></sl-card>
        <sl-card className="overview-chart-card"><h2 slot="header">Site performance</h2><div className="overview-chart" ref={performanceChartRef} aria-label="Site performance radar chart" /></sl-card>
      </div>

      <sl-card className="overview-table-card">
        <h2 slot="header">Asset summary</h2>
        <div className="ag-theme-quartz eds-aggrid-theme overview-grid">
          <AgGridReact theme="legacy" columnDefs={overviewColumns} defaultColDef={{ sortable: true, resizable: true, filter: true }} rowData={overviewRows} domLayout="autoHeight" />
        </div>
      </sl-card>
    </section>
  )
}

function AvaPanel({ open, onClose }) {
  const drawerRef = useRef(null)
  const layoutRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const drawer = drawerRef.current
    const layout = layoutRef.current
    const input = inputRef.current
    if (!drawer || !layout || !input) return undefined

    const handleAvaClose = () => onClose()
    const handleAfterHide = () => onClose()
    const handleSend = (event) => {
      const message = event.detail
      if (!message) return

      const userMessage = document.createElement('ava-user-message')
      userMessage.textContent = message
      layout.appendChild(userMessage)
      layout.waiting = true
      input.disabled = true

      const responseMessage = document.createElement('ava-response-message')
      responseMessage.textContent = `I can help with ${message.toLowerCase()}.`
      layout.appendChild(responseMessage)
      layout.waiting = false
      input.disabled = false
      requestAnimationFrame(() => layout.scrollToBottom())
    }

    layout.addEventListener('ava-close', handleAvaClose)
    drawer.addEventListener('sl-after-hide', handleAfterHide)
    input.addEventListener('ava-send', handleSend)

    return () => {
      layout.removeEventListener('ava-close', handleAvaClose)
      drawer.removeEventListener('sl-after-hide', handleAfterHide)
      input.removeEventListener('ava-send', handleSend)
    }
  }, [onClose])

  useEffect(() => {
    if (open) {
      drawerRef.current?.show()
    } else {
      drawerRef.current?.hide()
    }
  }, [open])

  return (
    <sl-drawer ref={drawerRef} placement="end" no-header label="AVA" class="ava-panel">
      <ava-layout ref={layoutRef} class="ava-panel-layout">
        <ava-welcome-message>
          <span slot="title">How can AVA help?</span>
          <span>Ask a question about your workspace.</span>
        </ava-welcome-message>
        <ava-input ref={inputRef} slot="footer" label="Ask AVA" />
      </ava-layout>
    </sl-drawer>
  )
}

function ApplicationAContent() {
  return (
    <eds-application-layout class="application-a-layout">
      <div className="application-a-main" aria-label="Application A workspace"></div>
    </eds-application-layout>
  )
}

function ApplicationAShell({ theme, themeClasses, onNavigate, onToggleTheme }) {
  const sidenavRef = useRef(null)
  const [avaOpen, setAvaOpen] = useState(false)
  const handleNavigate = (pageId) => {
    onNavigate(pageId)
    sidenavRef.current?.hide()
  }

  useEffect(() => {
    sidenavRef.current?.hide()
  }, [])

  return (
    <eds-shell-template class={`application-shell ${themeClasses}`} theme={theme}>
      <eds-appbar slot="appbar" show-menu-button is-application>
        <eds-icon-button slot="menu-button" name="menu" label="Open application navigation" onClick={() => sidenavRef.current?.show()} />
        <eds-icon slot="icon" name="apps" aria-hidden="true" />
        <sl-breadcrumb slot="breadcrumb" aria-label="Application breadcrumb">
          <span slot="separator">/</span>
          <sl-breadcrumb-item onClick={() => handleNavigate('overview')}>Workspace</sl-breadcrumb-item>
          <sl-breadcrumb-item>Application A</sl-breadcrumb-item>
        </sl-breadcrumb>
        <eds-page-info slot="page-info" heading="Application A" />
        <sl-tab-group slot="center" class="application-a-tabs" aria-label="Application A sections">
          <sl-tab slot="nav" panel="workspace" active>Workspace</sl-tab>
          <sl-tab slot="nav" panel="activity">Activity</sl-tab>
          <sl-tab slot="nav" panel="settings">Settings</sl-tab>
        </sl-tab-group>
        <eds-icon-button
          slot="right"
          name={theme === 'light' ? 'dark_mode' : 'light_mode'}
          label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          onClick={onToggleTheme}
        />
        <button slot="right" className="ava-logo-button" aria-label="Open AVA" onClick={() => setAvaOpen(true)}>
          <ava-logo variant="isotype" />
        </button>
        <sl-avatar slot="right" initials="AW" label="Account menu" />
      </eds-appbar>

      <eds-sidenav ref={sidenavRef} mode="modal" header-text="Workspace">
        {pages.map((page) => (
          <eds-sidenav-item
            key={page.id}
            type="node-button"
            label={page.label}
            icon={page.navIcon}
            onClick={() => handleNavigate(page.id)}
          />
        ))}
        <sl-divider></sl-divider>
        <eds-sidenav-item type="heading" label="Apps" />
        <eds-sidenav-item type="node-button" label="Application A" icon="apps_filled" active />
      </eds-sidenav>

      <main className="application-main" id="main-content">
        <ApplicationAContent />
      </main>
      <AvaPanel open={avaOpen} onClose={() => setAvaOpen(false)} />
    </eds-shell-template>
  )
}

function App() {
  const [activePageId, setActivePageId] = useState(pages[0].id)
  const [theme, setTheme] = useState('light')
  const [avaOpen, setAvaOpen] = useState(false)
  const [sidenavMode, setSidenavMode] = useState(window.innerWidth < 768 ? 'collapsed' : 'expanded')
  const activePage = [...pages, ...apps].find((page) => page.id === activePageId) ?? pages[0]
  const themeClasses = theme === 'dark' ? 'sl-theme-dark eds-dark' : 'sl-theme-light eds-light'
  const portalNavItemType = sidenavMode === 'collapsed' ? 'node' : 'node-button'
  const handlePortalNavigation = (event, pageId) => {
    event.preventDefault()
    setActivePageId(pageId)
  }

  useEffect(() => {
    document.documentElement.classList.remove('sl-theme-light', 'sl-theme-dark', 'eds-light', 'eds-dark')
    document.documentElement.classList.add(...themeClasses.split(' '))
  }, [theme, themeClasses])

  useEffect(() => {
    const handleResize = () => {
      setSidenavMode(window.innerWidth < 768 ? 'collapsed' : 'expanded')
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (activePage.id === 'application-a') {
    return <ApplicationAShell theme={theme} themeClasses={themeClasses} onNavigate={setActivePageId} onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
  }

  return (
    <eds-shell-template class={`portal-shell ${themeClasses}`} theme={theme}>
      <eds-sidenav slot="sidenav" header-text="Workspace" mode={sidenavMode}>
        {pages.map((page) => (
          <eds-sidenav-item
            key={page.id}
            type={portalNavItemType}
            href={`#${page.id}`}
            label={page.label}
            icon={page.navIcon}
            active={activePage.id === page.id}
            aria-current={activePage.id === page.id ? 'page' : undefined}
            onClick={(event) => handlePortalNavigation(event, page.id)}
          />
        ))}
        <sl-divider></sl-divider>
        <eds-sidenav-item type="heading" label="Apps" />
        {apps.map((app) => (
          <eds-sidenav-item
            key={app.id}
            type={portalNavItemType}
            href={`#${app.id}`}
            label={app.label}
            icon={app.navIcon}
            active={activePage.id === app.id}
            aria-current={activePage.id === app.id ? 'page' : undefined}
            onClick={(event) => handlePortalNavigation(event, app.id)}
          />
        ))}
      </eds-sidenav>

      <eds-appbar slot="appbar" is-application>
        <eds-page-info slot="page-info" heading={activePage.label} />
        <eds-icon-button
          slot="right"
          name={theme === 'light' ? 'dark_mode' : 'light_mode'}
          label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        />
        <button slot="right" className="ava-logo-button" aria-label="Open AVA" onClick={() => setAvaOpen(true)}>
          <ava-logo variant="isotype" />
        </button>
        <sl-avatar slot="right" initials="AW" label="Account menu" />
      </eds-appbar>

      <main className="portal-main" id="main-content">
        {activePage.id === 'application-a' && <ApplicationAContent />}
        {activePage.id === 'overview' && <OverviewContent theme={theme} />}
      </main>
      <AvaPanel open={avaOpen} onClose={() => setAvaOpen(false)} />
    </eds-shell-template>
  )
}

export default App