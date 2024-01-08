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

  const searchProducts = async (searchTerm, sortOption, category) => {
    try {
      let url = `http://localhost:5000/products?`;

      if (searchTerm) {
        url += `search=${searchTerm}`;
      }

      if (sortOption) {
        url += searchTerm ? `&sort=${sortOption}` : `sort=${sortOption}`;
      }

      // Add category to the query parameters
      if (category) {
        url += `&category=${category}`;
      }

      console.log(url);
      const response = await axios.get(url);
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
