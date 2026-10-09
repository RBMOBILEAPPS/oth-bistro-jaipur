import React, { useEffect, useRef, useState } from 'react'
import { getAssetPath } from '../utils/asset'

function useInView(threshold = 0.2) {
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

export default function About() {
  const { ref, inView } = useInView()

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: '#171717',
        padding: '7rem 0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '5rem',
          alignItems: 'center',
        }}
      >
        {/* Image Side */}
        <div
          style={{
            position: 'relative',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(-40px)',
            transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {/* Main image */}
          <div
            className="img-hover"
            style={{
              aspectRatio: '4/5',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <img
              src={getAssetPath('/assest/92da9e5ade4d2c08437b7f8ca11e2a03_1508610299.webp')}
              alt="OTH Bistro Courtyard and Entrance"
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Floating accent card */}
          <div
            style={{
              position: 'absolute',
              bottom: '-2rem',
              right: '-2rem',
              background: '#C5A477',
              padding: '2rem',
              width: '180px',
            }}
          >
            <div
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '2.5rem',
                fontWeight: 700,
                color: '#201713',
                lineHeight: 1,
              }}
            >
              4.4
            </div>
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(32,23,19,0.7)',
                marginTop: '0.25rem',
              }}
            >
              Google Rating
            </div>
            <div style={{ display: 'flex', gap: '2px', marginTop: '0.5rem' }}>
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ fontSize: '0.75rem', color: i < 4 ? '#201713' : 'rgba(32,23,19,0.3)' }}>★</span>
              ))}
            </div>
          </div>

          {/* Gold line accent */}
          <div
            style={{
              position: 'absolute',
              top: '-1rem',
              left: '-1rem',
              width: '60px',
              height: '60px',
              borderTop: '2px solid #C5A477',
              borderLeft: '2px solid #C5A477',
            }}
          />
        </div>

        {/* Text Side */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(40px)',
            transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1) 0.15s',
          }}
        >
          <div className="section-label" style={{ marginBottom: '1.5rem' }}>
            Our Story
          </div>

          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 600,
              color: '#F5EEE3',
              lineHeight: 1.15,
              marginBottom: '1.5rem',
            }}
          >
            On The House —{' '}
            <em style={{ color: '#C5A477', fontStyle: 'italic' }}>
              Jaipur's Finest
            </em>{' '}
            European Bistro
          </h2>

          <div className="divider-gold" />

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9375rem',
              color: 'rgba(245,238,227,0.65)',
              lineHeight: 1.85,
              marginBottom: '1.5rem',
            }}
          >
            Nestled in the heart of C-Scheme, OTH Bistro & Bakers is Jaipur's most beloved European-style café — a sanctuary where time slows down and every detail has been crafted for your pleasure.
          </p>

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9375rem',
              color: 'rgba(245,238,227,0.65)',
              lineHeight: 1.85,
              marginBottom: '2.5rem',
            }}
          >
            From our flaky Biscoff croissants baked at dawn to our handcrafted specialty coffees and gourmet continental mains — everything here is made with intention, sourced with care, and served with warmth.
          </p>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {[
              { number: '8AM', label: 'Open Daily' },
              { number: '11PM', label: 'Last Orders' },
              { number: '2015', label: 'Est.' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.625rem',
                    fontWeight: 700,
                    color: '#C5A477',
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,238,227,0.4)',
                    marginTop: '0.25rem',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <a
            href="#menu"
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            View Our Menu
          </a>
        </div>
      </div>
    </section>
  )
}
