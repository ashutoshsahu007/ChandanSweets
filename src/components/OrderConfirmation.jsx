import React from "react";
import { Link } from "react-router-dom";

const OrderConfirmation = () => {
  const order = {
    id: "r69YdCJSItDy5OXtKbes",
    status: "pending",
    total: 598,
    paymentMethod: "Cash on Delivery",
    address: "17/302/07, Ayodhya Colony, Ichalkaranji, Maharashtra 416115",
    phone: "09405584375",
    items: [{ name: "Paneer Tikka", quantity: 2, price: 598 }],
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>

        {/* Order ID + Status */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 text-sm">Order #{order.id}</p>
          <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
            {order.status}
          </span>
        </div>

        {/* Order Details */}
        <div className="space-y-4 border rounded-lg divide-y">
          <div className="flex justify-between items-center p-4">
            <span className="font-medium">Total Amount</span>
            <span className="font-semibold">${order.total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center p-4">
            <span className="font-medium">Payment Method</span>
            <span>{order.paymentMethod}</span>
          </div>

          <div className="p-4">
            <span className="font-medium block mb-1">Delivery Address</span>
            <p className="text-gray-600">{order.address}</p>
            <p className="text-gray-600">Phone: {order.phone}</p>
          </div>

          <div className="p-4">
            <span className="font-medium block mb-2">Items</span>
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border rounded-md p-3"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <Link
            to="/"
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            View Order History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
