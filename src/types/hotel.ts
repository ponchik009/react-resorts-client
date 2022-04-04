import { ITag } from "./tag";

export interface IHotel {
  id: number;
  name: string;
  cities: string[];
  stars: number;
  image: string;
  price: number;
  description: string;
  likes: IUserLike[];
  tags: ITag[];
}

export interface IUserLike {
  id: number;
  username: string;
}

export interface IFilters {
  tags: ITag[];
  cities: string[];
}

export interface HotelState {
  hotels: IHotel[];
  currentHotel: IHotel | null;
  error: string;
  currentFilters: IFilters;
  currentQuery: string;
}

export enum HotelActionTypes {
  FETCH_HOTELS = "FETCH_HOTELS",
  FETCH_HOTELS_ERROR = "FETCH_HOTELS_ERROR",
  LIKE_HOTEL = "LIKE_HOTEL",
  UNLIKE_HOTEL = "UNLIKE_HOTEL",
  FETCH_HOTEL = "SET_CURRENT_HOTEL",
  FETCH_HOTEL_ERROR = "FETCH_HOTEL_ERROR",
  SET_FILTERS = "SET_FILTERS",
  SET_QUERY = "SET_QUERY",
}

interface FetchHotelsAction {
  type: HotelActionTypes.FETCH_HOTELS;
  payload: IHotel[];
}

interface FetchHotelsErrorAction {
  type: HotelActionTypes.FETCH_HOTELS_ERROR;
  payload: string;
}

interface LikeHotelAction {
  type: HotelActionTypes.LIKE_HOTEL;
  payload: IHotel;
}

interface UnlikeHotelAction {
  type: HotelActionTypes.UNLIKE_HOTEL;
  payload: IHotel;
}

interface FetchHotelAction {
  type: HotelActionTypes.FETCH_HOTEL;
  payload: IHotel;
}

interface FetchHotelErrorAction {
  type: HotelActionTypes.FETCH_HOTEL_ERROR;
  payload: string;
}

interface SetFilters {
  type: HotelActionTypes.SET_FILTERS;
  payload: IFilters;
}

interface SetQuery {
  type: HotelActionTypes.SET_QUERY;
  payload: string;
}

export type HotelAction =
  | FetchHotelsAction
  | FetchHotelsErrorAction
  | LikeHotelAction
  | UnlikeHotelAction
  | FetchHotelAction
  | FetchHotelErrorAction
  | SetFilters
  | SetQuery;
