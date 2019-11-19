import React from 'react';
import { Container, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  title: {
    marginBottom: '20px'
  }
}));

export default function Home(): JSX.Element {
  const classes = useStyles();

  return (
    <Container className={classes.content}>
      <Typography variant="h2" className={classes.title}>
        Home Page
      </Typography>
      <Typography variant="h5">
        Please go to the image download page or the GitHub users search page
      </Typography>
    </Container>
  );
}
