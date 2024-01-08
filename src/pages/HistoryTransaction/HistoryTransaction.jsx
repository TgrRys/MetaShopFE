import axios from "axios";
import { useEffect, useState } from "react";

const HistoryTransaction = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchPaymentStatus = async (transaction) => {
    if (!transaction.order) {
      console.error("Transaction does not have an order:", transaction);
      return { ...transaction, isPaid: false };
    }

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.get(
        `http://localhost:5000/payment/status/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const paymentStatuses = response.data.data;
      const paymentStatus = paymentStatuses.find(
        (status) => status.order_id === transaction.order._id,
      );
      if (!paymentStatus) {
        console.error(
          "No payment status found for order:",
          transaction.order._id,
        );
        return { ...transaction, isPaid: false };
      }
      return {
        ...transaction,
        isPaid: paymentStatus.transaction_status === "settlement",
      };
    } catch (error) {
      console.error("Error fetching payment status:", error);
      return { ...transaction, isPaid: false };
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:5000/payment/history/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        const transactions = response.data.data;
        console.log(transactions);
        setTransactions(transactions);
        const productRequests = transactions.flatMap((transaction) =>
          transaction.order.orderItems.map((orderItem) =>
            axios.get(`http://localhost:5000/products/${orderItem.product}`),
          ),
        );
        const productResponses = await Promise.all(productRequests);
        let responseIndex = 0;
        const transactionsWithProductDetails = await Promise.all(
          transactions.map(async (transaction) => {
            const orderItemsWithProductDetails =
              transaction.order.orderItems.map((orderItem) => {
                const productDetail =
                  productResponses[responseIndex].data.data.product;
                responseIndex++;
                return { ...orderItem, product: productDetail };
              });
            const updatedTransaction = await fetchPaymentStatus(transaction);
            return {
              ...updatedTransaction,
              order: {
                ...updatedTransaction.order,
                orderItems: orderItemsWithProductDetails,
              },
            };
          }),
        );
        setTransactions(transactionsWithProductDetails);
      })
      .catch((error) => {
        console.error("Error fetching payment:", error);
      });
  }, []);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-black mb-4">
          List Riwayat Transaksi
        </h1>

        <div className="mt-4 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
          <div className="lg:col-span-7">
            <ul>
              {transactions.map((transaction) => {
                return (
                  <li
                    key={transaction._id}
                    className="flex py-6 border-b rounded-lg p-3 sm:p-5 mb-4"
                  >
                    <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48 mx-5">
                      <img
                        src={
                          transaction.order.orderItems[0].product?.images?.main
                        }
                        alt=""
                        className="object-center object-cover"
                      />
                    </div>
                    <div className="relative flex flex-1 flex-col justify-between">
                      <div className="relative pr-2 sm:pr-9 sm:grid sm:gap-x-6">
                        <div className="mt-1 flex flex-col items-start text-sm text-gray-500">
                          <p className="text-xs sm:text-md">
                            <span className="text-xs sm:text-md text-gray-500">
                              Detail Transaksi :
                            </span>
                            {""} {""}
                            {transaction.order.orderItems
                              .map((item) => item.product.name)
                              .join(", ")}
                          </p>
                          <p className="text-sm sm:text-xl text-gray-800 font-semibold">
                            Rp. {transaction.totalAmount}
                          </p>
                          <p className="text-sm sm:text-base text-gray-600 font-normal mt-1">
                            {new Date(transaction.createdAt).toLocaleDateString(
                              "id-ID",
                            )}
                          </p>
                          {transaction.isPaid ? (
                            <div className="flex flex-row items-center justify-center lg:justify-end my-2 py-1/2 border border-emerald-900 rounded-md">
                              <p className="text-xs sm:text-base text-emerald-600 font-xs py-2 px-2">
                                Sukses
                              </p>
                            </div>
                          ) : (
                            <>
                              <a
                                href={transaction.redirectUrl}
                                className="text-sm sm:text-xl text-emerald-600 font-xs py-1 underline hover:text-emerald-800 hover:no-underline mt-2"
                              >
                                Bayar
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryTransaction;

// const HistoryTransaction = () => {
//   return (
//     <div className="mx-auto max-w-7xl">
//       <div className="px-4 sm:px-6 lg:px-8 py-16">
//         <h1 className="text-3xl font-bold text-black mb-4">
//           List Riwayat Transaksi
//         </h1>

//         <div className="mt-4 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
//           <div className="lg:col-span-7">
//             <ul>
//               <li className="flex py-6 border-b rounded-lg p-3 sm:p-5 mb-4">
//                 <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48 mx-5">
//                   <img
//                     src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg"
//                     alt=""
//                     className="object-center object-cover"
//                   />
//                 </div>
//                 <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
//                   <div className="relative pr-9 sm:grid sm:gap-x-6 sm:pr-0">
//                     <div className="mt-1 flex flex-col items-start text-sm text-gray-500 sm:mt-0 space-y-2">
//                       <p className="text-sm sm:text-xl">
//                         <span className="text-base sm:text-xl text-gray-500">
//                           Detail Transaksi:
//                         </span>
//                         {""} {""}
//                         tes
//                       </p>
//                       <p className="text-sm sm:text-xl text-gray-800 font-semibold">
//                         Rp. 10000000
//                       </p>
//                       <p className="text-sm sm:text-xl text-gray-600 font-normal">
//                         2021-10-10
//                       </p>
//                       <div className="flex flex-row items-center justify-center lg:justify-end my-2 py-1/2 border border-emerald-900 rounded-md">
//                         <p className="text-xs sm:text-base text-emerald-600 font-xs py-2 px-2">
//                           Success
//                         </p>
//                       </div>
//                       <a
//                         href=""
//                         className="text-sm sm:text-xl text-emerald-600 font-xs py-1 underline hover:text-emerald-800 hover:no-underline mt-2"
//                       >
//                         Bayar
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HistoryTransaction;

// const HistoryTransaction = () => {
//   return (
//     <div className="mx-auto max-w-7xl p-2 sm:p-5">
//       <div className="px-2 sm:px-6 lg:px-8 py-8">
//         <h1 className="text-2xl sm:text-4xl font-bold text-black mb-5">
//           List Riwayat Transaksi
//         </h1>

//         <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-x-12">
//           <div className="col-span-1 lg:col-span-7">
//             <ul>
//               <li className="flex flex-col sm:flex-row py-4 border-b bg-gray-50 rounded-lg p-3 sm:p-5 mb-4">
//                 <div className="relative h-16 w-16 sm:h-24 sm:w-24 rounded-md overflow-hidden mx-auto sm:mx-5 mb-3 sm:mb-0">
//                   <img
//                     src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg"
//                     alt=""
//                     className="object-center object-cover"
//                   />
//                 </div>
//                 <div className="relative flex flex-1 flex-col justify-between">
//                   <div className="relative pr-2 sm:pr-9 sm:grid sm:gap-x-6">
//                     <div className="mt-1 flex flex-col items-start text-sm text-gray-500">
//                       <h4 className="text-md sm:text-lg lg:text-2xl text-gray-600 font-medium">
//                         Product Name
//                       </h4>
//                       <p className="text-md sm:text-lg text-gray-800 font-semibold my-1">
//                         Rp 100.000
//                       </p>
//                       <p className="text-xs sm:text-sm text-gray-600 font-extralight">
//                         Transaction Date
//                       </p>
//                       <div className="flex flex-row items-center justify-center lg:justify-end my-2 py-1/2 border border-emerald-900 rounded-md">
//                         <p className="text-xs sm:text-sm text-gray-600 font-extralight">
//                           Transaction Status
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HistoryTransaction;
