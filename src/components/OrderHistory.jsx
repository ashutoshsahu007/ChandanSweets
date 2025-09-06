// src/components/OrderHistory.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-600",
  delivered: "bg-green-100 text-green-600",
  cancelled: "bg-red-100 text-red-600",
};

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("orderHistory");
      const parsed = raw ? JSON.parse(raw) : [];
      setOrders(parsed);
    } catch (err) {
      console.error("Failed to load order history", err);
      setOrders([]);
    }
  }, []);

  if (!orders.length) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-6">Order History</h1>
        <p className="text-gray-600 mb-4">No orders found.</p>
        <Link
          to="/menu"
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={order.id || index}
            className="border rounded-lg p-4 shadow-sm bg-white flex justify-between items-start"
          >
            <div>
              <p className="text-blue-600 font-medium">Order #{order.id}</p>
              <p className="text-sm text-gray-600">
                {order.items?.length || 0} items &nbsp; | &nbsp; Total: $
                {order.total}
              </p>
              {order.deliveryDetails ? (
                <>
                  <p className="text-sm text-gray-800 mt-1">
                    <strong>Delivery Address:</strong>{" "}
                    {order.deliveryDetails.street}, {order.deliveryDetails.city}
                    , {order.deliveryDetails.state} {order.deliveryDetails.zip}
                  </p>
                  {order.deliveryDetails.phone && (
                    <p className="text-sm text-gray-800">
                      <strong>Phone:</strong> {order.deliveryDetails.phone}
                    </p>
                  )}
                </>
              ) : (
                <>
                  {order.address && (
                    <p className="text-sm text-gray-800 mt-1">
                      <strong>Delivery Address:</strong> {order.address}
                    </p>
                  )}
                  {order.phone && (
                    <p className="text-sm text-gray-800">
                      <strong>Phone:</strong> {order.phone}
                    </p>
                  )}
                </>
              )}
            </div>
            <div className="flex flex-col items-end">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                  statusColors[order.status?.toLowerCase()] ||
                  "bg-gray-100 text-gray-600"
                }`}
              >
                {order.status ?? "pending"}
              </span>
              {order.createdAt && (
                <p className="text-xs text-gray-500 mt-1">
                  Ordered on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
