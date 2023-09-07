import { createSlice } from "@reduxjs/toolkit";
import { CurrentUser } from "../../types/user";
import { getAuth } from "../../utils/auth";

interface authState {
  isLoggedIn: boolean;
  logging: boolean;
  dataUser: CurrentUser | undefined;
  loadingChangePwd: boolean;
}

const token = getAuth();

const initialState: authState = {
  isLoggedIn: token ? true : false, // logged
  logging: false, // loading
  dataUser: JSON.parse(localStorage.getItem("current_user") as string) || {},
  loadingChangePwd: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.logging = true;
    },
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.logging = false;
      state.dataUser = action.payload;
    },
    loginFailed(state) {
      state.logging = false;
    },
    getDataUser(state, action) {
      state.dataUser = action.payload;
    },

    logout(state, action) {
      state.isLoggedIn = false;
      state.dataUser = undefined;
    },
    changePwd(state, action) {
      state.loadingChangePwd = true;
    },
    changePwdSuccess(state) {
      state.loadingChangePwd = false;
    },
    changePwdFailed(state) {
      state.loadingChangePwd = false;
    },
  },
});

// Actions
export const authActions = authSlice.actions;
// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
