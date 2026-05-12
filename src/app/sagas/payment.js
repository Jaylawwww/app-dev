import { takeLatest, put, delay } from 'redux-saga/effects';
import {
  PAYMENT_DUMMY_SUBMIT,
  PAYMENT_DUMMY_SUCCESS,
} from '../actions';

/**
 * Dummy payment: replace with PayPal PayMongo sandbox calls when required.
 * Records outcome only in Redux (no direct AsyncStorage).
 */
function* dummyPaymentWorker(action) {
  const { amount, label } = action.payload || {};
  yield delay(400);
  yield put({
    type: PAYMENT_DUMMY_SUCCESS,
    payload: {
      id: `${Date.now()}`,
      amount: Number(amount) || 0,
      label: label || 'Demo item',
      createdAt: new Date().toISOString(),
    },
  });
}

export function* paymentDummySaga() {
  yield takeLatest(PAYMENT_DUMMY_SUBMIT, dummyPaymentWorker);
}
