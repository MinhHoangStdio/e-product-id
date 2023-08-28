import { createSlice } from "@reduxjs/toolkit";
import { Pagination } from "../../types/pagination";
import { User } from "../../types/user";

interface userState {
  listUsers: User[];
  allListUsers: User[];
  pagination: Pagination | null;
  loadingListUsers: boolean;
  loadingRemoveUser: boolean;
  loadingCreateUser: boolean;
  loadingValidUsers: boolean;
  listValidUsers: User[];
  userDetail: User | null;
  loadingUserDetail: boolean;
}

const initialState: userState = {
  listUsers: [],
  allListUsers: [],
  pagination: null,
  loadingListUsers: false,
  loadingRemoveUser: false,
  loadingCreateUser: false,
  loadingValidUsers: false,
  listValidUsers: [],
  userDetail: null,
  loadingUserDetail: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getListUsers(state, action) {
      state.loadingListUsers = true;
    },
    getListUsersSuccess(state, action) {
      state.listUsers = action.payload.data;
      state.pagination = action.payload.paginate;
      state.loadingListUsers = false;
    },
    getListUsersFailed(state) {
      state.loadingListUsers = false;
    },

    removeUser(state, action) {
      state.loadingRemoveUser = true;
    },
    removeUserSuccess(state) {
      state.loadingRemoveUser = false;
    },
    removeUserFailed(state) {
      state.loadingRemoveUser = false;
    },

    createUser(state, action) {
      state.loadingCreateUser = true;
    },
    createUserSuccess(state) {
      state.loadingCreateUser = false;
    },
    createUserFailed(state) {
      state.loadingCreateUser = false;
    },

    getValidUsers(state) {
      state.loadingListUsers = true;
    },
    getValidUsersSuccess(state, action) {
      state.listValidUsers = action.payload.data;
      state.loadingListUsers = false;
    },
    getValidUsersFailed(state) {
      state.loadingListUsers = false;
    },

    getDetailUser(state, action) {
      state.loadingUserDetail = true;
    },
    getDetailUserSuccess(state, action) {
      state.userDetail = action.payload;
      state.loadingUserDetail = false;
    },
    getDetailUserFailed(state) {
      state.loadingUserDetail = false;
    },
  },
});

// Actions
export const userActions = userSlice.actions;
// Reducer
const userReducer = userSlice.reducer;
export default userReducer;
