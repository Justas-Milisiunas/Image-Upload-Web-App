import {
  FAILED_IMAGES_FETCH,
  FAILED_IMAGE_FETCH,
  FETCH_IMAGE,
  FETCH_IMAGES,
  SUCCESSFUL_IMAGES_FETCH,
  SUCCESSFUL_IMAGE_FETCH,
  LOADING_COMMENT_CREATE,
  SUCCESSFUL_COMMENT_CREATE,
  FAILED_COMMENT_CREATE,
} from '../actions/image/imageType';

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  data: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING_COMMENT_CREATE:
    case FETCH_IMAGES:
    case FETCH_IMAGE: {
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
    case SUCCESSFUL_IMAGE_FETCH: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case SUCCESSFUL_COMMENT_CREATE: {
      const comment = action.payload;
      const foundImages = state.data.filter(
        (img) => img._id === comment.imageId
      );

      if (foundImages.length > 0) {
        const image = { ...foundImages[0] };
        image.comments.push(comment);

        const newImagesList = state.data.filter((img) => img._id !== image._id);
        newImagesList.push(image);

        return {
          ...state,
          data: newImagesList,
          isLoading: false,
        };
      }

      return {
        ...state,
        isLoading: false,
      };
    }
    case FAILED_COMMENT_CREATE:
    case FAILED_IMAGE_FETCH:
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
