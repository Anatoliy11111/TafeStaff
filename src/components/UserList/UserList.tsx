import React, { ChangeEvent, useCallback, useState } from 'react';

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import style from './UserList.module.scss';

import { User } from 'components/UserList/User/User';
import { useDebounce } from 'hooks';
import { addUser } from 'redux/ListUsersReducer';
import { selectIsLogin } from 'redux/Selectors';
import { useAppDispatch } from 'redux/Store';

export const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLogin = useSelector(selectIsLogin);
  const [user, setUser] = useState('');
  const [findName, setFindName] = useState('');
  const [shouSearchInput, setShouSearchInput] = useState(false);
  const findUser = (): void => {
    setFindName(findName);
  };
  const timeForEnterName = 1000;
  const debounce = useDebounce(user, timeForEnterName, findUser);

  const onChangeInInput = (event: ChangeEvent<HTMLInputElement>): void => {
    setUser(event.currentTarget.value);
  };
  const onFindUserName = (event: ChangeEvent<HTMLInputElement>): void => {
    setFindName(event.currentTarget.value);
    debounce();
  };
  const onClickAddName = useCallback((): void => {
    dispatch(addUser(user));
    setUser('');
  }, [dispatch, user]);

  const onClickSelectInput = (): void => {
    setShouSearchInput(!shouSearchInput);
    setFindName('');
    setUser('');
  };
  if (!isLogin) {
    return <Navigate to="/login" />;
  }
  return (
    <div className={style.userListContainer}>
      <div className={style.addUser}>
        <div
          onKeyDown={() => {}}
          aria-label="Setting"
          role="button"
          className={style.searchButton}
          tabIndex={0}
          onClick={onClickSelectInput}
        />

        {!shouSearchInput && (
          <input placeholder="Enter your name" value={user} onChange={onChangeInInput} />
        )}
        {shouSearchInput && (
          <input placeholder="Search" value={findName} onChange={onFindUserName} />
        )}
        <span>{!shouSearchInput && <button onClick={onClickAddName}>+</button>}</span>
      </div>
      <User findName={findName} />
    </div>
  );
};
