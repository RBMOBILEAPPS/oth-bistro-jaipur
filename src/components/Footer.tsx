import React from 'react'
import { Phone, MapPin, Clock, Heart, Star } from 'lucide-react'

export default function Footer() {
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Menu', href: '#menu' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Reservation', href: '#reservation' },
    { label: 'Find Us', href: '#location' },
  ]

  const handleNav = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      style={{
        background: '#0F0B09',
        borderTop: '1px solid rgba(197,164,119,0.1)',
        paddingTop: '5rem',
      }}
    >
      {/* Main footer */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          paddingBottom: '4rem',
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <div
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#C5A477',
                letterSpacing: '0.05em',
                lineHeight: 1,
              }}
            >
              OTH
            </div>
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.625rem',
                fontWeight: 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(245,238,227,0.4)',
                marginTop: '4px',
              }}
            >
              Bistro & Bakers · Jaipur
            </div>
          </div>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
              color: 'rgba(245,238,227,0.45)',
              lineHeight: 1.8,
              marginBottom: '2rem',
              maxWidth: '260px',
            }}
          >
            A European-inspired sanctuary in the heart of C-Scheme, Jaipur. Where every moment has flavour.
          </p>

          {/* Social */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                ),
                href: 'https://instagram.com',
                label: 'Instagram',
              },
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                ),
                href: 'https://facebook.com',
                label: 'Facebook',
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                style={{
                  width: '40px',
                  height: '40px',
                  border: '1px solid rgba(197,164,119,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(245,238,227,0.5)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C5A477'
                  e.currentTarget.style.color = '#C5A477'
                  e.currentTarget.style.background = 'rgba(197,164,119,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(197,164,119,0.2)'
                  e.currentTarget.style.color = 'rgba(245,238,227,0.5)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C5A477',
              marginBottom: '1.5rem',
            }}
          >
            Navigation
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                  color: 'rgba(245,238,227,0.5)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#F5EEE3' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,238,227,0.5)' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C5A477',
              marginBottom: '1.5rem',
            }}
          >
            Contact
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a
              href="tel:01414112232"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                textDecoration: 'none',
                color: 'rgba(245,238,227,0.55)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                lineHeight: 1.5,
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#F5EEE3' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,238,227,0.55)' }}
            >
              <Phone size={16} color="#C5A477" style={{ flexShrink: 0, marginTop: '2px' }} />
              0141 411 2232
            </a>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <MapPin size={16} color="#C5A477" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                  color: 'rgba(245,238,227,0.55)',
                  lineHeight: 1.6,
                }}
              >
                E-145, Ramesh Marg, C-Scheme,<br />
                Jaipur – 302001
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <Clock size={16} color="#C5A477" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                  color: 'rgba(245,238,227,0.55)',
                  lineHeight: 1.6,
                }}
              >
                Open Daily<br />
                8:00 AM – 10:45 PM
              </span>
            </div>
          </div>
        </div>

        {/* Hours */}
        <div>
          <h4
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C5A477',
              marginBottom: '1.5rem',
            }}
          >
            Make a Reservation
          </h4>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
              color: 'rgba(245,238,227,0.5)',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
            }}
          >
            Experience Jaipur's finest European bistro. Reserve your table today.
          </p>
          <button
            className="btn-primary"
            onClick={() => document.querySelector('#reservation')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Reserve a Table
          </button>
        </div>
      </div>

      {/* Gold divider */}
      <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(197,164,119,0.3), transparent)' }} />

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '1.5rem 2rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.75rem',
            color: 'rgba(245,238,227,0.25)',
          }}
        >
          © {new Date().getFullYear()} OTH Bistro & Bakers, Jaipur. All rights reserved.
        </p>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.75rem',
            color: 'rgba(245,238,227,0.2)',
          }}
        >
          Crafted with care for extraordinary experiences.
        </p>
      </div>
    </footer>
  )
}
