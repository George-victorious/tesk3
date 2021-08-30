import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBuys } from '../../store/buysReducer';
import Text from 'antd/lib/typography/Text';
import { Button, Card } from 'antd';
import './UserBuys.scss';
import { CloseCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import { getBuys, getUserId } from '../../store/selectors';

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
  const id = useSelector(getUserId);
  const userBuys = useSelector(getBuys);

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

  if (userBuys && !userBuys.length) {
    return (
      <div className={'empty-list'}>
        <img
          width={'100%'}
          src={
            'https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png'
          }
          alt={''}
        />
      </div>
    );
  }

  return (
    <>
      {userBuys ? (
        userBuys.map((buy: any) => (
          <Card
            style={{
              cursor: isOpen.id !== buy.id ? 'pointer' : 'default',
              margin: '10px auto',
              width: '500px',
            }}
            bordered={false}
            key={'order' + buy.id}
            onClick={() => openDesc(buy.id)}
          >
            {isOpen.id === buy.id ? (
              <>
                <div className={'card-item'}>
                  <CloseCircleTwoTone
                    onClick={closeDesc}
                    twoToneColor={'red'}
                    style={{ margin: '4px 0 4px auto' }}
                  />
                </div>
                <div className={'card-item'}>
                  <Text>Дата</Text>
                  <Text>{normalizeDate(buy.created)}</Text>
                </div>
                <div className={'card-item'}>
                  <Text>Статус</Text>
                  <>{getStatus(buy.status)}</>
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
                <div className={'card-item'}>
                  <Button
                    type={'primary'}
                    onClick={openHideDescFully}
                    style={{ margin: '5px 0 0 auto' }}
                  >
                    {isOpen.isFullOpen ? 'Скрыть описание' : 'Подробнее'}
                  </Button>
                </div>
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
