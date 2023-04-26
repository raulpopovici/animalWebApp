import Divider from "@mui/material/Divider";
import React from "react";
import styles from "./Divider.module.css";

export const DividerComponent = () => {
  return (
    <div className={styles.dividerContainer}>
      <Divider
        sx={{ backgroundColor: "#f2e9e4", width: "100px", height: "1px" }}
      />
      <div
        style={{
          fontFamily: "Oswald, sans-serif",
          marginLeft: "5px",
          marginRight: "5px",
        }}
      >
        OR
      </div>
      <Divider
        sx={{ backgroundColor: "#f2e9e4", width: "100px", height: "1px" }}
      />
    </div>
  );
};
