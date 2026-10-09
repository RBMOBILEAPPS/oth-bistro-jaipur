import React, { useEffect, useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'

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

const reviews = [
  {
    name: 'Priya Sharma',
    rating: 5,
    date: 'September 2025',
    text: 'Absolutely stunning cafe. The Biscoff croissant was heavenly and the coffee was perfectly brewed. The ambience is so cozy — feels like a European escape in the heart of Jaipur.',
    platform: 'Google',
  },
  {
    name: 'Rahul Agarwal',
    rating: 5,
    date: 'August 2025',
    text: 'OTH has consistently been my go-to for a chill brunch. The mushroom ravioli is outstanding, and the service is warm and attentive. Cannot recommend enough!',
    platform: 'Google',
  },
  {
    name: 'Meera Joshi',
    rating: 4,
    date: 'October 2025',
    text: 'Beautiful place with a great outdoor seating area. The pancake stack was delicious and fluffy. Slightly pricey but absolutely worth it for a special occasion.',
    platform: 'Google',
  },
  {
    name: 'Arjun Kapoor',
    rating: 5,
    date: 'July 2025',
    text: 'Came for the KitKat shake and stayed for the Lamb Smash Burger. Both were phenomenal. The aesthetic of this place is Instagram-perfect and the food lives up to the hype.',
    platform: 'Google',
  },
  {
    name: 'Sonal Mehta',
    rating: 5,
    date: 'September 2025',
    text: 'One of the most charming cafes in Jaipur. Love the vibe — great for dates, family lunches or working remotely. The eggs benedict florentine is a must order!',
    platform: 'Google',
  },
  {
    name: 'Vikram Singh',
    rating: 4,
    date: 'August 2025',
    text: 'Great cafe with an amazing European vibe. The food quality is consistently good and the staff is very friendly. The cold brew coffee is exceptional.',
    platform: 'Google',
  },
]

export default function Reviews() {
  const { ref, inView } = useInView()
  const [activeIndex, setActiveIndex] = useState(0)

  const visibleReviews = reviews.slice(activeIndex, activeIndex + 3)

  return (
    <section
      id="reviews"
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
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '2rem',
            marginBottom: '3.5rem',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.9s ease',
          }}
        >
          <div>
            <div className="section-label" style={{ marginBottom: '1rem' }}>Guest Reviews</div>
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 600,
                color: '#F5EEE3',
                lineHeight: 1.15,
              }}
            >
              What Our Guests Say
            </h2>
          </div>

          {/* Overall rating */}
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '3.5rem',
                fontWeight: 700,
                color: '#C5A477',
                lineHeight: 1,
              }}
            >
              4.4
            </div>
            <div style={{ display: 'flex', gap: '2px', justifyContent: 'flex-end', margin: '0.25rem 0' }}>
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: i < 4 ? '#C5A477' : 'rgba(197,164,119,0.3)', fontSize: '1rem' }}>★</span>
              ))}
            </div>
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                color: 'rgba(245,238,227,0.4)',
              }}
            >
              Based on Google Reviews
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {reviews.map((review, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(32,23,19,0.4)',
                border: '1px solid rgba(197,164,119,0.1)',
                padding: '2rem',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.8s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s`,
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
              {/* Stars */}
              <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                {[...Array(5)].map((_, s) => (
                  <span
                    key={s}
                    style={{ color: s < review.rating ? '#C5A477' : 'rgba(197,164,119,0.25)', fontSize: '0.875rem' }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Review text */}
              <p
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.0625rem',
                  fontStyle: 'italic',
                  color: 'rgba(245,238,227,0.75)',
                  lineHeight: 1.8,
                  marginBottom: '1.5rem',
                }}
              >
                "{review.text}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#F5EEE3',
                    }}
                  >
                    {review.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.75rem',
                      color: 'rgba(245,238,227,0.35)',
                      marginTop: '0.125rem',
                    }}
                  >
                    {review.date}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.625rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#4285F4',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  G
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google link */}
        <div style={{ textAlign: 'center' }}>
          <a
            href="https://maps.google.com/?q=OTH+Bistro+Bakers+Jaipur"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            View All Reviews on Google
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
