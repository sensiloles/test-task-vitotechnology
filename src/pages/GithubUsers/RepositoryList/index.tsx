import React from 'react';
import { makeStyles, Typography, Theme } from '@material-ui/core';
import RepositoryItem from './RepositoryItem';
import { GitHubUsersState, Repository } from '../../../types/githubUsers';

const useStyles = makeStyles((theme: Theme) => ({
  repoList: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0'
    }
  }
}));

interface RepositoryListProps {
  userData: GitHubUsersState;
  currentUser: string;
}

export default function RepositoryList({
  userData,
  currentUser
}: RepositoryListProps): JSX.Element {
  const classes = useStyles();

  let content: JSX.Element[] | JSX.Element;

  if (currentUser) {
    const { repositories } = userData[currentUser];

    content = repositories.map((repo: Repository) => {
      return (
        <RepositoryItem
          key={`${currentUser}-${repo.name}`}
          repository={repo}
          currentUser={currentUser}
        />
      );
    });
  } else {
    content = (
      <Typography color="textSecondary">
        The repository list is empty
      </Typography>
    );
  }

  return <div className={classes.repoList}>{content}</div>;
}
