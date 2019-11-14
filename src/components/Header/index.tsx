import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Menu from './Menu';

export default function Header(): JSX.Element {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Menu />
        <Typography variant="h6">News</Typography>
      </Toolbar>
    </AppBar>
  );
}
