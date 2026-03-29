import type { Metadata } from 'next'
import { Cormorant_Garamond, Outfit } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: 'Prarthna Multispeciality Clinic | Complete Dental & Health Care',
  description:
    'Expert multispeciality healthcare — complete dental and medical care for families across Delhi and Faridabad since 1994.',
  keywords: 'clinic, dental, health, Faridabad, Delhi, doctor, appointment',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
    shortcut: '/images/logo.png',
  },
  openGraph: {
    title: 'Prarthna Multispeciality Clinic',
    description: 'Complete Dental And Health Care — Tigri Colony Delhi & Faridabad',
    type: 'website',
    images: ['/images/logo.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="font-sans bg-white text-blue-900 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
