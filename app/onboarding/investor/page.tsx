"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { TrendingUp, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const investorSchema = z.object({
  firmName: z.string().min(2, { message: "Firm name is required" }).optional().or(z.literal("")),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  investmentStage: z.array(z.string()).min(1, { message: "Please select at least one investment stage" }),
  investmentSize: z.string().min(1, { message: "Please select your typical investment size" }),
  sectors: z.array(z.string()).min(1, { message: "Please select at least one sector" }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters" }),
})

export default function InvestorOnboardingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof investorSchema>>({
    resolver: zodResolver(investorSchema),
    defaultValues: {
      firmName: "",
      website: "",
      investmentStage: [],
      investmentSize: "",
      sectors: [],
      bio: "",
    },
  })

  async function onSubmit(values: z.infer<typeof investorSchema>) {
    setIsLoading(true)

    try {
      // In a real application, this would be an API call to your backend
      console.log("Investor onboarding form submitted:", values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Onboarding error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const investmentStages = [
    { id: "idea", label: "Idea Stage" },
    { id: "pre-seed", label: "Pre-Seed" },
    { id: "seed", label: "Seed" },
    { id: "series-a", label: "Series A" },
    { id: "series-b", label: "Series B" },
    { id: "growth", label: "Growth Stage" },
  ]

  const sectors = [
    { id: "tech", label: "Technology" },
    { id: "healthcare", label: "Healthcare" },
    { id: "fintech", label: "Fintech" },
    { id: "ecommerce", label: "E-commerce" },
    { id: "edtech", label: "Edtech" },
    { id: "biotech", label: "Biotech" },
    { id: "cleantech", label: "Cleantech" },
    { id: "ai", label: "Artificial Intelligence" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="font-semibold">ScaleX4</span>
          </Link>
          <Link href="/signup">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex-1 container max-w-3xl py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Complete your investor profile</h1>
            <p className="text-muted-foreground mt-2">
              Tell us more about your investment preferences to help us connect you with the right startups
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="firmName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firm Name (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your firm name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://yourfirm.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="investmentSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Typical Investment Size</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select investment size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="<50k">Less than $50K</SelectItem>
                        <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                        <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                        <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                        <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                        <SelectItem value=">5m">More than $5M</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="investmentStage"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Investment Stages</FormLabel>
                      <FormDescription>Select all the stages you typically invest in</FormDescription>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {investmentStages.map((stage) => (
                        <FormField
                          key={stage.id}
                          control={form.control}
                          name="investmentStage"
                          render={({ field }) => {
                            return (
                              <FormItem key={stage.id} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(stage.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, stage.id])
                                        : field.onChange(field.value?.filter((value) => value !== stage.id))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{stage.label}</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sectors"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Sectors of Interest</FormLabel>
                      <FormDescription>Select all the sectors you're interested in</FormDescription>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {sectors.map((sector) => (
                        <FormField
                          key={sector.id}
                          control={form.control}
                          name="sectors"
                          render={({ field }) => {
                            return (
                              <FormItem key={sector.id} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(sector.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, sector.id])
                                        : field.onChange(field.value?.filter((value) => value !== sector.id))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{sector.label}</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell startups about yourself, your investment philosophy, and what you look for in startups..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This will be displayed on your profile and help startups understand your investment approach.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading} className="gap-2">
                  {isLoading ? "Saving..." : "Complete Profile"}
                  {!isLoading && <ArrowRight className="h-4 w-4" />}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

