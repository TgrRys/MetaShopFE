import { useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import Cart from "../Cart/index";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

export const Navbar = () => {
  const navLinks = [
    { name: "Home", url: "/" },
    { name: "Product", url: "/product" },
    ...(localStorage.getItem("token")
      ? [
          { name: "Wishlist", url: "/wishlist" },
          { name: "Order", url: "/Orders" },
        ]
      : []),
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
      toast.error("Please login first for cart");
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

  const goToHistoryTransaksi = () => {
    setIsProfileOpen(false);
    const token = localStorage.getItem("token");
    if (isLoggedIn && token) {
      navigate("/riwayat-transaksi");
    } else {
      navigate("/");
    }
  };

  // const goToHistoryTransaksi = () => {
  //   setIsProfileOpen(false);
  //   const
  // }

  return (
    <>
      <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
        <div className="flex justify-start lg:hidden">
          <button
            onClick={toggleMenu}
            className="navbar-burger flex items-center p-3 focus:outline-none hover:text-emerald-500 focus:text-gray-50"
          >
            <svg
              className="block h-4 w-4 fill-current text-gray-900 hover:text-emerald-500 focus:text-gray-50"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 3H0V5H20V3ZM20 9H0V11H20V9ZM0 17H20V15H0V17Z"
              />
            </svg>
          </button>
        </div>
        <a className="text-3xl font-bold leading-none" href="#">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 hidden sm:block"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M0 33.4648V0H10.3175L22.6984 21.4836L34.254 0H44.5714V33.4648L31.7778 50.4038L52 44.2066V50.4038L34.254 76.0188L29.7143 88V76.0188L47.0476 50.4038L22.6984 57.0141L37.5556 33.4648V8.67606L22.6984 33.4648L6.60317 8.67606V33.4648L4.12698 27.6808L0 33.4648Z"
              fill="#058860"
            />
          </svg> */}
          <svg
            className="h-8 w-10 hidden sm:block"
            width="52"
            height="88"
            viewBox="0 0 52 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 33.4648V0H10.3175L22.6984 21.4836L34.254 0H44.5714V33.4648L31.7778 50.4038L52 44.2066V50.4038L34.254 76.0188L29.7143 88V76.0188L47.0476 50.4038L22.6984 57.0141L37.5556 33.4648V8.67606L22.6984 33.4648L6.60317 8.67606V33.4648L4.12698 27.6808L0 33.4648Z"
              fill="#058860"
            />
          </svg>
        </a>
        <div className="lg:hidden flex items-center">
          <button onClick={toggleCart} className="mr-4 focus:outline-none">
            <Cart isOpen={isCartOpen} toggleModal={toggleCart} />{" "}
          </button>
        </div>
        <ul
          className={`hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-8 ${
            isOpen ? "block" : ""
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.url}
                className={`text-base text-gray-700 font-medium px-2 py-2 rounded ${
                  location.pathname === link.url
                    ? "text-emerald-500 border-emerald-600"
                    : "hover:text-emerald-500 hover:border-emerald-600 hover:underline"
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
                <div className="absolute right-0 mt-2 mr-2 w-48 bg-white border border-gray-200 rounded shadow-lg py-2 z-50">
                  <button
                    onClick={goToEditProfile}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-500 hover:text-white rounded-r-md"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={goToHistoryTransaksi}
                    className="w-full text-left  px-4 py-2 text-sm text-gray-700 hover:bg-emerald-500 hover:text-white rounded-r-md"
                  >
                    Riwayat Transaksi
                  </button>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-500 hover:text-white rounded-r-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth"
              className="hidden lg:inline-block py-2 px-8 bg-white hover:bg-emerald-600 text-sm text-center text-gray-800 hover:text-white font-bold border-2 border-gray-800 hover:border-emerald-600 hover:shadow-md
              transform active:scale-75 transition-transform focus:border-4 focus:border-emerald-300 duration-700 focus:outline-none"
            >
              Masuk
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
          <div className="flex items-center mb-8">
            <a
              className="mr-auto text-3xl font-bold leading-none hover:text-emerald-600"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
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
            <button className="navbar-close focus:outline-none">
              <svg
                className="h-6 w-6 text-gray-400 cursor-pointer hover:text-emerald-500 "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <ul>
              {navLinks.map((link) => (
                <li
                  key={link.name}
                  className="mb-1 inline-flex group hover:bg-emerald-50 rounded w-full"
                >
                  <div className="flex w-1 group-hover:bg-emerald-500 scale-y-0 group-hover:scale-100 transition-transform origin-top rounded-full duration-400 ease-in"></div>
                  <a
                    href={link.url}
                    className="block p-4 text-sm font-semibold text-gray-500 group-hover:text-emerald-600"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              {/* <li>
                <a
                  href="#"
                  className="flex items-center text-gray-700 hover:text-emerald-600 text-md"
                ></a>
              </li> */}
              {/* <li>
                <button
                  className="w-full py-2 px-8 bg-white hover:bg-emerald-600 text-sm text-center text-gray-800 hover:text-white font-bold border-2 border-gray-800 hover:border-emerald-600 hover:shadow-md
    transform active:scale-75 transition-transform focus:border-4 focus:border-emerald-300 duration-700 focus:outline-none"
                >
                  Log In
                </button>
              </li> */}
            </ul>
          </div>
          <div className="mt-auto">
            <div className="pt-6">
              <Link to="/auth">
                <button
                  className="w-full py-3 px-4 bg-white hover:bg-emerald-600 text-sm text-center text-gray-800 hover:text-white font-bold border-2 border-gray-800 hover:border-emerald-600 hover:shadow-md
          transform active:scale-75 transition-transform focus:border-4 focus:border-emerald-300 duration-700 focus:outline-none"
                >
                  Log In
                </button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

{
  /* <ul>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.url}
                  className="text-gray-700 hover:text-emerald-600 text-md"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#"
                className="flex items-center text-gray-700 hover:text-emerald-600 text-md"
              ></a>
            </li>
            <li>
              <button
                className="w-full py-2 px-8 bg-white hover:bg-emerald-600 text-sm text-center text-gray-800 hover:text-white font-bold border-2 border-gray-800 hover:border-emerald-600 hover:shadow-md
    transform active:scale-75 transition-transform focus:border-4 focus:border-emerald-300 duration-700 focus:outline-none"
              >
                Log In
              </button>
            </li>
          </ul> */
}
