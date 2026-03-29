// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
// import { usePathname } from 'next/navigation'
// import { Menu, X, Phone, LogOut, User, LayoutDashboard } from 'lucide-react'

// const navLinks = [
//   { href: '/',         label: 'Home' },
//   { href: '/doctors',  label: 'Doctors' },
//   { href: '/services', label: 'Services' },
//   { href: '/about',    label: 'About' },
//   { href: '/contact',  label: 'Contact' },
// ]

// interface AuthUser {
//   name: string
//   email: string
//   role: string
// }

// export default function Navbar() {
//   const [scrolled,   setScrolled]   = useState(false)
//   const [mobileOpen, setMobileOpen] = useState(false)
//   const [authUser,   setAuthUser]   = useState<AuthUser | null>(null)
//   const pathname = usePathname()

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 60)
//     window.addEventListener('scroll', onScroll)
//     return () => window.removeEventListener('scroll', onScroll)
//   }, [])

//   useEffect(() => {
//     const readAuth = () => {
//       const stored = localStorage.getItem('user')
//       if (stored) {
//         try { setAuthUser(JSON.parse(stored)) }
//         catch { setAuthUser(null) }
//       } else {
//         setAuthUser(null)
//       }
//     }
//     readAuth()
//     window.addEventListener('auth-change', readAuth)
//     window.addEventListener('storage', readAuth)
//     return () => {
//       window.removeEventListener('auth-change', readAuth)
//       window.removeEventListener('storage', readAuth)
//     }
//   }, [])

//   const handleLogout = () => {
//     localStorage.removeItem('token')
//     localStorage.removeItem('user')
//     setAuthUser(null)
//     window.dispatchEvent(new Event('auth-change'))
//     window.location.href = '/'
//   }

//   const getDashboardLink = () => {
//     if (!authUser) return null
//     const role = authUser.role?.toLowerCase()
//     if (role === 'admin') return { href: '/admin', label: 'Admin' }
//     if (role === 'doctor') return { href: '/doctor/dashboard', label: 'My Patients' }
//     return { href: '/patient/dashboard', label: 'My Bookings' }
//   }

//   const dashboardLink = getDashboardLink()

//   return (
//     <header
//       className={`sticky top-0 z-50 w-full transition-all duration-300 ${
//         scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white border-b border-blue-100'
//       }`}
//     >
//       <div className="bg-blue-800 text-white text-xs py-1.5 px-6 flex justify-between items-center">
//         <span>Mon–Sat: 11AM–7PM &nbsp;|&nbsp; Sun: 11AM–2PM</span>
//         <span className="flex items-center gap-1.5">
//           <Phone size={11} /> +91-9599752226
//         </span>
//       </div>

//       <nav className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">
//         <Link href="/" className="flex items-center gap-3">
//           <div className="w-11 h-11 bg-blue-50 rounded-full flex items-center justify-center overflow-hidden border border-blue-100">
//             <Image src="/images/logo.png" alt="Prarthna Clinic" width={40} height={40} className="object-contain" />
//           </div>
//           <div className="leading-tight">
//             <div className="font-serif text-xl font-bold text-blue-800">Prarthna Clinic</div>
//             <div className="text-[10px] text-slate-400 uppercase tracking-widest">Multispeciality Healthcare</div>
//           </div>
//         </Link>

//         <ul className="hidden md:flex items-center gap-7">
//           {navLinks.map(({ href, label }) => (
//             <li key={href}>
//               <Link
//                 href={href}
//                 className={`text-sm font-medium transition-colors relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-blue-600 after:transition-all ${
//                   pathname === href
//                     ? 'text-blue-700 after:w-full'
//                     : 'text-slate-500 hover:text-blue-700 after:w-0 hover:after:w-full'
//                 }`}
//               >
//                 {label}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         <div className="hidden md:flex items-center gap-3">
//           {authUser ? (
//             <>
//               <span className="flex items-center gap-1.5 text-sm text-blue-800 font-medium">
//                 <User size={15} className="text-blue-600" />
//                 {authUser.name || authUser.email}
//               </span>
//               {dashboardLink && (
//                 <Link href={dashboardLink.href} className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
//                   <LayoutDashboard size={14} />
//                   {dashboardLink.label}
//                 </Link>
//               )}
//               <button onClick={handleLogout} className="btn-outline text-sm py-2 px-4 flex items-center gap-1.5">
//                 <LogOut size={14} /> Logout
//               </button>
//               <Link href="/booking" className="btn-primary text-sm py-2 px-5">Book Appointment</Link>
//             </>
//           ) : (
//             <>
//               <Link href="/login"   className="btn-outline text-sm py-2 px-5">Login</Link>
//               <Link href="/booking" className="btn-primary text-sm py-2 px-5">Book Appointment</Link>
//             </>
//           )}
//         </div>

//         <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
//           {mobileOpen ? <X size={22} className="text-blue-800" /> : <Menu size={22} className="text-blue-800" />}
//         </button>
//       </nav>

