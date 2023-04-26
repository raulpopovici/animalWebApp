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

  const handleRegister = async () => {
    console.log(userReducerData);
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
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // dispatchUserReducerData({
        //   type: UserRegisterState.registerErrors,
        //   payload: error.response.data,
        // });

        console.log("sadasd ->>>> " + error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        // console.log(error.response.status);
        // console.log(error.response.headers);
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
              dispatchUserReducerData={dispatchUserReducerData}
            />
          </div>
          <div>
            <div className={styles.text}>Last Name</div>
            <TextInput
              textInputType="lastname"
              dispatchUserReducerData={dispatchUserReducerData}
            />
          </div>
          <div>
            <div className={styles.text}>Email</div>
            <TextInput
              textInputType="email"
              dispatchUserReducerData={dispatchUserReducerData}
            />
          </div>
          <div>
            <div className={styles.text}>Password</div>
            <TextInput
              textInputType="password"
              dispatchUserReducerData={dispatchUserReducerData}
            />
            {userReducerData.registerErrors.passwordError !== "" &&
            userReducerData.registerErrors.passwordError !== undefined ? (
              <div className={styles.errorText}>Field must not be empty</div>
            ) : (
              <></>
            )}
          </div>
          <div>
            <div className={styles.text}>Confirm Password</div>
            <TextInput
              textInputType="confirmPassword"
              dispatchUserReducerData={dispatchUserReducerData}
            />
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
        <div style={{ display: "grid", flexGrow: 1, alignSelf: "center" }}>
          <div
            style={{
              fontFamily: "Covered By Your Grace, cursive",
              fontSize: "50px",
              color: "#8a0d56",
            }}
          >
            Welcome!
          </div>
        </div>

        <div style={{ display: "grid" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "center",
              justifySelf: "center",
              fontFamily: "Covered By Your Grace, cursive",
              fontSize: "20px",
              color: "#8a0d56",
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
    </div>
  );
};

export default Register;
