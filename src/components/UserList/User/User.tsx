import React, { memo, useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import style from 'components/UserList/UserList.module.scss';
import { removeUser } from 'redux/ListUsersReducer';
import { settingContact } from 'redux/ListUsersReducer/ActionsListUsers';
import { selectUsers } from 'redux/Selectors';

type UserType = {
  findName: string;
};

export const User: React.FC<UserType> = memo(({ findName }) => {
  const dispatch = useDispatch();
  const [rename, setRename] = useState('');
  const [showInput, setShowInput] = useState('');
  const users = useSelector(selectUsers);
  const deleteUSer = useCallback(
    (userId: string): void => {
      dispatch(removeUser(userId));
    },
    [dispatch],
  );
  const onclickSettingContact = (userId: string): void => {
    dispatch(settingContact(userId, rename));
    setShowInput('');
  };
  return (
    <div className={style.users}>
      {users.map(
        u =>
          u.name.toLowerCase().startsWith(findName.toLowerCase()) && (
            <div key={u.id} className={style.user}>
              <div className={style.buttonContainer}>
                <button
                  onClick={() => {
                    deleteUSer(u.id);
                  }}
                >
                  x
                </button>
              </div>
              <div className={style.nameAndSetting}>
                {u.id !== showInput && <div>{u.name}</div>}
                {u.id === showInput && (
                  <input
                    type="text"
                    value={rename}
                    onBlur={() => {
                      onclickSettingContact(u.id);
                    }}
                    onChange={e => setRename(e.currentTarget.value)}
                    autoFocus
                  />
                )}

                <div
                  onKeyDown={() => {}}
                  aria-label="Setting"
                  role="button"
                  tabIndex={0}
                  className={style.setting}
                  onClick={() => {
                    setShowInput(u.id);
                    setRename(u.name);
                  }}
                />
              </div>
            </div>
          ),
      )}
    </div>
  );
});
