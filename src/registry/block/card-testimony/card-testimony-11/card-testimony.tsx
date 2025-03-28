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
import { Star } from "lucide-react";

interface CardTestimonyProps {
  name: string;
  username: string;
  image: string;
  rating: number;
  comment: string;
}
const CardTestimony = ({
  name = "Monkey D. Luffy",
  username = "luffytaroo",
  image = "/images/avatar.jpg",
  rating = 5,
  comment = "Jika Anda tidak berani mengambil risiko, Anda tidak akan bisa menciptakan masa depan.",
}: Partial<CardTestimonyProps>) => (
  <Card
    key={username}
    className="max-w-md md:break-inside-avoid overflow-hidden"
  >
    <CardHeader className="flex flex-row items-start justify-between">
      <div className="flex flex-row items-center gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage alt="" src={image} />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <CardTitle className="text-lg">{name}</CardTitle>
          <CardDescription>{username}</CardDescription>
        </div>
      </div>
      <div className="flex">
        {Array.from({ length: rating }).map((_, index) => (
          <Star
            key={index}
            className="w-5 h-5 mx-0.5 text-yellow-400 fill-yellow-400"
          />
        ))}
      </div>
    </CardHeader>

    <CardContent className="text-center">
      <p>{comment}</p>
    </CardContent>
  </Card>
);

export default CardTestimony;
