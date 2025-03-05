import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SyllabusSection from "@/components/syllabus-section"
import FacultySection from "@/components/faculty-section"
import EventGallery from "@/components/event-gallery"
import StudentCorner from "@/components/student-corner"
import ContactForm from "@/components/contact-form"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <SyllabusSection />
      <FacultySection />
      <EventGallery />
      <StudentCorner />
      <ContactForm />
    </main>
  )
} 