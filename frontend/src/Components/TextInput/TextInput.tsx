import React, { FC } from "react";
import {
  UserRegisterState,
  UserRegisterStateType,
} from "../../Pages/Register/RegisterReducer";
import styles from "./TextInput.module.css";

interface IProps {
  textInputType: string | undefined;
  dispatchUserReducerData: React.Dispatch<UserRegisterStateType>;
}

export const TextInput: FC<IProps> = ({
  textInputType,
  dispatchUserReducerData,
}) => {
  const handleChange = (e: string) => {
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

  if (textInputType === "password" || textInputType === "confirmPassword") {
    return (
      <input
        className={styles.inputElement}
        type="password"
        onChange={(event) => handleChange(event.target.value)}
      ></input>
    );
  } else {
    return (
      <input
        className={styles.inputElement}
        onChange={(event) => handleChange(event.target.value)}
      ></input>
    );
  }
};
