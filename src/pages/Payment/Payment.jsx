import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const Payment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderDetail, setOrderDetail] = useState(null);
  const { id } = useParams();
  const [selectedAddress, setSelectedAddress] = useState(
    orderDetail ? orderDetail.shippingAddress : null,
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/order/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setOrderDetail(data.order))
      .catch((error) => console.error(error));
    // console.log(orderDetail);
  }, [id]);

  let totalPrice = 0;
  let formattedTotalPrice = "";

  if (orderDetail) {
    totalPrice = orderDetail.orderItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(".", "")) * item.quantity;
      return total + price;
    }, 0);

    formattedTotalPrice = totalPrice
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  const openModal = () => {
    setIsModalOpen(true);
    // console.log("Modal opened");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function handleEdit(addressIndex, orderedItems) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/order/edit/${id}`,
        {
          shippingAddress: addressIndex,
          orderedItems: orderedItems,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
  
      fetch(`http://localhost:5000/order/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setOrderDetail(data.order);
          if (data.order && data.order.user) {
            setSelectedAddress(data.order.user.addresses[addressIndex]);
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      // console.error(error);
    }
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-black">Checkout</h1>
        <div className="mt-8 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
          <div className="lg:col-span-7">
            <h3 className="text-xl font-bold text-gray-800 border-b border-gray-400 pb-2">
              Alamat Pengiriman
            </h3>
            <div className="flex justify-between">
              <p className="text-gray-500 mt-1">
                {orderDetail &&
                Object.keys(orderDetail.shippingAddress || {}).length > 0
                  ? "Pastikan alamat pengiriman sudah benar"
                  : "Silahkan pilih alamat pengiriman terlebih dahulu"}
              </p>
            </div>
            <div className="mt-4">
              {isModalOpen && (
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
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="hidden sm:block absolute top-0 left-0 pt-4 pl-4">
                          <button
                            type="button"
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                            onClick={closeModal}
                          >
                            <span className="sr-only">Close</span>
                            <svg
                              className="h-6 w-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                          <button
                            type="button"
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                            onClick={closeModal}
                          >
                            <span className="sr-only">Close</span>
                            <svg
                              className="h-6 w-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="">
                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3
                              className="text-2xl leading-6 font-bold text-gray-900 text-center"
                              id="modal-title"
                            >
                              Pilih Alamat Pengiriman
                            </h3>
                            <div className="mt-2 overflow-y-auto max-h-60">
                              {orderDetail &&
                                orderDetail.user &&
                                orderDetail.user.addresses.map(
                                  (address, index) => {
                                    const isSelected =
                                      selectedAddress &&
                                      selectedAddress.street ===
                                        address.street &&
                                      selectedAddress.city === address.city &&
                                      selectedAddress.country ===
                                        address.country &&
                                      selectedAddress.postalCode ===
                                        address.postalCode;
                                    return (
                                      <div
                                        className="bg-white rounded-md border border-gray-200 py-10 px-5 my-10 flex flex-col"
                                        key={index}
                                      >
                                        <div className="flex justify-end">
                                          <button
                                            type="button"
                                            className={`items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded ${
                                              isSelected
                                                ? "text-gray-600 bg-gray-200"
                                                : "text-emerald-600 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                            }`}
                                            onClick={() =>
                                              !isSelected && handleEdit(index)
                                            }
                                            disabled={isSelected}
                                          >
                                            {isSelected ? "Dipilih" : "Pilih"}
                                          </button>
                                        </div>
                                        <span className="text-gray-800 text-xl font-bold block mb-2">
                                          {address.street}
                                        </span>
                                        <span className="text-gray-800 block mb-2">
                                          {address.city}, {address.country},{" "}
                                          {address.postalCode}
                                        </span>
                                      </div>
                                    );
                                  },
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between">
                {orderDetail &&
                Object.keys(orderDetail.shippingAddress || {}).length > 0 ? (
                  <div className="box-border flex-1 p-4 border-2 border-gray-100 rounded-md">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500">Detail Alamat Pengiriman</p>
                      <button
                        type="button"
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-emerald-600 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                        onClick={openModal}
                      >
                        Pilih Alamat Lain
                      </button>
                    </div>
                    <p className="text-gray-600 font-bold mt-2">
                      Nama :{" "}
                      <span className="font-thin">
                        {orderDetail &&
                          orderDetail.user &&
                          orderDetail.user.name}
                      </span>
                    </p>
                    <p className="text-gray-600 font-bold mt-2">
                      Negara :{" "}
                      <span className="font-thin">
                        {orderDetail &&
                          orderDetail.shippingAddress &&
                          orderDetail.shippingAddress.country}
                      </span>
                    </p>
                    <p className="text-gray-600 font-bold  mt-2">
                      Alamat :{" "}
                      <span className="font-thin">
                        {orderDetail &&
                          orderDetail.shippingAddress &&
                          orderDetail.shippingAddress.street}
                      </span>
                    </p>
                    <p className="text-gray-600 font-bold mt-2">
                      Kota :{" "}
                      <span className="font-thin">
                        {orderDetail &&
                          orderDetail.shippingAddress &&
                          orderDetail.shippingAddress.city}
                      </span>
                    </p>
                    <p className="text-gray-600 font-bold mt-2">
                      Kode Pos :{" "}
                      <span className="font-thin">
                        {orderDetail &&
                          orderDetail.shippingAddress &&
                          orderDetail.shippingAddress.postalCode}
                      </span>
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-emerald-600 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    onClick={openModal}
                  >
                    Pilih Alamat
                  </button>
                )}
              </div>
            </div>
            <ul className="mt-5">
              {orderDetail &&
                orderDetail.orderItems &&
                orderDetail.orderItems.map((item) => (
                  <li
                    className="border-b border-gray-200 py-4 flex"
                    key={item._id}
                  >
                    <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                      <img
                        src={item.product.images.main}
                        alt=""
                        className="object-center object-cover"
                      />
                    </div>
                    <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div className="flex justify-end">
                          <a className="text-sm font-medium text-gray-600 line-clamp-2 sm:text-lg">
                            {item.product.name}
                          </a>
                        </div>
                        <div className="mt-1 text-sm flex justify-end">
                          <a className="text-xs sm:text-sm text-gray-500">
                            {item.product.category}
                          </a>
                        </div>
                        <div className="mt-1 text-sm">
                          <a className="text-xs font-semibold sm:text-sm text-gray-900">
                            Rp. {item.product.price}
                          </a>
                        </div>
                        <div className="mt-1 text-sm">
                          <a className="text-xs font-semibold sm:text-sm text-gray-900">
                          </a>
                        </div>
                        <div className="mt-1 text-sm">
                          <a className="text-xs font-thin sm:text-sm text-gray-500">
                            {item.variant.color}
                          </a>
                        </div>
                        <div className="mt-1 text-sm">
                          <a className="text-xs font-semibold sm:text-sm text-gray-900">
                          </a>
                        </div>
                        <div className="mt-1 text-sm">
                          <a className="text-xs font-thin sm:text-sm text-gray-500">
                            {item.variant.size}
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className="mt-16 lg:col-span-5 lg:mt-0 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
            <div className="mt-6 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Order summary
              </h2>
              <div className="flex items-center justify-between">
                <div className="text-gray-500">Total Items:</div>
                <div>
                  <p className="text-md font-semibold text-gray-800 mx-2 text-center">
                    {orderDetail && orderDetail.orderItems.length}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-gray-500">Jumlah:</div>
                <div>
                  <p className="text-md font-semibold text-gray-800 mx-2 text-center">
                    {orderDetail && orderDetail.orderItems[0].quantity}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xl font-medium text-gray-900">
                  Total Price:
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {formattedTotalPrice}
                  </p>
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

                    // console.log(response.data);
                    if (response.data.code === "200") {
                      const paymentData = JSON.parse(
                        response.data.data.dataPayment.response,
                      );
                      window.open(paymentData.redirect_url, '_blank');
                    }
                  } catch (error) {
                    if (error.response && error.response.data.code === "400") {
                      toast.error("Pilih alamat terlebih dahulu");
                    }
                  }
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
