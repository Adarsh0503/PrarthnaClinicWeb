import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'

const checks = [
  'Complete dental and medical care under one roof',
  'Modern equipment with affordable, transparent pricing',
  'Convenient timings including Sunday mornings',
  'Warm, family-friendly environment for all ages',
  'Empanelled with major insurance providers',
]

export default function AboutSection() {
  return (
    <section className="py-24 px-6 bg-white" id="about">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* Left — photo stack */}
        <div className="relative">
          <div className="rounded-[2rem] overflow-hidden h-[520px]">
            <Image
              src="/images/doctors-together.jpg"
              alt="Dr. Paritosh and Dr. Rajni Mishra"
              width={600}
              height={520}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Badge bottom-right */}
          <div className="absolute -bottom-5 -right-5 bg-blue-800 text-white rounded-2xl px-6 py-5 text-center shadow-2xl">
            <div className="font-serif text-4xl font-bold text-blue-200">30+</div>
            <div className="text-xs text-white/60 mt-1">Years of Trusted<br />Care</div>
          </div>

          {/* Badge top-left */}
          <div className="absolute -top-4 -left-4 bg-white border border-blue-100 rounded-2xl px-5 py-4 shadow-xl flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-lg">🏆</div>
            <div>
              <div className="text-sm font-bold text-blue-900">Est. 1994</div>
              <div className="text-xs text-slate-400">Serving Delhi NCR</div>
            </div>
          </div>
        </div>

        {/* Right — content */}
        <div>
          <div className="section-eyebrow">About the Clinic</div>
          <h2 className="section-title">We Treat You Like Family</h2>
          <p className="section-sub mb-8">
            Prarthna Multispeciality Clinic was founded on a simple belief: every person deserves expert,
            affordable healthcare delivered with genuine warmth. Our doctors are not just specialists —
            they are your neighbours.
          </p>

          <ul className="flex flex-col gap-3 mb-10">
            {checks.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>

          {/* Address cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8" id="contact">
            {[
              {
                label: 'Tigri Colony, Delhi',
                addr: 'G-1916, Mehrauli Badarpur Road, Tigri Colony, Sangam Vihar, New Delhi – 110080',
                href: 'https://www.google.com/maps/place/PRARTHNA+MULTISPECIALITY+CLINIC',
              },
              {
                label: 'Faridabad, Haryana',
                addr: 'Sun Rise Hospital, Sector 15, Faridabad, Haryana – 121007',
                href: 'https://maps.app.goo.gl/YvacsNo75eUMf6647',
              },
            ].map(({ label, addr, href }) => (
              <div key={label} className="bg-slate-50 border border-blue-100 rounded-2xl p-5">
                <div className="text-lg mb-2">📍</div>
                <div className="text-sm font-semibold text-blue-900 mb-1">{label}</div>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">{addr}</p>
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:underline">
                  Get Directions →
                </a>
              </div>
            ))}
          </div>

          <Link href="/about" className="btn-primary inline-block">Learn More About Us</Link>
        </div>
      </div>
    </section>
  )
}
