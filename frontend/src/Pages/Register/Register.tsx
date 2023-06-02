import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../../Components/TextInput/TextInput";
import styles from "./Register.module.css";
import {
  initialUserRegisterData,
  userRegisterReducer,
  UserRegisterState,
} from "./RegisterReducer";

import axios, { AxiosError, AxiosResponse } from "axios";
import { handleRegisterErrors } from "./RegisterController";
import { SnackbarOrigin } from "@mui/material";
import SnackbarV2 from "../../Components/Snackbar/Snackbar";

export interface State extends SnackbarOrigin {
  open: boolean;
  text: string;
}

interface ResponseData {
  success: boolean;
  user: {
    email: string;
    firstName: string;
    lastName: string;
    // ... other user properties
  };
}
const Register = () => {
  const navigate = useNavigate();

  const [userReducerData, dispatchUserReducerData] = useReducer(
    userRegisterReducer,
    initialUserRegisterData
  );

  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
    text: "",
  });

  const handleOpenAlert = (text: string) => {
    setState({ ...state, open: true, text: text });
  };

  const handleRegister = async () => {
    try {
      const response: AxiosResponse<ResponseData> = await axios.post(
        "http://localhost:3001/api/register",
        {
          firstName: userReducerData.firstname,
          lastName: userReducerData.lastname,
          email: userReducerData.email,
          password: userReducerData.password,
          confirmPassword: userReducerData.confirmPassword,
        }
      );
      handleOpenAlert(
        "Successfully registered! You will be redirected to login page in 2 seconds."
      );
      //wait for 2 seconds before redirecting to login page
      setTimeout(() => {
        navigate("/login");
      }, 2000);

      return response;
    } catch (error: any) {
      if (error.response.data !== undefined) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        dispatchUserReducerData({
          type: UserRegisterState.registerErrors,
          payload: error.response.data,
        });
        console.log(userReducerData.registerErrors);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
      throw error; // Rethrow the error to handle it at a higher level
    }
  };

  return (
    <div className={styles.pageContainer}>
      <section className={styles.leftContainer}>
        <div className={styles.inputContainer}>
          <div>
            <div className={styles.text}>First Name</div>
            <TextInput
              textInputType="firstname"
              screenType="register"
              dispatchUserReducerData={dispatchUserReducerData}
            />
            {userReducerData.registerErrors.firstName !== "" &&
            userReducerData.registerErrors.firstName !== undefined ? (
              <div className={styles.errorText}>
                {userReducerData.registerErrors.firstName}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div>
            <div className={styles.text}>Last Name</div>
            <TextInput
              textInputType="lastname"
              screenType="register"
              dispatchUserReducerData={dispatchUserReducerData}
            />
            {userReducerData.registerErrors.lastName !== "" &&
            userReducerData.registerErrors.lastName !== undefined ? (
              <div className={styles.errorText}>
                {userReducerData.registerErrors.lastName}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div>
            <div className={styles.text}>Email</div>
            <TextInput
              textInputType="email"
              screenType="register"
              dispatchUserReducerData={dispatchUserReducerData}
            />
            {userReducerData.registerErrors.email !== "" &&
            userReducerData.registerErrors.email !== undefined ? (
              <div className={styles.errorText}>
                {userReducerData.registerErrors.email}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div>
            <div className={styles.text}>Password</div>
            <TextInput
              textInputType="password"
              screenType="register"
              dispatchUserReducerData={dispatchUserReducerData}
            />
            {userReducerData.registerErrors.password !== "" &&
            userReducerData.registerErrors.password !== undefined ? (
              <div className={styles.errorText}>
                {userReducerData.registerErrors.password}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div>
            <div className={styles.text}>Confirm Password</div>
            <TextInput
              textInputType="confirmPassword"
              screenType="register"
              dispatchUserReducerData={dispatchUserReducerData}
            />
            {userReducerData.registerErrors.confirmPassword !== "" &&
            userReducerData.registerErrors.confirmPassword !== undefined ? (
              <div className={styles.errorText}>
                {userReducerData.registerErrors.confirmPassword}
              </div>
            ) : (
              <></>
            )}
          </div>
          <button
            onClick={() => handleRegister()}
            className={styles.loginButton}
          >
            Create Account
          </button>
        </div>
      </section>
      <section className={styles.rightContainer}>
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            alignSelf: "center",
            flexDirection: "column",

            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Covered By Your Grace, cursive",
              fontSize: "50px",
              color: "#fff",
              paddingTop: "30px",
            }}
          >
            Petopia
          </div>

          <div
            style={{
              fontFamily: "Open sans, sans-serif",
              fontSize: "30px",
              color: "#fff",
              paddingTop: "50px",
            }}
          >
            Connecting Hearts and Paws
          </div>

          <div
            style={{
              fontFamily: "Open sans, sans-serif",
              fontSize: "20px",
              color: "#fff",
              paddingTop: "30px",
            }}
          >
            Nourish. Adopt. Mate
          </div>
        </div>

        <div style={{ display: "grid" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "center",
              justifySelf: "center",
              fontFamily: "Open sans, sans-serif",
              fontSize: "20px",
              paddingBottom: "30px",
              color: "#fff",
            }}
          >
            Already have an account? Sign in now!
          </div>
          <button
            className={styles.signupButton}
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        </div>
      </section>
      <SnackbarV2
        autohide={2000}
        state={state}
        setState={(state: State) => setState(state)}
      />
    </div>
  );
};

export default Register;
