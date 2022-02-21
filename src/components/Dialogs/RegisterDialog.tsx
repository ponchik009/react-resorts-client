import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  Typography,
  Alert,
  Grid,
} from "@mui/material";
import * as EmailValidator from "email-validator";
import { useDispatch } from "react-redux";

import StepWrapper from "../Stepper/StepWrapper";
import { useInput } from "../../hooks/useInput";
import axios from "axios";
import { getUser, signIn } from "../../store/action-creators/user";

interface IProps {
  open: boolean;
  handleClose: () => void;
  handleBack: () => void;
}

const RegisterDialog: React.FC<IProps> = ({
  open,
  handleClose,
  handleBack,
}) => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const [error, setError] = React.useState("");
  const email = useInput("");
  const verificationCode = useInput("");
  const username = useInput("");
  const password = useInput("");

  const validateEmail = (email: string) => {
    if (!EmailValidator.validate(email)) {
      return "Указан невалидный E-mail!";
    }
  };

  const validateUsername = (username: string) => username.length >= 6;
  const validatePassword = (password: string) => password.length >= 6;

  const registerEmail = async (email: string) => {
    try {
      const response = await axios.post(
        `http://localhost:5001/authentication/registerEmail`,
        {
          email,
        },
        {
          withCredentials: true,
        }
      );
      setActiveStep((prev) => prev + 1);
    } catch (e) {
      setError("Пользователь с таким email уже зарегестрирован!");
    }
  };

  const verifyEmail = async (email: string, verificationCode: string) => {
    try {
      const response = await axios.post(
        `http://localhost:5001/authentication/verifyEmail`,
        {
          email,
          verificationCode,
        },
        {
          withCredentials: true,
        }
      );
      setActiveStep((prev) => prev + 1);
    } catch (e) {
      setError("Код неверный!");
    }
  };

  const register = async (
    email: string,
    username: string,
    password: string
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:5001/authentication/register`,
        {
          email,
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);

      setActiveStep((prev) => prev + 1);
      dispatch(signIn(username, password));
    } catch (e) {
      setError("Имя пользователя занято!");
    }
  };

  const next = async () => {
    setError("");
    switch (activeStep) {
      case 0:
        const validateEmailError = validateEmail(email.value);
        if (validateEmailError) {
          setError(validateEmailError);
          return;
        }
        // запрос на регитрацию email
        await registerEmail(email.value);

        return;
      case 1:
        await verifyEmail(email.value, verificationCode.value);
        return;
      case 2:
        const isUsername = validateUsername(username.value);
        const isPassword = validatePassword(password.value);
        if (!isUsername) {
          setError("Имя пользователя не меньше 6 знаков!");
          return;
        }

        if (!isPassword) {
          setError("Пароль не меньше 6 знаков!");
          return;
        }

        await register(email.value, username.value, password.value);
        return;
      default:
        return;
    }
  };

  const back = () => {
    setError("");
    setActiveStep((prev) => prev - 1);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Регистрация</DialogTitle>
      <DialogContent>
        <StepWrapper activeStep={activeStep}>
          {activeStep === 0 && (
            <Grid container sx={{ p: "20px" }} direction="column">
              {error.length ? (
                <Alert variant="outlined" severity="error">
                  {error}
                </Alert>
              ) : (
                ""
              )}
              <TextField
                {...email}
                label="E-mail"
                type="email"
                sx={{ mt: "10px" }}
                fullWidth
              />
            </Grid>
          )}
          {activeStep === 1 && (
            <Grid container sx={{ p: "20px" }} direction="column">
              {error.length ? (
                <Alert variant="outlined" severity="error">
                  {error}
                </Alert>
              ) : (
                ""
              )}
              <TextField
                {...verificationCode}
                label="Код подтверждения"
                type="number"
                sx={{ mt: "10px" }}
                fullWidth
              />
            </Grid>
          )}
          {activeStep === 2 && (
            <Grid container direction="column" sx={{ p: "20px" }}>
              {error.length ? (
                <Alert variant="outlined" severity="error">
                  {error}
                </Alert>
              ) : (
                ""
              )}
              <TextField
                {...username}
                label="Имя пользователя"
                sx={{ mt: "10px" }}
                fullWidth
              />
              <TextField
                {...password}
                label="Пароль"
                sx={{ mt: "10px" }}
                type="password"
                fullWidth
              />
            </Grid>
          )}
        </StepWrapper>
        <Grid container justifyContent="space-between">
          <Button onClick={back} disabled={activeStep < 1}>
            Назад
          </Button>
          <Button onClick={next}>Вперед</Button>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Typography variant="body1">
          Уже есть аккаунт?{" "}
          <Button onClick={handleBack} variant="text">
            Войти
          </Button>
        </Typography>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterDialog;
