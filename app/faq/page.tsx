"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { TrendingUp, ArrowRight } from "lucide-react"

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

// FAQ data
const faqCategories = [
  {
    title: "General Questions",
    items: [
      {
        question: "What is ScaleX4?",
        answer:
          "ScaleX4 is a social network and marketplace designed specifically for startups, investors, and innovators. Our platform helps startups connect with investors, find mentors, exchange technology, and access new markets.",
      },
      {
        question: "Who can join ScaleX4?",
        answer:
          "ScaleX4 is open to startup founders, co-founders, investors, mentors, and business partners. We welcome participants from all industries and stages, from idea-stage startups to established companies looking for growth opportunities.",
      },
      {
        question: "Is ScaleX4 free to use?",
        answer:
          "ScaleX4 offers a free basic membership with limited features. We also offer premium plans with additional benefits for startups and investors who want to maximize their experience on the platform.",
      },
      {
        question: "How is ScaleX4 different from other networking platforms?",
        answer:
          "Unlike general professional networks, ScaleX4 is specifically designed for the startup ecosystem. We focus on meaningful connections between startups and investors, provide specialized tools for startup growth, and offer a marketplace for technology exchange.",
      },
    ],
  },
  {
    title: "For Startups",
    items: [
      {
        question: "How can ScaleX4 help my startup?",
        answer:
          "ScaleX4 helps your startup by providing access to investors, mentors, and potential business partners. You can showcase your products, find collaborators, access resources, and connect with others working in similar areas.",
      },
      {
        question: "What information should I include in my startup profile?",
        answer:
          "Your startup profile should include your company name, industry, founding year, team size, funding stage, a compelling description of your product or service, and your current needs (investment, partnerships, mentorship, etc.).",
      },
      {
        question: "Can I find investors on ScaleX4?",
        answer:
          "Yes, ScaleX4 connects startups with investors who are actively looking for investment opportunities. You can search for investors based on their investment preferences, sectors of interest, and typical investment size.",
      },
      {
        question: "How do I showcase my startup's technology on ScaleX4?",
        answer:
          "You can create detailed listings of your technology offerings in the ScaleX4 marketplace. This allows other startups to discover and potentially license or purchase your technology, creating additional revenue streams.",
      },
    ],
  },
  {
    title: "For Investors",
    items: [
      {
        question: "How can I find startups to invest in on ScaleX4?",
        answer:
          "ScaleX4 provides advanced search and filtering tools to help you discover startups that match your investment criteria. You can filter by industry, stage, location, and more to find the perfect investment opportunities.",
      },
      {
        question: "Can I connect with other investors on ScaleX4?",
        answer:
          "Yes, ScaleX4 allows investors to connect with each other to share insights, co-invest in promising startups, and expand their networks within the investment community.",
      },
      {
        question: "How do I set up my investor profile?",
        answer:
          "Your investor profile should include information about your investment focus (stages, sectors, typical check size), your firm (if applicable), and your investment philosophy. This helps startups understand if you might be a good fit for their funding needs.",
      },
      {
        question: "Is my investment information kept private?",
        answer:
          "Yes, ScaleX4 takes privacy seriously. You control what information is visible on your profile, and sensitive investment details are only shared with startups you choose to connect with.",
      },
    ],
  },
]

export default function FAQPage() {
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 animated-gradient">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gold">Frequently Asked Questions</h1>
              <p className="text-xl text-white">Find answers to common questions about ScaleX4</p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <motion.div key={categoryIndex} variants={itemVariants}>
                  <h2 className="text-2xl font-bold mb-6 text-fiery-orange">{category.title}</h2>
                  <Accordion type="single" collapsible className="border rounded-lg overflow-hidden">
                    {category.items.map((item, itemIndex) => (
                      <AccordionItem key={itemIndex} value={`item-${categoryIndex}-${itemIndex}`}>
                        <AccordionTrigger className="px-6 hover:no-underline hover:bg-muted/50 text-teal hover:text-cyan">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-muted-foreground">{item.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-16 text-center"
            >
              <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">
                If you couldn't find the answer to your question, feel free to contact us directly.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-fiery-orange hover:bg-gold text-white">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

