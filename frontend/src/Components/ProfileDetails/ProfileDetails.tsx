import { useReducer } from "react";
import { useAuthDispatch, useAuthState } from "../../context/AuthContext";
import styles from "./ProfileDetails.module.css";
import {
  initialUserLoginData,
  userLoginReducer,
} from "../../Pages/Login/LoginReducer";
import { SnackbarOrigin, darkScrollbar } from "@mui/material";
import axios from "axios";

import * as React from "react";
import SnackbarV2 from "../Snackbar/Snackbar";

export interface State extends SnackbarOrigin {
  open: boolean;
  text: string;
}
export const ProfileDetails = () => {
  const user = useAuthState();
  const dispatchUserReducerData = useAuthDispatch();

  const [progress, setProgress] = React.useState(0);

  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "bottom",
    horizontal: "right",
    text: "",
  });

  const handleOpenAlert = (text: string) => {
    setState({ ...state, open: true, text: text });
  };

  const handleChangeInput = (inputType: string, inputValue: string) => {
    if (dispatchUserReducerData !== null) {
      switch (inputType) {
        case "firstName":
          dispatchUserReducerData({
            type: "FirstName_UPDATE",
            payload: inputValue,
          });
          break;
        case "lastName":
          dispatchUserReducerData({
            type: "LastName_UPDATE",
            payload: inputValue,
          });
          break;
        case "phoneNumber":
          dispatchUserReducerData({
            type: "PhoneNumber_UPDATE",
            payload: inputValue,
          });
          break;
        case "address":
          dispatchUserReducerData({
            type: "Address_UPDATE",
            payload: inputValue,
          });
          break;
        case "city":
          dispatchUserReducerData({
            type: "City_UPDATE",
            payload: inputValue,
          });
          break;
        case "country":
          dispatchUserReducerData({
            type: "Country_UPDATE",
            payload: inputValue,
          });
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await axios.post("updateUserInfo", {
        firsName: user.user.firstName,
        lastName: user.user.lastName,
        phoneNumber: user.user.phoneNumber,
        address: user.user.address,
        city: user.user.city,
        country: user.user.country,
      });
      if (result) {
        handleOpenAlert("User info updated!");
      } else {
        handleOpenAlert("User info not updated!");
      }
    } catch (err: any) {
      handleOpenAlert("User info not updated!");
      console.log(err.message);
    }
  };

  return (
    <div className={styles.containerProfileDetails}>
      <h1 className={styles.profileDetailsHeader}>Profile and Security</h1>
      <div className={styles.details}>
        <section className={styles.sectionProfileDetails}>
          <div>
            <div className={styles.inputTextStyle}>Email</div>
            <input
              className={styles.inputStyle}
              disabled
              value={user.user.email}
            ></input>
          </div>

          <div>
            <div className={styles.inputTextStyle}>Firstname</div>
            <input
              className={styles.inputStyle}
              value={user.user.firstName}
              onChange={(event) => {
                handleChangeInput("firstName", event.target.value);
              }}
            ></input>
          </div>
          <div>
            <div className={styles.inputTextStyle}>Lastname</div>
            <input
              className={styles.inputStyle}
              value={user.user.lastName}
              onChange={(event) => {
                handleChangeInput("lastName", event.target.value);
              }}
            ></input>
          </div>
          <div>
            <div className={styles.inputTextStyle}>Phone number</div>
            <input
              className={styles.inputStyle}
              value={user.user.phoneNumber ? user.user.phoneNumber : ""}
              onChange={(event) => {
                handleChangeInput("phoneNumber", event.target.value);
              }}
            ></input>
          </div>
          <div>
            <div className={styles.inputTextStyle}>Adress</div>
            <input
              className={styles.inputStyle}
              value={user.user.address ? user.user.address : ""}
              onChange={(event) => {
                handleChangeInput("address", event.target.value);
              }}
            ></input>
          </div>
          <div>
            <div className={styles.inputTextStyle}>City</div>
            <input
              className={styles.inputStyle}
              value={user.user.city ? user.user.city : ""}
              onChange={(event) => {
                handleChangeInput("city", event.target.value);
              }}
            ></input>
          </div>
          <div>
            <div className={styles.inputTextStyle}>Country</div>
            <input
              className={styles.inputStyle}
              value={user.user.country ? user.user.country : ""}
              onChange={(event) => {
                handleChangeInput("country", event.target.value);
              }}
            ></input>
          </div>
          <button
            className={styles.saveDetailsButton}
            onClick={() => handleSubmit()}
          >
            Save Details
          </button>
        </section>
        <h1 className={styles.profileDetailsHeader}>Change Password</h1>
        <section className={styles.sectionPassword}>
          <div>
            <div className={styles.inputTextStyle}>Current password</div>
            <input className={styles.inputStyle}></input>
          </div>

          <div>
            <div className={styles.inputTextStyle}>New password</div>
            <input className={styles.inputStyle}></input>
          </div>
          <div>
            <div className={styles.inputTextStyle}>Confirm new password</div>
            <input className={styles.inputStyle}></input>
          </div>
          <button className={styles.saveDetailsButton}>Save password</button>
        </section>
      </div>
      <SnackbarV2 state={state} setState={(state: State) => setState(state)} />
    </div>
  );
};

export default ProfileDetails;
