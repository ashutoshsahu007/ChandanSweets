// src/components/OrderHistory.jsx
import React from "react";

const orders = [
  {
    id: "#r69YdCJSItDy5OXtKbes",
    total: 598,
    address: "17/302/07, Ayodhya Colony, Ichalkaranji, Maharashtra 416115",
    phone: "09405584375",
    status: "pending",
    date: "23/04/2025",
  },
  {
    id: "#E8aVuFx9x2P7nQVM8gD",
    total: 299,
    address: "17/302/07, Ayodhya Colony, Ichalkaranji, Maharashtra 416115",
    phone: "09405584375",
    status: "pending",
    date: "23/04/2025",
  },
  {
    id: "#LROJmelw6O8ID84c5i8M",
    total: 299,
    address: "17/302/07, Ayodhya Colony, Ichalkaranji, Maharashtra 416115",
    phone: "09405584375",
    status: "delivered",
    date: "20/04/2025",
  },
  {
    id: "#HL9ZHO9RWa6wOgx1BgPp",
    total: 249,
    address: "17/302/07, Ayodhya Colony, Ichalkaranji, Maharashtra 416115",
    phone: "09405584375",
    status: "cancelled",
    date: "20/04/2025",
  },
  {
    id: "#0kNQH1vvuud0OxwF2Zzy",
    total: 349,
    address: "123 Main Street, Harrison, NJ 07029",
    phone: "8622151085",
    status: "delivered",
    date: "20/04/2025",
  },
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-600",
  delivered: "bg-green-100 text-green-600",
  cancelled: "bg-red-100 text-red-600",
};

export default function OrderHistory() {
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
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white border rounded-2xl p-5 shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <a
                    href="#"
                    className="text-orange-600 font-semibold hover:underline"
                  >
                    Order {order.id}
                  </a>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Total:</span> ${order.total}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    <strong>Delivery Address:</strong> {order.address}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Phone:</strong> {order.phone}
                  </p>
                </div>

                <div className="flex flex-col items-end">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    Ordered on {order.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
