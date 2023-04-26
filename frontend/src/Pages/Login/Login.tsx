import styles from "./Login.module.css";
import { TextInput } from "../../Components/TextInput/TextInput";

import { DividerComponent } from "../../Components/Divider/Divider";
import { Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";

import { redirectToRegister } from "./LoginController";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
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
          {/* <div>
            <div className={styles.text}>Username Or Email</div>
            <TextInput textInputType={false} />
          </div>
          <div>
            <div className={styles.text}>Password</div>
            <TextInput textInputType={true} />
          </div> */}
          <button className={styles.loginButton}>Sign In</button>
          <DividerComponent />
          <div className={styles.alternativeSignUpContainer}>
            <FacebookIcon sx={{ fontSize: "35px" }} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
