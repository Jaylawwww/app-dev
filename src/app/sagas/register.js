import { takeLatest, call, put } from 'redux-saga/effects';
import {
  REGISTER_USER,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from '../actions';
import { userRegister as registerApi } from '../api/register';

export function* registerUserAsync(action) {
  try {
    yield put({ type: REGISTER_USER_REQUEST });
    const data = yield call(registerApi, action.payload);
    yield put({ type: REGISTER_USER_SUCCESS, payload: data });
  } catch (error) {
    yield put({
      type: REGISTER_USER_ERROR,
      error: error?.message || 'Registration failed',
    });
  }
}

export function* registerUserSaga() {
  yield takeLatest(REGISTER_USER, registerUserAsync);
}
