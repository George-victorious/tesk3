import React, { useState } from 'react';
import Header from '../Header';
import { Button, Form, Input, Select, Space, Typography } from 'antd';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state: any) => state.user.user);
  const [form, setForm] = useState(user);

  const onValuesChange = (formValue: any) => {
    const key = Object.keys(formValue)[0];
    setForm((form: any) => ({ ...form, [key]: formValue[key] }));
  };

  return (
    <>
      {console.log(form)}
      <Header />
      <Typography.Title level={4}>Мой профиль</Typography.Title>
      <Typography.Text>Личные данные</Typography.Text>
      <Form initialValues={form} onValuesChange={onValuesChange} layout={'vertical'}>
        <Space direction={'vertical'} size={5}>
          <Space direction={'horizontal'} size={10}>
            <Form.Item label='Имя' name={'firstName'} required>
              <Input placeholder={'Имя'} />
            </Form.Item>
            <Form.Item label='Фамилия' name={'lastName'} required>
              <Input placeholder={'Фамилия'} />
            </Form.Item>
            <Form.Item label='Отчество' name={'middleName'} required>
              <Input placeholder={'Отчество'} />
            </Form.Item>
          </Space>
          <Space direction={'horizontal'} size={10}>
            <Form.Item label='Пол' name={'gender'} required>
              <Select placeholder={'Пожауйста выберите...'}>
                <Select.Option value={0}>Мужской</Select.Option>
                <Select.Option value={1}>Женский</Select.Option>
              </Select>
            </Form.Item>
          </Space>
          <Space direction={'horizontal'} size={10}>
            <Form.Item label='Телефон' name={'phone'} required>
              <Input placeholder={'Телефон'} />
            </Form.Item>
            <Form.Item label='Почта' name={'email'} required>
              <Input placeholder={'Почта'} />
            </Form.Item>
          </Space>
          <Form.Item>
            <Button htmlType='submit' type={'default'}>
              Сохранить
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </>
  );
};

export default Profile;
