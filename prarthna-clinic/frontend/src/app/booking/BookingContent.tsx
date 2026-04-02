'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { bookingAPI } from '@/lib/api'
import { CalendarDays, Clock, User, Stethoscope } from 'lucide-react'
import Link from 'next/link'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

interface Doctor {
  id: number
  name: string
  specialization: string
  isApproved: string
}

const timeSlots = ['11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM']

export default function BookingContent() {
  const searchParams = useSearchParams()
  const preselectedDoctorId = searchParams.get('doctorId') || ''

  const [submitted, setSubmitted]   = useState(false)
  const [loading, setLoading]       = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const [doctors, setDoctors]       = useState<Doctor[]>([])

  // Form state (controlled)
  const [firstName, setFirstName] = useState('')
  const [lastName,  setLastName]  = useState('')
  const [phone,     setPhone]     = useState('')
  const [doctorId,  setDoctorId]  = useState(preselectedDoctorId)
  const [date,      setDate]      = useState('')
  const [timeSlot,  setTimeSlot]  = useState('')
  const [reason,    setReason]    = useState('')
  const [errors,    setErrors]    = useState<Record<string, string>>({})

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user  = localStorage.getItem('user')
    if (token && user) {
      const u = JSON.parse(user)
      const role = u.role?.toLowerCase()
      setIsLoggedIn(role === 'patient' || role === 'admin')
    } else {
      setIsLoggedIn(false)
    }

    fetch(`${API}/api/doctors`)
      .then(r => r.json())
      .then(data => {
        const approved = (data.data || []).filter((d: Doctor) => d.isApproved === 'approved')
        setDoctors(approved)
        // Set doctorId after doctors load if URL param exists
        if (preselectedDoctorId) {
          setDoctorId(preselectedDoctorId)
        }
      })
      .catch(console.error)
  }, [preselectedDoctorId])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!firstName.trim()) e.firstName = 'Required'
    if (!lastName.trim())  e.lastName  = 'Required'
    if (phone.length < 10) e.phone     = 'Enter valid phone'
    if (!doctorId)         e.doctorId  = 'Select a doctor'
    if (!date)             e.date      = 'Select a date'
    if (!timeSlot)         e.timeSlot  = 'Select a time'
    if (reason.length < 5) e.reason    = 'Please describe your concern'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await bookingAPI.create({
        doctorId:        Number(doctorId),
        appointmentDate: date,
        timeSlot,
        reason,
        patientName:     `${firstName} ${lastName}`,
        phone,
      })
      setSubmitted(true)
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status
      if (status === 403 || status === 401) {
        toast.error('Session expired. Please login again.')
        setTimeout(() => { window.location.href = '/login' }, 1500)
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl p-12 max-w-md w-full text-center shadow-xl">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="font-serif text-3xl font-bold text-blue-900 mb-3">Appointment Requested!</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Thank you! Our team will contact you within 2 hours to confirm via call or WhatsApp.
          </p>
          <div className="flex gap-3 justify-center">
            <a href="/patient/dashboard" className="btn-outline inline-block text-sm px-6">View Bookings</a>
            <a href="/" className="btn-primary inline-block text-sm px-6">Back to Home</a>
          </div>
        </div>
      </div>
    )
  }

  if (isLoggedIn === null) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isLoggedIn) {
    const returnUrl = `/booking${preselectedDoctorId ? `?doctorId=${preselectedDoctorId}` : ''}`
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-blue-800 py-16 px-6 text-center text-white">
          <h1 className="font-serif text-5xl font-bold mb-3">Book an Appointment</h1>
          <p className="text-white/70">We'll confirm your slot within 2 hours via call or WhatsApp.</p>
        </div>
        <div className="max-w-md mx-auto px-6 py-20 text-center">
          <div className="bg-white rounded-3xl p-10 border border-blue-100 shadow-sm">
            <div className="text-5xl mb-4">🔒</div>
            <h2 className="font-serif text-2xl font-bold text-blue-900 mb-3">Login Required</h2>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              Please login or create an account to book an appointment with our doctors.
            </p>
            <div className="flex flex-col gap-3">
              <Link href={`/login?redirect=${encodeURIComponent(returnUrl)}`} className="btn-primary w-full py-3 text-center">
                Login to Continue
              </Link>
              <Link href="/register" className="btn-outline w-full py-3 text-center">
                Create New Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-blue-800 py-16 px-6 text-center text-white">
        <h1 className="font-serif text-5xl font-bold mb-3">Book an Appointment</h1>
        <p className="text-white/70">We'll confirm your slot within 2 hours via call or WhatsApp.</p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="space-y-4">
          {[
            { icon: User,         title: 'Personalised Care',  desc: 'Tell us your concern and we\'ll match you with the right doctor.' },
            { icon: CalendarDays, title: 'Flexible Timings',   desc: 'Available Mon–Sat 11AM–7PM and Sundays 11AM–2PM.' },
            { icon: Clock,        title: 'Quick Confirmation', desc: 'We confirm within 2 hours of your request.' },
            { icon: Stethoscope,  title: 'Expert Doctors',     desc: 'Specialists in General Medicine & Dentistry.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-blue-100 rounded-2xl p-5 flex gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <Icon size={18} className="text-blue-700" />
              </div>
              <div>
                <div className="text-sm font-semibold text-blue-900">{title}</div>
                <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-blue-100 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-blue-900 mb-6">Fill in Your Details</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">First Name</label>
                <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Rahul" className="input-field" />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="label">Last Name</label>
                <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Sharma" className="input-field" />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="label">Phone Number</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="+91 98765 00000" className="input-field" />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="label">Select Doctor</label>
              <select value={doctorId} onChange={e => setDoctorId(e.target.value)} className="input-field">
                <option value="">-- Select a Doctor --</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id.toString()}>
                    {d.name} – {d.specialization}
                  </option>
                ))}
              </select>
              {errors.doctorId && <p className="text-red-500 text-xs mt-1">{errors.doctorId}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Preferred Date</label>
                <input value={date} onChange={e => setDate(e.target.value)} type="date" className="input-field" min={new Date().toISOString().split('T')[0]} />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>
              <div>
                <label className="label">Preferred Time</label>
                <select value={timeSlot} onChange={e => setTimeSlot(e.target.value)} className="input-field">
                  <option value="">-- Select Time --</option>
                  {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.timeSlot && <p className="text-red-500 text-xs mt-1">{errors.timeSlot}</p>}
              </div>
            </div>

            <div>
              <label className="label">Reason for Visit</label>
              <textarea value={reason} onChange={e => setReason(e.target.value)} rows={4}
                placeholder="Briefly describe your symptoms or concern..."
                className="input-field resize-none" />
              {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-base disabled:opacity-60">
              {loading ? 'Submitting...' : 'Confirm Appointment Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}