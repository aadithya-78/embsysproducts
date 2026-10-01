import { useEffect, useRef, useState } from 'react'
import {
  Activity,
  ArrowUpRight,
  Cable,
  ChevronRight,
  CircuitBoard,
  Cpu,
  Gauge,
  Menu,
  PackageOpen,
  Radar,
  Search,
  Workflow,
  X,
  Zap,
} from 'lucide-react'
import { workbooks } from './data/catalog.js'

const normalize = (value) => value.toLocaleLowerCase().trim()
const INR_PER_USD = 85
const logoUrl = `${import.meta.env.BASE_URL}embsys-logo.gif`

const rangeIcons = {
  'plc-control': Cpu,
  'industrial-io': Radar,
  'drives-motion': Gauge,
  'industrial-networking': Cable,
  'power-panel': Zap,
  'automation-essentials': Workflow,
}

const formatPrice = (priceInr, currency) => new Intl.NumberFormat(
  currency === 'INR' ? 'en-IN' : 'en-US',
  { style: 'currency', currency, maximumFractionDigits: 0 },
).format(currency === 'INR' ? priceInr : priceInr / INR_PER_USD)

function Flag({ country }) {
  return <span className={`flag flag-${country.toLowerCase()}`} aria-hidden="true"><i /></span>
}

function AutomationScene() {
  return (
    <div className="automation-scene" aria-hidden="true">
      <div className="scene-grid" />
      <div className="scene-glow scene-glow-one" />
      <div className="scene-glow scene-glow-two" />

      <div className="controller-unit">
        <div className="unit-topline"><span>PLC / CPU</span><i>RUN</i></div>
        <div className="controller-body">
          <div className="controller-screen">
            <span>PROCESS_01</span>
            <svg viewBox="0 0 150 42" focusable="false">
              <polyline points="0,28 15,28 15,14 32,14 32,31 50,31 50,19 67,19 67,8 84,8 84,25 103,25 103,13 120,13 120,28 150,28" />
            </svg>
          </div>
          <div className="controller-leds">
            <span /><span /><span /><span /><span /><span />
          </div>
          <div className="terminal-row">
            {Array.from({ length: 8 }, (_, index) => <span key={index} />)}
          </div>
        </div>
      </div>

      <div className="signal-bus signal-bus-sensor"><i /><i /><i /></div>
      <div className="signal-bus signal-bus-drive"><i /><i /><i /></div>

      <div className="sensor-unit">
        <div className="sensor-rings"><span /><i /></div>
        <strong>PROXIMITY</strong>
        <small>OBJECT DETECTED</small>
      </div>

      <div className="drive-unit">
        <div className="motor-core"><span /><i /></div>
        <div><strong>DRIVE</strong><small>42.6 Hz</small></div>
      </div>

      <div className="system-status"><Activity size={14} /><span>System online</span><i /></div>
    </div>
  )
}

