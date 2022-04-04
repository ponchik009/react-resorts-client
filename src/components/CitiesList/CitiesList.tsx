import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchTags } from "../../store/action-creators/tag";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ITag } from "../../types/tag";
import { fetchHotels } from "../../store/action-creators/hotel";
import { HotelActionTypes } from "../../types/hotel";
import { DEFAULT_CITIES } from "../../const/cities";
import CityItem from "./CityItem";

const CitiesList = () => {
  const dispatch = useDispatch();

  const { currentQuery } = useTypedSelector((state) => state.hotel);
  const { currentFilters } = useTypedSelector((state) => state.hotel);
  console.log("FILTERS");
  console.log(currentFilters);
  const [selectedCities, setSelectedCities] = React.useState<string[]>([]);
  const timer = React.useRef(setTimeout(() => {}, 1));

  const onSelect = (isSelect: boolean, city: string) => {
    if (timer) {
      clearTimeout(timer.current);
    }
    if (isSelect) {
      const newCities = [...selectedCities, city];
      setSelectedCities(newCities);
      timer.current = setTimeout(() => {
        // запрос с фильтрацией
        dispatch(
          fetchHotels(
            {
              ...currentFilters,
              cities: newCities,
            },
            currentQuery
          )
        );
        dispatch({
          type: HotelActionTypes.SET_FILTERS,
          payload: {
            ...currentFilters,
            cities: newCities,
          },
        });
      }, 1000);
    } else {
      const newCities = selectedCities.filter(
        (selectedCity) => selectedCity !== city
      );
      setSelectedCities(newCities);
      timer.current = setTimeout(() => {
        // запрос с фильтрацией
        dispatch(
          fetchHotels(
            {
              ...currentFilters,
              cities: newCities,
            },
            currentQuery
          )
        );
        dispatch({
          type: HotelActionTypes.SET_FILTERS,
          payload: {
            ...currentFilters,
            cities: newCities,
          },
        });
      }, 1000);
    }
  };

  React.useEffect(() => {
    dispatch(fetchTags());
    return () => {
      dispatch({
        type: HotelActionTypes.SET_FILTERS,
        payload: {
          ...currentFilters,
          cities: [],
        },
      });
    };
  }, []);

  return (
    <>
      <Typography variant="body1">Города: </Typography>
      <Grid container spacing={1}>
        {DEFAULT_CITIES &&
          DEFAULT_CITIES.map((city) => (
            <CityItem city={city} onSelect={onSelect} key={`${city}_${city}`} />
          ))}
      </Grid>
    </>
  );
};

export default CitiesList;
