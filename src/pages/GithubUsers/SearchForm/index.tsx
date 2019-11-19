import React, { useState } from 'react';
import {
  TextField,
  Button,
  makeStyles,
  CircularProgress
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Message from '../../../components/AlertMessage';
import { QueryState, GitHubUsersState } from '../../../types/githubUsers';

const useStyles = makeStyles(() => ({
  userForm: {
    minWidth: '100%'
  },
  userNameInput: {
    marginBottom: '5px'
  },
  userFormButton: {
    height: '50px'
  }
}));

interface SearchFormProps {
  setUserName: (userName: string) => void;
  query: QueryState;
  userData: GitHubUsersState;
  setCurrentUser: (user: string) => void;
}

export default function SearchForm({
  setUserName,
  query,
  userData,
  setCurrentUser
}: SearchFormProps): JSX.Element {
  const classes = useStyles();

  const [userNameinputValue, setUserNameInputValue] = useState('');

  function onChangeUserNameInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setUserNameInputValue(e.currentTarget.value);
  }

  function submitForm(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const userIsUploaded = Object.keys(userData).includes(userNameinputValue);

    if (userIsUploaded) {
      setCurrentUser(userNameinputValue);
      setUserNameInputValue('');
      return;
    }

    setUserName(userNameinputValue);
    setUserNameInputValue('');
  }

  return (
    <form
      noValidate
      autoComplete="off"
      className={classes.userForm}
      onSubmit={submitForm}
    >
      <TextField
        fullWidth
        placeholder="Enter GitHub user name"
        variant="outlined"
        margin="none"
        required
        className={classes.userNameInput}
        value={userNameinputValue}
        onChange={onChangeUserNameInput}
      />
      <Button
        type="submit"
        variant="contained"
        startIcon={
          !query.isFetching ? (
            <SearchIcon fontSize="small" />
          ) : (
            <CircularProgress size={15} />
          )
        }
        fullWidth
        className={classes.userFormButton}
        disabled={query.isFetching || !userNameinputValue}
      >
        Search
      </Button>
      <Message open={Boolean(query.error)} message={query.error} />
    </form>
  );
}
