import React from "react";

const clientLogos = [
	{
		logo: "https://cdn.easyfrontend.com/pictures/logos/color-fill-logo-1.jpeg",
		alt: "",
	},
	{
		logo: "https://cdn.easyfrontend.com/pictures/logos/color-fill-logo-2.jpeg",
		alt: "",
	},
	{
		logo: "https://cdn.easyfrontend.com/pictures/logos/color-fill-logo-3.jpeg",
		alt: "",
	},
	{
		logo: "https://cdn.easyfrontend.com/pictures/logos/color-fill-logo-4.jpeg",
		alt: "",
	},
	{
		logo: "https://cdn.easyfrontend.com/pictures/logos/color-fill-logo-5.jpeg",
		alt: "",
	},
	{
		logo: "https://cdn.easyfrontend.com/pictures/logos/color-fill-logo-6.jpeg",
		alt: "",
	},
];

const CompanyLogos = () => {
	return (
		<section className="light py-14 md:py-24 bg-background">
			<div className="container px-4">
				<div className="grid grid-cols-12">
					<div className="col-span-12 xl:col-span-4 xl:pr-12 mb-6 md:mb-12">
						<h2 className="font-bold text-2xl lg:text-[45px] leading-none mb-6">
							Our Clients
						</h2>
						<p className="text-lg leading-9 opacity-70">
							It’s easier to reach your savings goals when you have the right
							savings account. Take a look and find the right one for you!It’s
							easier to reach your savings goals when you have the right savings
							account.
						</p>
					</div>
					<div className="col-span-12 xl:col-span-8">
						<div className="grid grid-cols-12 gap-6 text-center">
							<div className="col-span-12 sm:col-span-4">
								{clientLogos.slice(0, 2).map((client, i) => (
									<img
										src={client.logo}
										alt={client.alt}
										className="rounded-[30px] w-100 h-auto mb-4 lg:mb-6"
										key={i}
									/>
								))}
							</div>
							<div className="col-span-12 sm:col-span-4 md:mt-12">
								{clientLogos.slice(2, 4).map((client, i) => (
									<img
										src={client.logo}
										alt={client.alt}
										className="rounded-[30px] w-100 h-auto mb-4 lg:mb-6"
										key={i}
									/>
								))}
							</div>
							<div className="col-span-12 sm:col-span-4 md:mt-12 md:pt-12">
								{clientLogos.slice(4, 6).map((client, i) => (
									<img
										src={client.logo}
										alt={client.alt}
										className="rounded-[30px] w-100 h-auto mb-4 lg:mb-6"
										key={i}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CompanyLogos;