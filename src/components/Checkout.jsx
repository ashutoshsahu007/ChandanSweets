import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../store/cartSlice";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const { userId } = useSelector((state) => state.auth); // logged-in userId
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  // Calculate total
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before placing an order.");
      return;
    }

    if (!form.street || !form.city || !form.state || !form.zip || !form.phone) {
      alert("Please fill in all required delivery details.");
      return;
    }

    const order = {
      userId,
      items: cartItems,
      deliveryDetails: form,
      totalAmount,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    try {
      // Save order to Firebase
      const res = await fetch(
        "https://restro-a8f84-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        }
      );

      const data = await res.json();

      if (data && data.name) {
        // Firebase gives new key in data.name
        const savedOrder = { id: data.name, ...order };

        // Clear cart
        dispatch(cartActions.clearCart());

        // Navigate with saved order
        navigate("/order-confirmation", { state: { order: savedOrder } });
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong while placing the order.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-orange-700 mb-8 drop-shadow-sm">
          🧾 Checkout
        </h2>

        {/* Order Summary */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Order Summary
          </h3>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty 🍽️</p>
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
                      className="w-16 h-16 rounded-lg object-cover shadow-md"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-orange-600">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

              <div className="flex justify-between mt-4 text-lg font-extrabold text-gray-800">
                <span>Total</span>
                <span className="text-orange-600">
                  ₹{totalAmount.toFixed(2)}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Delivery Address */}
        <form onSubmit={handlePlaceOrder} className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800">Delivery Address</h3>

          <input
            type="text"
            name="street"
            placeholder="Street Address *"
            value={form.street}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City *"
              value={form.city}
              onChange={handleChange}
              className="border rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none"
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State *"
              value={form.state}
              onChange={handleChange}
              className="border rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none"
              required
            />
            <input
              type="number"
              name="zip"
              placeholder="ZIP Code *"
              value={form.zip}
              onChange={handleChange}
              className="border rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none"
              required
            />
          </div>

          <input
            type="number"
            name="phone"
            placeholder="Phone Number *"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          <textarea
            name="instructions"
            placeholder="Delivery Instructions (Optional)"
            value={form.instructions}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none"
            rows="3"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold shadow-md hover:bg-orange-600 transition-all"
          >
            Place Order 🍔
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
