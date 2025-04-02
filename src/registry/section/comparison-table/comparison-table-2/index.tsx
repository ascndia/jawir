"use client"

import * as React from "react"
import { Check, HelpCircle, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface Plan {
  id: string
  name: string
  monthlyPrice: number
  annualPrice: number
  description: string
  buttonText: string
  isRecommended?: boolean
}

interface Feature {
  id: string
  name: string
  category: string
  tooltip?: string
  plans: Record<string, boolean | string>
}

interface CategoryComparisonTableProps {
  plans: Plan[]
  features: Feature[]
  className?: string
}

function CategoryComparisonTable({ plans, features, className }: CategoryComparisonTableProps) {
  const [isAnnual, setIsAnnual] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")

  // Group features by category
  const categories = React.useMemo(() => {
    const categoriesMap: Record<string, Feature[]> = {}

    features.forEach((feature) => {
      if (!categoriesMap[feature.category]) {
        categoriesMap[feature.category] = []
      }
      categoriesMap[feature.category].push(feature)
    })

    return Object.entries(categoriesMap)
  }, [features])

  // Filter features based on search term
  const filteredCategories = React.useMemo(() => {
    if (!searchTerm.trim()) return categories

    return categories
      .map(([category, categoryFeatures]) => {
        const filteredFeatures = categoryFeatures.filter(
          (feature) =>
            feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            feature.category.toLowerCase().includes(searchTerm.toLowerCase()),
        )

        return filteredFeatures.length > 0 ? [category, filteredFeatures] : null
      })
      .filter(Boolean) as [string, Feature[]][]
  }, [categories, searchTerm])

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Label htmlFor="annual-billing" className="text-sm font-medium">
            Monthly
          </Label>
          <Switch id="annual-billing" checked={isAnnual} onCheckedChange={setIsAnnual} />
          <div className="flex items-center gap-1.5">
            <Label htmlFor="annual-billing" className="text-sm font-medium">
              Annual
            </Label>
            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
              Save 20%
            </Badge>
          </div>
        </div>

        <div className="relative w-full sm:w-64">
          <Input
            placeholder="Search features..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[250px]">Features</TableHead>
                {plans.map((plan) => (
                  <TableHead
                    key={plan.id}
                    className={cn("text-center min-w-[150px]", plan.isRecommended && "bg-primary/5")}
                  >
                    <div className="space-y-1.5 py-2">
                      {plan.isRecommended && <Badge className="bg-primary mb-1">Recommended</Badge>}
                      <div className="font-semibold">{plan.name}</div>
                      <div className="text-2xl font-bold">
                        ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                        <span className="text-sm font-normal text-muted-foreground">/mo</span>
                      </div>
                      {isAnnual && <div className="text-xs text-muted-foreground">billed annually</div>}
                      <div className="mt-2">
                        <Button size="sm" className="w-full" variant={plan.isRecommended ? "default" : "outline"}>
                          {plan.buttonText}
                        </Button>
                      </div>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map(([category, categoryFeatures], categoryIndex) => (
                <React.Fragment key={category}>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableCell colSpan={plans.length + 1} className="font-semibold py-2">
                      {category}
                    </TableCell>
                  </TableRow>
                  {categoryFeatures.map((feature, featureIndex) => (
                    <TableRow
                      key={feature.id}
                      className={cn(
                        featureIndex === categoryFeatures.length - 1 &&
                          categoryIndex !== filteredCategories.length - 1 &&
                          "border-b-4",
                      )}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-1.5">
                          {feature.name}
                          {feature.tooltip && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                  <p className="max-w-xs">{feature.tooltip}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </TableCell>
                      {plans.map((plan) => (
                        <TableCell
                          key={`${feature.id}-${plan.id}`}
                          className={cn("text-center", plan.isRecommended && "bg-primary/5")}
                        >
                          {renderFeatureValue(feature.plans[plan.id])}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No features match your search. Try a different term.
        </div>
      )}

      <div className="text-center text-sm text-muted-foreground">
        <p>All plans include 24/7 basic support and access to our community forums.</p>
        <p className="mt-1">
          Need a custom enterprise solution?{" "}
          <a href="#" className="underline font-medium text-primary">
            Contact our sales team
          </a>
          .
        </p>
      </div>
    </div>
  )
}

function renderFeatureValue(value: boolean | string | undefined) {
  if (value === undefined) return null

  if (typeof value === "boolean") {
    return value ? <Check className="h-5 w-5 mx-auto text-green-500" /> : <X className="h-5 w-5 mx-auto text-red-500" />
  }

  if (typeof value === "string" && value.startsWith("limited:")) {
    const limitText = value.replace("limited:", "")
    return (
      <div className="flex flex-col items-center gap-1">
        <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
          Limited
        </Badge>
        <span className="text-xs">{limitText}</span>
      </div>
    )
  }

  return <span>{value}</span>
}

export function ComparisonTable2A() {
  // Sample plans data
  const plans = [
    {
      id: "starter",
      name: "Starter",
      monthlyPrice: 9,
      annualPrice: 7,
      description: "For individuals and small projects",
      buttonText: "Get Started",
    },
    {
      id: "pro",
      name: "Professional",
      monthlyPrice: 29,
      annualPrice: 23,
      description: "For growing teams and businesses",
      buttonText: "Try Pro",
      isRecommended: true,
    },
    {
      id: "business",
      name: "Business",
      monthlyPrice: 79,
      annualPrice: 63,
      description: "For larger organizations",
      buttonText: "Choose Business",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      monthlyPrice: 199,
      annualPrice: 159,
      description: "Custom solutions for large enterprises",
      buttonText: "Contact Sales",
    },
  ]

  // Sample features data with categories
  const features = [
    // Core Features
    {
      id: "projects",
      name: "Projects",
      category: "Core Features",
      tooltip: "Number of projects you can create",
      plans: {
        starter: "3",
        pro: "15",
        business: "50",
        enterprise: "Unlimited",
      },
    },
    {
      id: "storage",
      name: "Storage",
      category: "Core Features",
      tooltip: "Total storage for your files and assets",
      plans: {
        starter: "5GB",
        pro: "50GB",
        business: "250GB",
        enterprise: "1TB",
      },
    },
    {
      id: "team-members",
      name: "Team Members",
      category: "Core Features",
      tooltip: "Number of users who can access your workspace",
      plans: {
        starter: "1",
        pro: "10",
        business: "25",
        enterprise: "Unlimited",
      },
    },

    // Collaboration
    {
      id: "team-roles",
      name: "Team Roles & Permissions",
      category: "Collaboration",
      tooltip: "Assign different roles and permissions to team members",
      plans: {
        starter: false,
        pro: "limited:Basic roles",
        business: true,
        enterprise: true,
      },
    },
    {
      id: "shared-workspaces",
      name: "Shared Workspaces",
      category: "Collaboration",
      tooltip: "Create separate workspaces for different teams or projects",
      plans: {
        starter: false,
        pro: true,
        business: true,
        enterprise: true,
      },
    },
    {
      id: "guest-access",
      name: "Guest Access",
      category: "Collaboration",
      tooltip: "Invite external users with limited access",
      plans: {
        starter: false,
        pro: "limited:5 guests",
        business: "limited:20 guests",
        enterprise: "Unlimited",
      },
    },

    // Security
    {
      id: "sso",
      name: "Single Sign-On (SSO)",
      category: "Security & Compliance",
      tooltip: "Authenticate using your identity provider",
      plans: {
        starter: false,
        pro: false,
        business: true,
        enterprise: true,
      },
    },
    {
      id: "audit-logs",
      name: "Audit Logs",
      category: "Security & Compliance",
      tooltip: "Track user activity and system events",
      plans: {
        starter: false,
        pro: "limited:30 days",
        business: "limited:90 days",
        enterprise: "1 year",
      },
    },
    {
      id: "data-encryption",
      name: "Advanced Encryption",
      category: "Security & Compliance",
      tooltip: "End-to-end encryption for sensitive data",
      plans: {
        starter: false,
        pro: false,
        business: true,
        enterprise: true,
      },
    },

    // Support
    {
      id: "support-response",
      name: "Support Response Time",
      category: "Support & Services",
      tooltip: "Guaranteed response time for support requests",
      plans: {
        starter: "48 hours",
        pro: "24 hours",
        business: "8 hours",
        enterprise: "4 hours",
      },
    },
    {
      id: "dedicated-support",
      name: "Dedicated Support Manager",
      category: "Support & Services",
      tooltip: "A dedicated point of contact for all support needs",
      plans: {
        starter: false,
        pro: false,
        business: false,
        enterprise: true,
      },
    },
    {
      id: "training",
      name: "Training Sessions",
      category: "Support & Services",
      tooltip: "Live training sessions for your team",
      plans: {
        starter: false,
        pro: "limited:1 session",
        business: "limited:3 sessions",
        enterprise: "Unlimited",
      },
    },
  ]

  return (
    <main className="container mx-auto py-12 px-4">
      <div className="mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Compare Plans</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Find the perfect plan for your needs. All plans include our core platform features, updates, and community
            support.
          </p>
        </div>

        <CategoryComparisonTable plans={plans} features={features} />
      </div>
    </main>
  )
}

