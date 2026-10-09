import React, { useEffect, useRef, useState } from 'react'
import { getAssetPath } from '../utils/asset'
import { ArrowRight } from 'lucide-react'

function useInView(threshold = 0.15) {
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

const signatures = [
  {
    image: '/assest/unnamed (42).jpg',
    category: 'Breakfast',
    title: 'Full English Breakfast',
    description: 'Sunny-side-up farm eggs, grilled sausages, crispy bacon, baked beans, golden hash brown & artisan toast.',
    price: '₹425',
    tag: 'Morning Favourite',
  },
  {
    image: '/assest/unnamed (35).jpg',
    category: 'Continental',
    title: 'Artisan Wood-Fired Pizza',
    description: 'Crispy hand-tossed crust with rich tomato pomodoro, bell peppers, black olives & melted mozzarella.',
    price: '₹475',
    tag: 'Chef\'s Special',
  },
  {
    image: '/assest/unnamed (40).jpg',
    category: 'Bakery',
    title: 'Fresh Butter & Almond Croissants',
    description: 'Flaky French-style laminated viennoiserie, golden toasted almonds and powdered sugar, baked fresh every morning.',
    price: '₹180',
    tag: 'Bestseller',
  },
  {
    image: '/assest/unnamed (22).jpg',
    category: 'Specialty Coffee',
    title: 'Signature Cocoa Mocha',
    description: 'Locally roasted espresso blended with velvety steamed milk, dark cocoa dust and an artisanal butter cookie.',
    price: '₹245',
    tag: 'Must Try',
  },
]

export default function Signature() {
  const { ref, inView } = useInView()

  return (
    <section
      id="signature"
      ref={ref}
      style={{
        background: '#201713',
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
            marginBottom: '4rem',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <div>
            <div className="section-label" style={{ marginBottom: '1rem' }}>Signature Dishes</div>
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 600,
                color: '#F5EEE3',
                lineHeight: 1.15,
                maxWidth: '500px',
              }}
            >
              Crafted with Passion,
              <em style={{ color: '#C5A477', fontStyle: 'italic' }}> Served with Soul</em>
            </h2>
          </div>
          <a
            href="#menu"
            className="btn-outline"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Full Menu <ArrowRight size={14} />
          </a>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {signatures.map((item, i) => (
            <div
              key={item.title}
              style={{
                background: 'rgba(23,23,23,0.5)',
                border: '1px solid rgba(197,164,119,0.1)',
                overflow: 'hidden',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.8s cubic-bezier(0.4,0,0.2,1) ${i * 0.1 + 0.2}s`,
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(197,164,119,0.35)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(197,164,119,0.1)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img
                  src={getAssetPath(item.image)}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                />
                {/* Tag */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: '#C5A477',
                    color: '#201713',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '0.25rem 0.625rem',
                  }}
                >
                  {item.tag}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '1.5rem' }}>
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.625rem',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#C5A477',
                    marginBottom: '0.5rem',
                  }}
                >
                  {item.category}
                </div>
                <h3
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#F5EEE3',
                    marginBottom: '0.75rem',
                    lineHeight: 1.25,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.8125rem',
                    color: 'rgba(245,238,227,0.5)',
                    lineHeight: 1.7,
                    marginBottom: '1.25rem',
                  }}
                >
                  {item.description}
                </p>
                <div
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#C5A477',
                  }}
                >
                  {item.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
