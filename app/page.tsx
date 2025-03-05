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
      {/* Hero section with college name and tagline */}
      <HeroSection />

      {/* About section with college and department information */}
      <AboutSection />

      {/* Syllabus section with semester-wise courses */}
      <SyllabusSection />

      {/* Faculty section with faculty member profiles */}
      <FacultySection />

      {/* Event gallery with past and upcoming events */}
      <EventGallery />

      {/* Student corner with resources for students */}
      <StudentCorner />

      {/* Contact form for inquiries */}
      <ContactForm />
    </main>
  )
}

