"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Define reusable stats data
const stats = [
    { label: 'Portfolio Managed', value: '80+' },
    { label: 'Return on investment', value: '300%' },
    { label: 'Assets Under Management', value: '$1.4B+' },
    { label: 'Global customers', value: '2k+' },
    { label: 'Years of Experience', value: '~10+' },
];


// Define Framer Motion animation configuration
const animationConfig = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
};

export const Stats1A: React.FC = () => {
    return (
        <motion.section {...animationConfig} className="bg-background py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <Card key={index} className="border border-primary">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-foreground">
                                    {stat.value}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-text-primary">{stat.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};




export const Stats1B: React.FC = () => {
    return (
        <motion.section {...animationConfig} className="bg-muted py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap  justify-around gap-8 text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col">
                            <span className="text-5xl font-semibold text-foreground">{stat.value}</span>
                            <span className="text-foreground">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

