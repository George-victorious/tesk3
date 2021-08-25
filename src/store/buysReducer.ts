import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

type TInitStateCurUserReducer = {
  users: null | any[];
  userBuys: null | any[];
};

const initialState: TInitStateCurUserReducer = {
  users: null,
  userBuys: null,
};

const userReducer = createSlice({
  name: 'buys',
  initialState,
  reducers: {
    setUsers(state: TInitStateCurUserReducer, action: { payload: any }) {
      state.users = action.payload;
    },
    unsetUsers(state: TInitStateCurUserReducer) {
      state.users = null;
    },
    setUserBuys(state: TInitStateCurUserReducer, action: { payload: any }) {
      state.userBuys = action.payload;
    },
    unsetUserBuys(state: TInitStateCurUserReducer) {
      state.userBuys = null;
    },
  },
});

export function fetchUsers() {
  return async (dispatch: any) => {
    await axios
      .get(`http://localhost:4000/users`)
      .then((res) => {
        dispatch(setUsers(res.data.users));
      })
      .catch(() => dispatch(unsetUsers()));
  };
}

export function fetchUserBuys(id: number) {
  return async (dispatch: any) => {
    await axios
      .get(`http://localhost:4000/buylist?id=${id}`)
      .then((res) => {
        dispatch(setUserBuys(res.data.buyList));
      })
      .catch(() => dispatch(unsetUserBuys()));
  };
}

export default userReducer.reducer;
export const { setUsers, unsetUsers, setUserBuys, unsetUserBuys } =
  userReducer.actions;
