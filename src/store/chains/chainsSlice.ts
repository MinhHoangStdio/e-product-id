import { createSlice } from "@reduxjs/toolkit";
import { Pagination } from "../../../types/pagination";

interface chainsState {
  loadingRemoveChains: boolean;
}

const initialState: chainsState = {
  loadingRemoveChains: false,
};

const chainsSlice = createSlice({
  name: "chains",
  initialState,
  reducers: {
    removeChains(state, action) {
      state.loadingRemoveChains = true;
    },
    removeChainsSuccess(state) {
      state.loadingRemoveChains = false;
    },
    removeChainsFailed(state) {
      state.loadingRemoveChains = false;
    },
  },
});

// Actions
export const chainsActions = chainsSlice.actions;
// Reducer
const chainsReducer = chainsSlice.reducer;
export default chainsReducer;
