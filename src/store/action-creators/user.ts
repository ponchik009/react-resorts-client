import axios from "axios";
import { Dispatch } from "react";
import { IUser, UserAction, UserActionTypes } from "../../types/user";

export const changeDialog = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: UserActionTypes.CHANGE_DIALOG,
    });
  };
};

export const setUser = (user: IUser) => {
  return async (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: UserActionTypes.SET_USER,
      payload: user,
    });
  };
};

export const getUser = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await axios.get<IUser>(
        `http://localhost:5001/authentication`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        dispatch({
          type: UserActionTypes.SIGN_IN,
          payload: response.data,
        });
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SIGN_OUT,
        payload: null,
      });
      console.log("auth error");
    }
  };
};

export const signIn = (username: string, password: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await axios.post(
        `http://localhost:5001/authentication/log-in`,
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        dispatch({
          type: UserActionTypes.SIGN_IN,
          payload: response.data,
        });
      } else {
        dispatch({
          type: UserActionTypes.ERROR,
          payload: "Неверный логин или пароль",
        });
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.ERROR,
        payload: "Неверный логин или пароль",
      });
      console.log(e);
    }
  };
};

export const signOut = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await axios.post(
        `http://localhost:5001/authentication/log-out`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        dispatch({
          type: UserActionTypes.SIGN_OUT,
          payload: null,
        });
      }
    } catch (e) {}
  };
};
