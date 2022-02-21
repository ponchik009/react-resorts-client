import React from "react";
import { Grid } from "@mui/material";
import { IHotel } from "../../types/hotel";

import HotelItem from "./HotelItem";
import { IUser } from "../../types/user";

interface IProps {
  hotels: IHotel[];
  user: IUser | null;
}

const HotelsList: React.FC<IProps> = ({ hotels, user }) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
      }}
    >
      {hotels.map((hotel) => (
        <HotelItem
          key={hotel.id}
          hotel={hotel}
          checked={hotel.likes.some((userLike) => userLike.id === user?.id)}
          isAuth={user !== null}
        />
      ))}
    </Grid>
  );
};

export default HotelsList;
