import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Login } from './Login';
import { AdminPage, UserBuys } from './AdminPage';
import { Registration } from './Registration';
import Profile from './Profile';
import Order from './Order';
import './App.less';
import { AdminUserBuys } from './AdminUserBuys';
import { Layout } from 'antd';
import Header from './Header';
import { Content } from 'antd/lib/layout/layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Content
          style={{
            minHeight: 'calc(100vh - 90px)',
            height: '100px',
            margin: '0 auto',
            width: '100%',
            maxWidth: '1024px',
          }}
        >
          <Route path={'/login'} component={Login} />
          <Route path={'/registration'} component={Registration} />

          <Route exact path={'/'} component={UserBuys} />
          <Route exact path={'/admin'} component={AdminPage} />
          <Route path={'/admin/:userId'} component={AdminUserBuys} />
          <Route path={'/order'} component={Order} />
          <Route exact path={'/profile'} component={Profile} />
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
