import axiosClient from "../axiosClient";

const userApi = {
  getListUsers(params: any) {
    const url = "/users";
    return axiosClient.get(url, { params });
  },
  createUser(params: any) {
    const url = "/users";
    return axiosClient.post(url, params);
  },
  getValidUsers() {
    const url = "/users/valid-user";
    return axiosClient.get(url);
  },
};

export default userApi;
