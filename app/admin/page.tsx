"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminEventGallery from "@/components/admin/admin-event-gallery"
import AdminSyllabus from "@/components/admin/admin-syllabus"
import AdminFaculty from "@/components/admin/admin-faculty"
import AdminStudentCorner from "@/components/admin/admin-student-corner"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function AdminPage() {
  // Get router for navigation
  const router = useRouter()

  // Check if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("adminAuthenticated") === "true"
    }
    return false
  })

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated")
    setIsAuthenticated(false)
    router.push("/admin/login")
  }

  // Redirect to login page if not authenticated
  if (!isAuthenticated) {
    router.push("/admin/login")
    return null
  }

  return (
    <div className="container py-8 mx-auto">
      {/* Header with title and logout button */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>

      {/* Tabbed interface for different content sections */}
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="events">Event Gallery</TabsTrigger>
          <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
          <TabsTrigger value="faculty">Faculty</TabsTrigger>
          <TabsTrigger value="student-corner">Student Corner</TabsTrigger>
        </TabsList>

        {/* Content for each tab */}
        <TabsContent value="events" className="mt-6">
          <AdminEventGallery />
        </TabsContent>

        <TabsContent value="syllabus" className="mt-6">
          <AdminSyllabus />
        </TabsContent>

        <TabsContent value="faculty" className="mt-6">
          <AdminFaculty />
        </TabsContent>

        <TabsContent value="student-corner" className="mt-6">
          <AdminStudentCorner />
        </TabsContent>
      </Tabs>
    </div>
  )
}

