import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container px-4 py-12 mx-auto md:px-6">
        {/* Footer content organized in a responsive grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* College information and social media links */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Ranchhodlal Chhotalal Technical Institute</h3>
            <p className="mb-4 text-gray-400">Providing quality education since [Year]</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          {/* Quick links to main sections */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="#syllabus" className="text-gray-400 hover:text-white">
                  Syllabus
                </Link>
              </li>
              <li>
                <Link href="#faculty" className="text-gray-400 hover:text-white">
                  Faculty
                </Link>
              </li>
              <li>
                <Link href="#events" className="text-gray-400 hover:text-white">
                  Events
                </Link>
              </li>
              <li>
                <Link href="#student-corner" className="text-gray-400 hover:text-white">
                  Student Corner
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact information with icons */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                <span className="text-gray-400">123 College Street, City, State, ZIP</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">info@collegename.edu</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright information */}
        <div className="pt-8 mt-8 border-t border-gray-800">
          <p className="text-sm text-center text-gray-400">
            © {new Date().getFullYear()} Ranchhodlal Chhotalal Technical Institute. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

