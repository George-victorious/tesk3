import {RootStateType} from "./store";

export const getUser = (state: RootStateType) => state.user.user;
export const getUserId = (state: RootStateType) => state.user.user?.id;

export const getOrder = (state: RootStateType) => state.order.order;

export const getBuys = (state: RootStateType) => state.buys.userBuys;

export const getUsers = (state: RootStateType) => state.buys.users;
