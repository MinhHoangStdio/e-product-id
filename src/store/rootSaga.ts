import { all } from "redux-saga/effects";
import { alertSaga } from "./alert/alertSaga";
import { authSaga } from "./auth/authSaga";
import { categorySaga } from "./category/categorySaga";
import { productSaga } from "./product/productSaga";
import { userSaga } from "./user/userSaga";
import { organizationSaga } from "./organization/organizationSaga";
import { consignmentSaga } from "./consignment/consignmentSaga";
import { chainsSaga } from "./chains/chainSaga";
import { dashboardSaga } from "./dashboard/dashboardSaga";
import { orderSaga } from "./order/orderSaga";

export default function* rootSaga() {
  yield all([
    alertSaga(),
    authSaga(),
    categorySaga(),
    productSaga(),
    userSaga(),
    organizationSaga(),
    consignmentSaga(),
    chainsSaga(),
    dashboardSaga(),
    orderSaga(),
  ]);
}
