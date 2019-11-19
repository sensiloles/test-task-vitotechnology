export interface ImageDataState {
  [key: string]: {
    status: string;
  };
}

export interface ImageDataActions {
  type: 'REQUEST_FETCHING' | 'REQUEST_SUCCESS' | 'REQUEST_FAILED';
  payload: string;
}
