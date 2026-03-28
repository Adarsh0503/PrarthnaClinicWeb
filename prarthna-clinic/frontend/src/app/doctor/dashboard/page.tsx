'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Phone, Mail, CalendarDays, Clock } from 'lucide-react'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

interface Booking {
  id: number
  appointmentDate: string
  timeSlot: string
  reason: string
  status: string
  ticketPrice: number
  user: { id: number; name: string; email: string; phone: string }
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

export default function DoctorDashboard() {
  const router = useRouter()
  const [bookings, setBookings]     = useState<Booking[]>([])
  const [loading, setLoading]       = useState(true)
  const [doctorName, setDoctorName] = useState('')
  const [filter, setFilter]         = useState('all')
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [dateFilter, setDateFilter] = useState('')

  const loadBookings = useCallback(async () => {
    const stored = localStorage.getItem('user')
    if (!stored) { router.push('/login'); return }
    const u = JSON.parse(stored)
    if (u.role !== 'doctor' && u.role !== 'DOCTOR') { router.push('/'); return }
    setDoctorName(u.name || u.email)

    try {
      const res = await fetch(`${API}/api/bookings/doctor`, {
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

  const updateStatus = async (id: number, action: 'approve' | 'cancel') => {
    setActionLoading(id)
    try {
      await fetch(`${API}/api/bookings/${id}/${action}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      setBookings(prev => prev.map(b =>
        b.id === id ? { ...b, status: action === 'approve' ? 'approved' : 'cancelled' } : b
      ))
    } catch (e) { console.error(e) }
    finally { setActionLoading(null) }
  }

  const filtered = bookings.filter(b => {
    const matchStatus = filter === 'all' || b.status === filter
    const matchDate = !dateFilter || b.appointmentDate === dateFilter
    return matchStatus && matchDate
  })

  const todayCount = bookings.filter(b =>
    b.appointmentDate === new Date().toISOString().split('T')[0] && b.status === 'approved'
  ).length

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-blue-800 py-10 px-6 text-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-blue-300 text-sm mb-1">Doctor Portal</p>
          <h1 className="font-serif text-3xl font-bold">{doctorName}</h1>
          <p className="text-blue-200 text-sm mt-1">Patient appointments overview</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total',     value: bookings.length },
            { label: 'Today',     value: todayCount },
            { label: 'Pending',   value: bookings.filter(b => b.status === 'pending').length },
            { label: 'Approved',  value: bookings.filter(b => b.status === 'approved').length },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-center">
              <div className="text-2xl font-bold text-blue-900">{value}</div>
              <div className="text-slate-500 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5 items-center">
          <div className="flex gap-2">
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
          <input
            type="date"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {dateFilter && (
            <button onClick={() => setDateFilter('')} className="text-xs text-slate-400 hover:text-slate-600">
              Clear date
            </button>
          )}
        </div>

        {/* Bookings */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
            <div className="text-4xl mb-3">👨‍⚕️</div>
            <p className="text-slate-500">No appointments found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(b => (
              <div key={b.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    {/* Patient info */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center font-bold text-blue-700 text-sm">
                        {b.user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-blue-900">{b.user?.name}</div>
                        <div className="flex items-center gap-3 mt-0.5">
                          <a href={`mailto:${b.user?.email}`} className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-600 transition-colors">
                            <Mail size={11} /> {b.user?.email}
                          </a>
                          {b.user?.phone && (
                            <a href={`tel:${b.user?.phone}`} className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-600 transition-colors">
                              <Phone size={11} /> {b.user?.phone}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Appointment details */}
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
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(b.status)}`}>
                      {b.status}
                    </span>
                    {b.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStatus(b.id, 'approve')}
                          disabled={actionLoading === b.id}
                          className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                          {actionLoading === b.id ? '...' : '✓ Approve'}
                        </button>
                        <button
                          onClick={() => updateStatus(b.id, 'cancel')}
                          disabled={actionLoading === b.id}
                          className="bg-red-100 hover:bg-red-200 text-red-700 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                          ✕ Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}