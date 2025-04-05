"use client"

import { useState } from "react"
import { Check, ChevronRight, Camera, User, Users, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

// Step 1: Profile Setup
const ProfileSetupStep = () => (
  <div className="space-y-6">
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="relative">
        <Avatar className="h-24 w-24">
          <AvatarImage src="" />
          <AvatarFallback className="bg-muted">
            <User className="h-12 w-12 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
          <Camera className="h-4 w-4" />
        </Button>
      </div>
      <span className="text-xs text-muted-foreground">Upload a photo</span>
    </div>

    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="Enter your name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="Choose a username" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio (optional)</Label>
        <Input id="bio" placeholder="Tell us a bit about yourself" />
      </div>
    </div>
  </div>
)

// Step 2: Choose Your Interests
const InterestsStep = () => {
  const interests = [
    "Technology",
    "Design",
    "Photography",
    "Art",
    "Music",
    "Travel",
    "Food",
    "Fitness",
    "Fashion",
    "Books",
    "Movies",
    "Gaming",
    "Science",
    "Nature",
    "Sports",
    "Business",
  ];

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {interests.map((interest) => (
          <div
            key={interest}
            onClick={() => toggleInterest(interest)}
            className={`group flex cursor-pointer flex-col items-center justify-center rounded-lg border p-3 text-center ${
              selectedInterests.includes(interest)
                ? "bg-primary/10 border-primary text-primary"
                : "border-muted bg-transparent hover:bg-primary/5 hover:border-primary/30"
            }`}
          >
            <span
              className={`text-sm font-medium ${
                selectedInterests.includes(interest)
                  ? "text-primary"
                  : "group-hover:text-primary"
              }`}
            >
              {interest}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Step 3: Suggested Follows
const SuggestedFollowsStep = () => {
  const suggestedUsers = [
    {
      name: "Alex Johnson",
      username: "@alexj",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "UX Designer & Photographer",
    },
    {
      name: "Sam Rivera",
      username: "@samr",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Travel Blogger & Food Enthusiast",
    },
    {
      name: "Taylor Kim",
      username: "@taylork",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Tech Writer & Startup Advisor",
    },
    {
      name: "Jordan Lee",
      username: "@jordanl",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Fitness Coach & Nutrition Expert",
    },
  ]

  return (
    <div className="space-y-3">
      <div className="space-y-3">
        {suggestedUsers.map((user) => (
          <Card key={user.username} className="overflow-hidden">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.username}</div>
                    <div className="text-xs text-muted-foreground mt-1">{user.bio}</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Follow
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Step 4: Finish
const FinishStep = () => (
  <div className="space-y-4 text-center">
    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
      <Sparkles className="h-10 w-10 text-primary" />
    </div>
    {/* <div className="space-y-2">
      <h3 className="text-lg font-medium">You're all set!</h3>
      <p className="text-sm text-muted-foreground">
        Your profile is ready. Start exploring and connecting with others.
      </p>
    </div>
    <div className="flex justify-center space-x-1 pt-2">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce"
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div> */}
  </div>
)

const steps = [
  {
    title: "Let's Personalize Your Profile",
    description: "Add a photo and a few details so people know it's you.",
    component: <ProfileSetupStep />,
    icon: User,
  },
  {
    title: "What Are You Into?",
    description: "Pick a few topics you love to help us customize your experience.",
    component: <InterestsStep />,
    icon: Sparkles,
  },
  {
    title: "People You Might Like to Follow",
    description: "Start connecting with creators, friends, and trendsetters.",
    component: <SuggestedFollowsStep />,
    icon: Users,
  },
  {
    title: "You're All Set!",
    description: "Your profile is complete and ready to go.",
    component: <FinishStep />,
    icon: Check,
  },
]

export function DialogOnboarding2A({
    open,
    onOpenChange,
    }: {
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
  const [currentStep, setCurrentStep] = useState(0)

//   const CurrentIcon = steps[currentStep].icon

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onOpenChange(false)
      console.log("Onboarding completed!")
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onOpenChange(false)
    setCurrentStep(0)
  }

  return (
    <>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <CurrentIcon className="h-6 w-6 text-primary" />
            </div> */}
            <DialogTitle className="text-center text-xl pt-4">{steps[currentStep].title}</DialogTitle>
            <DialogDescription className="text-center">{steps[currentStep].description}</DialogDescription>
          </DialogHeader>

          <div className="py-4">{steps[currentStep].component}</div>

          <div className="flex justify-center space-x-1 py-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 w-16 rounded-full ${index === currentStep ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>

          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
            {currentStep === steps.length - 1 ? (
              <Button onClick={handleSkip} className="mt-2 sm:mt-0 w-full">
                Get Started
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={handleSkip} className="mt-2 sm:mt-0">
                  Skip
                </Button>
                <div className="flex space-x-2">
                  {currentStep > 0 && (
                    <Button variant="outline" onClick={handlePrevious}>
                      Back
                    </Button>
                  )}
                  <Button onClick={handleNext}>
                    {currentStep === steps.length - 1 ? "Finish" : "Next"}
                    {currentStep !== steps.length - 1 && <ChevronRight className="ml-1 h-4 w-4" />}
                  </Button>
                </div>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

