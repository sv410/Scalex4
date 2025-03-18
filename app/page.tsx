"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, useAnimation, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { SmoothBackground } from "@/components/smooth-background"
import { FloatingParticles } from "@/components/floating-particles"
import { ArrowRight, Search, TrendingUp, Users, Briefcase, LightbulbIcon, HelpCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  // Refs for scroll animations
  const heroRef = useRef(null)
  const featuredRef = useRef(null)
  const howItWorksRef = useRef(null)
  const faqRef = useRef(null)
  const ctaRef = useRef(null)

  // Check if elements are in view
  const heroInView = useInView(heroRef, { once: true })
  const featuredInView = useInView(featuredRef, { once: true, margin: "-100px" })
  const howItWorksInView = useInView(howItWorksRef, { once: true, margin: "-100px" })
  const faqInView = useInView(faqRef, { once: true, margin: "-100px" })
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" })

  // Animation controls
  const heroControls = useAnimation()
  const featuredControls = useAnimation()
  const howItWorksControls = useAnimation()
  const faqControls = useAnimation()
  const ctaControls = useAnimation()

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsSearching(true)
      router.push(`/explore?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  // FAQ data
  const faqItems = [
    {
      question: "What is ScaleX4?",
      answer:
        "ScaleX4 is a social network and marketplace designed specifically for startups, investors, and innovators. Our platform helps startups connect with investors, find mentors, exchange technology, and access new markets.",
    },
    {
      question: "How can ScaleX4 help my startup?",
      answer:
        "ScaleX4 helps your startup by providing access to investors, mentors, and potential business partners. You can showcase your products, find collaborators, access resources, and connect with others working in similar areas.",
    },
    {
      question: "Is ScaleX4 free to use?",
      answer:
        "ScaleX4 offers a free basic membership with limited features. We also offer premium plans with additional benefits for startups and investors who want to maximize their experience on the platform.",
    },
    {
      question: "How do I find investors on ScaleX4?",
      answer:
        "You can search for investors based on their investment preferences, sectors of interest, and typical investment size. Our platform makes it easy to connect with investors who are actively looking for opportunities in your industry.",
    },
  ]

  // Create shooting stars effect
  useEffect(() => {
    const createShootingStars = () => {
      const container = document.getElementById("shooting-stars-container")
      if (!container) return

      // Clear existing stars
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }

      // Create new stars
      const starCount = Math.floor(window.innerWidth / 500) // Reduced density

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div")
        star.className = "shooting-star"

        // Random position, size and delay
        const size = Math.random() * 80 + 30
        const posY = Math.random() * 100
        const delay = Math.random() * 20
        const duration = Math.random() * 3 + 3

        star.style.width = `${size}px`
        star.style.top = `${posY}%`
        star.style.animationDelay = `${delay}s`
        star.style.animationDuration = `${duration}s`

        container.appendChild(star)
      }
    }

    createShootingStars()
    window.addEventListener("resize", createShootingStars)

    return () => {
      window.removeEventListener("resize", createShootingStars)
    }
  }, [])

  // Trigger animations when elements come into view
  useEffect(() => {
    if (heroInView) {
      heroControls.start({ opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } })
    }
    if (featuredInView) {
      featuredControls.start({ opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } })
    }
    if (howItWorksInView) {
      howItWorksControls.start({ opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } })
    }
    if (faqInView) {
      faqControls.start({ opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } })
    }
    if (ctaInView) {
      ctaControls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } })
    }
  }, [
    heroInView,
    featuredInView,
    howItWorksInView,
    faqInView,
    ctaInView,
    heroControls,
    featuredControls,
    howItWorksControls,
    faqControls,
    ctaControls,
  ])

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="fixed inset-0 theme-gradient -z-10"></div>
      <div id="shooting-stars-container" className="fixed inset-0 pointer-events-none z-0"></div>
      <SmoothBackground />
      <FloatingParticles />

      {/* Navigation */}
      <header className="border-b relative z-10 bg-background/80 backdrop-blur-sm">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <TrendingUp className="h-6 w-6 text-primary" />
            </motion.div>
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl font-bold"
            >
              ScaleX4
            </motion.span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Link
                href="/about"
                className="text-sm font-medium hover:text-primary interactive-element px-3 py-2 rounded-md"
              >
                About
              </Link>
            </motion.div>
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Link
                href="/explore"
                className="text-sm font-medium hover:text-primary interactive-element px-3 py-2 rounded-md"
              >
                Explore
              </Link>
            </motion.div>
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Link
                href="/contact"
                className="text-sm font-medium hover:text-primary interactive-element px-3 py-2 rounded-md"
              >
                Contact
              </Link>
            </motion.div>
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Link
                href="/faq"
                className="text-sm font-medium hover:text-primary interactive-element px-3 py-2 rounded-md"
              >
                FAQ
              </Link>
            </motion.div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Log in
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/signup">
                <Button size="sm">Sign up</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          initial={{ opacity: 0, y: 20 }}
          animate={heroControls}
          className="relative py-20 bg-background/80 backdrop-blur-sm overflow-hidden"
        >
          <div className="container flex flex-col items-center text-center relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl"
            >
              Where Startups, Investors & Innovators Connect
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground max-w-2xl"
            >
              Discover opportunities, exchange technology, seek mentorship, and connect with the right people to grow
              your venture.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link href="/signup?role=startup">
                <Button size="lg" className="w-full sm:w-auto hover-glow glow">
                  Join as a Startup
                </Button>
              </Link>
              <Link href="/signup?role=investor">
                <Button size="lg" variant="outline" className="w-full sm:w-auto hover-glow">
                  Join as an Investor
                </Button>
              </Link>
              <Link href="/explore">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto hover-glow">
                  Explore Startups
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Search Bar */}
        <section className="py-12 border-b bg-background/80 backdrop-blur-sm">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search startups by name, category, or funding status..."
                    className="w-full pl-10 pr-4 py-3 rounded-l-lg border focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" className="rounded-l-none" disabled={isSearching}>
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Featured Startups & Investors */}
        <motion.section
          ref={featuredRef}
          initial={{ opacity: 0, y: 40 }}
          animate={featuredControls}
          className="py-16 bg-background/80 backdrop-blur-sm"
        >
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: featuredInView ? 1 : 0, y: featuredInView ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-8"
            >
              Featured Startups
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: featuredInView ? 1 : 0, y: featuredInView ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow gradient-border"
                >
                  <div className="p-6 bg-background">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <LightbulbIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">TechInnovate {i}</h3>
                        <p className="text-sm text-muted-foreground">AI & Machine Learning</p>
                      </div>
                    </div>
                    <p className="text-sm mb-4">
                      Revolutionizing business intelligence with AI-powered analytics and insights.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Founded 2023</span>
                      <Link href={`/startup/${i}`}>
                        <Button variant="ghost" size="sm" className="gap-1 interactive-element">
                          View Profile
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: featuredInView ? 1 : 0, y: featuredInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-3xl font-bold mt-16 mb-8"
            >
              Investor Spotlight
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: featuredInView ? 1 : 0, y: featuredInView ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow gradient-border"
                >
                  <div className="p-6 bg-background">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Venture Capital {i}</h3>
                        <p className="text-sm text-muted-foreground">Early Stage, Series A</p>
                      </div>
                    </div>
                    <p className="text-sm mb-4">
                      Investing in disruptive technologies and innovative business models across sectors.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">20+ Investments</span>
                      <Link href={`/investor/${i}`}>
                        <Button variant="ghost" size="sm" className="gap-1 interactive-element">
                          View Profile
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section
          ref={howItWorksRef}
          initial={{ opacity: 0, y: 40 }}
          animate={howItWorksControls}
          className="py-16 bg-background/80 backdrop-blur-sm"
        >
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: howItWorksInView ? 1 : 0, y: howItWorksInView ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-center mb-12"
            >
              How It Works
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: howItWorksInView ? 1 : 0, y: howItWorksInView ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col items-center text-center interactive-element p-6 rounded-lg hover-glow floating-element"
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Step 1</h3>
                <p>Register as Startup, Investor, or Distributor</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: howItWorksInView ? 1 : 0, y: howItWorksInView ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center text-center interactive-element p-6 rounded-lg hover-glow floating-element"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <LightbulbIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Step 2</h3>
                <p>Create Your Profile</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: howItWorksInView ? 1 : 0, y: howItWorksInView ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-center text-center interactive-element p-6 rounded-lg hover-glow floating-element"
                style={{ animationDelay: "1s" }}
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Step 3</h3>
                <p>Connect, Chat, and Grow</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          ref={faqRef}
          initial={{ opacity: 0, y: 40 }}
          animate={faqControls}
          className="py-16 bg-background/80 backdrop-blur-sm"
        >
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: faqInView ? 1 : 0, y: faqInView ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Find answers to common questions about ScaleX4</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: faqInView ? 1 : 0, y: faqInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              <Accordion type="single" collapsible className="border rounded-lg overflow-hidden">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="px-6 hover:no-underline hover:bg-muted/50 text-primary hover:text-primary">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: faqInView ? 1 : 0, y: faqInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center mt-8"
            >
              <Link href="/faq">
                <Button variant="outline" className="gap-2">
                  <HelpCircle className="h-4 w-4" />
                  View All FAQs
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Footer */}
        <motion.section
          ref={ctaRef}
          initial={{ opacity: 0, y: 40 }}
          animate={ctaControls}
          className="py-16 theme-gradient text-white"
        >
          <div className="container text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: ctaInView ? 1 : 0, y: ctaInView ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-4"
            >
              Ready to Scale Your Startup?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: ctaInView ? 1 : 0, y: ctaInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg mb-8 max-w-2xl mx-auto"
            >
              Join our community of innovators, investors, and industry experts today.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: ctaInView ? 1 : 0, y: ctaInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="animate-pulse-theme glow">
                  Sign Up Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <footer className="border-t py-6 relative z-10 bg-background/80 backdrop-blur-sm">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="font-semibold">ScaleX4</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ScaleX4 Hyderabad. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

