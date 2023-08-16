import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../types/categories";

interface categoryState {
  listCategories: Category[];
  loadingListCategories: boolean;
  loadingCreateCategory: boolean;
  categorySelected: Category;
  idCategorySelected: any;
  loadingEditCategory: boolean;
  loadingRemoveCategory: boolean;
}

const initialState: categoryState = {
  listCategories: [],
  loadingListCategories: false,
  loadingCreateCategory: false,
  categorySelected: {
    name: "",
    id: "",
    parent_id: null,
  },
  idCategorySelected: null,
  loadingEditCategory: false,
  loadingRemoveCategory: false,
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

    createCategory(state, action) {
      state.loadingCreateCategory = true;
    },
    createCategorySuccess(state) {
      state.loadingCreateCategory = false;
    },
    createCategoryFailed(state) {
      state.loadingCreateCategory = false;
    },

    selectedCategory(state, action) {
      state.categorySelected = action.payload;
    },
    resetSelectedCategory(state) {
      state.categorySelected = {
        name: "",
        id: "",
        parent_id: null,
      };
    },

    selectedId(state, action) {
      state.idCategorySelected = action.payload;
    },
    resetSelectedId(state) {
      state.idCategorySelected = null;
    },

    editCategory(state, action) {
      state.loadingEditCategory = true;
    },
    editCategorySuccess(state) {
      state.loadingEditCategory = false;
    },
    editCategoryFailed(state) {
      state.loadingEditCategory = false;
    },

    removeCategory(state, action) {
      state.loadingRemoveCategory = true;
    },
    removeCategorySuccess(state) {
      state.loadingRemoveCategory = false;
    },
    removeCategoryFailed(state) {
      state.loadingRemoveCategory = false;
    },
  },
});

// Actions
export const categoryActions = categorySlice.actions;
// Reducer
const categoryReducer = categorySlice.reducer;
export default categoryReducer;
