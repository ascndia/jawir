// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ArrowRight, Flag, Rocket, Star } from "lucide-react";
// import { Badge } from "@/components/ui/badge";

// const animationConfig = {
//     container: {
//       hidden: { opacity: 0 },
//       show: {
//         opacity: 1,
//         transition: {
//           staggerChildren: 0.2,
//           delayChildren: 0.3,
//         },
//       },
//     },
//     item: {
//       hidden: { opacity: 0, y: 20 },
//       show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//     },
//     featureItem: {
//       hidden: { opacity: 0, x: -10 },
//       show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
//     },
//   };
// const timelineEvents = [
//   {
//     year: "2018",
//     title: "Company Founded",
//     description: "Started our journey in a small garage with big dreams.",
//     icon: <Rocket className="h-5 w-5 text-primary" />,
//     type: "launch",
//   },
//   {
//     year: "2019",
//     title: "First Major Release",
//     description: "Launched our flagship product to critical acclaim.",
//     icon: <Star className="h-5 w-5 text-primary" />,
//     type: "milestone",
//   },
//   {
//     year: "2020",
//     title: "Global Expansion",
//     description: "Opened offices in 3 continents with 50+ employees.",
//     icon: <Flag className="h-5 w-5 text-primary" />,
//     type: "expansion",
//   },
//   {
//     year: "2021",
//     title: "User Milestone",
//     description: "Reached 1 million active users worldwide.",
//     icon: <Star className="h-5 w-5 text-primary" />,
//     type: "milestone",
//   },
//   {
//     year: "2022",
//     title: "Product Suite Launch",
//     description: "Introduced 3 new products to our ecosystem.",
//     icon: <Rocket className="h-5 w-5 text-primary" />,
//     type: "launch",
//   },
//   {
//     year: "2023",
//     title: "AI Integration",
//     description: "Implemented AI features across all products.",
//     icon: <Flag className="h-5 w-5 text-primary" />,
//     type: "innovation",
//   },
// ];

// export function Timeline() {
//   return (
//     <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
//       <div className="container mx-auto px-4 md:px-6">
//         <motion.div 
//           className="flex flex-col lg:flex-row gap-12 items-start"
//           variants={animationConfig.container}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true }}
//         >
//           <motion.div variants={animationConfig.item} className="lg:sticky lg:top-24 lg:w-1/2 space-y-6">
//             <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
//               </span>
//               Our History
//             </div>
            
//             <motion.h1 
//               variants={animationConfig.item}
//               className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
//             >
//               Our Journey Through 
//               <span className="text-primary relative block mt-2">
//                 The Years
//                 <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M3 9C118.957 4.47226 236.879 3.86015 355 9" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-primary/30"/>
//                 </svg>
//               </span>
//             </motion.h1>
            
//             <motion.p 
//               variants={animationConfig.item}
//               className="text-xl text-muted-foreground"
//             >
//               Follow our path of innovation and growth from humble beginnings to industry leadership.
//             </motion.p>
            
//             <motion.div 
//               variants={animationConfig.item}
//               className="flex flex-col sm:flex-row gap-4 pt-2"
//             >
//               <Button size="lg" className="gap-2">
//                 View Full History
//                 <ArrowRight className="h-4 w-4" />
//               </Button>
//               <Button size="lg" variant="secondary" className="gap-2">
//                 Contact Us
//                 <ArrowRight className="h-4 w-4" />
//               </Button>
//             </motion.div>
            
//             <motion.div variants={animationConfig.item} className="pt-6">
//               <p className="text-sm text-muted-foreground mb-4">Trusted by millions worldwide</p>
//               <div className="flex flex-wrap gap-6 opacity-70">
//                 {["Forbes", "TechCrunch", "WSJ", "The Verge"].map((company, i) => (
//                   <div key={i} className="text-foreground font-semibold">{company}</div>
//                 ))}
//               </div>
//             </motion.div>
//           </motion.div>
          
//           <motion.div 
//             variants={animationConfig.item} 
//             className="lg:w-1/2 space-y-8"
//           >
//             {[0, 1, 2].map((groupIndex) => (
//               <motion.div 
//                 key={groupIndex}
//                 variants={animationConfig.container}
//                 className="space-y-4"
//               >
//                 <h3 className="text-lg font-medium text-foreground">
//                   {groupIndex === 0 ? "Early Days" : 
//                    groupIndex === 1 ? "Growth Phase" : 
//                    "Modern Era"}
//                 </h3>
//                 <Card className="overflow-hidden border-border">
//                   <CardContent className="p-0">
//                     {timelineEvents.slice(groupIndex * 2, groupIndex * 2 + 2).map((event, index) => (
//                       <motion.div 
//                         key={index}
//                         variants={animationConfig.featureItem}
//                         className={`flex gap-4 p-6 ${index === 0 ? "border-b border-border" : ""}`}
//                       >
//                         <div className="flex flex-col items-center">
//                           <div className="rounded-full p-2 bg-primary/10 h-10 w-10 flex items-center justify-center shrink-0">
//                             {event.icon}
//                           </div>
//                           <div className="h-full w-px bg-border mt-2" />
//                         </div>
//                         <div>
//                           <div className="flex items-center gap-3 mb-2">
//                             <Badge variant={event.type === "launch" ? "default" : "secondary"}>
//                               {event.year}
//                             </Badge>
//                             <h4 className="font-medium text-foreground">{event.title}</h4>
//                           </div>
//                           <p className="text-muted-foreground">{event.description}</p>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
            
