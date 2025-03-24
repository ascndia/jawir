import React from "react";

const CTA = () => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:py-14 lg:px-20 p-10 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-between flex-col lg:flex-row">
          <div className="block text-center mb-5 lg:text-left lg:mb-0">
            <h2 className="font-sans text-4xl text-text-primary font-semibold mb-5 lg:mb-2">
              Connect with us
            </h2>
            <p className="text-xl text-text-secondary">
              Contact us with any query or any idea.
            </p>
          </div>
          <button className="flex cursor-pointer items-center gap-2 bg-background rounded-full shadow-md text-lg font-semibold py-4 px-8 transition duration-300 hover:bg-hover">
            Get In Touch
            <svg
              width="19"
              height="14"
              viewBox="0 0 19 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.75 7L16.4167 7M11.8333 12.5L16.6852 7.64818C16.9907 7.34263 17.1435 7.18985 17.1435 7C17.1435 6.81015 16.9907 6.65737 16.6852 6.35182L11.8333 1.5"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
