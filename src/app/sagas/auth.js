import { takeLatest, call, put } from 'redux-saga/effects';
import {
  USER_LOGIN,
  USER_LOGIN_REQUEST,
  USER_LOGIN_COMPLETE,
  USER_LOGIN_ERROR,
} from '../actions';
import { userLogin as userLoginApi } from '../api/auth';
import { sessionFromLoginApiResponse } from '../utils/sessionFromApiResponse';

export function* userLoginAsync(action) {
  try {
    yield put({ type: USER_LOGIN_REQUEST });

    const data = yield call(userLoginApi, action.payload);
    const session = sessionFromLoginApiResponse(data);

    yield put({
      type: USER_LOGIN_COMPLETE,
      payload: session,
    });
  } catch (error) {
    yield put({
      type: USER_LOGIN_ERROR,
      error: error?.message || 'Login failed',
    });
  }
}

export function* userLogin() {
  yield takeLatest(USER_LOGIN, userLoginAsync);
}
