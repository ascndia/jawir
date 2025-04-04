"use client"

import { useState } from "react"
import { Check, X, ExternalLink, AlertCircle } from "lucide-react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface DialogExceeded1AProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}
export function DialogExceeded1A({
    open,
    onOpenChange,
}: DialogExceeded1AProps) {

  const plans = [
    {
      name: "Basic",
      price: "$9",
      description: "Perfect for individuals and small projects",
      features: ["50 requests per day", "Basic support", "1 project", "Standard response time"],
      popular: false,
      buttonVariant: "outline" as const,
    },
    {
      name: "Pro",
      price: "$19",
      description: "Ideal for professionals and growing teams",
      features: [
        "500 requests per day",
        "Priority support",
        "5 projects",
        "Faster response time",
        "Advanced analytics",
      ],
      popular: true,
      buttonVariant: "default" as const,
    },
    {
      name: "Enterprise",
      price: "$49",
      description: "For large teams with advanced needs",
      features: [
        "Unlimited requests",
        "24/7 dedicated support",
        "Unlimited projects",
        "Instant response time",
        "Custom integrations",
        "Team collaboration tools",
      ],
      popular: false,
      buttonVariant: "outline" as const,
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent style={{ maxWidth: "900px", maxHeight: "100dvh" }} className="w-full h-full sm:h-auto sm:max-h-[85vh] p-0 sm:p-6 overflow-auto">
        <div className="p-4 sm:p-0">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">You've Reached Your Free Quota</DialogTitle>
            <DialogDescription className="text-center text-base">
              Upgrade to a premium plan to continue using our services without interruption.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 pt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 right-4 bg-primary text-primary-foreground">Most Popular</Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-sm"> / month</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant={plan.buttonVariant} className="w-full">
                    {plan.popular ? "Upgrade Now" : "Select Plan"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-6 mb-4 sm:mb-0">
            <Button variant="ghost" size="sm" onClick={() => onOpenChange?.(false)}>
              <X className="h-4 w-4 mr-2" />
              Maybe Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


interface DialogLimitReachedProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function DialogExceeded1B({
  open,
  onOpenChange,
}: DialogLimitReachedProps) {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "For getting started.",
      features: [
        "Generate content with v0",
        "Share and publish chats",
        "Up to 200 projects",
        "Deploy apps to Vercel",
      ],
      current: true,
    },
    {
      name: "Premium",
      price: "$20",
      description: "For power users.",
      features: [
        "Higher message limits",
        "Access to premium models",
        "Priority support",
        "Advanced features",
      ],
      current: false,
    },
    {
      name: "Ultra",
      price: "$50",
      description: "For professionals.",
      features: [
        "Highest message limits",
        "Access to all models",
        "Dedicated support",
        "Early access to new features",
      ],
      current: false,
    },
    {
      name: "Team",
      price: "Custom",
      description: "For collaborative work.",
      features: [
        "Shared workspace",
        "Team management tools",
        "Centralized billing",
        "Custom integrations",
      ],
      current: false,
    },
    {
      name: "Enterprise",
      price: "Contact Us",
      description: "For large organizations.",
      features: [
        "Volume discounts",
        "SLA guarantees",
        "On-premise options",
        "Dedicated account manager",
      ],
      current: false,
    },
  ]

  const [selectedPlan, setSelectedPlan] = useState("Free")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col flex-grow p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl font-semibold">Message Limit Reached</DialogTitle>
          <DialogDescription>
            You have reached the message limit on the {selectedPlan} plan.
            Upgrade for higher message limits.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto px-6 pb-6 min-h-0">
          <Tabs defaultValue="Free" className="w-full" onValueChange={setSelectedPlan}>
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 h-auto mb-4">
              {plans.map((plan) => (
                <TabsTrigger key={plan.name} value={plan.name} className="text-xs sm:text-sm">
                  {plan.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {plans.map((plan) => (
              <TabsContent key={plan.name} value={plan.name}>
                <Card className="p-2 pb-4 px-4 flex flex-col h-full shadow-none">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <CardDescription>
                      <span className="text-2xl font-bold">{plan.price}</span>
                      {plan.price !== "Custom" && plan.price !== "Contact Us" && (
                        <span className="text-sm"> / month</span>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 flex-grow">
                    <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
          <div className="mt-6 text-sm">
            Compare plans and options on our{" "}
            <Link href="/pricing" className="text-primary underline hover:no-underline">
              pricing page <ExternalLink className="inline-block h-3 w-3 ml-0.5" />
            </Link>
          </div>
        </div>
        <DialogFooter className="p-6 pt-4 border-t bg-background flex-shrink-0">
          <Button variant="outline" onClick={() => onOpenChange?.(false)}>
            Cancel
          </Button>
          <Button disabled={plans.find(p => p.name === selectedPlan)?.current}>
            {plans.find(p => p.name === selectedPlan)?.current ? "Current Plan" : "Upgrade Plan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DialogExceeded1C({
  open,
  onOpenChange,
}: DialogLimitReachedProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center bg-red-100 dark:bg-red-900/20 p-3 rounded-full mb-4">
            <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-500" />
          </div>
          <DialogTitle className="text-xl font-semibold">Email functionality affected</DialogTitle>
          <DialogDescription className="text-base pt-2">
            Your account is out of storage space. You can no longer send or receive emails until you free up space or upgrade your storage plan.
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-4 my-2 bg-muted/50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Current usage</span>
            <span className="text-sm text-muted-foreground">100% full</span>
          </div>
          <div className="w-full h-2 bg-muted rounded overflow-hidden">
            <div className="h-full bg-red-500 w-full"></div>
          </div>
          <p className="text-sm mt-4 text-muted-foreground">
            Upgrade to our <span className="font-medium">Premium Plan</span> for just <span className="font-medium">$5.99/month</span> and get 100GB of storage.
          </p>
        </div>

        <DialogFooter className="flex sm:flex-col gap-2 mt-2">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange?.(false)} 
            className="flex-1 sm:flex-none"
          >
            Clean up space
          </Button>
          <Button 
            className="flex-1 sm:flex-none"
            onClick={() => onOpenChange?.(false)} 
          >
            Get more storage
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DialogExceeded1D({
  open,
  onOpenChange,
}: DialogLimitReachedProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <DialogTitle>Not enough storage</DialogTitle>
          <DialogDescription>
            To make room, get storage or remove items from your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center gap-4 mt-4">
          <Button variant="outline" onClick={() => onOpenChange?.(false)}>
            Clean up space
          </Button>
          <Button onClick={() => onOpenChange?.(false)}>Get storage</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DialogExceeded1E({
  open,
  onOpenChange,
}: DialogLimitReachedProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Storage Limit Reached</DialogTitle>
          <DialogDescription>
            Your account has run out of storage space.
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-3 my-2 bg-muted/50 rounded">
          <div className="flex justify-between items-center mb-2">
            <span>Storage</span>
            <span className="text-sm">100% full</span>
          </div>
          <div className="w-full h-2 bg-muted rounded">
            <div className="h-full bg-red-500 w-full"></div>
          </div>
          <p className="text-sm mt-3">
            Upgrade to Premium: $5.99/month for 100GB
          </p>
        </div>

        <DialogFooter className="flex gap-2 mt-2">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange?.(false)} 
            className="flex-1"
          >
            Clean up
          </Button>
          <Button 
            className="flex-1"
            onClick={() => onOpenChange?.(false)} 
          >
            Upgrade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}