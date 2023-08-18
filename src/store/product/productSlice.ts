import { createSlice } from "@reduxjs/toolkit";
import { DetailProduct } from "../../types/products";
import { Pagination } from "../../types/pagination";

interface productState {
  listProducts: DetailProduct[];
  loadingListProducts: boolean;
  detailProduct?: DetailProduct;
  loadingDetailProduct: boolean;
  loadingApproveProduct: boolean;
  loadingRejectProduct: boolean;
  pagination: Pagination | null;
}

const initialState: productState = {
  listProducts: [],
  loadingListProducts: false,
  detailProduct: undefined,
  loadingDetailProduct: false,
  loadingApproveProduct: false,
  loadingRejectProduct: false,
  pagination: null
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getListProducts(state, action) {
      state.loadingListProducts = true;
    },
    getListProductsSuccess(state, action) {
      state.listProducts = action.payload.data;
      state.loadingListProducts = false;
      state.pagination = action.payload.paginate;
    },
    getListProductsFailed(state) {
      state.loadingListProducts = false;
    },

    getDetailProduct(state, action) {
      state.loadingDetailProduct = true;
    },
    getDetailProductSuccess(state, action) {
      state.detailProduct = action.payload;
      state.loadingDetailProduct = false;
    },
    getDetailProductFailed(state) {
      state.loadingDetailProduct = false;
    },

    approveProduct(state, action) {
      state.loadingApproveProduct = true;
    },
    approveProductSuccess(state) {
      state.loadingApproveProduct = false;
    },
    approveProductFailed(state) {
      state.loadingApproveProduct = false;
    },

    rejectProduct(state, action) {
      state.loadingRejectProduct = true;
    },
    rejectProductSuccess(state) {
      state.loadingRejectProduct = false;
    },
    rejectProductFailed(state) {
      state.loadingRejectProduct = false;
    },
  },
});

// Actions
export const productActions = productSlice.actions;
// Reducer
const productReducer = productSlice.reducer;
export default productReducer;
