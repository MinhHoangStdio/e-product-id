import axiosClient from "../axiosClient";

const orderApi = {
  getListOrders(params: any) {
    const url = `/orders`;
    return axiosClient.get(url, { params });
  },

  getDetailOrder(id: any) {
    const url = `/orders/${id}`;
    return axiosClient.get(url);
  },
};

export default orderApi;
