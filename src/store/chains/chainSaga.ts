import { call, fork, put, takeLatest, all } from "redux-saga/effects";
import { chainsActions } from "./chainsSlice";
import { consignmentActions } from "../consignment/consignmentSlice";
import chainsApi from "../../api/chains";
import { alertActions } from "../alert/alertSlice";
import { Action } from "../../types/actions";

function* handleDeleteChains(action: Action) {
  try {
    const { chainId, consignmentId } = action.payload;
    const response: { data: any } = yield call(chainsApi.removeChains, chainId);
    yield put(consignmentActions.getConsignmentDetail(consignmentId));
    yield put(chainsActions.removeChainsSuccess());
    yield put(
      alertActions.showAlert({
        text: "Xóa công đoạn thành công",
        type: "success",
      })
    );
  } catch (error) {
    yield put(chainsActions.removeChainsFailed());
    yield put(
      alertActions.showAlert({
        text: "Xóa công đoạn thất bại",
        type: "error",
      })
    );
  }
}

function* watchLoginFlow() {
  yield all([takeLatest(chainsActions.removeChains.type, handleDeleteChains)]);
}

export function* chainsSaga() {
  yield fork(watchLoginFlow);
}
