import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  Grow,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import { useAuthDispatch } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ProfileMenu = ({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) => {
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClose = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    const response = await axios.get("/logout");
    if (response.status === 200) {
      if (dispatch !== null) {
        dispatch({ type: "LOGOUT" });
      }
    }
  };

  const handleClick = (page: string, index: number) => {
    navigate(page, {
      state: { index: index },
    });
    setMenuOpen(false);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={menuOpen}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          top: "45px !important",
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "left", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      TransitionComponent={Grow}
    >
      <MenuItem onClick={() => handleClick("/profile", 0)}>
        <Avatar /> Profile
      </MenuItem>
      <MenuItem onClick={() => handleClick("/profile", 1)}>
        <Avatar /> Orders
      </MenuItem>
      <MenuItem onClick={() => handleClick("/profile", 2)}>
        <Avatar /> Animals
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};
