import { ArrowLeft } from "lucide-react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cartSlice";

const BASE_URL = "https://restro-a8f84-default-rtdb.firebaseio.com/recipes";

export default function Recepies({ searchTerm }) {
  const { resId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Loading state

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}.json`)
      .then((res) => res.json())
      .then((data) => {
        const loaded = Object.entries(data || {}).map(([key, value]) => ({
          firebaseId: key,
          ...value,
        }));
        setRecipes(loaded);
        setLoading(false); // ✅ stop loading after fetch
      })
      .catch(() => setLoading(false));
  }, []);

  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = (product) => {
    dispatch(cartActions.addToCart(product));
  };

  const filtered = recipes.filter(
    (r) =>
      r.category.toLowerCase() === resId.toLowerCase() &&
      r.name.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  // ✅ Show loader while fetching
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100 text-orange-600 font-semibold text-xl animate-pulse">
        Loading recipes...
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100 text-orange-600 font-semibold text-xl">
        No recipes found 🍔
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-100 px-6 py-8">
      {/* Back link */}
      <Link
        to="/categories"
        className="flex items-center text-orange-600 text-sm font-medium mb-6 hover:text-orange-700 transition-colors"
      >
        <ArrowLeft size={18} className="mr-1" />
        Back to Categories
      </Link>

      <h1 className="text-3xl font-extrabold text-orange-700 drop-shadow-sm mb-8">
        {resId}
      </h1>

      {/* Product Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <div
            key={product.firebaseId}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-lg font-bold text-gray-800">
                {product.name}
              </h2>
              <p className="mt-2 text-sm font-semibold text-orange-600">
                Ingredients:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {product.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>

              {/* Price + Button */}
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-orange-600 font-bold text-lg">
                    ₹{product.price}.00
                  </p>
                  <p className="text-xs text-gray-500">
                    {product.ingredients.length} ingredients
                  </p>
                </div>

                {cartItems.some((item) => item.id === product.id) ? (
                  <button
                    onClick={() => navigate("/cart")}
                    className="bg-orange-500 text-white text-sm px-4 py-2 rounded-xl shadow-md hover:bg-orange-600 transition-all"
                  >
                    Go To Cart
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-orange-500 text-white text-sm px-4 py-2 rounded-xl shadow-md hover:bg-orange-600 transition-all"
                  >
                    Add To Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
