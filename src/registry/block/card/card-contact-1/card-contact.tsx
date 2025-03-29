"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import FormContact from "../../form/form-contact-1/form-contact";

export default function CardContact() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
        <CardDescription>
          Fill out the form below and we'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormContact />
      </CardContent>
    </Card>
  );
}
