import { usersType } from 'redux/ListUsersReducer';
import { storeType } from 'redux/Store';

export const selectUsers = (state: storeType): usersType[] => state.ListUsers;
export const selectIsLogin = (state: storeType): boolean => state.Login.isLogin;
