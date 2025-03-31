"use client";
import { motion } from "framer-motion";
import SearchForm from "./search";

const HeroForm4A = () => {
  return (
    <motion.section
      className="bg-primary/20 py-16 md:py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Find Your Perfect Stay
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Search deals on hotels, homes, and much more...
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <SearchForm onSearch={() => {}} />
        </div>
      </div>
    </motion.section>
  );
};

export {HeroForm4A};
