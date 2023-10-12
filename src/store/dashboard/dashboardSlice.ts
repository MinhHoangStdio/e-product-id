import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminStatistics } from "../../types/dashboard";

interface IDashboard {
  loadingStatictis: boolean;
  statistic: AdminStatistics | null;
}

const initialState: IDashboard = {
  loadingStatictis: false,
  statistic: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    getStatistic(state) {
      state.loadingStatictis = true;
    },
    getStatisticSuccess(state, action) {
      state.loadingStatictis = false;
      state.statistic = action.payload;
    },
    getStatisticFailed(state) {
      state.loadingStatictis = false;
      state.statistic = {} as AdminStatistics;
    },
  },
});

// Actions
export const dashboardAction = dashboardSlice.actions;

// Reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
