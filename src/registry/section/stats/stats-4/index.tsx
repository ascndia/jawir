"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Define reusable stats data
const stats = [
    { label: 'Users', value: '1,000+' },
    { label: 'Downloads', value: '500+' },
    { label: 'Likes', value: '3,000+' },
];

// Define Framer Motion animation configuration
const animationConfig = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
};

const Stats1A: React.FC = () => {
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
                                <p className="text-secondary">{stat.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default Stats1A;
