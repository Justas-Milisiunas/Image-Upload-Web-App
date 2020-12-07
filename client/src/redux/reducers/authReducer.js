import { SUCCESSFUL_SIGN_IN, FAILED_SIGN_IN } from '../actions/authTypes';

export const INITIAL_STATE = {
  profile: null,
  isSignedIn: false,
  error: null,
  data: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUCCESSFUL_SIGN_IN: {
      const data = action.payload;

      return {
        ...state,
        isSignedIn: true,
        data,
      };
    }
    case FAILED_SIGN_IN:
      return {
        ...state,
        isSignedIn: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
