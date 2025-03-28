import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { cn } from "@/lib/utils";

interface ForecastDay {
  day: string;
  date?: string;
  highTemp: number;
  lowTemp: number;
  condition: string;
  icon: React.ReactNode;
  precipitation?: number;
}

interface WeatherForecastProps {
  location?: string;
  currentDay?: string;
  forecast?: ForecastDay[];
  className?: string;
}

const defaultForecast: ForecastDay[] = [
  {
    day: "Mon",
    date: "Mar 27",
    highTemp: 24,
    lowTemp: 18,
    condition: "Sunny",
    precipitation: 0,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="w-8 h-8 text-primary fill-current"
      >
        <path d="M256,104c-83.813,0-152,68.187-152,152s68.187,152,152,152,152-68.187,152-152S339.813,104,256,104Zm0,272A120,120,0,1,1,376,256,120.136,120.136,0,0,1,256,376Z" />
        <rect width={32} height={48} x={240} y={16} />
        <rect width={32} height={48} x={240} y={448} />
        <rect width={48} height={32} x={448} y={240} />
        <rect width={48} height={32} x={16} y={240} />
        <rect
          width={32}
          height="45.255"
          x={400}
          y="393.373"
          transform="rotate(-45 416 416)"
        />
        <rect
          width="32.001"
          height="45.255"
          x={80}
          y="73.373"
          transform="rotate(-45 96 96)"
        />
        <rect
          width="45.255"
          height={32}
          x="73.373"
          y={400}
          transform="rotate(-45.001 96.002 416.003)"
        />
        <rect
          width="45.255"
          height="32.001"
          x="393.373"
          y={80}
          transform="rotate(-45 416 96)"
        />
      </svg>
    ),
  },
  {
    day: "Tue",
    date: "Mar 28",
    highTemp: 26,
    lowTemp: 19,
    condition: "Partly Cloudy",
    precipitation: 10,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="w-8 h-8 text-primary fill-current"
      >
        <path d="M100,352H400a16,16,0,0,1,0,32H100a16,16,0,0,1,0-32Z" />
        <path d="M432,224H382.43a1.1,1.1,0,0,1-.43-.1,1,1,0,0,1-.66-1.27A96.77,96.77,0,0,0,393,192a98.5,98.5,0,0,0-181.34-52.8c-0.06.17-.12,0.33-0.19,0.5a1.1,1.1,0,0,1-.83.5,1,1,0,0,1-.89-0.61A96.59,96.59,0,0,0,96,192a97.32,97.32,0,0,0,10.43,44.27A1,1,0,0,1,105.9,238H80a48,48,0,0,0,0,96H432a48,48,0,0,0,0-96Z" />
      </svg>
    ),
  },
  {
    day: "Wed",
    date: "Mar 29",
    highTemp: 22,
    lowTemp: 17,
    condition: "Rainy",
    precipitation: 80,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="w-8 h-8 text-primary fill-current"
      >
        <path d="M456.26,139.37c-0.2-.09-0.4-0.17-0.6-0.26-0.36-.15-0.71-0.31-1.07-0.46-0.44-.19-0.88-0.37-1.33-0.55-0.35-.14-0.7-0.27-1-0.4-0.6-.22-1.19-0.43-1.79-0.62-0.33-.11-0.66-0.22-1-0.32-0.59-.18-1.18-0.34-1.77-0.5-0.36-.09-0.71-0.18-1.07-0.26-0.53-.13-1.07-0.25-1.6-0.36-0.41-.09-0.82-0.17-1.24-0.24-0.5-.1-1-0.19-1.5-0.27-0.45-.07-0.9-0.14-1.35-0.19-0.49-.07-1-0.12-1.46-0.17-0.46-.05-0.93-0.09-1.39-0.12-0.51,0-1-0.07-1.54-0.09-0.46,0-.92,0-1.38,0-0.56,0-1.12,0-1.68,0s-1.12,0-1.68,0c-0.46,0-.92,0-1.38,0-0.51,0-1,0-1.54.09-0.46,0-.93,0.07-1.39,0.12-0.49,0-1,.1-1.46.17-0.45,0-.9.12-1.35,0.19-0.5.08-1,0.17-1.5,0.27-0.42.07-.83,0.15-1.24,0.24-0.53.11-1.07,0.23-1.6,0.36-0.36.08-.71,0.17-1.07,0.26-0.59.16-1.18,0.32-1.77,0.5-0.33.1-.66,0.21-1,0.32-0.6.19-1.19,0.4-1.79,0.62-0.35.13-.7,0.26-1,0.4-0.45.18-.89,0.36-1.33,0.55-0.36.15-.71,0.31-1.07,0.46-0.2.09-.4,0.17-0.6,0.26a96,96,0,1,0-149.56,119.74h0A95.71,95.71,0,0,0,416,256c0-36.45-19.07-70.06-48.74-88.56A95.26,95.26,0,0,0,456.26,139.37Z" />
        <path d="M112,384a16,16,0,0,1-13.33-24.88l35.55-53.33A16,16,0,1,1,160.78,321l-35.55,53.33A16,16,0,0,1,112,384Z" />
        <path d="M272,384a16,16,0,0,1-13.33-24.88l35.55-53.33A16,16,0,1,1,320.78,321l-35.55,53.33A16,16,0,0,1,272,384Z" />
        <path d="M192,448a16,16,0,0,1-13.33-24.88l35.55-53.33A16,16,0,0,1,240.78,385l-35.55,53.33A16,16,0,0,1,192,448Z" />
        <path d="M352,448a16,16,0,0,1-13.33-24.88l35.55-53.33A16,16,0,0,1,400.78,385l-35.55,53.33A16,16,0,0,1,352,448Z" />
      </svg>
    ),
  },
  {
    day: "Thu",
    date: "Mar 30",
    highTemp: 20,
    lowTemp: 15,
    condition: "Thunderstorm",
    precipitation: 75,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="w-8 h-8 text-primary fill-current"
      >
        <path d="M400,64a16,16,0,0,0-16,16V96H336a16,16,0,0,0,0,32h48v16a16,16,0,0,0,32,0V128h48a16,16,0,0,0,0-32H416V80A16,16,0,0,0,400,64Z" />
        <path d="M192,384H112a16,16,0,0,1-10.67-27.92L178.88,256H112a16,16,0,0,1-11.31-27.35l96-96a16,16,0,0,1,22.62,22.62L162.75,208H224a16,16,0,0,1,10.67,27.92L157.12,336H208a16,16,0,0,1,11.31,27.35l-16,16A16,16,0,0,1,192,384Z" />
        <path d="M405.09,277.23A16,16,0,0,0,432,264.53l5-15.71a80,80,0,0,0-135.86-78.48A16,16,0,1,0,326,187.22a48,48,0,0,1,81.51,47.11l-4.84,15.13A16,16,0,0,0,405.09,277.23Z" />
        <path d="M320,384H266.67a16,16,0,0,1-14.07-23.5L288,312a16,16,0,0,1,30,10.5L304.63,352H320a16,16,0,0,1,0,32Z" />
      </svg>
    ),
  },
  {
    day: "Fri",
    date: "Mar 31",
    highTemp: 23,
    lowTemp: 16,
    condition: "Cloudy",
    precipitation: 30,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="w-8 h-8 text-primary fill-current"
      >
        <path d="M376,432H136c-36.44,0-70.36-12.57-95.51-35.41C14.38,372.88,0,340,0,304c0-36.58,13.39-68.12,38.72-91.22,18.11-16.53,42.22-28.25,69.18-33.87a16,16,0,0,0,11.37-9.15,156.24,156.24,0,0,1,42.05-56C187.76,91.69,220.5,80,256,80a153.57,153.57,0,0,1,107.14,42.9c24.73,23.81,41.5,55.28,49.18,92a16,16,0,0,0,12.12,12.39C470,237.42,512,270.43,512,328c0,33.39-12.24,60.78-35.41,79.23C456.23,423.43,428.37,432,376,432Z" />
      </svg>
    ),
  },
];

