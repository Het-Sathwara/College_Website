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
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("adminAuthenticated") === "true"
    }
    return false
  })

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated")
    setIsAuthenticated(false)
    router.push("/admin/login")
  }

  if (!isAuthenticated) {
    router.push("/admin/login")
    return null
  }

  return (
    <div>
      {/* Your admin page content goes here */}
      <Button onClick={handleLogout}>
        <LogOut className="w-4 h-4" />
        Logout
      </Button>
      <Tabs>
        <TabsList>
          <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="faculty">Faculty</TabsTrigger>
          <TabsTrigger value="student-corner">Student Corner</TabsTrigger>
        </TabsList>
        <TabsContent value="syllabus">
          <AdminSyllabus />
        </TabsContent>
        <TabsContent value="events">
          <AdminEventGallery />
        </TabsContent>
        <TabsContent value="faculty">
          <AdminFaculty />
        </TabsContent>
        <TabsContent value="student-corner">
          <AdminStudentCorner />
        </TabsContent>
      </Tabs>
    </div>
  )
} 