import React from "react";

type ServiceType = {
    image: string;
    title: string;
    description: string;
}
const serviceList: ServiceType[] = [
	{
		image: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio4.jpg",
		title: "Product Design",
		description:
			"Assumenda non repellendus distinctio nihil dicta sapiente, quibusdam maiores, illum at, aliquid blanditiis eligendi qui.Assumenda non repellendus distinctio nihil dicta sapiente, quibusdam maiores, illum at, aliquid blanditiis eligendi qui.",
	},
	{
		image: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio3.jpg",
		title: "Product Design",
		description:
			"Assumenda non repellendus distinctio nihil dicta sapiente, quibusdam maiores, illum at, aliquid blanditiis eligendi qui.Assumenda non repellendus distinctio nihil dicta sapiente, quibusdam maiores, illum at, aliquid blanditiis eligendi qui.",
	},
	{
		image: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio10.jpg",
		title: "Product Design",
		description:
			"Assumenda non repellendus distinctio nihil dicta sapiente, quibusdam maiores, illum at, aliquid blanditiis eligendi qui.Assumenda non repellendus distinctio nihil dicta sapiente, quibusdam maiores, illum at, aliquid blanditiis eligendi qui.",
	},
	{
		image: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio11.jpg",
		title: "Product Design",
		description:
			"Assumenda non repellendus distinctio nihil dicta sapiente, quibusdam maiores, illum at, aliquid blanditiis eligendi qui.Assumenda non repellendus distinctio nihil dicta sapiente, quibusdam maiores, illum at, aliquid blanditiis eligendi qui.",
	},
	{
		image: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio17.jpg",
		title: "Product Design",
		description:
			"Assumenda non repellendus distinctio nihil dicta sapiente, quibusdam maiores, illum at, aliquid blanditiis eligendi qui.Assumenda non repellendus distinctio nihil dicta sapiente, quibusdam maiores, illum at, aliquid blanditiis eligendi qui.",
	},
	{
		image: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio13.jpg",
		title: "Product Design",
		description:
			"Assumenda non repellendus distinctio nihil dicta sapiente, quibusdam maiores, illum at, aliquid blanditiis eligendi qui.Assumenda non repellendus distinctio nihil dicta sapiente, quibusdam maiores, illum at, aliquid blanditiis eligendi qui.",
	},
];

const ServiceItem = ({ service }: { service: ServiceType }) => (
    <div
    className="bg-center bg-no-repeat bg-cover rounded-[20px] flex flex-col justify-center items-center h-full transition duration-150"
    style={{ backgroundImage: `url(${service.image})` }}
    >
    <div className="rounded-[20px] bg-accent bg-opacity-50 text-text-primary dark:text-text-secondary backdrop-blur scale-90 hover:scale-100 opacity-0 transition duration-500 hover:opacity-100 p-4 lg:p-16 xl:p-20">
        <h4 className="text-2xl font-medium mb-4">{service.title}</h4>
        <p className="opacity-80">{service.description}</p>
    </div>
    </div>
);

const Services = () => {
	return (
		<section className="light py-14 md:py-24  text-zinc-900 dark:text-white">
			<div className="container px-4">
				<div className="grid grid-cols-12 mb-6 md:mb-12">
					<div className="col-span-12 lg:col-span-6 lg:col-start-4 text-center">
						<h2 className="text-3xl leading-none md:text-[45px] font-bold mb-6">
							Our Services
						</h2>
						<p className="text-lg opacity-80">
							Had creeping had, appear that made living morning over brought
							stars likeness first, said Don't god Upon them days them.
						</p>
					</div>
				</div>
				<div className="grid grid-cols-12 gap-6 text-center">
					{serviceList.map((service, i) => (
						<div className="col-span-12 sm:col-span-6 md:col-span-4" key={i}>
							<ServiceItem service={service} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Services;