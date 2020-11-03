import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Box, CircularProgress } from '@material-ui/core';

import Auth from './pages/Auth';
import NotFound from './pages/404';
import Home from './pages/Home';
import User from './pages/User';
import { autologin } from './store/actions';
import { RootState } from './store/reducers';

const App: React.FC = () => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  const expiresIn = localStorage.getItem('expiresIn');

  useEffect(() => {
    if (expiresIn && Number(expiresIn) - Date.now() < 0) {
      setCheckingAuth(false);
      return localStorage.clear();
    }
    if (token) {
      dispatch(autologin(token));
    } else setCheckingAuth(false);
  }, []);

  useEffect(() => {
    if (userId) setCheckingAuth(false);
  }, [userId]);

  const routes = userId ? (
    <Switch>
      <Route
        path="/home"
        render={(props) => <Home {...props} token={token as string} />}
      />
      <Route
        path="/user/:userId"
        render={(props) => <User {...props} token={token as string} />}
      />
      <Route path="/signup">
        <Redirect to="/home" />
      </Route>
      <Route path="/login">
        <Redirect to="/home" />
      </Route>
      <Route path="/" exact>
        <Redirect to="/home" />
      </Route>
      <Route path="/" component={NotFound} />
    </Switch>
  ) : (
    <Switch>
      <Route path="/signup" component={Auth} />
      <Route path="/login" component={Auth} />
      <Route path="/home">
        <Redirect to="/signup" />
      </Route>
      <Route path="/" exact>
        <Redirect to="/signup" />
      </Route>
      <Route path="/" component={NotFound} />k
    </Switch>
  );

  return (
    <Box minHeight="100vh">
      {checkingAuth ? (
        <Box
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="primary" size={300} />
        </Box>
      ) : (
        routes
      )}
    </Box>
  );
};

export default App;
