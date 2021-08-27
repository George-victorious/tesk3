import React from 'react';
import { Button, Form, Input, Select, Space, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { getUser } from '../../store/selectors';

const Profile = () => {
  const user = useSelector(getUser);
  const [form] = Form.useForm();

  return (
    <>
      <Typography.Title level={4}>Мой профиль</Typography.Title>
      <Form
        form={form}
        initialValues={user}
        layout={'vertical'}
        onFinish={() => console.log(form.getFieldsValue())}
      >
        <Space direction={'vertical'} size={0}>
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
