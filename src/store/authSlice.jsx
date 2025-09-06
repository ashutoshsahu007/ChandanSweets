import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: null,
  userId: null,
  email: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
      state.email = action.payload.email;

      // persist to localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("loginTime", Date.now());
    },
    logout(state) {
      state.token = null;
      state.userId = null;
      state.isLoggedIn = false;

      // clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("loginTime");
      localStorage.removeItem("email");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
