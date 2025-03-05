"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Linkedin } from "lucide-react"

// Default faculty data structure
const defaultFaculty = [
  {
    id: 1,
    name: "Dr. John Smith",
    position: "Professor & Head of Department",
    specialization: "Artificial Intelligence",
    email: "john.smith@college.edu",
    phone: "+1 (123) 456-7890",
    linkedin: "https://linkedin.com/in/johnsmith",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Dr. Sarah Johnson",
    position: "Associate Professor",
    specialization: "Database Systems",
    email: "sarah.johnson@college.edu",
    phone: "+1 (123) 456-7891",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Prof. Michael Brown",
    position: "Assistant Professor",
    specialization: "Computer Networks",
    email: "michael.brown@college.edu",
    phone: "+1 (123) 456-7892",
    linkedin: "https://linkedin.com/in/michaelbrown",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Dr. Emily Davis",
    position: "Assistant Professor",
    specialization: "Software Engineering",
    email: "emily.davis@college.edu",
    phone: "+1 (123) 456-7893",
    linkedin: "https://linkedin.com/in/emilydavis",
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function FacultySection() {
  // State to store faculty data
  const [faculty, setFaculty] = useState([])

  // Load faculty data from localStorage or use default data on component mount
  useEffect(() => {
    const savedFaculty = localStorage.getItem("faculty")
    if (savedFaculty) {
      setFaculty(JSON.parse(savedFaculty))
    } else {
      setFaculty(defaultFaculty)
    }
  }, [])

  return (
    <section id="faculty" className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto md:px-6">
        <h2 className="mb-12 text-3xl font-bold text-center">Our Faculty</h2>

        {/* Responsive grid of faculty cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {faculty.map((member) => (
            <Card key={member.id} className="overflow-hidden">
              {/* Faculty member image */}
              <div className="aspect-square">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Faculty member name and position */}
              <CardHeader className="p-4">
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.position}</CardDescription>
              </CardHeader>
              {/* Faculty member specialization */}
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-gray-500">Specialization: {member.specialization}</p>
              </CardContent>
              {/* Faculty member contact information */}
              <CardFooter className="flex flex-col items-start p-4 pt-0 space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <a href={`mailto:${member.email}`} className="text-sm text-blue-600 hover:underline">
                    {member.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <a href={`tel:${member.phone}`} className="text-sm text-blue-600 hover:underline">
                    {member.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-gray-500" />
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

