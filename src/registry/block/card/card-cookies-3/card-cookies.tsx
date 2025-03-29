import React, { useState } from "react";
import { Button } from "@/registry/components/button/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Cookie } from "lucide-react";
import Link from "next/link";

const CardCookies = ({ fixed = false }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = () => {
    setIsVisible(false);
    // Store cookie consent in localStorage or cookies if needed
  };

  if (!isVisible) return null;

  return (
    <Card
      className={`${
        fixed ? "fixed bottom-4 left-4" : ""
      } max-w-md shadow-lg p-4 border rounded-lg`}
    >
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-lg">We use cookies</CardTitle>
        <Cookie className="w-5 h-5" />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Your privacy is important to us. By clicking &quot;Necessary cookies
          only&quot;, you agree that we can use essential cookies to ensure you
          get the best experience on our website in accordance with our{" "}
          <Link href="#" className="underline hover:text-primary">
            Cookie Policy
          </Link>
          .
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full" onClick={handleAccept}>
          Accept all cookies
        </Button>
        <Button variant="secondary" className="w-full" onClick={handleAccept}>
          Necessary cookies only
        </Button>
        <Button variant="outline" className="w-full" onClick={handleAccept}>
          Decline
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardCookies;
