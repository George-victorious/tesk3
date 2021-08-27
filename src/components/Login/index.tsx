import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { loginCurrentUser } from '../../store/userReducer';
import { useDispatch } from 'react-redux';
import './Login.scss';
import { Link } from 'react-router-dom';
import { useForm } from 'antd/lib/form/Form';

const Login = () => {
  const [form] = useForm();
  const email = 'georgi.filipov@com';
  const password = 'qwerty1';
  const dispatch = useDispatch();

  return (
    <div className={'login-container'}>
      <div className={'popup-container'}>
        <Typography.Text>alex.sabadash@com asdfgh2 - admin</Typography.Text>
        <Typography.Text>georgi.filipov@com qwerty1 - user</Typography.Text>
        <Form
          form={form}
          initialValues={{ email: email, password: password }}
          onFinish={(form) => dispatch(loginCurrentUser(form.email, form.password))}
        >
          <Form.Item
            key={'email'}
            name={'email'}
            rules={[
              {
                required: true,
                min: 5,
                max: 25,
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
                min: 5,
                max: 25,
              },
            ]}
          >
            <Input placeholder={'password'} />
          </Form.Item>
          <Form.Item>
            <Button type={'primary'} htmlType={'submit'}>
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
