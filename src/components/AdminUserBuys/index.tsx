import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserBuys } from '../../store/buysReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import Text from 'antd/lib/typography/Text';
import { getBuys } from '../../store/selectors';

const AdminUserBuys = () => {
  const dispatch = useDispatch();
  const { userId }: any = useParams();
  const userBuys = useSelector(getBuys);
  const columns = [
    {
      title: 'Товар',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Цена',
      key: 'price',
      render: (text: any, record: any) => <Text>{`$_${record.price}`}</Text>,
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Создано',
      dataIndex: 'created',
      key: 'created',
    },
    {
      title: 'Доставлено',
      key: 'deleveredAt',
      render: (text: any, record: any) => (
        <Text>{record.deleveredAt ?? 'Не доставлено'}</Text>
      ),
    },
    {
      title: 'Откуда',
      key: 'deleveredFrom',
      render: (text: any, record: any) => (
        <Text>{record.deleveredFrom.city + ' ' + record.deleveredFrom.address}</Text>
      ),
    },
    {
      title: 'Куда',
      key: 'deleveredTo',
      render: (text: any, record: any) => (
        <Text>{record.deleveredTo.city + ' ' + record.deleveredTo.address}</Text>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchUserBuys(userId));
  }, [dispatch]);

  return <Table loading={!userBuys} dataSource={userBuys} columns={columns} />;
};

export default AdminUserBuys;
