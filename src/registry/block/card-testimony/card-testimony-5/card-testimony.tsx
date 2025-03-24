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
    key={name}
    className="max-w-md md:break-inside-avoid overflow-hidden p-6 border rounded-lg shadow-sm"
  >
    <CardContent>
      <p className="text-sm text-gray-500 mb-4">Testimonial</p>
      <p className="text-base text-gray-700 italic">"{comment}"</p>
      <div className="flex flex-row items-center gap-4 mt-6">
        <Avatar className="w-12 h-12">
          <AvatarImage alt="" src={image} />
          <AvatarFallback>LU</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            {username}
          </CardDescription>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default CardTestimony;
