import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import './index.scss';
import Header from '../Header';
import routes from '../../routes';
import Footer from '../Footer';

const useStyles = makeStyles(() => ({
  app: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column'
  },
  content: {
    flex: 1
  }
}));

export default function App(): JSX.Element {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.app}>
        <Header />
        <main className={classes.content}>{routes}</main>
        <Footer />
      </div>
    </Router>
  );
}
