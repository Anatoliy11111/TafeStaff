import React, { useEffect } from 'react';

import style from './App.module.scss';

import { RouteMenu } from 'components/Route/RouteMenu';
import { authMe } from 'redux/LoginReducer/LoginReducer';
import { useAppDispatch } from 'redux/Store';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authMe());
  }, []);

  return (
    <div className={style.App}>
      <RouteMenu />
    </div>
  );
};
