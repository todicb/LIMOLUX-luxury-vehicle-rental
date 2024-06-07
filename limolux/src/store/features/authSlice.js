import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  korisnik: null,
};

const authSlice = createSlice({
  name: "аuth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLogged = true;
      state.korisnik = action.payload;
    },
    logout(state, action) {
      state.isLogged = false;
      state.korisnik = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
