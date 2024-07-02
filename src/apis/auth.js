import axiosClient from "./axios.config"


export const apiSignUpAccount = (payload) => {
    const apiPath = '/auth/sign-up'

    return axiosClient.post(apiPath, payload)
}