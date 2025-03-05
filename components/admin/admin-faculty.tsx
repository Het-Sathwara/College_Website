"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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

// Default faculty data
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

export default function AdminFaculty() {
  const [faculty, setFaculty] = useState([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentFaculty, setCurrentFaculty] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    specialization: "",
    email: "",
    phone: "",
    linkedin: "",
    image: "",
  })
  const [message, setMessage] = useState({ type: "", text: "" })

  useEffect(() => {
    // Load faculty from localStorage or use default data
    const savedFaculty = localStorage.getItem("faculty")
    if (savedFaculty) {
      setFaculty(JSON.parse(savedFaculty))
    } else {
      setFaculty(defaultFaculty)
      localStorage.setItem("faculty", JSON.stringify(defaultFaculty))
    }
  }, [])

  const saveFaculty = (updatedFaculty) => {
    setFaculty(updatedFaculty)
    localStorage.setItem("faculty", JSON.stringify(updatedFaculty))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAddFaculty = () => {
    const newFaculty = {
      id: Date.now(),
      ...formData,
    }

    const updatedFaculty = [...faculty, newFaculty]
    saveFaculty(updatedFaculty)

    setFormData({
      name: "",
      position: "",
      specialization: "",
      email: "",
      phone: "",
      linkedin: "",
      image: "/placeholder.svg?height=300&width=300",
    })

    setIsAddDialogOpen(false)
    setMessage({ type: "success", text: "Faculty member added successfully!" })

    setTimeout(() => {
      setMessage({ type: "", text: "" })
    }, 3000)
  }

  const handleEditClick = (member) => {
    setCurrentFaculty(member)
    setFormData({
      name: member.name,
      position: member.position,
      specialization: member.specialization,
      email: member.email,
      phone: member.phone,
      linkedin: member.linkedin,
      image: member.image,
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateFaculty = () => {
    const updatedFaculty = faculty.map((member) =>
      member.id === currentFaculty.id ? { ...member, ...formData } : member,
    )

    saveFaculty(updatedFaculty)
    setIsEditDialogOpen(false)
    setMessage({ type: "success", text: "Faculty member updated successfully!" })

    setTimeout(() => {
      setMessage({ type: "", text: "" })
    }, 3000)
  }

  const handleDeleteFaculty = (id) => {
    if (window.confirm("Are you sure you want to delete this faculty member?")) {
      const updatedFaculty = faculty.filter((member) => member.id !== id)
      saveFaculty(updatedFaculty)
      setMessage({ type: "success", text: "Faculty member deleted successfully!" })

      setTimeout(() => {
        setMessage({ type: "", text: "" })
      }, 3000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Faculty</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Faculty
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Faculty Member</DialogTitle>
              <DialogDescription>Fill in the details to add a new faculty member.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Enter position"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  placeholder="Enter specialization"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  placeholder="Enter LinkedIn profile URL"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                />
                <p className="text-xs text-gray-500">
                  Use "/placeholder.svg?height=300&width=300" for a placeholder image
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddFaculty}>Add Faculty</Button>
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {faculty.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <div className="aspect-square">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="flex items-start justify-between">
                <span>{member.name}</span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEditClick(member)} className="h-8 w-8">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteFaculty(member.id)}
                    className="h-8 w-8 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-gray-500">{member.position}</p>
              <p className="mt-2 text-sm">Specialization: {member.specialization}</p>
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4 pt-0 space-y-2">
              <p className="text-sm">
                <span className="font-medium">Email:</span> {member.email}
              </p>
              <p className="text-sm">
                <span className="font-medium">Phone:</span> {member.phone}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Faculty Member</DialogTitle>
            <DialogDescription>Update the faculty member details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input id="edit-name" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-position">Position</Label>
              <Input id="edit-position" name="position" value={formData.position} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-specialization">Specialization</Label>
              <Input
                id="edit-specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input id="edit-email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-phone">Phone</Label>
              <Input id="edit-phone" name="phone" value={formData.phone} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-linkedin">LinkedIn</Label>
              <Input id="edit-linkedin" name="linkedin" value={formData.linkedin} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-image">Image URL</Label>
              <Input id="edit-image" name="image" value={formData.image} onChange={handleInputChange} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateFaculty}>Update Faculty</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

