import axios from 'axios'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_ID } from '~/constants/cookie'
import { apiRefreshToken } from './auth'

let baseURL = process.env.NEXT_PUBLIC_API_URL

// set config default axios
const axiosClient = axios.create({
    baseURL: baseURL,
})

// config axios request API getway
axiosClient.interceptors.request.use(async (config) => {
    let accessToken = Cookies.get(ACCESS_TOKEN)

    if (accessToken) {
        config.withCredentials = true
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
}, (error) => {
    Promise.reject(error)
})

let isRefreshing = false;
let refreshQueue = [];

axiosClient.interceptors.response.use((res) => {
    return res.data;
}, async (error) => {
    const originalRequest = error?.config;

    // api status Forbidden => clear token on cookies end logout
    if (error.response && error.response.status === 403) {
        clearAllCookies()
    }   

    // api status authorization required => refresh token and set token on cookies.
    if (error.response && error.response.status === 401 && !originalRequest._retry) { 
        if (!isRefreshing) {
            isRefreshing = true

            try {
                originalRequest._retry = true

                let refresToken = Cookies.get(REFRESH_TOKEN)
                let userID = Cookies.get(USER_ID)

                let payload = {
                    _token: refresToken,
                    _user_id: userID,
                }

                const res = await apiRefreshToken(payload)

                if (res && res.code === 200) {
                    isRefreshing = false

                    refreshQueue.forEach((queuedRequest) => {
                        queuedRequest.resolve(res.data);
                    })
                 
                    refreshQueue = [];
                    originalRequest.headers.Authorization = "Bearer " + res.data;
                }
              
                return axiosClient(originalRequest);
            } catch (error) {
                isRefreshing = false;
                // handle error when refresh token failed.

                refreshQueue.forEach((queuedRequest) => {
                    queuedRequest.reject(error);
                });

                refreshQueue = [];

                clearAllCookies();
                
                return Promise.reject(error.response.data);
            }
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

function clearAllCookies() {
    Cookies.remove(ACCESS_TOKEN)
    Cookies.remove(REFRESH_TOKEN)
    Cookies.remove(USER_ID)

    window.location.reload()
}

export default axiosClient