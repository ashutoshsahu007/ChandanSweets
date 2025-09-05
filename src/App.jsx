import Auth from "./components/Auth";
import ForgotPassword from "./components/ForgetPassword";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import UpdateProfile from "./components/Profile";
import { useSelector } from "react-redux";
import Cart from "./components/Cart";
import OrderHistory from "./components/OrderHistory";
import { useState } from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Category from "./components/Category";
import Profile from "./components/Profile";
import Checkout from "./components/CheckOut";
import OrderConfirmation from "./components/OrderConfirmation";

const App = () => {
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const isLoggedIn = true;

  const [searchTerm, setSearchTerm] = useState("");

  console.log("serchterm App", searchTerm);

  return (
    <>
      {isLoggedIn && (
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      )}
      <Routes>
        <Route
          path="/"
          element={!isLoggedIn ? <Auth /> : <Navigate to="/menu" replace />}
        />
        <Route path="/menu" element={<Menu searchTerm={searchTerm} />} />
        <Route
          path="/menu/:resId"
          element={<Category searchTerm={searchTerm} />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route
          path="/forget-password"
          element={
            !isLoggedIn ? <ForgotPassword /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/profile-update"
          element={isLoggedIn ? <UpdateProfile /> : <Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
};

export default App;
