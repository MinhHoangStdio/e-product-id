import { createSlice } from "@reduxjs/toolkit";

interface LayoutType {
  theme: "dark" | "light";
  isCollapseSidebar: boolean;
  isOpenModalCategory: boolean;
  isOpenModalConfirm: boolean;
}

const initialState: LayoutType = {
  theme: "light",
  isCollapseSidebar: false,
  isOpenModalCategory: false,
  isOpenModalConfirm: false,
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
  },
});

// Actions
export const layoutActions = layoutSlice.actions;
// Reducer
const layoutReducer = layoutSlice.reducer;
export default layoutReducer;
