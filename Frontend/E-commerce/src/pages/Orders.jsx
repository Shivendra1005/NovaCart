import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../component/Title";
import axios from "axios";
import TopBar from "../component/TopBar";
import { toast } from "react-toastify";
import { Spinner } from "../component/Spinner";
import Footer from "../component/Footer";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const statusConfig = {
  "Order Placed":     { color: "badge-pending",  dot: "bg-amber-400" },
  "Packing":          { color: "badge-pending",  dot: "bg-amber-400" },
  "Shipped":          { color: "badge-shipped",  dot: "bg-blue-400" },
  "Out for delivery": { color: "badge-shipped",  dot: "bg-blue-400" },
  "Delivered":        { color: "badge-success",  dot: "bg-green-400" },
};

export const Orders = () => {
  const { token, currency, loading } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const deleteOrder = async (orderId) => {
    try {
      if (!token) return;
      await axios.delete(`${backendUrl}/api/order/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadOrderData();
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };

  const loadOrderData = async () => {
    try {
      if (!token) return;
      setLoadingOrders(true);
      const response = await axios.get(`${backendUrl}/api/order/myOrder`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        const allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              orderId: order._id,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const cfg = (status) => statusConfig[status] || { color: "badge-pending", dot: "bg-slate-400" };

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <Title text1="MY" text2="ORDERS" />

        {loadingOrders ? (
          <div className="flex flex-col items-center gap-4 py-20">
            <Spinner />
            <p className="text-slate-400 text-sm">Loading your orders…</p>
          </div>
        ) : orderData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No orders yet</h3>
            <p className="text-slate-400 text-sm">Your order history will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orderData.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-5"
              >
                <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                  {/* Product Image */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                    <img
                      src={item.productId?.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Order Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <h3 className="font-semibold text-slate-800 text-sm sm:text-base">
                          {item.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                          <span className="text-sm font-bold text-slate-700">
                            {currency}{item.price?.toLocaleString("en-IN")}
                          </span>
                          <span className="text-xs text-slate-500">Qty: {item.quantity}</span>
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">
                            Size: {item.size}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-slate-400">
                          <span>Ordered: {new Date(item.date).toDateString()}</span>
                          <span>Via: {item.paymentMethod}</span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <span className={cfg(item.status).color}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg(item.status).dot}`} />
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100">
                  <button className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    Track Order
                  </button>
                  <button
                    onClick={() => deleteOrder(item.orderId)}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-600 bg-red-50 rounded-full hover:bg-red-100 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
