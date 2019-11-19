import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/HomePage';
import ImageDownloader from '../pages/ImageDownloader';
import GithubUsers from '../pages/GithubUsers';
import NotFoundPage from '../pages/NotFoundPage';

const routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/images" component={ImageDownloader} />
    <Route path="/users" component={GithubUsers} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
);

export default routes;
