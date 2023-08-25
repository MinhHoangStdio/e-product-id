import axiosClient from "../axiosClient";

const consignmentApi = {
  getListConsignments(params: any) {
    const url = "/consignments";
    return axiosClient.get(url, { params });
  },
  getDetailConsignment(id: any) {
    const url = `/consignments/${id}`;
    return axiosClient.get(url);
  },
};

export default consignmentApi;
