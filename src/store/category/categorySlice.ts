import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../types/categories";

interface categoryState {
  listCategories: Category[];
  loadingListCategories: boolean;
}

const initialState: categoryState = {
  listCategories: [],
  loadingListCategories: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getListCategories(state, action) {
      state.loadingListCategories = true;
    },
    getListCategoriesSuccess(state, action) {
      state.listCategories = action.payload;
      state.loadingListCategories = false;
    },
    getListCategoriesFailed(state) {
      state.loadingListCategories = false;
    },
  },
});

// Actions
export const categoryActions = categorySlice.actions;
// Reducer
const categoryReducer = categorySlice.reducer;
export default categoryReducer;
