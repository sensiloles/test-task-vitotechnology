import React from 'react';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
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
    display: 'flex',
    flex: 1,
    padding: '0 10px'
  }
}));

const HeaderWithRouter = withRouter(props => <Header {...props} />);

export default function App(): JSX.Element {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.app}>
        <HeaderWithRouter />
        <main className={classes.content}>{routes}</main>
        <Footer />
      </div>
    </Router>
  );
}
