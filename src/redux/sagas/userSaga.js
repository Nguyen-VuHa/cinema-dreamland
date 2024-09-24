const { call, put, takeLatest } = require("redux-saga/effects");
import { v4 as uuidV4 } from 'uuid';
import { apiGetDetailUser } from '~/apis/user';
import toastConstant from '~/constants/toastify';
import { actionUser } from '../reducers/userReducer';
import { toastifyAction } from '../reducers/toastReducer';

function* sendGetDetailUserSaga(action) {
    try {
        const response = yield call(apiGetDetailUser, action.payload);
        
        if (response && response.code === 200) { 
            yield put(actionUser.fetchUserDetailSuccess(response.data));
        } else {
            yield put(toastifyAction.createToastMessage({
                uuid: uuidV4(),
                position: toastConstant.TOAST_TOP_RIGHT,
                toastText:  error?.message,
                duration: 3500,
                type: 'ERROR',
            }));
            
            yield put(actionUser.fetchUserDetailFailed(error));
        }
    } catch (error) {
        // push toastify show message error
        yield put(toastifyAction.createToastMessage({
            uuid: uuidV4(),
            position: toastConstant.TOAST_TOP_RIGHT,
            toastText:  error?.message,
            duration: 3500,
            type: 'ERROR',
        }));

        yield put(actionUser.fetchUserDetailFailed(error));
    }
}

export default function* userSaga() { 
    yield takeLatest(actionUser.processFetchUserDetail.type, sendGetDetailUserSaga);
}