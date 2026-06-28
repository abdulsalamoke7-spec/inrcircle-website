import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] =
    useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        "/api/products"
      );

      const foundProduct =
        data.find(
          (item) => item._id === id
        );

      setProduct(foundProduct);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <button
          onClick={() => navigate(-1)}
          className="mb-10 border border-white px-5 py-2 rounded-full"
        >
          ← Back
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-3xl"
            />
          </div>

          <div>
            <p className="uppercase text-sm tracking-[0.3em] text-white/50">
              {product.category}
            </p>

            <h1 className="text-5xl font-light mt-4">
              {product.name}
            </h1>

            <p className="text-3xl mt-6">
              ₦
              {Number(
                product.price
              ).toLocaleString()}
            </p>

            <p className="mt-8 text-white/70 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={
                  product.instagramLink
                }
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 bg-white text-black rounded-full"
              >
                Order via Instagram
              </a>

              <button
                className="px-8 py-4 border border-white rounded-full"
              >
                Buy Now (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;

