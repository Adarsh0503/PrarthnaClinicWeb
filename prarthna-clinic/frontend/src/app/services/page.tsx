import Link from 'next/link'

const services = [
  { icon: '🦷', title: 'Complete Dental Care',   desc: 'Fillings, extractions, root canals, scaling, braces, dental implants, and cosmetic dentistry by Dr. Rajni Mishra. Gentle care for all ages including children.' },
  { icon: '🩺', title: 'General Medicine',        desc: 'Comprehensive diagnosis and treatment of acute and chronic conditions including fever, infections, diabetes, blood pressure, and preventive health checkups.' },
  // { icon: '🩻', title: 'Radiology & Imaging',    desc: 'Digital X-rays and on-site imaging services with fast, accurate diagnostic reports to support clinical decision-making.' },
  // { icon: '🫀', title: 'Cardiac Screening',      desc: 'ECG, blood pressure monitoring, lipid profiles, and cardiac risk assessment for preventive cardiovascular care.' },
  // { icon: '🤱', title: "Women's Health",          desc: 'Gynaecology consultations, prenatal care, family planning, and women\'s wellness in a safe, comfortable environment.' },
  { icon: '💉', title: 'Lab & Diagnostics',      desc: 'In-house blood tests, urine analysis, HbA1c, thyroid profile, and comprehensive health checkup packages.' },
  { icon: '🧒', title: 'Paediatric Care',        desc: 'Child health check-ups, vaccinations, growth monitoring, and treatment for common childhood illnesses.' },
  { icon: '💊', title: 'Chronic Disease Mgmt',   desc: 'Ongoing management of diabetes, hypertension, asthma, and other chronic conditions with personalised care plans.' },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-blue-800 py-16 px-6 text-center text-white">
        <h1 className="font-serif text-5xl font-bold mb-3">Our Services</h1>
        <p className="text-white/70 max-w-xl mx-auto">
          Prarthna Clinic offers a wide range of medical and dental services to serve the complete healthcare needs of your family.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon, title, desc }) => (
            <div key={title} className="bg-white border border-blue-100 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                {icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-blue-900 mb-3">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">{desc}</p>
              <Link href="/booking" className="text-blue-600 text-sm font-semibold hover:underline">
                Book this service →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-14 bg-blue-800 rounded-3xl p-12 text-center text-white">
          <h2 className="font-serif text-4xl font-bold mb-3">Not Sure Where to Start?</h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8">
            Book a general consultation and our doctors will guide you to the right care pathway.
          </p>
          <Link href="/booking" className="bg-white text-blue-800 px-8 py-3.5 rounded-full text-sm font-bold hover:bg-blue-50 transition-all inline-block">
            Book a Consultation
          </Link>
        </div>
      </div>
    </div>
  )
}
