import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { changeDialog, signIn } from "../../store/action-creators/user";
import RegisterDialog from "./RegisterDialog";
import { useInput } from "../../hooks/useInput";

interface IProps {
  open: boolean;
  error: string;
}

const LogInDialog: React.FC<IProps> = ({ open, error }) => {
  const username = useInput("");
  const password = useInput("");
  const [openRegister, setOpenRegister] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const handleOpenRegister = () => {
    setOpenRegister(true);
  };

  const handleClick = () => {
    dispatch(changeDialog());
    setOpenRegister(false);
  };

  const logIn = () => {
    dispatch(signIn(username.value, password.value));
  };

  return (
    <>
      <Button variant="text" onClick={handleClick} sx={{ color: "#fff" }}>
        <Typography variant="body1">Войти</Typography>
      </Button>

      <Dialog open={open && !openRegister} onClose={handleClick}>
        <DialogTitle>Вход в аккаунт</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Чтобы лайкать отели, необходимо войти или
            {
              <Button variant="text" onClick={handleOpenRegister}>
                Зарегистрироваться
              </Button>
            }
          </DialogContentText>
          {error.length ? (
            <Alert variant="outlined" severity="error">
              {error}
            </Alert>
          ) : (
            ""
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Логин"
            type="text"
            fullWidth
            variant="standard"
            {...username}
          />
          <TextField
            margin="dense"
            label="Пароль"
            type="password"
            fullWidth
            variant="standard"
            {...password}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick}>Отмена</Button>
          <Button onClick={logIn}>Войти</Button>
        </DialogActions>
      </Dialog>

      <RegisterDialog
        open={open && openRegister}
        handleBack={() => setOpenRegister(false)}
        handleClose={handleClick}
      />
    </>
  );
};

export default LogInDialog;
