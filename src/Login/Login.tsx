import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { loginCurrentUser } from '../store/userReducer';
import { useDispatch } from 'react-redux';
import './Login.scss';
import Header from '../Header';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('georgi.filipov@com');
  const [password, setPassword] = useState('qwerty1');
  const dispatch = useDispatch();

  return (
    <>
      <Header />
      <div className={'popup-container'}>
        <Input
          placeholder={'email'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder={'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type={'primary'}
          onClick={() => dispatch(loginCurrentUser(email, password))}
        >
          Login
        </Button>
        <Button type={'default'}>
          <Link to={'/registration'}>Create account</Link>
        </Button>
      </div>
    </>
  );
};

export default Login;
