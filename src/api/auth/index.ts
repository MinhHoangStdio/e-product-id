import axiosClient from "../axiosClient";

const authApi = {
  login(params: any) {
    const url = "/auth/login";
    return axiosClient.post(url, params);
  },
  changepwd(params: any) {
    const url = "/auth/change-password";
    return axiosClient.post(url, params);
  },
  forgotPwd(params: any) {
    const url = "/auth/forgot-password";
    return axiosClient.post(url, params);
  },
  verifyForgotPwd(params: any) {
    const url = "/auth/verify-forgot-password";
    return axiosClient.post(url, params);
  },
  resetPwd(params: any) {
    const url = "/auth/reset-password";
    return axiosClient.post(url, params);
  },
};

export default authApi;
