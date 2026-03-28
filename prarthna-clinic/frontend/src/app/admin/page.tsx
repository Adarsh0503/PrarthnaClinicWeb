'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

interface Booking {
  id: number
  appointmentDate: string
  timeSlot: string
  reason: string
  status: string
  ticketPrice: number
  doctor: { id: number; name: string; specialization: string }
  user: { id: number; name: string; email: string; phone: string }
  createdAt: string
}

interface Doctor {
  id: number
  name: string
  email: string
  specialization: string
  isApproved: string
}

interface User {
  id: number
  name: string
  email: string
  phone: string
  role: string
}

interface Stats {
  totalUsers: number
  totalDoctors: number
  totalBookings: number
}

type Tab = 'overview' | 'bookings' | 'doctors' | 'users'

function getToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
      ...options?.headers,
    },
  })
  if (!res.ok) throw new Error(`${res.status}`)
  return res.json()
}

export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab]           = useState<Tab>('overview')
  const [stats, setStats]       = useState<Stats | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [doctors, setDoctors]   = useState<Doctor[]>([])
  const [users, setUsers]       = useState<User[]>([])
  const [loading, setLoading]   = useState(true)
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [statusFilter, setStatusFilter]   = useState('all')
  const [search, setSearch]               = useState('')

  const checkAuth = useCallback(() => {
    const stored = localStorage.getItem('user')
    if (!stored) { router.push('/login'); return false }
    try {
      const u = JSON.parse(stored)
      if (u.role !== 'ADMIN' && u.role !== 'admin') {
        router.push('/'); return false
      }
    } catch { router.push('/login'); return false }
    return true
  }, [router])

  const loadData = useCallback(async () => {
    if (!checkAuth()) return
    setLoading(true)
    try {
      const [s, b, d, u] = await Promise.all([
        apiFetch('/api/admin/stats'),
        apiFetch('/api/admin/bookings'),
        apiFetch('/api/admin/doctors'),
        apiFetch('/api/admin/users'),
      ])
      setStats(s.data)
      setBookings(b.data)
      setDoctors(d.data)
      setUsers(u.data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [checkAuth])

  useEffect(() => { loadData() }, [loadData])

  const updateBooking = async (id: number, action: 'approve' | 'cancel') => {
    setActionLoading(id)
    try {
      await apiFetch(`/api/bookings/${id}/${action}`, { method: 'PATCH' })
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: action === 'approve' ? 'approved' : 'cancelled' } : b))
    } catch (e) { console.error(e) }
    finally { setActionLoading(null) }
  }

  const filteredBookings = bookings.filter(b => {
    const matchStatus = statusFilter === 'all' || b.status === statusFilter
    const matchSearch = !search ||
      b.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.doctor?.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.reason?.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const statusColor = (s: string) => ({
    pending:   'bg-amber-100 text-amber-800',
    approved:  'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }[s] || 'bg-gray-100 text-gray-800')

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-slate-500 text-sm">Loading dashboard...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-blue-900 text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-blue-300 text-xs mt-0.5">Prarthna Clinic Management</p>
        </div>
        <button onClick={() => router.push('/')} className="text-blue-300 hover:text-white text-sm transition-colors">
          ← Back to site
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 px-6">
        <div className="flex gap-1">
          {(['overview', 'bookings', 'doctors', 'users'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-3 text-sm font-medium capitalize border-b-2 transition-colors ${
                tab === t
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {t}
              {t === 'bookings' && (
                <span className="ml-1.5 bg-blue-100 text-blue-700 text-xs px-1.5 py-0.5 rounded-full">
                  {bookings.filter(b => b.status === 'pending').length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* OVERVIEW TAB */}
        {tab === 'overview' && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: 'Total Patients', value: stats?.totalUsers ?? 0,    color: 'blue',  icon: '👥' },
                { label: 'Doctors',        value: stats?.totalDoctors ?? 0,  color: 'teal',  icon: '🩺' },
                { label: 'Bookings',       value: stats?.totalBookings ?? 0, color: 'amber', icon: '📅' },
              ].map(({ label, value, icon }) => (
                <div key={label} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="text-3xl mb-2">{icon}</div>
                  <div className="text-3xl font-bold text-blue-900">{value}</div>
                  <div className="text-slate-500 text-sm mt-1">{label}</div>
                </div>
              ))}
            </div>

            {/* Recent bookings */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-semibold text-blue-900">Recent Bookings</h2>
                <button onClick={() => setTab('bookings')} className="text-blue-600 text-sm hover:underline">View all →</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                    <tr>
                      <th className="text-left px-6 py-3">Patient</th>
                      <th className="text-left px-6 py-3">Doctor</th>
                      <th className="text-left px-6 py-3">Date & Time</th>
                      <th className="text-left px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {bookings.slice(0, 5).map(b => (
                      <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3 font-medium text-slate-800">{b.user?.name}</td>
                        <td className="px-6 py-3 text-slate-600">{b.doctor?.name}</td>
                        <td className="px-6 py-3 text-slate-600">{b.appointmentDate} · {b.timeSlot}</td>
                        <td className="px-6 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(b.status)}`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* BOOKINGS TAB */}
        {tab === 'bookings' && (
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <input
                type="text"
                placeholder="Search patient, doctor, reason..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <div className="flex gap-2">
                {['all', 'pending', 'approved', 'cancelled'].map(s => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                      statusFilter === s
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300'
                    }`}
                  >
                    {s} {s !== 'all' && `(${bookings.filter(b => b.status === s).length})`}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings list */}
            <div className="space-y-3">
              {filteredBookings.length === 0 && (
                <div className="bg-white rounded-2xl p-12 text-center text-slate-400 border border-slate-100">
                  No bookings found
                </div>
              )}
              {filteredBookings.map(b => (
                <div key={b.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-blue-900">{b.user?.name}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(b.status)}`}>
                          {b.status}
                        </span>
                      </div>
                      <div className="text-sm text-slate-500">{b.user?.email} · {b.user?.phone}</div>
                      <div className="text-sm text-slate-700 mt-2">
                        <span className="font-medium">Doctor:</span> {b.doctor?.name} ({b.doctor?.specialization})
                      </div>
                      <div className="text-sm text-slate-700">
                        <span className="font-medium">Date:</span> {b.appointmentDate} at {b.timeSlot}
                      </div>
                      <div className="text-sm text-slate-700">
                        <span className="font-medium">Reason:</span> {b.reason}
                      </div>
                    </div>
                    {b.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateBooking(b.id, 'approve')}
                          disabled={actionLoading === b.id}
                          className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-xl font-medium transition-colors disabled:opacity-50"
                        >
                          {actionLoading === b.id ? '...' : '✓ Approve'}
                        </button>
                        <button
                          onClick={() => updateBooking(b.id, 'cancel')}
                          disabled={actionLoading === b.id}
                          className="bg-red-100 hover:bg-red-200 text-red-700 text-sm px-4 py-2 rounded-xl font-medium transition-colors disabled:opacity-50"
                        >
                          ✕ Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DOCTORS TAB */}
        {tab === 'doctors' && (
          <div className="space-y-3">
            {doctors.map(d => (
              <div key={d.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center font-bold text-blue-700 text-sm">
                        {d.name?.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-blue-900">{d.name}</div>
                        <div className="text-xs text-slate-400">{d.email}</div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-600 ml-1">
                      <span className="font-medium">Specialization:</span> {d.specialization || '—'}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(d.isApproved)}`}>
                      {d.isApproved}
                    </span>
                    {d.isApproved === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={async () => {
                            await apiFetch(`/api/admin/doctors/${d.id}/approve`, { method: 'PATCH' })
                            setDoctors(prev => prev.map(doc => doc.id === d.id ? { ...doc, isApproved: 'approved' } : doc))
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
                        >
                          ✓ Approve
                        </button>
                        <button
                          onClick={async () => {
                            await apiFetch(`/api/admin/doctors/${d.id}/reject`, { method: 'PATCH' })
                            setDoctors(prev => prev.map(doc => doc.id === d.id ? { ...doc, isApproved: 'cancelled' } : doc))
                          }}
                          className="bg-red-100 hover:bg-red-200 text-red-700 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
                        >
                          ✕ Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* USERS TAB */}
        {tab === 'users' && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                  <tr>
                    <th className="text-left px-6 py-3">Name</th>
                    <th className="text-left px-6 py-3">Email</th>
                    <th className="text-left px-6 py-3">Phone</th>
                    <th className="text-left px-6 py-3">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-800">{u.name}</td>
                      <td className="px-6 py-4 text-slate-600">{u.email}</td>
                      <td className="px-6 py-4 text-slate-600">{u.phone || '—'}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          u.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                          u.role === 'DOCTOR' ? 'bg-blue-100 text-blue-800' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}