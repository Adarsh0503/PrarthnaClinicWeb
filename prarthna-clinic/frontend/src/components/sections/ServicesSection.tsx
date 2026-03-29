import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const services = [
  { icon: '🦷', title: 'Complete Dental Care',    desc: 'Fillings, root canals, scaling, braces, implants, and cosmetic dentistry by Dr. Rajni Mishra.' },
  { icon: '🩺', title: 'General Medicine',         desc: 'Comprehensive diagnosis and treatment of acute/chronic conditions, fever, infections, BP & diabetes.' },
  // { icon: '🩻', title: 'Radiology & Imaging',     desc: 'Digital X-rays and on-site imaging services with fast, accurate diagnostic reports.' },
  // { icon: '🫀', title: 'Cardiac Screening',       desc: 'ECG, BP monitoring, lipid profiles, and cardiac risk assessment for preventive care.' },
  { icon: '🤱', title: "Women's Health",           desc: 'Gynaecology consultations, prenatal care, and women\'s wellness in a comfortable environment.' },
  { icon: '💉', title: 'Lab & Diagnostics',       desc: 'In-house blood tests, HbA1c, thyroid, and health checkup packages at affordable rates.' },
]

export default function ServicesSection() {
  return (
    <section className="bg-slate-50 py-24 px-6" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <div className="section-eyebrow">What We Offer</div>
          <h2 className="section-title">Comprehensive Medical Services</h2>
          <p className="section-sub">From general medicine to specialised dental procedures — all under one trusted roof.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-stagger">
          {services.map(({ icon, title, desc }) => (
            <div key={title} className="card p-8 group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-700 to-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl mb-5">
                {icon}
              </div>
              <h3 className="font-semibold text-blue-900 text-lg mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">{desc}</p>
              <Link href="/services" className="text-blue-600 text-sm font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                Learn more <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
