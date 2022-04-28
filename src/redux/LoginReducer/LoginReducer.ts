import { Dispatch } from 'redux';

import { isLoginApi } from 'api';
import { authType } from 'api/LoginApi';
import { actionLoginReducer, setIsLogin, setNoAuthorizedText } from 'redux/LoginReducer';

export type loginInitialStateType = {
  isLogin: boolean;
  error: string;
};

const loginInitialState: loginInitialStateType = {
  isLogin: false,
  error: '',
};

export const LoginReducer = (
  state: loginInitialStateType = loginInitialState,
  action: actionLoginReducer,
): loginInitialStateType => {
  switch (action.type) {
    case 'loginReducer/REMOVE-USER': {
      return { ...state, isLogin: action.isLogin };
    }
    case 'loginReducer/NO-AUTHORIZED-USER': {
      return { ...state, error: action.error };
    }
    default:
      return state;
  }
};
const validResultCode = 0;
export const isLoginThunk = (data: authType) => async (dispatch: Dispatch) => {
  try {
    await isLoginApi.isLogin(data);
    dispatch(setIsLogin(true));
  } catch {
    dispatch(setNoAuthorizedText('Авторизируйесь пожалуйста'));
  }
};
export const authMe = () => async (dispatch: Dispatch) => {
  try {
    const res = await isLoginApi.me();
    if (res.data.resultCode === validResultCode) {
      dispatch(setIsLogin(true));
    }
  } catch (e) {
    dispatch(setNoAuthorizedText('Авторизируйесь пожалуйста'));
  }
};
