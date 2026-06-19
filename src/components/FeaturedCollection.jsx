import blackShorts from "../assets/images/products/black-shorts.jpeg";
import greyShorts from "../assets/images/products/grey-shorts.jpeg";
import blackSweatpants from "../assets/images/products/black-sweatpants.jpeg";
import shades from "../assets/images/products/shades.jpeg";

function FeaturedCollection() {
  const products = [
    {
      name: "Midnight Utility Shorts",
      description:
        "Relaxed fit. Built for movement, culture and everyday wear.",
      image: blackShorts,
    },
    {
      name: "Concrete Utility Shorts",
      description:
        "Minimal, versatile and designed for effortless styling.",
      image: greyShorts,
    },
    {
      name: "After Hours Sweatpants",
      description:
        "Comfort-driven essentials inspired by late nights and creativity.",
      image: blackSweatpants,
    },
    {
      name: "Vision Frames",
      description:
        "A statement accessory designed to complete the look.",
      image: shades,
    },
  ];

  return (
    <section className="bg-[#F5F2F1] py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <p className="uppercase tracking-[0.4em] text-sm text-[#C4AEAD]">
          Featured Collection
        </p>

        <h2 className="mt-8 text-4xl md:text-5xl font-bold">
          Pieces Inspired By The Culture
        </h2>

        <p className="mt-6 max-w-2xl text-black/60 text-lg">
          A curated selection of pieces that reflect the culture,
          creativity and community at the heart of InrCircle.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {products.map((product) => (
            <div
              key={product.name}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[420px] object-cover transition duration-500 group-hover:scale-105"
                />

              </div>

              <h3 className="mt-5 text-xl font-semibold">
                {product.name}
              </h3>

              <p className="mt-2 text-sm text-black/60 leading-relaxed">
                {product.description}
              </p>

            </div>
          ))}

        </div>

        <div className="mt-16">

          <a
            href="https://instagram.com/inrcircle.shop"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 border border-black px-8 py-4 rounded-full hover:bg-black hover:text-white transition"
          >
            Explore The Collection →
          </a>

        </div>

      </div>
    </section>
  );
}

export default FeaturedCollection;