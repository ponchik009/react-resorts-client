import React from "react";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";

import { Link, useLocation } from "react-router-dom";

import { IUser } from "../../types/user";
import LogInDialog from "../../components/Dialogs/LogInDialog";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import PopupMenu from "../../components/PopupMenu";
import Search from "../../components/Search/Search";

interface IProps {
  user: IUser | null;
}

const MainLayout: React.FC<IProps> = ({ children, user }) => {
  const { isDialogOpen, error } = useTypedSelector((state) => state.user);
  const { pathname } = useLocation();

  return (
    <>
      <AppBar
        position="static"
        sx={{ px: 48, py: 2, backgroundColor: "#5B3E2E" }}
      >
        <Toolbar>
          <Typography variant="h3" component="div">
            <Link
              to="/"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Отелиндер
            </Link>
          </Typography>
          <Search disabled={pathname !== "/"} />
          {user ? (
            <PopupMenu user={user} />
          ) : (
            <LogInDialog open={isDialogOpen} error={error} />
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ p: 2 }}>{children}</Container>
    </>
  );
};

export default MainLayout;
