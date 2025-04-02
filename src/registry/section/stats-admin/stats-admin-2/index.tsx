"use client";
import React from 'react';
import { motion } from 'framer-motion';
// Using shadcn UI components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const animationConfig = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
};

const stats = [
    { title: 'Users', value: '1,200', description: 'Active users' },
    { title: 'Revenue', value: '$34K', description: 'Monthly revenue' },
    { title: 'Growth', value: '12%', description: 'Month-over-month growth' },
];

export const Stats1A = () => {
    return (
        <motion.section 
            className="bg-background text-foreground py-8 px-4"
            {...animationConfig}
        >
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold mb-6">Stats</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <Card key={index} className="bg-card text-card-foreground shadow-md">
                            <CardHeader>
                                <CardTitle className="text-lg font-medium">{stat.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-extrabold">{stat.value}</p>
                                <p className="text-sm text-muted-foreground">{stat.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

