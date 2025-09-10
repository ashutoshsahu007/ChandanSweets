import Auth from "./components/Auth";
import ForgotPassword from "./components/ForgetPassword";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import UpdateProfile from "./components/Profile";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart";
import OrderHistory from "./components/OrderHistory";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Profile from "./components/Profile";
import OrderConfirmation from "./components/OrderConfirmation";
import NotFound from "./components/NotFound";
import { cartActions } from "./store/cartSlice";
import Recepies from "./components/Recepies";
import Categories from "./components/Categories";
import CheckOut from "./components/Checkout";

let isInitial = false;

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const { userId, token } = useSelector((state) => state.auth);

  const cartItems = useSelector((state) => state.cart.items);
  const changed = useSelector((state) => state.cart.changed);

  useEffect(() => {
    const syncCartAsync = () => {
      fetch(
        `https://restro-a8f84-default-rtdb.firebaseio.com/users/${userId}/cart.json?auth=${token}`,
        {
          method: "PUT", // overwrite entire cart
          body: JSON.stringify(cartItems),
          headers: { "Content-Type": "application/json" },
        }
      );
    };
    if (!isInitial) {
      isInitial = true;
      return;
    }

    if (changed) {
      syncCartAsync();
    }
  }, [cartItems, userId]);

  useEffect(() => {
    fetch(
      `https://restro-a8f84-default-rtdb.firebaseio.com/users/${userId}/cart.json?auth=${token}`
    )
      .then((res) => res.json())
      .then((data) => dispatch(cartActions.setCart(data)));
  }, [userId]);

  return (
    <>
      {isLoggedIn && (
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      )}
      <Routes>
        <Route
          path="/"
          element={
            !isLoggedIn ? <Auth /> : <Navigate to="/categories" replace />
          }
        />
        <Route
          path="/categories"
          element={
            isLoggedIn ? (
              <Categories searchTerm={searchTerm} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/categories/:resId"
          element={
            isLoggedIn ? (
              <Recepies searchTerm={searchTerm} />
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
          element={isLoggedIn ? <CheckOut /> : <Navigate to="/" replace />}
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
