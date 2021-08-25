import React from 'react';
import './Header.scss';
import { Redirect, useLocation, withRouter } from 'react-router-dom';

import logo from '../assets/logo.png';
import { Button, Tabs } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { unsetUser } from '../store/userReducer';

const Header = (props: any) => {
  const user = useSelector((state: any) => state.user.user);
  const location = useLocation();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(unsetUser());
  };

  if (
    !user &&
    location.pathname !== '/login' &&
    location.pathname !== '/registration'
  ) {
    return <Redirect to={'/login'} />;
  }

  if (
    user &&
    (location.pathname === '/login' || location.pathname === '/registration')
  ) {
    return <Redirect to={'/'} />;
  }

  const changePage = (location: string) => {
    props.history.push(location);
  };

  return (
    <div className={'header'}>
      <div className={'header-content'}>
        <img className={'logo'} src={logo} alt={'logo'} />
        {user && (
          <>
            <div className={'nav-buttons'}>
              <Tabs
                tabBarStyle={{
                  margin: 0,
                }}
                tabPosition={'bottom'}
                activeKey={location.pathname}
                onChange={changePage}
              >
                <Tabs.TabPane tab='Home' key='/' />
                {user.role === 'admin' && <Tabs.TabPane tab='Admin' key='/admin' />}
                <Tabs.TabPane tab='Order' key='/order' />
                <Tabs.TabPane tab='Profile' key='/profile' />
              </Tabs>
            </div>
            <Button
              type={'primary'}
              shape={'circle'}
              icon={<LogoutOutlined />}
              onClick={logout}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default withRouter(Header);
