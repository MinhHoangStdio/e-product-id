import { call, fork, put, takeLatest, all } from "redux-saga/effects";
import { alertActions } from "../alert/alertSlice";
import { Action } from "../../types/actions";
import { Pagination } from "../../types/pagination";
import { EPagination } from "../../types/enums/pagination";
import { organizationActions } from "./organizationSlice";
import organizationApi from "../../api/organization";
import { Organization } from "../../types/organizations";
import { userActions } from "../user/userSlice";

function* handleGetListOrganizations(action: Action) {
  try {
    const params = action.payload.limit
      ? action.payload
      : { page: 1, limit: 15 };
    const response: { data: { data: Organization[]; paginate: Pagination } } =
      yield call(organizationApi.getListOrganizations, params);

    yield put(organizationActions.getListOrganizationsSuccess(response.data));
  } catch (error) {
    yield put(organizationActions.getListOrganizationsFailed());
    yield put(
      alertActions.showAlert({
        text: "Cannot get list organizations",
        type: "error",
      })
    );
  }
}

function* handleDeleteOrganization(action: Action) {
  try {
    const id = action.payload;
    // const response: { data: any } = yield call(userApi.removeUser, id);
    // yield put(organizationActions.removeUserSuccess());
    yield put(
      alertActions.showAlert({
        text: "Remove organization success",
        type: "success",
      })
    );
    yield put(organizationActions.getListOrganizations({}));
  } catch (error) {
    yield put(organizationActions.removeOrganizationFailed());
    yield put(
      alertActions.showAlert({
        text: "Remove organization failed",
        type: "error",
      })
    );
  }
}

function* handleCreateOrganization(action: Action) {
  try {
    const { onReset, ...params } = action.payload;
    const response: { data: any } = yield call(
      organizationApi.createOrganization,
      params
    );
    yield put(organizationActions.createOrganizationsuccess());
    yield put(
      alertActions.showAlert({
        text: "Tạo mới tổ chức thành công.",
        type: "success",
      })
    );
    onReset();
    yield put(
      organizationActions.getListOrganizations({ limit: EPagination.Limit })
    );
    yield put(userActions.getValidUsers());
  } catch (error) {
    yield put(organizationActions.createOrganizationFailed());
    yield put(
      alertActions.showAlert({
        text: "Tạo mới tổ chức thất bại.",
        type: "error",
      })
    );
  }
}

function* handleGetDetailOrganization(action: Action) {
  try {
    const id = action.payload;
    const response: { data: Organization } = yield call(
      organizationApi.getDetailOrganization,
      id
    );

    yield put(organizationActions.getDetailOrganizationSuccess(response.data));
  } catch (error) {
    yield put(organizationActions.getDetailOrganizationFailed());
    yield put(
      alertActions.showAlert({
        text: "Cannot get detail organization",
        type: "error",
      })
    );
  }
}

function* watchOrganizationFlow() {
  yield all([
    takeLatest(
      organizationActions.getListOrganizations.type,
      handleGetListOrganizations
    ),
    takeLatest(
      organizationActions.removeOrganization.type,
      handleDeleteOrganization
    ),
    takeLatest(
      organizationActions.createOrganization.type,
      handleCreateOrganization
    ),
    takeLatest(
      organizationActions.getDetailOrganization.type,
      handleGetDetailOrganization
    ),
  ]);
}

export function* organizationSaga() {
  yield fork(watchOrganizationFlow);
}
