import CardPricing from "@/registry/block/card-pricing/card-pricing-3/card-pricing";
import { Button } from "@/registry/components/button/select";

const pricingPlans = [
  {
    tier: "Free",
    price: "$0/mo",
    bestFor: "Best for 1-5 users",
    CTA: <Button>Get started free</Button>,
    benefits: [
      { text: "One workspace", checked: true },
      { text: "Email support", checked: true },
      { text: "1 day data retention", checked: false },
      { text: "Custom roles", checked: false },
      { text: "Priority support", checked: false },
      { text: "SSO", checked: false },
    ],
  },
  {
    tier: "Pro",
    price: "$79/mo",
    bestFor: "Best for 5-50 users",
    CTA: <Button className="w-full">14-day free trial</Button>,
    benefits: [
      { text: "Five workspaces", checked: true },
      { text: "Email support", checked: true },
      { text: "7 day data retention", checked: true },
      { text: "Custom roles", checked: true },
      { text: "Priority support", checked: false },
      { text: "SSO", checked: false },
    ],
  },
  {
    tier: "Enterprise",
    price: "Contact us",
    bestFor: "Best for 50+ users",
    CTA: <Button>Contact us</Button>,
    benefits: [
      { text: "Unlimited workspaces", checked: true },
      { text: "Email support", checked: true },
      { text: "30 day data retention", checked: true },
      { text: "Custom roles", checked: true },
      { text: "Priority support", checked: true },
      { text: "SSO", checked: true },
    ],
  },
];

const Pricing = () => {
  return (
    <section className="relative overflow-hidden bg-background text-foreground">
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 md:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
            Pricing
          </h2>
          <p className="text-base text-muted-foreground md:text-lg">
            Use it for free for yourself, upgrade when your team needs advanced
            control.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <CardPricing key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
