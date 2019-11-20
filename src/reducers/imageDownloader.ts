import { ImageDataState, ImageDataActions } from '../types/imageDownloader';

function splitState(state: ImageDataState, url: string): ImageDataState {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [url]: deletedUrl, ...stateRest } = state;

  return stateRest;
}

export function imageDataReducer(
  state: ImageDataState,
  action: ImageDataActions
): ImageDataState {
  const url = action.payload;

  switch (action.type) {
    case 'REQUEST_FETCHING':
      return {
        ...state,
        [url]: {
          status: 'loading'
        }
      };
    case 'REQUEST_SUCCESS':
      return {
        ...state,
        [url]: {
          status: 'isLoaded'
        }
      };
    case 'REQUEST_FAILED':
      return splitState(state, url);
    default: {
      return {
        ...state
      };
    }
  }
}
