import {
  FAILED_IMAGES_FETCH,
  FETCH_IMAGES,
  SUCCESSFUL_IMAGES_FETCH,
} from '../actions/imageType';

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  data: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_IMAGES: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SUCCESSFUL_IMAGES_FETCH: {
      const images = action.payload;

      return {
        ...state,
        data: images,
        isLoading: false,
      };
    }
    case FAILED_IMAGES_FETCH: {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};
