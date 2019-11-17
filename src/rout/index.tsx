import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ImageDownloader from '../components/Images';
import Repositories from '../components/Repositories';
import NotFoundPage from '../components/NotFoundPage';

const routes = (
  <Switch>
    <Route
      exact
      path="/"
      render={(): JSX.Element => (
        <div>
          <p>Главная страница</p>
        </div>
      )}
    />
    <Route path="/images" component={ImageDownloader} />
    <Route path="/repos" component={Repositories} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
);

export default routes;
