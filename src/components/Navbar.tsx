import React, { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Reserve', href: '#reservation' },
  { label: 'Find Us', href: '#location' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.4s ease',
          padding: scrolled ? '0.875rem 0' : '1.5rem 0',
          background: scrolled
            ? 'rgba(23, 23, 23, 0.97)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(197, 164, 119, 0.1)'
            : 'none',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            style={{ textDecoration: 'none' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.625rem',
                  fontWeight: 700,
                  color: '#C5A477',
                  letterSpacing: '0.05em',
                  lineHeight: 1,
                }}
              >
                OTH
              </span>
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.5625rem',
                  fontWeight: 500,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(245, 238, 227, 0.55)',
                  marginTop: '2px',
                }}
              >
                Bistro & Bakers
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
            }}
            className="hidden-mobile"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link"
                onClick={(e) => { e.preventDefault(); handleNav(item.href) }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Call CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a
              href="tel:01414112232"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#C5A477',
                textDecoration: 'none',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.8125rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                transition: 'opacity 0.3s',
              }}
              className="hidden-mobile"
            >
              <Phone size={14} />
              0141 411 2232
            </a>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{
                background: 'none',
                border: 'none',
                color: '#F5EEE3',
                cursor: 'pointer',
                padding: '0.25rem',
              }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          background: 'rgba(23, 23, 23, 0.98)',
          backdropFilter: 'blur(30px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'all' : 'none',
          transform: mobileOpen ? 'translateY(0)' : 'translateY(-100%)',
        }}
      >
        {navItems.map((item, i) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => { e.preventDefault(); handleNav(item.href) }}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '2rem',
              fontWeight: 500,
              color: '#F5EEE3',
              textDecoration: 'none',
              letterSpacing: '0.05em',
              transition: 'color 0.3s ease',
              transitionDelay: mobileOpen ? `${i * 0.05}s` : '0s',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#C5A477')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#F5EEE3')}
          >
            {item.label}
          </a>
        ))}
        <a
          href="tel:01414112232"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#C5A477',
            textDecoration: 'none',
            fontFamily: 'Inter, sans-serif',
            fontSize: '1rem',
            fontWeight: 600,
            marginTop: '1rem',
          }}
        >
          <Phone size={16} />
          0141 411 2232
        </a>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}
