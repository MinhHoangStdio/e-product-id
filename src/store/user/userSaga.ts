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
        text: "Cannot get list users",
        type: "error",
      })
    );
  }
}

function* handleDeleteUser(action: Action) {
  try {
    const id = action.payload;
    // const response: { data: any } = yield call(userApi.removeUser, id);
    // yield put(userActions.removeUserSuccess());
    yield put(
      alertActions.showAlert({
        text: "Remove user success",
        type: "success",
      })
    );
    yield put(userActions.getListUsers({}));
  } catch (error) {
    yield put(userActions.removeUserFailed());
    yield put(
      alertActions.showAlert({
        text: "Remove user failed",
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
        text: "Create a new user success",
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
        text: "Create a new user failed",
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
        text: "Cannot get valid users",
        type: "error",
      })
    );
  }
}

function* watchUserFlow() {
  yield all([
    takeLatest(userActions.getListUsers.type, handleGetListUsers),
    takeLatest(userActions.removeUser.type, handleDeleteUser),
    takeLatest(userActions.createUser.type, handleCreateUser),
    takeLatest(userActions.getValidUsers.type, handleGetValidUsers),
  ]);
}

export function* userSaga() {
  yield fork(watchUserFlow);
}
