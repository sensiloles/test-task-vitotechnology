import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Menu from './Menu';

export default function Header(): JSX.Element {
  const [pageName, setPageName] = useState('');

  useEffect(() => {
    const pathName = window.location.pathname;

    switch (pathName) {
      case '/':
        setPageName('Home');
        break;
      case '/images':
        setPageName('Images');
        break;
      case '/repos':
        setPageName('Repositories');
        break;
      default:
        setPageName('');
    }
  }, [pageName]);

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Menu />
        <Typography variant="h6">{pageName}</Typography>
      </Toolbar>
    </AppBar>
  );
}
