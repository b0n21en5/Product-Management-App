import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";

const userFromLST = localStorage.getItem("user");
const tokenFromLST = localStorage.getItem("token");

const Store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      user: userFromLST ? JSON.parse(userFromLST) : null,
      token: tokenFromLST ? JSON.parse(tokenFromLST) : null,
    },
  },
});

export default Store;
