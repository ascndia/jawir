import { Plus, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CardPricing2A() {
  return (
      <Card className="">
        {/* Purple header section */}
        <div className="p-3 overflow-hidden rounded-xl">
        <div className="bg-primary rounded-xl text-primary-foreground p-6 relative">
          {/* Star/plus icon in circle */}
          <div className="absolute top-6 left-6 bg-primary-foreground/20 rounded-full p-2">
            <Plus className="h-5 w-5" />
          </div>

          {/* Most popular badge */}
          <div className="absolute top-6 right-6">
            <span className="bg-primary-foreground/20 text-primary-foreground text-xs px-3 py-1 rounded-full">
              Most popular
            </span>
          </div>

          <div className="mt-8 mb-2">
            <h3 className="text-2xl font-bold">Premium</h3>
            <div className="mt-2">
              <span className="text-3xl font-bold">$1,300</span>
              <span className="text-sm opacity-80"> /month</span>
            </div>
            <p className="text-sm mt-1 opacity-80">14-Day free trial included</p>
          </div>

          {/* Choose plan button */}
          <Button className="w-full mt-6 bg-primary-foreground/90 hover:bg-primary-foreground text-primary font-medium">
            Choose this plan
          </Button>
        </div>
        </div>    
        {/* Features list section */}
        <CardContent className="p-6 bg-background">
          <h4 className="text-base font-medium text-foreground mb-4">Premium Plan Include</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Unlimited emails</span>
            </li>
            <li className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">$0.35</span>
              <span className="text-muted-foreground">per phone number</span>
            </li>
            <li className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">10K/month</span>
              <span className="text-muted-foreground">export limit</span>
            </li>
            <li className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">CRM integration</span>
            </li>
          </ul>
        </CardContent>
      </Card>
  )
}
