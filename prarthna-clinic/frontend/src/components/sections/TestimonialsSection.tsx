const testimonials = [
  {
    rating: 5,
    text: "Dr. Paritosh diagnosed what three other doctors had missed. Thorough, patient, and genuinely caring. This clinic is a blessing for our area.",
    name: 'Ramesh Kumar',
    tag: 'Patient since 2018 · Sangam Vihar',
    initials: 'RK',
  },
  {
    rating: 5,
    text: "Best dental experience ever. Dr. Rajni is gentle, explains everything clearly, and my kids actually look forward to their dental visits now!",
    name: 'Sunita Patel',
    tag: 'Patient since 2015 · Faridabad',
    initials: 'SP',
  },
  {
    rating: 5,
    text: "Got my X-ray and report the same day. Affordable fees, no unnecessary tests, and the whole team is so warm. Highly recommended!",
    name: 'Amit Verma',
    tag: 'Patient since 2021 · Tigri Colony',
    initials: 'AV',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="section-eyebrow justify-center">Patient Stories</div>
          <h2 className="section-title max-w-md mx-auto">What Our Patients Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ rating, text, name, tag, initials }) => (
            <div key={name} className="card p-8">
              <div className="text-yellow-400 text-sm mb-3">{'★'.repeat(rating)}</div>
              <div className="font-serif text-5xl text-blue-100 leading-none mb-2">&ldquo;</div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{text}</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-800 flex items-center justify-center text-sm font-bold text-white font-serif">
                  {initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-blue-900">{name}</div>
                  <div className="text-xs text-slate-400">{tag}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
