import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { loginCurrentUser } from '../store/userReducer';
import { useDispatch } from 'react-redux';
import './Login.scss';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('georgi.filipov@com');
  const [password, setPassword] = useState('qwerty1');
  const dispatch = useDispatch();

  const onValueChange = ({ email, password }: any) => {
    email === undefined ? setPassword(password) : setEmail(email);
  };

  return (
    <div className={'login-container'}>
      <div className={'popup-container'}>
        <Form
          initialValues={{ email: email, password: password }}
          onValuesChange={onValueChange}
          onFinish={() => dispatch(loginCurrentUser(email, password))}
        >
          <Form.Item
            key={'email'}
            name={'email'}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder={'email'} />
          </Form.Item>
          <Form.Item
            key={'password'}
            name={'password'}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder={'password'} />
          </Form.Item>
          <Form.Item>
            <Button style={{ width: '100%' }} type={'primary'} htmlType={'submit'}>
              Login
            </Button>
          </Form.Item>
        </Form>
        <Button type={'default'}>
          <Link to={'/registration'}>Create account</Link>
        </Button>
      </div>
    </div>
  );
};

export default Login;
