import React, { useMemo } from 'react';
import { Button, Form, Input } from 'antd';
import { registryCurrentUser } from '../../store/userReducer';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'antd/lib/form/Form';

const Registration = () => {
  const dispatch = useDispatch();
  const [form] = useForm();
  const newUser = {
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  const placeholders: any = {
    firstName: 'First name',
    middleName: 'Middle name',
    lastName: 'Last name',
    phone: 'Phone',
    email: 'Email',
    password: 'Password',
    passwordConfirm: 'Confirm password',
  };

  const inputList = useMemo(() => {
    const inputList: any = [];
    for (const [key] of Object.entries(placeholders)) {
      inputList.push({
        ph: placeholders[key],
        key: key,
      });
    }
    return inputList;
  }, [newUser]);

  return (
    <div className={'login-container'}>
      <div className={'popup-container'}>
        <Form
          form={form}
          initialValues={newUser}
          onFinish={(form) => dispatch(registryCurrentUser(form))}
        >
          {inputList.map((input: any, index: number) => (
            <Form.Item
              key={input.key}
              name={input.key}
              rules={[
                {
                  required: true,
                  min: 5,
                  max: 25,
                },
              ]}
            >
              {index < 5 ? (
                <Input placeholder={input.ph} />
              ) : (
                <Input.Password placeholder={input.ph} />
              )}
            </Form.Item>
          ))}
          <Form.Item>
            <Button style={{ width: '100%' }} type={'primary'} htmlType={'submit'}>
              Create account
            </Button>
          </Form.Item>
        </Form>
        <Button style={{ width: '100%' }} type={'default'}>
          <Link to={'/login'}>I have an account</Link>
        </Button>
      </div>
    </div>
  );
};

export default Registration;
