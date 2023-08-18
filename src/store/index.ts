import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import alertReducer from "./alert/alertSlice";
import rootSaga from "./rootSaga";
import authReducer from "./auth/authSlice";
import layoutReducer from "./layout/layoutSlice";
import categoryReducer from "./category/categorySlice";
import modalReducer from "./modal/modalSlice";
import productReducer from "./product/productSlice";

const reducers = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  layout: layoutReducer,
  category: categoryReducer,
  modal: modalReducer,
  product: productReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
