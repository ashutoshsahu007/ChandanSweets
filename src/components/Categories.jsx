const categories = [
  {
    id: 1,
    title: "Appetizers",
    image:
      "https://images.unsplash.com/photo-1607098665874-fd193397547b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Main Course",
    image:
      "https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Desserts",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Beverages",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Salads",
    image:
      "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Soups",
    image:
      "https://images.unsplash.com/photo-1611068120813-eca5a8cbf793?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Categories({ searchTerm }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://restro-a8f84-default-rtdb.firebaseio.com/categories.json")
      .then((res) => res.json())
      .then((data) => {
        const loaded = Object.entries(data || {}).map(([key, value]) => ({
          firebaseId: key, // firebase unique key
          ...value,
        }));
        setCategories(loaded);
      });
  }, []);

  const filteredCategories = categories.filter((res) =>
    res.title.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  console.log(filteredCategories, "filterdCategoriessss");
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

        <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <Link key={category.firebaseId} to={`/categories/${category.id}`}>
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
      </main>
    </div>
  );
}
