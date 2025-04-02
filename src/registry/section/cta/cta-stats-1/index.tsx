"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const motionVariants = {
  container: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
};
const stats = [{
    value: "95%",
    label: "User satisfaction rate",
  }, {
    value: "2x",
    label: "Higher interview rates",
  }, {
    value: "10k+",
    label: "Jobs available",
  }, {
    value: "24/7",
    label: "Support available",
  }];


export const CTAStats1A = () => (
  <section className="bg-primary/30 text-on-primary py-16">
    <div className="mx-auto container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Job Search?</h2>
          <p className="text-xl text-on-primary-muted mb-8">
            Join thousands of professionals who have already found their dream jobs through UltraJob.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/sign-in">
              <Button size="lg" className="w-full">Get Started Free</Button>
            </Link>
            <Link href="/job-swipe">
              <Button size="lg" variant="outline" className="w-full">Try Job Swiping</Button>
            </Link>
          </div>
        </div>
        <motion.div
          variants={motionVariants.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={motionVariants.item}
              className="bg-card backdrop-blur-sm p-6 rounded-lg border border-primary-border"
            >
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <p className="text-on-primary-muted">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export const CTAStats1B = () => (
  <section className="bg-secondary/30 text-on-secondary py-16">
    <div className="mx-auto container">
      <div className="grid grid-cols-1 gap-12 items-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Achieve Your Career Goals</h2>
          <p className="text-xl text-on-secondary-muted mb-8">
            Discover how UltraJob can help you land your dream job faster.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/sign-in">
              <Button size="lg">Get Started Free</Button>
            </Link>
            <Link href="/job-swipe">
              <Button size="lg" variant="outline">Try Job Swiping</Button>
            </Link>
          </div>
        </div>
        <motion.div
          variants={motionVariants.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={motionVariants.item}
              className="bg-card backdrop-blur-sm p-6 rounded-lg border border-secondary-border text-center"
            >
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <p className="text-on-secondary-muted">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export const CTAStats1C = () => (
  <section className="bg-tertiary/30 text-on-tertiary py-16">
    <div className="mx-auto container">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <div className="lg:col-span-1">
          <h2 className="text-3xl font-bold mb-4">Why Choose UltraJob?</h2>
          <p className="text-xl text-on-tertiary-muted mb-8">
            UltraJob offers unmatched tools and support to help you succeed in your job search.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/sign-in">
              <Button size="lg">Get Started Free</Button>
            </Link>
            <Link href="/job-swipe">
              <Button size="lg" variant="outline">Try Job Swiping</Button>
            </Link>
          </div>
        </div>
        <motion.div
          variants={motionVariants.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="lg:col-span-2 grid grid-cols-2 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={motionVariants.item}
              className="bg-card backdrop-blur-sm p-6 rounded-lg border border-tertiary-border"
            >
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <p className="text-on-tertiary-muted">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export const CTAStats1D = () => (
    <section className="bg-quaternary/30 text-on-quaternary py-16">
      <div className="mx-auto container">
        <div className="grid grid-cols-1 gap-12 items-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Your Success, Our Mission</h2>
            <p className="text-xl text-on-quaternary-muted mb-8">
              UltraJob is here to guide you every step of the way to your dream career.
            </p>
          </div>
          <motion.div
            variants={motionVariants.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={motionVariants.item}
                className="bg-card backdrop-blur-sm p-6 rounded-lg border border-quaternary-border text-center"
              >
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <p className="text-on-quaternary-muted">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
          <div className="flex justify-center gap-4 mt-8">
            <Link href="/sign-in">
              <Button size="lg">Join Now</Button>
            </Link>
            <Link href="/learn-more">
              <Button size="lg" variant="outline">Learn More</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );

  export const CTAStats1E = () => (
    <section className="bg-quinary/30 text-on-quinary py-16">
      <div className="mx-auto container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={motionVariants.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={motionVariants.item}
                className="bg-card backdrop-blur-sm p-6 rounded-lg border border-quinary-border"
              >
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <p className="text-on-quinary-muted">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Empower Your Job Search</h2>
            <p className="text-xl text-on-quinary-muted mb-8">
              Take the next step in your career with UltraJob's innovative tools and resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/sign-in">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="/features">
                <Button size="lg" variant="outline">Explore Features</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );