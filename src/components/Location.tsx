import React, { useEffect, useRef, useState } from 'react'
import { MapPin, Phone, Clock, Navigation, ExternalLink } from 'lucide-react'

function useInView(threshold = 0.1) {
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

export default function Location() {
  const { ref, inView } = useInView()

  return (
    <section
      id="location"
      ref={ref}
      style={{
        background: '#171717',
        padding: '7rem 0',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem',
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '4rem',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.9s ease',
          }}
        >
          <div className="section-label" style={{ marginBottom: '1rem' }}>Find Us</div>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 600,
              color: '#F5EEE3',
            }}
          >
            Visit OTH in Jaipur
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Info cards */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 0.9s ease 0.1s',
            }}
          >
            {[
              {
                icon: <MapPin size={20} color="#C5A477" />,
                title: 'Address',
                lines: [
                  'E-145, Ramesh Marg,',
                  'Durgadas Colony, C-Scheme,',
                  'Ashok Nagar, Jaipur – 302001',
                  'Rajasthan, India',
                ],
                action: {
                  label: 'Get Directions',
                  href: 'https://www.google.com/maps/dir/?api=1&destination=OTH+Bistro+Bakers+Jaipur+C+Scheme',
                  icon: <Navigation size={14} />,
                },
              },
              {
                icon: <Phone size={20} color="#C5A477" />,
                title: 'Phone',
                lines: ['0141 411 2232'],
                action: {
                  label: 'Click to Call',
                  href: 'tel:01414112232',
                  icon: <Phone size={14} />,
                },
              },
              {
                icon: <Clock size={20} color="#C5A477" />,
                title: 'Hours',
                lines: ['Monday – Sunday', '8:00 AM – 10:45 PM', '', 'Last orders at 10:30 PM'],
                action: null,
              },
            ].map((card, i) => (
              <div
                key={card.title}
                style={{
                  padding: '1.75rem',
                  background: 'rgba(32,23,19,0.4)',
                  border: '1px solid rgba(197,164,119,0.1)',
                  display: 'flex',
                  gap: '1.25rem',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(197,164,119,0.25)'
                  e.currentTarget.style.background = 'rgba(61,43,34,0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(197,164,119,0.1)'
                  e.currentTarget.style.background = 'rgba(32,23,19,0.4)'
                }}
              >
                <div style={{ paddingTop: '0.125rem', flexShrink: 0 }}>{card.icon}</div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#C5A477',
                      marginBottom: '0.625rem',
                    }}
                  >
                    {card.title}
                  </div>
                  {card.lines.map((line, j) =>
                    line ? (
                      <div
                        key={j}
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.9375rem',
                          color: 'rgba(245,238,227,0.75)',
                          lineHeight: 1.7,
                        }}
                      >
                        {line}
                      </div>
                    ) : (
                      <div key={j} style={{ height: '0.5rem' }} />
                    )
                  )}
                  {card.action && (
                    <a
                      href={card.action.href}
                      target={card.action.href.startsWith('http') ? '_blank' : undefined}
                      rel={card.action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        marginTop: '1rem',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#C5A477',
                        textDecoration: 'none',
                        borderBottom: '1px solid rgba(197,164,119,0.3)',
                        paddingBottom: '2px',
                        transition: 'border-color 0.3s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#C5A477'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(197,164,119,0.3)'
                      }}
                    >
                      {card.action.label}
                      {card.action.icon}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Map */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.9s ease 0.2s',
            }}
          >
            <div
              style={{
                position: 'relative',
                height: '480px',
                border: '1px solid rgba(197,164,119,0.15)',
                overflow: 'hidden',
              }}
            >
              <iframe
                title="OTH Bistro & Bakers Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.2!2d75.806!3d26.896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5bfb7b1a5a5%3A0x0!2sOTH%20Bistro%20%26%20Bakers!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.5)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <a
                href="https://www.google.com/maps/search/OTH+Bistro+Bakers+Jaipur+C+Scheme"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center', textAlign: 'center' }}
              >
                <Navigation size={14} />
                Get Directions
              </a>
              <a
                href="tel:01414112232"
                className="btn-outline"
                style={{ flex: 1, justifyContent: 'center', textAlign: 'center' }}
              >
                <Phone size={14} />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
