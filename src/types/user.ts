export interface IUser {
  id: number;
  email: string;
  username: string;
  likes: IHotelLike[];
  isAdmin: boolean;
}

export interface IHotelLike {
  id: number;
  name: string;
  country: string;
  stars: number;
  image: string;
  price: number;
  description: string;
}

export interface UserState {
  user: IUser | null;
  isDialogOpen: boolean;
  error: string;
  regError: string;
}

export enum UserActionTypes {
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
  CHANGE_DIALOG = "CHANGE_DIALOG",
  ERROR = "ERROR",
  SET_USER = "SET_USER",
}

interface ChangeDialog {
  type: UserActionTypes.CHANGE_DIALOG;
}

interface SignInAction {
  type: UserActionTypes.SIGN_IN;
  payload: IUser;
}

interface SignOutAction {
  type: UserActionTypes.SIGN_OUT;
  payload: null;
}

interface ErrorAction {
  type: UserActionTypes.ERROR;
  payload: string;
}

interface SetUser {
  type: UserActionTypes.SET_USER;
  payload: IUser;
}

export type UserAction =
  | SignInAction
  | SignOutAction
  | ChangeDialog
  | ErrorAction
  | SetUser;
