import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutDetail = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    axios
      .get(`http://localhost:5000/order/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setOrders(response.data.orders);
      })
      .catch((error) => {});
  }, []);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-black">Order List</h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center h-full lg:col-span-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 text-gray-400 mx-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a8 8 0 100 16 8 8 0 000-16zM6 9a1 1 0 112 0v3a1 1 0 11-2 0V9zm8 0a1 1 0 112 0v3a1 1 0 11-2 0V9z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-gray-500 my-3 text-lg">
                Kamu belum menambahkan item apapun ke order
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="lg:col-span-7">
                <ul>
                  <li className="flex py-6 border-b">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                      <img
                        src={order.orderItems[0].product.images.main}
                        alt=""
                        className="object-center object-cover"
                      />
                    </div>
                    <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="absolute z-10 right-0 top-0"></div>
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <a className="text-sm font-semibold text-black sm:text-lg">
                            #{order._id}
                          </a>
                          <p className="text-xs sm:text-md">
                            <span className="text-xs sm:text-md text-gray-500">
                              Order Items:
                            </span>{" "}
                            {order.orderItems
                              .map((item) => item.product.name)
                              .join(", ")}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        {order.isPaid ? (
                          <button
                            className="inline-flex mx-2 items-center justify-center whitespace-nowrap rounded-full text-xs sm:text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-100 before:ease relative overflow-hidden bg-emerald-500 text-white transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-1000 duration-700 h-8 sm:h-10 px-3 sm:px-4 py-1 sm:py-2 w-auto mt-6 hover:before:-translate-x-[500px] lg:mx-2"
                            disabled
                          >
                            Selesai
                          </button>
                        ) : (
                          <>
                            <button
                              className="inline-flex mx-2 items-center justify-center whitespace-nowrap rounded-full text-xs sm:text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 before:ease relative overflow-hidden bg-rose-700 text-white transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-1000 duration-700 h-8 sm:h-10 px-3 sm:px-4 py-1 sm:py-2 w-auto mt-6 hover:before:-translate-x-[500px] lg:mx-2"
                              onClick={() => {
                                Swal.fire({
                                  title: "Apakah kamu yakin?",
                                  text: "Kamu tidak akan bisa mengembalikan ini!",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "green",
                                  cancelButtonColor: "red",
                                  confirmButtonText: "Ya, hapus!",
                                  cancelButtonText: "Batal",
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    const token = localStorage.getItem("token");
                                    axios
                                      .delete(
                                        `http://localhost:5000/order/delete/${order._id}`,
                                        {
                                          headers: {
                                            Authorization: `Bearer ${token}`,
                                          },
                                        },
                                      )
                                      .then((response) => {
                                        Swal.fire(
                                          "Deleted!",
                                          "Your order has been deleted.",
                                          "success",
                                        );
                                        window.location.reload();
                                      })
                                      .catch((error) => {});
                                  }
                                });
                              }}
                            >
                              Batalkan Pesanan
                            </button>
                            <button
                              onClick={() => navigate(`/payment/${order._id}`)}
                              className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-xs sm:text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 before:ease relative overflow-hidden bg-emerald-600 text-white transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-1000 duration-700 h-8 sm:h-10 px-3 sm:px-4 py-1 sm:py-2 w-auto mt-6 hover:before:-translate-x-[500px]"
                            >
                              Lanjutkan Pesanan
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetail;

{
  /* <div className="lg:col-span-7">
            <ul>
              <li className="flex py-6 border-b">
                <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                  <img
                    src="https://images.tokopedia.net/img/cache/900/product-1/2020/11/17/109743/109743_0e7c7a2b-1d9f-4b9b-8e5b-7b2c1c1a3d3c_1080_1080"
                    alt=""
                    className="object-center object-cover"
                  />
                </div>
                <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  <div className="absolute z-10 right-0 top-0">
                    <button className="rounded-full flex items-center justify-center bg-white border shadow-md p-2 duration-300 transition-all">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
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
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <a className="text-sm font-semibold text-black line-clamp-2 sm:text-lg">
                        #OrderId 21001202kkjkj
                      </a>
                      <p className="text-xs sm:text-lg">
                        <span className="text-xs sm:text-lg text-gray-500">
                          Order Items:
                        </span>{" "}
                        Sepatu, Kemeja
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-xs sm:text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 before:ease relative overflow-hidden bg-emerald-600 text-white transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-1000 duration-700 h-8 sm:h-10 px-3 sm:px-4 py-1 sm:py-2 w-auto mt-6 hover:before:-translate-x-[500px]">
                      Lanjutkan Pembayaran
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div> */
}
