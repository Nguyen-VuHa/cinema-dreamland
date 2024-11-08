import { objectToQueryParams } from "~/utils/params"
import axiosClient from "./axios.config"


export const apiCreateLesson = (payload) => {
    let params = objectToQueryParams(payload)

    const apiPath = '/api/lesson/create?' + params

    return axiosClient.get(apiPath)
}

export const apiGetListLesson = () => {
    const apiPath = 'api/lesson/list'

    return axiosClient.get(apiPath)
}