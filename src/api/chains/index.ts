import axiosClient from "../axiosClient";

const chainsApi = {
  removeChains(id: any) {
    const url = `/chains/${id}`;
    return axiosClient.delete(url);
  },
};

export default chainsApi;
