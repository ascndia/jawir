"use client"

import { Button } from '@/registry/components/button/select';
import { Input } from '@/registry/components/input/input-shadcn/input';
import { Label } from '@/registry/components/label';
import { Textarea } from '@/registry/components/textarea';
import { Loader2Icon } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'sonner';

const ContactForm = () => {

      const [fullName, setFullName] = useState("");
      const [email, setEmail] = useState("");
      const [message, setMessage] = useState("");

      const [isSubmitting, setIsSubmitting] = useState(false);
      const handleSubmit = () => {
        //   e.preventDefault()
          setIsSubmitting(true);
          setTimeout(() => {
              toast.success("Success!", {
                  description: "Your message has been sent.",
                  duration: 5000,
              });
              setIsSubmitting(false);
          }, 1500);
      };
      // Function to handle form submission
    //   const handleSubmit = async () => {
    //     // Use these values to send data to your fake API or perform any desired action
    //     console.log("Full Name:", fullName);
    //     console.log("Email:", email);
    //     console.log("Message:", message);

    //     // Reset form fields after submission

    //     const submiturl = "https://jsonplaceholder.typicode.com/posts"; // Replace with your fake API URL
    //     try {
    //       const response = await fetch(submiturl, {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           fullName,
    //           email,
    //           message,
    //         }),
    //       });

    //       if (response.ok) {
    //         console.log("Data successfully sent to the server!");
    //         setFullName("");
    //         setEmail("");
    //         setMessage("");
    //       } else {
    //         console.error("Failed to send data to the server.");
    //       }
    //     } catch (error) {
    //       console.error("Error while sending data:", error);
    //     }
    //   };

  return (
    <div className="w-full">
    <section className="body-font relative shadow-md">
        <div className="absolute inset-0 bg-background-secondary">
        <iframe
            width="100%"
            height="100%"
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d167998.23101735336!2d2.18222753176123!3d48.858737460214535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2sid!4v1742861605266!5m2!1sen!2sid"
            style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
        />
        </div>
        <div className="container px-5 py-24 mx-auto flex">
        <div className="lg:w-1/3 md:w-1/2 bg-background dark:bg-background-dark rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-lg mb-1 font-medium title-font text-text-primary dark:text-text-secondary">
            Feedback
            </h2>
            <p className="leading-relaxed mb-5 text-text-primary dark:text-text-secondary">
            Post-ironic portland shabby chic echo park, banjo fashion axe
            </p>
            <div className="relative mb-4">
            <Label className="leading-7 text-sm text-text-primary dark:text-text-secondary">
                Name
            </Label>
            <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                id="fullName"
                name="fullName"
                className="w-full bg-background dark:bg-background-dark rounded border border-border-primary focus:border-accent focus:ring-2 focus:ring-accent-light text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            </div>
            <div className="relative mb-4">
            <Label htmlFor="email" className="leading-7 text-sm text-text-primary dark:text-text-secondary">
                Email
            </Label>
            <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                className="w-full bg-background dark:bg-background-dark rounded border border-border-primary focus:border-accent focus:ring-2 focus:ring-accent-light text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            </div>
            <div className="relative mb-4">
            <Label htmlFor="message" className="leading-7 text-sm text-text-primary dark:text-text-secondary">
                Message
            </Label>
            <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                id="message"
                name="message"
                className="w-full bg-background dark:bg-background-dark rounded border border-border-primary focus:border-accent focus:ring-2 focus:ring-accent-light h-32 text-base outline-none py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            />
            </div>
            <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full" type="submit" size="lg">
                    {isSubmitting ? (
                    <Loader2Icon className="h-5 w-5 animate-spin" />
                    ) : (
                    "Submit"
                    )}
                </Button>
            <p className="text-xs text-text-primary dark:text-text-secondary mt-3">
            Chicharrones blog helvetica normcore iceland tousled brook viral artisan.
            </p>
        </div>
        </div>
    </section>
    </div>
  );
}

export default ContactForm