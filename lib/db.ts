// This is a mock database service for demonstration purposes
// In a real application, you would use a real database like PostgreSQL

interface User {
  id: string
  name: string
  email: string
  role: "startup" | "investor" | "mentor" | "distributor"
  createdAt: Date
}

interface Startup {
  id: string
  userId: string
  companyName: string
  website?: string
  foundingYear: string
  industry: string
  stage: string
  description: string
  teamSize: string
}

interface Investor {
  id: string
  userId: string
  firmName?: string
  website?: string
  investmentStage: string[]
  investmentSize: string
  sectors: string[]
  bio: string
}

// Mock database
const users: User[] = []
const startups: Startup[] = []
const investors: Investor[] = []

// User functions
export async function createUser(userData: Omit<User, "id" | "createdAt">): Promise<User> {
  const newUser: User = {
    id: `user_${Date.now()}`,
    ...userData,
    createdAt: new Date(),
  }

  users.push(newUser)
  return newUser
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  return users.find((user) => user.email === email)
}

export async function getUserById(id: string): Promise<User | undefined> {
  return users.find((user) => user.id === id)
}

// Startup functions
export async function createStartup(startupData: Omit<Startup, "id">): Promise<Startup> {
  const newStartup: Startup = {
    id: `startup_${Date.now()}`,
    ...startupData,
  }

  startups.push(newStartup)
  return newStartup
}

export async function getStartupByUserId(userId: string): Promise<Startup | undefined> {
  return startups.find((startup) => startup.userId === userId)
}

// Investor functions
export async function createInvestor(investorData: Omit<Investor, "id">): Promise<Investor> {
  const newInvestor: Investor = {
    id: `investor_${Date.now()}`,
    ...investorData,
  }

  investors.push(newInvestor)
  return newInvestor
}

export async function getInvestorByUserId(userId: string): Promise<Investor | undefined> {
  return investors.find((investor) => investor.userId === userId)
}

// Get all startups with pagination
export async function getAllStartups(page = 1, limit = 10): Promise<Startup[]> {
  const start = (page - 1) * limit
  const end = start + limit
  return startups.slice(start, end)
}

// Get all investors with pagination
export async function getAllInvestors(page = 1, limit = 10): Promise<Investor[]> {
  const start = (page - 1) * limit
  const end = start + limit
  return investors.slice(start, end)
}

// Search startups by name, industry, or stage
export async function searchStartups(query: string): Promise<Startup[]> {
  const lowercaseQuery = query.toLowerCase()
  return startups.filter(
    (startup) =>
      startup.companyName.toLowerCase().includes(lowercaseQuery) ||
      startup.industry.toLowerCase().includes(lowercaseQuery) ||
      startup.stage.toLowerCase().includes(lowercaseQuery),
  )
}

