import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const quickLinks = [
  { href: '/',         label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/doctors',  label: 'Doctors' },
  { href: '/about',    label: 'About Us' },
]

const patientLinks = [
  { href: '/booking',  label: 'Book Appointment' },
  { href: '/doctors',  label: 'Find a Doctor' },
  { href: '/contact',  label: 'Contact Us' },
  { href: '/login',    label: 'Patient Login' },
]

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center overflow-hidden">
                <Image src="/images/logo.png" alt="Logo" width={36} height={36} className="object-contain" />
              </div>
              <span className="font-serif text-xl font-bold">Prarthna Clinic</span>
            </div>
            <p className="text-sm text-white/55 leading-relaxed mb-5">
              Expert multispeciality healthcare — complete dental and medical care for families across Delhi and Faridabad since 2011.
            </p>
            <div className="flex gap-2">
              {['f', 'in', 'ig', 'yt'].map((s) => (
                <div key={s} className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-xs font-bold cursor-pointer hover:bg-blue-600 transition-colors">
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/65 hover:text-blue-300 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Patient */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Patients</h4>
            <ul className="flex flex-col gap-3">
              {patientLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/65 hover:text-blue-300 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-white/65">
              <div className="flex gap-2 items-start">
                <MapPin size={14} className="mt-0.5 text-blue-300 shrink-0" />
                <span>G-1916, Tigri Colony, Sangam Vihar, New Delhi – 110080</span>
              </div>
              <div className="flex gap-2 items-start">
                <MapPin size={14} className="mt-0.5 text-blue-300 shrink-0" />
                <span>Dr Paritosh Clinic Greenfields Colony, Sector 42, Faridabad – 121010</span>
              </div>
              <div className="flex gap-2 items-center">
                <Phone size={14} className="text-blue-300 shrink-0" />
                <span>+91-9599752226</span>
              </div>
              <div className="flex gap-2 items-center">
                <Mail size={14} className="text-blue-300 shrink-0" />
                <span>parit1605@gmail.com</span>
              </div>
              <div className="flex gap-2 items-center">
                <Clock size={14} className="text-blue-300 shrink-0" />
                <span>Mon–Sat 11AM–7PM · Sun 11AM–2PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between gap-2 text-xs text-white/30">
          <span>© {new Date().getFullYear()} Prarthna Multispeciality Clinic. All rights reserved.</span>
          <span>G-1916 Tigri Colony, New Delhi · Faridabad, Haryana</span>
        </div> */}

        
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between gap-2 text-xs text-white/30">
  <span>© {new Date().getFullYear()} Prarthna Multispeciality Clinic. All rights reserved.</span>
  <span>
    Designed & Developed by{' '}
    
      <a href="https://github.com/Adarsh0503"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white/50 hover:text-blue-300 transition-colors font-medium"
    >
      Adarsh Gaurav
    </a>
  </span>
</div>

      </div>
    </footer>
  )
}
