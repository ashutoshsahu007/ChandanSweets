import { ShoppingCart, User, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header({ searchTerm, setSearchTerm }) {
  const cart = useSelector((state) => state.cart.items);
  const count = cart.length;

  return (
    <header className="sticky top-0 z-10 bg-gradient-to-r from-orange-100 via-yellow-50 to-red-100 shadow-lg px-4 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link to="/categories">
        <div className="text-xl sm:text-2xl font-extrabold text-orange-600 drop-shadow-sm tracking-wide">
          Chandan<span className="text-red-500">Sweets</span>
        </div>
      </Link>

      {/* Search Bar - hidden on small screens */}
      <div className="hidden sm:flex items-center w-1/2 max-w-md bg-white/80 border border-orange-200 rounded-2xl px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-orange-400">
        <Search className="text-orange-500 mr-2" size={18} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full outline-none text-sm text-gray-700 bg-transparent"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Search icon only on mobile */}
        <div className="sm:hidden">
          <Search
            className="cursor-pointer text-orange-600 hover:text-orange-700 transition"
            size={22}
          />
        </div>

        <Link to="/cart" className="relative">
          <ShoppingCart
            className="cursor-pointer text-orange-600 hover:text-orange-700 transition"
            size={28}
          />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5 shadow-md">
              {count}
            </span>
          )}
        </Link>

        <Link to="/profile">
          <User
            className="cursor-pointer text-orange-600 hover:text-orange-700 transition"
            size={24}
          />
        </Link>
      </div>
    </header>
  );
}
