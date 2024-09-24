import { objectToQueryParams } from "~/utils/params"
import axiosClient from "./axios.config"


export const apiGetDetailUser = (payload) => {
    let params = objectToQueryParams(payload)

    const apiPath = '/api/user/profile?' + params

    return axiosClient.get(apiPath)
}
