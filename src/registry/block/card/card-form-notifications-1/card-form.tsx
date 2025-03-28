"use client";

import * as React from "react";
import { Bell, Mail, Smartphone, Save } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import Label from "@/registry/components/label/label-shadcn/label";
import Switch from "@/registry/components/switch/switch-shadcn/switch"; // Default export
import Button from "@/registry/components/button/button-shadcn/button";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator"; // Adjusted path

interface NotificationSetting {
  id: "emailNews" | "emailUpdates" | "pushActivity" | "smsOffers";
  label: string;
  description: string;
  icon: React.ElementType;
  initialValue?: boolean;
}

interface CardFormNotifications1Props {
  initialSettings?: Partial<Record<NotificationSetting["id"], boolean>>;
  onSave?: (settings: Record<NotificationSetting["id"], boolean>) => void;
  onCancel?: () => void;
}

const defaultSettings: NotificationSetting[] = [
  {
    id: "emailNews",
    label: "Email Newsletter",
    description: "Receive weekly news and updates.",
    icon: Mail,
    initialValue: true,
  },
  {
    id: "emailUpdates",
    label: "Product Updates",
    description: "Get notified about new features and improvements.",
    icon: Mail,
    initialValue: true,
  },
  {
    id: "pushActivity",
    label: "Push Notifications",
    description: "Receive real-time alerts for account activity.",
    icon: Bell,
    initialValue: false,
  },
  {
    id: "smsOffers",
    label: "SMS Promotions",
    description: "Get occasional special offers via text message.",
    icon: Smartphone,
    initialValue: false,
  },
];

export function CardFormNotifications1({
  initialSettings = {},
  onSave,
  onCancel,
}: CardFormNotifications1Props) {
  const [settings, setSettings] = React.useState<
    Record<NotificationSetting["id"], boolean>
  >(() => {
    const initial: Record<NotificationSetting["id"], boolean> = {} as any;
    defaultSettings.forEach((setting) => {
      initial[setting.id] =
        initialSettings[setting.id] ?? setting.initialValue ?? false;
    });
    return initial;
  });

  const handleToggle = (id: NotificationSetting["id"]) => {
    setSettings((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(settings);
    }
    console.log("Saving notification settings:", settings);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    // Reset to initial state
    const resetState: Record<NotificationSetting["id"], boolean> = {} as any;
    defaultSettings.forEach((setting) => {
      resetState[setting.id] =
        initialSettings[setting.id] ?? setting.initialValue ?? false;
    });
    setSettings(resetState);
    console.log("Cancelled notification settings edit");
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Manage how you receive communications from us.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {defaultSettings.map((setting, index) => (
          <React.Fragment key={setting.id}>
            {index > 0 && <Separator />}
            <div className="flex items-start space-x-4 rounded-md p-4 transition-colors hover:bg-accent hover:text-accent-foreground">
              <setting.icon className="mt-px h-5 w-5 flex-shrink-0 text-muted-foreground" />
              <div className="flex-grow space-y-1">
                <Label htmlFor={setting.id} className="font-medium">
                  {setting.label}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {setting.description}
                </p>
              </div>
              <Switch
                id={setting.id}
                checked={settings[setting.id]}
                onCheckedChange={() => handleToggle(setting.id)}
                aria-label={setting.label}
              />
            </div>
          </React.Fragment>
        ))}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 border-t px-6 py-4">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CardFormNotifications1;
