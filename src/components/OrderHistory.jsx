// src/components/OrderHistory.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-600",
  delivered: "bg-green-100 text-green-600",
  cancelled: "bg-red-100 text-red-600",
  confirmed: "bg-blue-100 text-blue-600",
  preparing: "bg-purple-100 text-purple-600",
  out_for_delivery: "bg-orange-100 text-orange-600",
};

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const { userId } = useSelector((state) => state.auth); // logged-in userId

  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `https://restro-a8f84-default-rtdb.firebaseio.com/orders.json`
        );
        const data = await res.json();

        if (data) {
          const userOrders = Object.entries(data)
            .filter(([id, order]) => order.userId === userId)
            .map(([id, order]) => ({ id, ...order }));

          // Sort latest first
          userOrders.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          setOrders(userOrders);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // poll every 5s
    return () => clearInterval(interval);
  }, [userId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <div className="text-center mb-8">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
            alt="Order History"
            className="w-20 h-20 mx-auto animate-bounce mb-3"
          />
          <h1 className="text-3xl font-extrabold text-orange-600">
            📦 Order History
          </h1>
          <p className="text-gray-600 mt-1">
            Track your past food orders and delivery details 🍕🍔
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.length === 0 ? (
            <p className="text-center text-gray-600">
              No orders yet. Start ordering delicious food! 🍽️
            </p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border rounded-2xl p-5 shadow-md hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start">
                  {/* Left side */}
                  <div>
                    <p className="text-orange-600 font-semibold">
                      Order #{order.id.slice(0, 8)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Total:</span> ₹
                      {order.totalAmount}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      <strong>Delivery Address:</strong>{" "}
                      {order.deliveryDetails?.street},{" "}
                      {order.deliveryDetails?.city},{" "}
                      {order.deliveryDetails?.state} -{" "}
                      {order.deliveryDetails?.zip}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Phone:</strong> {order.deliveryDetails?.phone}
                    </p>
                  </div>

                  {/* Right side */}
                  <div className="flex flex-col items-end">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        statusColors[order.status?.toLowerCase()] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      Ordered on{" "}
                      {new Date(order.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
