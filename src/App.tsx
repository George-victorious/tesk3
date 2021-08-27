import React from 'react';
import history from 'history/browser';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminPage from './components/AdminPage';
import UserBuys from './components/AdminPage/UserBuys';
import Registration from './components/Registration';
import Profile from './components/Profile';
import Order from './components/Order';
import './App.less';
import './index.scss';
import AdminUserBuys from './components/AdminUserBuys';
import { Layout } from 'antd';
import Header from './components/Header';
import { Content } from 'antd/lib/layout/layout';
import { useSelector } from 'react-redux';
import { getUser } from './store/selectors';
import {
  adminPageRote,
  adminPageUserListRote,
  homePageRote,
  loginPageRote,
  orderPageRote,
  profilePageRote,
  registrationPageRote,
} from './variables/pageRoutes';

function App() {
  const user = useSelector(getUser);
  console.log(history);

  return (
    <BrowserRouter>
      {user &&
        (location.pathname === loginPageRote ||
          location.pathname === registrationPageRote) && (
          <Redirect to={homePageRote} />
        )}
      {!user &&
        location.pathname !== loginPageRote &&
        location.pathname !== registrationPageRote && (
          <Redirect to={loginPageRote} />
        )}
      <Layout>
        <Header />
        <Content className={'main-content'}>
          <Route path={loginPageRote} component={Login} />
          <Route path={registrationPageRote} component={Registration} />

          <Route exact path={homePageRote} component={UserBuys} />
          <Route exact path={adminPageRote} component={AdminPage} />
          <Route path={adminPageUserListRote} render={AdminUserBuys} />
          <Route path={orderPageRote} component={Order} />
          <Route exact path={profilePageRote} component={Profile} />
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
