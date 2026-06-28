import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FeaturedCollection() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "/api/products"
      );

      const sortedProducts = [
        ...data.filter(
          (product) => product.featured
        ),
        ...data.filter(
          (product) => !product.featured
        ),
      ];

      setProducts(sortedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      id="featured-collection"
      className="bg-[#F5F2F1] py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <p className="uppercase tracking-[0.4em] text-sm text-[#C4AEAD]">
          Featured Collection
        </p>

        <h2 className="mt-8 text-4xl md:text-5xl font-bold">
          Pieces Inspired By The Culture
        </h2>

        <p className="mt-6 max-w-2xl text-black/60 text-lg">
          A curated selection of pieces that
          reflect the culture, creativity and
          community at the heart of InrCircle.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() =>
                navigate(
                  `/product/${product._id}`
                )
              }
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

              <p className="mt-4 font-medium">
                ₦
                {Number(
                  product.price
                ).toLocaleString()}
              </p>

              {product.featured && (
                <div className="mt-3 inline-block px-3 py-1 rounded-full bg-black text-white text-xs">
                  Featured
                </div>
              )}
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

