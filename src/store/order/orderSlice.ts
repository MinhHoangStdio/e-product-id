import { createSlice } from "@reduxjs/toolkit";
import { Order } from "../../types/order";
import { Pagination } from "../../types/pagination";

interface orderState {
  loadingListOrders: boolean;
  listOrders: Order[] | null;
  pagination: Pagination | null;
  detailOrder?: Order;
  loadingDetailOrder: boolean;
}
const initialState: orderState = {
  loadingListOrders: false,
  listOrders: null,
  pagination: null,
  detailOrder: undefined,
  loadingDetailOrder: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getListOrder(state, action) {
      state.loadingListOrders = true;
    },
    getListOrderSuccess(state, action) {
      state.loadingListOrders = false;
      state.listOrders = action.payload.data;
      state.pagination = action.payload.paginate;
    },
    getListOrderFailed(state) {
      state.loadingListOrders = false;
    },

    getDetailOrder(state, action) {
      state.loadingDetailOrder = true;
    },
    getDetailOrderSuccess(state, action) {
      state.loadingDetailOrder = false;
      state.detailOrder = action.payload;
    },
    getDetailOrderFailed(state) {
      state.loadingDetailOrder = false;
    },
  },
});

// Actions
export const orderActions = orderSlice.actions;
// Reducer
const orderReducer = orderSlice.reducer;
export default orderReducer;
