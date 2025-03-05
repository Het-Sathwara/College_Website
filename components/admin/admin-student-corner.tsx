"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

// Default student corner resources data (without Help Desk and E-Library)
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

// Available icons for selection
const availableIcons = ["CreditCard", "Calendar", "FileText", "Award", "Book", "Clipboard", "GraduationCap", "Users"]

export default function AdminStudentCorner() {
  const [resources, setResources] = useState([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentResource, setCurrentResource] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "CreditCard",
    link: "",
  })
  const [message, setMessage] = useState({ type: "", text: "" })

  useEffect(() => {
    // Load resources from localStorage or use default data
    const savedResources = localStorage.getItem("studentCornerResources")
    if (savedResources) {
      setResources(JSON.parse(savedResources))
    } else {
      setResources(defaultResources)
      localStorage.setItem("studentCornerResources", JSON.stringify(defaultResources))
    }
  }, [])

  const saveResources = (updatedResources) => {
    setResources(updatedResources)
    localStorage.setItem("studentCornerResources", JSON.stringify(updatedResources))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAddResource = () => {
    const newResource = {
      id: Date.now(),
      ...formData,
    }

    const updatedResources = [...resources, newResource]
    saveResources(updatedResources)

    setFormData({
      title: "",
      description: "",
      icon: "CreditCard",
      link: "",
    })

    setIsAddDialogOpen(false)
    setMessage({ type: "success", text: "Resource added successfully!" })

    setTimeout(() => {
      setMessage({ type: "", text: "" })
    }, 3000)
  }

  const handleEditClick = (resource) => {
    setCurrentResource(resource)
    setFormData({
      title: resource.title,
      description: resource.description,
      icon: resource.icon,
      link: resource.link,
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateResource = () => {
    const updatedResources = resources.map((resource) =>
      resource.id === currentResource.id ? { ...resource, ...formData } : resource,
    )

    saveResources(updatedResources)
    setIsEditDialogOpen(false)
    setMessage({ type: "success", text: "Resource updated successfully!" })

    setTimeout(() => {
      setMessage({ type: "", text: "" })
    }, 3000)
  }

  const handleDeleteResource = (id) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      const updatedResources = resources.filter((resource) => resource.id !== id)
      saveResources(updatedResources)
      setMessage({ type: "success", text: "Resource deleted successfully!" })

      setTimeout(() => {
        setMessage({ type: "", text: "" })
      }, 3000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Student Corner</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Resource</DialogTitle>
              <DialogDescription>Fill in the details to add a new resource to the Student Corner.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Resource Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter resource title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter resource description"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="icon">Icon</Label>
                <select
                  id="icon"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {availableIcons.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="link">Link URL</Label>
                <Input
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  placeholder="Enter resource link URL"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddResource}>Add Resource</Button>
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <Card key={resource.id} className="transition-all duration-200 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full text-blue-600">
                {resource.icon}
              </div>
              <div>
                <CardTitle className="flex items-start justify-between">
                  <span>{resource.title}</span>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">{resource.description}</p>
              <p className="mt-2 text-xs text-blue-600">{resource.link}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditClick(resource)}
                className="flex items-center gap-1"
              >
                <Pencil className="w-3 h-3" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteResource(resource.id)}
                className="flex items-center gap-1 text-red-500 hover:text-red-700 border-red-200 hover:border-red-300"
              >
                <Trash2 className="w-3 h-3" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Resource</DialogTitle>
            <DialogDescription>Update the resource details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Resource Title</Label>
              <Input id="edit-title" name="title" value={formData.title} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-icon">Icon</Label>
              <select
                id="edit-icon"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {availableIcons.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-link">Link URL</Label>
              <Input id="edit-link" name="link" value={formData.link} onChange={handleInputChange} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateResource}>Update Resource</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

