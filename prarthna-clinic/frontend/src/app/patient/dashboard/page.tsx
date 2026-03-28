'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { CalendarDays, Clock, Stethoscope, XCircle } from 'lucide-react'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

interface Booking {
  id: number
  appointmentDate: string
  timeSlot: string
  reason: string
  status: string
  ticketPrice: number
  doctor: { id: number; name: string; specialization: string; photo: string | null }
  createdAt: string
}

function getToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

const statusColor = (s: string) => ({
  pending:   'bg-amber-100 text-amber-800 border border-amber-200',
  approved:  'bg-green-100 text-green-800 border border-green-200',
  cancelled: 'bg-red-100 text-red-800 border border-red-200',
}[s] || 'bg-gray-100 text-gray-700')

const statusIcon = (s: string) => ({
  pending:   '⏳',
  approved:  '✅',
  cancelled: '❌',
}[s] || '•')

export default function PatientDashboard() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading]   = useState(true)
  const [userName, setUserName] = useState('')
  const [cancelling, setCancelling] = useState<number | null>(null)
  const [filter, setFilter] = useState('all')

  const loadBookings = useCallback(async () => {
    const stored = localStorage.getItem('user')
    if (!stored) { router.push('/login'); return }
    const u = JSON.parse(stored)
    setUserName(u.name || u.email)

    try {
      const res = await fetch(`${API}/api/bookings/my`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      const data = await res.json()
      setBookings(data.data || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => { loadBookings() }, [loadBookings])

  const cancelBooking = async (id: number) => {
    if (!confirm('Cancel this appointment?')) return
    setCancelling(id)
    try {
      await fetch(`${API}/api/bookings/${id}/cancel`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b))
    } catch (e) { console.error(e) }
    finally { setCancelling(null) }
  }

  const filtered = bookings.filter(b => filter === 'all' || b.status === filter)

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-blue-800 py-10 px-6 text-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-blue-300 text-sm mb-1">Welcome back</p>
          <h1 className="font-serif text-3xl font-bold">{userName}</h1>
          <p className="text-blue-200 text-sm mt-1">Your appointment history</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total',     value: bookings.length,                              color: 'blue' },
            { label: 'Upcoming',  value: bookings.filter(b => b.status === 'approved').length,  color: 'green' },
            { label: 'Pending',   value: bookings.filter(b => b.status === 'pending').length,   color: 'amber' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-center">
              <div className="text-2xl font-bold text-blue-900">{value}</div>
              <div className="text-slate-500 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-5">
          {['all', 'pending', 'approved', 'cancelled'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filter === s
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Bookings */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
            <div className="text-4xl mb-3">📅</div>
            <p className="text-slate-500">No appointments found</p>
            <a href="/booking" className="btn-primary inline-block mt-4 text-sm">Book Appointment</a>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(b => (
              <div key={b.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                        <Stethoscope size={18} className="text-blue-700" />
                      </div>
                      <div>
                        <div className="font-semibold text-blue-900">{b.doctor?.name}</div>
                        <div className="text-xs text-slate-400">{b.doctor?.specialization}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600 ml-1">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={14} className="text-blue-500" />
                        {b.appointmentDate}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} className="text-blue-500" />
                        {b.timeSlot}
                      </span>
                    </div>
                    <div className="text-sm text-slate-600 ml-1">
                      <span className="font-medium">Reason:</span> {b.reason}
                    </div>
                    {b.ticketPrice && (
                      <div className="text-sm text-slate-600 ml-1">
                        <span className="font-medium">Fee:</span> ₹{b.ticketPrice}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(b.status)}`}>
                      {statusIcon(b.status)} {b.status}
                    </span>
                    {b.status === 'pending' && (
                      <button
                        onClick={() => cancelBooking(b.id)}
                        disabled={cancelling === b.id}
                        className="flex items-center gap-1 text-red-500 hover:text-red-700 text-xs font-medium transition-colors disabled:opacity-50"
                      >
                        <XCircle size={14} />
                        {cancelling === b.id ? 'Cancelling...' : 'Cancel'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <a href="/booking" className="btn-primary inline-block">+ Book New Appointment</a>
        </div>
      </div>
    </div>
  )
}