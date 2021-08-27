import { useState } from 'react';
import { Button, Form, Input, Select, Space, Steps, Typography } from 'antd';
import { oderProduct } from '../../store/orderReducer';
import { useDispatch, useSelector } from 'react-redux';
import Map from './Map';
import { getOrder, getUserId } from '../../store/selectors';
import { useForm } from 'antd/lib/form/Form';

type TSteps = {
  title: string;
  description: string;
};
type TPoints = {
  city: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
};

const steps: TSteps[] = [
  {
    title: 'Product choose',
    description: 'Product info',
  },
  {
    title: 'Choose location',
    description: 'Delivery info',
  },
  {
    title: 'Contacts',
    description: 'Contact info',
  },
];

const points: TPoints[] = [
  {
    city: 'Minsk',
    address: 'Hikalo 16',
    location: {
      lat: 53.9046755,
      lng: 27.5520775,
    },
  },
  {
    city: 'Moscow',
    address: 'Arbat 1',
    location: {
      lat: 55.751813,
      lng: 37.5971054,
    },
  },
];

const Order = () => {
  const { Step } = Steps;
  const [form] = useForm();
  const [stage, setStage] = useState(1);
  const [orderData, setOrderData] = useState<any>({});
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const order = useSelector(getOrder);
  const initialValues = {
    productName: 'qweq',
    price: 0,
    city: 'qwe',
    address: 'qwe',
    lat: 0,
    lng: 0,
    description: 'qwe',
    phone: '123',
    deleveredFrom: {
      city: 'qwe',
      address: 'qwe',
      location: {
        lat: 0,
        lng: 0,
      },
    },
  };

  const onChangeDeliverFrom = (value: any) => {
    const point = points.filter((point) => point.city + point.address === value)[0];
    setOrderData({ ...orderData, deleveredFrom: point });
  };

  const toNewStage = (values: any) => {
    setOrderData({
      ...orderData,
      ...values,
    });
    setStage(stage + 1);
  };

  const onFinish = (values: any) => {
    dispatch(oderProduct({ ...orderData, ...values }, userId));
    setStage((stage) => stage + 1);
  };

  return (
    <>
      {!order && (
        <Steps current={stage - 1} style={{ marginBottom: '20px' }}>
          {steps.map((item) => (
            <Step
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </Steps>
      )}
      {stage === 1 ? (
        <Form
          form={form}
          initialValues={initialValues}
          onFinish={toNewStage}
          layout='vertical'
        >
          <Form.Item
            key={'productName'}
            name='productName'
            rules={[{ required: true, message: 'Please input product name!' }]}
          >
            <Input placeholder={'Название продукта'} />
          </Form.Item>
          <Form.Item
            key={'price'}
            name='price'
            rules={[{ required: true, message: 'Please input required price!' }]}
          >
            <Input placeholder={'Цена'} />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit'>Далее</Button>
          </Form.Item>
        </Form>
      ) : stage === 2 ? (
        <Form
          form={form}
          initialValues={initialValues}
          onFinish={toNewStage}
          layout='vertical'
        >
          <Form.Item
            key={'city'}
            name='city'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder={'Город'} />
          </Form.Item>
          <Form.Item
            key={'address'}
            name='address'
            rules={[{ required: true, message: 'Please input your city!' }]}
          >
            <Input placeholder={'Адрес'} />
          </Form.Item>
          <Form.Item
            key={'lat'}
            name='lat'
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Input placeholder={'Широта'} />
          </Form.Item>
          <Form.Item
            key={'lng'}
            name='lng'
            rules={[{ required: true, message: 'Please input your longitude!' }]}
          >
            <Input placeholder={'Долгота'} />
          </Form.Item>
          <Form.Item
            key={'placeFrom'}
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Select placeholder='Please select' onChange={onChangeDeliverFrom}>
              {points.map((el) => (
                <Select.Option
                  key={el.city + el.address}
                  value={el.city + el.address}
                >
                  {`${el.city}, ${el.address}`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit'>Далее</Button>
          </Form.Item>
        </Form>
      ) : stage === 3 ? (
        <Form
          form={form}
          initialValues={initialValues}
          onFinish={onFinish}
          layout='vertical'
        >
          <Form.Item
            key={'phone'}
            name='phone'
            rules={[{ required: true, message: 'Please input your phone!' }]}
          >
            <Input placeholder={'Контактный телефон'} />
          </Form.Item>
          <Form.Item key={'description'} name='description'>
            <Input placeholder={'Коментарий'} />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit'>Заказать</Button>
          </Form.Item>
        </Form>
      ) : (
        <>
          {order && (
            <>
              <Typography.Title level={3}>Ваш заказ</Typography.Title>
              <Space
                direction={'vertical'}
                size={10}
                style={{ alignItems: 'flex-start' }}
              >
                <Space direction={'vertical'} size={3}>
                  <Typography.Text>Вы заказали: {order.productName}</Typography.Text>
                  <Typography.Text>
                    Цена товара составляет: {order.price}
                  </Typography.Text>
                  <Typography.Text>
                    Ваш комментарий к заказу: {order.description}
                  </Typography.Text>
                </Space>
                <Map />
              </Space>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Order;
