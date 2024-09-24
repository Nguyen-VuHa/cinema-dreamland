import { all } from 'redux-saga/effects';
import authSaga from './sagas/authSaga';
import mediaSaga from './sagas/mediaSaga';
import userSaga from './sagas/userSaga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        userSaga(),
        mediaSaga(),
    ])
}