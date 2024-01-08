import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [variant, setVariant] = useState({ color: "", size: "" });

  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      setProduct(response.data.data.product);
      setCurrentImage(response.data.data.product.images.main);
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const bodyParameters = {
      productId: id,
      variant: variant,
    };
    try {
      await axios.post(
        "http://localhost:5000/user/cart/add",
        bodyParameters,
        config,
      );
      toast.success("Product added to cart successfully");
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 5000ms = 5 seconds

    return () => clearTimeout(timer); // This will clear the timeout if the component unmounts before the timeout is over
  }, []);

  if (loading || !product) {
    // Display skeleton screen
    return (
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3 lg:row-end-1">
              <div className="lg:flex lg:items-start">
                <div className="lg:order-2 lg:ml-5">
                  <div className="max-w-xl overflow-hidden rounded-lg bg-gray-200 animate-pulse"></div>
                </div>
                <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                  <div className="flex flex-row items-start lg:flex-col">
                    <div className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg bg-gray-200 animate-pulse"></div>
                    <div className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg bg-gray-200 animate-pulse"></div>
                    <div className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg bg-gray-200 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
              <div className="inline-flex items-center rounded-md bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 my-5 bg-gray-200 animate-pulse"></div>
              <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl bg-gray-200 animate-pulse"></h1>
              <div className="mt-3 flex select-none flex-wrap items-center gap-1">
                <div className="bg-gray-200 animate-pulse rounded-lg border border-black px-6 py-2 font-bold"></div>
              </div>
              <h2 className="mt-8 text-base text-gray-900 bg-gray-200 animate-pulse"></h2>
              <div className="mt-3 flex select-none flex-wrap items-center gap-1">
                <div className="bg-gray-200 animate-pulse rounded-lg border border-black px-6 py-2 font-bold"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <img
                    className="h-full w-full max-w-full object-cover"
                    src={currentImage}
                    alt={product.name}
                  />
                </div>
              </div>
              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col">
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg text-center"
                    onClick={() => setCurrentImage(product.images.main)}
                  >
                    <img
                      className="h-full w-full object-cover"
                      src={product.images.main}
                      alt=""
                    />
                  </button>

                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 text-center"
                    onClick={() => setCurrentImage(product.images.sub)}
                  >
                    <img
                      className="h-full w-full object-cover"
                      src={product.images.sub}
                      alt=""
                    />
                  </button>
                  {product.imgSrc.map((src, index) => (
                    <button
                      key={index}
                      type="button"
                      className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                      onClick={() => setCurrentImage(src)}
                    >
                      <img
                        className="h-full w-full object-cover"
                        src={src}
                        alt=""
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <span className="inline-flex items-center rounded-md bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 my-5">
              {product.category}
            </span>
            <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
            <div className="mt-3 flex select-none flex-wrap items-center gap-1">
              {product.variants
                .reduce((unique, variant) => {
                  return unique.includes(variant.color)
                    ? unique
                    : [...unique, variant.color];
                }, [])
                .map((color, index) => (
                  <label key={index} className="">
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      className="peer sr-only"
                      onChange={() =>
                        setVariant((prev) => ({ ...prev, color }))
                      }
                    />
                    <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">
                      {color}
                    </p>
                  </label>
                ))}
            </div>

            <h2 className="mt-8 text-base text-gray-900">Choose size</h2>
            <div className="mt-3 flex select-none flex-wrap items-center gap-1">
              {product.variants
                .reduce((unique, variant) => {
                  return unique.includes(variant.size)
                    ? unique
                    : [...unique, variant.size];
                }, [])
                .map((size, index) => (
                  <label key={index} className="">
                    <input
                      type="radio"
                      name="size"
                      value={size}
                      className="peer sr-only"
                      onChange={() => setVariant((prev) => ({ ...prev, size }))}
                    />
                    <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">
                      {size}
                    </p>
                  </label>
                ))}
            </div>
            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-end">
                <h1 className="text-3xl font-bold">
                  Rp{" "}
                  {product.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </h1>
              </div>
              <button
                type="button"
                onClick={addToCart}
                className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 mr-3 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Add to cart
              </button>
            </div>
            <ul className="mt-8 space-y-2">
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <svg
                  className="mr-2 block h-5 w-5 align-middle text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    className=""
                  ></path>
                </svg>
                Free shipping
              </li>
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <svg
                  className="mr-2 block h-5 w-5 align-middle text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    className=""
                  ></path>
                </svg>
                Cancel Anytime
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <div className="border-b border-gray-300">
              <nav className="flex gap-4">
                <a
                  href="#"
                  title=""
                  className="border-b-2 py-4 text-3xl font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                >
                  {" "}
                  Description{" "}
                </a>
              </nav>
            </div>

            <div className="mt-8 flow-root sm:mt-12">
              <div className="mt-2 text-2xl font-bold">
                {product.name} -{" "}
                <span className="text-xl text-gray-500">
                  {product.subtitle}
                </span>
              </div>
              <p className="mt-4 text-lg">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
