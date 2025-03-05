"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ContactForm() {
  // State for form submission status
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    success: false,
    error: false,
    message: "",
  })

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle select field changes
  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      subject: value,
    }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus({
      ...formStatus,
      submitting: true,
    })

    try {
      // Replace with your actual Formspree endpoint
      const response = await fetch("https://formspree.io/f/your-formspree-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Handle successful submission
        setFormStatus({
          submitted: true,
          submitting: false,
          success: true,
          error: false,
          message: "Thank you! Your message has been submitted successfully.",
        })
        // Reset form data
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } else {
        throw new Error("Form submission failed")
      }
    } catch (error) {
      // Handle submission error
      setFormStatus({
        submitted: true,
        submitting: false,
        success: false,
        error: true,
        message: "Oops! There was a problem submitting your form. Please try again.",
      })
    }
  }

  return (
    <section id="contact" className="py-16">
      <div className="container px-4 mx-auto md:px-6">
        <h2 className="mb-12 text-3xl font-bold text-center">Contact Us</h2>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Success or error message alert */}
            {formStatus.submitted && (
              <Alert
                className={`mb-6 ${formStatus.success ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"}`}
              >
                {formStatus.success ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600" />
                )}
                <AlertTitle>{formStatus.success ? "Success!" : "Error!"}</AlertTitle>
                <AlertDescription>{formStatus.message}</AlertDescription>
              </Alert>
            )}

            {/* Contact form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name and email fields */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Phone and subject fields */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+1 (123) 456-7890"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={formData.subject} onValueChange={handleSelectChange}>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admission">Admission Inquiry</SelectItem>
                      <SelectItem value="course">Course Information</SelectItem>
                      <SelectItem value="faculty">Faculty Contact</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Message field */}
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message here..."
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            {/* Submit button */}
            <Button type="submit" className="w-full" disabled={formStatus.submitting} onClick={handleSubmit}>
              {formStatus.submitting ? "Submitting..." : "Send Message"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}

