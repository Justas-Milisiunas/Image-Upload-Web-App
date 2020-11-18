import imagesUploadApi from '../../apis/imageUploadApi';
import { SUCCESSFUL_SIGN_IN, FAILED_SIGN_IN } from './authTypes';

export const signIn = (email, password) => async (dispatch) => {
  try {
    const response = await imagesUploadApi.post('/auth/login', {
      email,
      password,
    });

    dispatch({ type: SUCCESSFUL_SIGN_IN, payload: response.data });
  } catch (e) {
    dispatch({
      type: FAILED_SIGN_IN,
      payload: e.response.data.error || e.message,
    });
  }
};
