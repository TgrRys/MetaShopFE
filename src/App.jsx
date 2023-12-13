import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthProvider";
import Footer from "./components/Footer";
import { Header } from "./components/Header/index";
import Auth from "./components/Auth/Auth";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import CardOTP from "./components/Card/CardOTP";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Profile from "./pages/Profile/Profile";
import { ProductProvider } from "./contexts/ProductProvider";
import Wishlist from "./pages/Wishlist/Wishlist";
import ProductDetail from "./pages/ProductDetail/ProductDetail";

function Layout({ children }) {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/auth" && location.pathname !== "/otp" && (
        <Header />
      )}
      {children}
      {location.pathname !== "/auth" && location.pathname !== "/otp" && (
        <Footer />
      )}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/otp" element={<CardOTP />} />
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/product"
            element={
              <ProductProvider>
                <Layout>
                  <Product />
                </Layout>
              </ProductProvider>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductProvider>
                <Layout>
                  <ProductDetail />
                </Layout>
              </ProductProvider>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route
            path="/wishlist"
            element={
              <Layout>
                <Wishlist />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
