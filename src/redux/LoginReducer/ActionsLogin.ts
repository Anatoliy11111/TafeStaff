export const setIsLogin = (isLogin: boolean) =>
  ({
    type: 'loginReducer/REMOVE-USER',
    isLogin,
  } as const);
export const setNoAuthorizedText = (error: string) =>
  ({
    type: 'loginReducer/NO-AUTHORIZED-USER',
    error,
  } as const);

export type actionLoginReducer =
  | ReturnType<typeof setIsLogin>
  | ReturnType<typeof setNoAuthorizedText>;
