import { createSlice } from "@reduxjs/toolkit";
import { Pagination } from "../../types/pagination";
import { Consignment, ConsignmentDetail } from "../../types/consignments";

interface userState {
  listConsignments: Consignment[];
  alllistConsignments: Consignment[];
  pagination: Pagination | null;
  loadingListConsignments: boolean;
  loadingConsignmentDetail: boolean;
  consignmentDetail?: ConsignmentDetail;
}

const initialState: userState = {
  listConsignments: [],
  alllistConsignments: [],
  pagination: null,
  loadingListConsignments: false,
  loadingConsignmentDetail: false,
  consignmentDetail: undefined,
};

const consignmentSlice = createSlice({
  name: "consignment",
  initialState,
  reducers: {
    getListConsignments(state, action) {
      state.loadingListConsignments = true;
    },
    getListConsignmentsSuccess(state, action) {
      state.listConsignments = action.payload.data;
      state.pagination = action.payload.paginate;
      state.loadingListConsignments = false;
    },
    getListConsignmentsFailed(state) {
      state.loadingListConsignments = false;
    },

    getConsignmentDetail(state, action) {
      state.loadingConsignmentDetail = true;
    },
    getConsignmentDetailSuccess(state, action) {
      state.consignmentDetail = action.payload;
      state.loadingConsignmentDetail = false;
    },
    getConsignmentDetailFailed(state) {
      state.loadingConsignmentDetail = false;
    },
  },
});

// Actions
export const consignmentActions = consignmentSlice.actions;
// Reducer
const consignmentReducer = consignmentSlice.reducer;
export default consignmentReducer;
