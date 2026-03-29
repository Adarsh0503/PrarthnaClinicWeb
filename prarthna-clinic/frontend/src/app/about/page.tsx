import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Award, Heart, Users, Clock } from 'lucide-react'

const values = [
  { icon: Heart,   title: 'Compassionate Care',   desc: 'We treat every patient like family — with warmth, patience, and genuine concern.' },
  { icon: Award,   title: 'Clinical Excellence',  desc: 'Our doctors are highly qualified and stay updated with the latest medical practices.' },
  { icon: Users,   title: 'Community First',      desc: 'Rooted in Tigri Colony since 2011, we serve the healthcare needs of our neighbourhood.' },
  { icon: Clock,   title: 'Accessible Timings',   desc: 'Open 6 days a week with Sunday morning hours — healthcare when you need it.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-blue-800 py-20 px-6 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl font-bold mb-4">About Prarthna Clinic</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            15 years of serving Delhi NCR families with expert, affordable, and compassionate multispeciality healthcare.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-eyebrow">Our Story</div>
            <h2 className="section-title">15 Years of Trusted Healthcare in the Heart of Delhi</h2>
            <p className="text-slate-500 leading-relaxed mb-5">
              Prarthna Multispeciality Clinic was founded in 2011 by Dr. Paritosh Mishra and Dr Rajni with a singular vision:
              to make expert, specialist-grade healthcare accessible to every family in the community — regardless of
              income or background.
            </p>
           <p className="text-slate-500 leading-relaxed mb-5">
               What started as a small general practice in Tigri Colony, Sangam Vihar has grown into a full
                multispeciality clinic offering complete dental care, general medicine, diabetes management,
              and more — all under one roof.
          </p>
            <p className="text-slate-500 leading-relaxed mb-8">
              Today, Prarthna Clinic operates from two locations — Tigri Colony in South Delhi and GreenFields Colony Faridabad in Haryana —
              and has served over 5,000 patients across the Delhi NCR region.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[
                { num: '30+',   lbl: 'Years' },
                { num: '5000+', lbl: 'Patients' },
                { num: '2',     lbl: 'Locations' },
              ].map(({ num, lbl }) => (
                <div key={lbl} className="text-center bg-blue-50 rounded-2xl py-5">
                  <div className="font-serif text-4xl font-bold text-blue-800">{num}</div>
                  <div className="text-xs text-slate-400 mt-1 uppercase tracking-wide">{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden h-[480px]">
              <Image
                src="/images/doctors-together.jpg"
                alt="Dr. Paritosh and Dr. Rajni Mishra"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-blue-800 text-white rounded-2xl p-5 shadow-2xl">
              <div className="font-serif text-3xl font-bold text-blue-200">Est. 2011</div>
              <div className="text-xs text-white/60 mt-1">Tigri Colony, New Delhi</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-eyebrow justify-center">What We Stand For</div>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-blue-100 rounded-2xl p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Icon size={24} className="text-blue-700" />
                </div>
                <h3 className="font-semibold text-blue-900 text-lg mb-3">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors intro */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-eyebrow justify-center">Our Doctors</div>
            <h2 className="section-title">The Faces Behind the Care</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              { name: 'Dr. Paritosh Mishra', spec: 'MBBS · Senior Physician & Founder', img: '/images/dr-paritosh.jpg', bio: 'With over 20 years of experience, Dr. Paritosh founded Prarthna Clinic to make quality healthcare accessible to every family.' },
              { name: 'Dr. Rajni Mishra',    spec: 'BDS · Dental Specialist & Founder', img: '/images/dr-rajni.jpg',   bio: 'Dr. Rajni brings 15+ years of dental expertise and is known for her gentle, patient-first approach to dental care.' },
            ].map(({ name, spec, img, bio }) => (
              <div key={name} className="bg-white border border-blue-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all">
                <div className="h-64 overflow-hidden relative">
                  <Image src={img} alt={name} fill className="object-cover object-top" />
                </div>
                <div className="p-7">
                  <h3 className="font-serif text-2xl font-bold text-blue-900 mb-1">{name}</h3>
                  <p className="text-blue-600 text-sm font-medium mb-4">{spec}</p>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{bio}</p>
                  <Link href="/booking" className="btn-primary inline-block text-sm">Book Appointment</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-blue-800">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="font-serif text-4xl font-bold mb-4">Ready to Experience the Prarthna Difference?</h2>
          <p className="text-white/70 mb-8">Book an appointment today and see why thousands of families trust us with their healthcare.</p>
          <Link href="/booking" className="bg-white text-blue-800 px-10 py-4 rounded-full text-sm font-bold hover:bg-blue-50 transition-all inline-block">
            Book an Appointment
          </Link>
        </div>
      </section>
    </div>
  )
}
