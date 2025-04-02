"use client";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Feature {
  name: string
  description?: string
  basic: boolean | string
  pro: boolean | string
  enterprise: boolean | string
}

interface ComparisonTableProps {
  features: Feature[]
  caption?: string
}

function ComparisonTable({ features, caption = "Compare our plans and features" }: ComparisonTableProps) {
  return (
    <div className="w-full overflow-auto">
      <Table>
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Feature</TableHead>
            <TableHead className="text-center">Basic</TableHead>
            <TableHead className="text-center">Pro</TableHead>
            <TableHead className="text-center">Enterprise</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature) => (
            <TableRow key={feature.name}>
              <TableCell className="font-medium">
                {feature.name}
                {feature.description && <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>}
              </TableCell>
              <TableCell className="text-center">{renderFeatureValue(feature.basic)}</TableCell>
              <TableCell className="text-center">{renderFeatureValue(feature.pro)}</TableCell>
              <TableCell className="text-center">{renderFeatureValue(feature.enterprise)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function renderFeatureValue(value: boolean | string) {
  if (typeof value === "boolean") {
    return value ? <Check className="h-5 w-5 mx-auto text-green-500" /> : <X className="h-5 w-5 mx-auto text-red-500" />
  }

  if (value.startsWith("limited:")) {
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

  return value
}


export function ComparisonTable1A() {
  // Sample features data
  const features = [
    {
      name: "Number of Projects",
      description: "Total projects you can create",
      basic: "3",
      pro: "Unlimited",
      enterprise: "Unlimited",
    },
    {
      name: "Team Members",
      description: "Collaborate with your team",
      basic: "1",
      pro: "10",
      enterprise: "Unlimited",
    },
    {
      name: "Analytics",
      basic: false,
      pro: true,
      enterprise: true,
    },
    {
      name: "Custom Domain",
      basic: false,
      pro: true,
      enterprise: true,
    },
    {
      name: "API Access",
      basic: "limited:100 req/day",
      pro: "limited:10,000 req/day",
      enterprise: "Unlimited",
    },
    {
      name: "24/7 Support",
      basic: false,
      pro: false,
      enterprise: true,
    },
    {
      name: "Storage",
      basic: "5GB",
      pro: "50GB",
      enterprise: "500GB",
    },
  ]

  return (
    <main className="container mx-auto py-12 px-4">
      <div className="mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Compare Plans</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include our core features.
          </p>
        </div>

        <ComparisonTable features={features} />

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>All plans include automatic updates and basic support.</p>
          <p className="mt-1">
            For custom enterprise solutions, please{" "}
            <a href="#" className="underline font-medium">
              contact our sales team
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  )
}


