import { all } from "redux-saga/effects";
import { alertSaga } from "./alert/alertSaga";
import { authSaga } from "./auth/authSaga";
import { categorySaga } from "./category/categorySaga";
import { productSaga } from "./product/productSaga";
import { userSaga } from "./user/userSaga";

export default function* rootSaga() {
  yield all([
    alertSaga(),
    authSaga(),
    categorySaga(),
    productSaga(),
    userSaga(),
  ]);
}