const CardWeatherForecast = ({
  location = "New York",
  currentDay = "Monday",
  forecast = defaultForecast,
  className,
}: WeatherForecastProps) => {
  return (
    <Card className={cn("max-w-md overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">{location} Forecast</CardTitle>
        <p className="text-sm text-muted-foreground">
          5-day weather forecast starting {currentDay}
        </p>
      </CardHeader>
      <CardContent className="px-0">
        <div className="grid divide-y divide-border">
          {forecast.map((day, index) => (
            <div
              key={index}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex flex-col items-center justify-center">
                <span className="font-medium">{day.day}</span>
                <span className="text-xs text-muted-foreground">
                  {day.date}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {day.icon}
                <span className="text-sm">{day.condition}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{day.highTemp}°</span>
                <span className="text-sm text-muted-foreground">
                  {day.lowTemp}°
                </span>
                {day.precipitation !== undefined && (
                  <div className="ml-2 flex items-center text-xs text-muted-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1 h-3 w-3"
                    >
                      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
                    </svg>
                    {day.precipitation}%
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-border p-4 text-xs text-muted-foreground">
        <button className="hover:text-primary transition-colors">
          View Extended Forecast
        </button>
        <span>Last updated: Today, 6:00 AM</span>
      </CardFooter>
    </Card>
  );
};

export default CardWeatherForecast;
