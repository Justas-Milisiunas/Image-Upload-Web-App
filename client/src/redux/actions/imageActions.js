import imagesUploadApi from '../../apis/imageUploadApi';
import { SUCCESSFUL_IMAGES_FETCH, FAILED_IMAGES_FETCH, FETCH_IMAGES } from './imageType';

export const fetchAllImages = () => async (dispatch) => {
  dispatch({type: FETCH_IMAGES});

  try {
    const response = await imagesUploadApi.get('/images');
    dispatch({ type: SUCCESSFUL_IMAGES_FETCH, payload: response.data });
  } catch (e) {
    dispatch({
      type: FAILED_IMAGES_FETCH,
      payload: e.response.data.error || e.message,
    });
  }
};

export const fetchImage = (imageId) => async (dispatch) => {
  dispatch({type: FETCH_IMAGES});

  try {
    const response = await imagesUploadApi.get('/images/' + imageId);
    dispatch({ type: SUCCESSFUL_IMAGES_FETCH, payload: response.data });
  } catch (e) {
    dispatch({
      type: FAILED_IMAGES_FETCH,
      payload: e.response.data.error || e.message,
    });
  }
};
