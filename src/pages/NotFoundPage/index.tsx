import React from 'react';
import { Container, Typography, makeStyles } from '@material-ui/core';
import Logo404 from '../../assets/images/404-logo.svg';

const useStyles = makeStyles(() => ({
  page404: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  page404Content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

export default function NotFoundPage(): JSX.Element {
  const classess = useStyles();

  return (
    <Container className={classess.page404}>
      <Container className={classess.page404Content}>
        <Logo404 fill="gray" width="70%" height="70%" />
        <Typography variant="h4">ERROR 404</Typography>
        <Typography variant="h6">
          It&apos;s looking like you have a wrong turn.
        </Typography>
        <Typography variant="h6">
          Don&apos;t worry... It happens to the best of us.
        </Typography>
      </Container>
    </Container>
  );
}
