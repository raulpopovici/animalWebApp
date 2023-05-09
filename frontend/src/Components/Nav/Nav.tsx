import { AppBar, Avatar, IconButton, Toolbar, Tooltip } from "@mui/material";

import Badge from "@mui/material/Badge";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import styles from "./Nav.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../../context/AuthContext";
import { ProfileMenu } from "../ProfileMenu/ProfileMenu";

const Nav = ({ cartSize }: { cartSize: number }) => {
  const navigate = useNavigate();
  const user = useAuthState();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuOpen(true);
  };
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
          {user.isAuth ? (
            <Tooltip title="Account settings" className={styles.avatar}>
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={menuOpen ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={menuOpen ? "true" : undefined}
              >
                <Avatar sx={{ width: 35, height: 35 }}>
                  {user.user.firstName[0]}
                </Avatar>
              </IconButton>
            </Tooltip>
          ) : (
            <button
              className={styles.signinButton}
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          )}
        </div>
      </Toolbar>
      <ProfileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </AppBar>
  );
};

export default Nav;
