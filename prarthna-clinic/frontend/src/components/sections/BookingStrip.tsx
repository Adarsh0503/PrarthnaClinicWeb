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
          <select className="bg-white/15 border border-white/30 text-white px-5 py-3 rounded-full text-sm min-w-[180px] cursor-pointer">
            <option className="text-blue-900 bg-white">Select Specialty</option>
            <option className="text-blue-900 bg-white">General Medicine</option>
            <option className="text-blue-900 bg-white">Dental Care</option>
            {/* <option className="text-blue-900 bg-white">Radiology</option> */}
          </select>
          <select className="bg-white/15 border border-white/30 text-white px-5 py-3 rounded-full text-sm min-w-[180px] cursor-pointer">
            <option className="text-blue-900 bg-white">Select Doctor</option>
            <option className="text-blue-900 bg-white">Dr. Paritosh Mishra</option>
            <option className="text-blue-900 bg-white">Dr. Rajni Mishra</option>
          </select>
          <Link href="/booking" className="bg-white text-blue-800 px-7 py-3 rounded-full text-sm font-bold hover:bg-blue-50 transition-all hover:-translate-y-0.5 shadow-lg">
            Check Availability
          </Link>
        </div>
      </div>
    </section>
  )
}
