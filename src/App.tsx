import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Login } from './Login';
import { AdminPage, UserBuys } from './AdminPage';
import { Registration } from './Registration';
import Profile from './Profile';
import Order from './Order';
import './App.less';
import { AdminUserBuys } from './AdminUserBuys';

function App() {
  return (
    <BrowserRouter>
      <Route path={'/login'} component={Login} />
      <Route path={'/registration'} component={Registration} />

      <Route exact path={'/'} component={UserBuys} />
      <Route exact path={'/admin'} component={AdminPage} />
      <Route path={'/admin/:userId'} component={AdminUserBuys} />
      <Route path={'/order'} component={Order} />
      <Route exact path={'/profile'} component={Profile} />
    </BrowserRouter>
  );
}

export default App;
