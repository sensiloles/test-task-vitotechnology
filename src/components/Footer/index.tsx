import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      width: '100%',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      boxShadow: theme.shadows[15]
    }
  })
);

export default function Footer(): JSX.Element {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography>Footer</Typography>
    </footer>
  );
}
