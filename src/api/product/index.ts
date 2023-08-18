import axiosClient from "../axiosClient";

const productApi = {
  getListProducts(params: any) {
    const url = "/products";
    return axiosClient.get(url, { params });
  },
  getDetailProduct(id: any) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  approveProduct(id: any, params: any) {
    const url = `/products/approve/${id}`;
    return axiosClient.put(url, params);
  }
};

export default productApi;
