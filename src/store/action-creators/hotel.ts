import axios from "axios";
import { Dispatch } from "react";
import {
  HotelAction,
  HotelActionTypes,
  IFilters,
  IHotel,
} from "../../types/hotel";
import { ITag } from "../../types/tag";

export const fetchHotels = (
  filter: IFilters = { tags: [], cities: [] },
  query: string = ""
) => {
  return async (dispatch: Dispatch<HotelAction>) => {
    try {
      let url = `http://localhost:5001/hotels?query=${query}`;
      if (filter.tags.length > 0) {
        const tagNames = filter.tags.map((tag) => tag.name);
        url += "&filter=" + tagNames.join(",");
      }
      if (filter.cities.length > 0) {
        url += "&cities=" + filter.cities.join(",");
      }
      const response = await axios.get(url);
      dispatch({
        type: HotelActionTypes.FETCH_HOTELS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);

      dispatch({
        type: HotelActionTypes.FETCH_HOTELS_ERROR,
        payload: "Произошла ошибка при загрузке отелей",
      });
    }
  };
};

export const likeHotel = (id: number) => {
  return async (dispatch: Dispatch<HotelAction>) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/hotels/like/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: HotelActionTypes.LIKE_HOTEL,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const unlikeHotel = (id: number) => {
  return async (dispatch: Dispatch<HotelAction>) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/hotels/unlike/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: HotelActionTypes.UNLIKE_HOTEL,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getHotel = (id: number) => {
  return async (dispatch: Dispatch<HotelAction>) => {
    try {
      const response = await axios.get(`http://localhost:5001/hotels/${id}`, {
        withCredentials: true,
      });

      dispatch({
        type: HotelActionTypes.FETCH_HOTEL,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: HotelActionTypes.FETCH_HOTEL_ERROR,
        payload: "Отель не найден :(",
      });
    }
  };
};

export const updateHotel = (hotel: IHotel) => {
  return async (dispatch: Dispatch<HotelAction>) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/hotels/${hotel.id}`,
        { ...hotel },
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: HotelActionTypes.FETCH_HOTEL,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: HotelActionTypes.FETCH_HOTEL_ERROR,
        payload: "Отель не найден :(",
      });
    }
  };
};

export const deleteHotel = (id: number) => {
  return async (dispatch: Dispatch<HotelAction>) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/hotels/${id}`,
        {
          withCredentials: true,
        }
      );
    } catch (e) {
      dispatch({
        type: HotelActionTypes.FETCH_HOTEL_ERROR,
        payload: "Отель не найден :(",
      });
    }
  };
};

export const createHotel = (hotel: FormData) => {
  return async (dispatch: Dispatch<HotelAction>) => {
    try {
      const response = await axios.post(`http://localhost:5001/hotels`, hotel, {
        withCredentials: true,
      });
      dispatch({
        type: HotelActionTypes.FETCH_HOTEL,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: HotelActionTypes.FETCH_HOTEL_ERROR,
        payload: "Отель не найден :(",
      });
    }
  };
};
