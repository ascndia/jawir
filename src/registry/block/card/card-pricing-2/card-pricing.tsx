import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import { Check } from "lucide-react";
import { Button } from "@/registry/components/button/select";

interface CardPricingProps {
  title: string;
  popular: boolean;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const CardPricing = ({
  title = "Basic",
  popular = false,
  price = 0,
  description = "Lorem ipsum dolor sit amet",
  buttonText = "Get Started",
  benefitList = [
    "Lorem ipsum dolor sit amet",
    "Lorem ipsum dolor sit amet",
    "Lorem ipsum dolor sit amet",
  ],
}: Partial<CardPricingProps>) => (
  <Card
    className={
      popular ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10" : ""
    }
  >
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        {title}
        {popular ? (
          <Badge variant="secondary" className="text-sm text-primary">
            Most popular
          </Badge>
        ) : null}
      </CardTitle>
      <div>
        <span className="text-3xl font-bold">${price}</span>
        <span className="text-muted-foreground"> /month</span>
      </div>

      <CardDescription>{description}</CardDescription>
    </CardHeader>

    <CardContent>
      <div className="space-y-4">
        {benefitList.map((benefit: string, index) => (
          <span key={index} className="flex">
            <Check className="text-green-500" />{" "}
            <h3 className="ml-2">{benefit}</h3>
          </span>
        ))}
      </div>
    </CardContent>

    <hr className="w-4/5 m-auto mb-4" />

    <CardFooter>
      <Button className="w-full">{buttonText}</Button>
    </CardFooter>
  </Card>
);

export default CardPricing;
