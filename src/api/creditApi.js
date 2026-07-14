import axiosClient from "./axiosClient";

const creditApi = {
    getMyCredits: () => {
        return axiosClient.get('/credits/me');
    },
    manageCredits: (data) => {
        return axiosClient.post('/credits/manage', data);
    }
}

export default creditApi;
