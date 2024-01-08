import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductSkeleton = () => (
  <div
    className="animate-pulse group my-3 flex flex-col w-full max-w-xs overflow-hidden border border-gray-200 bg-white shadow-lg m-1 rounded-lg relative"
    style={{ height: "400px", width: "300px" }}
  >
    <div className="relative h-48 w-full overflow-hidden bg-gray-200"></div>
    <div className="p-4 flex flex-col justify-between flex-grow">
      <div>
        <p className="text-sm text-gray-500 mb-2 relative">
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          <div className="absolute right-0 top-0 h-6 w-6 rounded-full bg-gray-200"></div>
        </p>
        <div className="mb-2">
          <div className="h-5 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="mt-2 mb-4 flex items-center justify-between">
        <div className="h-5 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  </div>
);

const ProductComponent = ({ product }) => {
  const [isWishlist, setIsWishlist] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!token) {
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/user/wishlist",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const productIds = response.data.data.wishlist.map(
          (item) => item.product,
        );
        setWishlist(productIds);
        setIsWishlist(productIds.includes(product._id));
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      }
    };

    fetchWishlist();
  }, [product._id, token]);

  const handleWishlist = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!token) {
      toast.error("Please login first to add wishlist");
      return;
    }

    if (wishlist.includes(product._id)) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/user/wishlist/remove/${product._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data.success) {
          toast.success("Item successfully removed from wishlist");
          console.log("Item successfully removed from wishlist");
          setWishlist(wishlist.filter((id) => id !== product._id));
          setIsWishlist(false);
        } else {
          console.log("Failed to remove item from wishlist");
        }
      } catch (error) {
        toast.error("An error occurred while removing item from wishlist");
        console.error(
          "An error occurred while removing item from wishlist",
          error,
        );
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/user/wishlist/add",
          { productId: product._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data.success) {
          toast.success("Item successfully added to wishlist");
          console.log("Item successfully added to wishlist");
          setWishlist([...wishlist, product._id]);
          setIsWishlist(true);
        } else {
          console.log("Failed to add item to wishlist");
        }
      } catch (error) {
        toast.error("An error occurred while adding item to wishlist");
        console.error("An error occurred while adding item to wishlist", error);
      }
    }
  };

  return (
    <div
      key={product._id}
      className="group my-3 flex flex-col w-full max-w-xs overflow-hidden border border-gray-200 bg-white shadow-lg m-1 rounded-lg relative"
      style={{ height: "400px", width: "300px" }}
    >
      <a className="relative h-48 w-full overflow-hidden" href="#">
        <img
          className="absolute top-0 right-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={product.images.main}
          alt={product.name}
        />
      </a>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <p className="text-sm text-gray-500 mb-2 relative">
            Kategori : {product.category}
            <button
              type="button"
              onClick={(event) => handleWishlist(event)}
              className={`absolute right-0 top-0 ${
                isWishlist
                  ? "text-red-500"
                  : "text-indigo-500 hover:text-indigo-700"
              } focus:outline-none`}
            >
              <svg
                className="h-6 w-6"
                fill={isWishlist ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </p>
          <Link to={`/product/${product._id}`} className="mb-2">
            <h5 className="text-lg tracking-tight text-gray-900 overflow-ellipsis overflow-hidden">
              {product.name}
            </h5>
          </Link>
        </div>
        <div className="mt-2 mb-4 flex items-center justify-between">
          <p>
            <span className="text-lg font-bold text-gray-900">
              Rp{product.price}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

ProductComponent.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    images: PropTypes.shape({
      main: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export { ProductComponent };

export const CardProduct = () => {
  const [loading, setLoading] = useState(false);
  const { products } = useContext(ProductContext);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <div className="flex flex-wrap">
      {products.map((product, index) =>
        loading ? (
          <ProductSkeleton key={`skeleton-${index}`} />
        ) : (
          <Link to={`/product/${product._id}`} key={`product-${index}`}>
            <ProductComponent product={{ ...product, id: product._id }} />
          </Link>
        ),
      )}
    </div>
  );
};

export default CardProduct;
