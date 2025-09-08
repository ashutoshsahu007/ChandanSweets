import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Categories({ searchTerm }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Loading state

  useEffect(() => {
    setLoading(true);
    fetch("https://restro-a8f84-default-rtdb.firebaseio.com/categories.json")
      .then((res) => res.json())
      .then((data) => {
        const loaded = Object.entries(data || {}).map(([key, value]) => ({
          firebaseId: key, // firebase unique key
          ...value,
        }));
        setCategories(loaded);
        setLoading(false); // ✅ stop loading
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredCategories = categories.filter((res) =>
    res.title.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-100">
      <main className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold text-orange-700 drop-shadow-sm">
            🍴 Categories
          </h2>
          <Link to="/order-history">
            <div className="px-5 py-2 bg-orange-500 text-white font-semibold rounded-xl shadow-md hover:bg-orange-600 transition-all">
              Order History
            </div>
          </Link>
        </div>

        {/* ✅ Show loader while fetching */}
        {loading ? (
          <p className="text-center text-orange-600 font-medium text-lg animate-pulse">
            Loading categories...
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <Link
                  key={category.firebaseId}
                  to={`/categories/${category.title}`}
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-800">
                        {category.title}
                      </h3>
                      <p className="mt-1 text-sm text-orange-600">
                        Explore delicious options 🍕
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-red-600 font-medium mt-12 text-lg">
                No categories found with this name "{searchTerm}" 😔
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
