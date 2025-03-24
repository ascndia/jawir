"use client";

import Label from "@/registry/components/label/label-shadcn/label";
import { Button } from "@/registry/components/button/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/registry/components/card/card-shadcn/card";
import Switch from "@/registry/components/switch/switch-shadcn/switch";

export function CookiesSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cookie Settings</CardTitle>
        <CardDescription>Manage your cookie settings here.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          <Label
            htmlFor="necessary"
            className="flex items-start flex-col space-y-1"
          >
            <span>Strictly Necessary</span>
            <span className="text-xs font-normal leading-snug text-muted-foreground">
              These cookies are essential in order to use the website and use
              its features.
            </span>
          </Label>
          <Switch id="necessary" defaultChecked aria-label="Necessary" />
        </div>
        <div className="flex items-center justify-between space-x-4">
          <Label
            htmlFor="functional"
            className="flex items-start flex-col space-y-1"
          >
            <span>Functional Cookies</span>
            <span className="text-xs font-normal leading-snug text-muted-foreground">
              These cookies allow the website to provide personalized
              functionality.
            </span>
          </Label>
          <Switch id="functional" aria-label="Functional" />
        </div>
        <div className="flex items-center justify-between space-x-4">
          <Label
            htmlFor="performance"
            className="flex items-start flex-col space-y-1"
          >
            <span>Performance Cookies</span>
            <span className="text-xs font-normal leading-snug text-muted-foreground">
              These cookies help to improve the performance of the website.
            </span>
          </Label>
          <Switch id="performance" aria-label="Performance" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Save preferences</Button>
      </CardFooter>
    </Card>
  );
}
