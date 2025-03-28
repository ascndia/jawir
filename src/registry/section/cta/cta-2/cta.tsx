import { Button } from "@/registry/components/button/select";

interface CTAProps {
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
}

const CTA = ({
  heading = "Call to Action",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis!",
  buttons = {
    primary: {
      text: "Get Started",
      url: "https://www.shadcnblocks.com",
    },
    secondary: {
      text: "Learn More",
      url: "https://www.shadcnblocks.com",
    },
  },
}: Partial<CTAProps>) => {
  return (
    <section className="py-32">
      <div className="container w-full mx-auto">
        <div className="flex flex-col items-center rounded-lg bg-accent p-8 text-center md:rounded-xl lg:p-16">
          <h3 className="mb-3 max-w-3xl text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
            {heading}
          </h3>
          <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
            {description}
          </p>
          <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
            {buttons.secondary && (
              <Button variant="outline" size="lg">
                {/* <a href={buttons.secondary.url}> */}
                {buttons.secondary.text}
                {/* </a> */}
              </Button>
            )}
            {buttons.primary && (
              <Button size="lg">
                {/* <a href={buttons.primary.url}> */}
                {buttons.primary.text}
                {/* </a> */}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