function App() {
  const [activeWorkbookId, setActiveWorkbookId] = useState(workbooks[0].id)
  const [activeSheetId, setActiveSheetId] = useState(workbooks[0].sheets[0].id)
  const [query, setQuery] = useState('')
  const [selectedSku, setSelectedSku] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currency, setCurrency] = useState('INR')
  const [availabilityFilter, setAvailabilityFilter] = useState('all')
  const [transitionKey, setTransitionKey] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const rowRefs = useRef(new Map())

  const activeWorkbook = workbooks.find((item) => item.id === activeWorkbookId) ?? workbooks[0]
  const activeSheet = activeWorkbook.sheets.find((item) => item.id === activeSheetId) ?? activeWorkbook.sheets[0]

  useEffect(() => {
    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(available > 0 ? Math.min(window.scrollY / available, 1) : 0)
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  const needle = normalize(query)
  const filteredProducts = activeSheet.products.filter((item) => {
    const matchesQuery = !needle || normalize(`${item.sku} ${item.name} ${item.description} ${item.keySpec}`).includes(needle)
    const matchesAvailability = availabilityFilter === 'all'
      || (availabilityFilter === 'stock' && item.availability === 'In stock')
      || (availabilityFilter === 'order' && item.availability !== 'In stock')
    return matchesQuery && matchesAvailability
  })

  const energize = (event) => {
    const button = event.currentTarget
    button.classList.remove('contact-pulse')
    void button.offsetWidth
    button.classList.add('contact-pulse')
  }

  const chooseWorkbook = (workbook, event) => {
    energize(event)
    setActiveWorkbookId(workbook.id)
    setActiveSheetId(workbook.sheets[0].id)
    setQuery('')
    setAvailabilityFilter('all')
    setSelectedSku(null)
    setMobileMenuOpen(false)
    setTransitionKey((key) => key + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const chooseSheet = (id, event) => {
    energize(event)
    setActiveSheetId(id)
    setQuery('')
    setAvailabilityFilter('all')
    setSelectedSku(null)
    setTransitionKey((key) => key + 1)
    document.querySelector('.catalog-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const chooseProduct = (sku) => {
    setSelectedSku(sku)
    requestAnimationFrame(() => rowRefs.current.get(sku)?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
  }

  return (
    <div className="app-shell">
      <div className="scroll-track" aria-hidden="true"><span style={{ transform: `scaleX(${scrollProgress})` }} /></div>

      <header className="site-header">
        <div className="brand-row container">
          <a className="brand" href="#top" aria-label="EmbSys automation catalog home">
            <img src={logoUrl} alt="EmbSys" />
            <span className="brand-copy">
              <strong>Industrial Automation</strong>
              <small>Products &amp; solutions</small>
            </span>
          </a>
          <div className="header-status" aria-label="Industrial systems online">
            <span className="status-pulse" />
            <div><strong>Systems online</strong><small>Automation catalog</small></div>
          </div>
          <div className="currency-switch" role="radiogroup" aria-label="Display currency">
            <span className={`currency-slider ${currency === 'USD' ? 'usd' : ''}`} aria-hidden="true" />
            <button type="button" role="radio" aria-checked={currency === 'INR'} className={currency === 'INR' ? 'active' : ''} onClick={(event) => { energize(event); setCurrency('INR') }}>
              <Flag country="IN" /> INR
            </button>
            <button type="button" role="radio" aria-checked={currency === 'USD'} className={currency === 'USD' ? 'active' : ''} onClick={(event) => { energize(event); setCurrency('USD') }}>
              <Flag country="US" /> USD
            </button>
          </div>
          <button className="mobile-menu-button" type="button" aria-label="Toggle product ranges" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <nav className={`workbook-nav ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="Product ranges">
          <div className="workbook-scroll container">
            {workbooks.map((workbook) => {
              const RangeIcon = rangeIcons[workbook.id] ?? CircuitBoard
              return (
                <button type="button" key={workbook.id} className={workbook.id === activeWorkbookId ? 'active' : ''} onClick={(event) => chooseWorkbook(workbook, event)}>
                  <RangeIcon size={18} strokeWidth={1.8} />
                  <span><strong>{workbook.name}</strong></span>
                </button>
              )
            })}
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero" key={`hero-${transitionKey}`}>
          <div className="hero-grid-bg" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span className="signal-line" /> Industrial automation, engineered to perform</div>
              <h1>{activeWorkbook.name}</h1>
              <p>{activeWorkbook.summary}</p>
              <div className="hero-actions">
                <a className="primary-action" href="#catalog">Explore products <ChevronRight size={16} /></a>
                <a className="secondary-action" href="mailto:info@embsysindia.com">Talk to a specialist <ArrowUpRight size={15} /></a>
              </div>
              <div className="capability-row" aria-label="Core capabilities">
                <span><i /> PLC control</span>
                <span><i /> Smart sensing</span>
                <span><i /> Industrial electronics</span>
              </div>
            </div>
            <AutomationScene />
          </div>
        </section>

        <section className="catalog container" id="catalog">
          <aside className="sheet-sidebar">
            <div className="sidebar-heading">
              <div><span>Categories</span><small>Choose a product group</small></div>
            </div>
            <div className="sidebar-list">
              {activeWorkbook.sheets.map((item, index) => (
                <button type="button" key={item.id} className={activeSheet.id === item.id ? 'selected' : ''} onClick={(event) => chooseSheet(item.id, event)}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p><strong>{item.name}</strong></p>
                  <ChevronRight size={16} />
                </button>
              ))}
            </div>
            <div className="sidebar-circuit" aria-hidden="true"><CircuitBoard size={17} /><span /><i /></div>
          </aside>

          <div className="catalog-content" key={`sheet-${transitionKey}`}>
            <div className="catalog-toolbar">
              <div>
                <span className="section-label">{activeSheet.eyebrow}</span>
                <h2>{activeSheet.name}</h2>
                <p>{activeSheet.description}</p>
              </div>
              <label className="search-box">
                <Search size={18} />
                <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, SKU or spec" aria-label={`Search ${activeSheet.name}`} />
                {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search"><X size={16} /></button>}
              </label>
            </div>

            <div className="filter-row" aria-label="Filter by availability">
              <span>{filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}</span>
              <div className="filter-pills">
                {[
                  ['all', 'All'],
                  ['stock', 'In stock'],
                  ['order', 'Made to order'],
                ].map(([value, label]) => (
                  <button
                    type="button"
                    key={value}
                    className={availabilityFilter === value ? 'active' : ''}
                    aria-pressed={availabilityFilter === value}
                    onClick={() => setAvailabilityFilter(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="table-card">
              <div className="table-scroll">
                <table>
                  <thead><tr><th>Line</th><th>Product / SKU</th><th>Application</th><th>Key specification</th><th>Indicative price</th></tr></thead>
                  <tbody>
                    {filteredProducts.map((item, index) => (
                      <tr
                        key={item.sku}
                        className={selectedSku === item.sku ? 'selected-row' : ''}
                        onClick={() => chooseProduct(item.sku)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            chooseProduct(item.sku)
                          }
                        }}
                        tabIndex="0"
                        aria-selected={selectedSku === item.sku}
                        ref={(node) => { if (node) rowRefs.current.set(item.sku, node); else rowRefs.current.delete(item.sku) }}
                        style={{ '--row-delay': `${index * 55}ms` }}
                      >
                        <td><span className="row-number">{String(activeSheet.products.findIndex((candidate) => candidate.sku === item.sku) + 1).padStart(2, '0')}</span></td>
                        <td><strong>{item.name}</strong><small className="sku">{item.sku}</small></td>
                        <td>{item.description}</td>
                        <td><span className="spec-text">{item.keySpec}</span><small className={`availability ${item.availability === 'In stock' ? 'stock' : ''}`}>{item.availability}</small></td>
                        <td><span className="price-pill">{formatPrice(item.priceInr, currency)}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!filteredProducts.length && (
                <div className="empty-state"><PackageOpen size={34} /><h3>No matching products</h3><p>Try a broader search or another availability option.</p><button type="button" onClick={() => { setQuery(''); setAvailabilityFilter('all') }}>Reset filters</button></div>
              )}
              <div className="table-footer"><span>Showing {filteredProducts.length} of {activeSheet.products.length} products</span><span>Indicative pricing · GST and freight excluded · 1 USD = ₹{INR_PER_USD}</span></div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-content">
          <div className="footer-brand"><img src={logoUrl} alt="EmbSys" /><p>Reliable products for industrial automation and electronic control applications.</p></div>
          <div><span>Solutions</span><strong>Control · motion · sensing · connectivity</strong></div>
          <div><span>Product enquiries</span><a href="mailto:info@embsysindia.com">info@embsysindia.com <ArrowUpRight size={13} /></a></div>
        </div>
      </footer>
    </div>
  )
}

export default App
