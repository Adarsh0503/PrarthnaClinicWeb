import Image from 'next/image'
import Link from 'next/link'
import { Star, Users } from 'lucide-react'

const doctors = [
  {
    id: 1,
    name: 'Dr. Paritosh Mishra',
    spec: 'MBBS · Senior Physician & Founder',
    hospital: 'Sun Rise Hospital, Faridabad',
    patients: '2000+',
    rating: 4.9,
    reviews: 872,
    exp: '20+ yrs',
    image: '/images/dr-paritosh.jpg',
    bio: 'Dr. Paritosh Mishra is a senior physician with over 20 years of experience treating patients across Delhi NCR. Founder of Prarthna Clinic, he specialises in general medicine, diabetes management, and hypertension.',
  },
  {
    id: 2,
    name: 'Dr. Rajni Mishra',
    spec: 'BDS · Dental Specialist',
    hospital: 'Prarthna Clinic, Tigri Colony, Delhi',
    patients: '1500+',
    rating: 4.8,
    reviews: 272,
    exp: '15+ yrs',
    image: '/images/dr-rajni.jpg',
    bio: 'Dr. Rajni Mishra is a BDS-qualified dental specialist with expertise in cosmetic dentistry, orthodontics, root canal treatment, and paediatric dentistry.',
  },
]

export default function DoctorsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-blue-800 py-16 px-6 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-5xl font-bold mb-4">Our Doctors</h1>
          <p className="text-white/70 text-base">
            Highly qualified and compassionate physicians dedicated to your well-being.
          </p>
        </div>
      </div>

      {/* Doctors grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {doctors.map((doc) => (
          <div key={doc.id} className="bg-white rounded-3xl overflow-hidden border border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="flex gap-6 p-8">
              <div className="relative w-36 h-36 rounded-2xl overflow-hidden shrink-0">
                <Image src={doc.image} alt={doc.name} fill className="object-cover object-top" />
              </div>
              <div className="flex-1">
                <h2 className="font-serif text-2xl font-bold text-blue-900 mb-1">{doc.name}</h2>
                <p className="text-blue-600 text-sm font-medium mb-1">{doc.spec}</p>
                <p className="text-slate-400 text-sm mb-3">🏥 {doc.hospital}</p>
                <div className="flex items-center gap-1 mb-1">
                  <Star size={13} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold text-blue-900">{doc.rating}</span>
                  <span className="text-xs text-slate-400">({doc.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={13} className="text-blue-400" />
                  <span className="text-xs text-slate-400">{doc.patients} patients · {doc.exp} experience</span>
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
