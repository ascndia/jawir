"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Navigation } from 'lucide-react';

interface CardInfo1AProps {
  className?: string;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export function CardInfo1A({
  className = "",
  title = "GeoSpatial",
  description = "Web-based GIS Application",
  icon = <Navigation className="h-6 w-6 text-blue-600 mr-2" />,
}: CardInfo1AProps) {
  return (
    <Card className={`${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {icon}
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-1">About this application</h3>
          <p className="text-sm text-muted-foreground">
            GeoSpatial is a web-based Geographic Information System (GIS) that allows you to visualize, 
            analyze, and work with geographic data. This application is built using modern web technologies
            and provides a user-friendly interface for interacting with spatial information.
          </p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-1">Features</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Interactive map navigation with zoom, pan, and rotation</li>
            <li>• Layer management for organizing geographic data</li>
            <li>• Import and export of GeoJSON data</li>
            <li>• Tools for measuring distances and areas</li>
            <li>• Drawing tools for creating custom features</li>
            <li>• Multiple base map styles</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-1">Technologies</h3>
          <p className="text-sm text-muted-foreground">
            This application uses Mapbox GL JS for map rendering, React for the user interface,
            and various GIS libraries for spatial operations. The application is designed to be
            responsive and accessible on various devices.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardInfo1A;
