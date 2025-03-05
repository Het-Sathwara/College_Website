"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, CreditCard, Calendar, FileText, Award } from "lucide-react"

// Default resources data structure (without Help Desk and E-Library as requested)
const defaultResources = [
  {
    id: 1,
    title: "Pay Term Fees",
    description: "Make online payment for your term fees securely.",
    icon: "CreditCard",
    link: "https://example.com/pay-fees",
  },
  {
    id: 2,
    title: "Academic Calendar",
    description: "View the academic calendar for the current year.",
    icon: "Calendar",
    link: "https://example.com/calendar",
  },
  {
    id: 4,
    title: "Exam Results",
    description: "Check your semester examination results.",
    icon: "FileText",
    link: "https://example.com/results",
  },
  {
    id: 5,
    title: "Scholarships",
    description: "Information about available scholarships and how to apply.",
    icon: "Award",
    link: "https://example.com/scholarships",
  },
]

// Map icon names to Lucide React components for rendering
const iconMap = {
  CreditCard: <CreditCard className="w-10 h-10 text-blue-600" />,
  Calendar: <Calendar className="w-10 h-10 text-green-600" />,
  FileText: <FileText className="w-10 h-10 text-red-600" />,
  Award: <Award className="w-10 h-10 text-yellow-600" />,
}

export default function StudentCorner() {
  // State to store resource data
  const [resources, setResources] = useState([])

  // Load resources from localStorage or use default data on component mount
  useEffect(() => {
    const savedResources = localStorage.getItem("studentCornerResources")
    if (savedResources) {
      setResources(JSON.parse(savedResources))
    } else {
      setResources(defaultResources)
    }
  }, [])

  return (
    <section id="student-corner" className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto md:px-6">
        <h2 className="mb-12 text-3xl font-bold text-center">Student Corner</h2>

        {/* Responsive grid of resource cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <Card key={resource.id} className="transition-all duration-200 hover:shadow-lg">
              {/* Resource icon and title */}
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                {iconMap[resource.icon] || <CreditCard className="w-10 h-10 text-blue-600" />}
                <div>
                  <CardTitle>{resource.title}</CardTitle>
                </div>
              </CardHeader>
              {/* Resource description */}
              <CardContent>
                <CardDescription>{resource.description}</CardDescription>
              </CardContent>
              {/* Resource link button */}
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Access <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

