import axiosClient from "../axiosClient";

const organizationApi = {
  getListOrganizations(params: any) {
    const url = "/organizations";
    return axiosClient.get(url, { params });
  },
  getDetailOrganization(id: any) {
    const url = `/organizations/${id}`;
    return axiosClient.get(url);
  },
  createOrganization(params: any) {
    const url = `/organizations`;
    return axiosClient.post(url, params);
  },
};

export default organizationApi;
