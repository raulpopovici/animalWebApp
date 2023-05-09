import { useNavigate } from "react-router";
import { UserLoginState, UserLoginStateType } from "./LoginReducer";

export const redirectToRegister = () => {};

export const handleChangeLoginTextInput = (
  e: string,
  textInputType: string,
  dispatchUserReducerData: React.Dispatch<UserLoginStateType>
) => {
  switch (textInputType) {
    case "email":
      dispatchUserReducerData({
        type: UserLoginState.email,
        payload: e,
      });
      break;
    case "password":
      dispatchUserReducerData({
        type: UserLoginState.password,
        payload: e,
      });
      break;
  }
};
