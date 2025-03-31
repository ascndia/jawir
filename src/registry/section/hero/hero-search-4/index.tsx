"use client";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import SearchBar from './search-bar';

const HeroSearch4 = () => {
  return (
    <>
      <section className="relative pt-24 pb-12 overflow-hidden">
        {/* Hero Background Image */}
        <motion.div 
          className="absolute inset-0 -z-10 bg-cover bg-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ 
            backgroundImage: `url('/placeholder.svg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm"></div>
        </motion.div>
        
        <div className="container-page relative z-10">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center justify-center h-full">
            <motion.h1 
              className="text-2xl md:text-3xl font-display font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              How can we help you today?
            </motion.h1>
          </div>
        </div>
      </section>
      <SearchBar />
    </>
  );
};

export default HeroSearch4;