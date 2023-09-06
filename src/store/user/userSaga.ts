import { call, fork, put, takeLatest, all } from "redux-saga/effects";
import { alertActions } from "../alert/alertSlice";
import { Action } from "../../types/actions";
import { Pagination } from "../../types/pagination";
import { userActions } from "./userSlice";
import { User } from "../../types/user";
import userApi from "../../api/user";
import { layoutActions } from "../layout/layoutSlice";
import { EPagination } from "../../types/enums/pagination";

function* handleGetListUsers(action: Action) {
  try {
    const params = action.payload.limit
      ? action.payload
      : { page: 1, limit: 15 };
    const response: { data: { data: User[]; paginate: Pagination } } =
      yield call(userApi.getListUsers, params);

    yield put(userActions.getListUsersSuccess(response.data));
  } catch (error) {
    yield put(userActions.getListUsersFailed());
    yield put(
      alertActions.showAlert({
        text: "Không thể lấy danh sách người dùng",
        type: "error",
      })
    );
  }
}

function* handleBlockUser(action: Action) {
  try {
    const id = action.payload;
    const response: { data: any } = yield call(userApi.blockUser, id);
    yield put(userActions.blockUserSuccess());
    yield put(
      alertActions.showAlert({
        text: "Chặn người dùng thành công",
        type: "success",
      })
    );
    yield put(userActions.getListUsers({ limit: EPagination.Limit }));
  } catch (error) {
    yield put(userActions.blockUserFailed());
    yield put(
      alertActions.showAlert({
        text: "Chặn người dùng thất bại",
        type: "error",
      })
    );
  }
}

function* handleUnblockUser(action: Action) {
  try {
    const id = action.payload;
    const response: { data: any } = yield call(userApi.blockUser, id);
    yield put(userActions.unblockUserSuccess());
    yield put(
      alertActions.showAlert({
        text: "Bỏ chặn người dùng thành công",
        type: "success",
      })
    );
    yield put(userActions.getListUsers({ limit: EPagination.Limit }));
  } catch (error) {
    yield put(userActions.unblockUserFailed());
    yield put(
      alertActions.showAlert({
        text: "Bỏ chặn người dùng thất bại",
        type: "error",
      })
    );
  }
}

function* handleCreateUser(action: Action) {
  try {
    const { params, onReset } = action.payload;
    const response: { data: any } = yield call(userApi.createUser, params);
    onReset();
    yield put(userActions.createUserSuccess());
    yield put(
      alertActions.showAlert({
        text: "Tạo mới người dùng thành công.",
        type: "success",
      })
    );
    yield put(userActions.getListUsers({ limit: EPagination.Limit }));
    yield put(userActions.getValidUsers());
    yield put(layoutActions.closeModalUser());
  } catch (error) {
    yield put(userActions.createUserFailed());
    yield put(
      alertActions.showAlert({
        text: "Tạo mới người dùng thất bại.",
        type: "error",
      })
    );
  }
}

function* handleGetValidUsers() {
  try {
    const response: { data: User[] } = yield call(userApi.getValidUsers);

    yield put(userActions.getValidUsersSuccess(response));
  } catch (error) {
    yield put(userActions.getValidUsersFailed());
    yield put(
      alertActions.showAlert({
        text: "Không thể lấy danh sách người dùng khả dụng",
        type: "error",
      })
    );
  }
}

function* handleGetDetailUser(action: Action) {
  try {
    const id = action.payload;
    const response: { data: User } = yield call(userApi.getDetailUser, id);

    yield put(userActions.getDetailUserSuccess(response.data));
  } catch (error) {
    yield put(userActions.getDetailUserFailed());
    yield put(
      alertActions.showAlert({
        text: "Không thể lấy chi tiết người dùng",
        type: "error",
      })
    );
  }
}

function* watchUserFlow() {
  yield all([
    takeLatest(userActions.getListUsers.type, handleGetListUsers),
    takeLatest(userActions.blockUser.type, handleBlockUser),
    takeLatest(userActions.unblockUser.type, handleUnblockUser),
    takeLatest(userActions.createUser.type, handleCreateUser),
    takeLatest(userActions.getValidUsers.type, handleGetValidUsers),
    takeLatest(userActions.getDetailUser.type, handleGetDetailUser),
  ]);
}

export function* userSaga() {
  yield fork(watchUserFlow);
}
