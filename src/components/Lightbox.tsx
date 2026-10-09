import { useEffect } from 'react'
import { X } from 'lucide-react'

interface LightboxProps {
  src: string
  onClose: () => void
}

export default function Lightbox({ src, onClose }: LightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          background: 'rgba(197,164,119,0.15)',
          border: '1px solid rgba(197,164,119,0.3)',
          color: '#F5EEE3',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(197,164,119,0.3)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(197,164,119,0.15)'
        }}
      >
        <X size={18} />
      </button>

      {/* Image */}
      <img
        src={src}
        alt="Gallery image"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '85vh',
          objectFit: 'contain',
          boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
          border: '1px solid rgba(197,164,119,0.1)',
        }}
      />

      <p
        style={{
          position: 'absolute',
          bottom: '2rem',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.75rem',
          color: 'rgba(245,238,227,0.35)',
          letterSpacing: '0.1em',
        }}
      >
        Press ESC or click anywhere to close
      </p>
    </div>
  )
}
