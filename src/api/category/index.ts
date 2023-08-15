import axiosClient from "../axiosClient";

const categoryApi = {
  getListCategories(params: any) {
    const url = "/categories";
    return axiosClient.get(url, { params });
  },
};

export default categoryApi;
