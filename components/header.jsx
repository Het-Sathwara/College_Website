"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false)

    setTimeout(() => {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
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

        <nav className="container mx-auto flex justify-between items-center px-4 py-4">
      <div className="flex items-center justify-between w-full space-x-4">
        <Link 
          href="#" 
          onClick={(e) => {
            e.preventDefault()
            scrollToSection("")
          }}
          className="flex-1 text-center text-sm font-medium hover:text-primary"
        >
          Home
        </Link>

        <Link 
          href="#about" 
          onClick={(e) => {
            e.preventDefault()
            scrollToSection("about")
          }}
          className="flex-1 text-center text-sm font-medium hover:text-primary"
        >
          About
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex-1 flex items-center justify-center gap-1"
            >
              Syllabus 
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {[1, 2, 3, 4, 5, 6].map((sem) => (
              <DropdownMenuItem 
                key={sem}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("syllabus")}}
              >
                Semester {sem}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Link 
          href="#faculty" 
          onClick={(e) => {
            e.preventDefault()
            scrollToSection("faculty")
          }}
          className="flex-1 text-center text-sm font-medium hover:text-primary"
        >
          Faculty
        </Link>

        <Link 
          href="#events" 
          onClick={(e) => {
            e.preventDefault()
            scrollToSection("events")
          }}
          className="flex-1 text-center text-sm font-medium hover:text-primary"
        >
          Events
        </Link>
      </div>
    </nav>

      </div>
    </header>
  )
} 