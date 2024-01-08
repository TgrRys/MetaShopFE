import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
// import { Navigate } from "react-router-dom";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const token = localStorage.getItem("token");
  const [selectedItems, setSelectedItems] = useState([]);
  const [products, setProducts] = useState({});
  const [orderStatus, setOrderStatus] = useState("");
  const [isWishlist, setIsWishlist] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (id, index) => {
    const found = selectedItems.find((item) => item.id === id);
    if (found) {
      setSelectedItems(selectedItems.filter((item) => item.id !== id));
    } else {
      setSelectedItems([...selectedItems, { id, index }]);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const fetchCart = async () => {
    if (!token) {
      setTotalQuantity(0);
      return;
    }

    const response = await axios.get("http://localhost:5000/user/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const cart = response.data.data.cart;
    setCart(cart);

    const total = cart.length;
    setTotalQuantity(total);
  };

  const getProductDetails = async (itemId) => {
    if (!products[itemId]) {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${itemId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setProducts((prevProducts) => ({
          ...prevProducts,
          [itemId]: response.data.data.product,
        }));
      } catch (error) {
        console.error("Error fetching product details", error);
      }
    }
  };

  useEffect(() => {
    cart.forEach((item) => {
      getProductDetails(item.product._id);
    });
  }, [cart]);

  const getQuantity = (itemId, variant) => {
    const product = products[itemId];
    if (product) {
      const productVariant = product.variants.find(
        (v) => v.color === variant.color && v.size === variant.size,
      );
      const quantity = productVariant ? productVariant.quantity : 0;
      return quantity;
    }
    return 0;
  };

  useEffect(() => {
    fetchCart();
    getQuantity();
  }, []);

  const handleDelete = async () => {
    Swal.fire({
      text: "Apakah kamu yakin ingin menghapus item ini dari keranjang?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya, hapus!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleting...",
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
        fetchCart();
        setOrderStatus("");
        setTotalPrice(0);
        console.log(selectedItems);
        for (let item of selectedItems) {
          await axios.delete(
            `http://localhost:5000/user/cart/remove/${item.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
        }
        fetchCart();
        setSelectedItems([]);
        Swal.fire({
          title: "Deleted!",
          text: "Item berhasil dihapus.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleEditOrder = async (shippingAddressIndex) => {
    if (orderId) {
      await axios.put(
        `http://localhost:5000/order/edit/${orderId}`,
        {
          shippingAddress: shippingAddressIndex,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    }
  };

  const handlePayment = async (orderId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/payment/process",
        { orderId: orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.code === "200") {
        const paymentData = JSON.parse(response.data.data.dataPayment.response);
        window.location.href = paymentData.redirect_url;
      }
    } catch (error) {
      console.error("Failed to handle payment:", error);
    }
  };

  const handleAddToWishlist = async (product) => {
    if (!token) {
      toast.error("Please login first to add wishlist");
      return;
    }

    if (isWishlist[product._id]) {
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
          setIsWishlist((prevIsWishlist) => ({
            ...prevIsWishlist,
            [product._id]: false,
          }));
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
          setIsWishlist((prevIsWishlist) => ({
            ...prevIsWishlist,
            [product._id]: true,
          }));
        } else {
          console.log("Failed to add item to wishlist");
        }
      } catch (error) {
        toast.error("An error occurred while adding item to wishlist");
        console.error("An error occurred while adding item to wishlist", error);
      }
    }
  };

  useEffect(() => {
    fetchCart();
    const intervalId = setInterval(fetchCart, 5000);

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
                <div className="">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    {cart.length > 0 && orderStatus !== "Order" ? (
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Keranjang
                      </h3>
                    ) : (
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Pesanan
                      </h3>
                    )}
                    <button
                      onClick={toggleModal}
                      type="button"
                      className="absolute right-0 top-0 m-2 text-gray-600 hover:text-gray-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    {cart.length > 0 && orderStatus !== "Order" ? (
                      <a href="/cart">
                        <p className="text-sm text-gray-500 text-left my-2">
                          Lihat semua
                        </p>
                      </a>
                    ) : (
                      <a href="">
                        <p className="text-sm text-gray-500 text-left my-2">
                          Pesanan saya
                        </p>
                      </a>
                    )}
                    <div className="mt-2">
                      {cart.length === 0 && orderStatus !== "Order" ? (
                        <div className="flex flex-col justify-center items-center text-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-20 w-20 text-gray-400 mx-auto"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 2a8 8 0 100 16 8 8 0 000-16zM6 9a1 1 0 112 0v3a1 1 0 11-2 0V9zm8 0a1 1 0 112 0v3a1 1 0 11-2 0V9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p className="text-gray-500 my-3">
                            Kamu belum menambahkan item ke keranjang
                          </p>
                        </div>
                      ) : (
                        <>
                          {orderStatus === "Order" ? (
                            <>
                              {selectedItems.map((selectedItem) => {
                                const item = cart[selectedItem.index];
                                if (
                                  !item ||
                                  !item.product ||
                                  !item.product.images
                                ) {
                                  return null;
                                }
                                return (
                                  <div key={selectedItem.index}>
                                    <ul className="flex flex-col gap-y-5 m-10 max-w-full mx-auto">
                                      <li className="relative mx-4 flex flex-col space-y-3 py-2 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                                        <div className="shrink-0 relative">
                                          <img
                                            className="h-24 w-24 max-w-full rounded-lg object-cover"
                                            src={item.product.images.main}
                                            alt={item.product.name}
                                          />
                                        </div>
                                        <div className="flex-grow flex flex-col sm:flex-col sm:justify-between">
                                          <h4 className="text-sm font-semibold text-gray-900">
                                            {item.product.name}
                                          </h4>
                                          <p className="text-sm text-gray-500 mt-2">
                                            Rp. {item.price}
                                          </p>
                                          <div className="flex flex-col justify-between sm:flex-row sm:items-center sm:space-x-5">
                                            <p className="text-sm text-gray-500">
                                              Jumlah: {item.quantity}
                                            </p>
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                );
                              })}
                              <div className="w-full max-w-md mx-auto">
                                {data && data.addresses && (
                                  <details className="mb-4">
                                    <summary className="font-semibold py-2 px-4">
                                      Pilih Alamat Pengiriman
                                    </summary>
                                    {data.addresses.map((address, index) => (
                                      <div
                                        className="px-4 py-5 border-b border-green-500 sm:px-6"
                                        key={index}
                                      >
                                        <label className="cursor-pointer">
                                          <input
                                            type="radio"
                                            name="address"
                                            value={index}
                                            className="mr-2 text-green-700 hover:text-green-900 text-outline-none focus:outline-none"
                                            onChange={(e) =>
                                              handleEditOrder(
                                                Number(e.target.value),
                                              )
                                            }
                                          />
                                          <div className="flex flex-col text-sm text-gray-500 text-right">
                                            <p className="text-sm text-gray-500">
                                              Jalan: {address.street}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                              Kota: {address.city}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                              Negara: {address.country}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                              Kode Pos: {address.postalCode}
                                            </p>
                                          </div>
                                        </label>
                                      </div>
                                    ))}
                                  </details>
                                )}
                                <div className="flex justify-end items-end text-sm font-thin my-5">
                                  <div className="flex items-center">
                                    <input
                                      type="text"
                                      placeholder="Masukkan kode kupon"
                                      className="border rounded-l-lg py-2 px-4 border-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-between items-end text-md font-semibold my-5">
                                <p>Total Harga</p>
                                <p className="text-green-700 hover:text-green-900">
                                  Rp.{" "}
                                  {(
                                    selectedItems.reduce(
                                      (total, selectedItem) =>
                                        total +
                                        Number(
                                          cart[
                                            selectedItem.index
                                          ].price.replace(".", ""),
                                        ) *
                                          cart[selectedItem.index].quantity,
                                      0,
                                    ) / 1000
                                  ).toFixed(3)}
                                </p>
                              </div>
                              <div className="flex justify-between items-end text-md font-semibold mt-5">
                                <p></p>
                                <button
                                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                  onClick={() => handlePayment(orderId)}
                                >
                                  Bayar
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              {selectedItems.length > 0 && (
                                <div className="flex justify-between text-md font-semibold my-5">
                                  <p>{selectedItems.length} produk terpilih</p>
                                  <button
                                    onClick={handleDelete}
                                    className="text-sm text-green-700 hover:text-green-900"
                                  >
                                    Hapus
                                  </button>
                                </div>
                              )}
                              {cart.map((item, index) => (
                                <div key={index}>
                                  <ul className="flex flex-col gap-y-5 m-10 max-w-full mx-auto">
                                    <li className="relative mx-4 flex flex-col space-y-3 py-2 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                                      <input
                                        type="checkbox"
                                        className="mr-2 text-green-700 hover:text-green-900 text-outline-none focus:outline-none"
                                        checked={selectedItems.some(
                                          (selectedItem) =>
                                            selectedItem.index === index,
                                        )}
                                        onChange={() =>
                                          handleSelect(item._id, index)
                                        }
                                      />
                                      <div className="shrink-0 relative">
                                        <img
                                          className="h-24 w-24 max-w-full rounded-lg object-cover"
                                          src={item.product.images.main}
                                          alt={item.product.name}
                                        />
                                      </div>

                                      <div className="flex-grow flex flex-col sm:flex-col sm:justify-between">
                                        <p className="text-sm text-amber-600 font-semibold">
                                          Sisa{" "}
                                          {getQuantity(
                                            item.product._id,
                                            item.variant,
                                          )}
                                        </p>
                                        <h4 className="text-sm font-medium text-gray-600">
                                          {item.product.name}
                                        </h4>
                                        <p className="text-sm font-semibold text-gray-900 mt-1">
                                          Rp. {item.price}
                                        </p>
                                        <p className="text-sm font-normal text-gray-600 mt-1">
                                          {item.variant.size}
                                        </p>
                                        <div className="flex flex-col justify-between sm:flex-row sm:items-center sm:space-x-5">
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleAddToWishlist(item.product)
                                            }
                                            className={`${
                                              isWishlist[item.product._id] // Use the product's id to check its wishlist status
                                                ? "text-red-500"
                                                : "text-gray-500 hover:text-gray-900"
                                            } focus:outline-none`}
                                          >
                                            <svg
                                              className="h-6 w-6"
                                              fill={
                                                isWishlist[item.product._id] // Use the product's id to check its wishlist status
                                                  ? "currentColor"
                                                  : "none"
                                              }
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
                                          <div className="flex flex-row items-center my-2 py-1/2 border border-gray-600 rounded-md">
                                            <button className="flex items-center text-green-700 hover:text-green-900 rounded-l-lg h-6 w-6">
                                              <span className="items-center text-center w-8 text-xl font-thin">
                                                −
                                              </span>
                                            </button>
                                            <span className="items-center text-center w-8 font-semibold text-md ">
                                              {item.quantity}
                                            </span>
                                            <button className="flex items-center text-green-700 hover:text-green-900 rounded-l-lg h-6 w-6">
                                              <span className="items-center text-center w-8 text-xl font-thin">
                                                +
                                              </span>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              ))}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 sm:px-6 sm:flex sm:justify-end">
                {cart.length > 0 &&
                  selectedItems.length > 0 &&
                  (orderStatus !== "Order" ? (
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={async () => {
                        const itemsToOrderFormatted = selectedItems.map(
                          (selectedItem) => {
                            const item = cart[selectedItem.index];
                            return {
                              ...item,
                              product: item.product._id,
                            };
                          },
                        );

                        // console.log(itemsToOrderFormatted);
                        const response = await axios.post(
                          "http://localhost:5000/order/create",
                          { orderItems: itemsToOrderFormatted },
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          },
                        );
                        // console.log(response);

                        if (response.data.status === "success") {
                          setOrderId(response.data.order._id);
                          setUserId(response.data.order.user);
                          handlePayment(response.data.order._id);
                          Swal.fire({
                            title: "Success!",
                            text: "Pesanan berhasil dibuat.",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500,
                          });
                          fetchCart();
                          toggleModal();
                          setOrderStatus("Order");
                          navigate("/Orders");
                        } else {
                          Swal.fire({
                            title: "Failed!",
                            text: "Pesanan gagal dibuat.",
                            icon: "error",
                            showConfirmButton: false,
                            timer: 1500,
                          });
                        }
                      }}
                    >
                      Pesan
                    </button>
                  ) : (
                    <></>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
