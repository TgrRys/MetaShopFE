import { useEffect, useState } from "react";
import { ProductContext } from "./ProductContext";
import axios from "axios";
import PropTypes from "prop-types";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(
    () => JSON.parse(localStorage.getItem("products")) || [],
  );

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data.data.products);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const searchProducts = async (searchTerm) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/products?search=${searchTerm}`,
      );
      setProducts(response.data.data.products);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("products", JSON.stringify(products));
  // }, [products]);

  return (
    <ProductContext.Provider
      value={{ products, fetchProducts, searchProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
