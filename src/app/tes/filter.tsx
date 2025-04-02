"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Search, X, User, Building, Users, ShieldCheck } from "lucide-react";
import { Card } from '@/components/ui/card';


interface FilterOptions {
    location: string;
    jobType: string;
    salaryRange: [number, number];
    experienceLevel: string[];
    remote: boolean;
    datePosted: string;
  }
  

const FilterPanel: React.FC = () => {

    const [filters, setFilters] = useState<FilterOptions>({
        location: '',
        jobType: 'all',
        salaryRange: [0, 200000],
        experienceLevel: [],
        remote: false,
        datePosted: 'any'
      });

  const resetFilters = () => {
    setFilters({
      location: '',
      jobType: 'all',
      salaryRange: [0, 200000],
      experienceLevel: [],
      remote: false,
      datePosted: 'any'
    });
  };

  return (
    <Card className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Filters</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={resetFilters}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          <X size={14} className="mr-1" /> Clear all
        </Button>
      </div>
      
      <div>
        <Label htmlFor="location" className="text-sm font-medium block mb-2">Location</Label>
        <div className="relative">
          <Input
            id="location"
            placeholder="City or ZIP"
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
            className="pl-9"
          />
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div>
        <Label htmlFor="job-type" className="text-sm font-medium block mb-2">Job Type</Label>
        <Select 
          value={filters.jobType}
          onValueChange={(value) => setFilters({...filters, jobType: value})}
        >
          <SelectTrigger id="job-type" className="w-full">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="full-time">Full Time</SelectItem>
            <SelectItem value="part-time">Part Time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="internship">Internship</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium block mb-2">Salary Range</Label>
        <div className="px-1">
          <Slider
            defaultValue={[filters.salaryRange[1]]}
            max={200000}
            step={5000}
            value={[filters.salaryRange[1]]}
            onValueChange={(value) => setFilters({...filters, salaryRange: [0, value[0]]})}
            className="my-4"
          />
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>$0</span>
          <span className="font-medium text-ultrajob-primary">{`$${filters.salaryRange[1].toLocaleString()}+`}</span>
        </div>
      </div>

      <div>
        <Label htmlFor="date-posted" className="text-sm font-medium block mb-2">Date Posted</Label>
        <Select 
          value={filters.datePosted}
          onValueChange={(value) => setFilters({...filters, datePosted: value})}
        >
          <SelectTrigger id="date-posted" className="w-full">
            <SelectValue placeholder="Any Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">Past Week</SelectItem>
            <SelectItem value="month">Past Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="filter-group flex items-center justify-between">
        <Label htmlFor="remote-only" className="text-sm font-medium cursor-pointer">Remote Only</Label>
        <Switch
          id="remote-only"
          checked={filters.remote}
          onCheckedChange={(checked) => setFilters({...filters, remote: checked})}
        />
      </div>
    </Card>
  );
};

export default FilterPanel;