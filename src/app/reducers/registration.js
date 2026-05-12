import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  REGISTER_RESET,
} from '../actions';

const initialState = {
  isLoading: false,
  error: null,
  lastResponse: null,
};

export default function registrationReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { ...state, isLoading: true, error: null, lastResponse: null };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        lastResponse: action.payload ?? null,
      };
    case REGISTER_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error || 'Registration failed',
        lastResponse: null,
      };
    case REGISTER_RESET:
      return initialState;
    default:
      return state;
  }
}
