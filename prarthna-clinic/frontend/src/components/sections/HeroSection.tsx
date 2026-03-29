import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 overflow-hidden min-h-[88vh] flex items-center">
      {/* Background blobs */}
      <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-80 h-80 rounded-full bg-blue-500/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* Left */}
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-blue-300 rounded-full inline-block" />
            Trusted Healthcare Since 2011 · Tigri Delhi & Faridabad
          </div>

          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            Your Family&apos;s<br />
            <em className="not-italic text-blue-200">Health</em>, Our<br />
            Sacred Duty.
          </h1>

          <p className="text-white/75 text-base leading-relaxed max-w-md mb-8">
            Prarthna Multispeciality Clinic brings expert dental and medical care under one roof.
            Compassionate doctors, modern equipment, and genuine care — always.
          </p>

          <div className="flex gap-4 flex-wrap mb-14">
            <Link href="/booking" className="bg-white text-blue-800 px-8 py-3.5 rounded-full text-sm font-bold hover:bg-blue-50 hover:-translate-y-0.5 transition-all shadow-lg">
              Book Appointment
            </Link>
            <Link href="/doctors" className="border border-white/40 text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-white/10 transition-all">
              Meet Our Doctors
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-10">
            {[
              { num: '15+',   label: 'Years of Care' },
              { num: '5000+', label: 'Patients Treated' },
              { num: '100%',  label: 'Satisfaction' },
            ].map(({ num, label }) => (
              <div key={num}>
                <div className="font-serif text-4xl font-bold text-white">{num}</div>
                <div className="text-xs text-white/55 uppercase tracking-widest mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Doctor photo + floating cards */}
        <div className="hidden lg:flex justify-center items-end relative">
          <div className="w-[400px] h-[500px] rounded-[2rem] rounded-br-[5rem] overflow-hidden border-2 border-white/15">
            <Image
              src="/images/doctors-together.jpg"
              alt="Dr. Paritosh and Dr. Rajni Mishra"
              width={400}
              height={500}
              className="w-full h-full object-cover object-top"
              priority
            />
          </div>

          {/* Float card 1 */}
          <div className="absolute -bottom-4 -left-8 bg-white rounded-2xl px-5 py-4 shadow-2xl min-w-[200px]">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Next Available</p>
            <p className="text-sm font-semibold text-blue-800">Today · 11:00 AM</p>
          </div>

          {/* Float card 2 */}
          <div className="absolute top-8 -right-6 bg-blue-800 rounded-2xl px-5 py-4 shadow-2xl text-white">
            <div className="font-serif text-3xl font-bold text-blue-200">4.9 ★</div>
            <div className="text-xs text-white/60 mt-1">Avg. Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}
