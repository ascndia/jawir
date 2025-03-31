import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Popular search suggestions
  const popularSearches = [
    'Payment methods',
    'Refund policy',
    'Account setup',
    'Integration help',
    'Security features'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search for:', query);
    // In a real implementation, this would navigate to search results
  };

  const handleClearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative mb-12">
      <div className="container-page">
        <div 
          className={cn(
            "max-w-3xl mx-auto opacity-0 transform translate-y-4",
            isLoaded && "opacity-100 translate-y-0 transition-all duration-500 ease-out"
          )}
        >
          <form onSubmit={handleSubmit}>
            <div 
              className={cn(
                "relative overflow-hidden  rounded-2xl ring-1 ring-muted-foreground transition-all duration-300",
                isFocused ? "shadow-lg ring-2 ring-primary" : "shadow-md"
              )}
            >
              <div className="flex items-center px-5 py-4">
                <Search className="h-5 w-5 text-muted-foreground/70" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Search for help with..."
                  className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-foreground placeholder-muted-foreground/50 px-3 py-1"
                />
                {query && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="p-1 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="submit"
                  className="ml-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <span className="hidden sm:inline-block">Search</span>
                  <ArrowRight className="h-4 w-4 sm:hidden" />
                </button>
              </div>
            </div>
          </form>
          
          {/* Popular searches */}
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium">Popular:</span>
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-2 py-0.5 hover:text-primary transition-colors rounded-md hover:bg-primary/5"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
