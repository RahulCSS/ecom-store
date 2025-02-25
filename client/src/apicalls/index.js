import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
    headers:{
        withCredentials: true,
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});