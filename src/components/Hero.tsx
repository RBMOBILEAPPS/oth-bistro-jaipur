import React, { useEffect, useRef, useState, useCallback } from 'react'
import { ChevronDown, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { getAssetPath } from '../utils/asset'

// Selected high-quality original café ambience & dish photos from public/assest (NO menu images)
const HERO_SLIDES = [
  {
    src: getAssetPath('/assest/73869282c39497bbb30f5ce1e766b38a.webp'),
    alt: 'OTH Bistro & Bakers Flagship Dining Hall & Espresso Bar',
  },
  {
    src: getAssetPath('/assest/rustic-by-oth-cafe-jaipur-inspired-kitchen-malviya-nagar.jpg'),
    alt: 'OTH Bistro Illuminated Night Facade',
  },
  {
    src: getAssetPath('/assest/unnamed (36).jpg'),
    alt: 'OTH Evening Dining Setting with Fresh Pasta & Bruschetta',
  },
  {
    src: getAssetPath('/assest/unnamed (44).jpg'),
    alt: 'Artisanal Alfredo & Refreshing Iced Beverages',
  },
  {
    src: getAssetPath('/assest/unnamed (40).jpg'),
    alt: 'Freshly Baked Parisian Butter & Almond Croissants',
  },
  {
    src: getAssetPath('/assest/unnamed (35).jpg'),
    alt: 'Handcrafted Wood-Fired Gourmet Pizza',
  },
  {
    src: getAssetPath('/assest/2017-05-18.jpg'),
    alt: 'Warm Gatherings & Celebrations at OTH',
  },
]

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Parallax on scroll
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150)
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Preload next slide image
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % HERO_SLIDES.length
    const img = new Image()
    img.src = HERO_SLIDES[nextIndex].src
  }, [currentIndex])

  // Navigation handlers
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length)
  }, [])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }, [])

  // Autoplay every 4 seconds with tab visibility pause
  useEffect(() => {
    const startTimer = () => {
      if (timerRef.current) clearInterval(timerRef.current)
      timerRef.current = setInterval(() => {
        if (!document.hidden) {
          goToNext()
        }
      }, 4000)
    }

    startTimer()

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) clearInterval(timerRef.current)
      } else {
        startTimer()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [goToNext])

  const handleScroll = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      id="home"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '700px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      {/* Background Slideshow with 1-second crossfade & Ken Burns zoom */}
      <div
        style={{
          position: 'absolute',
          inset: '-10%',
          zIndex: 0,
          transform: `translateY(${scrollY * 0.25}px)`,
          transition: 'transform 0.1s linear',
        }}
      >
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex
          return (
            <div
              key={slide.src}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: isActive ? 1 : 0,
                transition: 'opacity 1000ms ease-in-out',
                pointerEvents: 'none',
              }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transform: isActive && !reducedMotion ? 'scale(1.08)' : 'scale(1)',
                  transition: reducedMotion
                    ? 'none'
                    : 'transform 4.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Dark gradient overlay so text remains razor sharp and readable */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(to top, rgba(23,23,23,0.97) 0%, rgba(32,23,19,0.72) 48%, rgba(20,14,12,0.45) 100%)',
        }}
      />

      {/* Subtle film grain texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          opacity: 0.04,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Arrow Controls (Previous / Next) */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '1.5rem',
          right: '1.5rem',
          transform: 'translateY(-50%)',
          display: 'flex',
          justifyContent: 'space-between',
          zIndex: 4,
          pointerEvents: 'none',
        }}
      >
        <button
          onClick={goToPrev}
          aria-label="Previous slide"
          style={{
            pointerEvents: 'auto',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'rgba(32,23,19,0.5)',
            border: '1px solid rgba(197,164,119,0.3)',
            color: '#F5EEE3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(197,164,119,0.25)'
            e.currentTarget.style.borderColor = '#C5A477'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(32,23,19,0.5)'
            e.currentTarget.style.borderColor = 'rgba(197,164,119,0.3)'
          }}
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={goToNext}
          aria-label="Next slide"
          style={{
            pointerEvents: 'auto',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'rgba(32,23,19,0.5)',
            border: '1px solid rgba(197,164,119,0.3)',
            color: '#F5EEE3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(197,164,119,0.25)'
            e.currentTarget.style.borderColor = '#C5A477'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(32,23,19,0.5)'
            e.currentTarget.style.borderColor = 'rgba(197,164,119,0.3)'
          }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Main Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem 5.5rem',
          width: '100%',
        }}
      >
        {/* Small label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1) 0.2s',
          }}
        >
          <div style={{ width: '40px', height: '1px', background: '#C5A477' }} />
          <span className="section-label">C-Scheme, Jaipur</span>
        </div>

        {/* Main Headline */}
        <h1
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            color: '#F5EEE3',
            maxWidth: '800px',
            marginBottom: '1.5rem',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1) 0.4s',
          }}
        >
          OTH —{' '}
          <em
            style={{
              color: '#C5A477',
              fontStyle: 'italic',
              display: 'block',
            }}
          >
            Where Every Moment
          </em>
          Has Flavour
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1rem',
            color: 'rgba(245,238,227,0.65)',
            maxWidth: '420px',
            marginBottom: '3rem',
            lineHeight: 1.7,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1) 0.6s',
          }}
        >
          European-inspired bistro & artisan bakery. Open daily from 8 AM — where Jaipur's finest gather.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1) 0.8s',
          }}
        >
          <button
            className="btn-primary"
            onClick={() => handleScroll('#menu')}
          >
            Explore Menu
            <ArrowRight size={14} />
          </button>
          <button
            className="btn-outline"
            onClick={() => handleScroll('#about')}
          >
            Discover OTH
          </button>
          <button
            className="btn-ghost"
            onClick={() => handleScroll('#reservation')}
          >
            Reserve a Table
          </button>
        </div>

        {/* Rating badge & Slide Indicators */}
        <div
          style={{
            marginTop: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            opacity: loaded ? 1 : 0,
            transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1) 1s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  style={{ color: i < 4 ? '#C5A477' : 'rgba(197,164,119,0.4)', fontSize: '0.875rem' }}
                >
                  ★
                </span>
              ))}
            </div>
            <span style={{ fontFamily: 'Inter', fontSize: '0.8125rem', color: 'rgba(245,238,227,0.55)' }}>
              4.4 Rating · C-Scheme, Jaipur
            </span>
          </div>

          {/* Slide Indicators */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                style={{
                  width: idx === currentIndex ? '28px' : '8px',
                  height: '4px',
                  borderRadius: '2px',
                  background: idx === currentIndex ? '#C5A477' : 'rgba(245,238,227,0.25)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1s ease 1.2s',
          cursor: 'pointer',
        }}
        onClick={() => handleScroll('#about')}
      >
        <span
          style={{
            fontFamily: 'Inter',
            fontSize: '0.625rem',
            letterSpacing: '0.2em',
            color: 'rgba(245,238,227,0.4)',
            textTransform: 'uppercase',
            writingMode: 'vertical-rl',
          }}
        >
          Scroll
        </span>
        <div style={{ animation: 'bounce 2s infinite' }}>
          <ChevronDown size={16} color="rgba(197,164,119,0.6)" />
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </section>
  )
}
