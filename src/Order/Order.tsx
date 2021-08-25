import Header from '../Header';
import { useState } from 'react';
import { Button, Form, Input, Select, Space, Typography } from 'antd';
import { oderProduct } from '../store/orderReducer';
import { useDispatch, useSelector } from 'react-redux';
import Map from './Map';

// type TFormData = {
//   productName: string;
//   price: number;
//   city: string;
//   address: string;
//   lat: number;
//   lng: number;
//   description: string;
//   phone: string;
//   deleveredFrom: {
//     city: string;
//     address: string;
//     location: {
//       lat: number;
//       lng: number;
//     };
//   };
// };

const points = [
  {
    city: 'Minsk',
    address: 'Hikalo 16',
    location: {
      lat: 0,
      lng: 0,
    },
  },
  {
    city: 'Moscow',
    address: 'Arbat 1',
    location: {
      lat: 0,
      lng: 0,
    },
  },
];

const Order = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.user.user?.id);
  const order = useSelector((state: any) => state.order.order);
  const [stage, setStage] = useState(1);
  const [form, setForm] = useState<any>({
    productName: '',
    price: 0,
    city: '',
    address: '',
    lat: 0,
    lng: 0,
    description: '',
    phone: '',
    deleveredFrom: {
      city: '',
      address: '',
      location: {
        lat: 0,
        lng: 0,
      },
    },
  });
  const onFormLayoutChange = (fullForm: any) => {
    const valueKey = Object.keys(fullForm)[0];
    const value = fullForm[valueKey];
    setForm((form: any) => ({ ...form, [valueKey]: value }));
  };
  const onFinish = () => {
    setStage((stage) => stage + 1);
    dispatch(oderProduct(form, userId));
  };

  if (order && stage === 4) {
    return (
      <>
        <Header />
        <Typography.Title level={3}>Ваш заказ</Typography.Title>
        <Space direction={'vertical'} size={3}>
          <Typography.Text>Вы заказали: {form.productName}</Typography.Text>
          <Typography.Text>Цена товара составляет: {form.price}</Typography.Text>
          <Typography.Text>
            Ваш комментарий к заказу: {form.description}
          </Typography.Text>
        </Space>
        <Map />
      </>
    );
  }
  const onChangeDeliverFrom = (value: any) => {
    const point = points.filter((point) => point.city + point.address === value)[0];
    setForm((form: any) => ({ ...form, deleveredFrom: point }));
  };

  return (
    <>
      <Header />
      {stage === 1 ? (
        <Form
          onValuesChange={onFormLayoutChange}
          initialValues={form}
          onFinish={() => setStage((state) => state + 1)}
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
          onValuesChange={onFormLayoutChange}
          initialValues={form}
          onFinish={() => setStage((state) => state + 1)}
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
      ) : (
        <Form
          onValuesChange={onFormLayoutChange}
          initialValues={form}
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
      )}
    </>
  );
};

export default Order;
