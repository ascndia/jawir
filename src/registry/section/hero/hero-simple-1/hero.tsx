"use client";
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/registry/components/button";
import { Input } from "@/registry/components/input";
import Image from "next/image";
// import { FilterOptions } from "@/components/ExpertsFilter";

interface HeroSimple1Props {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  //   filters: FilterOptions;
  //   setFilters: (filters: FilterOptions) => void;
}

const HeroSimple1 = ({
  searchQuery = "",
  setSearchQuery = () => {},
}: //   filters,
//   setFilters,
HeroSimple1Props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedLivestock, setSelectedLivestock] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);

  // Available options for filters
  const livestockOptions = ["Cattle", "Chickens", "Pigs", "Goats", "Sheep"];
  const specialtyOptions = [
    "Agribusiness Plan",
    "Animal Production",
    "Animal Health",
    "Animal Nutrition",
    "Farm Management",
    "Irrigation",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //   useEffect(() => {
  //     // Update parent component's filters when local state changes
  //     setFilters({
  //       livestock: selectedLivestock,
  //       specialties: selectedSpecialties,
  //       province: "All Provinces",
  //     });
  //   }, [selectedLivestock, selectedSpecialties, setFilters]);

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     // Apply filters
  //     setFilters({
  //       livestock: selectedLivestock,
  //       specialties: selectedSpecialties,
  //       province: "All Provinces",
  //     });
  //   };

  const removeFilter = (type: "livestock" | "specialty", value?: string) => {
    if (type === "livestock" && value) {
      setSelectedLivestock((prev) => prev.filter((item) => item !== value));
    } else if (type === "specialty" && value) {
      setSelectedSpecialties((prev) => prev.filter((item) => item !== value));
    }
  };

  const toggleLivestock = (livestock: string) => {
    setSelectedLivestock((prev) =>
      prev.includes(livestock)
        ? prev.filter((item) => item !== livestock)
        : [...prev, livestock]
    );
  };

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((item) => item !== specialty)
        : [...prev, specialty]
    );
  };

  return (
    <div className="relative w-full py-16 md:py-24">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1500595046743-cd271d694d30"
          alt="South African cattle"
          className="object-cover w-full h-full"
          width={1000}
          height={1000}
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Emerging farmer today, commercial farmer tomorrow
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Find qualified Agricultural Experts to help your farm thrive
          </p>

          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300">
              <div className="flex flex-col">
                <div className="flex items-center p-2">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      className="w-full pl-10 pr-4 text-base border-0 focus-visible:ring-0 placeholder:text-gray-500"
                      placeholder="Search agricultural experts in South Africa..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="ml-2">
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-full"
                    >
                      <Search className="h-4 w-4 mr-1" />
                      Search
                    </Button>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="text-sm font-medium text-gray-600 flex items-center">
                      Filters:
                    </div>

                    <div className="relative">
                      <select
                        value=""
                        onChange={(e) => {
                          if (e.target.value) toggleLivestock(e.target.value);
                          e.target.value = "";
                        }}
                        className="appearance-none py-1.5 pl-3 pr-8 bg-gray-100 rounded-full text-sm text-gray-800 cursor-pointer hover:bg-gray-200 transition-colors"
                      >
                        <option value="">Livestock</option>
                        {livestockOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}{" "}
                            {selectedLivestock.includes(option) ? "✓" : ""}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="relative">
                      <select
                        value=""
                        onChange={(e) => {
                          if (e.target.value) toggleSpecialty(e.target.value);
                          e.target.value = "";
                        }}
                        className="appearance-none py-1.5 pl-3 pr-8 bg-gray-100 rounded-full text-sm text-gray-800 cursor-pointer hover:bg-gray-200 transition-colors"
                      >
                        <option value="">Specialties</option>
                        {specialtyOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}{" "}
                            {selectedSpecialties.includes(option) ? "✓" : ""}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {(selectedLivestock.length > 0 ||
                    selectedSpecialties.length > 0) && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedLivestock.map((item) => (
                        <div
                          key={`filter-${item}`}
                          className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center"
                        >
                          {item}
                          <button
                            onClick={() => removeFilter("livestock", item)}
                            className="ml-1 text-gray-500 hover:text-gray-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}

                      {selectedSpecialties.map((item) => (
                        <div
                          key={`filter-${item}`}
                          className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center"
                        >
                          {item}
                          <button
                            onClick={() => removeFilter("specialty", item)}
                            className="ml-1 text-gray-500 hover:text-gray-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>

          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
            <span className="text-white/80">Popular:</span>
            <Button
              variant="link"
              className="p-0 h-auto text-white hover:text-white/80"
              onClick={() => setSearchQuery("Western Cape")}
            >
              Western Cape
            </Button>
            <Button
              variant="link"
              className="p-0 h-auto text-white hover:text-white/80"
              onClick={() => setSearchQuery("Gauteng")}
            >
              Gauteng
            </Button>
            <Button
              variant="link"
              className="p-0 h-auto text-white hover:text-white/80"
              onClick={() => setSearchQuery("KwaZulu-Natal")}
            >
              KwaZulu-Natal
            </Button>
            <Button
              variant="link"
              className="p-0 h-auto text-white hover:text-white/80"
              onClick={() => setSearchQuery("Eastern Cape")}
            >
              Eastern Cape
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSimple1;
