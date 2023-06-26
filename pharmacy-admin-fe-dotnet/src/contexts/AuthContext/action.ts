export enum AuthAction {
  AUTH_ACTION_PENDING = 'AUTH_ACTION_PENDING',
  AUTH_ACTION_FAILURE = 'AUTH_ACTION_FAILURE',

  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  EDIT_SUCCESS = 'EDIT_SUCCESS',
  GET_ALL_SUCCESS = 'GET_ALL_SUCCESS',
  GET_SUCCESS = 'GET_SUCCESS',
  DELETE_SUCCESS = 'DELETE_SUCCESS',

  LOGOUT = 'LOGOUT'
}

interface AuthActionPending {
  type: AuthAction.AUTH_ACTION_PENDING;
}

interface AuthActionFailure {
  type: AuthAction.AUTH_ACTION_FAILURE;
}

interface LoginSuccess {
  type: AuthAction.LOGIN_SUCCESS;
}

interface SignupSuccess {
  type: AuthAction.SIGNUP_SUCCESS;
}

interface EditSuccess {
  type: AuthAction.EDIT_SUCCESS;
}

interface GetAllSuccess {
  type: AuthAction.GET_ALL_SUCCESS;
}

interface GetSuccess {
  type: AuthAction.GET_SUCCESS;
}

interface DeleteSuccess {
  type: AuthAction.DELETE_SUCCESS;
}

interface Logout {
  type: AuthAction.LOGOUT;
}

export type AuthActionType = Logout | AuthActionPending | AuthActionFailure | GetAllSuccess | DeleteSuccess | GetSuccess | EditSuccess | LoginSuccess | SignupSuccess;
