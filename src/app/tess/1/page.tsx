"use client";
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const OnboardingStep = ({ step, onNext }: { step: number; onNext: () => void }) => {
  switch (step) {
    case 1:
      return (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Welcome!</CardTitle>
            <CardDescription>Let's get you started with our awesome app.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the first step of the onboarding process. We'll guide you through the basics.</p>
          </CardContent>
          <CardFooter className="justify-end">
            <Button onClick={onNext}>Next</Button>
          </CardFooter>
        </Card>
      );
    case 2:
      return (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Customize Your Profile</CardTitle>
            <CardDescription>Tell us a bit about yourself.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Set up your profile to personalize your experience.</p>
          </CardContent>
          <CardFooter className="justify-end">
            <Button onClick={onNext}>Next</Button>
          </CardFooter>
        </Card>
      );
    case 3:
      return (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Explore Features</CardTitle>
            <CardDescription>Discover the key features of our app.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Learn how to use the main features to get the most out of the app.</p>
          </CardContent>
          <CardFooter className="justify-end">
            <Button onClick={onNext}>Finish</Button>
          </CardFooter>
        </Card>
      );
    default:
      return (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Onboarding Complete!</CardTitle>
            <CardDescription>You're all set to start using the app.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Enjoy your experience!</p>
          </CardContent>
        </Card>
      );
  }
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <OnboardingStep step={currentStep} onNext={handleNextStep} />
    </div>
  );
}


