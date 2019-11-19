import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Menu from './Menu';

type HeaderProps = RouteComponentProps;

export default function Header(props: HeaderProps): JSX.Element {
  const [pageName, setPageName] = useState('');
  const {
    location: { pathname }
  } = props;

  useEffect(() => {
    switch (pathname) {
      case '/':
        setPageName('Home');
        break;
      case '/images':
        setPageName('Image downloader');
        break;
      case '/users':
        setPageName('GitHub users');
        break;
      default:
        setPageName('');
    }
  }, [pageName, pathname]);

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Menu />
        <Typography variant="h6">{pageName}</Typography>
      </Toolbar>
    </AppBar>
  );
}
