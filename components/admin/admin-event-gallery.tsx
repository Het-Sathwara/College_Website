// Admin Event Gallery component for managing events
// Provides interface for adding, editing, and deleting events
// Uses localStorage for data persistence

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
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

export default function AdminEventGallery() {
  // State for events data and UI controls
  const [events, setEvents] = useState([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentEvent, setCurrentEvent] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    mentor: "",
    company: "",
    image: "",
  })
  const [message, setMessage] = useState({ type: "", text: "" })

  // Load events from localStorage or use default data on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem("events")
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents))
    } else {
      setEvents(defaultEvents)
      localStorage.setItem("events", JSON.stringify(defaultEvents))
    }
  }, [])

  // Save events to localStorage
  const saveEvents = (updatedEvents) => {
    setEvents(updatedEvents)
    localStorage.setItem("events", JSON.stringify(updatedEvents))
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle adding a new event
  const handleAddEvent = () => {
    const newEvent = {
      id: Date.now(),
      ...formData,
    }

    const updatedEvents = [...events, newEvent]
    saveEvents(updatedEvents)

    // Reset form data
    setFormData({
      title: "",
      description: "",
      date: "",
      mentor: "",
      company: "",
      image: "/placeholder.svg?height=400&width=600",
    })

    // Close dialog and show success message
    setIsAddDialogOpen(false)
    setMessage({ type: "success", text: "Event added successfully!" })

    // Clear message after delay
    setTimeout(() => {
      setMessage({ type: "", text: "" })
    }, 3000)
  }

  // Handle edit button click
  const handleEditClick = (event) => {
    setCurrentEvent(event)
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      mentor: event.mentor,
      company: event.company,
      image: event.image,
    })
    setIsEditDialogOpen(true)
  }

  // Handle updating an event
  const handleUpdateEvent = () => {
    const updatedEvents = events.map((event) => (event.id === currentEvent.id ? { ...event, ...formData } : event))

    saveEvents(updatedEvents)
    setIsEditDialogOpen(false)
    setMessage({ type: "success", text: "Event updated successfully!" })

    // Clear message after delay
    setTimeout(() => {
      setMessage({ type: "", text: "" })
    }, 3000)
  }

  // Handle deleting an event
  const handleDeleteEvent = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const updatedEvents = events.filter((event) => event.id !== id)
      saveEvents(updatedEvents)
      setMessage({ type: "success", text: "Event deleted successfully!" })

      // Clear message after delay
      setTimeout(() => {
        setMessage({ type: "", text: "" })
      }, 3000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Event Gallery</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>Fill in the details to add a new event to the gallery.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter event title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter event description"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  placeholder="e.g., January 15, 2024"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mentor">Mentor</Label>
                <Input
                  id="mentor"
                  name="mentor"
                  value={formData.mentor}
                  onChange={handleInputChange}
                  placeholder="Enter mentor name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Enter company name"
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
                  Use "/placeholder.svg?height=400&width=600" for a placeholder image
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEvent}>Add Event</Button>
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
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="flex items-start justify-between">
                <span>{event.title}</span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEditClick(event)} className="h-8 w-8">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteEvent(event.id)}
                    className="h-8 w-8 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-gray-500">{event.date}</p>
              <p className="mt-2 text-sm text-gray-700">{event.description}</p>
            </CardContent>
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>Update the event details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Event Title</Label>
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
              <Label htmlFor="edit-date">Date</Label>
              <Input id="edit-date" name="date" value={formData.date} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-mentor">Mentor</Label>
              <Input id="edit-mentor" name="mentor" value={formData.mentor} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-company">Company</Label>
              <Input id="edit-company" name="company" value={formData.company} onChange={handleInputChange} />
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
            <Button onClick={handleUpdateEvent}>Update Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

