import { Button } from "@/registry/components/button/select";
import React from "react";

type BlogType = {
    img: string;
    title: string;
    price: string;
    format: string;
};

const blogs: BlogType[] = [
	{
		img: "https://cdn.easyfrontend.com/pictures/courses/courses_3_1.png",
		title: "Learn to code with VS editor now",
		price: "£20",
		format: "MP4 Format",
	},
	{
		img: "https://cdn.easyfrontend.com/pictures/courses/courses_3_2.png",
		title: "Adobe Photoshop or Illustrator?",
		price: "£10",
		format: "PDF Format",
	},
	{
		img: "https://cdn.easyfrontend.com/pictures/courses/courses_3_3.png",
		title: "How to Improve Your Personal Skills",
		price: "£35",
		format: "PDF Format",
	},
];


const BlogItem = ({ item }: { item: BlogType }) => (
    <div className="rounded-lg overflow-hidden mt-6 lg:mt-0">
      <div className="relative">
        <img src={item.img} alt="" className="w-full" />
        <div className="absolute bottom-0 flex flex-col justify-center items-center w-full text-white text-text-primary px-12 pb-6 text-center">
          <h4 className="text-[22px] font-medium">{item.title}</h4>
          <h5 className="text-[22px] font-medium text-text-primary my-3">
            {item.price}
          </h5>
          <Button className="w-full px-9 mb-3"
          >
            Add To Cart
          </Button>
          <p className="text-base opacity-80">{item.format}</p>
        </div>
      </div>
    </div>
  );


const Blog = () => {
	return (
<section className="light py-14 md:py-24 text-text-primary bg-background dark:bg-background-dark dark:text-text-secondary overflow-hidden">
    <div className="container px-8 md:px-24">
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-9">
          <h1 className="text-[32px] lg:text-[45px] leading-none font-bold mb-3">
            We’re offering Some useful Course Materials
          </h1>
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-9">
              <p className="text-lg opacity-80 mb-2">
                Vitae bibendum egestas magna sit elit non. Netus volutpat
                dignissim pharetra felis. Orci commodo mauris adipiscing
                semper amet.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-12">
          <div className="grid grid-cols-6 gap-x-6 mt-12">
            {blogs.map((item, i) => (
              <div className="col-span-6 md:col-span-3 lg:col-span-2" key={i}>
                <BlogItem item={item} />
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12">
          <div className="text-center mt-12">
            <Button variant="outline" className=" rounded transition  px-8 py-3">
              View All
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
	);
};

export default Blog;