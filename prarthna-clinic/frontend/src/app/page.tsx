import HeroSection from '@/components/sections/HeroSection'
import TrustBar from '@/components/sections/TrustBar'
import ServicesSection from '@/components/sections/ServicesSection'
import DoctorsSection from '@/components/sections/DoctorsSection'
import AboutSection from '@/components/sections/AboutSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FaqSection from '@/components/sections/FaqSection'
import BookingStrip from '@/components/sections/BookingStrip'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <DoctorsSection />
      <AboutSection />
      <BookingStrip />
      <FaqSection />
      <TestimonialsSection />
    </>
  )
}
