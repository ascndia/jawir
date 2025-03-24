import { ArrowRight } from "lucide-react";

interface StatsProps {
  heading?: string;
  description?: string;
  link?: {
    text: string;
    url: string;
  };
  stats?: Array<{
    id: string;
    value: string;
    label: string;
  }>;
}

const Stats = ({
  heading = "Platform performance insights",
  description = "Ensuring stability and scalability for all users",
  link = {
    text: "Read the full impact report",
    url: "https://www.shadcnblocks.com",
  },
  stats = [
    {
      id: "stat-1",
      value: "250%+",
      label: "average growth in user engagement",
    },
    {
      id: "stat-2",
      value: "$2.5m",
      label: "annual savings per enterprise partner",
    },
    {
      id: "stat-3",
      value: "200+",
      label: "integrations with top industry platforms",
    },
    {
      id: "stat-4",
      value: "99.9%",
      label: "customer satisfaction over the last year",
    },
  ],
}: Partial<StatsProps>) => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col gap-4 md:text-start text-center">
          <h2 className="text-2xl font-bold md:text-4xl">{heading}</h2>
          <p>{description}</p>
          <div
            // target="_blank"
            // href={link.url}
            className="flex items-center mx-auto md:mx-0  gap-1 font-bold hover:underline"
          >
            {link.text}
            <ArrowRight className="h-auto w-4" />
          </div>
        </div>
        <div className="mt-14 grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-4 md:justify-items-stretch justify-items-center">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col gap-5">
              <div className="text-6xl font-bold">{stat.value}</div>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
