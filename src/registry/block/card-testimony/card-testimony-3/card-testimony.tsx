import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
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
    <CardHeader className="flex flex-row items-center gap-4">
      <div className="flex flex-col">
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription>{username}</CardDescription>
      </div>
    </CardHeader>
    <CardContent>
      <p>{comment}</p>
    </CardContent>
  </Card>
);

export default CardTestimony;
