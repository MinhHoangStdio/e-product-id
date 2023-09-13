import { createSlice } from "@reduxjs/toolkit";
import { Category, ParentCategory } from "../../types/categories";
import { Pagination } from "../../types/pagination";

interface categoryState {
  listCategories: Category[];
  allListCategories: Category[];
  listParentCategories: ParentCategory[];
  pagination: Pagination | null;
  loadingListCategories: boolean;
  loadingAllListCategories: boolean;
  loadingGetListParentCategories: boolean;
  loadingCreateCategory: boolean;
  categorySelected: Category;
  idCategorySelected: any;
  loadingEditCategory: boolean;
  loadingRemoveCategory: boolean;
}

const initialState: categoryState = {
  listCategories: [],
  allListCategories: [],
  listParentCategories: [],
  pagination: null,
  loadingListCategories: false,
  loadingAllListCategories: false,
  loadingGetListParentCategories: false,
  loadingCreateCategory: false,
  categorySelected: {} as Category,
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
      state.listCategories = action.payload.data;
      state.pagination = action.payload.paginate;
      state.loadingListCategories = false;
    },
    getListCategoriesFailed(state) {
      state.loadingListCategories = false;
    },

    getAllListCategories(state) {
      state.loadingAllListCategories = true;
    },
    getAllListCategoriesSuccess(state, action) {
      state.allListCategories = action.payload.data;
      state.loadingAllListCategories = false;
    },
    getAllListCategoriesFailed(state) {
      state.loadingAllListCategories = false;
    },

    getListParentCategories(state) {
      state.loadingGetListParentCategories = true;
    },
    getListParentCategoriesSuccess(state, action) {
      state.listParentCategories = action.payload.data;
      state.loadingGetListParentCategories = false;
    },
    getListParentCategoriesFailed(state) {
      state.loadingGetListParentCategories = false;
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
      state.categorySelected = {} as Category;
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
