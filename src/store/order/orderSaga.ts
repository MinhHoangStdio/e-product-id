import { call, fork, put, takeLatest, all } from "redux-saga/effects";
import { orderActions } from "./orderSlice";
import { Order } from "../../types/order";
import { Pagination } from "../../types/pagination";
import { Action } from "../../types/actions";
import orderApi from "../../api/order";
import { alertActions } from "../alert/alertSlice";

function* handleGetListOrders(action: Action) {
  try {
    const params = action.payload.limit
      ? action.payload
      : { page: 1, limit: 10 };

    const response: { data: { data: Order[]; paginate: Pagination } } =
      yield call(orderApi.getListOrders, params);
    yield put(orderActions.getListOrderSuccess(response.data));
  } catch (error: any) {
    yield put(orderActions.getListOrderFailed());
    if (error?.response?.status !== 403) {
      yield put(
        alertActions.showAlert({
          text: `${error?.response?.data?.message}` || "Lỗi",
          type: "error",
        })
      );
    }
  }
}

function* handleGetDetailOrder(action: Action) {
  try {
    const id = action.payload;

    const response: { data: Order } = yield call(orderApi.getDetailOrder, id);

    yield put(orderActions.getDetailOrderSuccess(response.data));
  } catch (error) {
    yield put(orderActions.getDetailOrderFailed());
    yield put(
      alertActions.showAlert({
        text: "Không thể lấy thông tin chi tiết đơn hàng",
        type: "error",
      })
    );
  }
}

function* watchLoginFlow() {
  yield all([takeLatest(orderActions.getListOrder.type, handleGetListOrders)]);
  yield all([
    takeLatest(orderActions.getDetailOrder.type, handleGetDetailOrder),
  ]);
}

export function* orderSaga() {
  yield fork(watchLoginFlow);
}
