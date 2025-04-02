
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuoteIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

interface TestimonialProps {
  quote: string;
  author: string;
  role?: string;
  image?: string;
  delay?: number;
  highlighted?: boolean;
}

const Testimonial: React.FC<TestimonialProps> = ({ 
  quote, 
  author, 
  role = "", 
  image,
  delay = 0,
  highlighted = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      className={`bg-white rounded-lg shadow-md p-6 md:p-8 border border-sage-100 ${
        highlighted ? 'md:col-span-3 lg:col-span-3' : ''
      }`}
    >
      <div className={`flex flex-col ${highlighted ? 'md:flex-row md:gap-8 md:items-center' : ''} h-full`}>
        {image && highlighted && (
          <div className={`${highlighted ? 'md:w-1/3 mb-6 md:mb-0' : 'mb-6'}`}>
            <img 
              src={image} 
              alt={`${author}'s experience with Bonne Plante`} 
              className="w-full h-auto max-h-72 object-contain rounded-lg shadow-sm"
            />
          </div>
        )}
        
        <div className={`flex flex-col ${highlighted ? 'md:w-2/3' : ''}`}>
          <div className="mb-4 text-sage-500">
            <QuoteIcon size={highlighted ? 40 : 32} strokeWidth={1.5} />
          </div>
          
          <blockquote className={`${
            highlighted ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'
          } text-sage-800 italic mb-6 flex-grow`}>
            "{quote}"
          </blockquote>
          
          <div className="flex items-center">
            {image && !highlighted && (
              <Avatar className="h-12 w-12 mr-4 border-2 border-sage-300">
                <AvatarImage src={image} alt={author} className="object-cover" />
                <AvatarFallback>{author.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div>
              <div className={`${
                highlighted ? 'text-lg' : 'text-base'
              } font-medium text-sage-900`}>{author}</div>
              {role && <div className="text-sage-600 text-sm">{role}</div>}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


const TestimonialBento1A = () => {
  const testimonials = [
    {
      quote: "Bonne Plante transformed my apartment into a vibrant home.",
      author: "Philipp",
      role: "Berlin",
      image: "https://images.unsplash.com/photo-01601751234-0c8f1b2e3a5d",
      delay: 0.1,
      highlighted: true
    },
    {
      quote: "Their holiday service gave me complete peace of mind while I was away.",
      author: "Sophia",
      role: "Kreuzberg",
      delay: 0.3
    },
    {
      quote: "Quickly found the perfect plants for my new home and lighting.",
      author: "Melany",
      role: "Prenzlauer Berg",
      delay: 0.5
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-sage-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            What Our Clients Say
          </h2>
          <div className="w-24 h-1 bg-sage-500 mx-auto mb-6"></div>
          <p className="text-lg max-w-2xl mx-auto text-sage-700">
            Experience the difference in your space with our expert plant care
          </p>
        </motion.div>
        
        {/* Featured testimonial */}
        <div className="mb-8">
          <Testimonial 
            key={0}
            quote={testimonials[0].quote}
            author={testimonials[0].author}
            role={testimonials[0].role}
            image={testimonials[0].image}
            delay={testimonials[0].delay}
            highlighted={true}
          />
        </div>
        
        {/* Smaller testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.slice(1).map((testimonial, index) => (
            <Testimonial 
              key={index + 1}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              image={testimonial.image}
              delay={testimonial.delay}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/our-services">
            <Button className="bg-sage-600 hover:bg-sage-700">
              See all testimonials <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialBento1A;