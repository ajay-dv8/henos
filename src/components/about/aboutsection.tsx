type servicesType = {};

const services = [
  {
    id: 1,
    title: "Delivery",
    description: "lorem ipsum",
    image: "",
  },
  {
    id: 2,
    title: "Industrial",
    description: "lorem ipsum",
    image: "",
  },
  {
    id: 3,
    title: "Drive through",
    description: "lorem ipsum",
    image: "",
  },
  {
    id: 4,
    title: "USSD",
    description: "lorem ipsum",
    image: "",
  },
];

export default function AboutSection() {
  return (
    <div className="p-6 md:p-12 relative">
      <div className="">
        <h2 className="text-3xl max-w-5xl md:text-5xl text-gray-800 mb-4 font-medium">
          Henos Energy delivers reliable, clean energy solutions for homes and
          businesses, powering a safer and more sustainable future in Ghana.
        </h2>
      </div>

      {/* Card */}
      <div className="flex gap-12">
        {services.map((service, index) => (
          <div className="">
            <div className="mt-24 relative flex flex-wrap gap-8 ">
              <div className="h-120 w-104 bg-green-50 rounded-xl p-4 content-fit">
                <div className="h-104 w-full bg-green-400 rounded-lg"></div>

                <div className="mt-2 px-2">
                  <h5 className="text-start font-semibold text-gray-700 w-full text-2xl">
                    {service.title}
                  </h5>
                </div>
              </div>
            </div>

            <div className="">
              <p className="">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