//             <motion.div variants={animationConfig.item} className="bg-primary/5 rounded-xl p-6 border border-primary/10">
//               <Badge className="bg-primary text-primary-foreground mb-4">Future</Badge>
//               <h3 className="text-lg font-medium text-foreground mb-2">What's Next?</h3>
//               <p className="text-muted-foreground mb-4">Be part of our ongoing story as we continue to innovate.</p>
//               <Button size="sm">
//                 Explore Our Vision
//                 <ArrowRight className="ml-2 h-4 w-4" />
//               </Button>
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Rocket, Award, Globe, Users, Cpu, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const animationConfig = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  timelineItem: {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  },
};

const timelineEvents = [
  {
    year: "2018",
    title: "Humble Beginnings",
    description: "Founded in a small coworking space with just 3 team members and a vision.",
    icon: <Rocket className="h-5 w-5" />,
    color: "text-blue-500",
  },
  {
    year: "2019",
    title: "First Breakthrough",
    description: "Launched our MVP and secured first 100 paying customers.",
    icon: <Award className="h-5 w-5" />,
    color: "text-purple-500",
  },
  {
    year: "2020",
    title: "Global Reach",
    description: "Expanded operations to Europe and Asia with remote team members.",
    icon: <Globe className="h-5 w-5" />,
    color: "text-green-500",
  },
  {
    year: "2021",
    title: "User Milestone",
    description: "Celebrated 1 million active users across our platforms.",
    icon: <Users className="h-5 w-5" />,
    color: "text-yellow-500",
  },
  {
    year: "2022",
    title: "AI Revolution",
    description: "Integrated machine learning across all product lines.",
    icon: <Cpu className="h-5 w-5" />,
    color: "text-red-500",
  },
];

export function Timeline() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="flex flex-col lg:flex-row gap-12 items-start"
          variants={animationConfig.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Left Column - Now image focused */}
          <motion.div variants={animationConfig.item} className="lg:sticky lg:top-24 lg:w-1/2 space-y-8">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-border shadow-lg">
              <Image
                src="/images/placeholder.jpg" // Replace with your actual image path
                alt="Our journey through time"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <Badge className="bg-white text-black hover:bg-white mb-2">
                  <Calendar className="h-3 w-3 mr-1" />
                  Since 2018
                </Badge>
                <h2 className="text-3xl font-bold text-white">Our Evolution</h2>
                <p className="text-white/90 mt-1">From startup to industry leader</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold tracking-tight">Why Our Story Matters</h3>
              <p className="text-muted-foreground">
                Every milestone represents our commitment to innovation and customer success. 
                We've grown, but our core values remain unchanged.
              </p>
              <div className="flex gap-4 pt-2">
                <Button variant="outline" className="gap-2">
                  Meet the Team
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Right Column - Timeline */}
          <motion.div 
            variants={animationConfig.item} 
            className="lg:w-1/2 space-y-8"
          >
            <motion.div variants={animationConfig.item}>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Timeline</h2>
              <p className="text-muted-foreground">
                Key moments that shaped our company's journey
              </p>
            </motion.div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />
              
              <motion.div 
                className="space-y-10"
                variants={animationConfig.container}
              >
                {timelineEvents.map((event, index) => (
                  <motion.div 
                    key={index}
                    variants={animationConfig.timelineItem}
                    className="relative pl-16"
                  >
                    {/* Dot indicator */}
                    <div className={`absolute left-5 top-1.5 h-3 w-3 rounded-full ${event.color} border-4 border-background -translate-x-1/2 z-10`} />
                    
                    <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex gap-4 items-start">
                          <div className={`p-2 rounded-lg ${event.color}/10 mt-1`}>
                            {React.cloneElement(event.icon, { className: `h-5 w-5 ${event.color}` })}
                          </div>
                          <div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-muted-foreground">{event.year}</span>
                            </div>
                            <h3 className="text-lg font-semibold mt-1">{event.title}</h3>
                            <p className="text-muted-foreground mt-2">{event.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Future CTA */}
            <motion.div 
              variants={animationConfig.item}
              className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl p-8 border border-border"
            >
              <h3 className="text-2xl font-bold tracking-tight mb-3">The Future</h3>
              <p className="text-muted-foreground mb-6">
                We're just getting started. The next chapter promises even greater innovation 
                and impact as we continue pushing boundaries.
              </p>
              <Button>
                Join Us on This Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}