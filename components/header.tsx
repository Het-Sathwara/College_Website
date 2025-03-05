"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  // State to control mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Toggle mobile menu open/closed
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Function to handle smooth scrolling to sections
  // Takes section ID and optional semester parameter
  const scrollToSection = (sectionId, semParam = null) => {
    // Close mobile menu when navigating
    setIsMenuOpen(false)

    // Add a small delay to ensure the menu closes before scrolling
    setTimeout(() => {
      // Find the target section by ID
      const section = document.getElementById(sectionId)
      if (section) {
        // Scroll to the section with smooth behavior
        section.scrollIntoView({ behavior: "smooth" })

        // If a semester parameter is provided, update the active tab
        if (semParam && sectionId === "syllabus") {
          // Create a new URL with the semester parameter
          const url = new URL(window.location.href)
          url.searchParams.set("sem", semParam)
          window.history.pushState({}, "", url)

          // Dispatch an event to notify the syllabus component about the change
          window.dispatchEvent(
            new CustomEvent("semesterChange", {
              detail: { semester: semParam },
            }),
          )
        }
      }
    }, 100)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
        {/* College logo and name */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/placeholder.svg?height=40&width=40" alt="College Logo" width={40} height={40} />
          <span className="text-xl font-bold">Ranchhodlal Chhotalal Technical Institute</span>
        </Link>

        {/* Desktop Navigation - hidden on mobile */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("")
            }}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="#about"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("about")
            }}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </Link>

          {/* Syllabus dropdown menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 px-2">
                Syllabus <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => scrollToSection("syllabus", "1")}>Semester 1</DropdownMenuItem>
              <DropdownMenuItem onClick={() => scrollToSection("syllabus", "2")}>Semester 2</DropdownMenuItem>
              <DropdownMenuItem onClick={() => scrollToSection("syllabus", "3")}>Semester 3</DropdownMenuItem>
              <DropdownMenuItem onClick={() => scrollToSection("syllabus", "4")}>Semester 4</DropdownMenuItem>
              <DropdownMenuItem onClick={() => scrollToSection("syllabus", "5")}>Semester 5</DropdownMenuItem>
              <DropdownMenuItem onClick={() => scrollToSection("syllabus", "6")}>Semester 6</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="#faculty"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("faculty")
            }}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Faculty
          </Link>
          <Link
            href="#events"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("events")
            }}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Events
          </Link>
          <Link
            href="#student-corner"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("student-corner")
            }}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Student Corner
          </Link>
          <Link
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("contact")
            }}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button - visible only on mobile */}
        <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation - shown only when menu is open */}
      {isMenuOpen && (
        <div className="absolute w-full bg-white border-b shadow-sm md:hidden">
          <div className="container px-4 py-4 mx-auto space-y-4">
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("")
              }}
              className="block text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="#about"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("about")
              }}
              className="block text-sm font-medium"
            >
              About
            </Link>

            {/* Mobile syllabus dropdown (expanded) */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Syllabus</p>
              <div className="pl-4 space-y-2">
                <Link
                  href="#syllabus?sem=1"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("syllabus", "1")
                  }}
                  className="block text-sm"
                >
                  Semester 1
                </Link>
                <Link
                  href="#syllabus?sem=2"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("syllabus", "2")
                  }}
                  className="block text-sm"
                >
                  Semester 2
                </Link>
                <Link
                  href="#syllabus?sem=3"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("syllabus", "3")
                  }}
                  className="block text-sm"
                >
                  Semester 3
                </Link>
                <Link
                  href="#syllabus?sem=4"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("syllabus", "4")
                  }}
                  className="block text-sm"
                >
                  Semester 4
                </Link>
                <Link
                  href="#syllabus?sem=5"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("syllabus", "5")
                  }}
                  className="block text-sm"
                >
                  Semester 5
                </Link>
                <Link
                  href="#syllabus?sem=6"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("syllabus", "6")
                  }}
                  className="block text-sm"
                >
                  Semester 6
                </Link>
              </div>
            </div>

            <Link
              href="#faculty"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("faculty")
              }}
              className="block text-sm font-medium"
            >
              Faculty
            </Link>
            <Link
              href="#events"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("events")
              }}
              className="block text-sm font-medium"
            >
              Events
            </Link>
            <Link
              href="#student-corner"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("student-corner")
              }}
              className="block text-sm font-medium"
            >
              Student Corner
            </Link>
            <Link
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("contact")
              }}
              className="block text-sm font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

