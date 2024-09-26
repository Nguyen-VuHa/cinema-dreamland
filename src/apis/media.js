import { objectToQueryParams } from "~/utils/params"
import axiosClient from "./axios.config"

export const apiGetMediaMovieList = (payload) => {
    let params = objectToQueryParams(payload)

    const apiPath = '/api/media/list?' + params 

    return axiosClient.get(apiPath)
}

export const apiGetDetailMovie = (payload) => {
    let params = objectToQueryParams(payload)

    const apiPath = '/api/media/detail?' + params 

    return axiosClient.get(apiPath)
}