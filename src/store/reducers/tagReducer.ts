import { TagAction, TagActionTypes, TagState } from "../../types/tag";

const initialState: TagState = {
  tags: [],
  error: "",
};

export const tagReducer = (
  state: TagState = initialState,
  action: TagAction
) => {
  switch (action.type) {
    case TagActionTypes.FETCH_TAGS:
      return {
        ...state,
        tags: action.payload,
      };
    default:
      return state;
  }
};
