import { Button } from "@/registry/components/button";
import Link from "next/link";

const HeroSimple2 = () => {
  return (
    <div className="relative pt-8 bg-primary/40 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')] bg-cover bg-center opacity-20"></div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Give the Gift of Life
          </h1>
          <p className="text-xl mb-8">
            Your blood donation can save up to three lives. Join NBSZ's mission to ensure safe blood is available for everyone in Zimbabwe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg">
              <Link href="#">Donate Now</Link>
            </Button>
            <Button size="lg" variant="outline" >
              <Link href="#">Check Eligibility</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm py-4 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between text-center">
            <div className="w-full sm:w-1/2 md:w-1/4 p-4">
              <div className="text-3xl font-bold">70,000+</div>
              <div className="text-sm">Lives Saved</div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 p-4">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm">Emergency Services</div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 p-4">
              <div className="text-3xl font-bold">5+</div>
              <div className="text-sm">Collection Centers</div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 p-4">
              <div className="text-3xl font-bold">8,000+</div>
              <div className="text-sm">Annual Donors</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSimple2;