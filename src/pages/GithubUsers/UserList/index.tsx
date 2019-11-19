import React from 'react';
import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Theme
} from '@material-ui/core';
import { GitHubUsersState } from '../../../types/githubUsers';

const useStyles = makeStyles((theme: Theme) => ({
  userList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '10px'
    }
  },
  userListItem: {
    width: '30%',
    backgroundColor: 'white',
    flex: '1 1 auto',
    cursor: 'pointer',
    borderRadius: '5px',
    textAlign: 'center',
    boxShadow: theme.shadows[2],
    transition: '0.5s',
    margin: '5px',
    border: '1px solid #C8C8C8',
    '&:hover': {
      boxShadow: theme.shadows[5]
    }
  },
  currentUser: {
    backgroundColor: '#F0F0F0'
  }
}));

interface UserListProps {
  userData: GitHubUsersState;
  currentUser: string;
  setCurrentUser: (user: string) => void;
}

export default function UserList({
  userData,
  currentUser,
  setCurrentUser
}: UserListProps): JSX.Element {
  const classes = useStyles();

  const content = Object.keys(userData).map(userName => {
    const isCurrent = userName === currentUser;

    return (
      <ListItem
        key={userName}
        onClick={(): void => {
          setCurrentUser(userName);
        }}
        className={
          isCurrent
            ? `${classes.userListItem} ${classes.currentUser}`
            : classes.userListItem
        }
      >
        <ListItemText primary={userName} />
      </ListItem>
    );
  });

  return <List className={classes.userList}>{content}</List>;
}
