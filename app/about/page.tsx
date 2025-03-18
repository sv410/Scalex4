"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ParticlesBackground } from "@/components/particles-background"
import { TrendingUp, Linkedin, Twitter, ArrowRight } from "lucide-react"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
}

// Team members data
const teamMembers = [
  {
    name: "Rahul Sharma",
    role: "Founder & CEO",
    bio: "Former tech executive with 15+ years of experience in building and scaling startups. Passionate about connecting innovators and creating opportunities for growth.",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "https://linkedin.com/in/example",
    twitter: "https://twitter.com/example",
  },
  {
    name: "Priya Patel",
    role: "Co-founder & CTO",
    bio: "Tech leader with expertise in building scalable platforms. Previously led engineering teams at major tech companies and founded two successful startups.",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "https://linkedin.com/in/example",
    twitter: "https://twitter.com/example",
  },
  {
    name: "Vikram Mehta",
    role: "Head of Partnerships",
    bio: "Experienced business development professional with a strong network in the startup ecosystem. Focused on creating valuable connections between startups and investors.",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "https://linkedin.com/in/example",
    twitter: "https://twitter.com/example",
  },
  {
    name: "Ananya Singh",
    role: "Marketing Director",
    bio: "Marketing strategist with a background in growth marketing for tech startups. Passionate about helping innovative companies tell their stories and reach their audience.",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "https://linkedin.com/in/example",
    twitter: "https://twitter.com/example",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <ParticlesBackground />

      {/* Header */}
      <header className="border-b relative z-10">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ScaleX4</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-pattern">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About ScaleX4</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Connecting startups, investors, and innovators to build the future together.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    ScaleX4 was born out of a simple observation at BioAsia 2025: startups across all sectors face
                    similar challenges in networking, mentorship, collaboration, and scaling.
                  </p>
                  <p>
                    Our founder, Rahul Sharma, noticed that many brilliant innovators were struggling to connect with
                    the right partners, mentors, and investors who could help them grow. At the same time, investors
                    were finding it difficult to discover promising startups aligned with their investment thesis.
                  </p>
                  <p>
                    This disconnect inspired the creation of ScaleX4 - a platform designed to bridge these gaps and
                    create a thriving ecosystem where startups can connect, collaborate, and scale efficiently.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative h-[400px] rounded-lg overflow-hidden gradient-border"
              >
                <Image src="/placeholder.svg?height=800&width=600" alt="ScaleX4 Team" fill className="object-cover" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission & Vision</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-primary-foreground/10 backdrop-blur-sm p-8 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-bold mb-4">Mission</h3>
                <p className="text-primary-foreground">
                  To build a social network and marketplace where startups can connect, collaborate, and scale
                  efficiently, breaking down barriers to innovation and growth.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-primary-foreground/10 backdrop-blur-sm p-8 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-bold mb-4">Vision</h3>
                <p className="text-primary-foreground">
                  A globally recognized platform that fosters startup growth by solving key challenges in networking,
                  mentorship, and investment access, strengthening innovation ecosystems worldwide.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-pattern">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
              <p className="text-muted-foreground">
                The passionate individuals behind ScaleX4 who are dedicated to helping startups succeed.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-background border rounded-lg overflow-hidden hover:shadow-md transition-shadow gradient-border"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="relative h-64 w-full">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-primary text-sm mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                    <div className="flex gap-2">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
              <p className="text-xl mb-8">
                Be part of the ScaleX4 ecosystem and connect with innovative startups, investors, and mentors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto bg-background text-foreground hover:bg-background/90">
                    Sign Up Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

