import React, { useEffect, useRef, useState } from 'react'
import { Phone, Send, CheckCircle } from 'lucide-react'
import { getAssetPath } from '../utils/asset'

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

interface FormData {
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: string
  occasion: string
  notes: string
}

const initialForm: FormData = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
  occasion: '',
  notes: '',
}

export default function Reservation() {
  const { ref, inView } = useInView()
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    const e: Partial<FormData> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone.trim()) e.phone = 'Phone number required'
    if (!form.date) e.date = 'Date is required'
    if (!form.time) e.time = 'Time is required'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
      setSubmitting(false)
    }, 1500)
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <section
      id="reservation"
      ref={ref}
      style={{
        background: '#201713',
        padding: '7rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.07,
        }}
      >
        <img
          src={getAssetPath('/assest/73869282c39497bbb30f5ce1e766b38a.webp')}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '4rem',
          alignItems: 'start',
        }}
      >
        {/* Left: Info */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 0.9s ease',
          }}
        >
          <div className="section-label" style={{ marginBottom: '1.5rem' }}>Reservations</div>
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
            Reserve Your Table
          </h2>
          <div className="divider-gold" style={{ marginBottom: '1.5rem' }} />
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9375rem',
              color: 'rgba(245,238,227,0.6)',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
            }}
          >
            We'd love to host you. Fill in your details and our team will confirm your reservation within a few hours. For immediate bookings, call us directly.
          </p>

          {/* Direct contact */}
          <div style={{ marginBottom: '2rem' }}>
            <a
              href="tel:01414112232"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                textDecoration: 'none',
                padding: '1.25rem',
                background: 'rgba(197,164,119,0.08)',
                border: '1px solid rgba(197,164,119,0.2)',
                marginBottom: '1rem',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(197,164,119,0.15)'
                e.currentTarget.style.borderColor = 'rgba(197,164,119,0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(197,164,119,0.08)'
                e.currentTarget.style.borderColor = 'rgba(197,164,119,0.2)'
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  background: '#C5A477',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Phone size={18} color="#201713" />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#C5A477',
                    marginBottom: '0.25rem',
                  }}
                >
                  Call to Book
                </div>
                <div
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#F5EEE3',
                  }}
                >
                  0141 411 2232
                </div>
              </div>
            </a>
          </div>

          {/* Hours */}
          <div>
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#C5A477',
                marginBottom: '1rem',
              }}
            >
              Opening Hours
            </div>
            {[
              { day: 'Monday – Sunday', time: '8:00 AM – 10:45 PM' },
              { day: 'Breakfast', time: '8:00 AM – 12:00 PM' },
              { day: 'Lunch', time: '12:00 PM – 3:30 PM' },
              { day: 'Dinner', time: '6:30 PM – 10:45 PM' },
            ].map((h) => (
              <div
                key={h.day}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.625rem 0',
                  borderBottom: '1px solid rgba(197,164,119,0.08)',
                }}
              >
                <span style={{ fontFamily: 'Inter', fontSize: '0.875rem', color: 'rgba(245,238,227,0.55)' }}>{h.day}</span>
                <span style={{ fontFamily: 'Inter', fontSize: '0.875rem', color: '#F5EEE3', fontWeight: 500 }}>{h.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.9s ease 0.15s',
          }}
        >
          {submitted ? (
            <div
              style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                background: 'rgba(32,23,19,0.6)',
                border: '1px solid rgba(197,164,119,0.2)',
              }}
            >
              <CheckCircle size={48} color="#C5A477" style={{ margin: '0 auto 1.5rem' }} />
              <h3
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.75rem',
                  fontWeight: 600,
                  color: '#F5EEE3',
                  marginBottom: '1rem',
                }}
              >
                Request Received!
              </h3>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9375rem',
                  color: 'rgba(245,238,227,0.6)',
                  lineHeight: 1.7,
                  marginBottom: '2rem',
                }}
              >
                Thank you, {form.name}. We'll confirm your table via email or phone within 2–4 hours. See you at OTH!
              </p>
              <button
                className="btn-primary"
                onClick={() => { setSubmitted(false); setForm(initialForm) }}
              >
                Make Another Reservation
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                background: 'rgba(32,23,19,0.6)',
                border: '1px solid rgba(197,164,119,0.15)',
                padding: '2.5rem',
                backdropFilter: 'blur(20px)',
              }}
              noValidate
            >
              <h3
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: '#F5EEE3',
                  marginBottom: '2rem',
                }}
              >
                Book a Table
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <Field label="Full Name" error={errors.name}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    id="res-name"
                    autoComplete="name"
                  />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    id="res-phone"
                    autoComplete="tel"
                  />
                </Field>
              </div>

              <Field label="Email Address" error={errors.email} style={{ marginBottom: '1rem' }}>
                <input
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  id="res-email"
                  autoComplete="email"
                />
              </Field>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <Field label="Date" error={errors.date}>
                  <input
                    type="date"
                    className="form-input"
                    min={minDate}
                    value={form.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    id="res-date"
                  />
                </Field>
                <Field label="Time" error={errors.time}>
                  <select
                    className="form-input"
                    value={form.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    id="res-time"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="">Select</option>
                    <option value="8:00 AM">8:00 AM</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="7:00 PM">7:00 PM</option>
                    <option value="8:00 PM">8:00 PM</option>
                    <option value="9:00 PM">9:00 PM</option>
                    <option value="10:00 PM">10:00 PM</option>
                  </select>
                </Field>
                <Field label="Guests">
                  <select
                    className="form-input"
                    value={form.guests}
                    onChange={(e) => handleChange('guests', e.target.value)}
                    id="res-guests"
                    style={{ cursor: 'pointer' }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Occasion (optional)" style={{ marginBottom: '1rem' }}>
                <select
                  className="form-input"
                  value={form.occasion}
                  onChange={(e) => handleChange('occasion', e.target.value)}
                  id="res-occasion"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="">None</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Date Night">Date Night</option>
                  <option value="Business Lunch">Business Lunch</option>
                  <option value="Family Gathering">Family Gathering</option>
                  <option value="Other">Other</option>
                </select>
              </Field>

              <Field label="Special Requests" style={{ marginBottom: '2rem' }}>
                <textarea
                  className="form-input"
                  placeholder="Dietary requirements, seating preferences, etc."
                  value={form.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  id="res-notes"
                  rows={3}
                  style={{ resize: 'vertical' }}
                />
              </Field>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', opacity: submitting ? 0.7 : 1 }}
                disabled={submitting}
              >
                {submitting ? 'Sending...' : (
                  <>
                    Send Reservation Request
                    <Send size={14} />
                  </>
                )}
              </button>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.75rem',
                  color: 'rgba(245,238,227,0.3)',
                  textAlign: 'center',
                  marginTop: '1rem',
                }}
              >
                We'll confirm within 2–4 hours. For urgent bookings, please call us.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

interface FieldProps {
  label: string
  error?: string
  children: React.ReactNode
  style?: React.CSSProperties
}

function Field({ label, error, children, style }: FieldProps) {
  return (
    <div style={{ ...style }}>
      <label
        style={{
          display: 'block',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.6875rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: error ? '#ff6b6b' : 'rgba(245,238,227,0.5)',
          marginBottom: '0.5rem',
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.75rem',
            color: '#ff6b6b',
            marginTop: '0.25rem',
          }}
        >
          {error}
        </p>
      )}
    </div>
  )
}
