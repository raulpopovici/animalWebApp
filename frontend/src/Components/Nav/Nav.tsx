import { AppBar, Avatar, IconButton, Toolbar, Tooltip } from "@mui/material";

import Badge from "@mui/joy/Badge";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import styles from "./Nav.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../../context/AuthContext";
import { ProfileMenu } from "../ProfileMenu/ProfileMenu";
import { Menu, MenuItem } from "@mui/joy";

const Nav = ({ cartSize }: { cartSize: number }) => {
  const location = window.location.pathname;
  const navigate = useNavigate();
  const user = useAuthState();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpenAnimalMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuOpen(true);
  };

  let homeCSSClassName = styles.firstCenterButtonContainer;
  let foodCSSClassName = styles.secondCenterButtonContainer;
  let animalCSSClassName = styles.thirdCenterButtonContainer;
  let cartCSSClassName = styles.cartIconClassName;

  if (location === "/") {
    homeCSSClassName = styles.navButtonActive;
  } else if (location === "/food") {
    foodCSSClassName = styles.navButtonActive;
  } else if (location === "/adopt" || location === "/find-mate") {
    animalCSSClassName = styles.navAnimalButtonActive;
  } else if (location === "/cart") {
    cartCSSClassName = styles.cartIconClassNameActive;
  }

  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: "#1e3647" }}>
      <Toolbar sx={{ backgroundColor: "#1e3647" }}>
        <div className={styles.leftContainer}>LOGO</div>
        <div className={styles.centerContainer}>
          <div className={homeCSSClassName} onClick={() => navigate("/")}>
            Home
          </div>
          <div className={foodCSSClassName} onClick={() => navigate("/food")}>
            Food
          </div>
          <div
            className={animalCSSClassName}
            onClick={handleClickOpenAnimalMenu}
          >
            Animals
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            aria-labelledby="basic-demo-button"
            className={styles.animalMenu}
            sx={{ bgcolor: "#1e3647", paddingTop: "10px" }}
          >
            <MenuItem
              sx={{
                "&:hover": {
                  bgcolor: "#4b5e6c",
                  color: "#fff",
                  borderRadius: "40px",
                },
                color: "#fff",
                fontSize: "15px",
                fontWeight: "600",
                fontFamily: "Open Sans, sans-serif",
                padding: "10px",
              }}
              onClick={() => navigate("/adopt")}
            >
              Adopt
            </MenuItem>
            <MenuItem
              sx={{
                "&:hover": {
                  bgcolor: "#4b5e6c",
                  color: "#fff",
                  borderRadius: "40px",
                },
                color: "#fff",
                fontSize: "15px",
                fontWeight: "600",
                fontFamily: "Open Sans, sans-serif",
                padding: "10px",
              }}
              onClick={() => navigate("/find-mate")}
            >
              Find Mate
            </MenuItem>
          </Menu>
          {/* <div className={styles.forthCenterButtonContainer}>BUY</div>
          <div className={styles.fifthCenterButtonContainer}>FIND MATE</div> */}
        </div>
        <div className={styles.rightContainer}>
          <div
            className={styles.cartContainer}
            onClick={() => navigate("/cart")}
          >
            <IconButton aria-label="cart" className={cartCSSClassName}>
              <Badge
                badgeContent={cartSize}
                color="primary"
                variant="plain"
                size="sm"
              >
                <ShoppingCartIcon
                  sx={{
                    color: "#fff",
                  }}
                />
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
