import React, { useMemo, useState } from 'react';
import { Button, Input } from 'antd';
import { registryCurrentUser } from '../store/userReducer';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Registration = () => {
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState({
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
        action: (e: any) => setNewUser({ ...newUser, [key]: e.target.value }),
      });
    }
    return inputList;
  }, [newUser]);

  return (
    <div className={'login-container'}>
      <div className={'popup-container'}>
          {inputList.map((input: any) => (
            <Input
              key={'input' + input.ph}
              placeholder={input.ph}
              value={input.value}
              onChange={input.action}
            />
          ))}
          <Button
            type={'primary'}
            onClick={() => dispatch(registryCurrentUser(newUser))}
          >
            Create account
          </Button>
          <Button type={'default'}>
            <Link to={'/login'}>I have an account</Link>
          </Button>
      </div>
    </div>
  );
};

export default Registration;
