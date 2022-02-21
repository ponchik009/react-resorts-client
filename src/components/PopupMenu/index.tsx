import React from "react";
import { FormControlLabel, IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

import { IUser } from "../../types/user";
import { useDispatch } from "react-redux";
import { signOut } from "../../store/action-creators/user";

interface IProps {
  user: IUser;
}

const PopupMenu: React.FC<IProps> = ({ user }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    dispatch(signOut());
  };

  return (
    <>
      <FormControlLabel
        label={`${user.isAdmin ? "Сотрудник" : "Посетитель"} ${user.username}`}
        control={
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle sx={{ fontSize: 50 }} />
          </IconButton>
        }
      />

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link
            to="/profile"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            Профиль
          </Link>
        </MenuItem>
        {user.isAdmin && (
          <MenuItem onClick={handleClose}>
            <Link
              to="/hotel/create"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Создать отель
            </Link>
          </MenuItem>
        )}
        <MenuItem onClick={logOut}>Выйти</MenuItem>
      </Menu>
    </>
  );
};

export default PopupMenu;
