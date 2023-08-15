import { call, fork, put, takeLatest, all } from "redux-saga/effects";
import { alertActions } from "../alert/alertSlice";
import { Action } from "../../types/actions";
import categoryApi from "../../api/category";
import { Category } from "../../types/categories";
import { categoryActions } from "./categorySlice";

function* handleGetListCaregories(action: Action) {
  try {
    const params = action.payload;
    const response: { data: Category[] } = yield call(
      categoryApi.getListCategories,
      params
    );
    yield put(categoryActions.getListCategoriesSuccess(response.data));
  } catch (error) {
    yield put(categoryActions.getListCategoriesFailed());
    yield put(
      alertActions.showAlert({
        text: "Cannot get list categories",
        type: "error",
      })
    );
  }
}

function* watchCategoryFlow() {
  yield all([
    takeLatest(categoryActions.getListCategories.type, handleGetListCaregories),
  ]);
}

export function* categorySaga() {
  yield fork(watchCategoryFlow);
}
