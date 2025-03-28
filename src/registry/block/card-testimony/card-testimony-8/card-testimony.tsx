import { Star } from "lucide-react";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/components/avatar/avatar-shadcn/avatar";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/registry/components/card/card-shadcn/card";
type CardTestimonyProps = {
  image: string;
  name: string;
  title: string;
  text: string;
  rating: number;
};

const CardTestimony: React.FC<Partial<CardTestimonyProps>> = ({
  image = "/images/avatar.jpg",
  name = "Monkey D. Luffy",
  title = "Pirate King",
  text = "Jika Anda tidak berani mengambil risiko, Anda tidak akan bisa menciptakan masa depan.",
  rating = 5,
}) => {
  return (
    <Card className="overflow-hidden ">
      <CardHeader>
        <div className="flex flex-row">
          <Avatar className="mr-4 h-12 w-12">
            <AvatarImage src={"/"} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-base font-semibold text-text-primary">
              {name}
            </CardTitle>
            <CardDescription className="text-sm text-text-secondary">
              {title}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-text-secondary">{text}</p>
        <div className="flex">
          {Array.from({ length: rating }).map((_, index) => (
            <Star
              key={index}
              className="w-4 h-4 mx-0.5 text-yellow-400 fill-yellow-400"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardTestimony;
