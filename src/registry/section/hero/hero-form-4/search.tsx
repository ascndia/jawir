"use client";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

import { format, addDays } from 'date-fns';
import { SearchIcon, CalendarIcon, Users } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

interface SearchFormProps {
  onSearch: (params: any) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [checkinDate, setCheckinDate] = useState<Date | null>(new Date());
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  
  return (
    <Card className="p-6 shadow-md bg-card">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4 relative">
          <Label htmlFor="destination" className="mb-2 block">Destination</Label>
          <div className="relative">
            <SearchIcon className="absolute left-2 top-3 h-4 w-4 " />
            <Input
              id="destination"
              placeholder="Where are you going?"
              className="pl-8"
              autoComplete="off"
            />
            
          </div>
        </div>
        
        <div className="md:col-span-3">
          <Label htmlFor="checkin" className="mb-2 block">Check-in</Label>
          <div className="relative">
            <CalendarIcon className="absolute left-2 top-3 h-4 w-4 " />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal pl-8">
                  {checkinDate ? format(checkinDate, 'MM/dd/yyyy') : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <Label htmlFor="checkout" className="mb-2 block">Check-out</Label>
          <div className="relative">
          <CalendarIcon className="absolute left-2 top-3 h-4 w-4 " />

          <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal pl-8">
                  {checkinDate ? format(checkinDate, 'MM/dd/yyyy') : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <Label htmlFor="guests" className="mb-2 block">Guests & Rooms</Label>
          <div className="relative">
            <Users className="absolute left-2 top-3 h-4 w-4 " />
            <div className="border rounded-md p-2 pl-8">
              <span>{adults} adults</span>
              {children > 0 && <span>, {children} children</span>}
              <span>, {rooms} room{rooms > 1 ? 's' : ''}</span>
            </div>
            
            <div className="absolute right-2 top-2.5 cursor-pointer">
              <div className="relative group">
                <span>⚙️</span>
                <div className="absolute hidden group-hover:block right-0 mt-2 w-60 bg-white border border-gray-200 rounded-md shadow-lg p-4 z-20">
                  <div className="flex justify-between items-center mb-3">
                    <span>Adults</span>
                    <div className="flex items-center">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        className="h-6 w-6 p-0" 
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                      >-</Button>
                      <span className="mx-2">{adults}</span>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        className="h-6 w-6 p-0" 
                        onClick={() => setAdults(adults + 1)}
                      >+</Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span>Children</span>
                    <div className="flex items-center">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        className="h-6 w-6 p-0" 
                        onClick={() => setChildren(Math.max(0, children - 1))}
                      >-</Button>
                      <span className="mx-2">{children}</span>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        className="h-6 w-6 p-0" 
                        onClick={() => setChildren(children + 1)}
                      >+</Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Rooms</span>
                    <div className="flex items-center">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        className="h-6 w-6 p-0" 
                        onClick={() => setRooms(Math.max(1, rooms - 1))}
                      >-</Button>
                      <span className="mx-2">{rooms}</span>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        className="h-6 w-6 p-0" 
                        onClick={() => setRooms(rooms + 1)}
                      >+</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Button 
          className="w-full bg-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search Hotels'}
        </Button>
      </div>
    </Card>
  );
};

export default SearchForm;