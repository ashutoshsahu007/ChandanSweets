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
import NotFound from "./components/NotFound";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [searchTerm, setSearchTerm] = useState("");

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
        <Route
          path="/menu"
          element={
            isLoggedIn ? (
              <Menu searchTerm={searchTerm} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/menu/:resId"
          element={
            isLoggedIn ? (
              <Category searchTerm={searchTerm} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/cart"
          element={isLoggedIn ? <Cart /> : <Navigate to="/" replace />}
        />
        <Route
          path="/order-history"
          element={isLoggedIn ? <OrderHistory /> : <Navigate to="/" replace />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/" replace />}
        />
        <Route
          path="/checkout"
          element={isLoggedIn ? <Checkout /> : <Navigate to="/" replace />}
        />
        <Route
          path="/order-confirmation"
          element={
            isLoggedIn ? <OrderConfirmation /> : <Navigate to="/" replace />
          }
        />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
