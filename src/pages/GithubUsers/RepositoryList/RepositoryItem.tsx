import React from 'react';
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Theme
} from '@material-ui/core';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Repository } from '../../../types/githubUsers';

const useStyles = makeStyles((theme: Theme) => ({
  repoCard: {
    display: 'flex',
    flexDirection: 'column',
    margin: '7px',
    marginTop: '0px',
    flex: '1 1 calc((100% / 3) - 2rem)',
    marginBottom: '10px',
    backgroundColor: '#F0F0F0',
    [theme.breakpoints.down('sm')]: {
      flex: '1 1 calc((100% / 1) - 2rem)'
    },
    [theme.breakpoints.between('md', 'lg')]: {
      flex: '1 1 calc((100% / 2) - 2rem)'
    },
    '&:hover': {
      boxShadow: theme.shadows[5]
    }
  },
  repoUpdateData: {
    fontSize: '12px',
    marginBottom: '10px'
  },
  repoCardAttributes: {
    display: 'flex',
    marginTop: 'auto',
    padding: '16px',
    '&>a': {
      paddingTop: '0',
      paddingBottom: '0',
      marginRight: 'auto'
    }
  },
  repoStats: {
    display: 'flex',
    marginLeft: 'auto'
  },
  repoStatsItem: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '5px'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center'
  },
  userIcon: {
    color: 'black',
    marginRight: '3px'
  }
}));

interface RepositoryItemProps {
  repository: Repository;
  currentUser: string;
}

export default function RepositoryItem({
  repository,
  currentUser
}: RepositoryItemProps): JSX.Element {
  const classes = useStyles();

  const updateDate = new Date(repository.updatedAt);
  const lastUpdate = `Last update: ${updateDate.getDay()}/${updateDate.getMonth()}/${updateDate.getFullYear()}`;

  return (
    <Card
      className={classes.repoCard}
      key={`${currentUser}-${repository.name}`}
    >
      <CardContent>
        <Typography variant="h5" component="h2">
          {repository.name}
        </Typography>
        <Typography color="textSecondary" className={classes.repoUpdateData}>
          {lastUpdate}
        </Typography>
        <Typography variant="body2" component="p">
          {repository.description ? repository.description : null}
        </Typography>
      </CardContent>
      <CardActions className={classes.repoCardAttributes}>
        <Button size="small" href={repository.url} target="blank">
          Learn More
        </Button>
        <div className={classes.repoStats}>
          <div className={classes.repoStatsItem}>
            <Typography className={classes.userInfo}>
              <GitHubIcon fontSize="small" className={classes.userIcon} />
              {currentUser}
            </Typography>
          </div>
          <div className={classes.repoStatsItem}>
            <StarHalfIcon />
            <Typography>{repository.stargazers.totalCount}</Typography>
          </div>
          <div className={classes.repoStatsItem}>
            <CallSplitIcon />
            <Typography>{repository.forks.totalCount}</Typography>
          </div>
        </div>
      </CardActions>
    </Card>
  );
}
