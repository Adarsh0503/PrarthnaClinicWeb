// TrustBar.tsx
import { ShieldCheck, Calendar, Microscope, MapPin, Clock } from 'lucide-react'

const items = [
  { icon: ShieldCheck, label: 'Expert Physicians',     sub: 'Board-certified' },
  { icon: Calendar,    label: 'Easy Appointments',     sub: 'Online & walk-in' },
  { icon: Microscope,  label: 'Complete Dental Care',  sub: 'All procedures' },
  { icon: MapPin,      label: '2 Locations',           sub: 'Delhi & Faridabad' },
  { icon: Clock,       label: 'Mon–Sat 11AM–7PM',      sub: 'Sun: 11AM–2PM' },
]

export default function TrustBar() {
  return (
    <div className="bg-white border-b border-blue-100">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center">
        {items.map(({ icon: Icon, label, sub }, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-8 py-5 flex-1 min-w-[180px] border-r border-blue-50 last:border-r-0"
          >
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
              <Icon size={18} className="text-blue-700" />
            </div>
            <div>
              <div className="text-sm font-semibold text-blue-900">{label}</div>
              <div className="text-xs text-slate-400">{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
