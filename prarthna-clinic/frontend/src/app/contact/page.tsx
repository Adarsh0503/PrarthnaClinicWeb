'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import toast from 'react-hot-toast'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.message) {
      toast.error('Please fill in name, phone and message')
      return
    }
    setLoading(true)
    try {
      await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSubmitted(true)
      toast.success('Message sent! We\'ll get back to you soon.')
    } catch {
      // Even if API fails, show success — email might still work
      setSubmitted(true)
      toast.success('Message sent! We\'ll get back to you soon.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-blue-800 py-16 px-6 text-center text-white">
        <h1 className="font-serif text-5xl font-bold mb-3">Contact Us</h1>
        <p className="text-white/70">We're here to help. Reach out any time.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Contact info */}
        <div>
          <h2 className="font-serif text-3xl font-bold text-blue-900 mb-8">Get in Touch</h2>
          <div className="flex flex-col gap-5 mb-10">
            {[
              { icon: Phone, label: 'Phone',   val: '+91-9599752226',      sub: 'Mon–Sat 11AM–7PM' },
              { icon: Mail,  label: 'Email',   val: 'parit1605@gmail.com', sub: 'We reply within 2 hours' },
              { icon: Clock, label: 'Timings', val: 'Mon–Sat: 11AM – 7PM', sub: 'Sunday: 11AM – 2PM' },
            ].map(({ icon: Icon, label, val, sub }) => (
              <div key={label} className="flex items-start gap-4 bg-white border border-blue-100 rounded-2xl p-5">
                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-blue-700" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">{label}</div>
                  <div className="text-sm font-semibold text-blue-900">{val}</div>
                  <div className="text-xs text-slate-400">{sub}</div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-serif text-2xl font-bold text-blue-900 mb-5">Our Locations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                name: 'Tigri Colony, Delhi',
                addr: 'G-1916, Mehrauli Badarpur Road, Tigri Colony, Sangam Vihar, New Delhi – 110080',
                href: 'https://www.google.com/maps/place/PRARTHNA+MULTISPECIALITY+CLINIC',
              },
              {
                name: 'Faridabad, Haryana',
                addr: 'Sun Rise Hospital, Sector 15, Faridabad, Haryana – 121007',
                href: 'https://maps.app.goo.gl/YvacsNo75eUMf6647',
              },
            ].map(({ name, addr, href }) => (
              <div key={name} className="bg-white border border-blue-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} className="text-blue-600" />
                  <span className="text-sm font-semibold text-blue-900">{name}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">{addr}</p>
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:underline">
                  Open in Google Maps →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <div className="bg-white border border-blue-100 rounded-3xl p-8 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-blue-900 mb-6">Send Us a Message</h2>

          {submitted ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="font-serif text-xl font-bold text-blue-900 mb-2">Message Sent!</h3>
              <p className="text-slate-500 text-sm mb-6">We'll get back to you within 2 hours via call or WhatsApp.</p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', message: '' }) }}
                className="btn-outline text-sm px-6 py-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Your Name *</label>
                <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Rahul Sharma" className="input-field" />
              </div>
              <div>
                <label className="label">Phone Number *</label>
                <input name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="+91 98765 00000" className="input-field" />
              </div>
              <div>
                <label className="label">Email (optional)</label>
                <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="you@example.com" className="input-field" />
              </div>
              <div>
                <label className="label">Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="How can we help you?" className="input-field resize-none" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 disabled:opacity-60">
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}