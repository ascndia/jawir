"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface ArtistCardProps {
  name: string;
  image: string;
  genre: string;
  day: string;
  featured?: boolean;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ name, image, genre, day, featured = false }) => {
  return (
    <div className={`group relative overflow-hidden rounded-lg card-hover ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 z-10"></div>
      
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover aspect-square transition-transform duration-500 group-hover:scale-110"
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <span className="inline-block py-1 px-3 mb-2 text-xs font-medium bg-festival-purple/80 text-white rounded-full">{day}</span>
        <h3 className="text-xl md:text-2xl font-bold text-white">{name}</h3>
        <p className="text-white/70">{genre}</p>
      </div>
    </div>
  );
};
const defaultArtists = [
    { 
      name: "The Collegians", 
      image: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3",
      genre: "Rock", 
      day: "Day 1",
      featured: true 
    },
    { 
      name: "DJ Freshman", 
      image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3",
      genre: "Electronic", 
      day: "Day 2" 
    },
    { 
      name: "Campus Beats", 
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
      genre: "Hip Hop", 
      day: "Day 3" 
    },
    { 
      name: "The Alma Maters", 
      image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3",
      genre: "Indie", 
      day: "Day 1" 
    },
    { 
      name: "Lecture Hall 5", 
      image: "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.0.3",
      genre: "Alternative", 
      day: "Day 2" 
    },
  ]
interface GalleryBento2AProps {
  title?: string;
  ctaText?: string;
  ctaLink?: string;
  subtitle?: string;
  artists?: Array<{
    name: string;
    image: string;
    genre: string;
    day: string;
    featured?: boolean;
  }>;
}

export const GalleryBento2A: React.FC<GalleryBento2AProps> = ({
    title = "Festival Lineup",
    ctaText = "Get Your Tickets",
    ctaLink = "#tickets",
    subtitle = "More artists to be announced soon!",
    artists = defaultArtists,
  }) => {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.3,
        },
      },
    };
  
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.5
        }
      },
    };
  
    return (
      <section id="lineup" className="section-padding bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="festival-gradient">{title}</span>
          </h2>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {artists.map((artist, index) => (
              <motion.div
                key={index}
                className={artist.featured ? 'md:col-span-2 md:row-span-2' : ''}
                variants={itemVariants}
              >
                <ArtistCard
                  name={artist.name}
                  image={artist.image}
                  genre={artist.genre}
                  day={artist.day}
                  featured={artist.featured}
                />
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-12 text-center">
            <p className="text-white/70 mb-6">{subtitle}</p>
            <a href={ctaLink} className="btn-primary">{ctaText}</a>
          </div>
        </div>
      </section>
    );
  };