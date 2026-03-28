'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Star, Users, Stethoscope, MapPin, Phone, Clock } from 'lucide-react'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

interface TimeSlot {
  id: number
  day: string
  startTime: string
  endTime: string
  isAvailable: boolean
}

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
  timeSlots: TimeSlot[]
}

export default function DoctorProfilePage() {
  const params = useParams()
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch(`${API}/api/doctors/${params.id}`)
      .then(r => {
        if (!r.ok) { setNotFound(true); return null }
        return r.json()
      })
      .then(data => { if (data) setDoctor(data.data) })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [params.id])

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (notFound || !doctor) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center text-center px-6">
      <div>
        <div className="text-5xl mb-4">👨‍⚕️</div>
        <h2 className="font-serif text-2xl font-bold text-blue-900 mb-2">Doctor not found</h2>
        <Link href="/doctors" className="btn-primary inline-block mt-4">Back to Doctors</Link>
      </div>
    </div>
  )

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const slotsByDay = days.map(day => ({
    day,
    slots: doctor.timeSlots?.filter(s => s.day === day && s.isAvailable) || []
  })).filter(d => d.slots.length > 0)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-blue-800 py-16 px-6 text-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-start">
          <div className="relative w-40 h-40 rounded-2xl overflow-hidden shrink-0 bg-blue-700">
            {doctor.photo ? (
              <Image src={doctor.photo} alt={doctor.name} fill className="object-cover object-top" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Stethoscope size={50} className="text-blue-300" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="font-serif text-4xl font-bold mb-2">{doctor.name}</h1>
            <p className="text-blue-200 text-lg mb-1">{doctor.qualification} · {doctor.specialization}</p>
            <p className="text-blue-300 text-sm flex items-center gap-1.5 mb-4">
              <MapPin size={14} /> {doctor.hospital}
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-1.5">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">{doctor.averageRating}</span>
                <span className="text-blue-300 text-sm">({doctor.totalRating} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={16} className="text-blue-300" />
                <span className="text-sm">{doctor.totalPatients}+ patients</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={16} className="text-blue-300" />
                <span className="text-sm">{doctor.experience}+ years experience</span>
              </div>
            </div>
          </div>
          <div className="shrink-0">
            <Link href={`/booking?doctorId=${doctor.id}`} className="btn-primary px-8 py-3 text-base whitespace-nowrap">
              Book Appointment
            </Link>
            <p className="text-blue-300 text-xs mt-2 text-center">Consultation fee: ₹{doctor.ticketPrice}</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-blue-900 mb-3">About</h2>
            <p className="text-slate-600 text-sm leading-relaxed">{doctor.about || doctor.bio}</p>
          </div>

          {/* Time slots */}
          {slotsByDay.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm">
              <h2 className="font-serif text-xl font-bold text-blue-900 mb-4">Available Hours</h2>
              <div className="space-y-3">
                {slotsByDay.map(({ day, slots }) => (
                  <div key={day} className="flex items-start gap-4">
                    <span className="text-sm font-medium text-blue-800 w-24 shrink-0">{day}</span>
                    <div className="flex flex-wrap gap-2">
                      {slots.map(s => (
                        <span key={s.id} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">
                          {s.startTime} – {s.endTime}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm">
            <h3 className="font-semibold text-blue-900 mb-3">Clinic Info</h3>
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-blue-500 mt-0.5 shrink-0" />
                <span>{doctor.hospital}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-blue-500 shrink-0" />
                <span>+91-129-400-0000</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-blue-500 shrink-0" />
                <span>Mon–Sat 11AM–7PM, Sun 11AM–2PM</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <div className="text-2xl font-bold text-blue-900 mb-1">₹{doctor.ticketPrice}</div>
            <div className="text-sm text-slate-500 mb-4">Consultation fee</div>
            <Link href={`/booking?doctorId=${doctor.id}`} className="btn-primary w-full text-center block">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}