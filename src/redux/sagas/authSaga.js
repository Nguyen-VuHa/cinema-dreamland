

import { call, put, takeLatest } from 'redux-saga/effects';
import { apiSignUpAccount } from '~/apis/auth';
import { actionAuth } from '~/redux/reducers/authReducer';

function* sendSignUpAccountSaga(action) {
    try {
        const response = yield call(apiSignUpAccount, action.payload);
        console.log(response);
        yield put(actionAuth.singUpAccountSuccess(response.data));
    } catch (error) {
        yield put(actionAuth.singUpAccountFailed(error));
    }
}
  

export default function* authSaga() {
    yield takeLatest(actionAuth.processSignUpAccount.type, sendSignUpAccountSaga);
}