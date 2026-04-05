import Link from 'next/link'

export default function BookingStrip() {
  return (
    <section className="bg-gradient-to-r from-blue-800 to-blue-700 py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
        <div>
          <h2 className="font-serif text-4xl font-bold text-white mb-2">Ready to See a Doctor?</h2>
          <p className="text-white/70 text-base">Pick your doctor and preferred time — we'll confirm within 2 hours.</p>
        </div>
        <div className="flex gap-3 flex-wrap items-center">
          <Link href="/doctors" className="bg-white/15 border border-white/30 text-white px-7 py-3 rounded-full text-sm font-medium hover:bg-white/25 transition-all">
            Browse Doctors
          </Link>
          <Link href="/booking" className="bg-white text-blue-800 px-7 py-3 rounded-full text-sm font-bold hover:bg-blue-50 transition-all hover:-translate-y-0.5 shadow-lg">
            Book Appointment
          </Link>
        </div>
      </div>
    </section>
  )
}