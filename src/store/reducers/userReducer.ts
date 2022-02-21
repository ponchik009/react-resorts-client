import { UserAction, UserActionTypes, UserState } from "../../types/user";

const initialState: UserState = {
  user: null,
  isDialogOpen: false,
  error: "",
  regError: "",
};

export const userReducer = (
  state = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN:
      return {
        ...state,
        user: action.payload,
        isDialogOpen: false,
        error: "",
      };

    case UserActionTypes.SIGN_OUT:
      return {
        ...state,
        user: null,
      };

    case UserActionTypes.CHANGE_DIALOG:
      return {
        ...state,
        isDialogOpen: !state.isDialogOpen,
      };

    case UserActionTypes.ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case UserActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
