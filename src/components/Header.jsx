import { ShoppingCart, User, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header({ searchTerm, setSearchTerm }) {
  const cart = useSelector((state) => state.cart.items);
  const count = cart.length;
  console.log(cart, "carrtttttt");

  return (
    <header className="bg-white sticky top-0 z-10 shadow-md px-4 py-3 flex items-center justify-between">
      {/* Logo */}

      <Link to="/menu">
        <div className="text-xl sm:text-2xl font-bold text-indigo-600">
          ChandanSweets
        </div>
      </Link>
      {console.log("searchTerm header", searchTerm)}

      {/* Search Bar - hidden on small screens */}
      <div className="hidden sm:flex items-center w-1/2 max-w-md border rounded-lg px-3 py-2">
        <Search className="text-gray-500 mr-2" size={18} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full outline-none text-sm"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Search icon only on mobile */}
        <div className="sm:hidden">
          <Search className="cursor-pointer text-gray-700" size={22} />
        </div>
        <Link to="/cart" className="relative">
          <ShoppingCart className="cursor-pointer text-gray-700" size={28} />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
              {count}
            </span>
          )}
        </Link>
        <Link to="/profile">
          <User className="cursor-pointer text-gray-700" size={24} />
        </Link>
      </div>
    </header>
  );
}
