import React, { useEffect, useRef, useState } from 'react'
import { Search, ChevronLeft, ChevronRight, X, ZoomIn, BookOpen, Utensils, Sparkles } from 'lucide-react'
import { fullMenu, menuCategories, originalMenuPages, type MenuItem } from '../data/menu'
import { getAssetPath } from '../utils/asset'

function useInView(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}

export default function Menu() {
  const { ref, inView } = useInView()
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'nonveg'>('all')
  const [activeTab, setActiveTab] = useState<'digital' | 'original'>('digital')
  const [selectedMenuPageIndex, setSelectedMenuPageIndex] = useState<number | null>(null)
  const [isZoomed, setIsZoomed] = useState(false)

  // Keyboard navigation for menu modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedMenuPageIndex === null) return
      if (e.key === 'Escape') {
        setSelectedMenuPageIndex(null)
        setIsZoomed(false)
      } else if (e.key === 'ArrowRight') {
        setSelectedMenuPageIndex((prev) => (prev !== null && prev < originalMenuPages.length - 1 ? prev + 1 : 0))
      } else if (e.key === 'ArrowLeft') {
        setSelectedMenuPageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : originalMenuPages.length - 1))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedMenuPageIndex])

  // Filter items
  const filtered = fullMenu.filter((item: MenuItem) => {
    const matchCategory = activeCategory === 'All' || item.category === activeCategory
    const matchSearch =
      search.trim() === '' ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(search.toLowerCase()))
    const matchDiet =
      dietFilter === 'all' ||
      (dietFilter === 'veg' && item.isVeg) ||
      (dietFilter === 'nonveg' && item.isNonVeg)
    return matchCategory && matchSearch && matchDiet
  })

  return (
    <section
      id="menu"
      ref={ref}
      style={{
        background: '#1A1310',
        padding: '7rem 0',
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}
      >
        {/* Section Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '3rem',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.9s ease',
          }}
        >
          <div className="section-label" style={{ marginBottom: '1rem' }}>
            Culinary Offerings • 8 Original Menu Pages
          </div>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
              fontWeight: 600,
              color: '#F5EEE3',
              marginBottom: '1rem',
            }}
          >
            The OTH Menu
          </h2>
          <p
            style={{
              color: 'rgba(245,238,227,0.65)',
              fontSize: '1rem',
              maxWidth: '640px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            European bistro specialties, hand-tossed pizzas, continental mains, artisan breakfast, and single-origin brews crafted with integrity in C-Scheme, Jaipur.
          </p>

          {/* Toggle View: Digital Menu vs Original Menu Pages */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setActiveTab('digital')}
              className={`px-5 py-2.5 text-xs uppercase tracking-wider font-medium transition-all duration-300 flex items-center gap-2 border ${
                activeTab === 'digital'
                  ? 'bg-[#C5A477] text-[#201713] border-[#C5A477] shadow-lg shadow-[#C5A477]/10'
                  : 'bg-black/30 text-[#F5EEE3]/70 border-[#C5A477]/20 hover:border-[#C5A477]/60'
              }`}
            >
              <Utensils size={14} />
              Digital Menu ({fullMenu.length} Verified Items)
            </button>
            <button
              onClick={() => setActiveTab('original')}
              className={`px-5 py-2.5 text-xs uppercase tracking-wider font-medium transition-all duration-300 flex items-center gap-2 border ${
                activeTab === 'original'
                  ? 'bg-[#C5A477] text-[#201713] border-[#C5A477] shadow-lg shadow-[#C5A477]/10'
                  : 'bg-black/30 text-[#F5EEE3]/70 border-[#C5A477]/20 hover:border-[#C5A477]/60'
              }`}
            >
              <BookOpen size={14} />
              View Original Menu (All 8 Pages)
            </button>
          </div>
        </div>

        {/* ================= VIEW 1: DIGITAL MENU ================= */}
        {activeTab === 'digital' && (
          <div>
            {/* Filter controls: Search and Diet */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C5A477]/60 pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Search dishes or ingredients..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#201713] border border-[#C5A477]/25 text-[#F5EEE3] text-sm pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#C5A477] transition-colors placeholder-[#F5EEE3]/30"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F5EEE3]/40 hover:text-[#F5EEE3]"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Diet filter */}
              <div className="flex items-center gap-2 bg-[#201713] p-1 border border-[#C5A477]/20 text-xs">
                {(['all', 'veg', 'nonveg'] as const).map((diet) => (
                  <button
                    key={diet}
                    onClick={() => setDietFilter(diet)}
                    className={`px-3 py-1.5 uppercase tracking-wider transition-colors ${
                      dietFilter === diet
                        ? 'bg-[#C5A477] text-[#201713] font-semibold'
                        : 'text-[#F5EEE3]/60 hover:text-[#F5EEE3]'
                    }`}
                  >
                    {diet === 'all' ? 'All' : diet === 'veg' ? '🟢 Veg Only' : '🔴 Non-Veg'}
                  </button>
                ))}
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-10 pb-2 border-b border-[#C5A477]/15">
              {menuCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider transition-all duration-200 border ${
                    activeCategory === cat
                      ? 'bg-[#C5A477] text-[#201713] font-semibold border-[#C5A477]'
                      : 'bg-transparent text-[#F5EEE3]/60 border-[#C5A477]/15 hover:border-[#C5A477]/50 hover:text-[#F5EEE3]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Menu Items Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-[#F5EEE3]/50">
                No menu items match your search. Try adjusting the category or search query.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-[#201713]/70 border border-[#C5A477]/15 hover:border-[#C5A477]/40 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
                  >
                    <div>
                      {/* Photo if available */}
                      {item.photo && (
                        <div className="mb-4 h-40 overflow-hidden relative border border-[#C5A477]/10">
                          <img
                            src={getAssetPath(item.photo)}
                            alt={item.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="absolute bottom-2 right-2 px-2 py-0.5 text-[10px] bg-black/70 text-[#C5A477] border border-[#C5A477]/30 backdrop-blur-sm">
                            OTH Original Photo
                          </span>
                        </div>
                      )}

                      {/* Header with Title and Price */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Veg / Non-Veg Indicator */}
                          <span
                            className={`w-3 h-3 flex items-center justify-center border text-[8px] flex-shrink-0 ${
                              item.isVeg
                                ? 'border-green-500 text-green-500'
                                : 'border-red-500 text-red-500'
                            }`}
                            title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                          >
                            ●
                          </span>
                          <h3
                            style={{ fontFamily: 'Playfair Display, serif' }}
                            className="text-[#F5EEE3] text-lg font-medium group-hover:text-[#C5A477] transition-colors"
                          >
                            {item.name}
                          </h3>
                        </div>
                        <span
                          style={{ fontFamily: 'Cormorant Garamond, serif' }}
                          className="text-[#C5A477] text-xl font-bold whitespace-nowrap"
                        >
                          {item.priceDisplay}
                        </span>
                      </div>

                      {/* Description */}
                      {item.description && (
                        <p className="text-[#F5EEE3]/55 text-xs leading-relaxed mb-4">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Footer Tags */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#C5A477]/10 text-[10px] text-[#F5EEE3]/40">
                      <span className="uppercase tracking-wider">{item.category}</span>
                      <div className="flex items-center gap-1.5">
                        {item.tag && (
                          <span className="px-2 py-0.5 bg-[#C5A477]/15 text-[#C5A477] border border-[#C5A477]/30 uppercase tracking-widest text-[9px]">
                            {item.tag}
                          </span>
                        )}
                        <span className="text-[#F5EEE3]/30">Page {item.menuPage}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= VIEW 2: ORIGINAL MENU PAGES ================= */}
        {activeTab === 'original' && (
          <div>
            <div className="text-center mb-10">
              <p className="text-[#C5A477] text-sm uppercase tracking-widest mb-1 flex items-center justify-center gap-1.5">
                <Sparkles size={14} />
                Original Printed Menus from OTH Bistro & Bakers
              </p>
              <p className="text-[#F5EEE3]/60 text-xs">
                Click any page to view high-resolution fullscreen with zoom and page flipping.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {originalMenuPages.map((page, index) => (
                <div
                  key={page.pageNumber}
                  onClick={() => {
                    setSelectedMenuPageIndex(index)
                    setIsZoomed(false)
                  }}
                  className="group bg-[#201713] border border-[#C5A477]/20 hover:border-[#C5A477] transition-all duration-300 p-3 cursor-pointer flex flex-col justify-between hover:shadow-2xl hover:shadow-black/60"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-black/40 mb-3 border border-[#C5A477]/10">
                    <img
                      src={getAssetPath(page.image)}
                      alt={page.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain p-1 transform transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#201713]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-10 h-10 border border-[#C5A477] bg-[#201713]/90 flex items-center justify-center text-[#C5A477]">
                        <ZoomIn size={18} />
                      </div>
                    </div>
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#201713]/90 border border-[#C5A477]/30 text-[#C5A477] text-[10px] uppercase font-bold">
                      Page {page.pageNumber}
                    </span>
                  </div>

                  <div>
                    <h4
                      style={{ fontFamily: 'Playfair Display, serif' }}
                      className="text-[#F5EEE3] text-sm font-semibold mb-1 group-hover:text-[#C5A477] transition-colors"
                    >
                      {page.title}
                    </h4>
                    <p className="text-[#F5EEE3]/50 text-[11px] line-clamp-2 leading-relaxed">
                      {page.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= FULLSCREEN MENU VIEWER MODAL ================= */}
        {selectedMenuPageIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-[#140E0C]/95 backdrop-blur-md flex flex-col items-center justify-between p-4 md:p-6"
            onClick={() => {
              setSelectedMenuPageIndex(null)
              setIsZoomed(false)
            }}
          >
            {/* Top Bar */}
            <div
              className="w-full max-w-5xl flex items-center justify-between text-[#F5EEE3] pb-4 border-b border-[#C5A477]/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <span className="text-[#C5A477] text-xs uppercase tracking-widest block font-medium">
                  OTH Original Menu • Page {originalMenuPages[selectedMenuPageIndex].pageNumber} of {originalMenuPages.length}
                </span>
                <h3
                  style={{ fontFamily: 'Playfair Display, serif' }}
                  className="text-lg md:text-xl font-semibold"
                >
                  {originalMenuPages[selectedMenuPageIndex].title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="px-3 py-1.5 border border-[#C5A477]/40 text-[#C5A477] text-xs hover:bg-[#C5A477]/20 transition-colors flex items-center gap-1.5"
                  title="Toggle Zoom"
                >
                  <ZoomIn size={14} />
                  {isZoomed ? 'Reset' : 'Zoom'}
                </button>
                <button
                  onClick={() => {
                    setSelectedMenuPageIndex(null)
                    setIsZoomed(false)
                  }}
                  className="w-9 h-9 border border-[#C5A477]/40 text-[#F5EEE3] hover:text-[#C5A477] hover:border-[#C5A477] flex items-center justify-center transition-colors"
                  aria-label="Close viewer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Main Image Viewer with Prev/Next buttons */}
            <div
              className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Button */}
              <button
                onClick={() =>
                  setSelectedMenuPageIndex((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : originalMenuPages.length - 1
                  )
                }
                className="absolute left-2 md:left-4 z-10 w-11 h-11 bg-[#201713]/90 border border-[#C5A477]/40 text-[#C5A477] hover:bg-[#C5A477] hover:text-[#201713] flex items-center justify-center transition-all duration-200 shadow-xl"
                aria-label="Previous menu page"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Menu Image */}
              <div
                className={`transition-all duration-300 max-h-[75vh] flex items-center justify-center ${
                  isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={getAssetPath(originalMenuPages[selectedMenuPageIndex].image)}
                  alt={originalMenuPages[selectedMenuPageIndex].title}
                  className="max-h-[72vh] max-w-[85vw] object-contain shadow-2xl border border-[#C5A477]/30 bg-black/40"
                />
              </div>

              {/* Next Button */}
              <button
                onClick={() =>
                  setSelectedMenuPageIndex((prev) =>
                    prev !== null && prev < originalMenuPages.length - 1 ? prev + 1 : 0
                  )
                }
                className="absolute right-2 md:right-4 z-10 w-11 h-11 bg-[#201713]/90 border border-[#C5A477]/40 text-[#C5A477] hover:bg-[#C5A477] hover:text-[#201713] flex items-center justify-center transition-all duration-200 shadow-xl"
                aria-label="Next menu page"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Bottom Page Thumbnails */}
            <div
              className="w-full max-w-5xl flex items-center justify-center gap-2 pt-2 border-t border-[#C5A477]/20 overflow-x-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {originalMenuPages.map((pg, idx) => (
                <button
                  key={pg.pageNumber}
                  onClick={() => {
                    setSelectedMenuPageIndex(idx)
                    setIsZoomed(false)
                  }}
                  className={`w-10 h-14 border overflow-hidden transition-all duration-200 flex-shrink-0 ${
                    selectedMenuPageIndex === idx
                      ? 'border-[#C5A477] scale-110 shadow-lg ring-1 ring-[#C5A477]'
                      : 'border-[#C5A477]/20 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img
                    src={getAssetPath(pg.image)}
                    alt={pg.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
