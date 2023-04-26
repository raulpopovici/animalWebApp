export const createAction = <T extends string | number, P>(
  type: T,
  payload: P
) => {
  return { type, payload } as const;
};

export interface errors {
  firstnameError: string;
  lastnameError: string;
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
}

export interface IUserRegister {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  registerErrors: errors;
}

export enum UserRegisterState {
  firstname,
  lastname,
  email,
  password,
  confirmPassword,
  registerErrors,
}

export const newFirstnameUpdate = (data: string) =>
  createAction(UserRegisterState.firstname, data);
export const newLastnameUpdate = (data: string) =>
  createAction(UserRegisterState.lastname, data);
export const newEmailUpdate = (data: string) =>
  createAction(UserRegisterState.email, data);
export const newPasswordUpdate = (data: string) =>
  createAction(UserRegisterState.password, data);
export const newcConfirmPasswordUpdate = (data: string) =>
  createAction(UserRegisterState.confirmPassword, data);
export const newRegisterErrorsUpdate = (data: errors) =>
  createAction(UserRegisterState.registerErrors, data);

type FirstnameUpdate = ReturnType<typeof newFirstnameUpdate>;
type LastnameUpdate = ReturnType<typeof newLastnameUpdate>;
type EmailUpdate = ReturnType<typeof newEmailUpdate>;
type PasswordUpdate = ReturnType<typeof newPasswordUpdate>;
type ConfirmPasswordUpdate = ReturnType<typeof newcConfirmPasswordUpdate>;
type RegisterErrorsUpdate = ReturnType<typeof newRegisterErrorsUpdate>;

export type UserRegisterStateType =
  | FirstnameUpdate
  | LastnameUpdate
  | EmailUpdate
  | PasswordUpdate
  | ConfirmPasswordUpdate
  | RegisterErrorsUpdate;

export const initialUserRegisterData: IUserRegister = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
  registerErrors: {
    firstnameError: "",
    lastnameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  },
};

export const userRegisterReducer = (
  state: IUserRegister,
  action: UserRegisterStateType
) => {
  switch (action.type) {
    case UserRegisterState.firstname:
      return {
        ...state,
        firstname: action.payload,
      };
    case UserRegisterState.lastname:
      return {
        ...state,
        lastname: action.payload,
      };
    case UserRegisterState.email:
      return {
        ...state,
        email: action.payload,
      };
    case UserRegisterState.password:
      return {
        ...state,
        password: action.payload,
      };
    case UserRegisterState.confirmPassword:
      return {
        ...state,
        confirmPassword: action.payload,
      };
    case UserRegisterState.registerErrors:
      return {
        ...state,
        registerErrors: action.payload,
      };
  }
};
