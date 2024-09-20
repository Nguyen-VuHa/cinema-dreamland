import { all } from 'redux-saga/effects';
import authSaga from './sagas/authSaga';
import mediaSaga from './sagas/mediaSaga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        mediaSaga()
    ])
}