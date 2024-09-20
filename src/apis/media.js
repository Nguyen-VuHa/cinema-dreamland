import { objectToQueryParams } from "~/utils/params"
import axiosClient from "./axios.config.dev"

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

export const apiGetMediaVideo = (payload) => { 
    const apiPath = `/api/media/video/${payload}` 

    return axiosClient.get(apiPath)
}