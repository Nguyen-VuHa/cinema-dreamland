

import { call, put, takeLatest } from 'redux-saga/effects';
import { apiSignInAccount, apiSignUpAccount, apiVerifyOTP } from '~/apis/auth';
import { actionAuth } from '~/redux/reducers/authReducer';
import { toastifyAction } from '../reducers/toastReducer';
import { v4 as uuidV4 } from 'uuid';
import toastConstant from '~/constants/toastify';

function* sendSignUpAccountSaga(action) {
    try {
        const response = yield call(apiSignUpAccount, action.payload);

        yield put(actionAuth.singUpAccountSuccess(response.data));
        // push toastify show message success
        yield put(toastifyAction.createToastMessage({
            uuid: uuidV4(),
            position: toastConstant.TOAST_TOP_RIGHT,
            duration: 3500,
            toastText: response?.message,
            type: 'SUCCESS',
        }));
        // reset lại form đăng ký
        yield put(actionAuth.clearFormSignUp());
    } catch (error) {
        // push toastify show message error
        yield put(toastifyAction.createToastMessage({
            uuid: uuidV4(),
            position: toastConstant.TOAST_TOP_RIGHT,
            toastText:  error?.message,
            duration: 3500,
            type: 'ERROR',
        }));
        yield put(actionAuth.singUpAccountFailed(error));
    }
}
  
function* sendSignInAccountSaga(action) { 
    try {
        const response = yield call(apiSignInAccount, action.payload);

        if (response && response.code == 200) {
            yield put(actionAuth.singInAccountSuccess(response.data));
            // reset lại form đăng ký
            yield put(actionAuth.clearFormSignIn());

            if(response.data.access_token != "") {
                // push toastify show message success
                yield put(toastifyAction.createToastMessage({
                    uuid: uuidV4(),
                    position: toastConstant.TOAST_TOP_RIGHT,
                    duration: 3500,
                    toastText: response?.message,
                    type: 'SUCCESS',
                }));
            }
        } else {
            // push toastify show message error
            yield put(toastifyAction.createToastMessage({
                uuid: uuidV4(),
                position: toastConstant.TOAST_TOP_RIGHT,
                toastText:  error?.message,
                duration: 3500,
                type: 'ERROR',
            }));
            yield put(actionAuth.singInAccountFailed(error));
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
        yield put(actionAuth.singInAccountFailed(error));
    }
}

function* sendVerifyOTPSaga(action) {  
    try { 
        const response = yield call(apiVerifyOTP, action.payload);

        // push toastify show message error
        yield put(toastifyAction.createToastMessage({
            uuid: uuidV4(),
            position: toastConstant.TOAST_TOP_RIGHT,
            toastText:  response?.message,
            duration: 3500,
            type: 'SUCCESS',
        }));

        yield put(actionAuth.verifyOTPSucess(response.data));
    } catch (error) { 
        // push toastify show message error
        yield put(toastifyAction.createToastMessage({
            uuid: uuidV4(),
            position: toastConstant.TOAST_TOP_RIGHT,
            toastText:  error?.message,
            duration: 3500,
            type: 'ERROR',
        }));
        
        yield put(actionAuth.verifyOTPFailed(error));
    }
}

export default function* authSaga() {
    yield takeLatest(actionAuth.processSignUpAccount.type, sendSignUpAccountSaga);
    yield takeLatest(actionAuth.processSignIn.type, sendSignInAccountSaga);
    yield takeLatest(actionAuth.processVerifyOTP.type, sendVerifyOTPSaga);
}