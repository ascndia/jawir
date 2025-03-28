"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Button } from "@/registry/components/button";
import { cn } from "@/lib/utils";

interface WeatherAlert {
  id: string;
  title: string;
  severity: "warning" | "severe" | "watch";
  description: string;
  issuedAt: string;
  expiresAt: string;
}

interface WeatherAlertProps {
  alerts?: WeatherAlert[];
  className?: string;
}

const defaultAlerts: WeatherAlert[] = [
  {
    id: "alert-1",
    title: "Severe Thunderstorm Warning",
    severity: "severe",
    description:
      "A severe thunderstorm capable of producing large hail and damaging winds is moving through the area. Seek shelter immediately.",
    issuedAt: "Today, 5:30 PM",
    expiresAt: "Today, 6:30 PM",
  },
  {
    id: "alert-2",
    title: "Flood Watch",
    severity: "watch",
    description:
      "Potential for heavy rainfall may lead to localized flooding in low-lying areas. Monitor conditions closely.",
    issuedAt: "Today, 4:00 PM",
    expiresAt: "Tomorrow, 8:00 AM",
  },
];

const CardWeatherAlert = ({
  alerts = defaultAlerts,
  className,
}: WeatherAlertProps) => {
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);

  const getSeverityColor = (severity: WeatherAlert["severity"]) => {
    switch (severity) {
      case "severe":
        return "bg-destructive text-destructive-foreground";
      case "warning":
        return "bg-warning text-warning-foreground"; // Assuming you have warning colors defined
      case "watch":
        return "bg-primary/20 text-primary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getSeverityIcon = (severity: WeatherAlert["severity"]) => {
    switch (severity) {
      case "severe":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.557 13.004c1.155 2-.29 4.5-2.599 4.5H4.443c-2.308 0-3.753-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "warning":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clipRule="evenodd"
            />
          </svg>
        ); // Placeholder, replace with actual warning icon
      case "watch":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
              clipRule="evenodd"
            />
          </svg>
        ); // Placeholder, replace with actual watch icon
      default:
        return null;
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedAlert(expandedAlert === id ? null : id);
  };

  return (
    <Card className={cn("max-w-lg", className)}>
      <CardHeader>
        <CardTitle>Weather Alerts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.length === 0 ? (
          <p className="text-muted-foreground text-sm">No active alerts.</p>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={cn(
                "p-4 rounded-lg border",
                getSeverityColor(alert.severity)
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getSeverityIcon(alert.severity)}
                  <h3 className="font-semibold">{alert.title}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpand(alert.id)}
                  className="text-current hover:bg-current/10"
                >
                  {expandedAlert === alert.id ? "Hide" : "Details"}
                </Button>
              </div>
              {expandedAlert === alert.id && (
                <div className="mt-3 text-sm space-y-1">
                  <p>{alert.description}</p>
                  <p className="opacity-80">Issued: {alert.issuedAt}</p>
                  <p className="opacity-80">Expires: {alert.expiresAt}</p>
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default CardWeatherAlert;
