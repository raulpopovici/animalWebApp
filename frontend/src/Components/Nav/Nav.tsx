import { AppBar, IconButton, Toolbar } from "@mui/material";

import Badge from "@mui/material/Badge";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import styles from "./Nav.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";
const Nav = ({ cartSize }: { cartSize: number }) => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ backgroundColor: "#82218b", borderBottom: "1px solid #8a0d56" }}
    >
      <Toolbar>
        <div className={styles.leftContainer}>LOGO</div>
        <div className={styles.centerContainer}>
          <div
            className={styles.firstCenterButtonContainer}
            onClick={() => navigate("/")}
          >
            HOME
          </div>
          <div
            className={styles.secondCenterButtonContainer}
            onClick={() => navigate("/food")}
          >
            FOOD
          </div>
          <div className={styles.thirdCenterButtonContainer}>ADOPT</div>
          <div className={styles.forthCenterButtonContainer}>BUY</div>
          <div className={styles.fifthCenterButtonContainer}>FIND MATE</div>
        </div>
        <div className={styles.rightContainer}>
          <div
            className={styles.cartContainer}
            onClick={() => navigate("/cart")}
          >
            <IconButton aria-label="cart" sx={{ width: "30px" }}>
              <Badge badgeContent={cartSize} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
          <button
            className={styles.signinButton}
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
