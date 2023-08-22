import axiosClient from "../axiosClient";

const userApi = {
  getListUsers(params: any) {
    const url = "/users";
    return axiosClient.get(url, { params });
  }
};

export default userApi;
