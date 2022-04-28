import { useDispatch } from 'react-redux';
import { applyMiddleware, combineReducers, legacy_createStore, Store } from 'redux';
import thunk from 'redux-thunk';

import { ListUsersReducer } from 'redux/ListUsersReducer';
import { LoginReducer } from 'redux/LoginReducer';

export const reducerRoot = combineReducers({
  ListUsers: ListUsersReducer,
  Login: LoginReducer,
});

export type storeType = ReturnType<typeof reducerRoot>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): Function => useDispatch<AppDispatch>();

export const store: Store = legacy_createStore(reducerRoot, applyMiddleware(thunk));
