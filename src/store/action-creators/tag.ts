import axios from "axios";
import { Dispatch } from "react";
import { TagAction, TagActionTypes } from "../../types/tag";

export const fetchTags = () => {
  return async (dispatch: Dispatch<TagAction>) => {
    try {
      const response = await axios.get(`http://localhost:5001/hotels/tags`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatch({
          type: TagActionTypes.FETCH_TAGS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log("tags error");
    }
  };
};
