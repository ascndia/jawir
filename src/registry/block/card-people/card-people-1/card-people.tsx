import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/components/avatar/avatar-shadcn/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Github, X, Linkedin } from "lucide-react";

interface ProfileCardProps {
  name: string;
  role: string;
  image: string;
  description: string;
}

const CardPeople = ({
  name = "Leo Miranda",
  role = "Frontend Developer",
  image = "/images/avatar.jpg",
  description = "I really enjoy transforming ideas into functional software that exceeds expectations.",
}: Partial<ProfileCardProps>) => (
  <Card className="max-w-md text-center overflow-hidden">
    <CardHeader className="flex flex-col items-center gap-2 pb-4">
      <Avatar className="w-20 h-20">
        <AvatarImage alt={name} src={image} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <CardTitle className="text-xl">{name}</CardTitle>
      <CardDescription className="">{role}</CardDescription>
    </CardHeader>

    <CardContent className="px-6 pb-4 text-sm text-gray-500">
      {description}
    </CardContent>

    <div className="flex justify-center gap-4 pb-4">
      <Github className="w-5 h-5 cursor-pointer hover:text-gray-700" />
      <X className="w-5 h-5 cursor-pointer hover:text-gray-700" />
      <Linkedin className="w-5 h-5 cursor-pointer hover:text-gray-700" />
    </div>
  </Card>
);

export default CardPeople;