//       {mobileOpen && (
//         <div className="md:hidden bg-white border-t border-blue-50 px-6 py-4 flex flex-col gap-3">
//           {navLinks.map(({ href, label }) => (
//             <Link
//               key={href}
//               href={href}
//               onClick={() => setMobileOpen(false)}
//               className={`text-sm font-medium py-2 border-b border-blue-50 ${
//                 pathname === href ? 'text-blue-700' : 'text-slate-600'
//               }`}
//             >
//               {label}
//             </Link>
//           ))}
//           <div className="flex flex-col gap-2 pt-2">
//             {authUser ? (
//               <>
//                 <span className="text-sm text-blue-800 font-medium flex items-center gap-1">
//                   <User size={14} /> {authUser.name || authUser.email}
//                 </span>
//                 {dashboardLink && (
//                   <Link href={dashboardLink.href} onClick={() => setMobileOpen(false)} className="text-sm text-blue-600 font-medium flex items-center gap-1">
//                     <LayoutDashboard size={14} /> {dashboardLink.label}
//                   </Link>
//                 )}
//                 <button onClick={handleLogout} className="btn-outline text-center text-sm py-2 flex items-center justify-center gap-1">
//                   <LogOut size={13} /> Logout
//                 </button>
//               </>
//             ) : (
//               <div className="flex gap-3">
//                 <Link href="/login"   className="btn-outline flex-1 text-center text-sm py-2" onClick={() => setMobileOpen(false)}>Login</Link>
//                 <Link href="/booking" className="btn-primary flex-1 text-center text-sm py-2" onClick={() => setMobileOpen(false)}>Book Now</Link>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }


'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, LogOut, ChevronDown } from 'lucide-react'

const navLinks = [
  { href: '/',         label: 'Home' },
  { href: '/doctors',  label: 'Doctors' },
  { href: '/services', label: 'Services' },
  { href: '/about',    label: 'About' },
  { href: '/contact',  label: 'Contact' },
]

interface AuthUser {
  name: string
  email: string
  role: string
}

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [authUser,    setAuthUser]    = useState<AuthUser | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const readAuth = () => {
      const stored = localStorage.getItem('user')
      if (stored) {
        try { setAuthUser(JSON.parse(stored)) }
        catch { setAuthUser(null) }
      } else {
        setAuthUser(null)
      }
    }
    readAuth()
    window.addEventListener('auth-change', readAuth)
    window.addEventListener('storage', readAuth)
    return () => {
      window.removeEventListener('auth-change', readAuth)
      window.removeEventListener('storage', readAuth)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setAuthUser(null)
    setDropdownOpen(false)
    window.dispatchEvent(new Event('auth-change'))
    window.location.href = '/'
  }

  const getDashboardLink = () => {
    if (!authUser) return null
    const role = authUser.role?.toLowerCase()
    if (role === 'admin') return { href: '/admin', label: 'Admin Panel' }
    if (role === 'doctor') return { href: '/doctor/dashboard', label: 'My Patients' }
    return { href: '/patient/dashboard', label: 'My Bookings' }
  }

  const dashboardLink = getDashboardLink()
  const displayName = authUser?.name?.split(' ')[0] || authUser?.email?.split('@')[0] || 'Account'

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white border-b border-blue-100'
      }`}
    >
      {/* Top bar */}
      <div className="bg-blue-800 text-white text-xs py-1.5 px-6 flex justify-between items-center">
        <span>Mon–Sat: 11AM–7PM &nbsp;|&nbsp; Sun: 11AM–2PM</span>
        <span className="flex items-center gap-1.5">
          <Phone size={11} /> +91-95997-52226
        </span>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="w-11 h-11 bg-blue-50 rounded-full flex items-center justify-center overflow-hidden border border-blue-100">
            <Image src="/images/logo.png" alt="Prarthna Clinic" width={40} height={40} className="object-contain" />
          </div>
          <div className="leading-tight">
            <div className="font-serif text-xl font-bold text-blue-800">Prarthna Clinic</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest">Multispeciality Healthcare</div>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm font-medium transition-colors relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-blue-600 after:transition-all ${
                  pathname === href
                    ? 'text-blue-700 after:w-full'
                    : 'text-slate-500 hover:text-blue-700 after:w-0 hover:after:w-full'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          {authUser ? (
            <>
              {/* User dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-xl transition-colors"
                >
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  {displayName}
                  <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-lg border border-slate-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-50">
                      <div className="text-xs text-slate-400">Signed in as</div>
                      <div className="text-sm font-medium text-blue-900 truncate">{authUser.name}</div>
                      <div className="text-xs text-slate-400 truncate">{authUser.email}</div>
                    </div>
                    {dashboardLink && (
                      <Link
                        href={dashboardLink.href}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        {dashboardLink.label}
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={14} /> Sign out
                    </button>
                  </div>
                )}
              </div>
              <Link href="/booking" className="btn-primary text-sm py-2 px-5">Book Appointment</Link>
            </>
          ) : (
            <>
              <Link href="/login"   className="btn-outline text-sm py-2 px-5">Login</Link>
              <Link href="/booking" className="btn-primary text-sm py-2 px-5">Book Appointment</Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} className="text-blue-800" /> : <Menu size={22} className="text-blue-800" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-blue-50 px-6 py-4 flex flex-col gap-3">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`text-sm font-medium py-2 border-b border-blue-50 ${
                pathname === href ? 'text-blue-700' : 'text-slate-600'
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            {authUser ? (
              <>
                <div className="bg-blue-50 rounded-xl px-4 py-3">
                  <div className="text-xs text-slate-400">Signed in as</div>
                  <div className="text-sm font-semibold text-blue-900">{authUser.name}</div>
                </div>
                {dashboardLink && (
                  <Link href={dashboardLink.href} onClick={() => setMobileOpen(false)}
                    className="text-sm text-blue-600 font-medium py-2 px-4 bg-blue-50 rounded-xl text-center">
                    {dashboardLink.label}
                  </Link>
                )}
                <button onClick={handleLogout}
                  className="text-sm text-red-600 font-medium py-2 px-4 bg-red-50 rounded-xl flex items-center justify-center gap-2">
                  <LogOut size={14} /> Sign out
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <Link href="/login"   className="btn-outline flex-1 text-center text-sm py-2" onClick={() => setMobileOpen(false)}>Login</Link>
                <Link href="/booking" className="btn-primary flex-1 text-center text-sm py-2" onClick={() => setMobileOpen(false)}>Book Now</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}