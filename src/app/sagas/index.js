import { all } from 'redux-saga/effects';
import { userLogin } from './auth';
import { registerUserSaga } from './register';
import { paymentDummySaga } from './payment';

export default function* rootSaga() {
  yield all([userLogin(), registerUserSaga(), paymentDummySaga()]);
}
