import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import Swal from "sweetalert2";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState({});
  const token = localStorage.getItem("token");
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (id, index) => {
    const found = selectedItems.find((item) => item.id === id);
    if (found) {
      setSelectedItems(selectedItems.filter((item) => item.id !== id));
    } else {
      setSelectedItems([...selectedItems, { id, index }]);
    }
  };

  const getCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data.data.cart);
    } catch (error) {
      console.error("Error fetching cart items", error);
    }
  };

  const deleteItems = async () => {
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
        getCartItems();
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
        getCartItems();
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
    cartItems.forEach((item) => {
      getProductDetails(item.product._id);
    });
  }, [cartItems]);

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
    getCartItems();
    getQuantity();
  }, []);

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      if (newQuantity === 0) {
        await axios.delete(`http://localhost:5000/user/cart/remove/${itemId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.put(
          "http://localhost:5000/user/cart/edit",
          {
            itemId,
            quantity: newQuantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }
      getCartItems();
    } catch (error) {
      console.error("Error updating cart item quantity", error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-black">List Keranjang</h1>

        <div className="mt-4 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
          <div className="lg:col-span-7">
            {selectedItems.length > 0 && (
              <div className="flex flex-row justify-between items-center mb-12">
                <p className="font-semibold">
                  {selectedItems.length} Produk terpilih
                </p>
                <button
                  className="text-sm text-emerald-700 hover:text-emerald-900"
                  onClick={deleteItems}
                >
                  Hapus
                </button>
              </div>
            )}
            <ul>
              {cartItems.map((item) => (
                <li key={item._id} className="flex py-6 border-b">
                  <input
                    type="checkbox"
                    className="flex items-center justify-center bg-white border shadow-md p-2 duration-300 transition-all text-emerald-600 focus:ring-emerald-700"
                    checked={selectedItems.some((i) => i.id === item._id)}
                    onChange={() => handleSelect(item._id)}
                  />
                  <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48 mx-5">
                    <img
                      src={item.product.images.main}
                      alt=""
                      className="object-center object-cover"
                    />
                  </div>
                  <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:gap-x-6 sm:pr-0">
                      <div className="mt-1 flex flex-col items-start text-sm text-gray-500 sm:mt-0">
                        <p className="text-sm text-amber-600 font-semibold">
                          Sisa {getQuantity(item.product._id, item.variant)}
                        </p>
                        <h4 className="text-sm sm:text-xl text-gray-600 font-medium">
                          {item.product.name}
                        </h4>
                        <p className="text-sm text-gray-800 font-semibold my-1">
                          Rp. {item.product.price}
                        </p>
                        <p className="text-sm text-gray-600 font-extralight">
                          {item.variant.size}
                        </p>
                        <div className="flex flex-row items-center justify-center lg:justify-end my-5 py-1/2 border border-emerald-900 rounded-md">
                          <button
                            className="flex items-center text-emerald-700 hover:text-emerald-900 rounded-l-lg h-6 w-6"
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity - 1)
                            }
                          >
                            <span className="items-center text-center w-8 text-xl font-thin">
                              −
                            </span>
                          </button>
                          <span className="items-center text-center w-8 font-semibold text-md text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            className="flex items-center text-emerald-700 hover:text-emerald-900 rounded-l-lg h-6 w-6"
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity + 1)
                            }
                          >
                            <span className="items-center text-center w-8 text-xl font-thin">
                              +
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {selectedItems.length > 0 && (
            <div className="mt-16 lg:col-span-5 lg:mt-0 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
              <div className="mt-6 space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Order summary
                </h2>
                <div className="flex items-center justify-between">
                  <div className="text-gray-500">Total Items:</div>
                  <div>
                    <p className="text-md font-semibold text-gray-800 mx-2 text-center">
                      {selectedItems.length}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-medium text-gray-900">
                    Total Price:
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      Rp.{" "}
                      {cartItems
                        .filter((item) =>
                          selectedItems.some((i) => i.id === item._id),
                        )
                        .reduce(
                          (acc, item) =>
                            acc +
                            parseFloat(item.product.price.replace(".", "")) *
                              item.quantity,
                          0,
                        )
                        .toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 before:ease relative overflow-hidden bg-emerald-600 text-white transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-1000 duration-700 h-10 px-4 py-2 w-full mt-6 hover:before:-translate-x-[500px]"
                  onClick={async () => {
                    const itemsToOrder = cartItems.filter((item) =>
                      selectedItems.some((i) => i.id === item._id),
                    );

                    // console.log(itemsToOrder);

                    const response = await axios.post(
                      "http://localhost:5000/order/create",
                      { orderItems: itemsToOrder },
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

                      Swal.fire({
                        title: "Success!",
                        text: "Pesanan berhasil dibuat.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                      });
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
                  Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;

{
  /* <div className="mt-16 lg:col-span-5 lg:mt-0 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
            <div className="mt-6 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Order summary
              </h2>

              <div className="flex items-center justify-between">
                <div className="text-xl font-medium text-gray-900">
                  Total Items:
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">29</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xl font-medium text-gray-900">
                  Total Price:
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">299999</p>
                </div>
              </div>
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 before:ease relative overflow-hidden bg-emerald-600 text-white transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-1000 duration-700 h-10 px-4 py-2 w-full mt-6 hover:before:-translate-x-[500px]"
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("token");
                    const response = await axios.post(
                      `http://localhost:5000/payment/process`,
                      {
                        orderId: id,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      },
                    );

                    console.log(response.data);
                    if (response.data.code === "200") {
                      const paymentData = JSON.parse(
                        response.data.data.dataPayment.response,
                      );
                      window.location.href = paymentData.redirect_url;
                    }
                  } catch (error) {
                    if (error.response && error.response.data.code === "400") {
                      console.log("About to display toast");
                      toast.error("Pilih alamat terlebih dahulu");
                      console.log("Toast should have been displayed");
                    }
                  }
                }}
              >
                Order
              </button>
            </div>
          </div> */
}
