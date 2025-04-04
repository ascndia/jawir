"use client";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import React, {useState} from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ScheduleItem1AProps {
  time: string;
  artist: string;
  stage: string;
  day: string;
}

const ScheduleItem1A: React.FC<ScheduleItem1AProps> = ({ time, artist, stage, day }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors duration-300 backdrop-blur-sm border border-foreground/10">
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2 md:mb-0">
        <span className="text-lg font-semibold text-muted-foreground">{time}</span>
        <h3 className="text-xl font-bold text-muted-foreground">{artist}</h3>
      </div>
      <div className="flex items-center gap-3 mt-2 md:mt-0">
        <span className="text-muted-foreground/80">{stage}</span>
        <Badge className="py-1 px-3 rounded-full text-xs font-medium cursor-pointer">
          {day}
        </Badge>
      </div>
    </div>
  );
};

const scheduleData = [
    { time: "5:00 PM", artist: "The Collegians", stage: "Main Stage", day: "Day 1" },
    { time: "6:30 PM", artist: "The Alma Maters", stage: "Lake Stage", day: "Day 1" },
    { time: "8:00 PM", artist: "DJ Freshman", stage: "Main Stage", day: "Day 1" },
    { time: "4:30 PM", artist: "Lecture Hall 5", stage: "Lake Stage", day: "Day 2" },
    { time: "6:00 PM", artist: "Campus Beats", stage: "Main Stage", day: "Day 2" },
    { time: "8:00 PM", artist: "The Collegians", stage: "Main Stage", day: "Day 2" },
    { time: "5:00 PM", artist: "DJ Freshman", stage: "Lake Stage", day: "Day 3" },
    { time: "7:00 PM", artist: "Campus Beats", stage: "Main Stage", day: "Day 3" },
    { time: "9:00 PM", artist: "All Artists Finale", stage: "Main Stage", day: "Day 3" },
];

export const Schedule1A: React.FC = () => {
  return (
    <section id="schedule" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-concert-pattern opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="text-accent">Event Schedule</span>
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-4">
          {scheduleData.map((item, index) => (
            <ScheduleItem1A
              key={index}
              time={item.time}
              artist={item.artist}
              stage={item.stage}
              day={item.day}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">Schedule subject to change.</p>
        </div>
      </div>
    </section>
  );
};

interface ScheduleItem1BProps {
    time: string;
    artist: string;
    stage: string;
    day: string;
  }
  
  const ScheduleItem1B: React.FC<ScheduleItem1BProps> = ({ time, artist, stage, day }) => {
    return (
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors duration-300 backdrop-blur-sm border border-foreground/10">
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2 md:mb-0">
          <span className="text-lg font-semibold text-muted-foreground">{time}</span>
          <h3 className="text-xl font-bold text-muted-foreground">{artist}</h3>
        </div>
        <div className="flex items-center gap-3 mt-2 md:mt-0">
          <span className="text-muted-foreground/80">{stage}</span>
        </div>
      </div>
    );
  };

  
export  const Schedule1B: React.FC = () => {
    const days = Array.from(new Set(scheduleData.map(item => item.day)));
  
    return (
      <section id="schedule" className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-concert-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="text-accent">Event Schedule</span>
          </h2>
          
          <Tabs defaultValue={days[0]} className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-3 mb-8">
              {days.map((day) => (
                <TabsTrigger key={day} value={day}>{day}</TabsTrigger>
              ))}
            </TabsList>
  
            {days.map((day) => (
              <TabsContent key={day} value={day} className="space-y-4">
                {scheduleData
                  .filter(item => item.day === day)
                  .map((item, index) => (
                    <ScheduleItem1B
                      key={index}
                      time={item.time}
                      artist={item.artist}
                      stage={item.stage}
                      day={item.day}
                    />
                  ))
                }
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">Schedule subject to change.</p>
          </div>
        </div>
      </section>
    );
  };
  

  interface ScheduleItem1CProps {
    time: string;
    artist: string;
    stage: string;
    day: string;
    index: number;
  }
  const ScheduleItem1C: React.FC<ScheduleItem1CProps> = ({ time, artist, stage, day, index }) => {
    const isEven = index % 2 === 0;
    
    return (
      <div className={`flex mb-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        <div className="hidden md:block w-1/2 px-4"></div>
        <div className="relative w-full md:w-1/2 px-4">
          <div className="absolute top-0 -left-2 md:left-[-17px] w-4 h-4 rounded-full bg-accent z-10"></div>
          <div className={`p-6 rounded-lg ${isEven ? 'rounded-tl-none' : 'md:rounded-tr-none'} bg-foreground/5 hover:bg-foreground/10 transition-colors duration-300 backdrop-blur-sm border border-foreground/10`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-bold text-accent">{time}</span>
              <Badge className="py-1 px-3 rounded-full text-xs font-medium">{day}</Badge>
            </div>
            <h3 className="text-xl font-bold mb-2">{artist}</h3>
            <p className="text-muted-foreground/80">{stage}</p>
          </div>
        </div>
      </div>
    );
  };
export  const Schedule1C: React.FC = () => {
    return (
      <section id="schedule" className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-concert-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="text-accent">Event Timeline</span>
          </h2>
          
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline vertical line */}
            <div className="hidden md:block absolute left-1/2 h-full w-px bg-accent/20 transform -translate-x-1/2"></div>
            
            {scheduleData.map((item, index) => (
              <ScheduleItem1C
                key={index}
                time={item.time}
                artist={item.artist}
                stage={item.stage}
                day={item.day}
                index={index}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">Schedule subject to change.</p>
          </div>
        </div>
      </section>
    );
  };
  
  
  interface ScheduleItem1DProps {
    time: string;
    artist: string;
    stage: string;
    day: string;
  }
  
  const ScheduleItem1D: React.FC<ScheduleItem1DProps> = ({ time, artist, stage, day }) => {
    return (
      <div className="p-5 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors duration-300 backdrop-blur-sm border border-foreground/10 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <Badge className="py-1 px-3 rounded-full text-xs font-medium">
            {day}
          </Badge>
          <Badge variant="outline" className="py-1 px-3 rounded-full text-xs font-medium">
            {stage}
          </Badge>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1">{artist}</h3>
          <span className="text-lg font-medium text-muted-foreground">{time}</span>
        </div>
      </div>
    );
  };

export  const Schedule1D: React.FC = () => {
    const stages = Array.from(new Set(scheduleData.map(item => item.stage)));
    const [activeStage, setActiveStage] = useState<string | null>(null);
  
    const filteredData = activeStage 
      ? scheduleData.filter(item => item.stage === activeStage) 
      : scheduleData;
  
    return (
      <section id="schedule" className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-concert-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="text-accent">Event Schedule</span>
          </h2>
          
          <div className="flex justify-center flex-wrap gap-2 mb-8">
            <Button 
              variant={activeStage === null ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveStage(null)}
            >
              All Stages
            </Button>
            {stages.map(stage => (
              <Button 
                key={stage} 
                variant={activeStage === stage ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveStage(stage)}
              >
                {stage}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {filteredData.map((item, index) => (
              <ScheduleItem1D
                key={index}
                time={item.time}
                artist={item.artist}
                stage={item.stage}
                day={item.day}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">Schedule subject to change.</p>
          </div>
        </div>
      </section>
    );
  };
  
