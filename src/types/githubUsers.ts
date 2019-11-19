export interface GitHubUsersState {
  [key: string]: UserData;
}

export interface UserData {
  repositories: Repository[];
}

export interface Repository {
  name: string;
  url: string;
  description: string | null;
  updatedAt: string;
  stargazers: {
    totalCount: number;
  };
  forks: {
    totalCount: number;
  };
  owner: {
    login: string;
  };
}

export interface SetUserDataState {
  type: 'SET_USER_DATA';
  payload: {
    userName: string;
    repositories: Repository[];
  };
}

export type UserDataActions = SetUserDataState;

export interface QueryState {
  userName: string;
  isFetching: boolean;
  isLoaded: boolean;
  error: string;
}

export interface RequestFetching {
  type: 'REQUEST_FETCHING';
  payload: string;
}

export interface RequestSuccess {
  type: 'REQUEST_SUCCESS';
  payload: string;
}

export interface RequestFailed {
  type: 'REQUEST_FAILED';
  payload: string;
}

export type QueryActions = RequestFetching | RequestSuccess | RequestFailed;
