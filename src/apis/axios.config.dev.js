import axios from 'axios'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN } from '~/constants/cookie'

let baseURL = process.env.NEXT_PUBLIC_API_URL_DEV

// set config default axios
const axiosClient = axios.create({
    baseURL: baseURL,
})

// config axios request API getway
axiosClient.interceptors.request.use(async (config) => {
    if (Cookies.get(ACCESS_TOKEN)) {
        config.withCredentials = true
        config.headers.Authorization = `Bearer ${Cookies.get(ACCESS_TOKEN)}`;
    }

    return config;
}, (error) => {
    Promise.reject(error)
})

axiosClient.interceptors.response.use((res) => {
    return res.data;
}, async (error) => {
    const originalRequest = error?.config;

    // api status Forbidden => clear token on cookies end logout
    if (error.response && error.response.status === 403) {
        // handleClearCookies()
    }   

    // api status authorization required => refresh token and set token on cookies.
    if (error.response && error.response.status === 401 && !originalRequest._retry) { 
        if (!isRefreshing) {
            isRefreshing = true

            // try {
            //     originalRequest._retry = true
            //     const newAccessToken = await refreshAccessToken()
            //     isRefreshing = false

            //     refreshQueue.forEach((queuedRequest) => {
            //         queuedRequest.resolve(newAccessToken);
            //     })
             
            //     refreshQueue = [];
            //     originalRequest.headers.Authorization = "Bearer " + newAccessToken;
            //     return axiosClient(originalRequest);
            // } catch (error) {
            //     isRefreshing = false;
            //     // handle error when refresh token failed.
            //     refreshQueue.forEach((queuedRequest) => {
            //         queuedRequest.reject(error);
            //     });
            //     refreshQueue = [];

            //     handleClearCookies();
                
            //     return Promise.reject(error.response.data);
            // }
        } else {
            return new Promise((resolve, reject) => {
                refreshQueue.push({ resolve, reject });
            })
            .then((token) => {
                // re-send request with new access token
                originalRequest.headers.Authorization = `Bearer ${token}`;

                return axiosClient(originalRequest);
            })
            .catch((err) => {
                return Promise.resolve();
            });
        }
    }

    if (error.response) {
        return Promise.reject(error.response?.data);
    }
    
    return Promise.reject(error.response?.data);
})

export default axiosClient