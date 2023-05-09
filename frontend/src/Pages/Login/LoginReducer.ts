export const createAction = <T extends string | number, P>(
  type: T,
  payload: P
) => {
  return { type, payload } as const;
};
export interface errors {
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
  loginErrors: errors;
}

export enum UserLoginState {
  email,
  password,
  registerErrors,
}

export const newEmailUpdate = (data: string) =>
  createAction(UserLoginState.email, data);
export const newPasswordUpdate = (data: string) =>
  createAction(UserLoginState.password, data);
export const newLoginErrorsUpdate = (data: errors) =>
  createAction(UserLoginState.registerErrors, data);

type EmailUpdate = ReturnType<typeof newEmailUpdate>;
type PasswordUpdate = ReturnType<typeof newPasswordUpdate>;
type LoginErrorsUpdate = ReturnType<typeof newLoginErrorsUpdate>;

export type UserLoginStateType =
  | EmailUpdate
  | PasswordUpdate
  | LoginErrorsUpdate;

export const initialUserLoginData: IUserLogin = {
  email: "",
  password: "",
  loginErrors: {
    email: "",
    password: "",
  },
};
export const userLoginReducer = (
  state: IUserLogin = initialUserLoginData,
  action: UserLoginStateType
): IUserLogin => {
  switch (action.type) {
    case UserLoginState.email:
      return { ...state, email: action.payload };
    case UserLoginState.password:
      return { ...state, password: action.payload };
    case UserLoginState.registerErrors:
      return { ...state, loginErrors: action.payload };
    default:
      return state;
  }
};
