"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId, semParam = null) => {
    setIsMenuOpen(false)

    setTimeout(() => {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })

        if (semParam && sectionId === "syllabus") {
          if (typeof window !== "undefined" && typeof window.location !== "undefined") {
            const url = new URL(window.location.href)
            url.searchParams.set("sem", semParam)
            window.history.pushState({}, "", url)

            window.dispatchEvent(
              new CustomEvent("semesterChange", {
                detail: { semester: semParam },
              }),
            )
          }
        }
      }
    }, 100)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/placeholder.svg?height=40&width=40" alt="College Logo" width={40} height={40} />
          <span className="text-xl font-bold">Ranchhodlal Chhotalal Technical Institute</span>
        </Link>

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
        </nav>
      </div>
    </header>
  )
} 