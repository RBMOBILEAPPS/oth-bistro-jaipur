import React, { useEffect, useRef, useState } from 'react'
import { ZoomIn } from 'lucide-react'
import galleryManifest from '../data/galleryManifest'
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

interface GalleryProps {
  onOpenLightbox: (src: string) => void
}

export default function Gallery({ onOpenLightbox }: GalleryProps) {
  const { ref, inView } = useInView()

  return (
    <section
      id="gallery"
      ref={ref}
      style={{
        background: '#201713',
        padding: '7rem 0',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '3.5rem',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.9s ease',
          }}
        >
          <div className="section-label" style={{ marginBottom: '1rem' }}>
            Life at OTH • {galleryManifest.length} Curated Photographs
          </div>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 600,
              color: '#F5EEE3',
              marginBottom: '1rem',
            }}
          >
            The Visual Archive
          </h2>
          <p
            style={{
              color: 'rgba(245,238,227,0.6)',
              fontSize: '0.95rem',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            An authentic photographic journey through our courtyard, artisanal bakery, specialty kitchen, and guest moments in C-Scheme, Jaipur.
          </p>
        </div>

        {/* Responsive Masonry Layout */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {galleryManifest.map((img, i) => (
            <div
              key={img.id || i}
              className="break-inside-avoid mb-4 group relative overflow-hidden bg-black/40 border border-[#C5A477]/10 hover:border-[#C5A477]/40 transition-all duration-300 cursor-pointer"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${(i % 12) * 0.05}s`,
              }}
              onClick={() => onOpenLightbox(getAssetPath(img.src))}
              role="button"
              tabIndex={0}
              aria-label={`View ${img.name}`}
              onKeyDown={(e) => e.key === 'Enter' && onOpenLightbox(getAssetPath(img.src))}
            >
              <img
                src={getAssetPath(img.src)}
                alt={img.name}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
              />

              {/* Hover overlay with zoom icon */}
              <div className="absolute inset-0 bg-[#201713]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <div className="w-11 h-11 border border-[#C5A477] bg-[#201713]/80 flex items-center justify-center text-[#C5A477] shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
