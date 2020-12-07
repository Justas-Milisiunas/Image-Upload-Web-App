import imagesUploadApi from '../../apis/imageUploadApi';
import {
  SUCCESSFUL_IMAGES_FETCH,
  SUCCESSFUL_IMAGE_FETCH,
  FAILED_IMAGES_FETCH,
  FETCH_IMAGES,
  FETCH_IMAGE,
  LOADING_COMMENT_CREATE,
  SUCCESSFUL_COMMENT_CREATE,
  FAILED_COMMENT_CREATE,
} from './imageType';

export const fetchAllImages = () => async (dispatch) => {
  dispatch({ type: FETCH_IMAGES });

  try {
    const response = await imagesUploadApi.get('/images');
    dispatch({ type: SUCCESSFUL_IMAGES_FETCH, payload: response.data });
  } catch (e) {
    dispatch({
      type: FAILED_IMAGES_FETCH,
      payload: (e.response && e.response.data.error) || e.message,
    });
  }
};

export const fetchImage = (imageId) => async (dispatch, getState) => {
  dispatch({ type: FETCH_IMAGE });

  const image = checkIfImageFetched(imageId, getState());
  if (image) {
    return dispatch({ type: SUCCESSFUL_IMAGE_FETCH, payload: image });
  }

  dispatch(fetchAllImages());
};

export const addComment = (imageId, comment) => async (dispatch) => {
  dispatch({ type: LOADING_COMMENT_CREATE });

  try {
    const response = await imagesUploadApi.post(
      '/comments/' + imageId,
      comment
    );
    dispatch({ type: SUCCESSFUL_COMMENT_CREATE, payload: response.data });
  } catch (e) {
    dispatch({
      type: FAILED_COMMENT_CREATE,
      payload: (e.response && e.response.data.error) || e.message,
    });
  }
};

const checkIfImageFetched = (imageId, state) => {
  const images = state.images.data;
  const foundImages = images.filter((img) => img._id === imageId);

  if (foundImages.length === 0) {
    return null;
  }

  return foundImages[0];
};
