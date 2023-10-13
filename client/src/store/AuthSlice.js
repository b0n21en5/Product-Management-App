import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, token: null };

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // Correct the assignment syntax
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem(
        "user",
        JSON.stringify(action.payload.user.username)
      );
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
