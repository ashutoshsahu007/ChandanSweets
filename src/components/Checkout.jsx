import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    instructions: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Placed:", { cartItems, ...form });
  };

  // Calculate total
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>

        {/* Order Summary */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4 mb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

              <div className="flex justify-between mt-4 text-lg font-semibold">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>

        {/* Delivery Address */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-lg font-semibold">Delivery Address</h3>

          <input
            type="text"
            name="street"
            placeholder="Street Address *"
            value={form.street}
            onChange={handleChange}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City *"
              value={form.city}
              onChange={handleChange}
              className="border rounded p-2 focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State *"
              value={form.state}
              onChange={handleChange}
              className="border rounded p-2 focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code *"
              value={form.zip}
              onChange={handleChange}
              className="border rounded p-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number *"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
            required
          />

          <textarea
            name="instructions"
            placeholder="Delivery Instructions (Optional)"
            value={form.instructions}
            onChange={handleChange}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
            rows="3"
          />

          <button
            type="submit"
            onClick={() => navigate("/order-confirmation")}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
