import React, { useState } from "react";
import { Button } from "@/registry/components/button/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";

const CardCookies = ({ fixed = false }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = () => {
    setIsVisible(false);
    // You can also store cookie consent in localStorage or cookies here
  };

  if (!isVisible) return null;

  return (
    <Card
      className={`${
        fixed ? "fixed bottom-4 left-4" : ""
      } max-w-sm shadow-lg p-4`}
    >
      <CardHeader>
        <CardTitle>Cookie Policy</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          We use cookies to improve your experience. By continuing, you agree to
          our cookie policy.
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button onClick={() => setIsVisible(false)}>Decline</Button>
        <Button onClick={handleAccept}>Accept</Button>
      </CardFooter>
    </Card>
  );
};

export default CardCookies;
