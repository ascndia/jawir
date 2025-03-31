"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"; // Assuming ShadCN Carousel exists

// Mock Data
const teamMembers = [
  {
    name: 'Alice Wonderland',
    role: 'Lead Developer',
    picture: '/images/placeholder.jpg', // Replace with actual paths or use placeholders
    bio: 'Alice is a passionate developer with 10 years of experience in building scalable web applications.',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
  },
  {
    name: 'Bob The Builder',
    role: 'UI/UX Designer',
    picture: '/images/placeholder.jpg',
    bio: 'Bob crafts beautiful and intuitive user interfaces, focusing on user-centered design principles.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Charlie Chaplin',
    role: 'Project Manager',
    picture: '/images/placeholder.jpg',
    bio: 'Charlie ensures projects are delivered on time and within scope, keeping everyone aligned.',
    social: {
      linkedin: '#',
    },
  },
  {
    name: 'Diana Prince',
    role: 'Marketing Specialist',
    picture: '/images/placeholder.jpg',
    bio: 'Diana drives growth through strategic marketing campaigns and community engagement.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
    {
    name: 'Ethan Hunt',
    role: 'Backend Engineer',
    picture: '/images/placeholder.jpg',
    bio: 'Ethan architects robust and efficient backend systems.',
    social: {
      github: '#',
      linkedin: '#',
    },
  },
];

// --- Team1A: Grid Layout ---
export const Team1A = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="text-center overflow-hidden bg-card text-card-foreground border border-border">
                <CardHeader className="p-0">
                   <Avatar className="mx-auto mt-6 h-24 w-24 border-4 border-primary rounded-full">
                    <AvatarImage src={member.picture} alt={member.name} className="object-cover"/>
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="mt-4 text-xl font-semibold">{member.name}</CardTitle>
                  <p className="text-primary">{member.role}</p>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm mb-4">{member.bio.substring(0, 80)}...</p>
                  <div className="flex justify-center space-x-3">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                        <Linkedin size={20} />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                        <Twitter size={20} />
                      </a>
                    )}
                    {member.social.github && (
                      <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


// --- Team1B: Carousel Layout ---
export const Team1B = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Our Talented Team</h2>
         <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {teamMembers.map((member, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                 <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="h-full"
                 >
                    <Card className="text-center overflow-hidden bg-card text-card-foreground border border-border h-full flex flex-col">
                        <CardHeader className="p-0">
                        <Avatar className="mx-auto mt-6 h-20 w-20 border-4 border-primary rounded-full">
                            <AvatarImage src={member.picture} alt={member.name} className="object-cover"/>
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <CardTitle className="mt-4 text-lg font-semibold">{member.name}</CardTitle>
                        <p className="text-primary text-sm">{member.role}</p>
                        </CardHeader>
                        <CardContent className="p-4 flex-grow flex flex-col justify-between">
                        <p className="text-muted-foreground text-xs mb-4 flex-grow">{member.bio.substring(0, 70)}...</p>
                        <div className="flex justify-center space-x-2 mt-auto">
                            {member.social.linkedin && (
                            <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                <Linkedin size={18} />
                            </a>
                            )}
                            {member.social.twitter && (
                            <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                <Twitter size={18} />
                            </a>
                            )}
                            {member.social.github && (
                            <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                <Github size={18} />
                            </a>
                            )}
                        </div>
                        </CardContent>
                    </Card>
                 </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 fill-black" />
          <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 fill-black" />
        </Carousel>
      </div>
    </section>
  );
};


// --- Team1C: List Layout ---
export const Team1C = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Team Roster</h2>
        <div className="space-y-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card text-card-foreground border border-border overflow-hidden">
                <CardContent className="p-4 flex items-center space-x-4">
                   <Avatar className="h-16 w-16 border border-border">
                    <AvatarImage src={member.picture} alt={member.name} className="object-cover"/>
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-primary text-sm">{member.role}</p>
                    <p className="text-muted-foreground text-sm mt-1">{member.bio.substring(0, 100)}...</p>
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                     {member.social.linkedin && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                          <Linkedin size={18} />
                        </a>
                      </Button>
                    )}
                    {member.social.twitter && (
                       <Button variant="outline" size="icon" asChild>
                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                          <Twitter size={18} />
                        </a>
                      </Button>
                    )}
                    {member.social.github && (
                       <Button variant="outline" size="icon" asChild>
                        <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                          <Github size={18} />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


// --- Team1D: Split Layout ---
export const Team1D = () => {
  const featuredMember = teamMembers[0]; // Example: Feature the first member
  const otherMembers = teamMembers.slice(1);

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Leadership & Team</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Featured Member */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-card text-card-foreground border border-border overflow-hidden">
              <CardHeader className="p-0 relative">
                 <Image
                    src={featuredMember.picture}
                    alt={featuredMember.name}
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover"
                 />
                 <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full p-4">
                    <CardTitle className="text-2xl font-bold text-primary-foreground">{featuredMember.name}</CardTitle>
                    <p className="text-primary-foreground/80">{featuredMember.role}</p>
                 </div>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-muted-foreground mb-4">{featuredMember.bio}</p>
                <div className="flex space-x-3">
                  {featuredMember.social.linkedin && (
                    <a href={featuredMember.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      <Linkedin size={20} />
                    </a>
                  )}
                  {featuredMember.social.twitter && (
                    <a href={featuredMember.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      <Twitter size={20} />
                    </a>
                  )}
                  {featuredMember.social.github && (
                    <a href={featuredMember.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      <Github size={20} />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Other Members List */}
          <div className="lg:col-span-2 space-y-4">
            {otherMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Card className="bg-card text-card-foreground border border-border overflow-hidden">
                  <CardContent className="p-3 flex items-center space-x-3">
                     <Avatar className="h-12 w-12 border border-border">
                        <AvatarImage src={member.picture} alt={member.name} className="object-cover"/>
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <h4 className="font-semibold">{member.name}</h4>
                      <p className="text-primary text-sm">{member.role}</p>
                    </div>
                    <div className="flex space-x-2">
                       {member.social.linkedin && (
                        <Button variant="ghost" size="icon" asChild>
                            <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                            <Linkedin size={18} />
                            </a>
                        </Button>
                        )}
                        {member.social.twitter && (
                        <Button variant="ghost" size="icon" asChild>
                            <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                            <Twitter size={18} />
                            </a>
                        </Button>
                        )}
                        {member.social.github && (
                        <Button variant="ghost" size="icon" asChild>
                            <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                            <Github size={18} />
                            </a>
                        </Button>
                        )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


// --- Team1E: Simple Grid Layout ---
export const Team1E = () => {
  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-foreground">Our Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <Avatar className="mx-auto h-16 w-16 border-2 border-border rounded-full">
                <AvatarImage src={member.picture} alt={member.name} className="object-cover"/>
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="mt-2 text-base font-medium">{member.name}</h3>
              <p className="text-primary text-xs">{member.role}</p>
              <div className="flex justify-center space-x-2 mt-1">
                {member.social.linkedin && (
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                    <Linkedin size={14} />
                  </a>
                )}
                {member.social.twitter && (
                  <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                    <Twitter size={14} />
                  </a>
                )}
                {member.social.github && (
                  <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                    <Github size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Team1F: Minimal Card Grid ---
export const Team1F = () => {
  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-foreground">Team Members</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teamMembers.map((member, index) => (
            <Card key={index} className="bg-card border-border overflow-hidden">
              <div className="p-3 text-center">
                <Avatar className="mx-auto h-14 w-14">
                  <AvatarImage src={member.picture} alt={member.name} className="object-cover"/>
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="mt-2 text-sm font-semibold">{member.name}</h3>
                <p className="text-primary text-xs">{member.role}</p>
                <div className="flex justify-center space-x-2 mt-2">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      <Linkedin size={16} />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      <Twitter size={16} />
                    </a>
                  )}
                  {member.social.github && (
                    <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      <Github size={16} />
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};