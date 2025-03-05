import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto md:px-6">
        <h2 className="mb-12 text-3xl font-bold text-center">About Us</h2>

        {/* Tabbed interface for About College and About Department */}
        <Tabs defaultValue="college" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="college">About College</TabsTrigger>
            <TabsTrigger value="department">About Department</TabsTrigger>
          </TabsList>

          {/* College information tab content */}
          <TabsContent value="college" className="mt-6">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="College Building"
                  width={600}
                  height={400}
                  className="object-cover w-full h-auto rounded-lg shadow-md"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Ranchhodlal Chhotalal Technical Institute</h3>
                <p className="text-gray-700">
                  Founded in [Year], Ranchhodlal Chhotalal Technical Institute has been at the forefront of higher
                  education, committed to academic excellence and holistic development of students. Our state-of-the-art
                  campus provides an ideal environment for learning and growth.
                </p>
                <p className="text-gray-700">
                  With a team of dedicated faculty members, modern infrastructure, and innovative teaching
                  methodologies, we strive to nurture the next generation of leaders, thinkers, and innovators.
                </p>
                <p className="text-gray-700">
                  Our college has been recognized for its outstanding contribution to education and research, with
                  numerous accolades and rankings that reflect our commitment to quality education.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Department information tab content */}
          <TabsContent value="department" className="mt-6">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Department"
                  width={600}
                  height={400}
                  className="object-cover w-full h-auto rounded-lg shadow-md"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Information And Communication Technology</h3>
                <p className="text-gray-700">
                  The Department of Information And Communication Technology was established in [Year] with a vision to
                  provide quality education in the field of ICT. Over the years, it has evolved into a center of
                  excellence, known for its innovative curriculum and research initiatives.
                </p>
                <p className="text-gray-700">
                  Our department boasts of experienced faculty members who are experts in their respective fields. They
                  bring a wealth of knowledge and practical experience to the classroom, ensuring that students receive
                  a well-rounded education.
                </p>
                <p className="text-gray-700">
                  With modern laboratories, a well-stocked library, and regular industry interactions, we prepare our
                  students for the challenges of the professional world, equipping them with the skills and knowledge
                  needed to succeed.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

