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
} from "@/registry/components/card/card-shadcn/card";

interface CardTestimonyProps {
  name: string;
  username: string;
  image: string;
  comment: string;
}
const CardTestimony = ({
  name = "Monkey D. Luffy",
  username = "luffytaroo",
  image = "/images/avatar.jpg",
  comment = "Jika Anda tidak berani mengambil risiko, Anda tidak akan bisa menciptakan masa depan.",
}: Partial<CardTestimonyProps>) => (
  <Card
    key={username}
    className="max-w-md md:break-inside-avoid overflow-hidden"
  >
    <CardContent>
      <div className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="w-12 h-12">
          <AvatarImage alt="" src={image} />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <CardTitle className="text-lg">{name}</CardTitle>
          <CardDescription>{username}</CardDescription>
        </div>
      </div>
      <p className="mt-2">{comment}</p>
    </CardContent>
  </Card>
);

export default CardTestimony;
