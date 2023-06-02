import React from "react";
import styles from "./Footer.module.css";
import { Divider } from "@mui/joy";

export const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerMiddleContainer}>
        <div
          style={{
            fontFamily: "Covered By Your Grace, cursive",
            color: "#fff",
            fontSize: "50px",
          }}
        >
          Petopia
        </div>
        <div style={{ fontFamily: "Open Sans, sans-serif", color: "#fff" }}>
          Connecting Hearts and Paws: Nourish. Adopt. Mate{" "}
        </div>
        <div
          style={{
            fontFamily: "Open Sans, sans-serif",
            color: "#fff",
            paddingTop: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>Contact us</div>
          <Divider sx={{ bgcolor: "#fff", height: "1px" }} />
          <div style={{ paddingTop: "20px" }}>0771674315</div>
          <div>petopia@gmail.com</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
