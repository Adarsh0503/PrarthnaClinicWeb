'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, Users, Calendar, Stethoscope } from 'lucide-react'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

interface Doctor {
  id: number
  name: string
  specialization: string
  qualification: string
  hospital: string
  bio: string
  experience: number
  averageRating: number
  totalPatients: number
  photo: string | null
  isApproved: string
}

export default function DoctorsSection() {
  const [doctors, setDoctors] = useState<Doctor[]>([])

  useEffect(() => {
    fetch(`${API}/api/doctors`)
      .then(r => r.json())
      .then(data => {
        const approved = (data.data || []).filter((d: Doctor) => d.isApproved === 'approved')
        setDoctors(approved.slice(0, 2)) // show max 2 on home page
      })
      .catch(console.error)
  }, [])

  return (
    <section className="py-24 px-6 bg-white" id="doctors">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-14 flex-wrap gap-4">
          <div>
            <div className="section-eyebrow">Our Team</div>
            <h2 className="section-title">Meet Your Doctors</h2>
          </div>
          <Link href="/booking" className="btn-primary">Book a Consultation</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {doctors.map((doc) => (
            <div key={doc.id} className="card overflow-hidden group">
              <div className="relative h-72 bg-blue-50 overflow-hidden">
                {doc.photo ? (
                  <Image
                    src={doc.photo}
                    alt={doc.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Stethoscope size={48} className="text-blue-200" />
                  </div>
                )}
                <span className="absolute top-3 right-3 bg-white/95 text-green-700 text-xs font-semibold px-3 py-1 rounded-full border border-green-200">
                  ● Available Today
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-blue-900 mb-1">{doc.name}</h3>
                <p className="text-blue-600 text-sm font-medium mb-1">
                  {doc.qualification} · {doc.specialization}
                </p>
                <p className="text-slate-400 text-sm mb-4">🏥 {doc.hospital}</p>

                <div className="flex justify-between border-t border-blue-50 pt-4 mb-5">
                  {[
                    { icon: Users,    val: `${doc.totalPatients}+`, lbl: 'Patients' },
                    { icon: Star,     val: `${doc.averageRating} ★`, lbl: 'Rating' },
                    { icon: Calendar, val: `${doc.experience}+ yrs`, lbl: 'Exp.' },
                  ].map(({ icon: Icon, val, lbl }) => (
                    <div key={lbl} className="text-center">
                      <div className="text-base font-bold text-blue-900">{val}</div>
                      <div className="text-[11px] text-slate-400 uppercase tracking-wide">{lbl}</div>
                    </div>
                  ))}
                </div>

                <Link href={`/booking?doctorId=${doc.id}`} className="btn-primary w-full text-center block">
                  Book Appointment
                </Link>
              </div>
            </div>
          ))}

          {/* Specialist card */}
          <div className="bg-blue-800 rounded-2xl overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="h-72 bg-blue-700/50 flex flex-col items-center justify-center text-white">
              <div className="text-5xl mb-3">🔬</div>
              <div className="font-serif text-lg font-semibold">Specialist Network</div>
              <div className="text-sm text-white/60 mt-1">Cardiology · Radiology · Gynecology</div>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-xl font-bold text-white mb-1">Need a Specialist?</h3>
              <p className="text-blue-200 text-sm mb-4">Referred to top Delhi NCR hospitals</p>
              <div className="flex justify-between border-t border-white/10 pt-4 mb-5">
                {['Fast', 'Trusted', '2 Locs'].map((v) => (
                  <div key={v} className="text-center">
                    <div className="text-base font-bold text-white">{v}</div>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="block w-full text-center bg-white text-blue-800 py-3 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors">
                Request Referral
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link href="/doctors" className="btn-outline">View All Doctors</Link>
        </div>
      </div>
    </section>
  )
}