import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  loginRoute,
  registrationRoute,
  userRoute,
} from '../variables/serverRequests';

type TInitStateCurUserReducer = {
  user: any;
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

export function editCurrentUser(user: any) {
  return async (dispatch: any) => {
    await axios.post(userRoute, user).then((res) => {
      dispatch(setUser(res.data.user));
    });
  };
}

export function loginCurrentUser(email: string, password: string) {
  return async (dispatch: any) => {
    await axios
      .get(loginRoute + `?email=${email}&password=${password}`)
      .then((res) => {
        dispatch(setUser(res.data.user));
      })
      .catch(() => dispatch(unsetUser()));
  };
}

export function registryCurrentUser(user: any) {
  return async (dispatch: any) => {
    await axios
      .put(registrationRoute, {
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
