export const removeUser = (id: string) =>
  ({
    type: 'ListUsersReducer/REMOVE-USER',
    id,
  } as const);
export const addUser = (name: string) =>
  ({
    type: 'ListUsersReducer/ADD-USER',
    name,
  } as const);
export const settingContact = (id: string, name: string) =>
  ({
    type: 'ListUsersReducer/SETTING-USER',
    name,
    id,
  } as const);

export type actionTypeUserList =
  | ReturnType<typeof removeUser>
  | ReturnType<typeof settingContact>
  | ReturnType<typeof addUser>;
