import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-blue-800 py-16 px-6 text-center text-white">
        <h1 className="font-serif text-5xl font-bold mb-3">Contact Us</h1>
        <p className="text-white/70">We're here to help. Reach out any time.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Contact info */}
        <div>
          <h2 className="font-serif text-3xl font-bold text-blue-900 mb-8">Get in Touch</h2>
          <div className="flex flex-col gap-5 mb-10">
            {[
              { icon: Phone, label: 'Phone',      val: '+91-9599752226',       sub: 'Mon–Sat 11AM–7PM' },
              { icon: Mail,  label: 'Email',      val: 'parit1605@gmail.com',  sub: 'We reply within 2 hours' },
              { icon: Clock, label: 'Timings',    val: 'Mon–Sat: 11AM – 7PM',   sub: 'Sunday: 11AM – 2PM' },
            ].map(({ icon: Icon, label, val, sub }) => (
              <div key={label} className="flex items-start gap-4 bg-white border border-blue-100 rounded-2xl p-5">
                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-blue-700" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">{label}</div>
                  <div className="text-sm font-semibold text-blue-900">{val}</div>
                  <div className="text-xs text-slate-400">{sub}</div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-serif text-2xl font-bold text-blue-900 mb-5">Our Locations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                name: 'Tigri Colony, Delhi',
                addr: 'G-1916, Mehrauli Badarpur Road, Tigri Colony, Sangam Vihar, New Delhi – 110080',
                href: 'https://www.google.com/maps/place/PRARTHNA+MULTISPECIALITY+CLINIC+-+A+Complete+Dental+And+Health+Care/@28.512448,77.2366677,17z/data=!3m1!4b1!4m6!3m5!1s0x390ce19f191f9de1:0x50c5424cbe369a03!8m2!3d28.5124433!4d77.2392426!16s%2Fg%2F1pp2v0h2p?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D',
              },
              {
                name: 'Faridabad, Haryana',
                addr: 'Dr Paritosh Clinic, Sector 42, Faridabad, Haryana – 121010',
                href: 'https://www.google.com/maps/place/Dr+Paritosh+Clinic/@28.4626721,77.2964705,17z/data=!3m1!4b1!4m6!3m5!1s0x390ce7ea1b0f42b1:0x4856b2f162be034a!8m2!3d28.4626674!4d77.2990454!16s%2Fg%2F11hdsxyx49?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D',
              },
            ].map(({ name, addr, href }) => (
              <div key={name} className="bg-white border border-blue-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} className="text-blue-600" />
                  <span className="text-sm font-semibold text-blue-900">{name}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">{addr}</p>
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:underline">
                  Open in Google Maps →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Quick contact form */}
        <div className="bg-white border border-blue-100 rounded-3xl p-8 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-blue-900 mb-6">Send Us a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="label">Your Name</label>
              <input type="text" placeholder="Rahul Sharma" className="input-field" />
            </div>
            <div>
              <label className="label">Phone Number</label>
              <input type="tel" placeholder="+91 98765 00000" className="input-field" />
            </div>
            <div>
              <label className="label">Email (optional)</label>
              <input type="email" placeholder="you@example.com" className="input-field" />
            </div>
            <div>
              <label className="label">Message</label>
              <textarea rows={4} placeholder="How can we help you?" className="input-field resize-none" />
            </div>
            <button type="submit" className="btn-primary w-full py-3.5">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  )
}
