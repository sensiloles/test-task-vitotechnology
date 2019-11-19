import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import SearchForm from './SearchForm';
import UserList from './UserList';
import RepositoryList from './RepositoryList';
import {
  QueryState,
  QueryActions,
  GitHubUsersState,
  Repository,
  UserDataActions
} from '../../types/githubUsers';
import {
  REQUEST_FETCHING,
  REQUEST_SUCCESS,
  REQUEST_FAILED,
  SET_USER_DATA
} from '../../constants';

const useStyles = makeStyles(theme => ({
  gitHubUsers: {
    display: 'flex',
    flex: 1,
    flexWrap: 'nowrap',
    margin: '30px 0',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  gitHubUsersPanel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '25%'
  }
}));

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`
  }
});

const getRepositories = (user: string): string => `
  {
    search(type: REPOSITORY, query: "user:${user}", last: 12) {
      repos: nodes {
        ... on Repository {
          name
          url
          description
          updatedAt
          stargazers {
            totalCount
          }
          forks {
            totalCount
          }
          owner {
            login
            avatarUrl
          }
        }
      }
    }
  }
`;

function queryReducer(state: QueryState, action: QueryActions): QueryState {
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

function userDataReducer(
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

export default function GitHubUsers(): JSX.Element {
  const classes = useStyles();

  const [userName, setUserName] = useState('');
  const [query, setQuery] = useReducer(queryReducer, {} as QueryState);
  const [userData, setUserData] = useReducer(
    userDataReducer,
    {} as GitHubUsersState
  );
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    function onFetchFromGithub(): void {
      setQuery({ type: REQUEST_FETCHING, payload: userName });

      axiosGitHubGraphQL
        .post('', { query: getRepositories(userName) })
        .then(response => {
          if (response.status === 200) {
            const repositories: Repository[] = response.data.data.search.repos;

            if (!repositories.length) {
              setQuery({ type: REQUEST_FAILED, payload: 'User is not found' });
              return;
            }

            const payload = {
              userName,
              repositories
            };

            setUserData({ type: SET_USER_DATA, payload });
            setQuery({ type: REQUEST_SUCCESS, payload: userName });
            setCurrentUser(userName);
          } else {
            setQuery({
              type: REQUEST_FAILED,
              payload: 'An error occurred while accessing the server'
            });
          }
        });
    }

    if (userName) onFetchFromGithub();
  }, [userName]);

  return (
    <div className={classes.gitHubUsers}>
      <div className={classes.gitHubUsersPanel}>
        <SearchForm
          setUserName={setUserName}
          query={query}
          userData={userData}
          setCurrentUser={setCurrentUser}
        />
        <UserList
          userData={userData}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      </div>
      <RepositoryList userData={userData} currentUser={currentUser} />
    </div>
  );
}
