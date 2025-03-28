import CardTestimony from "@/registry/block/card-testimony/card-testimony-8/card-testimony";

const Testimonial = () => {
  const testimonials = [
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074",
      name: "David James",
      title: "CEO/ Chairman",
      text: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      rating: 5,
    },
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074",
      name: "Sarah Johnson",
      title: "Marketing Manager",
      text: "Eget dolor urna viverra urna rutrum lorem venenatis auctor. Id vitae egestas cursus iaculis sed sit parturient. Aenean euismod bibendum laoreet.",
      rating: 4,
    },
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074",
      name: "Michael Brown",
      title: "Software Engineer",
      text: "Euismod scelerisque in netus sed lacinia.",
      rating: 5,
    },
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074",
      name: "Emily Davis",
      title: "Product Designer",
      text: "Eget dolor urna viverra urna rutrum lorem venenatis auctor. Id vitae egestas cursus iaculis sed sit parturient. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
      rating: 4,
    },
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074",
      name: "John Smith",
      title: "Business Analyst",
      text: "Lorem ipsum dolor sit amet.",
      rating: 5,
    },
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074",
      name: "Anna Wilson",
      title: "HR Specialist",
      text: "Eget dolor urna viverra urna rutrum lorem venenatis auctor. Id vitae egestas cursus iaculis sed sit parturient. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
      rating: 5,
    },
  ];

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-12py-12 md:px-10 md:py-20">
        <h2 className="mx-auto mb-6 w-full max-w-3xl text-center text-3xl font-semibold md:mb-12 md:text-5xl">
          What our clients are saying
        </h2>
        <div className="mb-8 gap-x-5 py-4 md:mb-12 columns-1 c-col-1 sm:columns-2 c-sm-col-2 md:columns-3 c-md-col-3 lg:mb-16">
          {testimonials.map((testimonial, index) => (
            <CardTestimony key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
