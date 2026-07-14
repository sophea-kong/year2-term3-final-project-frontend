import axios from "axios";
import axiosClient from "./axiosClient";

const userApi = {
    getTotalUser : () => {
        return axiosClient.get('/users/total');
    },
    getAllUsers : () => {
        return axiosClient.get('/users/');
    }
}

export default userApi;