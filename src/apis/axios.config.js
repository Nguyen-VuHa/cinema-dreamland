import axios from 'axios'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN, LOGIN_METHOD, REFRESH_TOKEN, USER_ID } from '~/constants/cookie'
import { apiRefreshToken } from './auth'

let baseURL = process.env.NEXT_PUBLIC_API_URL

// set config default axios
const axiosClient = axios.create({
    baseURL: baseURL,
})

// config axios request API getway
axiosClient.interceptors.request.use(async (config) => {
    let accessToken = Cookies.get(ACCESS_TOKEN)
    let methodLogin = Cookies.get(LOGIN_METHOD)

    if (accessToken) { 
        if(methodLogin) {
            accessToken = `${methodLogin}.${accessToken}`
        }

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
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                refreshQueue.push({ resolve, reject });
            }).then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axiosClient(originalRequest);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;
        
        let refresToken = Cookies.get(REFRESH_TOKEN)
        let accessToken = Cookies.get(ACCESS_TOKEN)
        let userID = Cookies.get(USER_ID)
        let methodLogin = Cookies.get(LOGIN_METHOD)

        let payload = {
            _token: refresToken || `${methodLogin}.${accessToken}`,
            _user_id: userID,
        }
        
        const res = await apiRefreshToken(payload)

        if (res && res.code === 200) {
            const newAccessToken = res.data;

            Cookies.set(ACCESS_TOKEN, newAccessToken)

            // Gán lại header mặc định cho axios
            axiosClient.defaults.headers.Authorization = `Bearer ${newAccessToken}`;

            refreshQueue.forEach((queuedRequest) => {
                queuedRequest.resolve(res.data);
            })

            refreshQueue = [];
            isRefreshing = false;

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosClient(originalRequest);
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
    Cookies.remove(LOGIN_METHOD)

    window.location.reload()
}

export default axiosClient