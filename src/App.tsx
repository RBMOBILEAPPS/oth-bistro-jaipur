import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Signature from './components/Signature'
import Menu from './components/Menu'
import Gallery from './components/Gallery'
import Reviews from './components/Reviews'
import Reservation from './components/Reservation'
import Location from './components/Location'
import Footer from './components/Footer'
import Lightbox from './components/Lightbox'

function App() {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null)
  const [pageLoaded, setPageLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setPageLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className="min-h-screen"
      style={{
        opacity: pageLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
    >
      <Navbar />
      <Hero />
      <About />
      <Signature />
      <Menu />
      <Gallery onOpenLightbox={setLightboxImg} />
      <Reviews />
      <Reservation />
      <Location />
      <Footer />
      {lightboxImg && (
        <Lightbox src={lightboxImg} onClose={() => setLightboxImg(null)} />
      )}
    </div>
  )
}

export default App
