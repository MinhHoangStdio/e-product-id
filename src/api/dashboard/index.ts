import axiosClient from "../axiosClient";

const dashboardApi = {
  getStatistics() {
    const url = `/statistics`;
    return axiosClient.get(url);
  },
};

export default dashboardApi;
