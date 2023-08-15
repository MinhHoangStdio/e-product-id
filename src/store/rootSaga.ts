import { all } from "redux-saga/effects";
import { alertSaga } from "./alert/alertSaga";
import { authSaga } from "./auth/authSaga";
import { categorySaga } from "./category/categorySaga";

export default function* rootSaga() {
  yield all([alertSaga(), authSaga(), categorySaga()]);
}
