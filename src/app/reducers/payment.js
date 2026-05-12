import {
  PAYMENT_DUMMY_SUBMIT,
  PAYMENT_DUMMY_SUCCESS,
  PAYMENT_CLEAR_HISTORY,
} from '../actions';

const initialState = {
  items: [],
  isSubmitting: false,
  lastError: null,
};

export default function paymentReducer(state = initialState, action) {
  switch (action.type) {
    case PAYMENT_DUMMY_SUBMIT:
      return {
        ...state,
        isSubmitting: true,
        lastError: null,
      };
    case PAYMENT_DUMMY_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        items: [
          {
            id: action.payload.id,
            label: action.payload.label,
            amount: action.payload.amount,
            provider: 'dummy',
            createdAt: action.payload.createdAt,
          },
          ...state.items,
        ],
      };
    case PAYMENT_CLEAR_HISTORY:
      return initialState;
    default:
      return state;
  }
}
