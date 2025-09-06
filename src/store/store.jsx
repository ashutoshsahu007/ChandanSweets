import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";

const storedToken = localStorage.getItem("token");
const storedUserId = localStorage.getItem("userId");
const storedLoginTime = Number(localStorage.getItem("loginTime"));
const storedEmail = localStorage.getItem("email");

let isLoggedIn = false;

if (storedToken && storedUserId && storedLoginTime) {
  isLoggedIn = true;
}

const preloadedState = {
  auth: {
    token: storedToken,
    userId: storedUserId,
    email: storedEmail,
    isLoggedIn,
  },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
  preloadedState,
});

export default store;
