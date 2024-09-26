import { objectToQueryParams } from "~/utils/params"
import axiosClient from "./axios.config"


export const apiSignUpAccount = (payload) => {
    const apiPath = '/api/auth/sign-up'

    return axiosClient.post(apiPath, payload)
}

export const apiSignInAccount = (payload) => {
    const apiPath = '/api/auth/sign-in'

    return axiosClient.post(apiPath, payload)
}

export const apiSignInWithFacebook = () => {
    const apiPath = '/api/auth/facebook'

    return axiosClient.get(apiPath)
}

export const apiVerifyOTP = (payload) => {
    let params = objectToQueryParams(payload)
    
    const apiPath = '/api/auth/verify-otp?' + params

    return axiosClient.get(apiPath, payload)
}

export const apiRefreshToken = (payload) => {
    let params = objectToQueryParams(payload)

    const apiPath = '/api/auth/refresh?' + params

    return axiosClient.get(apiPath)
}