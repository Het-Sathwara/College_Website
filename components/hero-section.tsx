export default function HeroSection() {
  return (
    <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="container relative z-10 px-4 mx-auto text-center md:px-6">
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Welcome to Ranchhodlal Chhotalal Technical Institute
        </h1>
        <p className="max-w-2xl mx-auto mb-8 text-lg md:text-xl">
          Empowering students with knowledge, skills, and values to excel in their chosen fields and contribute to
          society.
        </p>
        {/* Buttons removed as requested */}
      </div>
    </section>
  )
}

