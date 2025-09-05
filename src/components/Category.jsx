import { ArrowLeft } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { menuData } from "../data/menuData";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";

export default function Category({ searchTerm }) {
  const { resId } = useParams();
  const dispatch = useDispatch();

  const categoryData = menuData.find((cat) => cat.id === resId);

  const category = categoryData.products.filter((res) =>
    res.name.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const handleAddToCart = (product) => {
    dispatch(cartActions.addToCart(product));
  };

  if (!category) {
    return <div className="p-6 text-red-600">Category not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      {/* Back link */}
      <Link
        to="/menu"
        className="flex items-center text-indigo-600 text-sm font-medium mb-6 hover:underline"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to Categories
      </Link>

      {/* Category Header */}
      <div className="flex items-center gap-3 mb-6">
        <img
          src={categoryData.image}
          alt={categoryData.title}
          className="w-12 h-12 rounded-md object-cover"
        />
        <h1 className="text-2xl font-bold">{categoryData.title}</h1>
      </div>

      {/* Product Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {category.map((product) => (
          <div
            key={product.id}
            className="max-w-sm bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>

              {/* Ingredients */}
              <p className="mt-2 text-sm font-medium">Ingredients:</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {product.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>

              {/* Price + Button */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-indigo-600 font-bold text-lg">
                    ₹{product.price}.00
                  </p>
                  <p className="text-xs text-gray-500">
                    {product.ingredients.length} ingredients
                  </p>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
