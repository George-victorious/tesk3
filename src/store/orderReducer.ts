import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState: any = {
  order: null,
  isError: false,
};

const userReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder(state: any, action: any) {
      state.order = action.payload;
      state.isError = !action.payload;
    },
  },
});

export function oderProduct(order: any, id: number) {
  return async (dispatch: any) => {
    await axios
      .put(`https://tesk3server.herokuapp.com/order`, {
        order: order,
        id: id,
      })
      .then((res) => {
        dispatch(setOrder(res.data.order));
      })
      .catch(() => {
        dispatch(setOrder(null));
      });
  };
}

export default userReducer.reducer;
export const { setOrder } = userReducer.actions;
