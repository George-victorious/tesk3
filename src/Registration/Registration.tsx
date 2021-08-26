import React, { useMemo, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { registryCurrentUser } from '../store/userReducer';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Registration = () => {
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState<any>({
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

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
    for (const [key, value] of Object.entries(newUser)) {
      inputList.push({
        ph: placeholders[key],
        value: value,
        key: key,
        action: (e: any) => setNewUser({ ...newUser, [key]: e.target.value }),
      });
    }
    return inputList;
  }, [newUser]);

  const onRegChange = (fullForm: any) => {
    const valueKey = Object.keys(fullForm)[0];
    const value = fullForm[valueKey];
    setNewUser((newUser: any) => ({ ...newUser, [valueKey]: value }));
  };

  return (
    <div className={'login-container'}>
      <div className={'popup-container'}>
        <Form
          initialValues={newUser}
          onValuesChange={onRegChange}
          onFinish={() => dispatch(registryCurrentUser(newUser))}
        >
          {inputList.map((input: any, index: number) => (
            <Form.Item key={input.key} name={input.key}>
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
