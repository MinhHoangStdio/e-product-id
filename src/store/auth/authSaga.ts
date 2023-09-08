import { call, delay, fork, put, takeLatest, all } from "redux-saga/effects";
import { authActions } from "./authSlice";
import authApi from "../../api/auth";
import { alertActions } from "../alert/alertSlice";
import { ResponseLoginAdmin } from "../../types/user";
import { Action } from "../../types/actions";

function* handleLogin(action: Action) {
  try {
    const { params, onNavigate } = action.payload;
    const response: ResponseLoginAdmin = yield call(authApi.login, params);
    localStorage.setItem("access_token", JSON.stringify(response.data.token));
    localStorage.setItem("current_user", JSON.stringify(response.data.user));
    yield put(authActions.loginSuccess(response.data.user));
    onNavigate?.();
  } catch (error) {
    yield put(authActions.loginFailed());
    yield put(
      alertActions.showAlert({
        text: "Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại.",
        type: "error",
      })
    );
  }
}

function* handleChangePwd(action: Action) {
  try {
    const { params, onReset } = action.payload;
    yield call(authApi.changepwd, params);
    yield put(authActions.changePwdSuccess());
    yield put(
      alertActions.showAlert({
        text: "Đổi mật khẩu thành công.",
        type: "success",
      })
    );
    onReset?.();
  } catch (error: any) {
    yield put(authActions.changePwdFailed());
    yield put(
      alertActions.showAlert({
        text: `${error?.response?.data?.message}`,
        type: "error",
      })
    );
  }
}

function* handleSendEmail(action: Action) {
  try {
    const { params, onNext } = action.payload;
    const response: { data: any } = yield call(authApi.forgotPwd, params);
    yield put(authActions.sendEmailSuccess(response.data.token));
    onNext();
  } catch (error) {
    yield put(authActions.sendEmailFailed());
    yield put(
      alertActions.showAlert({
        text: "Lỗi!",
        type: "error",
      })
    );
  }
}

function* handleVerifyOtp(action: Action) {
  try {
    const { params, onNext } = action.payload;
    const response: { data: any } = yield call(authApi.verifyForgotPwd, params);
    yield put(authActions.verifyOtpSuccess(response.data.token));
    onNext();
  } catch (error: any) {
    yield put(authActions.verifyOtpFailed());
    yield put(
      alertActions.showAlert({
        text: `${error?.response?.data?.message}`,
        type: "error",
      })
    );
  }
}

function* handleResetPwd(action: Action) {
  try {
    const { params, onNext } = action.payload;
    const response: { data: any } = yield call(authApi.resetPwd, params);
    yield put(authActions.resetPwdSuccess());
    yield put(
      alertActions.showAlert({
        text: "Đặt mật khẩu lại thành công",
        type: "success",
      })
    );
    onNext();
  } catch (error: any) {
    yield put(authActions.resetPwdFailed());
    yield put(
      alertActions.showAlert({
        text: `${error?.response?.data?.message}`,
        type: "error",
      })
    );
  }
}

function* handleLogout(action: Action) {
  yield delay(500);
  localStorage.removeItem("access_token");
  localStorage.removeItem("current_user");

  action.payload.onNavigate?.();
}

function* watchLoginFlow() {
  yield all([
    takeLatest(authActions.login.type, handleLogin),
    takeLatest(authActions.logout.type, handleLogout),
    takeLatest(authActions.changePwd.type, handleChangePwd),
    takeLatest(authActions.sendEmail.type, handleSendEmail),
    takeLatest(authActions.verifyOtp.type, handleVerifyOtp),
    takeLatest(authActions.resetPwd.type, handleResetPwd),
    takeLatest(authActions.logout.type, handleLogout),
  ]);
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
