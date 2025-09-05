import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen ">
      <div className="max-w-3xl mx-auto my-5 p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4 mb-4"
              >
                {/* Product Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">${item.price}.00</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      dispatch(cartActions.removeFromCart(item.id))
                    }
                    className="px-3 py-1 border rounded-md text-lg cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(cartActions.addToCart(item))}
                    className="px-3 py-1 border rounded-md text-lg cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            {/* Total + Checkout */}
            <div className="flex justify-between items-center mt-6">
              <p className="text-lg font-semibold">Total: ${total}.00</p>
              <button
                onClick={() => navigate("/checkout")}
                className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
