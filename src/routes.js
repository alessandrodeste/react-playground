import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/App';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';

import UserList from './components/users/UsersList';
import UsersDetail from './components/users/UsersDetail';

import RequireAuth from './components/auth/RequireAuth';
import Home from './components/home';

export default (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={RequireAuth(Home)} />
      <Route path="signin" component={Signin} />
      <Route path="signout" component={Signout} />
      <Route path="signup" component={Signup} />
      <Route path="users" >
        <IndexRoute component={RequireAuth(UserList)} />
        <Route path="new" component={RequireAuth(UsersDetail)} />
        <Route path=":id" component={RequireAuth(UsersDetail)} />
      </Route>
    </Route>
  </Router>
);
