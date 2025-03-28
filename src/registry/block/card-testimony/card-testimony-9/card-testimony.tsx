import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/components/avatar/avatar-shadcn/avatar";
import { StarIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";

interface CardTestimony9Props {
  name: string;
  username: string;
  image: string;
  comment: string;
  stars: number;
}

const CardTestimony9 = ({
  name = "Monkey D. Luffy",
  username = "luffytaroo",
  image = "/images/avatar.jpg",
  comment = "Jika Anda tidak berani mengambil risiko, Anda tidak akan bisa menciptakan masa depan.",
  stars = 5,
}: Partial<CardTestimony9Props>) => (
  <Card className="w-full max-w-md">
    {/* <CardHeader className="flex flex-col items-center">
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            className={`w-6 h-6 ${
              i < stars
                ? "fill-yellow-500 stroke-yellow-500"
                : " stroke-gray-300"
            }`}
          />
        ))}
      </div>
    </CardHeader> */}
    {/* <CardHeader /> */}
    <CardContent className="flex mt-5 flex-col items-center gap-6">
      <CardDescription className="text-center text-[17px] max-w-md">
        &quot;{comment}&quot;
      </CardDescription>
      <div className="flex items-center gap-3">
        <Avatar className="w-12 h-12">
          <AvatarImage src={image} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          <CardDescription className="text-sm">{username}</CardDescription>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default CardTestimony9;
