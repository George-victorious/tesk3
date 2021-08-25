import React, { useEffect } from 'react';
import Header from '../Header';
import { List } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, unsetUserBuys } from '../store/buysReducer';
import { withRouter } from 'react-router-dom';

const AdminPage = (props: any) => {
  const users = useSelector((state: any) => state.buys.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
    return () => {
      unsetUserBuys();
    };
  }, []);

  const openUserBuyList = (id: number) => {
    props.history.push('admin/' + id);
  };

  return (
    <>
      <Header />
      {users ? (
        <List
          itemLayout='horizontal'
          dataSource={users}
          renderItem={(item: any) => (
            <List.Item onClick={() => openUserBuyList(item.id)}>
              <List.Item.Meta
                title={item.lastName + ' ' + item.firstName}
                description={'Совершено покупок: ' + item.buyCount}
              />
            </List.Item>
          )}
        />
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default withRouter(AdminPage);
