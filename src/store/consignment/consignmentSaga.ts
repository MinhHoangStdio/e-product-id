import { call, fork, put, takeLatest, all } from "redux-saga/effects";
import { alertActions } from "../alert/alertSlice";
import { Action } from "../../types/actions";
import { Pagination } from "../../types/pagination";
import { consignmentActions } from "./consignmentSlice";
import consignmentApi from "../../api/consignment";
import { Consignment, ConsignmentDetail } from "../../types/consignments";

function* handleGetListConsignments(action: Action) {
  try {
    const params = action.payload.limit
      ? action.payload
      : { page: 1, limit: 15 };
    const response: { data: { data: Consignment[]; paginate: Pagination } } =
      yield call(consignmentApi.getListConsignments, params);

    yield put(consignmentActions.getListConsignmentsSuccess(response.data));
  } catch (error) {
    yield put(consignmentActions.getListConsignmentsFailed());
    yield put(
      alertActions.showAlert({
        text: "Không thể lấy danh sách lô hàng",
        type: "error",
      })
    );
  }
}

function* handleGetConsignmentDetail(action: Action) {
  try {
    const id = action.payload;
    const response: { data: ConsignmentDetail } = yield call(
      consignmentApi.getDetailConsignment,
      id
    );

    yield put(consignmentActions.getConsignmentDetailSuccess(response.data));
  } catch (error) {
    yield put(consignmentActions.getConsignmentDetailFailed());
    yield put(
      alertActions.showAlert({
        text: "Không thể lấy chi tiết lô hàng.",
        type: "error",
      })
    );
  }
}

function* watchConsignmentFlow() {
  yield all([
    takeLatest(
      consignmentActions.getListConsignments.type,
      handleGetListConsignments
    ),
    takeLatest(
      consignmentActions.getConsignmentDetail.type,
      handleGetConsignmentDetail
    ),
  ]);
}

export function* ConsignmentSaga() {
  yield fork(watchConsignmentFlow);
}
