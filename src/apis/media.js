import { objectToQueryParams } from "~/utils/params"
import axiosClient from "./axios.config.dev"

export const apiGetMediaMovieList = (payload) => {
    let params = objectToQueryParams(payload)

    const apiPath = '/api/media/list?' + params 

    return axiosClient.get(apiPath, payload)
}