"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Search, TrendingUp, LightbulbIcon } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { ParticlesBackground } from "@/components/particles-background"

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

interface Startup {
  id: string
  companyName: string
  industry: string
  description: string
  foundingYear: string
}

export default function ExplorePage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [industry, setIndustry] = useState("all")
  const [stage, setStage] = useState("all")
  const [startups, setStartups] = useState<Startup[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    fetchStartups()
  }, [])

  async function fetchStartups() {
    setIsLoading(true)
    try {
      const response = await fetch("/api/startups")
      const data = await response.json()

      if (data.success) {
        setStartups(data.data)
      }
    } catch (error) {
      console.error("Error fetching startups:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()

    if (!searchQuery.trim()) {
      return fetchStartups()
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/startups/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()

      if (data.success) {
        setStartups(data.data)
      }
    } catch (error) {
      console.error("Error searching startups:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Filter startups based on selected filters
  const filteredStartups = startups.filter((startup) => {
    const matchesIndustry = industry === "all" || startup.industry.toLowerCase().includes(industry.toLowerCase())
    const matchesStage = stage === "all" || (startup as any).stage?.toLowerCase().includes(stage.toLowerCase())
    return matchesIndustry && matchesStage
  })

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

      <main className="flex-1 container py-8 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Explore Startups</h1>
          <p className="text-muted-foreground">Discover innovative startups across various industries and stages</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search startups by name, industry, or funding status..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={isLoading} className="animate-pulse-theme">
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </form>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="ai">AI & Machine Learning</SelectItem>
                  <SelectItem value="health">HealthTech</SelectItem>
                  <SelectItem value="fintech">FinTech</SelectItem>
                  <SelectItem value="edtech">EdTech</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={stage} onValueChange={setStage}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="idea">Idea Stage</SelectItem>
                  <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                  <SelectItem value="seed">Seed</SelectItem>
                  <SelectItem value="series-a">Series A</SelectItem>
                  <SelectItem value="series-b">Series B+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="funded">Recently Funded</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Startups Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-muted-foreground">Loading startups...</p>
          </div>
        ) : filteredStartups.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredStartups.map((startup) => (
              <motion.div
                key={startup.id}
                variants={itemVariants}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow gradient-border"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="p-6 bg-background">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <LightbulbIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{startup.companyName}</h3>
                      <p className="text-sm text-muted-foreground">{startup.industry}</p>
                    </div>
                  </div>
                  <p className="text-sm mb-4">{startup.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Founded {startup.foundingYear}</span>
                    <Link href={`/startup/${startup.id}`}>
                      <Button variant="ghost" size="sm" className="gap-1 interactive-element">
                        View Profile
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-block p-4 rounded-full bg-muted mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No startups found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button onClick={fetchStartups}>View All Startups</Button>
          </div>
        )}
      </main>
    </div>
  )
}

