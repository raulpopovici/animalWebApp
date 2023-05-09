import styles from "./Login.module.css";
import { TextInput } from "../../Components/TextInput/TextInput";

import { DividerComponent } from "../../Components/Divider/Divider";
import { Backdrop, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";

import { redirectToRegister } from "./LoginController";
import { useNavigate } from "react-router";
import { useReducer, useState } from "react";
import { initialUserLoginData, userLoginReducer } from "./LoginReducer";
import axios, { AxiosResponse } from "axios";
import { useAuthDispatch } from "../../context/AuthContext";
import CircularProgress from "@mui/joy/CircularProgress";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const [userReducerData, dispatchUserReducerData] = useReducer(
    userLoginReducer,
    initialUserLoginData
  );

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  interface ResponseData {
    success: boolean;
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      cartId: string;
      // ... other user properties
    };
  }

  const handleLogin = async () => {
    try {
      const response: AxiosResponse<ResponseData> = await axios.post(
        "http://localhost:3001/api/login",
        {
          email: userReducerData.email,
          password: userReducerData.password,
        }
      );
      if (response.data) {
        if (dispatch !== null) {
          dispatch({
            type: "LOGIN",
            payload: {
              id: response.data.user.id,
              email: response.data.user.email,
              firstName: response.data.user.firstName,
              lastName: response.data.user.lastName,
              cartId: response.data.user.cartId,
              isAdmin: false,
            },
          });
        }
        setOpen(true);
      }

      setTimeout(() => {
        navigate("/");
      }, 500);

      console.log(response.data);
      return response;
    } catch (error: any) {
      if (error.response.data !== undefined) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // dispatchUserReducerData({
        //   type: UserRegisterState.registerErrors,
        //   payload: error.response.data,
        // });
        // console.log(userReducerData.registerErrors);
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
        <div style={{ display: "grid", flexGrow: 1, alignSelf: "center" }}>
          <div
            style={{
              fontFamily: "Covered By Your Grace, cursive",
              fontSize: "50px",
              color: "#8a0d56",
            }}
          >
            Welcome Back!
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
            Don't have an account? Create one now!
          </div>
          <button
            className={styles.signupButton}
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>
        </div>
      </section>
      <section className={styles.rightContainer}>
        <div className={styles.inputContainer}>
          <div>
            <div className={styles.text}>Email</div>
            <TextInput
              textInputType={"email"}
              screenType="login"
              dispatchUserReducerData={dispatchUserReducerData}
            />
          </div>
          <div>
            <div className={styles.text}>Password</div>
            <TextInput
              textInputType={"password"}
              screenType="login"
              dispatchUserReducerData={dispatchUserReducerData}
            />
          </div>
          <button className={styles.loginButton} onClick={() => handleLogin()}>
            Sign In
          </button>
          <DividerComponent />
          <div className={styles.alternativeSignUpContainer}>
            <FacebookIcon sx={{ fontSize: "35px" }} />
          </div>
        </div>
      </section>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress variant="plain" size="lg" thickness={3} />
      </Backdrop>
    </div>
  );
};

export default Login;
