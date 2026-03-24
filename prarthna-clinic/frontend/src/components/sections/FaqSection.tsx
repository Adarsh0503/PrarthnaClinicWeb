'use client'

import { useState } from 'react'
import { ChevronDown, Phone, Mail, MessageCircle } from 'lucide-react'

const faqs = [
  { q: 'How do I book an appointment?', a: 'You can book online via this website, call our reception, or walk in. Same-day appointments are available for urgent cases at both locations.' },
  { q: 'What are the clinic timings?', a: 'Monday to Saturday: 11:00 AM – 7:00 PM. Sunday: 11:00 AM – 2:00 PM. Emergency consultations can be arranged outside these hours.' },
  { q: 'Do you accept insurance?', a: 'Yes, we are empanelled with several major health insurance providers. Please bring your insurance card and our billing team will assist with cashless processing.' },
  { q: 'Which location is best for dental care?', a: 'Dr. Rajni Mishra practices at our Tigri Colony, Sangam Vihar branch. For general medicine, both locations are equally equipped.' },
  { q: 'Can I get my reports online?', a: 'Lab and diagnostic reports are available digitally within 24–48 hours. You\'ll receive an SMS notification once your reports are ready.' },
  { q: 'Is parking available?', a: 'Yes, street parking is available at both locations. Our Tigri Colony branch has easy two-wheeler and auto access from Mehrauli-Badarpur Road.' },
]

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-24 px-6 bg-slate-50" id="faq">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Left — accordion */}
        <div>
          <div className="section-eyebrow">Common Questions</div>
          <h2 className="section-title mb-8">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-3">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="bg-white border border-blue-100 rounded-2xl overflow-hidden">
                <button
                  className="w-full flex justify-between items-center px-6 py-5 text-left text-sm font-semibold text-blue-900 hover:bg-blue-50 transition-colors"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  {q}
                  <ChevronDown
                    size={18}
                    className={`text-blue-600 transition-transform shrink-0 ml-3 ${open === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {open === i && (
                  <div className="px-6 pb-5 text-sm text-slate-500 leading-relaxed border-t border-blue-50">
                    <div className="pt-4">{a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right — contact card */}
        <div className="lg:pt-20">
          <div className="bg-blue-800 rounded-3xl p-10 text-white sticky top-24">
            <h3 className="font-serif text-3xl font-bold mb-3 leading-tight">
              Talk to Us —<br />We&apos;re Here for You
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-8">
              Have a question about your health? Our team is always happy to help before you even book.
            </p>

            {[
              { icon: Phone,          label: '+91-129-400-0000',    sub: 'Reception · Both Locations' },
              { icon: MessageCircle,  label: 'WhatsApp Available',  sub: 'Quick response guaranteed' },
              { icon: Mail,           label: 'care@prartnaclinic.in', sub: 'Reply within 2 hours' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={16} />
                </div>
                <div>
                  <div className="text-sm font-semibold">{label}</div>
                  <div className="text-xs text-white/55">{sub}</div>
                </div>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-3 my-6">
              {[
                { day: 'Mon – Sat', time: '11:00 AM – 7:00 PM' },
                { day: 'Sunday',    time: '11:00 AM – 2:00 PM' },
              ].map(({ day, time }) => (
                <div key={day} className="bg-white/10 rounded-xl p-4">
                  <div className="text-sm font-semibold">{day}</div>
                  <div className="text-xs text-white/55 mt-1">{time}</div>
                </div>
              ))}
            </div>

            <a href="/booking" className="block w-full text-center bg-white text-blue-800 py-3.5 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors">
              Book Appointment Now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
