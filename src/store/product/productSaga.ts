import { call, fork, put, takeLatest, all } from "redux-saga/effects";
import { alertActions } from "../alert/alertSlice";
import { Action } from "../../types/actions";
import { Product, DetailProduct } from "../../types/products";
import productApi from "../../api/product";
import { productActions } from "./productSlice";
import { layoutActions } from "../layout/layoutSlice";
import { Pagination } from "../../types/pagination";

function* handleGetListProducts(action: Action) {
  try {
    const params = action.payload.limit
      ? action.payload
      : { page: 1, limit: 15 };
    const response: {
      data: { data: DetailProduct[]; pagination: Pagination };
    } = yield call(productApi.getListProducts, params);
    yield put(productActions.getListProductsSuccess(response.data));
  } catch (error: any) {
    yield put(productActions.getListProductsFailed());
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

function* handleGetDetailProduct(action: Action) {
  try {
    const id = action.payload;
    const response: { data: DetailProduct } = yield call(
      productApi.getDetailProduct,
      id
    );

    yield put(productActions.getDetailProductSuccess(response.data));
  } catch (error: any) {
    yield put(productActions.getDetailProductFailed());
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

function* handleAproveProduct(action: Action) {
  try {
    const { id, params } = action.payload;
    const response: { data: Product } = yield call(
      productApi.approveProduct,
      id,
      params
    );

    yield put(productActions.approveProductSuccess());
    yield put(
      alertActions.showAlert({
        text: "Phê duyệt sản phẩm thành công",
        type: "success",
      })
    );

    yield put(productActions.getDetailProduct(id));
    yield put(layoutActions.closeModalConfirm());
  } catch (error: any) {
    yield put(productActions.approveProductFailed());
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

function* handleRejectProduct(action: Action) {
  try {
    const { id, params } = action.payload;
    const response: { data: Product } = yield call(
      productApi.approveProduct,
      id,
      params
    );

    yield put(productActions.approveProductSuccess());
    yield put(
      alertActions.showAlert({
        text: "Từ chối phê duyệt sản phẩm thành công",
        type: "success",
      })
    );

    yield put(productActions.getDetailProduct(id));
    yield put(layoutActions.closeModalConfirm());
  } catch (error) {
    yield put(productActions.rejectProductFailed());
    yield put(
      alertActions.showAlert({
        text: "Từ chối phê duyệt sản phẩm thất bại",
        type: "error",
      })
    );
  }
}

function* watchProductFlow() {
  yield all([
    takeLatest(productActions.getListProducts.type, handleGetListProducts),
    takeLatest(productActions.getDetailProduct.type, handleGetDetailProduct),
    takeLatest(productActions.approveProduct.type, handleAproveProduct),
    takeLatest(productActions.rejectProduct.type, handleRejectProduct),
  ]);
}

export function* productSaga() {
  yield fork(watchProductFlow);
}
