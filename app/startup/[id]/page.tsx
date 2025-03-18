"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  ArrowLeft,
  Globe,
  MapPin,
  Users,
  Calendar,
  DollarSign,
  Award,
  Linkedin,
  MessageSquare,
  Share2,
  Bookmark,
} from "lucide-react"

interface Founder {
  name: string
  role: string
  linkedin: string
  bio: string
}

interface Startup {
  id: string
  companyName: string
  logo: string
  industry: string
  description: string
  longDescription: string
  foundingYear: string
  website: string
  location: string
  teamSize: string
  fundingStage: string
  fundingAmount: string
  founders: Founder[]
  investors: string[]
  highlights: string[]
}

export default function StartupProfilePage() {
  const params = useParams()
  const id = params.id as string

  const [startup, setStartup] = useState<Startup | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStartupDetails() {
      try {
        const response = await fetch(`/api/startups/${id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch startup details")
        }

        const data = await response.json()

        if (data.success) {
          setStartup(data.data)
        } else {
          setError(data.error || "Failed to fetch startup details")
        }
      } catch (error) {
        console.error("Error fetching startup details:", error)
        setError("An error occurred while fetching startup details")
      } finally {
        setIsLoading(false)
      }
    }

    fetchStartupDetails()
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-muted-foreground">Loading startup profile...</p>
        </div>
      </div>
    )
  }

  if (error || !startup) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Startup Not Found</h2>
          <p className="text-muted-foreground mb-6">
            {error || "The startup you're looking for doesn't exist or has been removed."}
          </p>
          <Link href="/explore">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Explore
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ScaleX4</span>
          </Link>
          <div className="flex items-center gap-4">
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

      <main className="flex-1 container py-8">
        <div className="mb-6">
          <Link
            href="/explore"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Explore
          </Link>
        </div>

        {/* Company Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-6 items-start mb-8"
        >
          <div className="w-24 h-24 rounded-lg bg-teal/20 flex items-center justify-center overflow-hidden">
            <Image
              src={startup.logo || "/placeholder.svg"}
              alt={startup.companyName}
              width={100}
              height={100}
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2 text-fiery-orange">{startup.companyName}</h1>
            <p className="text-lg text-muted-foreground mb-4">{startup.description}</p>

            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center text-sm">
                <Globe className="mr-2 h-4 w-4 text-cyan" />
                <a
                  href={startup.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal hover:text-cyan"
                >
                  {startup.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="mr-2 h-4 w-4 text-cyan" />
                <span>{startup.location}</span>
              </div>
              <div className="flex items-center text-sm">
                <Users className="mr-2 h-4 w-4 text-cyan" />
                <span>{startup.teamSize} employees</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-cyan" />
                <span>Founded {startup.foundingYear}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="bg-fiery-orange hover:bg-gold text-white">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact
              </Button>
              <Button variant="outline" className="border-teal text-teal hover:bg-teal/10">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" className="border-teal text-teal hover:bg-teal/10">
                <Bookmark className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-6 bg-teal/10">
            <TabsTrigger value="overview" className="data-[state=active]:bg-teal data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-teal data-[state=active]:text-white">
              Team
            </TabsTrigger>
            <TabsTrigger value="funding" className="data-[state=active]:bg-teal data-[state=active]:text-white">
              Funding
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">About {startup.companyName}</h2>
                    <p className="text-muted-foreground whitespace-pre-line">{startup.longDescription}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">Highlights</h2>
                    <ul className="space-y-2">
                      {startup.highlights.map((highlight, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-start"
                        >
                          <Award className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">Funding</h2>
                    <div className="flex items-center mb-4">
                      <DollarSign className="h-5 w-5 text-primary mr-2" />
                      <div>
                        <p className="font-medium">{startup.fundingAmount}</p>
                        <p className="text-sm text-muted-foreground">{startup.fundingStage}</p>
                      </div>
                    </div>

                    <h3 className="font-medium text-sm text-muted-foreground mb-2">Investors</h3>
                    <ul className="space-y-1">
                      {startup.investors.map((investor, index) => (
                        <li key={index} className="text-sm">
                          {investor}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">Similar Startups</h2>
                    <p className="text-sm text-muted-foreground">
                      Sign up to see similar startups in {startup.industry}
                    </p>
                    <div className="mt-4">
                      <Link href="/signup">
                        <Button className="w-full">Sign Up</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="team">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold mb-6">Leadership Team</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {startup.founders.map((founder, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border rounded-lg p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-8 w-8 text-primary" />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold">{founder.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{founder.role}</p>
                        <p className="text-sm mb-3">{founder.bio}</p>
                        <a
                          href={founder.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-primary hover:underline"
                        >
                          <Linkedin className="h-4 w-4 mr-1" />
                          LinkedIn Profile
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-4">Interested in joining the {startup.companyName} team?</p>
                <Button>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Company
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="funding">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-6">Funding History</h2>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{startup.fundingStage}</h3>
                        <p className="text-lg font-medium">{startup.fundingAmount}</p>
                        <p className="text-sm text-muted-foreground">Latest funding round</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Investors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {startup.investors.map((investor, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border rounded-lg p-6"
                    >
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold">{investor}</h3>
                      <p className="text-sm text-muted-foreground">Investor</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Are you an investor?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Sign up to connect with {startup.companyName} and other promising startups.
                </p>
                <Link href="/signup?role=investor">
                  <Button>Sign Up as Investor</Button>
                </Link>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

