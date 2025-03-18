import { NextResponse } from "next/server"

// Mock database of startups with more detailed information
const startupDatabase = [
  {
    id: "1",
    companyName: "TechInnovate 1",
    logo: "/placeholder.svg?height=100&width=100",
    industry: "AI & Machine Learning",
    foundingYear: "2023",
    description: "Revolutionizing business intelligence with AI-powered analytics and insights.",
    longDescription:
      "TechInnovate is at the forefront of AI-driven business intelligence. Our platform uses advanced machine learning algorithms to analyze vast amounts of data and provide actionable insights for businesses of all sizes. We're committed to making AI accessible and useful for everyday business decisions.",
    website: "https://techinnovate1.example.com",
    location: "Hyderabad, India",
    teamSize: "10-20",
    fundingStage: "Seed",
    fundingAmount: "$1.2M",
    founders: [
      {
        name: "Arjun Sharma",
        role: "CEO & Co-founder",
        linkedin: "https://linkedin.com/in/example",
        bio: "Former AI researcher with 10+ years of experience in machine learning and data science.",
      },
      {
        name: "Priya Patel",
        role: "CTO & Co-founder",
        linkedin: "https://linkedin.com/in/example",
        bio: "Ex-Google engineer specializing in scalable AI systems and cloud architecture.",
      },
    ],
    investors: ["Venture Capital 1", "Angel Investor Group"],
    highlights: [
      "Selected for Y Combinator W2023 batch",
      "Grew user base by 300% in 6 months",
      "Processing over 1 million data points daily",
    ],
  },
  {
    id: "2",
    companyName: "TechInnovate 2",
    logo: "/placeholder.svg?height=100&width=100",
    industry: "HealthTech",
    foundingYear: "2022",
    description: "Transforming healthcare delivery with AI-powered diagnostic tools.",
    longDescription:
      "TechInnovate 2 is developing cutting-edge diagnostic tools that leverage artificial intelligence to improve accuracy and reduce time to diagnosis. Our platform integrates with existing healthcare systems to provide seamless support for medical professionals, ultimately improving patient outcomes and reducing healthcare costs.",
    website: "https://techinnovate2.example.com",
    location: "Hyderabad, India",
    teamSize: "5-10",
    fundingStage: "Pre-Seed",
    fundingAmount: "$500K",
    founders: [
      {
        name: "Dr. Rajesh Kumar",
        role: "CEO & Founder",
        linkedin: "https://linkedin.com/in/example",
        bio: "Cardiologist with 15+ years of clinical experience and a passion for healthcare innovation.",
      },
      {
        name: "Ananya Singh",
        role: "COO & Co-founder",
        linkedin: "https://linkedin.com/in/example",
        bio: "Healthcare operations expert with experience scaling healthcare startups across India.",
      },
    ],
    investors: ["Health Ventures", "Impact Fund"],
    highlights: [
      "FDA approval in progress",
      "Pilot programs in 5 major hospitals",
      "Reduced diagnostic time by 60% in initial tests",
    ],
  },
  {
    id: "3",
    companyName: "TechInnovate 3",
    logo: "/placeholder.svg?height=100&width=100",
    industry: "FinTech",
    foundingYear: "2021",
    description: "Democratizing access to financial services through innovative technology.",
    longDescription:
      "TechInnovate 3 is building a comprehensive financial platform that makes banking, investing, and financial planning accessible to everyone. Our mobile-first approach and intuitive interface remove barriers to financial inclusion, while our AI-powered recommendations help users make better financial decisions based on their unique circumstances and goals.",
    website: "https://techinnovate3.example.com",
    location: "Hyderabad, India",
    teamSize: "20-50",
    fundingStage: "Series A",
    fundingAmount: "$8M",
    founders: [
      {
        name: "Vikram Mehta",
        role: "CEO & Co-founder",
        linkedin: "https://linkedin.com/in/example",
        bio: "Former investment banker with a mission to make financial services accessible to all.",
      },
      {
        name: "Neha Gupta",
        role: "CTO & Co-founder",
        linkedin: "https://linkedin.com/in/example",
        bio: "Fintech developer who previously built payment systems used by millions.",
      },
    ],
    investors: ["Fintech Capital", "Global Ventures", "Tech Fund II"],
    highlights: [
      "500,000+ active users",
      "Processing ₹100 crore in transactions monthly",
      "Expanded to 3 countries in Southeast Asia",
    ],
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const startup = startupDatabase.find((s) => s.id === id)

    if (!startup) {
      return NextResponse.json({ error: "Startup not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: startup,
    })
  } catch (error) {
    console.error("Error fetching startup:", error)
    return NextResponse.json({ error: "Failed to fetch startup details" }, { status: 500 })
  }
}

