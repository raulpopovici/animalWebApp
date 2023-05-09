import React, { Dispatch, FC } from "react";
import {
  UserRegisterState,
  UserRegisterStateType,
} from "../../Pages/Register/RegisterReducer";
import styles from "./TextInput.module.css";
import {
  UserLoginState,
  UserLoginStateType,
} from "../../Pages/Login/LoginReducer";
import { handleChangeRegisterTextInput } from "../../Pages/Register/RegisterController";
import { handleChangeLoginTextInput } from "../../Pages/Login/LoginController";

interface IProps {
  textInputType: string | undefined;
  screenType?: string;
  dispatchUserReducerData:
    | React.Dispatch<UserRegisterStateType>
    | React.Dispatch<UserLoginStateType>;
}

export const TextInput: FC<IProps> = ({
  textInputType,
  screenType,
  dispatchUserReducerData,
}) => {
  const handleChangeTextInput = (event: string) => {
    if (screenType === "login") {
      handleChangeLoginTextInput(
        event,
        textInputType || "",
        dispatchUserReducerData as Dispatch<UserLoginStateType>
      );
    } else if (screenType === "register") {
      handleChangeRegisterTextInput(
        event,
        textInputType || "",
        dispatchUserReducerData as Dispatch<UserRegisterStateType>
      );
    }
  };
  if (textInputType === "password" || textInputType === "confirmPassword") {
    return (
      <input
        className={styles.inputElement}
        type="password"
        onChange={(event) => handleChangeTextInput(event.target.value)}
      ></input>
    );
  } else {
    return (
      <input
        className={styles.inputElement}
        onChange={(event) => handleChangeTextInput(event.target.value)}
      ></input>
    );
  }
};
