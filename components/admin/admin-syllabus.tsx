"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Default syllabus data
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

export default function AdminSyllabus() {
  const [syllabus, setSyllabus] = useState({})
  const [activeTab, setActiveTab] = useState("sem1")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentCourse, setCurrentCourse] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    link: "#",
  })
  const [message, setMessage] = useState({ type: "", text: "" })

  useEffect(() => {
    // Load syllabus from localStorage or use default data
    const savedSyllabus = localStorage.getItem("syllabus")
    if (savedSyllabus) {
      setSyllabus(JSON.parse(savedSyllabus))
    } else {
      setSyllabus(defaultSyllabus)
      localStorage.setItem("syllabus", JSON.stringify(defaultSyllabus))
    }
  }, [])

  const saveSyllabus = (updatedSyllabus) => {
    setSyllabus(updatedSyllabus)
    localStorage.setItem("syllabus", JSON.stringify(updatedSyllabus))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAddCourse = () => {
    const newCourse = {
      id: Date.now(),
      ...formData,
    }

    const updatedSyllabus = {
      ...syllabus,
      [activeTab]: [...(syllabus[activeTab] || []), newCourse],
    }

    saveSyllabus(updatedSyllabus)

    setFormData({
      title: "",
      link: "#",
    })

    setIsAddDialogOpen(false)
    setMessage({ type: "success", text: "Course added successfully!" })

    setTimeout(() => {
      setMessage({ type: "", text: "" })
    }, 3000)
  }

  const handleEditClick = (course) => {
    setCurrentCourse(course)
    setFormData({
      title: course.title,
      link: course.link,
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateCourse = () => {
    const updatedSyllabus = {
      ...syllabus,
      [activeTab]: syllabus[activeTab].map((course) =>
        course.id === currentCourse.id ? { ...course, ...formData } : course,
      ),
    }

    saveSyllabus(updatedSyllabus)
    setIsEditDialogOpen(false)
    setMessage({ type: "success", text: "Course updated successfully!" })

    setTimeout(() => {
      setMessage({ type: "", text: "" })
    }, 3000)
  }

  const handleDeleteCourse = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      const updatedSyllabus = {
        ...syllabus,
        [activeTab]: syllabus[activeTab].filter((course) => course.id !== id),
      }

      saveSyllabus(updatedSyllabus)
      setMessage({ type: "success", text: "Course deleted successfully!" })

      setTimeout(() => {
        setMessage({ type: "", text: "" })
      }, 3000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Syllabus</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
              <DialogDescription>
                Add a new course to the {activeTab.replace("sem", "Semester ")} syllabus.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter course title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="link">Course Link</Label>
                <Input
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  placeholder="Enter course link"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCourse}>Add Course</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {message.text && (
        <Alert
          className={
            message.type === "success"
              ? "bg-green-50 text-green-800 border-green-200"
              : "bg-red-50 text-red-800 border-red-200"
          }
        >
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 sm:grid-cols-6">
          <TabsTrigger value="sem1">Sem 1</TabsTrigger>
          <TabsTrigger value="sem2">Sem 2</TabsTrigger>
          <TabsTrigger value="sem3">Sem 3</TabsTrigger>
          <TabsTrigger value="sem4">Sem 4</TabsTrigger>
          <TabsTrigger value="sem5">Sem 5</TabsTrigger>
          <TabsTrigger value="sem6">Sem 6</TabsTrigger>
        </TabsList>

        {Object.keys(syllabus).map((sem) => (
          <TabsContent key={sem} value={sem} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Semester {sem.replace("sem", "")} Syllabus</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {syllabus[sem]?.map((course) => (
                    <li key={course.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">{course.title}</p>
                        <p className="text-sm text-blue-600">{course.link}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditClick(course)} className="h-8 w-8">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteCourse(course.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>Update the course details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Course Title</Label>
              <Input id="edit-title" name="title" value={formData.title} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-link">Course Link</Label>
              <Input id="edit-link" name="link" value={formData.link} onChange={handleInputChange} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateCourse}>Update Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

