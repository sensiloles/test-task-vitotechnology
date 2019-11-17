import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Logo404 from '../../assets/images/404-logo.svg';

const useStyles = makeStyles(() => ({
  page404: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    marginTop: '10%',
    textAlign: 'left'
  },
  content404: {
    alignItems: 'left'
  }
}));

export default function NotFoundPage(): JSX.Element {
  const classess = useStyles();

  return (
    <div className={classess.page404}>
      <div className={classess.content404}>
        <Logo404 fill="gray" width="50%" height="50%" />
        <h1>ERROR 404</h1>
        <p>It&apos;s looking like you have a wrong turn.</p>
        <p>Don&apos;t worry... It happens to the best of us.</p>
      </div>
    </div>
  );
}
