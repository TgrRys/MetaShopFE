import { useEffect, useState } from "react";
import axios from "axios";
import { ProductComponent } from "../../components/Card/CardProduct";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const token = localStorage.getItem("token");

  const fetchProduct = async (productId) => {
    const response = await axios.get(
      `http://localhost:5000/products/${productId}`,
    );
    // console.log("Response:", response);
    // console.log("Response data:", response.data);
    return response.data.data.product;
  };

  useEffect(() => {
    const fetchWishlist = async () => {
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
        const products = await Promise.all(productIds.map(fetchProduct));
        setWishlist(products);
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      }
    };

    fetchWishlist();
  }, [token]);

  return (
    <div className="mx-10 my-5">
      <h2 className="text-2xl font-bold mb-4 text-center my-5">
        {wishlist.length > 0 ? "Item favorit Kamu" : ""}
      </h2>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
          {wishlist.map((product) => (
            <ProductComponent key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="hero-section text-gray-600 text-center py-20 rounded-lg">
          <h1 className="text-4xl mb-4">Kamu belum menambahkan item Favorit</h1>
          <p className="text-xl">
            Temukan produk yang kamu suka dan tambahkan ke favorit, yuk!
          </p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
