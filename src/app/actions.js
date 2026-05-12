export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_COMPLETE = 'USER_LOGIN_COMPLETE';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';
export const RESET_USER_LOGIN = 'RESET_USER_LOGIN';

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
export const REGISTER_RESET = 'REGISTER_RESET';

export const PAYMENT_DUMMY_SUBMIT = 'PAYMENT_DUMMY_SUBMIT';
export const PAYMENT_DUMMY_SUCCESS = 'PAYMENT_DUMMY_SUCCESS';
export const PAYMENT_CLEAR_HISTORY = 'PAYMENT_CLEAR_HISTORY';

export const authLogin = payload => ({
  type: USER_LOGIN,
  payload,
});

export const authLogout = () => ({
  type: RESET_USER_LOGIN,
});

export const registerUser = payload => ({
  type: REGISTER_USER,
  payload,
});

export const registerReset = () => ({
  type: REGISTER_RESET,
});

export const submitDummyPayment = payload => ({
  type: PAYMENT_DUMMY_SUBMIT,
  payload,
});

export const clearPaymentHistory = () => ({
  type: PAYMENT_CLEAR_HISTORY,
});
