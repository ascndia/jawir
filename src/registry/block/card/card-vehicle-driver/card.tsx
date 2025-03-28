import * as React from "react";
import { Car, User, Phone, Mail } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/registry/components/avatar/avatar-shadcn/avatar"; // Corrected path

interface CardVehicleDriverProps extends React.HTMLAttributes<HTMLDivElement> {
  vehicleName?: string;
  driverName?: string;
  driverImage?: string; // URL to driver's image
  phone?: string;
  email?: string;
  status?: "Active" | "Inactive" | "On Break";
}

export function CardVehicleDriver({
  vehicleName = "Truck PQR-567",
  driverName = "John Doe",
  driverImage = "https://source.unsplash.com/40x40/?portrait", // Placeholder image
  phone = "555-123-4567",
  email = "john.doe@example.com",
  status = "Active",
  className,
  ...props
}: CardVehicleDriverProps) {
  return (
    <Card className={cn("w-full max-w-sm", className)} {...props}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center">
            <Car className="mr-2 h-4 w-4 text-muted-foreground" />
            {vehicleName}
          </CardTitle>
        </div>
        <CardDescription className="pt-1">Assigned Driver</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={driverImage} alt={driverName} />
            <AvatarFallback>
              {driverName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium">{driverName}</p>
            <p className="text-xs text-muted-foreground">{status}</p>
          </div>
        </div>
        <div className="text-sm space-y-1">
          <div className="flex items-center">
            <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center">
            <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{email}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardVehicleDriver;
