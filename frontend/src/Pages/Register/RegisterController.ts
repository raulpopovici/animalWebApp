import {
  UserRegisterState,
  UserRegisterStateType,
  newFirstnameUpdate,
} from "./RegisterReducer";

export const handleRegisterErrors = (errorData: any) => {
  const { firstName, lastName, email, password, confirmPassword } = errorData;
};

export const handleChangeRegisterTextInput = (
  e: string,
  textInputType: string,
  dispatchUserReducerData: React.Dispatch<UserRegisterStateType>
) => {
  switch (textInputType) {
    case "firstname":
      dispatchUserReducerData({
        type: UserRegisterState.firstname,
        payload: e,
      });
      break;
    case "lastname":
      dispatchUserReducerData({
        type: UserRegisterState.lastname,
        payload: e,
      });
      break;
    case "email":
      dispatchUserReducerData({
        type: UserRegisterState.email,
        payload: e,
      });
      break;
    case "password":
      dispatchUserReducerData({
        type: UserRegisterState.password,
        payload: e,
      });
      break;
    case "confirmPassword":
      dispatchUserReducerData({
        type: UserRegisterState.confirmPassword,
        payload: e,
      });
      break;
  }
};
