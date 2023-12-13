import { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0); // Add this line
  const token = localStorage.getItem("token");

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchCart = async () => {
      if (!token) {
        setTotalQuantity(0);
        return;
      }

      // Replace with your own API endpoint
      const response = await axios.get("http://localhost:5000/user/cart", {
        headers: {
          Authorization: `Bearer ${token}`, // replace `token` with your actual token
        },
      });
      const cart = response.data.data.cart;
      setCart(cart);

      // Calculate total quantity here and set it
      const total = cart.reduce((total, item) => total + item.quantity, 0);
      setTotalQuantity(total); // Set the total quantity
    };

    fetchCart();

    // Real-time update
    const intervalId = setInterval(fetchCart, 5000); // Fetch every 5 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <button
        className="py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
        aria-label="Cart"
        onClick={toggleModal}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        <span className="absolute inset-0 object-right-top -mr-6">
          {/* <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
            {setCart.length}
          </div> */}
          <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
            {totalQuantity}
          </div>
        </span>
      </button>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Shopping Cart
                    </h3>
                    <div className="mt-2">
                      {cart.map((item, index) => (
                        <div key={index}>
                          <h2>{item.name}</h2>
                          <p>{item.description}</p>
                          <p>{item.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={toggleModal}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
