import {
  QueryState,
  QueryActions,
  GitHubUsersState,
  UserDataActions
} from '../types/githubUsers';
import {
  REQUEST_FETCHING,
  REQUEST_SUCCESS,
  REQUEST_FAILED,
  SET_USER_DATA
} from '../constants';

export function queryReducer(
  state: QueryState,
  action: QueryActions
): QueryState {
  const userName = action.payload;
  const error = action.payload;

  switch (action.type) {
    case REQUEST_FETCHING:
      return {
        ...state,
        userName,
        isFetching: true,
        isLoaded: false,
        error: ''
      };
    case REQUEST_SUCCESS:
      return { ...state, isFetching: false, isLoaded: true, error: '' };
    case REQUEST_FAILED:
      return { ...state, isFetching: false, isLoaded: false, error };
    default:
      return { ...state };
  }
}

export function userDataReducer(
  state: GitHubUsersState,
  action: UserDataActions
): GitHubUsersState {
  if (action.type === SET_USER_DATA) {
    const { userName, repositories } = action.payload;
    const newUser = {
      [userName]: {
        repositories
      }
    };

    return {
      ...state,
      ...newUser
    };
  }

  return {
    ...state
  };
}
