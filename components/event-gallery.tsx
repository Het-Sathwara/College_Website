// Event Gallery component to display events in a responsive grid
// Loads event data from localStorage or uses default data
// Each event is displayed as a card with image, title, date, description, and details

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Default events data structure
const defaultEvents = [
  {
    id: 1,
    title: "AI Workshop",
    description: "A hands-on workshop on artificial intelligence and machine learning.",
    date: "October 15, 2023",
    mentor: "Dr. Robert Chen",
    company: "TechInnovate Inc.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "Industrial Visit to Google",
    description: "Students visited Google's headquarters to learn about their operations and technology.",
    date: "November 5, 2023",
    mentor: "Ms. Lisa Wong",
    company: "Google",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "Cybersecurity Seminar",
    description: "An informative seminar on the latest trends and challenges in cybersecurity.",
    date: "December 10, 2023",
    mentor: "Mr. James Wilson",
    company: "SecureNet Solutions",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "Web Development Bootcamp",
    description: "A three-day intensive bootcamp on modern web development technologies.",
    date: "January 20, 2024",
    mentor: "Dr. Amanda Rodriguez",
    company: "WebTech Labs",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    title: "Startup Pitch Competition",
    description: "Students presented their innovative startup ideas to industry experts.",
    date: "February 15, 2024",
    mentor: "Mr. David Park",
    company: "Venture Capital Partners",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 6,
    title: "Data Science Workshop",
    description: "An interactive workshop on data analysis and visualization techniques.",
    date: "March 5, 2024",
    mentor: "Dr. Sarah Thompson",
    company: "DataMinds Inc.",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function EventGallery() {
  // State to store event data
  const [events, setEvents] = useState([])

  // Load events from localStorage or use default data on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem("events")
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents))
    } else {
      setEvents(defaultEvents)
    }
  }, [])

  return (
    <section id="events" className="py-16">
      <div className="container px-4 mx-auto md:px-6">
        <h2 className="mb-12 text-3xl font-bold text-center">Event Gallery</h2>

        {/* Responsive grid of event cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              {/* Event image */}
              <div className="relative h-48">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              </div>
              {/* Event title and date */}
              <CardHeader className="p-4">
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>{event.date}</CardDescription>
              </CardHeader>
              {/* Event description */}
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-gray-700">{event.description}</p>
              </CardContent>
              {/* Event additional details */}
              <CardFooter className="p-4 pt-0">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Mentor:</span> {event.mentor}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Company:</span> {event.company}
                  </p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

