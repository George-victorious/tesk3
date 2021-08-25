import React, { useEffect, useState } from 'react';
import Header from '../Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBuys } from '../store/buysReducer';
import Text from 'antd/lib/typography/Text';
import { Button, Card } from 'antd';
import './UserBuys.scss';
import { CloseCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';

const UserBuys = () => {
  type TIsOpen = {
    id: number | null;
    isFullOpen: boolean;
  };

  const [isOpen, setIsOpen] = useState<TIsOpen>({
    id: null,
    isFullOpen: false,
  });

  const openDesc = (id: number) => {
    setIsOpen((isOpen) => ({ ...isOpen, id: id }));
  };

  const openHideDescFully = () => {
    setIsOpen((isOpen) => ({ ...isOpen, isFullOpen: !isOpen.isFullOpen }));
  };

  const closeDesc = (e: any) => {
    e.stopPropagation();
    setIsOpen(() => ({ id: null, isFullOpen: false }));
  };

  const dispatch = useDispatch();
  const id = useSelector((state: any) => state.user.user?.id);
  const userBuys = useSelector((state: any) => state.buys.userBuys);

  useEffect(() => {
    dispatch(fetchUserBuys(id));
  }, [dispatch]);

  function normalizeDate(timestamp: number) {
    const date = new Date(timestamp);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }
  function getStatus(status: number) {
    switch (status) {
      case 0:
        return <Text style={{ color: 'green' }}>Active</Text>;
      case 1:
        return <Text style={{ color: 'yellow' }}>Delivering</Text>;
      default:
        return <Text style={{ color: 'grey' }}>Closed</Text>;
    }
  }

  return (
    <>
      <Header />
      {userBuys ? (
        userBuys.map((buy: any) => (
          <Card
            style={!isOpen.id !== buy.id ? { cursor: 'pointer' } : undefined}
            bordered={false}
            key={'order' + buy.id}
            onClick={() => openDesc(buy.id)}
          >
            {isOpen.id === buy.id ? (
              <>
                <CloseCircleTwoTone
                  onClick={closeDesc}
                  twoToneColor={'red'}
                  style={{ margin: '4px 0' }}
                />
                <div className={'card-item'}>
                  <Text>Дата</Text>
                  <Text>{normalizeDate(buy.created)}</Text>
                </div>
                <div className={'card-item'}>
                  <Text>Статус</Text>
                  <Text>{getStatus(buy.status)}</Text>
                </div>
                <div className={'card-item'}>
                  <Text>Сумма</Text>
                  <Text>{buy.price}</Text>
                </div>
                <div className={'card-item'}>
                  <Text>Продукт</Text>
                  <Text>{buy.productName}</Text>
                </div>
                {isOpen.isFullOpen && (
                  <>
                    <div className={'card-item'}>
                      <Text>Место отправки товара</Text>
                      <Text>
                        {buy.deleveredFrom.city}, {buy.deleveredFrom.address}
                      </Text>
                    </div>
                    <div className={'card-item'}>
                      <Text>Место доставки товара</Text>
                      <Text>
                        {buy.deleveredTo.city}, {buy.deleveredTo.address}
                      </Text>
                    </div>
                    <div className={'card-item'}>
                      <Text>Описание</Text>
                      <Text>{buy.description}</Text>
                    </div>
                  </>
                )}
                <Button type={'primary'} onClick={openHideDescFully}>
                  {isOpen.isFullOpen ? 'Скрыть описание' : 'Подробнее'}
                </Button>
              </>
            ) : (
              <div className={'card-header'}>
                <Text>{getStatus(buy.status)}</Text>
                <Text>{normalizeDate(buy.created)}</Text>
                <PlusCircleTwoTone style={{ margin: 'auto 0' }} />
              </div>
            )}
          </Card>
        ))
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default UserBuys;
