"use client"

import { useState, useEffect, Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"

// Default syllabus data structure with courses for each semester
const defaultSyllabus = {
  sem1: [
    { id: 1, title: "Introduction to Computer Science", link: "#" },
    { id: 2, title: "Mathematics for Computing", link: "#" },
    { id: 3, title: "Digital Logic Design", link: "#" },
    { id: 4, title: "Programming Fundamentals", link: "#" },
    { id: 5, title: "Communication Skills", link: "#" },
  ],
  sem2: [
    { id: 6, title: "Data Structures", link: "#" },
    { id: 7, title: "Object-Oriented Programming", link: "#" },
    { id: 8, title: "Computer Organization", link: "#" },
    { id: 9, title: "Discrete Mathematics", link: "#" },
    { id: 10, title: "Environmental Studies", link: "#" },
  ],
  sem3: [
    { id: 11, title: "Database Management Systems", link: "#" },
    { id: 12, title: "Operating Systems", link: "#" },
    { id: 13, title: "Computer Networks", link: "#" },
    { id: 14, title: "Design and Analysis of Algorithms", link: "#" },
    { id: 15, title: "Probability and Statistics", link: "#" },
  ],
  sem4: [
    { id: 16, title: "Software Engineering", link: "#" },
    { id: 17, title: "Web Technologies", link: "#" },
    { id: 18, title: "Theory of Computation", link: "#" },
    { id: 19, title: "Computer Graphics", link: "#" },
    { id: 20, title: "Microprocessors and Microcontrollers", link: "#" },
  ],
  sem5: [
    { id: 21, title: "Artificial Intelligence", link: "#" },
    { id: 22, title: "Compiler Design", link: "#" },
    { id: 23, title: "Information Security", link: "#" },
    { id: 24, title: "Mobile Application Development", link: "#" },
    { id: 25, title: "Professional Ethics", link: "#" },
  ],
  sem6: [
    { id: 26, title: "Machine Learning", link: "#" },
    { id: 27, title: "Cloud Computing", link: "#" },
    { id: 28, title: "Data Mining and Warehousing", link: "#" },
    { id: 29, title: "Internet of Things", link: "#" },
    { id: 30, title: "Project Work", link: "#" },
  ],
}

export default function SyllabusSection() {
  // State for currently active semester tab
  const [activeTab, setActiveTab] = useState("sem1")
  // State for syllabus data
  const [syllabus, setSyllabus] = useState({})

  // Load syllabus data from localStorage or use default data
  useEffect(() => {
    const savedSyllabus = localStorage.getItem("syllabus")
    if (savedSyllabus) {
      setSyllabus(JSON.parse(savedSyllabus))
    } else {
      setSyllabus(defaultSyllabus)
    }
  }, [])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section id="syllabus" className="py-16">
        <div className="container px-4 mx-auto md:px-6">
          <h2 className="mb-12 text-3xl font-bold text-center">Syllabus</h2>

          {/* Tabbed interface for semester selection */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-3 sm:grid-cols-6">
              <TabsTrigger value="sem1">Sem 1</TabsTrigger>
              <TabsTrigger value="sem2">Sem 2</TabsTrigger>
              <TabsTrigger value="sem3">Sem 3</TabsTrigger>
              <TabsTrigger value="sem4">Sem 4</TabsTrigger>
              <TabsTrigger value="sem5">Sem 5</TabsTrigger>
              <TabsTrigger value="sem6">Sem 6</TabsTrigger>
            </TabsList>

            {/* Generate tab content for each semester */}
            {Object.keys(syllabus).map((sem) => (
              <TabsContent key={sem} value={sem} className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Semester {sem.replace("sem", "")} Syllabus</CardTitle>
                    <CardDescription>
                      Core courses for{" "}
                      {sem === "sem1"
                        ? "first"
                        : sem === "sem2"
                          ? "second"
                          : sem === "sem3"
                            ? "third"
                            : sem === "sem4"
                              ? "fourth"
                              : sem === "sem5"
                                ? "fifth"
                                : "sixth"}{" "}
                      semester students
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {syllabus[sem]?.map((course) => (
                        <li key={course.id}>
                          <a href={course.link} className="text-blue-600 hover:underline">
                            {course.title}
                          </a>
                        </li>
                      )) || <li>No courses available for this semester.</li>} {/* Edge case handling */}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </Suspense>
  )
} 