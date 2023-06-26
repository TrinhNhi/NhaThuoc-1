import { useCallApi } from '@/configs/api';
import { API_URLS } from '@/configs/api/endpoint';
import { LoginPayload, SignUpPayload } from '@/configs/api/payload';
import { Callback } from '@/types/others/callback';
import { NotiType, renderNotification } from '@/utils/notifications';
import React, { createContext, useReducer } from 'react';
import { AuthAction, AuthActionType } from './action';
import { decodeToken } from '@/utils/token';
import { IUser } from '@/types/models/IUser';

const initialState = {
  isFetching: false,
  user: null as IUser | null
};

type AuthState = typeof initialState;

function authReducer(state = initialState, action: AuthActionType): AuthState {
  switch (action.type) {
    case AuthAction.AUTH_ACTION_PENDING:
      return { ...state, isFetching: true };
    case AuthAction.AUTH_ACTION_FAILURE:
      return { ...state, isFetching: false };
    case AuthAction.LOGIN_SUCCESS:
      return { ...state, isFetching: false };
    case AuthAction.SIGNUP_SUCCESS:
      return { ...state, isFetching: false };
    case AuthAction.LOGOUT:
      return state;
    default:
      return state;
  }
}

function useAuthReducer(_state = initialState) {
  const [state, dispatch] = useReducer(authReducer, _state);

  const login = async (payload: LoginPayload, cb?: Callback) => {
    dispatch({ type: AuthAction.AUTH_ACTION_PENDING });

    const api = API_URLS.Users.login();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: AuthAction.LOGIN_SUCCESS
      });
      decodeToken(response.data.token);
      renderNotification('Đăng nhập thành công', NotiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: AuthAction.AUTH_ACTION_FAILURE });
      renderNotification('Đăng nhập thất bại', NotiType.ERROR);
      cb?.onError?.();
    }
  };

  const signup = async (payload: SignUpPayload, cb?: Callback) => {
    dispatch({ type: AuthAction.AUTH_ACTION_PENDING });

    const api = API_URLS.Users.signup();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: AuthAction.SIGNUP_SUCCESS
      });
      renderNotification('Tạo tài khoản thành công', NotiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: AuthAction.AUTH_ACTION_FAILURE });
      renderNotification('Tạo tài khoản thất bại', NotiType.ERROR);
      cb?.onError?.();
    }
  };

  const logout = () => {
    dispatch({ type: AuthAction.LOGOUT });
    localStorage.removeItem('token');
    localStorage.removeItem('authUser');
    renderNotification('Đăng xuất thành công', NotiType.SUCCESS);
  };

  return { state, login, signup, logout };
}

export const AuthContext = createContext<ReturnType<typeof useAuthReducer>>({
  state: initialState,
  login: async () => {},
  signup: async () => {},
  logout: () => {}
});

interface Props {
  children: React.ReactNode | string;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const authReducer = useAuthReducer();

  return <AuthContext.Provider value={authReducer}>{children}</AuthContext.Provider>;
};
