import { createSlice } from "@reduxjs/toolkit";

interface LayoutType {
  theme: "dark" | "light";
  isCollapseSidebar: boolean;
  isOpenModalCategory: boolean;
  isOpenModalConfirm: boolean;
  isOpenModalUser: boolean;
  isOpenModalOrganization: boolean;
  isOpenModalAddMember: boolean;
}

const initialState: LayoutType = {
  theme: "light",
  isCollapseSidebar: false,
  isOpenModalCategory: false,
  isOpenModalConfirm: false,
  isOpenModalUser: false,
  isOpenModalOrganization: false,
  isOpenModalAddMember: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    changeTheme(state, action) {
      state.theme = action.payload;
    },

    toggleCollapseSidebar(state) {
      state.isCollapseSidebar = !state.isCollapseSidebar;
    },

    openModal(state) {
      state.isOpenModalCategory = true;
    },
    closeModal(state) {
      state.isOpenModalCategory = false;
    },

    openModalConfirm(state) {
      state.isOpenModalConfirm = true;
    },
    closeModalConfirm(state) {
      state.isOpenModalConfirm = false;
    },

    openModalUser(state) {
      state.isOpenModalUser = true;
    },
    closeModalUser(state) {
      state.isOpenModalUser = false;
    },

    openModalOrganization(state) {
      state.isOpenModalOrganization = true;
    },
    closeModalOrganization(state) {
      state.isOpenModalOrganization = false;
    },

    openModalAddMember(state) {
      state.isOpenModalAddMember = true;
    },
    closeModalAddMember(state) {
      state.isOpenModalAddMember = false;
    },
  },
});

// Actions
export const layoutActions = layoutSlice.actions;
// Reducer
const layoutReducer = layoutSlice.reducer;
export default layoutReducer;
