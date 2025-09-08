import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleAddToCart = (product) => {
    dispatch(cartActions.addToCart(product));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-100 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-extrabold text-orange-700 mb-8 drop-shadow-sm">
          🛒 Your Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-center text-lg">
            Your cart is empty 🍽️
          </p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-5 mb-5"
              >
                {/* Product Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl shadow-md"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-orange-600 font-semibold">
                      ₹{item.price}.00
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      dispatch(cartActions.removeFromCart(item.id))
                    }
                    className="px-3 py-1 bg-red-100 text-red-600 rounded-lg font-bold hover:bg-red-200 transition-all"
                  >
                    −
                  </button>
                  <span className="font-semibold text-lg">{item.quantity}</span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="px-3 py-1 bg-green-100 text-green-600 rounded-lg font-bold hover:bg-green-200 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            {/* Total + Checkout */}
            <div className="flex justify-between items-center mt-8">
              <p className="text-xl font-extrabold text-gray-800">
                Total: <span className="text-orange-600">₹{total}.00</span>
              </p>
              <button
                onClick={() => navigate("/checkout")}
                className="bg-orange-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-orange-600 transition-all"
              >
                Proceed to Checkout →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
