import { useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import Cart from "../Cart/index";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export const Navbar = () => {
  const navLinks = [
    { name: "Home", url: "/" },
    { name: "Product", url: "/product" },
    ...(localStorage.getItem("token") ? [{ name: "Wishlist", url: "/wishlist" }, { name: "Purchase History", url:"/purchase-history"}] : []),
  ];

  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    if (isLoggedIn) {
      setIsCartOpen(!isCartOpen);
    } else {
      window.confirm("Anda harus login terlebih dahulu.");
      navigate("/auth");
    }
  };

  const [profileImageUrl, setProfileImageUrl] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:5000/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        if (data.success) {
          const userProfile = data.data;
          setProfileImageUrl(userProfile.image);
        } else {
          console.log("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef();

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsProfileOpen(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    navigate("/");
  };

  const goToEditProfile = () => {
    setIsProfileOpen(false);
    const token = localStorage.getItem("token");
    if (isLoggedIn && token) {
      navigate("/profile");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <nav className="relative px-8 py-4 flex justify-between items-center bg-white">
        <a className="text-3xl font-bold leading-none" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 hover:text-green-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
              clipRule="evenodd"
            />
          </svg>
        </a>
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="navbar-burger flex items-center p-3 focus:outline-none hover:text-green-500 focus:text-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 fill-current"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <ul
          className={`hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:mx-auto lg:flex lg:items-center lg:w-auto ${
            isOpen ? "block" : ""
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.url}
                className={`text-gray-700 text-md px-5 ${
                  location.pathname === link.url
                    ? "text-indigo-600"
                    : "hover:text-indigo-600"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden lg:flex items-center">
          <button onClick={toggleCart} className="mr-4 focus:outline-none">
            <Cart isOpen={isCartOpen} toggleModal={toggleCart} />{" "}
          </button>
          {isLoggedIn ? (
            <div
              onClick={toggleProfile}
              className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-600 shadow-lg"
              ref={profileRef}
            >
              {profileImageUrl && (
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="rounded-full w-full h-full object-cover"
                />
              )}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg py-2 z-50">
                  <button
                    onClick={goToEditProfile}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white rounded-t"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={logout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white rounded-b"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth"
              className="py-2 px-8 bg-indigo-600 hover:bg-indigo-800 text-sm text-center text-white hover:text-white font-bold border-2 border-gray-800 hover:border-indigo-600 hover:shadow-md
transform active:scale-75 transition-transform focus:border-4 focus:indigo-green-300 duration-700 focus:outline-none mx-3"
            >
              Sign In{" "}
            </Link>
          )}
        </div>
      </nav>
      <div className={`navbar-menu relative z-50 ${isOpen ? "" : "hidden"}`}>
        <div
          onClick={toggleMenu}
          className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
        ></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <ul>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.url}
                  className="text-gray-700 hover:text-indigo-600 text-md"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#"
                className="flex items-center text-gray-700 hover:text-indigo-600 text-md"
              ></a>
            </li>
            <li>
              <button
                className="w-full py-2 px-8 bg-white hover:bg-green-600 text-sm text-center text-gray-800 hover:text-white font-bold border-2 border-gray-800 hover:border-green-600 hover:shadow-md
    transform active:scale-75 transition-transform focus:border-4 focus:border-green-300 duration-700 focus:outline-none"
              >
                Log In
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
