import { Button } from "@/registry/components/button/select";
import React from "react";

const Cookies = () => {
	return (
		<section className=" light py-14 md:py-24">
			<div className="container px-4">
				<div className="grid grid-cols-12">
					<div className="col-span-12 md:col-span-6 md:col-start-4 lg:col-span-4 lg:col-start-5 xl:px-16">
						<div className="shadow-lg bg-secondary dark:bg-secondary-dark  rounded-2xl hover:bg-hover hover:bg-opacity-10 dark:hover:bg-opacity-1 p-6 md:p-10">
							<div className="text-center">
								<img
									src="https://cdn.easyfrontend.com/pictures/cookies.png"
									alt=""
									className="mb-4 mx-auto"
									width="100"
									height="auto"
								/>
								<p className="leading-normal opacity-80 mb-8">
									This website uses cookies to ensure you the best experience on
									our website.
								</p>
                                <div className="flex w-full items-center justify-center gap-4">

								<Button
									className="text-lg font-bold leading-none"
                                    >
									Accept
								</Button>
								<Button
                                variant="outline"   
									className="text-lg font-bold leading-none"
                                    >
									Reject
								</Button>
                                </div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default Cookies;