import { createSlice } from '@reduxjs/toolkit';
import {} from './types';
import axios from 'axios';

// const serverUsers = [
//   {
//     id: 1,
//     gender: 0,
//     email: 'georgi.filipov@com',
//     firstName: 'Georgi',
//     middleName: 'Igorevich',
//     lastName: 'Filipov',
//     phone: '+375441234567',
//     password: 'qwerty1',
//     role: 'user',
//     token: 'qwerty1',
//   },
// ];

// type userLogPas = {
//   login: string;
//   password: string;
// };

type TCurrentUser = {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  token: string;
  authorized: boolean;
};
// type TSetUser = {
//   type: string;
//   payload: userLogPas;
// };

type TInitStateCurUserReducer = {
  user: null | TCurrentUser;
  isError: {
    isLoginError: boolean;
    isPasswordError: boolean;
  };
};

const initialState: TInitStateCurUserReducer = {
  user: null,
  isError: {
    isLoginError: false,
    isPasswordError: false,
  },
};

const userReducer = createSlice({
  name: 'current_user',
  initialState,
  reducers: {
    setUser(state: TInitStateCurUserReducer, action: { payload: any }) {
      state.user = action.payload;
    },
    unsetUser(state: TInitStateCurUserReducer) {
      state.user = null;
    },
  },
});

export function loginCurrentUser(email: string, password: string) {
  return async (dispatch: any) => {
    await axios
      .get(`https://tesk3server.herokuapp.com/login?email=${email}&password=${password}`)
      .then((res) => {
        dispatch(setUser(res.data.user));
      })
      .catch(() => dispatch(unsetUser()));
  };
}

export function registryCurrentUser(user: any) {
  return async (dispatch: any) => {
    await axios
      .put(`https://tesk3server.herokuapp.com/registry`, {
        user: user,
      })
      .then((res) => {
        dispatch(setUser(res.data.user));
      })
      .catch(() => dispatch(unsetUser()));
  };
}

export default userReducer.reducer;
export const { setUser, unsetUser } = userReducer.actions;
