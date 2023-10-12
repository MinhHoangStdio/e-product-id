import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import { dashboardAction } from "./dashboardSlice";
import { Action } from "../../types/actions";
import dashboardApi from "../../api/dashboard";
import { AdminStatistics } from "../../types/dashboard";
import { alertActions } from "../alert/alertSlice";

function* handleGetStatistic(action: Action) {
  try {
    const response: { data: AdminStatistics } = yield call(
      dashboardApi.getStatistics
    );
    yield put(dashboardAction.getStatisticSuccess(response.data));
  } catch (error) {
    yield put(dashboardAction.getStatisticFailed());
    yield put(
      alertActions.showAlert({
        text: "Không thể thống kê",
        type: "error",
      })
    );
  }
}

function* dashboardFlow() {
  yield all([
    takeLatest(dashboardAction.getStatistic.type, handleGetStatistic),
  ]);
}

export function* dashboardSaga() {
  yield fork(dashboardFlow);
}
