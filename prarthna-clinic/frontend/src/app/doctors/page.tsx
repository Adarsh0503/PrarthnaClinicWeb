'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Users, Stethoscope } from 'lucide-react'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

interface Doctor {
  id: number
  name: string
  specialization: string
  qualification: string
  hospital: string
  bio: string
  about: string
  experience: number
  ticketPrice: number
  averageRating: number
  totalRating: number
  totalPatients: number
  photo: string | null
  isApproved: string
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API}/api/doctors`)
      .then(r => r.json())
      .then(data => setDoctors(data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-blue-800 py-16 px-6 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-5xl font-bold mb-4">Our Doctors</h1>
          <p className="text-white/70 text-base">
            Highly qualified and compassionate physicians dedicated to your well-being.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {loading ? (
          [1, 2].map(i => (
            <div key={i} className="bg-white rounded-3xl p-8 border border-blue-100 animate-pulse">
              <div className="flex gap-6">
                <div className="w-36 h-36 bg-slate-200 rounded-2xl" />
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                  <div className="h-4 bg-slate-200 rounded w-2/3" />
                </div>
              </div>
            </div>
          ))
        ) : doctors.filter(d => d.isApproved === 'approved').map((doc) => (
          <div key={doc.id} className="bg-white rounded-3xl overflow-hidden border border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="flex gap-6 p-8">
              <div className="relative w-36 h-36 rounded-2xl overflow-hidden shrink-0 bg-blue-50">
                {doc.photo ? (
                  <Image src={doc.photo} alt={doc.name} fill className="object-cover object-top" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Stethoscope size={40} className="text-blue-300" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h2 className="font-serif text-2xl font-bold text-blue-900 mb-1">{doc.name}</h2>
                <p className="text-blue-600 text-sm font-medium mb-1">
                  {doc.qualification} · {doc.specialization}
                </p>
                <p className="text-slate-400 text-sm mb-3">🏥 {doc.hospital}</p>
                <div className="flex items-center gap-1 mb-1">
                  <Star size={13} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold text-blue-900">{doc.averageRating}</span>
                  <span className="text-xs text-slate-400">({doc.totalRating} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={13} className="text-blue-400" />
                  <span className="text-xs text-slate-400">
                    {doc.totalPatients}+ patients · {doc.experience}+ yrs experience
                  </span>
                </div>
              </div>
            </div>
            <div className="px-8 pb-4 text-sm text-slate-500 leading-relaxed border-t border-blue-50 pt-4">
              {doc.bio}
            </div>
            <div className="px-8 pb-8 pt-4 flex gap-3">
              <Link href={`/booking?doctorId=${doc.id}`} className="btn-primary flex-1 text-center">
                Book Appointment
              </Link>
              <Link href={`/doctors/${doc.id}`} className="btn-outline flex-1 text-center">
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}