"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import Link  from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeroForm3 = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
 
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-8" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-blue/90" />
      
      <div className="container mx-auto max-w-6xl relative z-10 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-6">
            <motion.h1 
              className="text-4xl md:text-5xl text-white lg:text-6xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Find <span className="text-orange-400">Local Businesses</span> Near You
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Connect with thousands of businesses across the UK, from restaurants to plumbers to shops and more.
            </motion.p>
            
            <motion.form 
              className="bg-white p-2 rounded-lg shadow-lg flex flex-col sm:flex-row gap-2 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex-1 flex items-center px-3 border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-orange-500 focus-within:border-orange-500">
                <Search className="h-5 w-5 mr-2 text-orange-500" />
                <Input 
                  type="text" 
                  placeholder="What are you looking for?" 
                  className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex-1 relative">
                <div className="flex items-center px-3 border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-orange-500 focus-within:border-orange-500">
                  <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                  <Input 
                    type="text" 
                    placeholder="County, city or postcode" 
                    className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
              </div>
              
              <Button type="submit" className="px-6 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-medium">
                Search
              </Button>
            </motion.form>
            
            <motion.div 
              className="flex flex-wrap gap-3 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="text-primary">Popular:</span>
              <Link href="/search?category=Restaurants" className="text-white hover:text-orange-300 transition">Restaurants</Link>
              <Link href="/search?category=Plumbers" className="text-white hover:text-orange-300 transition">Plumbers</Link>
              <Link href="/search?category=Shopping" className="text-white hover:text-orange-300 transition">Shopping</Link>
              <Link href="/search?category=Cafes" className="text-white hover:text-orange-300 transition">Cafes</Link>
              <Link href="/search?category=Hair+Salons" className="text-white hover:text-orange-300 transition">Hair Salons</Link>
            </motion.div>
          </div>
          
          <motion.div 
            className="hidden lg:flex justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1517841900229-3d132465364e?q=80&w=1000&auto=format&fit=crop" 
                alt="People using SociaFind" 
                className="rounded-2xl shadow-xl max-w-md w-full object-cover"
              />
              
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-lg max-w-xs">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <Search className="h-3 w-3 text-white" />
                  </div>
                  <p className="font-medium">New search</p>
                </div>
                <p className="text-sm">Found 24 plumbers near Manchester. Viewing highest rated first.</p>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-card rounded-xl p-4 shadow-lg animate-float">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" 
                      alt="User avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-xs mt-1">"Amazing service, highly recommended!"</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroForm3;