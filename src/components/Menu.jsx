import { Link } from "react-router-dom";
import { categories } from "../data/categoryData";

export default function Menu({ searchTerm }) {
  const filteredCategories = categories.filter((res) =>
    res.title.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Categories Section */}
      <main className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Categories</h2>
          <Link to="/order-history">
            <div className="px-4 py-2 bg-gray-800 text-white rounded-md shadow hover:bg-gray-700">
              Order History
            </div>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {filteredCategories.length > 0 ? (
            <>
              {filteredCategories.map((category) => (
                <Link to={`/menu/${category.id}`}>
                  <div
                    key={category.title}
                    // onClick={() => handleNavigate(category)}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                  >
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">
                        {category.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <p className="text-red-600">
              no categories found with this name {searchTerm}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
