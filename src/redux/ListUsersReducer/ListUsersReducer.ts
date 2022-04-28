import { v1 } from 'uuid';

import { actionTypeUserList } from 'redux/ListUsersReducer/ActionsListUsers';

export type usersType = {
  id: string;
  name: string;
};

const users: usersType[] = [
  { id: v1(), name: 'Yulia' },
  { id: v1(), name: 'Alexey' },
  { id: v1(), name: 'Arina' },
  { id: v1(), name: 'Andrey' },
  { id: v1(), name: 'Alex' },
];

export const ListUsersReducer = (
  state: usersType[] = users,
  action: actionTypeUserList,
): usersType[] => {
  switch (action.type) {
    case 'ListUsersReducer/REMOVE-USER': {
      return state.filter(u => u.id !== action.id);
    }
    case 'ListUsersReducer/ADD-USER': {
      return [{ id: v1(), name: action.name }, ...state];
    }
    case 'ListUsersReducer/SETTING-USER': {
      return state.map(u => (u.id === action.id ? { ...u, name: action.name } : u));
    }
    default:
      return state;
  }
};
