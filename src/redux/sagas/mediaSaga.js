import { call, put, takeLatest } from "redux-saga/effects";
import { actionMedia } from "../reducers/mediaReducer";
import toastConstant from "~/constants/toastify";
import { v4 as uuidV4 } from 'uuid';
import { toastifyAction } from "../reducers/toastReducer";

const { apiGetMediaMovieList, apiGetDetailMovie } = require("~/apis/media");


function* sendFetchMovieListSaga(action) { 
    try {
        let payload = {
            _page: action.payload.page,
            _page_size: action.payload.pageSize,
            _search: action.payload.search,
        }

        const response = yield call(apiGetMediaMovieList, payload);
        
        if (response && response.code === 200) {
            yield put(actionMedia.fetchMovieListSuccess(response));
        } else {
            yield put(toastifyAction.createToastMessage({
                uuid: uuidV4(),
                position: toastConstant.TOAST_TOP_RIGHT,
                toastText:  response?.message,
                duration: 3500,
                type: 'ERROR',
            }));
    
            yield put(actionMedia.fetchMovieListFailed(response));
        }

    } catch (error) {
        console.log(error);
        
        yield put(toastifyAction.createToastMessage({
            uuid: uuidV4(),
            position: toastConstant.TOAST_TOP_RIGHT,
            toastText:  error?.message,
            duration: 3500,
            type: 'ERROR',
        }));

        yield put(actionMedia.fetchMovieListFailed(response));
    }
}

function* sendFetchDetailMovieSaga(action) {  
    try {
        const response = yield call(apiGetDetailMovie, action.payload);
        
        if (response && response.code === 200) {
            yield put(actionMedia.fetchMovieDetailSuccess(response.data));
        } else {
            yield put(toastifyAction.createToastMessage({
                uuid: uuidV4(),
                position: toastConstant.TOAST_TOP_RIGHT,
                toastText:  response?.message,
                duration: 3500,
                type: 'ERROR',
            }));
    
            yield put(actionMedia.fetchMovieDetailFailed(response));
        }

    } catch (error) {
        yield put(toastifyAction.createToastMessage({
            uuid: uuidV4(),
            position: toastConstant.TOAST_TOP_RIGHT,
            toastText:  error?.message,
            duration: 3500,
            type: 'ERROR',
        }));

        yield put(actionMedia.fetchMovieDetailFailed(response));
    }
}

export default function* mediaSaga() { 
    yield takeLatest(actionMedia.processFetchMovieList.type, sendFetchMovieListSaga);
    yield takeLatest(actionMedia.processFetchMovieDetail.type, sendFetchDetailMovieSaga);
}