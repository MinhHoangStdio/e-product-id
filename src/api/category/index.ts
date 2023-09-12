import axiosClient from "../axiosClient";

const categoryApi = {
  getListCategories(params: any) {
    const url = "/categories/";
    return axiosClient.get(url, { params });
  },
  createCategory(params: any) {
    const url = "/categories/";
    return axiosClient.post(url, params);
  },
  editCategory(id: any, params: any) {
    const url = `/categories/${id}`;
    return axiosClient.put(url, params);
  },
  removeCategory(id: any) {
    const url = `/categories/${id}`;
    return axiosClient.delete(url);
  },
};

export default categoryApi;
