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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-sm bg-white flex justify-between items-start"
          >
            <div>
              <a href="#" className="text-blue-600 font-medium hover:underline">
                Order {order.id}
              </a>
              <p className="text-sm text-gray-600">
                {order.items} 1 items &nbsp; | &nbsp; Total: ${order.total}
              </p>
              <p className="text-sm text-gray-800 mt-1">
                <strong>Delivery Address:</strong> {order.address}
              </p>
              <p className="text-sm text-gray-800">
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
        ))}
      </div>
    </div>
  );
}
