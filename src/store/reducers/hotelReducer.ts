import { HotelAction, HotelActionTypes, HotelState } from "../../types/hotel";

const initialState: HotelState = {
  hotels: [],
  currentHotel: null,
  error: "",
  currentFilters: {
    tags: [],
    cities: [],
  },
  currentQuery: "",
};

export const hotelReducer = (
  state = initialState,
  action: HotelAction
): HotelState => {
  switch (action.type) {
    case HotelActionTypes.FETCH_HOTELS:
      return {
        ...state,
        error: "",
        hotels: action.payload,
        currentHotel: action.payload[0] || null,
      };

    case HotelActionTypes.FETCH_HOTELS_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case HotelActionTypes.LIKE_HOTEL:
      return {
        ...state,
        hotels: state.hotels?.map((hotel) => {
          return hotel.id === action.payload.id ? action.payload : hotel;
        }),
        currentHotel: action.payload,
      };

    case HotelActionTypes.UNLIKE_HOTEL:
      return {
        ...state,
        hotels: state.hotels?.map((hotel) => {
          return hotel.id === action.payload.id ? action.payload : hotel;
        }),
        currentHotel: action.payload,
      };

    case HotelActionTypes.FETCH_HOTEL:
      return {
        ...state,
        currentHotel: action.payload,
        error: "",
      };

    case HotelActionTypes.FETCH_HOTEL_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case HotelActionTypes.SET_FILTERS:
      return {
        ...state,
        currentFilters: action.payload,
      };

    case HotelActionTypes.SET_QUERY:
      return {
        ...state,
        currentQuery: action.payload,
      };

    default:
      return state;
  }
};
