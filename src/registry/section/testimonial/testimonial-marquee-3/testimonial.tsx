import { CardTestimony } from "@/registry/block/card-testimony/select";
import {
  Avatar,
  AvatarFallback,
} from "@/registry/components/avatar/avatar-shadcn/avatar";
import Button from "@/registry/components/button/button-shadcn/button";
import Marquee from "@/registry/components/marquee/marquee-shadcn/marquee";
import Link from "next/link";
import React, { ComponentProps } from "react";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    company: "TechCorp",
    testimonial:
      "This product has completely transformed the way we work. The efficiency and ease of use are unmatched!",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Sophia Lee",
    designation: "Data Analyst",
    company: "InsightTech",
    testimonial:
      "This tool has saved me hours of work! The analytics and reporting features are incredibly powerful.",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    id: 3,
    name: "Michael Johnson",
    designation: "UX Designer",
    company: "DesignPro",
    testimonial:
      "An amazing tool that simplifies complex tasks. Highly recommended for professionals in the industry.",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "Marketing Specialist",
    company: "BrandBoost",
    testimonial:
      "I've seen a significant improvement in our team's productivity since we started using this service.",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    name: "Daniel Martinez",
    designation: "Full-Stack Developer",
    company: "CodeCrafters",
    testimonial:
      "The best investment we've made! The support team is also super responsive and helpful.",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 6,
    name: "Jane Smith",
    designation: "Product Manager",
    company: "InnovateX",
    testimonial:
      "The user experience is top-notch! The interface is clean, intuitive, and easy to navigate.",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
];

const TestimonialMarquee3 = () => (
  <div className="min-h-screen flex justify-center items-center py-12">
    <div className="h-full w-full max-w-6xl mx-auto">
      <div className="space-y-4 mb-12">
        <h2 className="text-5xl md:text-6xl font-bold text-center tracking-tight px-6">
          Testimonials
        </h2>
        <p className="text-xl md:text-2xl text-center text-muted-foreground font-medium">
          What our customers say about us
        </p>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto px-6">
          Discover how our product has transformed businesses and workflows for
          clients across various industries. These testimonials reflect our
          commitment to excellence and customer satisfaction.
        </p>
      </div>
      <div className="relative overflow-hidden h-[600px]">
        <div className="z-10 absolute top-0 left-0 right-0 h-[15%] bg-gradient-to-b from-background to-transparent pointer-events-none" />
        <div className="z-10 absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-background to-transparent pointer-events-none" />
        <div className="flex h-full">
          <Marquee vertical pauseOnHover>
            <TestimonialList />
          </Marquee>
          <Marquee vertical pauseOnHover reverse>
            <TestimonialList />
          </Marquee>
          <Marquee vertical pauseOnHover>
            <TestimonialList />
          </Marquee>
        </div>
      </div>
    </div>
  </div>
);

const TestimonialList = () =>
  testimonials.map((testimonial) => (
    <CardTestimony key={testimonial.id} {...testimonial} />
  ));

// const TestimonialList = () =>
//   testimonials.map((testimonial) => (
//     <div
//       key={testimonial.id}
//       className="min-w-96 max-w-sm bg-accent rounded-xl p-6"
//     >
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <Avatar>
//             <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
//               {testimonial.name.charAt(0)}
//             </AvatarFallback>
//           </Avatar>
//           <div>
//             <p className="text-lg font-semibold">{testimonial.name}</p>
//             <p className="text-sm text-gray-500">{testimonial.designation}</p>
//           </div>
//         </div>
//         <Button variant="ghost" size="icon" asChild>
//           <TwitterLogo className="w-4 h-4" />
//         </Button>
//       </div>
//       <p className="mt-5 text-[17px]">{testimonial.testimonial}</p>
//     </div>
//   ));

export default TestimonialMarquee3;
