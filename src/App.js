import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import Auth from './containers/Auth';
import Meetings from './containers/Meetings';
import configureStore from './redux/configureStore';
import { createBrowserHistory } from 'history';
import { isAuthorizedSelector } from './containers/app/appSelector';
import { withRouter } from 'react-router';
import 'antd/dist/antd.dark.css';

const store = configureStore();
const history = createBrowserHistory();

const ProtectedRoute = ({ children, ...rest }) => {
  const token = localStorage.getItem('jwt');

  return <Route {...rest}>{token == null ? <Redirect to={{ pathname: '/auth' }} /> : children}</Route>;
};

const mapStateToProps = (state) => {
  return {
    isAuthorized: isAuthorizedSelector(state)
  };
};

const ConnectedPRoute = connect(mapStateToProps, null)(withRouter(ProtectedRoute));

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route exact path={['/', '/auth']}>
          <Auth />
        </Route>
        <ConnectedPRoute path="/dashboard">
          <Meetings />
        </ConnectedPRoute>
      </Router>
    </Provider>
  );
};

export default App;
