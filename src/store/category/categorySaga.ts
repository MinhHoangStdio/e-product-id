import { call, fork, put, takeLatest, all } from "redux-saga/effects";
import { alertActions } from "../alert/alertSlice";
import { Action } from "../../types/actions";
import categoryApi from "../../api/category";
import { Category } from "../../types/categories";
import { categoryActions } from "./categorySlice";
import { layoutActions } from "../layout/layoutSlice";
import { Pagination } from "../../types/pagination";

function* handleGetListCaregories(action: Action) {
  try {
    let params;
    if (action.payload.limit) {
      params = action.payload;
    } else {
      params = { page: 1, limit: 15 };
    }
    const response: { data: { data: Category[]; paginate: Pagination } } =
      yield call(categoryApi.getListCategories, params);
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

function* handleGetAllListCaregories(action: Action) {
  try {
    const params = { limit: 100 };
    const response: { data: { data: Category[] } } = yield call(
      categoryApi.getListCategories,
      params
    );
    yield put(categoryActions.getAllListCategoriesSuccess(response.data));
  } catch (error) {
    yield put(categoryActions.getAllListCategoriesFailed());
    yield put(
      alertActions.showAlert({
        text: "Cannot get all list categories",
        type: "error",
      })
    );
  }
}

function* handleCreateCategory(action: Action) {
  try {
    const { params, onReset } = action.payload;
    const response: { data: any } = yield call(
      categoryApi.createCategory,
      params
    );
    onReset();
    yield put(categoryActions.createCategorySuccess());
    yield put(
      alertActions.showAlert({
        text: "Create a new category success",
        type: "success",
      })
    );
    yield put(categoryActions.getListCategories({}));
    yield put(layoutActions.closeModal());
  } catch (error) {
    yield put(categoryActions.createCategoryFailed());
    yield put(
      alertActions.showAlert({
        text: "Create a new categories failed",
        type: "error",
      })
    );
  }
}

function* handleEditCategory(action: Action) {
  try {
    const { params, id, onReset } = action.payload;
    const response: { data: any } = yield call(
      categoryApi.editCategory,
      id,
      params
    );
    onReset();
    yield put(categoryActions.editCategorySuccess());
    yield put(categoryActions.resetSelectedCategory());
    yield put(
      alertActions.showAlert({
        text: "Edit category success",
        type: "success",
      })
    );
    yield put(categoryActions.getListCategories({}));
    yield put(layoutActions.closeModal());
  } catch (error) {
    yield put(categoryActions.editCategoryFailed());
    yield put(
      alertActions.showAlert({
        text: "Edit category failed",
        type: "error",
      })
    );
  }
}

function* handleDeleteCategory(action: Action) {
  try {
    const id = action.payload;
    const response: { data: any } = yield call(categoryApi.removeCategory, id);
    yield put(categoryActions.removeCategorySuccess());
    yield put(
      alertActions.showAlert({
        text: "Remove category success",
        type: "success",
      })
    );
    yield put(categoryActions.getListCategories({}));
  } catch (error) {
    yield put(categoryActions.removeCategoryFailed());
    yield put(
      alertActions.showAlert({
        text: "Remove category failed",
        type: "error",
      })
    );
  }
}

function* handleSelectedCategory(action: Action) {
  yield put(layoutActions.openModal());
}

function* watchCategoryFlow() {
  yield all([
    takeLatest(categoryActions.getListCategories.type, handleGetListCaregories),
    takeLatest(
      categoryActions.getAllListCategories.type,
      handleGetAllListCaregories
    ),
    takeLatest(categoryActions.createCategory.type, handleCreateCategory),
    takeLatest(categoryActions.editCategory.type, handleEditCategory),
    takeLatest(categoryActions.removeCategory.type, handleDeleteCategory),
    takeLatest(categoryActions.selectedCategory.type, handleSelectedCategory),
  ]);
}

export function* categorySaga() {
  yield fork(watchCategoryFlow);
}
