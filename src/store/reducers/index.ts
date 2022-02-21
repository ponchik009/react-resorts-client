import { combineReducers } from "redux";

import { hotelReducer } from "./hotelReducer";
import { tagReducer } from "./tagReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  hotel: hotelReducer,
  user: userReducer,
  tag: tagReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
