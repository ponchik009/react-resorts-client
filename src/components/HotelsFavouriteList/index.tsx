import React from "react";
import { Grid, Typography } from "@mui/material";

import { IHotelLike } from "../../types/user";
import HotelFavouriteItem from "./HotelFavouriteItem";

interface IProps {
  hotels: IHotelLike[] | undefined;
  onRemove: (id: number) => void;
}

const HotelsFavouriteList: React.FC<IProps> = ({ hotels, onRemove }) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        py: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
      }}
    >
      {hotels?.length ? (
        hotels.map((hotel) => {
          return (
            <HotelFavouriteItem
              key={hotel.id}
              hotel={hotel}
              onRemove={onRemove}
            />
          );
        })
      ) : (
        <Typography variant="h5">Нет любимых отелей</Typography>
      )}
    </Grid>
  );
};

export default HotelsFavouriteList;
