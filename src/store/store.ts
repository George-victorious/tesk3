import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import buysReducer from './buysReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
  user: userReducer,
  buys: buysReducer,
  order: orderReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootStateType = any; //ReturnType<typeof rootReducer>;
export type dispatchType = typeof store.dispatch;
