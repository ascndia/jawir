"use client";

import * as React from "react";
import { User, UserCircle, Mail, BookText, Save, Upload } from "lucide-react";

// Assuming paths based on shadcn-loc.txt and user confirmation
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card"; // Adjusted path
import { Input } from "@/registry/components/input/input-shadcn/input"; // Adjusted path
import Label from "@/registry/components/label/label-shadcn/label"; // Adjusted path & default import
import Button from "@/registry/components/button/button-shadcn/button"; // Adjusted path & default import
import { Textarea } from "@/registry/components/textarea"; // Adjusted path
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/components/avatar/avatar-shadcn/avatar"; // Adjusted path

interface CardFormProfile1Props {
  initialUsername?: string;
  initialFullName?: string;
  initialEmail?: string;
  initialBio?: string;
  avatarSrc?: string;
  avatarFallback?: string;
  onSave?: (data: {
    username: string;
    fullName: string;
    email: string;
    bio: string;
  }) => void;
  onCancel?: () => void;
}

export function CardFormProfile1({
  initialUsername = "johndoe",
  initialFullName = "John Doe",
  initialEmail = "john.doe@example.com",
  initialBio = "Software Engineer passionate about open source.",
  avatarSrc,
  avatarFallback = "JD",
  onSave,
  onCancel,
}: CardFormProfile1Props) {
  const [username, setUsername] = React.useState(initialUsername);
  const [fullName, setFullName] = React.useState(initialFullName);
  const [email, setEmail] = React.useState(initialEmail); // Assuming email might not be editable here
  const [bio, setBio] = React.useState(initialBio);

  const handleSave = () => {
    if (onSave) {
      onSave({ username, fullName, email, bio });
    }
    // Add logic here to actually save the data (e.g., API call)
    console.log("Saving profile:", { username, fullName, email, bio });
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    // Reset state if needed, or rely on parent component logic
    setUsername(initialUsername);
    setFullName(initialFullName);
    setEmail(initialEmail);
    setBio(initialBio);
    console.log("Cancelled profile edit");
  };

  // Placeholder for file upload logic
  const handleAvatarUpload = () => {
    console.log("Trigger avatar upload...");
    // Implement file input interaction here
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>Update your personal information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatarSrc} alt={`@${username}`} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm" onClick={handleAvatarUpload}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Photo
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="space-y-2">
            <Label htmlFor="username">
              <User className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
              Username
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your unique username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fullName">
              <UserCircle className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
              Full Name
            </Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">
            <Mail className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            // Consider making email read-only or adding a note if it's changed elsewhere
            // readOnly
          />
          {/* Optional: Add a small note if email change requires verification */}
          {/* <p className="text-xs text-muted-foreground">Email changes require verification.</p> */}
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">
            <BookText className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
            Bio
          </Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us a little about yourself"
            rows={4}
            className="min-h-[100px]"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CardFormProfile1;
